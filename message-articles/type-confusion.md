<!---
{
    "titles": [
        "Type confusion: {a} and {b}"
    ],
    "slugs": [
        "type-confusion-a-and-b"
    ],
    "linters": [
        "jslint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "Type confusion: {a} and {b}" error is thrown when JSLint (versions dated
between June 2011 and July 2011) encounters **an attempt to change the type of
data assigned to a variable**. In the following example we first assign a number
to `x` and then attempt to assign a string:

<!---
{
    "linter": "jslint",
    "version": "2011-06-24"
}
-->
```javascript
var x = 1; // number
x = "str"; // string
```

### Why do I get this error?

This error is raised to highlight a **potentially confusing piece of code**. When you assign a value to a variable, it is common to expect the data type of that value to remain consistent throughout a program. However, in JavaScript you are free to assign values of any type to any variable, regardless of its current value, so there is no language-based reason for this warning.

In fact, the code within JSLint that leads to this warning lived such a short life in the wild that it was quite likely just an experiment, never really intended for public use. Unfortunately, it appears various IDEs or editors with built-in JavaScript linting functionality are stuck using an old version of JSLint in which type checking was available.

To resolve the issue (assuming you want to retain the ability to assign values of different types) you should upgrade to a more recent version of JSLint. If that is not possible, you can set the `confusion` option to `true`:

<!---
{
    "linter": "jslint",
    "version": "2011-06-24"
}
-->
```javascript
/*jslint confusion: true */
var x = 1; // number
x = "str"; // string
```
