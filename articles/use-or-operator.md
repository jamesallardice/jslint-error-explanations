<!---
{
    "titles": [
        "Use the || operator"
    ],
    "tools": [
        "jslint"
    ],
    "author": "jallardice",
    "slugs": [
        "use-the-or-operator"
    ]
}
-->

### When do I get this error?

JSLint will throw the "Use the || operator" error when it encounters a **conditional operator in which the logical
expression and first assignment expression are identical**. In the following example we attempt to assign a value to `b`
depending on the value of `a`:

```javascript
var a = false,
    b = a ? a : "Example";
```

### Why do I get this error?

JSLint raises this error to indicate a piece of **unnecessarily verbose and potentially confusing code**. The construct
shown in the example above may be used to set default values, for example from function arguments:

```javascript
function example(a, b) {
    "use strict";
    a = a ? a : "Default";
    b = b ? b : "Another";
}
```

However, this is unnecessarily verbose as the logical or operator, `||`, does exactly the same thing:

```javascript
function example(a, b) {
    "use strict";
    a = a || "Default";
    b = b || "Another";
}
```
