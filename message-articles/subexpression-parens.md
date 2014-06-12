<!---
{
    "titles": [
        "The '&&' subexpression should be wrapped in parens"
    ],
    "slugs": [
        "the-subexpression-should-be-wrapped-in-parens"
    ],
    "linters": [
        "jslint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "The '&&' subexpressions should be wrapped in parens" error is thrown when
JSLint encounters **an expression containing both logical 'or' and logical 'and'
operators**. The following example function will return `true` if the `a`
argument is truthy or if both the `b` and `c` arguments are truthy:

<!---
{
    "linter": "jslint"
}
-->
```javascript
function test(a, b, c) {
    "use strict";
    if (a || b && c) {
        return true;
    }
    return false;
}
```

### Why do I get this error?

This error is raised to help **improve the readability of your code**. The
precedence of operators may be confusing to others (and to you, if you revisit
your code some time in the future). However, the code above is valid and will
work as expected.

The logical 'and' operator has a [higher precedence][ops] than the 'or'
operator. This is the reason the above example was described as returning `true`
when `a` is truthy or when both `b` and `c` are truthy. If the precedence was
reversed then the function would return `true` when `c` is truthy and either `a`
or `b` is truthy.

To avoid potential confusion around operator precedence JSLint prefers that the
order of operation be explicity defined by parentheses:

<!---
{
    "linter": "jslint"
}
-->
```javascript
function test(a, b, c) {
    "use strict";
    if (a || (b && c)) {
        return true;
    }
    return false;
}
```

This example will behave in exactly the same way as the first but JSLint is
happy because the order in which parts of the expression are evaluated is
clearer.

[ops]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
