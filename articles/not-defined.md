<!---
{
    "titles": [
        "'{a}' was used before it was defined",
        "'{a}' is not defined",
        "W117"
    ],
    "slugs": [
        "a-was-used-before-it-was-defined",
        "a-is-not-defined",
        "w117"
    ],
    "linters": [
        "jslint",
        "jshint",
        "eslint"
    ],
    "author": "jallardice"
}
-->

### History

This warning has existed in two forms across the three main linters. It was
introduced in the original version of JSLint and has remained in all three tools
ever since.

 - In JSLint the warning given is *"'{a}' was used before it was defined"*

 - In JSHint and ESLint the message has always been *"'{a}' is not defined"*

The situations that produce the warning have not changed despite changes to the
text of the warning itself.

### When do I get this error?

The "'{a}' was used before it was defined" error (and the alternative "'{a}' is
not defined" error) is thrown when JSLint, JSHint and ESLint encounter **an
identifier that has not been previously declared in a `var` statement or
function declaration**. Some very common examples of this error are those that
refer to native environment objects:

 - "'document' was used before it was defined"
 - "'window' was used before it was defined"
 - "'alert' was used before it was defined"
 - "'console' was used before it was defined"
 - "'require' was used before it was defined"

In the following example we attempt to set the value of the undeclared variable
`x` and then attempt to use some native browser environment objects:

<!---
{
    "linter": "jslint"
}
-->
```javascript
x = 10;
alert("Errors...");
console.log("Errors everywhere");
```

### Why do I get this error?

This error is raised to highlight **potentially dangerous code**. Your code may
run without error, depending on the identifier in question, but is likely to
cause confusion to other developers and could in some cases cause a fatal error
that will prevent the rest of your script from executing.

The example above is valid JavaScript when not running in strict mode. It will
create a property of the global object (in the browser, the global object is
`window`) with the given identifier. If you had accidentally omitted the `var`
keyword, you could have ended up overwriting a variable declared in a parent
scope, causing unexpected behaviour. If it does run in strict mode, it will
generate a reference error as it's illegal to assign a value to an undefined
variable under such conditions ([ES5 Annex C]es5-c]):

> Assignment to an undeclared identifier or otherwise unresolvable reference
> does not create a property in the global object. When a simple assignment
> occurs within strict mode code, its *LeftHandSide* must not evaluate to an
> unresolvable Reference. If it does a ReferenceError exception is thrown.

If you are referring to an identifier that has been declared elsewhere (in
another JavaScript file included in the page for example), you can tell JSLint,
JSHint and ESLint about it by using the `global` directive:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/*global someFunction */
var x = someFunction();
```

If you have mistakenly omitted a `var` keyword, you can fix this error by simply
adding it in. If you omitted the keyword on purpose (to allow access to a
variable from other scope for example), declare the variable in the top-most
scope in which it should be available:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/*global someFunction */
var x = 10;
```

In the case of environment-specific global identifiers (like `window` or
`document` in the browser or `module` in Node.js) there are a few JSLint/JSHint
options that you can set to let the linter know what environment the code is
expected to run in:

 -

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W117**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W117 */` directive.

In ESLint the rule that generates this warning is named `no-use-before-define`.
You can disable it by setting it to `0`, or enable it by setting it to `1`.

[es5-c]: http://es5.github.com/#C
[jshintopts]: http://jshint.com/docs/#options
