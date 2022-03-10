---
title: "Storing dates and times in databases: the painless way"
slug: storing-dates-times-in-databases-painlessly
datetime: 2022-03-03T07:00:00Z
draft: false
cupsOfCoffee: 6
perex: >-
  I've already talked about working with date and time values on both sides of the web stack. However, in web development, we not only manipulate temporal values, we often need to store them somewhere and retrieve them later. This post discusses the best methods of persisting dates and times in databases.
tags:
- database
- datetime
- sql
- time
---
> This is the third installment in a series of posts about handling date and time in web applications:
>
> 1. [Beyond DateTime: a domain-driven approach to date and time](/blog/beyond-datetime-domain-driven-approach)
> 2. [Beyond Date: bulletproof date and time API in JavaScript](/blog/beyond-date)
> 3. **Storing dates and times in databases: the painless way**
> 4. [Your application needs a clock](/blog/your-application-needs-clock)

In the previous two posts, I've covered working with date and time both [in PHP](/blog/beyond-datetime-domain-driven-approach) and [in JavaScript](/blog/beyond-date), and sending temporal values back and forth between the client and the server. One of the remaining topics is about storing date and time in databases.

If you haven't read the previous posts — especially the first one —, please do so now because it lays quite a lot of necessary groundwork. I'm going to refer to most of the concepts introduced there throughout this post. In fact, I think it will be best to list them one by one and discuss the most suitable SQL data type (or types) to store each of them. After all, we've already established the concepts and we know what kind of temporal data we need to represent and store.


## SQL data types

Before we start, let's skim through the relevant data types we have at our disposal. I'm going to talk specifically about PostgreSQL for several reasons: it tends to lean a lot towards compatibility with the SQL standard; I have the most experience with it; and I simply love it.

PostgreSQL (in line with the standard) defines three date-time data types: `DATE` for a date value without any time of day, `TIME` for a time value without specific date, and `TIMESTAMP` as a combination of the two. The latter two types come in two flavours: `WITH` and `WITHOUT TIME ZONE`. Finally, there's also `INTERVAL` for a temporal interval.

Let's see how we can use these types to represent various temporal concepts introduced in the [initial post](/blog/beyond-datetime-domain-driven-approach).


## LocalDate and LocalTime

We'll start with the low-hanging fruits: `LocalDate` and `LocalTime` values are very simple to store because they map exactly to a `DATE` and a `TIME [WITHOUT TIME ZONE]` data types, respectively:

```sql
CREATE TABLE datetimes ("date" date, "time" time);
```

The mapping from and to PHP is quite straightforward:

```php
$pdo->prepare('INSERT INTO datetimes ("date", "time") VALUES (?, ?);')
    ->execute([(string) $localDate, (string) $localTime]);
```

```php
$dates = array_map(
    static fn(array $row) => LocalDate::of($row['date']),
    $pdo->prepare('SELECT "date" FROM datetimes')->fetchAll(),
);

$times = array_map(
    static fn(array $row) => LocalTime::of($row['time']),
    $pdo->prepare('SELECT "time" FROM datetimes')->fetchAll(),
);
```


## LocalDateTime

Similarly, a `LocalDateTime` can be stored in a `TIMESTAMP WITHOUT TIME ZONE`:

```sql
CREATE TABLE datetimes (datetime timestamp without time zone);
```

There is one caveat, though: PostgreSQL's default date-time format, amusingly called 'ISO,' differs from the actual ISO 8601 format. While the specification puts a `T` between the date and time parts, the ISO format in PostgreSQL uses a single space in its place.

The conforming format (with a `T`) is accepted on the input, so it's enough to just convert the `LocalDateTime` to string when inserting into the database:

```php
$pdo->prepare('INSERT INTO datetimes (datetime) VALUES (?);')
    ->execute([(string) $localDateTime]);
```

The reading part is a bit trickier, though, because the database output always uses space. You'll need a custom parser for that:

