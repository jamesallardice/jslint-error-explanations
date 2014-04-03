<!---
{
    "titles": [
        "Use the isNaN function to compare with NaN",
        "W019"
    ],
    "slugs": [
        "use-the-isnan-function-to-compare-with-nan",
        "w019"
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

The "Use the isNaN function to compare with NaN" error is thrown when JSLint,
JSHint and ESLint encounter **a comparison in which one side is `NaN`**. In the following example we attempt to convert a string into a number with the `parseInt` function, which returns `NaN` when it can't perform such a conversion:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var x = parseInt("myString", 10);
if (x === NaN) {
    x = 10;
}
```

### Why do I get this error?

This error is raised to highlight **code that doesn't work as you expect it
to**. Your code will run without error, but will not behave as you expect. `NaN`
is a special value of the `Number` type. It's used to represent any of the
"not-a-number" values represented by the double-precision 64-bit format as
specified by the IEEE Standard for Binary Floating-Point Arithmetic. `NaN` has
the unique property of not being equal to *anything*, including itself. That is
to say, that the condition `NaN !== NaN` evaluates to true.

The strict equality comparison algorithm ([ES5 &sect;11.9.6][es5-11.9.6])
specifically handles the `NaN` value:

> The comparison *x* === *y*, where *x* and *y* are values, produces true or
> false. Such a comparison is performed as follows:<br>
> &nbsp;&nbsp;&nbsp;&nbsp;...<br>
> &nbsp;&nbsp;&nbsp;&nbsp;4. If Type(*x*) is Number, then<br>
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a. If *x* is NaN, return
> false.<br>
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b. If *y* is NaN, return
> false.<br>
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...

The abstract equality comparison algorithm ([ES5 &sect;11.9.3][es5-11.9.3])
behaves in exactly the same way. This means that when you attempt to compare
something to `NaN`, the condition will always evaluate to `false`.

To fix this error, as the message suggests, you can use the `isNaN` function,
which is a built-in property of the global object. It's defined in [ES5
&sect;15.1.2.4][es5-15.1.2.4] and simply returns `true` if its argument coerces
to `NaN`, and `false` if it does not:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var x = parseInt("myString", 10);
if (isNaN(x)) {
    x = 10;
}
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W019**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W019 */` directive.

In ESLint the rule that generates this warning is named `use-isnan`. You can
disable it by setting it to `0`, or enable it by setting it to `1`.

[es5-11.9.6]: http://es5.github.com/#x11.9.6
[es5-11.9.3]: http://es5.github.com/#x11.9.3
[es5-15.1.2.4]: http://es5.github.com/#x15.1.2.4
[jshintopts]: http://jshint.com/docs/#options
