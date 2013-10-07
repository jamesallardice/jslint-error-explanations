<!---
{
    "titles": [
        "Read only"
    ],
    "tools": [
        "jslint",
        "jshint"
    ],
    "tags": [
        "assignment"
    ],
    "contributors": [
        "jallardice"
    ],
    "slugs": [
        "read-only"
    ]
}
-->

### When do I get this error?

JSLint and JSHint will throw the "Read only" error when they encounter an attempt to **assign a value to built-in native
object**. In the following example we attempt to overwrite `String` constructor function:

```javascript
String = function () {
    "use strict";
    return "Overwritten";
};
```

As of July 2013, JSLint will also throw the "Read only" error when it encounters an assignment to an exception
parameter. This previously generated the "[Do not assign to the exception parameter](/no-exception-assignment)" warning.
See the page for that message for more details on the reasoning behind it:

```javascript
try {
    var a; // ... some code that might throw an exception
} catch (e) {
    e = 10;
}
```

### Why do I get this error?

This error is raised to highlight a **potentially dangerous piece of code**. Your code will may fine if you do not fix
this error, but it may be confusing to others, especially at first glance to someone quickly searching through your
script, and it may break third party scripts.

It is perfectly valid to overwrite any of the native built-in functions, but there are limited use cases for it. JSLint
and JSHint both forbid this practice completely and do not provide an option to allow it.

The list of read only functions used by JSLint is as follows:

| `Array`              | `Error`     | `Math`           | `RegExp`      |
| `Boolean`            | `eval`      | `Number`         | `String`      |
| `Date`               | `EvalError` | `Object`         | `SyntaxError` |
| `decodeURI`          | `Function`  | `parseInt`       | `TypeError`   |
| `decodeURIComponent` | `isFinite`  | `parseFloat`     | `URIError`    |
| `encodeURI`          | `isNaN`     | `RangeError`     |
| `encodeURIComponent` | `JSON`      | `ReferenceError` |

JSHint uses the same list, but adds a few extra identifiers to it:

| `hasOwnProperty` | `Map` | `NaN` | `Set` | `WeakMap` |

In JSHint 1.0.0 and above you have the ability to ignore any warning with a [special option
syntax](http://jshint.com/docs/#options). The identifier of this warning is **W020**. This means you can tell JSHint to
not issue this warning with the `/*jshint -W020 */` directive.
