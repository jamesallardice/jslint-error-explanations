<!---
{
    "titles": [
        "Stopping. ({a}% scanned)",
        "E042"
    ],
    "slugs": [
        "stopping",
        "e042"
    ],
    "linters": [
        "jslint",
        "jshint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "Stopping. ({a}% scanned)" error is thrown when JSLint or JSHint encounters
**a JavaScript syntax error** and cannot continue to reliably parse the program.
JSHint will only raise this error if the `passfail` option is set to `true`. In
the following example we have half a variable statement which is invalid and
cannot be parsed as a complete JavaScript program:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/*jshint passfail: true */
var
```

### Why do I get this error?

This error is raised to highlight a **fatal JavaScript syntax error** and the
fact that **the parser cannot reliably finish parsing your program**. Your code
will not run unless you fix this error. The exact cause will depend on your
program, but other errors are usually raised along side this one that should
guide you to the problem with your code. In our example, the variable statement
is missing an identifier:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/*jshint passfail: true */
var a;
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. Since this message relates to a fatal
syntax error you cannot disable it.

[jshintopts]: http://jshint.com/docs/#options
