<!---
{
    "titles": [
        "All 'debugger' statements should be removed",
        "Forgotten 'debugger' statement?",
        "Unexpected 'debugger'",
        "Unexpected 'debugger' statement",
        "W087"
    ],
    "slugs": [
        "all-debugger-statements-should-be-removed",
        "forgotten-debugger-statement",
        "unexpected-debugger",
        "unexpected-debugger-statement",
        "w087"
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

This warning has existed in various forms in JSLint, JSHint and ESLint. It was
introduced in the original version of JSLint and has remained in all three
linters ever since.

 - In JSLint the warning given is "Unexpected 'debugger'"

 - In JSHint prior to version 1.0.0 the message used is "All 'debugger'
   statements should be removed"

 - In JSHint version 1.0.0 and above the message is "Forgotten 'debugger'
   statement?"

 - In ESLint the message has always been "Unexpected 'debugger' statement"

The situations that produce the warning have not changed despite changes to the
text of the warning itself.

### When do I get this error?

The "All 'debugger' statements should be removed" error, and the alternatives
"Forgotten 'debugger' statement" and "Unexpected 'debugger'", is thrown when
JSLint, JSHint or ESLint encounters a **`debugger` statement**. The following
example is completely useless but is the minimum program that will generate this
error:

<!---
{
    "linter": "jslint"
}
-->
```javascript
debugger;
```

### Why do I get this error?

This error is raised to highlight a **lack of convention** and a **possible
oversight**. Your code will run without error but it will probably not behave
the way you want it to in a production environment. The `debugger` statement is
used to tell the JavaScript engine to open a debugger if one is available and
treat the statement as a breakpoint ([ES5 &sect;12.15][es5-12.15]):

> Evaluating the *DebuggerStatement* production may allow an implementation to
> cause a breakpoint when run under a debugger. If a debugger is not present or
> active this statement has no observable effect.

This can be useful during development to get an insight into how your code
behaves, or to inspect the value of variables at runtime. However it's highly
unlikely that you want to keep debugger statements in production code. For that
reason, JSLint, JSHint and ESLint prefer them to be removed.

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W087**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W087 */` directive.

In ESLint the rule that generates this warning is named `no-debugger`. You can
disable it by setting it to `0`, or enable it by setting it to `1`.

[es5-12.15]: http://es5.github.com/#x12.15
[jshintopts]: http://jshint.com/docs/#options
