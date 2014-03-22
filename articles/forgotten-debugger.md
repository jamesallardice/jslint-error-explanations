<!---
{
    "titles": [
        "Forgotten 'debugger' statement?",
        "All 'debugger' statements should be removed",
        "Unexpected 'debugger'",
        "W087"
    ],
    "tools": [
        "jslint",
        "jshint"
    ],
    "tags": [
        "dev"
    ],
    "contributors": [
        "jallardice"
    ],
    "slugs": [
        "forgotten-debugger-statement",
        "all-debugger-statements-should-be-removed",
        "unexpected-debugger",
        "w087"
    ]
}
-->

### History

In all version of JSLint the message used for this error is "Unexpected 'debugger'". In older version of JSHint (below
version 1.0.0) the message used was "All 'debugger' statements should be removed". In later versions the message has
changed to "Forgotten 'debugger' statement?", but the situations that cause the message to be produced have not changed.

### When do I get this error?

The "All 'debugger' statements should be removed" and more recent "Forgotten 'debugger' statement" errors are raised
when JSHint encounters **a `debugger` statement**. In the following useless example we attempt to use the `debugger`
statement:

```javascript
debugger;
```

### Why do I get this error?

This error is raised to highlight **a lack of convention** and **possible oversight** by the developer. The `debugger`
statement is used to tell the environment in which the code is running to open a debugger if one is available and treat
the statement as a breakpoint ([ES5 &sect;12.15](http://es5.github.com/#x12.15)):

> Evaluating the *DebuggerStatement* production may allow an implementation to cause a breakpoint when run under a
> debugger. If a debugger is not present or active this statement has no observable effect.

This can be useful during development to get an insight into how your code behaves, or to inspect the value of variables
at runtime. However it's highly unlikely that you want to keep `debugger` statements in production code. For that
reason, JSLint and JSHint prefer them to be removed.

In JSHint 1.0.0 and above you have the ability to ignore any warning with a [special option
syntax](http://jshint.com/docs/config/#options). The identifier of this warning is **W087**. This means you can tell
JSHint to not issue this warning with the `/*jshint -W087 */` directive.
