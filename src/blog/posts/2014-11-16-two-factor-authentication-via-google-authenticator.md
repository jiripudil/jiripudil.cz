---
legacyId: 5
title: Two-factor authentication via Google Authenticator
slug: two-factor-authentication-via-google-authenticator
datetime: 2014-11-16T13:00:00Z
draft: false
cupsOfCoffee: 5
perex: The need for authentication mechanisms that provide more security has been rising during the recent years. Google has ventured into this field with their Authenticator application which is now used not only by Google itself, but also other big players like Github or Dropbox. And you know what? It's not really that difficult to join this elite group. I'm going to show you how.
tags:
  - 2fa
  - nettefw
  - open-source
  - php
  - security
---
The whole thing is based on a Time-Based One-Time Password Algorithm as specified in [RFC 6238](https://tools.ietf.org/html/rfc6238).
The TOTP algorithm - or more generally the HOTP algorithm - generates a pseudo-random numeric passcode based on a secret
and a counter (which in this case is current Unix time). More specifically, you get a new 6-digit code every half a minute.

I've written this little [tool](https://github.com/o2ps/TotpAuthenticator) that implements the TOTP algorithm in the
same way Google Authenticator does and also can build the URI to exchange the required information with Google Authenticator
application.


## Installation and configuration

Oops/TotpAuthenticator requires PHP >= 5.4 because I'm too lazy to write `array()`. You can install the package via Composer:

```sh
$ composer require oops/totp-authenticator:~2.0
```

If you use Nette, you can easily integrate it. Just add the extension and configure it:

```yaml
extensions:
    totp: Oops\TotpAuthenticator\DI\TotpAuthenticatorExtension

totp:
    issuer: MyApplication
    timeWindow: 1
```

The `Oops\TotpAuthenticator\Security\TotpAuthenticator` will then become available for you to autowire into your
application.

If you don't use Nette, you can directly instantiate the class:

```php
$totpAuthenticator = (new Oops\TotpAuthenticator\Security\TotpAuthenticator)
    ->setIssuer('MyApp')
    ->setTimeWindow(1);
```

The `timeWindow` option sets a benevolence that compensates for possible differences between your server's time and
Google Authenticator's time. The default value is 1, which means the code for previous or next 30-second block would
be also considered valid. You can set it to zero if you want to be super strict, but I'd strongly recommend not setting
it to a higher value than one.

The `issuer` is optional, but is quite useful if you use some generic value as the user's account name, such as their
email address. As multiple services can use that same value as a way of identifying the user, you should provide `issuer`
to distinguish your app's code in the Google Authenticator app.


## Setting up 2FA

In the first step, we need to generate a random secret and store it somewhere with the user, likely in the database.
A security sidenote: The secret is a value that, once exploited, can directly be used to compute the correct 6-digit
code and thus possibly compromise the user's account. So - and I can't stress this enough - in your `storeSecret()`
implementation, a must-have security measure is to encrypt the secret.

```php
$secret = $totpAuthenticator->getRandomSecret();
$this->userManager->storeSecret($user->id, $secret);
```

Now we need to share the secret with the Google Authenticator app. This is most conveniently done via a QR code
(I'll leave that up to you, you can use e.g Filip Procházka's `qrencode` wrapper [`Kdyby/QrEncode`](https://github.com/Kdyby/QrEncode)).
The QR code should contain a URI with the secret and the user's account name. You can pass whatever you use as a unique
identifier for the user, for example an email address:

```php
$uri = $totpAuthenticator->getTotpUri($secret, $user->email);
// display $uri in a QR code
```

You might as well want to display the secret and account name to the user so that they can punch those into Google
Authenticator directly, without scanning the code.


## Verification

The user has just set up the account in Google Authenticator and 6-digit codes have started showing up to them in
30-second cycles. You should, at this moment, ask them to enter the code to verify that everything worked correctly.
Let them enter the code via a form and verify it against their stored secret:

```php
if ($totpAuthenticator->verifyCode($code, $secret)) {
	// successfully verified

} else {
	// incorrect code
}
```

And that's it. Your users can now enhance their accounts' security with two-factor authentication via Google
Authenticator app.


## Closing thoughts

You might want to take a few further security considerations into account. First, as with any other manipulation with
sensitive data, it's generally a good idea to have the user enter their account password to prove both that they are
still who they claim they are and that they really know what they're doing.

Also, at the moment of setting up 2FA, it is quite a good idea to generate a set of recovery codes that the user can
store somewhere secure, so that they don't get locked out of their account in case they lose access to their phone.
Please make sure that these codes are complex enough and, more importantly, super encrypted.


## Update 2014-12-03

[Michal Špaček](https://www.michalspacek.cz/) pointed out that - however it may be prominent - Google Authenticator
is not the only TOTP app out there. After a deep thought, I decided to rename the package to something more general:
TotpAuthenticator. I've updated all necessary references in this post except the references to Google Authenticator
mobile app. While those remain intact, be assured that the TotpAuthenticator package should be just fine with any
other 2FA app that utilizes the TOTP algorithm.
