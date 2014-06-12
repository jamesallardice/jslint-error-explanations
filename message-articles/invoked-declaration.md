<!---
{
    "titles": [
        "Function statements are not invocable. Wrap the whole function invocation in parens",
        "Function declarations are not invocable. Wrap the whole function invocation in parens",
        "E039"
    ],
    "slugs": [
        "function-statements-are-not-invocable",
        "function-declarations-are-not-invocable",
        "e039"
    ],
    "linters": [
        "jslint",
        "jshint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "Function statements are not invocable. Wrap the whole function invocation
in parens" error (and the alternative "Function declarations are not invocable"
error) is thrown when JSLint and JSHint encounter **a function declaration
followed by a pair of parentheses**. In the following example we declare the
`demo` function and then attempt to immediately invoke it:

<!---
{
    "linter": "jslint"
}
-->
```javascript
function example() {
    "use strict";
    return true;
}();
```

### Why do I get this error?

This error is raised to highlight a **fatal JavaScript syntax error**. Your code
will not run if you do not fix this error. The ECMAScript 5 specification gives
the following grammar for function calls ([section &sect;11.2][es5-11.2]):

> *CallExpression* :<br>
> &nbsp;&nbsp;&nbsp;&nbsp;*MemberExpression Arguments*<br>
> &nbsp;&nbsp;&nbsp;&nbsp;*CallExpression Arguments*<br>
> &nbsp;&nbsp;&nbsp;&nbsp;*CallExpression* `[` *Expression* `]`<br>
> &nbsp;&nbsp;&nbsp;&nbsp;*CallExpression* `.` *IdentifierName*

We are interested in the first production. Here's the definition of a
"MemberExpression":

> *MemberExpression* :<br>
> &nbsp;&nbsp;&nbsp;&nbsp;*PrimaryExpression*<br>
> &nbsp;&nbsp;&nbsp;&nbsp;*FunctionExpression*<br>
> &nbsp;&nbsp;&nbsp;&nbsp;...

There is no production that allows the presence of a function *declaration* in a
member expression. Therefore when we attempt to write one a syntax error is
thrown. The second part of the error message tells you how to fix this. By
turning the function declaration into an expression we ensure that it can be
part of a call expression and can therefore be immediately invoked. To do so, we
simply need to wrap the declaration, and (by convention) the invoking
parentheses, in another pair of parentheses:

<!---
{
    "linter": "jslint"
}
-->
```javascript
(function example() {
    "use strict";
    return true;
}());
```

The addition of parentheses force the parser to treat this function as an
expression instead of a declaration. Since function expressions can be
immediately invoked the code is valid and works as expected.

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. Since this message relates to a fatal
syntax error you cannot disable it.

#### A note on function statements

The terminology JSLint chooses to use for this error message can be a bit
misleading. The ECMAScript specification, and the majority of other sources,
will refer to a function declaration. JSLint, however, calls it a function
statement. There is nothing really wrong with that, but Mozilla implemented an
extension to ECMAScript in the Gecko engine called function statements. They are
non-standard and it's unlikely you will come across one, so I won't go into
detail, but just bear it in mind that when JSLint talks about function
statements, it's talking about function declarations.

[es5-11.2]: http://es5.github.io/#x11.2
[jshintopts]: http://jshint.com/docs/#options
