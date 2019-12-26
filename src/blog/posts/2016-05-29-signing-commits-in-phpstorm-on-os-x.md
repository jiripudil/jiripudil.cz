---
legacyId: 19
title: Signing commits in PhpStorm on OS X
slug: signing-commits-in-phpstorm-on-os-x
datetime: 2016-05-29T11:00:00Z
draft: false
cupsOfCoffee: 2
perex: If you host your repositories on Github, you have probably noticed they started verifying GPG signatures back in April. After half a day of pain, googling and experimenting, I came up with this definitive guide on how to set this up in PhpStorm on OS X.
tags:
  - git
  - osx
  - phpstorm
  - security
---
First of all, you should generate a new GPG key (if you don't have any), add it to your Github profile and tell your
local Git installation to use it. This is nicely covered in the [Github help](https://help.github.com/articles/generating-a-gpg-key/).
(Installing GPG on Mac is as easy as `brew install gpg2 gpg-agent`.)

Good. Now tell Git to sign all commits automatically:

```
$ git config commit.gpgsign true
```

This works within the current working directory. If you want Git to sign _all_ commits, just add `--global` in there.
Continue by configuring GPG - add these two lines to `~/.gnupg/gpg.conf`:

```
no-tty
use-agent
``````

They tell GPG not to enforce running from within a terminal session so that it can be run from other programs like
PhpStorm, and to use gpg-agent so that you don't have to type your passphrase for every commit you make.

This should be it. But it's not. Yet. There's this one more thing. Now GPG doesn't have to run from terminal, but
it's missing a GUI. For Mac, there is `pinentry-mac`. Install it (`brew install pinentry-mac`) and tell gpg-agent
to use it in `~/.gnupg/gpg-agent.conf`:

```
pinentry-program /usr/local/bin/pinentry-mac
```

Now you're done. You should be able to commit from PhpStorm without getting any errors and failures, and if you push
to Github, your commits should have a nice green Verified marking :)
