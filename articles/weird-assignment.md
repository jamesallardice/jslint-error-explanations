<!---
{
    "titles": [
        "Weird assignment"
    ],
    "slugs": [
        "weird-assignment"
    ],
    "linters": [
        "jslint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "Weird assignment" error is thrown when JSLint encounters **an assignment
expression in which the left hand side and right hand side expressions are the
same**. In the following example we declare a variable `x` and then attempt to
assign it to itself:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var x = 10;
x = x;
```

### Why do I get this error?

This error is raised to highlight a **potentially confusing and completely pointless piece of code**. There are almost no situations in which you would need to assign something to itself. There is, however, at least one valid use case.

In the browser you can assign `window.location` to itself to force a page reload without reposting any form data. Calling `window.location.reload()` can cause a browser warning when form data will be reposted. To avoid that warning it's common to use one of the following patterns:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/*jslint browser: true */
window.location = window.location;
window.location.href = window.location.href;
```

As you can see, both of those cause the "Weird assignment" error. It's a simple fix though. Since `window.location` is effectively an alias for `window.location.href` they are interchangable which means we can make the two sides of the assignment different:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/*jslint browser: true */
window.location = window.location.href;
```
