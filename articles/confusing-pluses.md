<!---
{
    "titles": [
        "Confusing pluses",
        "Confusing plusses",
        "W006"
    ],
    "slugs": [
        "confusing-pluses",
        "confusing-plusses",
        "w006"
    ],
    "linters": [
        "jslint",
        "jshint"
    ],
    "author": "jallardice"
}
-->

### History

This warning has existed in a few forms in both JSLint and JSHint. It was
introduced in the original version of JSLint and has remained in both tools ever
since.

 - In JSHint prior to version 1.0.0 the warning given was *"Confusing plusses"*

 - In JSHint 1.0.0 and above the spelling has been corrected and the message
   used is now *"Confusing pluses"*

 - JSLint has always used the more generic *"Confusing use of '{a}"* warning in
   the same situation

### When do I get this error?

The "Confusing pluses" error is thrown when JSHint encounters **an addition
operator in which the right-hand-side expression is preceded by the unary `+`
operator**. In the following example we attempt to compute the addition of a
numeric literal and the numeric value of a variable:

<!---
{
    "linter": "jshint"
}
-->
```javascript
var a = "5",
    b = 5 + +a;
```

### Why do I get this error?

This error is raised to highlight a **potentially confusing piece of code**.
Your code will most likely run as expected but it could cause issues with
maintenance and be confusing to other developers.

The `+` operator is overloaded in JavaScript. Most commonly it can be seen as
the addition operator but it also functions in a unary form as a numeric casting
operator. In this unary form the result of the expression will be the value of
the operand coerced to the Number type. In the example above, because the value
of `a` is a string that can be converted to a number, the `+a` expression
results in the value `5` and the value of `b` ends up as `10`.

This behaviour is described in the specification ([ES5
&sect;11.4.6][es5-11.4.6]):

> The production *UnaryExpression* : `+` *UnaryExpression* is evaluated as
> follows:
> 1. Let *expr* be the result of evaluating *UnaryExpression*.
> 2. Return ToNumber(GetValue(*expr*))

However, when the addition operator is used adjacent to the unary `+` operator
an unforunate resemblance to the increment operator arises. The increment
operator, `++`, is used to add 1 to its operand. It can be used as a postfix or
prefix operator which means it can appear after or before its operand. This
makes the above example slightly confusing on first glance, especially as the
`++` operator is far more commonly used than the unary `+` operator.

To resolve this issue the easiest fix is to wrap the unary expression in
parentheses to disambiguate the `+` characters:

<!---
{
    "linter": "jshint"
}
-->
```javascript
var a = "5",
    b = 5 + (+a);
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this
warning is **W006**. This means you can tell JSHint to not issue this warning
with the `/*jshint -W006 */` directive.

[es5-11.4.6]: http://es5.github.io/#x11.4.6
[jshintopts]: http://jshint.com/docs/#options
