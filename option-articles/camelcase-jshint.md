<!---
{
    "titles": [
        "camelcase"
    ],
    "slugs": [
        "option-jshint-camelcase"
    ],
    "linters": [
        "jshint"
    ],
    "author": "jallardice",
    "subject": "option"
}
-->

### What does this option do?

The JSHint `camelcase` option is used to force all identifiers (function,
variable and property) to either be written in camel case or in uppercase with
underscores. It's common convention in JavaScript to use camel case for normal
identifiers and uppercase for identifiers that represent constants. In the
following example we have a couple of identifiers that break the camel case
rule:

<!---
{
    "linter": "jshint"
}
-->
```javascript
/*jshint camelcase: true */
var camel_case = 1;
var fake_constant = 2;
var obj = {
    not_good: 3
};
```

In the next example we've changed the identifiers so they conform to the rules:

<!---
{
    "linter": "jshint"
}
-->
```javascript
/*jshint camelcase: true */
var camelCase = 1;
var FAKE_CONSTANT = 2;
var obj = {
    notGood: 3
};
```

### When should I use this option?

The use of the `camelcase` JSHint option will cause an "Identifier '{a}' is not
in camel case" error, where "{a}" is the identifier in question, any time it
encounters an identifier that doesn't match the rules discussed above. You
should only enable this option when you want to enforce a coding style
throughout your program. This is generally a good idea when you're working on a
project with multiple developers to help keep things consistent.

Note that this is an *enforcing* option which means JSHint does not apply it by
default. If you do not explicitly set this option to `true` JSHint will allow
the use of bitwise operators anywhere in your code.
