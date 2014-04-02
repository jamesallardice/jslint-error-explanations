<!---
{
    "titles": [
        "Expected a string and instead saw '{a}'"
    ],
    "slugs": [
        "expected-a-string-and-instead-saw-a"
    ],
    "linters": [
        "jslint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "Expected a string and instead saw '{a}'" error is thrown when JSLint
encounters **a comparison operator in which one of the operands is a `typeof`
expression and the other operand is not a string literal**. In the following
example we are checking whether a variable is a string:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var STRING_TYPE = "string";
function demo(a) {
    "use strict";
    return typeof a === STRING_TYPE;
}
```

The error is also raised when JSLint encounters **an unquoted JSON property**,
but only when in JSON parsing mode. JSLint enters JSON mode when the first
character of its input is `{` or `[`. In the following example the property `b`
should be enclosed in double quotes:

<!---
{
    "linter": "jslint"
}
-->
```javascript
{
    "a": 1,
    b: 2
}
```

### Why do I get this error?

In the case of the `typeof` comparison this error is raised to highlight a
**potentially confusing piece of code**. The code is perfectly valid and will
work in all cases, but could be difficult to read or understand at first glance.
If you want to store possible `typeof` values instead of comparing to literals,
you can safely ignore this warning. To avoid this message simply replace the
reference with the string literal it represents:

<!---
{
    "linter": "jslint"
}
-->
```javascript
function demo(a) {
    "use strict";
    return typeof a === "string";
}
```

In the case of unquoted JSON property identifer this error is raised to
highlight a **fatal syntax error**. The [JSON specification][json] states that
property identifiers must be wrapped in double quotes:

<!---
{
    "linter": "jslint"
}
-->
```javascript
{
    "a": 1,
    "b": 2
}
```

[json]: http://json.org/
