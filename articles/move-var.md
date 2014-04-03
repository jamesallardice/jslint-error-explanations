<!---
{
    "titles": [
        "Move 'var' declarations to the top of the function"
    ],
    "slugs": [
        "move-var-declarations-to-the-top-of-the-function"
    ],
    "linters": [
        "jslint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "Move 'var' declarations to the top of the function" error is thrown when
JSLint encounters **a variable declaration in a `for` or `for-in` statement
initialiser**. Here's an example in which we have a simple `for` loop that
declares a variable:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/*jslint plusplus: true */
function demo(arr, callback) {
    "use strict";
    for (var i = 0; i < arr.length; i++) {
        callback(a[i]);
    }
}
```

### Why do I get this error?

This error is raised to highlight a possible **lack of convention** and a
possible **misunderstanding of the language**. Your code will most likely work
as expected if you do not resolve this issue, but you may have misunderstood how
JavaScript handles variable declarations.

All declarations are hoisted to the top of the scope in which they appear.
Variables in JavaScript have function scope, not block scope. In many other
languages, the variable `i` in the above example would be scoped to the `for`
loop body and would not be accessible to the containing scope. In JavaScript
this is not the case and the variable is actually accessible in the containing
scope, although it won't have a value until the loop initialiser has been
executed.

To fix this issue, simply move the variable declaration out of the loop
initialiser. This has the advantage of making the code read the way it is
actually interpreted:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/*jslint plusplus: true */
function demo(arr, callback) {
    "use strict";
    var i;
    for (i = 0; i < arr.length; i++) {
        callback(arr[i]);
    }
}
```

This approach also prevents you from redeclaring `i` in every loop within a
function. You can simply reuse the reference to the `i` declared at the top of
the function. In this example we have two loops using the same variable. When
the first loop completes the value of `i` will be equal to `arr.length - 1`.
When the second loop is executed `i` is reset to `0`:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/*jslint plusplus: true */
function demo(arr, arr2, callback) {
    "use strict";
    var i;
    for (i = 0; i < arr.length; i++) {
        callback(arr[i]);
    }
    for (i = 0; i < arr2.length; i++) {
        callback(arr2[i]);
    }
}
```
