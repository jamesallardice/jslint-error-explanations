<!---
{
    "titles": [
        "Variable {a} was not declared correctly",
        "You might be leaking a variable ({a}) here",
        "W120"
    ],
    "slugs": [
        "variable-a-was-not-declared-correctly",
        "you-might-be-leaking-a-variable-here",
        "w120"
    ],
    "linters": [
        "jslint",
        "jshint"
    ],
    "author": "jallardice"
}
-->

### History

This warning has existed in two forms across the three main linters. It was
introduced in the original version of JSLint and has remained in all three tools
ever since.

 - In JSLint and JSHint prior to version 2.1.4 the warning given is *"Variable
   {a} was not declared correctly"*

 - In JSHint 2.1.4 and above the message used is *"You might be leaking a
   variable ({a}) here"*

 - ESLint doesn't support this functionality in the same way but will raise the
   more generic *"['{a}' is not defined][notdef]"* error in the same situation

The situations that produce the warning have not changed despite changes to the
text of the warning itself.

### When do I get this error?

The "Variable    {a} was not declared correctly error (and the alternative "You
might be leaking a    variable ({a}) here" error) is thrown when JSLint and
JSHint encounter **more than one inline assignment**. In this example, we
attempt to assign a string literal to the variables `x`, `y` and `z`:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var x = y = z = "example";
```

### Why do I get this error?

This error is raised to highlight a **potential misunderstanding of the
language**. A relatively common beginner mistake is to use the above code in an
attempt to declare multiple variables and assign a single value to all of them
at the same time. However, the above is actually equivalent to the following:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var x;
x = y = z = "example";
```

This makes the problem more obvious. Instead of declaring three variables, we
have actually only declared one. `y` and `z` will refer to variables with those
identifiers in ancestor scopes, or, assuming the code is not running in strict
mode, will be created as properties of the global object. If you intended to
declare multiple variables, you can use commas to separate them instead:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var x, y, z;
x = y = z = "example";
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W120**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W120 */` directive.

[notdef]: /a-was-used-before-it-was-defined
[jshintopts]: http://jshint.com/docs/#options
