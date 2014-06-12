<!---
{
    "titles": [
        "Weird relation",
        "Comparing to itself is potentially pointless"
    ],
    "slugs": [
        "weird-relation",
        "comparing-to-itself-is-potentially-pointless"
    ],
    "linters": [
        "jslint",
        "eslint"
    ],
    "author": "jallardice"
}
-->

### History

This warning has existed in two forms in JSLint and ESLint. It was introduced in
the original version of JSLint and has remained in both tools since. It is not
present in JSHint.

 - In JSLint the warning given is *"Weird relation"*

 - In ESLint the message used is *"Comparing to itself is potentially
   pointless"*

The situations that produce the warning have not changed despite changes to the
text of the warning itself.

### When do I get this error?

The "Weird relation" error is thrown when JSLint or ESLint encounters **a
comparison in which the left hand side and right hand side are the same**. In
the following example we attempt to compare `x` with itself:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var x = 10;
if (x === x) {
    x = 20;
}
```

JSLint will also raise this error when it encounters **a comparison in which
either the left hand side or right hand side is a string literal and the other
is a numeric literal**. In the next example we attempt to compare the string
`"10"` to the number `10`:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var x = 10;
if ("10" === 10) {
    x = 20;
}
```

### Why do I get this error?

This error is raised to highlight a **potentially confusing and potentially
pointless piece of code**. There are almost no situations in which you would
need to compare something to itself. There is, however, at least one valid use
case.

Since the special numeric value `NaN` is never equal to itself, you can use a
self-comparison to check whether some value is `NaN`. See the somewhat related
"[Use the isNaN function to compare with NaN][isnan]" for further discussion
around this. The following example will return true only if the value is `NaN`:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var x = parseInt("x", 10); // Results in NaN
if (x !== x) {
    x = 20; // Only if 'x' is NaN
}
```

If you are receiving this error for this specific use case, you can either
ignore the error and let your script fail the JSLint test, or you can use the
built-in isNaN function instead. Here's the above snippet rewritten:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var x = parseInt("x", 10); // Results in NaN
if (isNaN(x)) {
    x = 20; // Only if 'x' is NaN
}
```

[isnan]: /use-the-isnan-function-to-compare-with-nan
