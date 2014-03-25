<!---
{
    "titles": [
        "{a} is already defined",
        "W004"
    ],
    "slugs": [
        "a-is-already-defined",
        "w004"
    ],
    "linters": [
        "jslint",
        "jshint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "{a} is already defined" error is thrown when JSLint or JSHint encounters
**a declaration with an identifier that has been used in a previous
declaration**. This applies to both variable and function declarations. However
it only applies when the declarations appear within the scope of a function
rather than the global scope. In the following example we attempt to declare the
variable `x` twice within the same scope:

<!---
{
    "linter": "jshint"
}
-->
```javascript
function test() {
    "use strict";
    var a = 1,
        a = 2;
    return a;
}
```

### Why do I get this error?

This error is raised to highlight a **probable bug**. Your code will most likely
fail to work as expected if you do not resolve this issue.

Since variable and function declarations are hoisted to the top of the scope in
which they occur the above code is effectively interpreted as a single
declaration followed by two assignments. The variable will retain the value of
the final assignment.

If your code is similar to the above then it's likely you have mistyped the
identifier of one of the variables. There are no situations in which it makes
sense or is useful to redeclare a variable. Simply rename one of them
appropriately:

<!---
{
    "linter": "jshint"
}
-->
```javascript
function test() {
    "use strict";
    var a = 1,
        b = 2;
}
```

Alternatively, you may have intended to have two assignments and simply mistyped
a semicolon as a comma. In that case it's also an obvious fix:

<!---
{
    "linter": "jshint"
}
-->
```javascript
function test() {
    "use strict";
    var a = 1;
    a = 2;
}
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this
warning is **W004**. This means you can tell JSHint to not issue this warning
with the `/*jshint -W004 */` directive.

[jshintopts]: http://jshint.com/docs/#options
