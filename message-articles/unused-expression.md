<!---
{
    "titles": [
        "Expected an assignment or function call and instead saw an expression",
        "W030"
    ],
    "slugs": [
        "expected-an-assignment-or-function-call",
        "w030"
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

The "Expected an assignment or function call and instead saw an expression"
error is thrown when JSLint, JSHint or ESLint encounters **an expression with no
effect**. In the following example we have a conditional expression that will
evaluate to `true` but has no other effect on the program:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var x = 1;
x === 1; // Evaluates to 'true'
```

### Why do I get this error?

This error is raised to highlight a piece of **useless and unnecessary code**.
The code will work as expected but since a lone floating expression has no
effect on anything there is no point in it being there at all.

In general you would expect to see a statement which has an effect, such as
assigning a value to a variable or invoking a function:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var x = 1;
x = 2; // Assignment instead of unused expression
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W030**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W030 */` directive.

In ESLint the rule that generates this warning is named `no-unused-expressions`.
You can disable it by setting it to `0`, or enable it by setting it to `1`.

[jshintopts]: http://jshint.com/docs/#options
