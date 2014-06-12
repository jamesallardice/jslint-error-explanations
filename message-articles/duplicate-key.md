<!---
{
    "titles": [
        "Duplicate key '{a}'",
        "Duplicate member '{a}'",
        "W075"
    ],
    "slugs": [
        "duplicate-key-a",
        "duplicate-member-a",
        "w075"
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

This warning has existed in three forms in JSLint, JSHint and ESLint. It was
introduced in the original version of JSLint and has remained in all three
linters ever since.

 - In JSLint the warning given is the generic "Duplicate '{a}'"

 - In JSHint prior to version 1.0.0 the message used was "Duplicate member
   '{a}'"

 - In JSHint 1.0.0 and above and ESLint the message is "Duplicate key '{a}'"

### When do I get this error?

The "Duplicate key '{a}'" error, and the alternatives "Duplicate member '{a}'"
and "Duplicate '{a}'", is thrown when JSLint, JSHint or ESLint encounters an
**an object literal that contains more than one property with the same
identifier**. In the following example we attempt to assign an object containing
two properties with the identifier `y` to a variable `x`:

<!---
{
    "linter": "jshint"
}
-->
```javascript
var x = {
    y: 10,
    y: 20
};
```

### Why do I get this error?

This error is raised to highlight code that **may not work as you expect** and
could possibly cause a **fatal JavaScript syntax error**. In strict mode, your
code will raise a syntax error. Otherwise, it will run without error but you
will most likely get unexpected results.

The specification states the following, where "*previous*"" is the result of
calling `[[GetOwnProperty]]` on the object in question with the identifier we
are trying to add to it ([ES5 &sect;11.1.5][es5-11.1.5]):

> If *previous* is not undefined then throw a SyntaxError exception if any of
> the following conditions are true<br>
> &nbsp;&nbsp;&nbsp;&nbsp;a. This production is contained in strict code...<br>
> > &nbsp;&nbsp;&nbsp;&nbsp;...

So, when your code is running in strict mode, a syntax error will be thrown if
you attempt to define multiple properties with the same identifier. When not in
strict mode, no error is thrown but usually the latest definition will override
any earlier definitions and you may experience some strange bugs if the naming
was unintentional. Another good reason to always run your code in strict mode.

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W075**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W075 */` directive.

In ESLint the rule that generates this warning is named `no-dupe-keys`. You
can disable it by setting it to `0`, or enable it by setting it to `1`.

[es5-11.1.5]: http://es5.github.com/#x11.1.5
[jshintopts]: http://jshint.com/docs/#options
