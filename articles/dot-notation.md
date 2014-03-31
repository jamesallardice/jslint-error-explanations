<!---
{
    "titles": [
        "['{a}'] is better written in dot notation",
        "W069"
    ],
    "slugs": [
        "a-is-better-written-in-dot-notation",
        "w069"
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

The "['{a}'] is better written in dot notation" error is thrown when JSLint,
JSHint or ESLint encounters an attempt to **access a property using a string
literal within a pair of square brackets when the property name is not a
reserved word**. In the following example we attempt to access the `prop`
property of the `x` object:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var x = {
        prop: 10
    },
    y = x["prop"];
```

### Why do I get this error?

This error is raised to highlight a **unnecessarily verbose and potentially
confusing piece of code**. It is very common in many programming languages to
use dot notation when referring to properties of an object. There is no problem
with either syntax, and both will work in all environments. However, by using
dot notation where possible, you can save three characters every time. Here's
the above snippet, this time with dot notation:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var x = {
        prop: 10
    },
    y = x.prop;
```

However, it's important to remember that you have to use the square bracket
notation if you want to access a property whose identifier is a reserved word.
JSLint and JSHint will not raise this error in that situation. In the following
example, `x` has a property with the identifier `class`. Notice that JSLint does
not throw an error, even though we are using square bracket notation:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var x = {
        "class": 10
    },
    y = x["class"];
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W069**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W069 */` directive. You can also set the `sub` option to `true`.

In ESLint the rule that generates this warning is named `dot-notation`. You can
disable it by setting it to `0`, or enable it by setting it to `1`.

[jshintopts]: http://jshint.com/docs/#options
