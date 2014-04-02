<!---
{
    "titles": [
        "Spaces are hard to count. Use {a}"
    ],
    "slugs": [
        "spaces-are-hard-to-count-use-a"
    ],
    "linters": [
        "jslint",
        "jshint",
        "eslint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "Spaces are hard to count. Use {a}" error is thrown when JSLint, ESLint or
JSHint (prior to version 1.0.0) encounters a **regular expression literal
containing two or more consecutive space characters**. In the following example
we define a regular expression that will match the string
"three&nbsp;&nbsp;&nbsp;spaces" (there are three spaces between the two words):

<!---
{
    "linter": "jslint"
}
-->
```javascript
var regex = /^three   spaces$/;
```

### Why do I get this error?

This error is raised to highlight a **potentially confusing piece of code**.
Your script will run without error if you do not change it, but it could be
confusing to other developers, especially at first glance. Anyone who wants to
understand exactly what the regular expression should match will have to stop
and count the number of spaces. This is unnecessary, since there is an
alternative syntax that makes it much clearer. To fix this error, simply use the
repetition operator:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var regex = /^three {3}spaces$/;
```

Alternatively, if you have a valid reason to use consecutive literal space
characters and don't want to use the repetition operator, you can modify your
code to use the `RegExp` constructor rather than a regular expression literal,
since JSLint, JSHint and ESLint will only raise this error for literals:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var regex = new RegExp("^three   spaces$");
```

In ESLint the rule that generates this warning is named `no-regex-spaces`. You
can disable it by setting it to `0`, or enable it by setting it to `1`.