```php
$parser = (new PatternParserBuilder())
    ->append(IsoParsers::localDate())
    ->appendLiteral(' ')
    ->append(IsoParsers::localTime())
    ->toParser();

$localDateTimes = array_map(
    static function (array $row) use ($parser) {
        return LocalDateTime::parse($row['datetime'], $parser);
    },
    $pdo->prepare('SELECT datetime FROM datetimes')->fetchAll(),
);
```


## Instant

Since instant is basically a (large) number of seconds since the Unix epoch, it's easy to grab the numeric value and store it in a `BIGINT` column:

```sql
CREATE TABLE instants (instant bigint);
```

Using `BIGINT` is effortless for the computer because it doesn't require any conversion. You just grab `$instant->getEpochSecond()` when saving the data:

```php
$pdo->prepare('INSERT INTO instants (instant) VALUES (?);')
    ->execute([$instant->getEpochSecond()]);
```

And you recreate `Instant::of($timestamp)` when reading it from the database:

```php
$instants = array_map(
    static fn(array $row) => Instant::of((int) $row['instant']),
    $pdo->prepare('SELECT instant FROM instants')->fetchAll(),
);
```

But it's not as comfortable for humans if you need to inspect the data manually: it puts some cognitive load on humans to parse huge numbers or compare them against each other, and you cannot really make anything of a huge numeric timestamp without converting it to a date-time value first. That's tedious if you need to reach into the database during debugging:

```sql
SELECT instant FROM instants;
```

| instant    |
|------------|
| 1646290800 |

You have to convert these values in the query to get anything useful:

```sql
SELECT to_timestamp(instant) FROM instants;
```

| to_timestamp               |
|----------------------------|
| 2022-03-03 07:00:00 +00:00 |

Another viable point of view, and one that I slightly prefer, is that an instant represents a timestamp, and should therefore be stored in a `TIMESTAMP [WITHOUT TIME ZONE]` data type:

```sql
CREATE TABLE instants (instant timestamp without time zone);
```

The conversion from PHP to database is easy, because `Instant` exposes a handy implementation of `__toString()` that formats the instant as a date-time in UTC:

```php
$pdo->prepare('INSERT INTO instants (instant) VALUES (?);')
    ->execute([(string) $instant]);
```

When converting from database to PHP, you'll have to reuse the custom parser introduced in the `LocalDateTime` section, and convert the parsed value to an instant:

```php
$instants = array_map(
    static function (array $row) use ($parser) {
        $localDateTime = LocalDateTime::parse($row['instant'], $parser);
        return $localDateTime->atTimeZone(TimeZone::utc())->getInstant();
    },
    $pdo->prepare('SELECT instant FROM instants')->fetchAll(),
);
```

In exchange, you get a formatted date and time, which is much easier to process for a human brain:

```sql
SELECT instant FROM instants;
```

| instant             |
|---------------------|
| 2022-03-03 07:00:00 |

On top of that, `TIMESTAMP` is a better choice if you need timestamps with a higher resolution:

```sql
INSERT INTO instants (instant) VALUES ('2022-03-03 07:00:00.123456');
```


## ZonedDateTime

The trickiest of them all is the `ZonedDateTime`. It might seem intuitive that the `TIMESTAMP WITH TIME ZONE` variant would be perfect for this, but it's quite the contrary.

The sneaky quirk of the type is that it is only _aware_ of the time zone on the _input_. If you give it a value with a time zone, it normalizes it into UTC and stores that normalized value. Upon retrieval, it converts the value to the time zone as configured for the server instance:

```sql
CREATE TABLE zoned ("datetime" timestamp with time zone);
INSERT INTO zoned VALUES ('2022-03-03 08:00:00+01');

SET timezone = 'Europe/Kiyv';
SELECT "datetime" FROM zoned;
```

| datetime               |
|------------------------|
| 2022-03-03 09:00:00+02 |

You can enforce a different time zone explicitly:

```sql
SELECT "datetime" AT TIME ZONE 'Europe/Prague' FROM zoned;
```

| datetime            |
|---------------------|
| 2022-03-03 08:00:00 |

But all the database ensures is that the resulting value always points to the same _instant_. It does _not_, however, preserve the time zone information – that is effectively lost when you save the value.

