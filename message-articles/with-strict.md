<!---
{
    "titles": [
        "'with' is not allowed in strict mode",
        "Strict mode code may not include a with statement",
        "E010"
    ],
    "slugs": [
        "with-is-not-allowed-in-strict-mode",
        "strict-mode-code-may-not-include-with",
        "e010"
    ],
    "linters": [
        "jshint",
        "eslint"
    ],
    "author": "jallardice"
}
-->

### History

This warning has existed in two forms in JSHint and ESLint. It was introduced in
the original version of JSLHnt and has remained in both tools since. It does not
feature in JSLint.

 - In JSHint the message used is "'with' is not allowed in strict mode"

 - In ESLint the message has always been "Strict mode code may not include a
   with statement"

The situations that produce the warning have not changed despite changes to the
text of the warning itself.

### When do I get this error?

The "'with' is not allowed in strict mode" error, and the alternative "Strict
mode code may not include a with statement", is thrown when JSHint or ESLint
encounters **the `with` statement in code that is running in strict mode**.
Here's an example:

<!---
{
    "linter": "jshint"
}
-->
```javascript
function example() {
    "use strict";
    var a = {
        b: 10
    };
    with (a) {
        b = 20;
    }
}
```

### Why do I get this error?

This error is raised to highlight a **fatal JavaScript syntax error**. Your code
will fail to run in any environment that supports strict mode. The ECMAScript 5
specification clearly states that the presence of a `with` statement within
strict mode code is illegal ([ES5 &sect;12.10.1][es5-12.10.1]):

> Strict mode code may not include a *WithStatement*. The occurrence of a
> *WithStatement* in such a context is treated as a SyntaxError.

You can solve this problem by reworking code that uses `with` statements to
fully qualify the "namespace". The following example will behave in exactly the
same way as the first example above:

<!---
{
    "linter": "jshint"
}
-->
```javascript
function example() {
    "use strict";
    var a = {
        b: 10
    };
    a.b = 20;
}
```

If you rely upon the behaviour of the `with` statement for a valid use-case,
your only option is to ensure your code does not run in strict mode. This
results in a different message from JSHint, but one that can be suppressed (in
version 1.0.0 and above) with the appropriate warning identifier flag. See the
page on the "[Don't use with][with]" error for more details:

<!---
{
    "linter": "jshint"
}
-->
```javascript
function example() {
    var a = {
        b: 10
    };
    with (a) {
        b = 20;
    }
}
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. Since this message relates to a fatal
syntax error you cannot disable it.

[es5-12.10.1]: http://es5.github.com/#x12.10.1
[with]: /unexpected-with
[jshintopts]: http://jshint.com/docs/#options
