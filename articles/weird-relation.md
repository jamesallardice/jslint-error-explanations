<!---
{
    "titles": [
        "Weird relation"
    ],
    "tools": [
        "jslint"
    ],
    "author": "jallardice",
    "slugs": [
        "weird-relation"
    ]
}
-->

### When do I get this error?

JSLint will throw the "Weird relation" error when it encounters **a comparison in which the left and right hand sides
are "similar"**, or **a comparison in which either the left or right hand side is a string literal and the other is a
numeric literal**. In the following example we attempt to compare `x` with itself:

```javascript
var x = 10;
if (x === x) {
    x = 20;
}
```

### Why do I get this error?

This error is raised to highlight a **potentially confusing and potentially pointless piece of code**. There are almost
no situations in which you would need to compare something to itself.

There is, however, one use case for this kind of comparison. Since the special Number value `NaN` is never equal to
itself, you can use a self-comparison to check whether some value is `NaN`. The following example will return `true`
only if the value is `NaN`.

```javascript
var x = parseInt("x", 10); //Results in NaN
if (x !== x) {
    /* We will only end up in here if 'x' is NaN but
     * JSLint doesn't like it */
    x = 20;
}
```

If you are receiving this error for this specific use case, you can either ignore the error and let your script fail the
JSLint test, or you can use the built-in `isNaN` function instead. Here's the above snippet rewritten:

```javascript
var x = parseInt("x", 10); //Results in NaN
if (isNaN(x)) {
    /* We will only end up in here if 'x' is NaN and
     * this time JSLint is happy */
    x = 20;
}
```
