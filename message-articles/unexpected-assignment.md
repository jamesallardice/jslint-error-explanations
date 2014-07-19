<!---
{
    "titles": [
        "Unexpected assignment expression",
        "Expected a conditional expression and instead saw an assignment",
        "W084"
    ],
    "slugs": [
        "unexpected-assignment-expression",
        "expected-a-conditional-expression",
        "w084"
    ],
    "linters": [
        "jslint",
        "jshint",
        "eslint"
    ],
    "author": "jklein"
}
-->

### History

This warning has existed in two forms across the three main linters. It was
introduced in the original version of JSLint and has remained in all three tools
ever since.

 - In JSLint, up until July 2013, the warning given was "Expected a conditional
   expression and instead saw an assignment"

 - In July 2013 the warning given by JSLint changed to "Unexpected assignment
   expression"

 - In both JSHint and ESLint the warning has always been "Expected a conditional
   expression and instead saw an assignment"

The situations that produce the warning have not changed despite changes to the
text of the warning itself.

### When do I get this error?

The "Unexpected assignment expression" error (and the alternative "Expected a
conditional expression and instead saw an assignment" error) are thrown when
JSLint, JSHint or ESLint encounters **an assignment expression in an `if`, `for`
or `while` statement initializer**. In the following example we have an `if`
statement with an assignment expression where you would normally expect a
conditional:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var x, y;
if (x = 0) {
    y = 1;
}
```

Since May 2013 JSLint will also generate this warning when it encounters a
**return statement containing an assignment expression**. If that's the case in
your code you'll want to read the page concerning the "[Did you mean to return a
conditional instead of an assignment][returncond]" error instead.

### Why do I get this error?

This error is raised to highlight a **possible mistake**. Your code is unlikely
to work as expected if you do not resolve this issue. However, the code in the
example above is valid and will not cause fatal errors in any environment.

Instead of checking whether the variable `x` has the value `0` the example above
will *assign* the value `0` to `x`. The body of the `if` statement will not be
executed because the assignment expression results in `undefined` which is
falsy.

In the above case it's obvious we've made a mistake and the fix is to simply
ensure the use of a comparison rather than an assignment:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var x, y;
if (x === 0) {
    y = 1;
}
```

There are some legitimate situations that can produce this error too. Consider
the following example which is a common pattern for traversing a DOM node
heirarchy:

<!---
{
    "linter": "jshint"
}
-->
```javascript
function setHeight(someNode) {
    "use strict";
    do {
        someNode.height = '100px';
    } while (someNode = someNode.parentNode);
}
```

In this case you can disable the warning (if you're using JSHint or ESLint) or
force the expression to become conditional, but only if you're using JSHint,
ESLint or a version JSLint from before July 2013 (the message will be "Expected
a conditional expression and instead saw an assignment"). If you're using a more
recent version there appears to be no way to suppress the "Unexpected assignment
expression" warning:

<!---
{
    "linter": "jshint",
    "version": "2013-05-31"
}
-->
```javascript
function setHeight(someNode) {
    "use strict";
    do {
        someNode.height = '100px';
    } while ((someNode = someNode.parentNode) !== null);
}
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W084**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W084 */` directive.

In ESLint the rule that generates this warning is named `no-cond-assign`. You
can disable it by setting it to `0`, or enable it by setting it to `1`.

[returncond]: /did-you-mean-to-return-a-conditional
[jshintopts]: http://jshint.com/docs/#options
