<!---
{
    "titles": [
        "Combine this with the previous 'var' statement",
        "Too many var statements",
        "W081"
    ],
    "slugs": [
        "do-not-wrap-function-literals-in-parens",
        "wrapping-non-iife-functions-in-parens-is-unnecessary",
        "w081"
    ],
    "linters": [
        "jslint",
        "jshint"
    ],
    "author": "jallardice"
}
-->

### History

This warning has existed in two forms in JSLint and JSHint. It was introduced in
JSLint in June 2011 and has remained in both tools ever since.

 - In JSLint the warning given is *"Combine this with the previous 'var'
   statement"*

 - In JSHint the warning has always been *"Too many var statements"*

The situations that produce the warning have not changed despite changes to the
text of the warning itself.

### When do I get this error?

JSLint will throw the "Combine this with the previous 'var' statement" error
when it encounters **multiple variable statements within a function**. Here's an
example in which we attempt to declare two variables, `x` and `y`, with two
separate `var` statements:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/*jshint onevar: true */
function example() {
    "use strict";
    var x = 10;
    var y = 20;
}
```

### Why do I get this error?

This error is raised to highlight a **lack of convention** and could also
indicate a **misunderstanding of how the language works**. In many languages,
you have the concept of *block scope*, in which variables can be declared within
a block and scoped only to that block. JavaScript does not have block scope.
Instead, it has *function scope*, in which variables can only be scoped to a
function. This error is raised to help prevent the misunderstanding of code like
this:

<!---
{
    "linter": "jshint"
}
-->
```js
/*jshint onevar: true */
function example() {
    "use strict";
    var x = 10;
    if (x === 10) {
        var y = 20;
    }
    return y; // Able to return y because of function scoping
}
```

In the above example, the variable `y` is declared regardless of whether the
`if` statement body is executed or not. It is only assigned a value when the
`if` statement body is executed, but it's declared (and will have a value of
`undefined`) no matter what.

To help prevent the misunderstanding that JavaScript employs block scoping,
JSLint and JSHint will raise this warning to get you to declare all variables at
once. You can fix it by moving the declaration of `y` out of the block and
combining it with the declaration of `x`:

<!---
{
    "linter": "jshint"
}
-->
```js
/*jshint onevar: true */
function example() {
    "use strict";
    var x = 10,
        y;
    if (x === 10) {
        y = 20;
    }
    return y; // Able to return y because of function scoping
}
```

The fact that JSLint does not allow you to simply have multiple variable
statements outside of the block is just the coding convention preferred by the
author, Douglas Crockford. The use of the comma to group variable declarations
into a single statement can make the code easier to follow. The use of the comma
character in variable statements is documented as follows ([ES5
§12.2][es5-12.2]):

> VariableStatement :<br>
> &nbsp;&nbsp;&nbsp;&nbsp;`var` VariableDeclarationList `;`<br><br>
> VariableDeclarationList :<br>
> &nbsp;&nbsp;&nbsp;&nbsp;VariableDeclaration<br>
> &nbsp;&nbsp;&nbsp;&nbsp;VariableDeclarationList `,` VariableDeclaration

It's worth noting that in this case the comma is not interpreted as a grouping
operator, but is rather part of the syntax allowed in a variable statement.

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W081**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W081 */` directive.

[es5-12.2]: http://es5.github.com/#x12.2
[jshintopts]: http://jshint.com/docs/#options
