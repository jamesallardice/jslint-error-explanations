<!---
{
    "titles": [
        "Attempting to override '{a}' which is a constant",
        "E013"
    ],
    "slugs": [
        "attempting-to-override-a-which-is-a-constant",
        "e013"
    ],
    "linters": [
        "jshint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "Attempting to override '{a}' which is a constant" error is thrown when
JSHint encounters an **assignment expression with an identifer that has been
declared in a constant variable statement**. In the following example we declare
a constant `MY_CONST` and assign a value to it, and then attempt to change its
value:

<!---
{
    "linter": "jshint"
}
-->
```javascript
/*jshint esnext: true */
const MY_CONST = 10;
MY_CONST = 20;
```

### Why do I get this error?

This error is raised to highlight a **fatal JavaScript type error**. Your code
will fail to run if you do not resolve this error. Mozilla Developer Network
offers the following note:

> The value of a constant cannot change through re-assignment, and a constant
> cannot be re-declared.

You can fix this issue by removing any assignments to constants declared with
the `const` keyword:

<!---
{
    "linter": "jshint"
}
-->
```javascript
/*jshint esnext: true */
const MY_CONST = 10;
```

However, since browser support for the `const` statement is limited and most
implementations currently differ significantly from the upcoming ECMAScript 6
specification, it's recommended that you don't use it all, and simply use the
`var` statement instead. A common convention to indicate a variable with a value
that shouldn't change is to give that variable an identifier made up of
uppercase characters, as has been done in the previous examples:

<!---
{
    "linter": "jshint"
}
-->
```javascript
/*jshint esnext: true */
var MY_CONST = 10; // A fake constant
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. Since this message relates to a fatal
syntax error you cannot disable it.

[jshintopts]: http://jshint.com/docs/#options
