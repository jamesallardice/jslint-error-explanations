<!---
{
    "titles": [
        "Don't use octal: '{a}'. Use '\\u...' instead",
        "Octal literals are not allowed in strict mode",
        "W115"
    ],
    "slugs": [
        "dont-use-octal-a-use-instead",
        "octal-literals-are-not-allowed-in-strict-mode",
        "w115"
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

This warning has existed in three forms across the three main linters. It was
introduced in the original version of JSLint and has remained (in a way) in all
three tools ever since.

 - In JSLint the warning given is "Don't use octal: '{a}'. Use '\\u...' instead"

 - In JSHint and ESLint the warning has always been "Octal literals are not
   allowed in strict mode"

The situations that produce the warning have not changed despite changes to the
text of the warning itself.

### When do I get this error?

The "Don't use octal: '{a}'. Use '\\u...' instead" error, and the alternative
"Octal literals are not    allowed in strict mode", is thrown when JSLint,
JSHint or ESLint encounters **a string literal that contains the escape
character followed by a digit between `0` and `7`**. JSHint and ESLint will only
raise this warning when the relevant code is **running in strict mode**. In the
following example we attempt to assign a string containing an octal escape to a
variable `x`:

<!---
{
    "linter": "jslint"
}
-->
```javascript
function demo() {
    "use strict";
    return "Copyright \251";
}
```

### Why do I get this error?

This error is raised to highlight **the use of a deprecated language feature**.
As of version 5 of the ECMAScript specification, octal escape sequences are
deprecated and should no longer be used. You run the risk of losing
compatibility with newer JavaScript engines as support for this feature is
gradually dropped. The latest version of the specification contains the
following note ([ES5 B.1][es5-b.1]):

> Past editions of ECMAScript have included additional syntax and semantics for
> specifying octal literals and octal escape sequences. These have been removed
> from this edition of ECMAScript.

If you need to use an escape sequence, you can use hexadecimal or unicode
sequences. JSLint recommends that you use the unicode escape sequence over the
hexadecimal equivalent. The reason for this is likely that unicode escape
sequences can cover a vast range of characters compared to the 256 offered by
hexadecimal sequences, and that the JSON specification only allows unicode
escapes. Note that although they have different names, both hexadecimal and
unicode escape sequences use hexadecimal numbers. Here's the above example
again, using a unicode escape instead:

<!---
{
    "linter": "jslint"
}
-->
```javascript
function demo() {
    "use strict";
    return "Copyright \u00A9";
}
```

However, if you would rather use the hexadecimal escape sequence, none of the
three main linters will ask you to do otherwise:

<!---
{
    "linter": "jslint"
}
-->
```javascript
function demo() {
    "use strict";
    return "Copyright \xA9";
}
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W115**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W115 */` directive.

[es5-B.1]: http://es5.github.com/#B.1
[jshintopts]: http://jshint.com/docs/#options
