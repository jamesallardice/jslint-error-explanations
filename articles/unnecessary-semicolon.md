<!---
{
    "titles": [
        "Unnecessary semicolon",
        "Unexpected ';'",
        "W032"
    ],
    "tools": [
        "jslint",
        "jshint"
    ],
    "author": "jallardice",
    "slugs": [
        "unnecessary-semicolon",
        "unexpected-semicolon",
        "w032"
    ]
}
-->

### When do I get this error?

The "Unnecessary semicolon" error (and the alternative "Unexpected ';'" error) are thrown when JSHint or JSLint
encounters **a semicolon following a block statement, function declaration or another semicolon**. In the following
example we mistakenly include a semicolon after an `if` statement body, and another after a function declaration:

```javascript
function example(a) {
    if (a) {
        return true;
    };
};
```

### Why do I get this error?

This error is raised to highlight a **pointless piece of code**. Semicolons are not required after block statements or
function declarations. The specification makes it clear where semicolons are necessary. For example, compare the grammer
for a variable statement ([ES5 &sect;12.2](http://es5.github.io/#x12.2)) with the grammar for a block statement ([ES5
&sect;12.1](http://es5.github.io/#x12.1)):

> *Block* :
> &nbsp;&nbsp;&nbsp;&nbsp;`{` *StatementList*<sub>opt</sub> `}`

> *VariableStatement* :
> &nbsp;&nbsp;&nbsp;&nbsp;`var` *VariableDeclarationList* `;`

The grammar for the block statement clearly shows that no semicolon is required after the closing brace. This is also
the case for function declarations. You can solve this error by simply removing any of these unnecessary semicolons:

```javascript
function example(a) {
    if (a) {
        return true;
    }
}
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a [special option
syntax](http://jshint.com/docs/#options). The identifier of this warning is **W032**. This means you can tell JSHint to
not issue this warning with the `/*jshint -W032 */` directive.
