<!---
{
    "titles": [
        "immed"
    ],
    "slugs": [
        "option-jshint-immed"
    ],
    "linters": [
        "jshint"
    ],
    "author": "jallardice",
    "subject": "option"
}
-->

### What does this option do?

The JSHint `immed` option is used to enforce the wrapping of immediately invoked
function expressions in a pair of parentheses. This prevents the less common use
of other operators to force a function declaration to be parsed as a function
expression and ensures functions that would already be parsed as an expression
to be wrapped in parentheses anyway to make the intentions clearer to the
reader.

In the following example the function is parsed as an expression as it's part of
a variable statement. It is not necessary to wrap the function in parentheses to
be able to invoke it immediately:

<!---
{
    "linter": "jshint"
}
-->
```javascript
/*jshint immed: true */
var MyModule = function () {
    return {
        someData: 1
    };
}();
```

Be aware that this option does not enforce the position of the wrapping
parentheses. Some coding conventions specify that the closing wrapping
parenthesis should appear before the invoking pair and others say it should come
after.

### When should I use this option?

The use of the `immed` JSHint option will cause a "[Wrap an immediate function
invocation in parentheses][parens]" error any time it encounters an immediately
invoked function expression that is not wrapped in parentheses. It's common
convention to place an IIFE within parentheses because it makes your intentions
immediately clear to readers of your code. If you glance at the example above
you would most likely assume that `x` refers to the function itself rather than
the return value of it. By wrapping the function in parentheses you're less
likely to make that incorrect assumption:

<!---
{
    "linter": "jshint"
}
-->
```javascript
/*jshint immed: true */
var MyModule = (function () {
    return {
        someData: 1
    };
}());
```

Note that this is an *enforcing* option which means JSHint does not apply it by
default. If you do not explicitly set this option to `true` JSHint will allow
IIFEs without wrapping parentheses.

#### Recommendation

Set this option to `true` (enforces the wrapping of IIFEs).

[jscs]: https://github.com/mdevils/node-jscs
[parens]: /wrap-an-immediate-function-invocation-in-parentheses
