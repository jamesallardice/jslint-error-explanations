<!---
{
    "titles": [
        "Spaces are hard to count. Use {a}"
    ],
    "tools": [
        "jslint",
        "jshint"
    ],
    "tags": [
        "regexp"
    ],
    "contributors": [
        "jallardice"
    ],
    "slugs": [
        "spaces-are-hard-to-count-use-a"
    ]
}
-->

### When do I get this error?

JSLint and JSHint (before version 1.0.0) will throw the "Spaces are hard to count. Use {a}" error when they encounter
**a regular expression literal containing multiple consecutive space characters**. In the following example we define a
regular expression that will match the string "three&nbsp;&nbsp;&nbsp;spaces" (there are three spaces between the two
words):

```javascript
var regex = /three   spaces/;
```

### Why do I get this error?

This error is raised to highlight a **potentially confusing piece of code**. Your script will run without error if you
do not change it, but it could be confusing to other developers, especially at first glance.

Anyone who wants to understand exactly what the regular expression should match will have to stop and count the number
of spaces. This is unnecessary, since there is an alternative syntax that makes it much clearer. To fix this error,
simply use the repetition operator:

```javascript
var regex = /three {3}spaces/;
```

Alternatively, you could modify your code to use the `RegExp` constructor rather than a regular expression literal,
since JSLint and JSHint will only raise this error inside a literal:

```javascript
var regex = new RegExp("three   spaces");
```
