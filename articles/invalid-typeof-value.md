<!---
{
    "titles": [
        "Invalid typeof value '{a}'",
        "W122"
    ],
    "slugs": [
        "invalid-typeof-value-a",
        "w122"
    ],
    "linters": [
        "jshint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "Invalid typeof value '{a}'" error is thrown when JSHint encounters **a
comparison with a `typeof` expression on one side and an invalid string literal
on the other**. In the following example we have a function that will return
`true` if the argument is of type `"bool"`:

<!---
{
    "linter": "jshint"
}
-->
```javascript
function demo(a) {
    return typeof a === "bool";
}
```

This functionality was introduced in JSHint 2.3.0. Prior versions do not raise
any error in this situation. Neither JSLint nor ESLint raises any error in this
situation.

### Why do I get this error?

This error is raised to highlight **code that is unlikely to work as you
expect**. The `typeof` operator returns one of a few possible values that are
given by the ECMAScript specification (although in some situations in certain
browsers it will return one of two extra possibilities). The possible values are
as follows ([ES5 &sect;11.4.3]):

 - `"undefined"` - when the operand has the `undefined` value

 - `"boolean"` - when the operand has a literal boolean value

 - `"string"` - when the operand has a literal string value

 - `"number"` - when the operand has a literal numeric value

 - `"function"` - when the operand is an object and implements the internal
   [[Call]] property

 - `"object"` - when the operand has the `null` value or is an object that does
   not implement the internal [[Call]] property

In certain situations the operator could also return `"xml"` or `"unknown"` but
you're unlikely to come across these. JSHint requires that any comparison with a
`typeof` expression uses one of these strings. If a different string is used the
condition will always evaluate to false since it is not possible for the
`typeof` operator to ever return the value you're using. To solve this issue
simply use a valid value:

<!---
{
    "linter": "jshint"
}
-->
```javascript
function demo(a) {
    return typeof a === "boolean";
}
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W122**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W122 */` directive. You can also set the `sub` option to `true`.

[es5-11.4.3]: https://es5.github.io/#11.4.3
[jshintopts]: http://jshint.com/docs/#options
