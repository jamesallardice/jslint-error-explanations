<!---
{
    "titles": [
        "'{a}' was used before it was defined",
        "'{a}' is not defined",
        "W117"
    ],
    "tools": [
        "jslint",
        "jshint"
    ],
    "author": "jallardice",
    "slugs": [
        "a-was-used-before-it-was-defined",
        "a-is-not-defined",
        "w117"
    ]
}
-->

### When do I get this error?

JSLint will throw the "'{a}' was used before it was defined" error when it encounters a reference to **an identifier
that has not been declared as part of a `var` or `function` statement**. JSHint will throw the equivalent "'{a}' is not
defined" error under the same circumstances, but only **when the `undef` option is set to `true`**. Some very common
examples of this error are those that refer to native host objects:

 - "'document' was used before it was defined"
 - "'window' was used before it was defined"
 - "'alert' was used before it was defined"
 - "'console' was used before it was defined"
 - "'require' was used before it was defined" (commonly seen with Node.js)

In the following example we attempt to set the value of the variable `x` that has not been defined, and then attempt to
show the value of that variable in several ways. We also attempt to set the value of `y` to the return value of a
function which has not been defined:

```javascript
/*jshint undef: true */
var y = someFunction();
x = 10;
alert(x);
console.log(x);
```

### Why do I get this error?

This error is raised to highlight **potentially dangerous code** or **code that could cause a fatal error**. Your code
may run without error, depending on the identifier in question, but is likely to cause confusion to other developers and
could in some cases cause a fatal error that will prevent the rest of your script from executing.

The example above is valid JavaScript when not running in strict mode. It will create a property of the global object
(in the browser, the global object is `window`) with the given identifier. If you had accidentally omitted the `var`
keyword, you could have ended up overwriting a variable declared in a parent scope, causing unexpected behaviour. If it
does run in strict mode, it will generate a `ReferenceError` as it's illegal to assign a value to an undefined variable
under such conditions ([ES5 Annex C](http://es5.github.com/#C)):

> Assignment to an undeclared identifier or otherwise unresolvable reference does not create a property in the global
> object. When a simple assignment occurs within strict mode code, its *LeftHandSide* must not evaluate to an
> unresolvable Reference. If it does a `ReferenceError` exception is thrown.

If you are referring to an identifier that has been declared elsewhere (perhaps in another JavaScript file included in a
page), you can tell JSLint and JSHint about it by using the `global` directive:

```javascript
/*jshint undef: true */
/*global someFunction */
var y = someFunction();
```

If you have mistakenly omitted a `var` keyword, you can fix this error by simply adding it in. If you omitted the
keyword on purpose (perhaps to allow access to a variable from other scopes), declare the variable in the top-most scope
in which it should be available:

```javascript
/*jshint undef: true */
var x = 10;
```

If the error is referring to a built-in DOM object, such as `alert`, `document` or `window`, you can set some JSLint and
JSHint directives to make the parser aware of the fact that these built-in objects are actually available. Functions
like `alert` are treated as debugging aids by JSLint/JSHint. You can use the `devel` option to prevent warnings
concerning these:

```javascript
/*jshint devel: true, undef: true */
var x = 10;
alert(x);
```

Other common browser built-ins can be pre-defined with the use of the `browser` option:

```javascript
/*jslint browser: true */
var elem = document.createElement("div");
```

Finally, common Node.js built-ins can be pre-defined with the use of the `node` option:

```javascript
/*jslint node: true */
var http = require("http");
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a [special option
syntax](http://jshint.com/docs/#options). The identifier of this warning is **W117**. This means you can tell JSHint to
not issue this warning with the `/*jshint -W117 */` directive.
