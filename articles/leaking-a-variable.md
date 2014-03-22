<!---
{
    "titles": [
        "You might be leaking a variable ({a}) here",
        "Variable {a} was not declared correctly",
        "W120",
        "E038"
    ],
    "tools": [
        "jslint",
        "jshint"
    ],
    "tags": [
        "variable"
    ],
    "contributors": [
        "jallardice"
    ],
    "slugs": [
        "you-might-be-leaking-a-variable-here",
        "variable-a-was-not-declared-correctly",
        "w120",
        "e038"
    ]
}
-->

### History

In JSLint (all versions) and JSHint (below version 2.1.4) the message used for this error was "Variable {a} was not
declared correctly". As of JSHint version 2.1.4 the more descriptive "You might be leaking a variable ({a}) here"
message is used. The situations that cause the message to be produced have not changed.

### When do I get this error?

The "You might be leaking a variable ({a}) here" error (and the alternative "Variable {a} was not declared correctly"
error) are thrown when JSLint/JSHint encounters **more than one inline assignment**. In this example, we attempt to
assign a string literal to the variables `x`, `y` and `z`:

```javascript
var x = y = z = "example";
```

### Why do I get this error?

This error is raised to highlight a potential **lack of understanding**. A relatively common beginner mistake is to use
the above code to declare multiple variables and assign a single value to all of them at the same time. However, the
above is actually equivalent to the following:

```javascript
z = "example";
y = z;
var x = y;
```

This makes the problem more obvious. Instead of declaring three variables, we have actually only declared one. `y` and
`z` will refer to variables with those identifiers in ancestor scopes, or (assuming the code is not running in strict
mode) will be created as properties of the global object.

If you intended to declare multiple variables, you can use commas to separate them instead:

```javascript
var x, y, z;
x = y = z = "example";
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax](http://jshint.com/docs/#options). In versions of JSHint prior to 2.1.4 this message was
incorrectly classified as an error (rather than a warning) and therefore could not be disabled. In JSHint version 2.1.4
and above the message is correctly classified. Its identifier is **W120**, meaning you can tell JSHint to not issue
this warning with the `/*jshint -W120 */` directive.
