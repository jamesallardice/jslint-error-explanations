<!---
{
    "titles": [
        "Missing '()' invoking a constructor",
        "W058"
    ],
    "slugs": [
        "missing-invoking-a-constructor",
        "w058"
    ],
    "linters": [
        "jslint",
        "jshint",
        "eslint"
    ],
    "author": "jallardice"
}
-->

### History

This warning has existed in two forms across the three main linters. It was
introduced in the original version of JSLint and has remained in all three tools
ever since.

 - In JSLint the warning given is the generic *"Missing '{a}'"*

 - In JSHint and ESLint the message used is *"Missing '()' invoking a
   constructor"*

The situations that produce the warning have not changed despite changes to the
text of the warning itself.

### When do I get this error?

The "Missing '()' invoking a constructor" error is thrown when JSLint, JSHint
and ESLint encounter **a `new` expression that is not immediately followed by a
pair of parentheses**. In the following example we create an instance of the
built-in `Date` constructor:

<!---
{
    "linter": "jslint",
    "version": "2013-04-29"
}
-->
```javascript
var d = new Date;
```

### Why do I get this error?

This error is raised to highlight a **lack of convention**. Your code will work
without error if you do not resolve this issue but you may be contravening
coding styles and best practices. The ECMAScript 5 specification shows (in a
confusing way) that `new` expressions do not have to be followed by a pair of
parentheses. The parentheses are only required when arguments are being passed
to the constructor ([ES5 &sect;11.2][es5-11.2]):

> *MemberExpression* :<br>
> &nbsp;&nbsp;&nbsp;&nbsp;...<br>
> &nbsp;&nbsp;&nbsp;&nbsp;`new` *MemberExpression Arguments*<br><br>
> *NewExpression* :<br>
> &nbsp;&nbsp;&nbsp;&nbsp;*MemberExpression*<br>
> &nbsp;&nbsp;&nbsp;&nbsp;`new` *NewExpression*<br><br>
> *Arguments* :<br>
> &nbsp;&nbsp;&nbsp;&nbsp;`( )`<br>
> &nbsp;&nbsp;&nbsp;&nbsp;`(` *ArgumentList* `)`

The grammar can be a bit confusing, but in essence the above shows that the
*Arguments* nonterminal is optional. If you do not need to pass arguments to the
constructor you can leave it out. However, many style guides would recommend
that the parentheses are always included for consistency, and to make it
immediately clear that an invocation is taking place.

Consider the fact that omitting the parentheses from a normal (non-constructor)
function invocation will cause the expression to evaluate to a reference to that
function, rather than the return value of it. By missing the parentheses on a
constructor call your code may be less self-explanatory. To fix the issue you
can simply add the missing parentheses:

<!---
{
    "linter": "jslint",
    "version": "2013-04-29"
}
-->
```javascript
var d = new Date();
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W058**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W058 */` directive.

In ESLint the rule that generates this warning is named `new-parens`.
You can disable it by setting it to `0`, or enable it by setting it to `1`.

[es5-11.2]: http://es5.github.com/#x11.2
[jshintopts]: http://jshint.com/docs/#options