The trick is to store the `LocalDateTime` value in a `TIMESTAMP WITHOUT TIME ZONE` instead, and save the time zone identifier along with it. You can use a separate column, or you can make use of PostgreSQL's composite types to store them in a single column:

```sql
CREATE TABLE zoned ("datetime" timestamp without time zone, "timezone" text);
```

```php
$pdo->prepare('INSERT INTO zoned (datetime, timezone) VALUES (?, ?)')
    ->execute([(string) $zonedDateTime->getDateTime(), $zonedDateTime->getTimeZone()->getId()]);
```

Either way, you can safely reconstruct an instance of a `ZonedDateTime` in the original time zone from these. Again, you'll have to make use of the custom parser from above:

```php
$zonedDateTimes = array_map(
    static function (array $row) use ($parser) {
        $localDateTime = LocalDateTime::parse($row['datetime'], $parser);
        $timeZone = TimeZone::of($row['timezone']);
        return ZonedDateTime::of($localDateTime, $timeZone);
    },
    $pdo->prepare('SELECT datetime, timezone FROM zoned')->fetchAll(),
);
```


## Duration and Period

Sometimes you might have to store time intervals, such as race results or the length of a validity period. While `Duration`s (a deterministic time-based interval) and `Period`s (a calendar-based interval) are two entirely different things that cannot be mixed together, PostgreSQL defines the `INTERVAL` type to store either of them:

```sql
CREATE TABLE durations (duration interval);
CREATE TABLE periods (period interval);
```

The database recognizes the standard ISO format on the input, so the conversion from PHP is again just a matter of casting the value to string:

```php
$pdo->prepare('INSERT INTO durations (duration) VALUES (?);')
    ->execute([(string) $duration]);

$pdo->prepare('INSERT INTO periods (period) VALUES (?);')
    ->execute([(string) $period]);
```

Unfortunately, PostgreSQL defaults to its own format of interval output which looks like `02:30` or `1 year 3 mons`. Unless you want to implement a parser for this format in PHP, I recommend you configure the database to use the more universal ISO 8601:

```sql
SET intervalstyle = 'iso_8601';
```

This time, it's actually a standard-compliant format, so you can easily read and convert the values to PHP:

```php
$durations = array_map(
    static fn(array $row) => Duration::parse($row['duration']),
    $pdo->prepare('SELECT duration FROM durations')->fetchAll(),
);

$periods = array_map(
    static fn(array $row) => Period::parse($row['period']),
    $pdo->prepare('SELECT period FROM periods')->fetchAll(),
);
```

While the database provides a single data type for both `Duration`s and `Period`s, make sure not to mix the two concepts. The database is capable of storing an interval of 2 months and 2 hours, but you won't be able to parse such value into either of the PHP classes.


## Closing thoughts

I hope this post has been exhaustive but not exhausting. I believe the mappings I've shown here map temporal concepts from PHP onto the most appropriate database data types, hiding as many footguns from you as possible, while still letting you comfortably access and even manipulate the values through SQL directly.

In many cases, conversions from the database to PHP and vice versa require some additional logic, or even custom parsers. Luckily, many database abstractions in PHP allow you to define custom type mapping, so that this kind of code only lies in one place, letting your application deal with pure, immutable representations of various aspects of time.

While this post has only focused on PostgreSQL in particular, lots of other SQL databases expose similar data types and capabilities. Take time to get to know your database, and pay special attention to little nuances; for instance, MySQL defines distinct `DATETIME` and `TIMESTAMP` types, but they are semantically equal to PostgreSQL's `TIMESTAMP WITHOUT TIME ZONE` and `TIMESTAMP WITH TIME ZONE`, respectively, including the quirks with losing the time zone.

If you've read the whole series carefully (just a reminder to check out the previous [two](/blog/beyond-datetime-domain-driven-approach) [posts](/blog/beyond-date)), I think you should by now also have a sufficient mental framework to be able to map temporal concepts to other kinds of databases such as document databases. Generally, always start from the conceptual level and your specific needs and use cases.

If you have any remarks or questions, feel free to join the discussion. Either way, I'm looking forward to see you in the next, last installment to this series of posts on time. This time, we're going to talk about telling time. Stay tuned!
