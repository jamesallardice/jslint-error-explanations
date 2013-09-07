<!---
{
    "titles": [
        "Weird assignment"
    ],
    "tools": [
        "jslint"
    ],
    "tags": [
        "variable",
        "assignment"
    ],
    "contributors": [
        "jallardice"
    ],
    "slugs": [
        "weird-assignment"
    ]
}
-->

### When do I get this error?

JSLint will throw the "Weird assignment" error when it encounters **an assignment expression in which the left hand and
right hand side expressions are "similar"**. In the following example we declare a variable `x` and then attempt to
assign it to itself:

```javascript
var x = 10;
x = x;
```

### Why do I get this error?

This error is raised to highlight a **potentially confusing and completely pointless piece of code**. There are not many
situations in which you would need to assign something to itself.

One possible use case (in the browser) is to force a page reload using `window.location.href`:

```javascript
/*jslint browser: true */
window.location.href = window.location.href;
```

In the above situation you can safely ignore the warning. However, if you would like to work around it, you can change
the assignment slightly and still achieve the same effect without the warning:

```javascript
/*jslint browser: true */
window.location = window.location.href;
```
