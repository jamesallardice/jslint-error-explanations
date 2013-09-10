<!---
{
    "titles": [
        "Wrap an immediate function invocation in parentheses",
        "W062"
    ],
    "tools": [
        "jslint",
        "jshint"
    ],
    "tags": [
        "function",
        "iife"
    ],
    "contributors": [
        "jallardice"
    ],
    "slugs": [
        "wrap-an-immediate-function-invocation-in-parentheses",
        "w062"
    ]
}
-->

### When do I get this error?

JSLint will throw the "Wrap an immediate function invocation in parentheses" error when it encounters **an immediately
invoked function expression that is not wrapped in parentheses**. JSHint will throw this error in the same situation,
but only **if the `immed` option is set to `true`**. In the following example we assign the *return value* of the
anonymous function the variable `x`:

```javascript
/*jshint immed: true */
var x = function () {
    "use strict";
    return {
        y: 1
    };
}();
```

### Why do I get this error?

This error is raised to highlight a **lack of convention**. Your code will run fine if you do not fix this error, but it
may be confusing to others.

Since function statements cannot be immediately invoked, and function *expressions* can be, a common technique to create
an immediately-invoked function expression is to simply wrap a function statement in parentheses. The opening
parentheses causes the contained function to be parsed as an expression, rather than a declaration:

```javascript
var x;
(function () {
    "use strict";
    x = 10;
}());
```

If you remove the wrapping parentheses from the above example, you will end up with a syntax error. For that reason,
when immediately invoking a function expression that doesn't require any special treatment to turn it into an expression
(as in the first example above), convention dictates that you should wrap it in parentheses anyway, for consistency and
to make it clearer that the resulting value of the overall expression is the *return value* of the function, rather than
a reference to the function itself:

```javascript
var x = (function () {
    "use strict";
    return {
        y: 1
    };
}());
```

Note that by fixing this error you are likely to end up with the related "Move the invocation into the parens that
contain the function" error, which should be very simple to fix at this point.

### Edge cases

In some situations, both JSLint and JSHint will incorrectly raise a single warning when they should be raising 2. In the
following example, the value of `x` will be the result of the logical and operation on the return value of the two
immediately-invoked function expressions. If the parentheses wrapping the entire expression are removed, two warnings
are issues instead of one:

```javascript
/*jshint immed: true */
var x = (function () {
    "use strict";
    return true;
}() && function () {
    "use strict";
    return false;
}());
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax](http://jshint.com/docs/#options). The identifier of this warning is **W062**. This means you
can tell JSHint to not issue this warning with the `/*jshint -W062 */` directive.
