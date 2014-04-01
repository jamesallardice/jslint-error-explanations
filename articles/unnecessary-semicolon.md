<!---
{
    "titles": [
        "Unnecessary semicolon",
        "W032"
    ],
    "slugs": [
        "unnecessary-semicolon",
        "w032"
    ],
    "linters": [
        "jshint",
        "eslint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "Unnecessary semicolon" error is thrown when JSHint or ESLint encounters **a semicolon following a block statement or function declaration**. In the following example we mistakenly include a semicolon after an `if` statement body (which is a block statement), and another after a function declaration:

<!---
{
    "linter": "jshint"
}
-->
```javascript
function example(a) {
    "use strict";
    if (a) {
        return true;
    };
};
```

### Why do I get this error?

This error is raised to highlight a **pointless piece of code**. Semicolons are
not required after block statements or function declarations. The specification
makes it clear where semicolons are necessary. For example, here's the grammar
for variable declarations ([ES5 &sect;12.2][es5-12.2]):

> *VariableStatement* :<br>
> &nbsp;&nbsp;&nbsp;&nbsp;`var` *VariableDeclarationList* `;`

The semicolon is clearly required by this production. Now compare that to the
grammar for a block statement ([ES5 &sect;12.1][es5-12.1]):

> *Block* :<br>
> &nbsp;&nbsp;&nbsp;&nbsp;`{` *StatementList*<sub>opt</sub> `}`

This time there is no semicolon which means its safe to remove the extra
semicolons from the previous example. This will resolve the issue:

<!---
{
    "linter": "jshint"
}
-->
```javascript
function example(a) {
    "use strict";
    if (a) {
        return true;
    }
}
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W032**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W032 */` directive.

In ESLint the rule that generates this warning is named `no-extra-semi`. You can
disable it by setting it to `0`, or enable it by setting it to `1`.

[es5-12.2]: http://es5.github.io/#x12.2
[es5-12.1]: http://es5.github.io/#x12.1
[jshintopts]: http://jshint.com/docs/#options
