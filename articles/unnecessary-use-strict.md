<!---
{
    "titles": [
        "Unnecessary use strict"
    ],
    "tools": [
        "jslint"
    ],
    "author": "jallardice",
    "slugs": [
        "unnecessary-use-strict"
    ]
}
-->

### When do I get this error?

JSLint will throw the "Unnecessary use strict" error when it encounters an occurence of **the `"use strict"` directive
in code that is already running in strict mode**. In the following example we have a `"use strict"` directive in the
global scope, and another in the function:

```javascript
function Example() {

    //This directive applies to all contained scopes
    "use strict";

    this.method = function () {
        "use strict";
    };
}
```

### Why do I get this error?

This error is raised to highlight a **completely pointless piece of code**. The `"use strict"` directive applies to the
scope in which it appears, and any descendant execution contexts. Here's what the ECMAScript 5 specification tells us
about strict mode and functions ([section &sect;10.1.1](http://es5.github.com/#x10.1.1)):

> Function code that is part of a *FunctionDeclaration*, *FunctionExpression*, or accessor *PropertyAssignment* is
> strict function code if its *FunctionDeclaration*, *FunctionExpression*, or *PropertyAssignment* is contained in
> strict mode code or if the function code begins with a Directive Prologue that contains a Use Strict Directive.

If JSLint throws this error at you, you can safely remove the highlighted instances of the `"use strict"` directive:

```javascript
function Example() {

    //This directive applies to all contained scopes
    "use strict";

    this.method = function () {
        // Removed the directive from this function
    };
}
```
