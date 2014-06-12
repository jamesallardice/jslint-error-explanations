<!---
{
    "titles": [
        "Wrap an immediate function invocation in parentheses",
        "W062"
    ],
    "slugs": [
        "wrap-an-immediate-function-invocation-in-parentheses",
        "w062"
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

The "Wrap an immediate function invocation in parentheses" error is thrown when
JSLint, JSHint and ESLint encounter **an immediately invoked function expression
that is not wrapped in parentheses**. JSHint will only raise this warning if the
`immed` option is set to `true`.  In the following example we assign the return
value of the anonymous function the variable `x`:

<!---
{
    "linter": "jslint",
    "version": "2013-04-29"
}
-->
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

This error is raised to highlight a **lack of convention**. Your code will run
fine if you do not fix this error, but it may be confusing to others. Since
function declarations cannot be immediately invoked, and function expressions
can be, a common technique to create an immediately-invoked function expression
is to simply wrap a function statement in parentheses. The opening parenthesis
causes the contained function to be parsed as an expression, rather than a
declaration:

<!---
{
    "linter": "jslint",
    "version": "2013-04-29"
}
-->
```javascript
var x;
(function () {
    "use strict";
    x = 10;
}());
```

If you remove the wrapping parentheses from the above example, you will end up
with a syntax error. For that reason, when immediately invoking a function
expression that doesn't require any special treatment to turn it into an
expression (as in the first example above), convention dictates that you should
wrap it in parentheses anyway, for consistency and to make it clearer that the
resulting value of the overall expression is the *return value* of the function,
rather than a reference to the function itself:

<!---
{
    "linter": "jslint",
    "version": "2013-04-29"
}
-->
```javascript
/*jshint immed: true */
var x = (function () {
    "use strict";
    return {
        y: 1
    };
}());
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W062**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W062 */` directive. You can also set the `immed` option to `false`.

In ESLint the rule that generates this warning is named `wrap-iife`. You can
disable it by setting it to `0`, or enable it by setting it to `1`.

[jshintopts]: http://jshint.com/docs/#options
