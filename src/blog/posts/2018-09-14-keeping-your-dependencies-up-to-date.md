---
legacyId: 40
title: Keeping your dependencies up-to-date
slug: keeping-your-dependencies-up-to-date
datetime: 2018-09-14T11:25:00Z
draft: false
cupsOfCoffee: 5
perex: As the business requirements grow, so does the list of dependencies. Managers ask for a new feature, you just composer-require this thing and that other thing, and wire it into the application. But how do you keep track of new features in the dependencies? Or bugfixes? Or, most importantly, security patches?!
tags:
  - ci
  - composer
  - php
  - security
  - server
---
Go and try running `composer show | wc -l` on your projects. I've done that on some of mine, and the average number
of dependencies tends to near one hundred for not-so-big applications. _One hundred._ That's a lot. That basically
gives you a _guarantee_ of bugs and if you're unlucky, maybe even security issues.

And frankly, how often do you update them? Not just the one that has a shiny new feature you want to use, but _all_
of them? Or, in the first place, how do you even *find out* that you should update them? How do you learn about
new releases?

We've been discussing this question recently and found out that it's a task best left to Composer itself. It has
a useful command that "shows a list of installed packages that have updates available, including their current
and latest versions":

```sh
$ composer outdated
```

While it is handy, it's also uncomfortable to have to run the command manually. Depending on other developers
(where "other" includes the future you) to call this periodically and update the dependencies is, let's admit it, naïve.

I know! Let's put it into a job on the CI server! It will keep track of the outdated dependencies and give us a hint
when there is an update ready. The `outdated` command even has a few useful flags for this usage:

```sh
$ composer outdated --minor-only --strict
```

With the `--minor-only` flag, the command only reports new available minor and patch releases. This is useful because
major version bumps usually signify backwards-incompatible changes in the code, and such update might take considerably
more time, while minor and patch version updates should be pretty much effortless.

There is also a `--direct` flag which instructs Composer to report available updates only for your direct dependencies.
This makes sense in a way, because updating indirect dependencies is not always as straightforward - there is an extra
layer between your application and that dependency, and that extra layer might enforce its own constraints on the
indirect dependency version. However, that is usually a problem only with major version bumps, therefore I believe
you don't need the `--direct` flag if you use `--minor-only`.

Finally, the `--strict` flag means that the command shall finish with a non-zero exit code if there are outdated
dependencies, causing the CI job to fail. This is most important, because otherwise you would have little motivation
to take a look at the job output. But it's also tricky:

Imagine you are fixing a critical bug and you want to get it to production pronto, but then the CI server says
"no, update this package first, there's a new *patch* version!" Oh, come on!

That's why we've marked this job as allowed to fail. It needs a lot of discipline at this point: after you ignore
the warning, push the bugfix to production and get some coffee to calm your nerves, you should revisit the failed
job and update the dependency.

Another scenario in which you want this job to be able to fail is when there is a conflict between your dependencies
that prevents you from updating one of them. You can contact the maintainer and wait for them to resolve it.
But at _this_ point, it needs twice as much discipline: in my experience, if the allowed-to-fail jobs keep failing
for too long, they tend to get ignored and the dependency debt accumulates.

A somewhat reliable way of dealing with these situations is to regularly add review of dependencies to your planning
process. In every iteration, have a developer take a look into it. Take turns so that it does not become a one man's
burden. When done regularly, it shouldn't take more than a couple of minutes, which is a bargain in exchange for
being up-to-date with latest bug and security patches.

(While you're at it, I'd also recommend requiring the
[roave/security-advisories](https://github.com/Roave/SecurityAdvisories) package which prevents you from updating
to versions that are known to contain security vulnerabilities.)
