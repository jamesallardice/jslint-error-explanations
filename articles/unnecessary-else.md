<!---
{
    "titles": [
        "Unnecessary 'else' after disruption",
        "Unexpected 'else' after 'return'"
    ],
    "tools": [
        "jslint"
    ],
    "author": "jallardice",
    "slugs": [
        "unnecessary-else-after-disruption",
        "unexpected-else-after-return"
    ]
}
-->

### When do I get this error?

JSLint (prior to July 2013) will throw the "Unexpected 'else' after 'return'" error when it encounters **an `else` block following an `if` block that contains a `return` statement**. As of July 2013 this behaviour has been extended and JSLint will throw the "Unnecessary 'else' after disruption" error when it encounters a `throw` statement in the same situation. Here's some example code:

```javascript
function example(x) {
    "use strict";
    if (!x) {
        throw "A throw is disruptive";
    } else {
        return true;
    }
}
```

### Why do I get this error?

This error is raised to highlight a **completely pointless piece of code**. If execution enters the `if` block, the flow of execution will be disrupted (it could for example return or throw an exception). There will be no way execution can enter the `else` block. Therefore, you can simply omit the `else` block and place its contents directly after the `if` block. Here's another snippet, without an error:

```javascript
function example(x) {
    "use strict";
    if (!x) {
        throw "A throw is disruptive";
    }
    return true;
}
```
