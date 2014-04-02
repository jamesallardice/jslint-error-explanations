<!---
{
    "titles": [
        "Unnecessary 'use strict'",
        "Unnecessary directive \"{a}\"",
        "W034"

    ],
    "slugs": [
        "unnecessary-use-strict",
        "unnecessary-directive-a",
        "w034"
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

The "Unnecessary 'use strict'" error (and the alternative "Unnecessary directive
'{a}'" error) is thrown when JSLint, JSHint or ESLint encounters **a `"use
strict"` directive in code that is already running in strict mode**. The
following example features a factory function that runs in strict mode and
returns another function that has its own strict mode directive:

<!---
{
    "linter": "jslint"
}
-->
```javascript
function factory() {
    "use strict";
    return function () {
        "use strict";
        return true;
    };
}
```

### Why do I get this error?

This error is raised to highlight a **completely pointless piece of code**. The
`"use strict"` directive applies to the scope in which it appears, and any
descendant execution contexts. Here's what the ECMAScript 5 specification tells
us about strict mode and functions ([ES5 &sect;10.1.1][es5-10.1.1]):

> Function code that is part of a *FunctionDeclaration*, *FunctionExpression*,
> or accessor *PropertyAssignment* is strict function code if its
> *FunctionDeclaration*, *FunctionExpression*, or *PropertyAssignment* is
> contained in strict mode code or if the function code begins with a Directive
> Prologue that contains a Use Strict Directive.

If you're receiving this error you can safely remove the highlighted instances
of the `"use strict"` directive and be sure that the function in question will
still run in strict mode:

<!---
{
    "linter": "jslint"
}
-->
```javascript
function factory() {
    "use strict";
    return function () {
        return true;
    };
}
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W034**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W034 */` directive.

In ESLint the rule that generates this warning is named `no-extra-strict`. You
can disable it by setting it to `0`, or enable it by setting it to `1`.

[es5-10.1.1]: http://es5.github.io/#x10.1.1
[jshintopts]: http://jshint.com/docs/#options
