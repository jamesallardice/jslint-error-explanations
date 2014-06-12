<!---
{
    "titles": [
        "Avoid arguments.{a}",
        "W059"
    ],
    "slugs": [
        "avoid-arguments",
        "w059"
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

The "Avoid arguments.{a}" error is thrown when JSLint, JSHint or ESLint
encounters **a reference to the `callee` or `caller` property of an `arguments`
object**. The text of this warning can therefore be either "Avoid
arguments.callee" or "Avoid arguments.caller". JSHint will only raise this
warning if the `noarg` option is set to `true`. In the following example we have
a simple function that calculates the factorial of each number in an array. It
uses `arguments.callee` to call itself recursively:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var numbers = [1, 2, 3, 4, 5];
numbers.map(function (n) {
    return n < 1 ? 1 : n * arguments.callee(n - 1);
});
// Returns [1, 2, 6, 24, 120]
```

### Why do I get this error?

This error is raised to highlight the **use of a deprecated language feature**.
The code will work as expected in most environments at the moment but support
will eventually be dropped.

The `callee` and `caller` properties of the `arguments` object were useful in
old versions of JavaScript to achieve recursion in anonymous function
expressions as shown in the example above. It works but causes optimization
problems for the interpreter and can have the unfortunate effect of causing the
value of `this` to change within the function.

To solve these problems ECMAScript 3 introduced the concept of *named* function
expressions. To avoid this warning modify your code to use them instead:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var numbers = [1, 2, 3, 4, 5];
numbers.map(function factorial(n) {
    "use strict";
    return n < 1 ? 1 : n * factorial(n - 1);
});
// Returns [1, 2, 6, 24, 120]
```

Notice the addition of the `"use strict"` directive in that example. In
ECMAScript 5 the use of `arguments.callee` and `arguments.caller` were
deprecated and removed from strict mode. Attempting to reference either property
within a function running in strict mode will cause a type error.

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W059**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W059 */` directive.

In ESLint the rule that generates this warning is named `no-caller`. You can
disable it by setting it to `0`, or enable it by setting it to `1`.
