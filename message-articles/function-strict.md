<!---
{
    "titles": [
        "Use the function form of 'use strict'",
        "W097"
    ],
    "slugs": [
        "use-the-function-form-of-use-strict",
        "w097"
    ],
    "linters": [
        "jslint",
        "jshint",
        "eslint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "Use the function form of 'use strict'" error is thrown when JSLint, JSHint
or ESLint encounters a **strict mode directive in the outermost scope of the
code**. In the following example we use a strict mode directive in the global
scope to ensure the entire program runs in strict mode:

<!---
{
    "linter": "jslint"
}
-->
```javascript
"use strict";
function example() {
    return true;
}
```

### Why do I get this error?

This error is raised to highlight a **potentially dangerous piece of code**.
It's common and good practice to concatenate multiple JavaScript files into one
to reduce HTTP requests in production environments. If one of those files has a
global strict mode directive and others do not, the concatenation would result
in all scripts running in strict mode. If one the those scripts depends upon
features that are disallowed in strict mode you may run into errors. Consider
the following example which shows the previous script concatenated with another
that relies upon features that are illegal in strict mode:

<!---
{
    "linter": "jslint"
}
-->
```javascript
"use strict";
function example() {
    return true;
}
function another(a) {
    return 010; // Octal literal, illegal in strict mode
}
```

This example will cause a syntax error since octal literals are not allowed in
strict mode. If we want to use strict mode in our script and still be able to
concatenate it with others we need to ensure our strict mode directive is not in
the global scope. Since JavaScript only has function scope this means we need to
place the directive within a function:

<!---
{
    "linter": "jslint"
}
-->
```javascript
function example() {
    "use strict";
    return true;
}
```

This has the added benefit of allowing you to control exactly which parts of
your own script run in strict mode. However, a common technique is to wrap your
entire program in an immediately invoked function expression to constrain it to
its own function scope and help prevent pollution of the global scope.

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W069**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W097 */` directive. You can also set the `sub` option to `true`.

In ESLint the rule that generates this warning is named `no-global-strict`. You
can disable it by setting it to `0`, or enable it by setting it to `1`.

[jshintopts]: http://jshint.com/docs/#options
