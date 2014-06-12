<!---
{
    "titles": [
        "Use the || operator"
    ],
    "slugs": [
        "use-the-or-operator"
    ],
    "linters": [
        "jslint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "Use the || operator" error is thrown when JSLint encounters a **conditional
operator in which the logical expression and first assignment expression are
identical**. In the following example we use the conditional operator to provide
default values to function arguments when that argument has no existing value:

<!---
{
    "linter": "jslint"
}
-->
```javascript
function example(a, b) {
    "use strict";
    a = a ? a : "Default";
    b = b ? b : "Another";
}
```

### Why do I get this error?

This error is raised to highlight **unnecessarily verbose and potentially
confusing code**. The use of the conditional operator in this case can be
replaced with the logical or operator `||` which does exactly the same thing:

<!---
{
    "linter": "jslint"
}
-->
```javascript
function example(a, b) {
    "use strict";
    a = a || "Default";
    b = b || "Another";
}
```

This works because the `||` operator does not return a boolean value as you
might expect. Instead it will return the result of evaluating one of its
operands ([ES5 &sect;11.11][es5-11.11]):

> The value produced by a `&&` or `||` operator is not necessarily of type
> Boolean. The value produced will always be the value of one of the two operand
> expressions.

The `||` operator evaluates its first operand and if the result is falsy then
evaluates the second and returns the result. In the previous example if `b` is
undefined then the first operand will be falsy which results in the second
operand `"Another"` being the result of the expression.

[es5-11.11]: http://es5.github.io/#x11.11
