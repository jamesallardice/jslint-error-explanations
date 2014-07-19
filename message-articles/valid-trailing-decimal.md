<!---
{
    "titles": [
        "A dot following a number can be confused with a decimal point",
        "W005"
    ],
    "slugs": [
        "a-dot-following-a-number-can-be-confused-with-a-decimal-point",
        "w005"
    ],
    "linters": [
        "jshint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "A dot following a number can be confused with a decimal point" error is
thrown when JSHint encounters **a numeric literal containing a decimal point as
the left-hand-side of a member expression**. In the following example we attempt
to assign the string representation of a number to a variable:

<!---
{
    "linter": "jshint"
}
-->
```javascript
var a = 5.4.toString();
```

Note that this is slightly different to closely related "[A trailing decimal
point can be confused with a dot][trailing]" error, although JSLint will use
that message in this situation too.

### Why do I get this error?

This error is raised to highlight a **potentially confusing piece of code**.
Your script will run without error if you do not change it, but it could be
confusing to other developers, especially at first glance.

Since a number can only contain a single decimal point the parser is able to
determine that any subsequent occurrences of the character after a numeric
literal can only be intended as a member operator. In other words the ambiguity
of the `.` character is removed. However the construct can appear confusing at
first glance.

The best solution in this case is to wrap the number in parentheses:

<!---
{
    "linter": "jshint"
}
-->
```javascript
var a = (5.4).toString();
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this
warning is **W005**. This means you can tell JSHint to not issue this warning
with the `/*jshint -W005 */` directive.

[trailing]: /a-trailing-decimal-point-can-be-confused-with-a-dot-a
[jshintopts]: http://jshint.com/docs/#options
