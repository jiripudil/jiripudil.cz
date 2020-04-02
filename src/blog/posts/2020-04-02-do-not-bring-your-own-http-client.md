---
legacyId: 99
title: Don't bring your own HTTP client
slug: do-not-bring-your-own-http-client
datetime: 2020-04-02T11:30:00Z
draft: false
cupsOfCoffee: 4
perex: >-
  If you are developing a library that needs to make HTTP requests, here's how not to make it difficult for your consumers.
tags:
  - api
  - http
  - interop
  - open-source
  - php
  - software-architecture
---
With the hyped concepts of serverless and microservices and federated authentication and whatnot, sending and receiving
HTTP requests and responses is becoming a more and more crucial operation in web applications.

Because every service exposes an entirely different API, both in terms of technical details (REST, RPC, GraphQL, ...)
and domain content (what fields are exposed and of what data type), developers usually resort to pulling a Composer
package that is tailored to the specific service. For each and every one of them.

Eventually, they end up with multiple dependencies that need to send and receive HTTP messages. If you've been in such
situation, you probably know that many vendors tend to fall into the trap of a phenomenon that I personally call BYOHC
("bring your own HTTP client").


## BYOHC to this party

The PHP-FIG has been putting great effort into HTTP communication in the recent years: the first blossom of this effort
was PSR-7 that defines interfaces for HTTP messages. It has been accepted in 2015 and quickly gained support and adoption
in frameworks and libraries throughout the PHP ecosystem. That's one checkbox ticked – frameworks no longer have to
come up with their own, non-interoperable HTTP abstractions.

Nowadays, pretty much any HTTP package that you're going to pull into your application very likely relies on the PSR-7
interfaces. And here comes the stumbling block: they are just interfaces. Whenever a package needs to actually *create*
a `Request` object to work with, a mere interface is not enough; and so the vendor decides to take the easy route and
use one specific PSR-7 implementation.

We have a problem there: if you require two different packages that, in turn, require two different PSR-7 implementations,
you end up with two different PSR-7 implementations in your application. Unnecessarily.

And, unfortunately, it doesn't end there. Even if we had a way to create HTTP messages in an interoperable fashion,
the package still needs to *send* the request and receive a response through an HTTP client. Again, the vendor decides
to pull in their favourite while another vendor chooses a different one, and eventually you have two HTTP clients in
your application. Unnecessarily.

But wait, that's still not the end of it! A more conscious vendor might think, 'hey, I don't want to hard-code a
dependency on this one HTTP client,' and so they create an interface (which usually contains nothing more than a
`send(RequestInterface): ResponseInterface` method), provide an adapter for their client of choice, and call it a day.

So you end up with an application in which you get to choose one HTTP client to rule them all (yay!), but still have to
write and maintain a number of adapters that, frankly, mostly differ only in the namespace of the interface they implement.
Or you just resign to having your `vendor` directory cluttered with three different HTTP clients and two different PSR-7
implementations.


## Let's talk about standards

Of course that's not optimal, and of course developers know that. It didn't take long for a group of them to emerge
and start defining an interface for an HTTP client. At that time, the activity was called [HTTPlug](http://httplug.io/)
and gained some popularity quickly. Collaterally, they also solved the other problem by defining interfaces for PSR-7
message factories, and implemented an auto-discovery mechanism for ease of use.

Long story short, HTTPlug has been proposed to PHP-FIG and as a result, we now have two more handy recommendations:

- **PSR-17 HTTP Factories** that defines interfaces for PSR-7-compatible factories, and
- **PSR-18 HTTP Client** that defines interfaces for an HTTP client and related exceptions.

These are the dependencies a vendor should require these days when writing a package that communicates over HTTP, and
this is how you should express this requirement in a `composer.json` file:

```json
{
  "require": {
    "psr/http-client": "^1.0",
    "psr/http-client-implementation": "*",
    "psr/http-factory": "^1.0",
    "psr/http-factory-implementation": "*"
  }
}
```

The `psr/http-client` and `psr/http-factory` packages provide the interfaces, and requiring the two respective virtual
packages (`psr/http-client-implementation` and `psr/http-factory-implementation`) ensures that the consumer of your
package has a compatible implementation installed.

Here goes an example of using those interfaces in the code:

```php
use Psr\Http\Client\ClientInterface;
use Psr\Http\Message\RequestFactoryInterface;
use Psr\Http\Message\StreamFactoryInterface;

final class MyServiceClient
{
	private RequestFactoryInterface $requestFactory;

	private StreamFactoryInterface $streamFactory;

	private ClientInterface $httpClient;

	public function __construct(
		RequestFactoryInterface $requestFactory,
		StreamFactoryInterface $streamFactory,
		ClientInterface $httpClient
	) {
		$this->requestFactory = $requestFactory;
		$this->streamFactory = $streamFactory;
		$this->httpClient = $httpClient;
	}

	public function addThing(array $thing): void
	{
		$body = $this->streamFactory->createStream(json_encode($thing));
		$request = $this->requestFactory->createRequest('POST', 'https://api.myservice.com/things')
			->withHeader('Content-Type', 'application/json')
			->withBody($body);

		$response = $this->httpClient->sendRequest($request);
		$statusCode = $response->getStatusCode();

		if ($statusCode > 500) {
			throw new ServiceUnavailableException();
		}

		if ($statusCode === 500) {
			throw new ServerErrorException();
		}

		if ($statusCode >= 400) {
			throw new ClientException();
		}
	}
}
```

This is a very sketchy implementation, but I believe it sends the right message (haha): you delegate creating PSR-7
objects to PSR-17 factories, and depend on a PSR-18 interface for an HTTP client. This code relies on the consuming
application to provide the implementations of choice through the means of dependency injection, and is completely
agnostic about what they are, as long as they implement the required interfaces.

The code also illustrates one very important aspect of the PSR-18 spec: the HTTP client does **not** throw an exception
for non-2xx status codes. You might not be a huge fan of this decision, but it makes sense in a way, and, most importantly,
the behaviour is now clearly defined. Remember the scenario above in which you had to write an adapter for every vendor's
interface? You couldn't know, without studying their code, how they expected the HTTP client to behave in situations like
this, and thus could easily introduce bugs. Phew!


## What now?

Both of the aforementioned standards have been accepted only in 2018, so I guess it might still take some time for vendors
to adapt. However, HTTPlug was rather quick about it: they have since released version 2.0 which unifies their HTTP client
interface with PSR-18 and brings support of PSR-17 into their auto-discovery mechanism. So whenever a package depends
on `php-http/httplug:^2.0`, your PSR-17 factories and PSR-18-compatible HTTP client should all cooperate with it just fine.

If you're writing a package that needs to send (synchronous) HTTP requests and receive HTTP responses, I can see no reason
against sticking purely to PSR-17 and PSR-18. So, if you're writing something from scratch, there's nothing to discuss,
just go with the PSRs from the beginning. If you're maintaining an existing code, please consider refactoring as soon
as you can afford to release a BC-breaking version.

This is not to say that HTTPlug's time is entirely over – while I think it has served its purpose of paving the way for
what has eventually become widespread recommendations, it also defines an interface for an `AsyncHttpClient`. This is
something not yet covered by PSRs, mainly because there is yet no standard for promises in PHP. But that may change
in the future as well.

As a final remark, I'd like to express my endless gratitude to the people behind HTTPlug and to the people who have
pushed it to PHP-FIG and made this happen.

Also thank you, dear readers, for taking time to read this post! Feel free to share your thoughts in comments below,
and I'm looking forward to seeing you all at a party which doesn't enforce the BYOHC policy, hoping such parties will
soon become a majority :)
