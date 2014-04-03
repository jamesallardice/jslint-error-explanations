<!---
{
    "titles": [
        "Move the invocation into the parens that contain the function"
    ],
    "slugs": [
        "move-the-invocation-into-the-parens-that-contain-the-function"
    ],
    "linters": [
        "jslint",
        "eslint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "Move the invocation into the parens that contain the function" error is
thrown when JSLint and ESLint encounter **an immediately invoked function
expression in which the invoking parentheses appear outside the wrapping
parentheses**. In the following example we assign the return value of the
anonymous function to the variable `x`:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var x = (function () {
    "use strict";
    return {
        y: 1
    };
})();
```

### Why do I get this error?

This error is raised to highlight a **lack of convention**. Your code will run
fine if you do not fix this error, but it may be confusing to others. However,
this particular error gives rise to debate over which position for the invoking
parentheses should actually be the convention. If you are using JSLint, then
your convention should be the one suggested.

The argument for moving the parentheses is that it makes the code easier to
understand. It may not be immediately obvious that the parentheses are intended
to invoke the function if they are outside the wrapping pair. By moving them
inside, they immediately follow the function statement and may therefore be more
easily associated with it. To fix this error, simply move the pair of invoking
parentheses inside the pair that wrap the function itself:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var x = (function () {
    "use strict";
    return {
        y: 1
    };
}());
```

If you're using ESLint you are able to configure the convention that you prefer.
The `wrap-iife` option will accept a string, `"inside"` or `"outside"`, that
will enforce a particular position (for some strange reason the "inside" option
appears to force the invoking parentheses to appear *outside* of the wrapping
ones, and vice versa):

<!---
{
    "linter": "eslint"
}
-->
```javascript
/*eslint wrap-iife: [1, "outside"] */
var x = (function () {
    "use strict";
    return {
        y: 1
    };
}());
```
