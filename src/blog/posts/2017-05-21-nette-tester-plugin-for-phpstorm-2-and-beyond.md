---
legacyId: 30
title: "Nette Tester plugin for PhpStorm: 2.0.0 and beyond"
slug: nette-tester-plugin-for-phpstorm-2-and-beyond
datetime: 2017-05-21T16:20:00Z
draft: false
cupsOfCoffee: 15
perex: A few minutes ago, I have released a total rework of my intellij-nette-tester plugin that integrates Nette Tester into PhpStorm.
tags:
  - java
  - nette-tester
  - open-source
  - phpstorm
  - testing
---
I haven't paid much attention to the plugin recently, I know. And I'm sorry. I just could not find time and/or motivation.
But I am back, and so is the plugin. And it's one of a comeback indeed: **I have released a
[beta.1 version of 2.0.0](https://github.com/jiripudil/intellij-nette-tester/releases/tag/2.0.0-beta.1).**

It's a big leap from the previous version. First of all, it lacks some features that were present before: it does not
group tests into their `TestCase`s; it doesn't let you navigate to the failed test or run/debug it directly; it doesn't
tell you the duration of individual tests. I had to drop these features in order to make the plugin **work with pretty
much any version of Nette Tester**. I believe it's worth it.

Besides, these features are not gone forever. Once the
[`OutputHandler` is refactored](https://github.com/nette/tester/pulls/345) (which is
[apparently](https://zlml.cz/tester-vlastni-output-handler#comment-2988134637) the last bit blocking the release
of Tester 2.0), the plugin will be able to make use of the information provided to the output handler and the
removed features will make it back.

To compensate for the missing features, the plugin introduces some new ones:

- output stack traces are decorated with links to files (you need to set `Tester\Dumper::$maxPathSegments` to a high
    enough value in your test environment);
- you can view the diff of comparison failures (`Assert::same()` and alike) right in the IDE;
- you can right-click a directory and run the tests within it (yay!);
- you can navigate between the class and its test, or create a test case for a class easily (based on convention
    and namespace mapping configured in the project settings).

I hope you will love this release. I've put a lot of work into it and I'm proud of it. But I'm also pretty sure I've
left some bugs in there for you to catch, so please feel free to test the plugin and report any issues on
[Github](https://github.com/jiripudil/intellij-nette-tester/issues).
