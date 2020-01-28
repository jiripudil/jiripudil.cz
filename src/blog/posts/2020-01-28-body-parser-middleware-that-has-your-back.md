---
title: Body parser middleware that has your back
slug: body-parser-middleware-that-has-your-back
datetime: 2020-01-28T14:00:00Z
draft: false
cupsOfCoffee: 4
perex: >-
  If you've ever implemented an HTTP API in PHP, you probably know that there's one thing you have to do over and over
  and over: parse the request body and validate the resulting structure. Now that we have PSR-15, let's use a middleware
  for that!
tags:
  - api
  - frameworkless
  - http
  - middlewares
  - php
  - rest
  - software-architecture
---
The easiest solution – and one we surely tried – is to pull the [`JsonPayload` middleware](https://github.com/middlewares/payload#jsonpayload)
via Composer. It's basically a middleware over `json_decode`. You just put it in your middleware stack and suddenly,
`$request->getParsedBody()` gives you an associative array.

Well, that's nice, but it's still not enough. There's one big problem not yet solved here: we have just an array. Yes,
*an* array. The request handler can, at this point, make no assumptions about its shape; we still have to validate that
nothing is missing, nothing is extra, and everything is of the right type.

But that implies that the request handler has to know the schema of the request body. So if it knows it, why not use
the information in the middleware in the first place? What if we could parse the request body into a known, well-defined,
and type-safe structure, and validate it against a set of constraints while we're at it? And that's what we did.


## Let there be a class

When I'm talking about a known, well-defined, and type-safe structure, I really mean a class. It's nothing fancy,
just a plain old data transfer object, with public properties and not much more. Let's take a look at a sample
parsed body class for an authentication request:

```php
final class AuthenticateParsedBody
{
	public string $email;
	public string $password;
}
```

That's all. Really. We have a class representing the parsed body; we now have to deserialize the incoming JSON
and populate an instance of the class. And there already is a nice little tool that does this: Symfony's
[Serializer](https://symfony.com/components/Serializer) component. We configure it this way:

```php
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\PropertyNormalizer;
use Symfony\Component\Serializer\Serializer;

$serializer = new Serializer(
	[new PropertyNormalizer()],
	[new JsonEncoder()]
);
```

The encoder part says which formats we want to work with – in our case it's JSON – while the normalizer part defines
how objects are populated from the decoded data and vice versa. `PropertyNormalizer` works with object properties,
which is all we need at the moment. For more complex structures, you'll want to configure `ObjectNormalizer`, very
likely along with `ArrayDenormalizer`.

The middleware then uses this configured Serializer instance to deserialize incoming request body into an object
of the desired type, and responds to whatever goes wrong in either decoding or normalization:

```php
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\Exception\NotNormalizableValueException;

try {
	$parsedBody = $serializer->deserialize(
		(string) $request->getBody(),
		AuthenticateParsedBody::class,
		JsonEncoder::FORMAT
	);
} catch (NotEncodableValueException $e) {
	return $responseFactory->createResponse(400);
} catch (NotNormalizableValueException $e) {
	return $responseFactory->createResponse(422);
}
```

If everything works, the `$parsedBody` variable now holds an instance of `AuthenticateParsedBody`, populated with data
from the request body. If the body contains malformed JSON, we use a PSR-18 response factory to generate and return
a `400 Bad Request` response, and if it is syntactically valid but cannot be mapped onto the given class, we return
a `422 Unprocessable Entity` response. (Note that this is not a complete implementation; you might, for example, want
to include a more detailed explanation of what's wrong, or perhaps log the exception.)


## The data might still not be correct

We have an instance of `AuthenticateParsedBody`, but that's still not the final station. All it guarantees is that
both `$email` and `$password` are strings. Nowhere does it ensure that `$email` is a valid email address, nor that
either of the values is not empty.

Luckily, Symfony has another component for this: [Validator](https://symfony.com/components/Validator). Let's start
by adding some constraints to the parsed body class:

```php
use Symfony\Component\Validator\Constraints as Assert;

final class AuthenticateParsedBody
{
	/**
	 * @Assert\NotBlank()
	 * @Assert\Email()
	 */
	public string $email;

	/**
	 * @Assert\NotBlank()
	 */
	public string $password;
}
```

With these annotations we've declared that both properties must contain non-empty values, and that `$email` has to
be a valid email address. Now we can set up the validator and validate our `$parsedBody`:

```php
use Symfony\Component\Validator\ValidatorBuilder;

$validator = (new ValidatorBuilder())
	->enableAnnotationMapping()
	->getValidator();

$violations = $validator->validate($parsedBody);
if ($violations->count() > 0) {
	return $responseFactory->createResponse(422);
}
```

This is the simplest setup. The `$violations` variable contains a list of constraint violations, and – again, I've
skipped it for the sake of simplicity – we can include it in the response body to give the client a hint about what's
wrong.

After this last step, we know that the request body is syntactically fine (well-formed JSON), semantically correct
(all required fields are present and have the right types), and valid from the domain perspective (email is an email
address), and we represent it as a type-safe object. Let's just pass it along with the request:

```php
return $handler->handle(
	$request->withParsedBody($parsedBody)
);
```

And in the authentication request handler, we can fetch it from the request and assume it is valid through and through.
And since it is a properly typed object, with a little hint even our IDE and static analysis tools like PHPStan know
everything about its properties and their types:

```php
$parsedBody = $request->getParsedBody();
assert($parsedBody instanceof AuthenticateParsedBody);

$identity = $authenticator->authenticate(
	$parsedBody->email,
	$parsedBody->password
);
// ...
```


## Tying it all together

If you've read carefully, you've noticed that I've been omitting one very important detail the whole time: I've
hardcoded `AuthenticateParsedBody` in the middleware. But we don't only have one endpoint, and we want the middleware
to be reusable! Let's fix it.

In our solution, we rely upon the routing middleware: we know that it populates the request's `request-handler` attribute
with the resolved request handler – its class name, in our case, to be precise. That's something to work with, we just
need a way to tell if a given request handler requires body parsing, and what class of the parsed body it expects.
We're using a simple interface:

```php
use Psr\Http\Server\RequestHandlerInterface;

interface ParsedBodyRequestHandler extends RequestHandlerInterface
{
	public static function getParsedBodyClassName(): string;
}
```

So, as the first thing in the middleware, we fetch the `request-handler` attribute's value, check if it implements
our little interface, and ask it for the parsed body class name. If it doesn't implement this interface, we delegate
to the next handler right away:

```php
$requestHandlerClassName = $request->getAttribute('request-handler');
if ( ! \in_array(ParsedBodyRequestHandler::class, \class_implements($requestHandlerClassName), true)) {
	return $handler->handle($request);
}

$parsedBodyClassName = $requestHandlerClassName::getParsedBodyClassName();
```

The approach we've taken implies that the middlewares are not perfectly isolated; they have to be somewhat aware about
some of the other middlewares in the stack, and about the order in which they are executed. But that's how it is.
Routing wouldn't work without it, for example: the routing middleware only marks the resolved request handler in a request
attribute (a mechanism we make use of), and [another middleware](https://github.com/middlewares/request-handler) actually
looks it up in the DI container and executes it. So I guess some level of coupling between the middlewares is acceptable
and, most importantly, unavoidable.


## The whole thing

For the sake of completeness, here goes the whole code (sans infrastructure setup – serializer and validator are configured
in and provided by the DI container):

```php
use Psr\Http\Message\ResponseFactoryInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\Exception\NotNormalizableValueException;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

final class BodyParserMiddleware implements MiddlewareInterface
{
	private SerializerInterface $serializer;

	private ValidatorInterface $validator;

	private ResponseFactoryInterface $responseFactory;

	public function __construct(
		SerializerInterface $serializer,
		ValidatorInterface $validator,
		ResponseFactoryInterface $responseFactory
	) {
		$this->serializer = $serializer;
		$this->validator = $validator;
		$this->responseFactory = $responseFactory;
	}

	public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
	{
		$requestHandlerClassName = $request->getAttribute('request-handler');
		if ( ! \in_array(ParsedBodyRequestHandler::class, \class_implements($requestHandlerClassName), true)) {
			return $handler->handle($request);
		}

		$parsedBodyClassName = $requestHandlerClassName::getParsedBodyClassName();

		try {
			$parsedBody = $this->serializer->deserialize(
				(string) $request->getBody(),
				$parsedBodyClassName,
				JsonEncoder::FORMAT
			);
		} catch (NotEncodableValueException $e) {
			return $this->responseFactory->createResponse(400);
		} catch (NotNormalizableValueException $e) {
			return $this->responseFactory->createResponse(422);
		}

		$violations = $this->validator->validate($parsedBody);
		if ($violations->count() > 0) {
			return $this->responseFactory->createResponse(422);
		}

		return $handler->handle(
			$request->withParsedBody($parsedBody)
		);
	}
}
```


## Happily ever after

With all this set up, any request handler that needs to parse the request body is accompanied by a class that describes
its schema and validation constraints, and further represents the request body. The handler itself does not have to worry
about the parsing nor validation any more, and can focus on its actual job instead. If you ask me, that's a very nice
separation of responsibilities.

What do you think about it? Can you see any weak points in this solution? Do you use anything like that? I'm looking
forward to your comments!
