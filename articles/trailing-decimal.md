<!---
{
    "titles": [
        "A trailing decimal point can be confused with a dot: '{a}'",
        "A trailing decimal point can be confused with a dot",
        "W047"
    ],
    "slugs": [
        "a-trailing-decimal-point-can-be-confused-with-a-dot-a",
        "a-trailing-decimal-point-can-be-confused-with-a-dot",
        "w047"
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

This warning has existed in two forms across the three main linters. It was
introduced in the original version of JSLint and has remained in all three tools
ever since.

 - In JSLint versions dated before May 2013 the warning given is *"A trailing
   decimal point can be confused with a dot: '{a}'"*

 - In JSLint version dated May 2013 and later this message has been replaced
   with the more generic *"Unexpected '{a}'"*

 - In JSHint and ESLint the message has always been *"A trailing decimal point
   can be confused with a dot: '{a}'"*

The situations that produce the warning have not changed despite changes to the
text of the warning itself.

### When do I get this error?

The "A trailing decimal point can be confused with a dot" error is thrown when
JSLint, JSHint and ESLint encounter **a numeric literal followed by a `.` token
which itself is not followed by a decimal integer literal**. Here's an example
in which we attempt to assign the value `5.0` to the variable `x`:

<!---
{
    "linter": "jslint",
    "version": "2013-04-29"
}
-->
```javascript
var x = 5.;
```

### Why do I get this error?

This error is raised to highlight a **potentially confusing piece of code**.
Your code will run without error if you do not address this issue but it could
be confusing to other developers. The ECMAScript standard states that it is
syntactically valid for a numeric literal to end with a . character ([ES5
Annex 1][es5-a1]):

> *DecimalLiteral* ::<br>
> &nbsp;&nbsp;&nbsp;&nbsp;*DecimalIntegerLiteral* `.`
> *DecimalDigits*<sub>opt</sub> *ExponentPart*<sub>opt</sub><br>
> &nbsp;&nbsp;&nbsp;&nbsp;`.` *DecimalDigits* *ExponentPart*<sub>opt</sub><br>
> &nbsp;&nbsp;&nbsp;&nbsp;*DecimalIntegerLiteral* *ExponentPart*<sub>opt</sub>

The first production in the grammar quoted above shows the situation we
encounter in the example at the top of this page. However, since the `.`
character is ambiguous (it's also commonly seen in use as a "member operator",
to access a property of an object), JSLint, JSHint and ESLint prefer the
explicit third production from the above grammar, just to make your code easier
to understand. Therefore to fix this error you can simply remove the `.`:

<!---
{
    "linter": "jslint",
    "version": "2013-04-29"
}
-->
```javascript
var x = 5;
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W047**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W047 */` directive.

In ESLint the rule that generates this warning is named `no-floating-decimal`.
You can disable it by setting it to `0`, or enable it by setting it to `1`.

[es5-11.9.6]: http://es5.github.com/#x11.9.6
[es5-11.9.3]: http://es5.github.com/#x11.9.3
[es5-15.1.2.4]: http://es5.github.com/#x15.1.2.4
[jshintopts]: http://jshint.com/docs/#options
