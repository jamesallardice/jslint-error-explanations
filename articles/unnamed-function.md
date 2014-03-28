<!---
{
    "titles": [
        "Missing name in function statement",
        "Missing name in function declaration",
        "W025"
    ],
    "slugs": [
        "missing-name-in-function-statement",
        "missing-name-in-function-declaration",
        "w025"
    ],
    "linters": [
        "jslint",
        "jshint"
    ],
    "author": "jallardice"
}
-->

### History

This warning has existed in three forms across the three main linters. It was
introduced in the original version of JSLint and has remained (in a way) in all
three tools ever since.

 - In JSLint the warning given is "Missing name in function statement"

 - In JSHint the warning given has always been "Missing name in function
   declaration"

 - In ESLint the Esprima parser fails to parse the code so the message given is
   the more generic "Unexpected token ("

The situations that produce the warning have not changed despite changes to the
text of the warning itself.

### When do I get this error?

The "Missing name in function statement" error, and the alternative "Missing
name in function declaration" error, is thrown when JSLint or JSHint encounters
**the `function` keyword, where it would normally be parsed as a statement,
followed immediately by an opening parenthesis**. In the following example we
attempt to define a function but forget to give it an identifier:

<!---
{
    "linter": "jslint"
}
-->
```javascript
function () {
    "use strict";
    return "something";
}
```

### Why do I get this error?

This error is raised to highlight a **fatal JavaScript syntax error**. Your code
will not run unless you fix this issue. The ECMAScript grammar states that a
function statement (usually referred to as a function *declaration*) has to have
an identifier ([ES5 &sect;13][es5-13]):

> FunctionDeclaration :<br>
> &nbsp;&nbsp;&nbsp;&nbsp;`function` Identifier `(`
> FormalParameterList<sub>opt</sub>`)` `{` FunctionBody `}`

Notice that the *Identifier* part of the grammer is not optional. Compare this
to the grammar for a function *expression*:

> FunctionExpression :<br>
> &nbsp;&nbsp;&nbsp;&nbsp;`function` Identifier<sub>opt</sub> `(`
> FormalParameterListopt`)` `{` FunctionBody `}`

This time, notice that the identifier is optional. This optional identifier in
function expressions is what makes it possible to create anonymous functions.
However, in our example above, the code is parsed as a statement rather than an
expression. To fix the issue, give the function an identifier:

<!---
{
    "linter": "jslint"
}
-->
```javascript
function example() {
    "use strict";
    return "something";
}
```

Alternatively, make sure the code is parsed as an expression, rather than a
statement. There are numerous way of doing this, but in our example the only one
that really makes sense is to assign the anonymous function to a variable (don't
forget the semi-colon):

<!---
{
    "linter": "jslint"
}
-->
```javascript
var example = function () {
    "use strict";
    return "something";
}
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W025**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W025 */` directive.

[jshintopts]: http://jshint.com/docs/#options
[es5-13]: http://es5.github.io/#x13
