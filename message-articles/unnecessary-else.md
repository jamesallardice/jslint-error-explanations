<!---
{
    "titles": [
        "Unnecessary 'else' after disruption",
        "Unexpected 'else' after 'return'"
    ],
    "slugs": [
        "unexpected-else-after-return",
        "unnecessary-else-after-disruption"
    ],
    "linters": [
        "jslint",
        "eslint"
    ],
    "author": "jallardice"
}
-->

### History

This warning has existed in two forms in JSLint and ESLint. It was
introduced in the original version of JSLint and has remained in both tools
ever since. It is not present in JSHint.

 - In JSLint versions dated later than April 2013 the warning given is
   "Unnecessary 'else' after disruption"

 - In older versions of JSLint and in all versions of ESLint the message used is
   "Unexpected 'else' after 'return'"

The situations that produce the warning have not changed despite changes to the
text of the warning itself.

### When do I get this error?

The "Unnecessary 'else' after disruption" error (and the alternative "Unexpected
'else' after 'return'" error) is thrown when JSLint or ESLint encounters **an
`else` block following an `if` block that contains a disruptive statement such
as `return` or `throw`**. Here's some example code:

<!---
{
    "linter": "jslint"
}
-->
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

ESLint will only raise this error when it encounters a `return` statement and
not a `throw` statement:

<!---
{
    "linter": "eslint"
}
-->
```javascript
function example(x) {
    "use strict";
    if (!x) {
        return "A return is disruptive";
    } else {
        return false;
    }
}
```

### Why do I get this error?

This error is raised to highlight a **completely pointless piece of code**. If
execution enters the `if` block, the flow of execution will be disrupted (it
could for example return or throw an exception). There will be no way execution
can enter the `else` block. Therefore, you can simply omit the `else` block and
place its contents directly after the `if` block. Here's the above snippet
again, without the error:

<!---
{
    "linter": "jslint"
}
-->
```javascript
function example(x) {
    "use strict";
    if (!x) {
        throw "A throw is disruptive";
    }
    return true;
}
```

In ESLint the rule that generates this warning is named `no-else-return`. You
can disable it by setting it to `0`, or enable it by setting it to `1`.

[iife]: http://benalman.com/news/2010/11/immediately-invoked-function-expression
[jshintopts]: http://jshint.com/docs/#options
