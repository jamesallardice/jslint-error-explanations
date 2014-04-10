<!---
{
    "titles": [
        "A regular expression literal can be confused with '/='",
        "E014"
    ],
    "slugs": [
        "a-regular-expression-literal-can-be-confused-with",
        "e014"
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

This warning was introduced in the original version of JSLint and existed in the
same form in JSHint until version 1.0.0 when it was removed. ESLint has always
issued the same warning.

### When do I get this error?

The "A regular expression literal can be confused with '/='" error is thrown
when JSLint, JSHint (prior to version 1.0.0) or ESLint encounters **a regular
expression literal that begins with the = character**. In the following example
we attempt to assign a regular expression literal to match the string `"=1"` to
the variable `x`:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var regex = /=1/;
```

### Why do I get this error?

This error is raised to highlight a **potentially confusing piece of code**.
Your code will run fine if you do not fix this error, but it may be confusing to
others, especially at first glance to someone quickly searching through your
script.

The `/` character is ambiguous in JavaScript. It can either signify the start or
end of a regular expression literal, as it does in the example above, or it can
be interpreted as the division operator. Like most of the arithmetic operators,
the division operator can be combined with the assignment operator to produce a
shorthand:

<!---
{
    "linter": "jslint"
}
-->
```js
var x = 10;
x /= 5; // Shorthand division-assignment operator
```

This ambiguity is not a problem because the parser should always be able to
differentiate between the two uses. However, you can see why the regular
expression example at the top of this page could cause initial confusion.

To solve this issue, you can simply escape the `=` character in the regular
expression. This will behave in exactly the same way but since the `=` character
is no longer the first, the error is not raised:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var regex = /\=1/;
```

Alternatively, you can use the RegExp constructor, which removes the need for
the ambiguous delimiting `/` characters:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var regex = new RegExp("=1");
```

In ESLint the rule that generates this warning is named `no-div-regex`. You can
disable it by setting it to `0`, or enable it by setting it to `1`.
