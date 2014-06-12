<!---
{
    "titles": [
        "const '{a}' has already been declared",
        "E011"
    ],
    "slugs": [
        "const-a-has-already-been-declared",
        "e011"
    ],
    "linters": [
        "jshint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "const '{a}' has already been declared" error is thrown when JSHint
encounters **a constant declaration with an identifier that has already been
used in a previous constant declaration**. In the following example we declare a
constant `CONST_1` and then attempt to declare a second constant with the same
identifier:

<!---
{
    "linter": "jshint"
}
-->
```javascript
/*jshint esnext: true */
const CONST_1 = 10;
const CONST_1 = 20;
```

Notice the use of the `esnext` option. When relying upon ECMAScript 6 features
such as constants you should always set this option so JSHint doesn't raise
unnecessary warnings. Also note that ESLint will raise a warning in the same
scenario but uses the more generic "[{a} is already defined][alreadydef]"
message. See that page for more details.

### Why do I get this error?

This error is raised to highlight a **fatal JavaScript type error**. Your code
will fail to run if you do not resolve this error. Mozilla Developer Network
offers the following note:

> The value of a constant cannot change through re-assignment, and a constant
> cannot be re-declared.

You can fix this issue by ensuring each constant declaration uses a unique
identifier:

<!---
{
    "linter": "jshint"
}
-->
```javascript
/*jshint esnext: true */
const CONST_1 = 10;
const CONST_2 = 20;
```

However, since browser support for the `const` statement is limited and most
implementations currently differ significantly from the upcoming ECMAScript 6
specification, it's recommended that you don't use it all, and simply use the
`var` statement instead. A common convention to indicate a variable with a value
that shouldn't change is to give that variable an identifier made up of
uppercase characters, as has been done in the previous examples.

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. Since this message relates to a fatal
syntax error you cannot disable it.

[alreadydef]: /a-is-already-defined
[jshintopts]: http://jshint.com/docs/#options
