<!---
{
    "titles": [
        "Missing 'use strict' statement",
        "E007"
    ],
    "slugs": [
        "missing-use-strict-statement",
        "e007"
    ],
    "linters": [
        "jslint",
        "jshint",
        "eslint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "Missing 'use strict' statement" error is thrown when JSLint, JSHint and
ESLint encounter **a function that does not contain the strict mode directive,
and none of whose ancestor scopes contain the strict mode directive**. JSHint
will only raise this warning if the `strict` option is set to `true`. Here's an
example of a function that does not run in strict mode:

<!---
{
    "linter": "jslint",
    "version": "2013-04-29"
}
-->
```javascript
/*jshint strict: true */
function example() {
    return true;
}
```

### Why do I get this error?

This error is raised to highlight a **lack of convention**. However, as
JavaScript engines move forward, this error will increasingly be helpful as it
should highlight areas of code that may not work as you expect them to, or may
even cause fatal JavaScript errors.

A `"use strict"` statement is an example of a *directive*, which can appear as
the first statement of a program or a function ([ES5 &sect;14.1][es5-14.1]):

> A Directive Prologue is the longest sequence of *ExpressionStatement*
> productions occurring as the initial *SourceElement* productions of a
> *Program* or *FunctionBody* and where each *ExpressionStatement* in the
> sequence consists entirely of a *StringLiteral* token followed a semicolon.
> The semicolon may appear explicitly or may be inserted by automatic semicolon
> insertion. A Directive Prologue may be an empty sequence.

The `"use strict"` directive can be used to force the engine to conform to a
strict subset of the language, as defined in [ES5 Annex C][es5-ac]. It has
become something of a convention to run all JavaScript code in strict mode, to
avoid falling into traps that are apparent in the non-strict language. See the
previous link or the corresponding [MDN article][mdn] for the details of the
differences in strict mode. You can fix this error by simply adding a `"use
strict"` directive to the function, or to an ancestor function:

<!---
{
    "linter": "jslint",
    "version": "2013-04-29"
}
-->
```javascript
/*jshint strict: true */
function example() {
    "use strict";
    return true;
}
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. This message is treated as an error by
JSHint which means you are unable to prevent it from being issued by ID.

In ESLint the rule that generates this warning is named `strict`. You can
disable it by setting it to `0`, or enable it by setting it to `1`.

[es5-14.1]: http://es5.github.com/#x14.1
[es5-ac]: http://es5.github.com/#C
[mdn]: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Functions_and_function_scope/Strict_mode
[jshintopts]: http://jshint.com/docs/#options
