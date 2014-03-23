<!---
{
    "titles": [
        "A regular expression literal can be confused with '/='"
    ],
    "tools": [
        "jslint",
        "jshint"
    ],
    "author": "jallardice",
    "slugs": [
        "a-regular-expression-literal-can-be-confused-with"
    ]
}
-->

### When do I get this error?

JSLint and JSHint (prior to version 1.0.0) will throw the "A regular expression literal can be confused with '/='" error
when they encounter **a regular expression literal that begins with the `=` character**. In the following example we
attempt to assign a regular expression literal to match the string "=1" to the variable `x`:

```javascript
var regex = /=1/;
```

### Why do I get this error?

This error is raised to highlight a **potentially confusing piece of code**. Your code will run fine if you do not fix
this error, but it may be confusing to others, especially at first glance to someone quickly searching through your
script.

The `/` character is ambiguous in JavaScript. It can either signify the start or end of a regular expression literal, as
it does in the example above, or it can be interpreted as the division operator. Like most of the arithmetic operators,
the division operator can be combined with the assignment operator to produce a shorthand:

```javascript
var x = 10;
x /= 5; // Shorthand division-assignment operator
```

This ambiguity is not a problem because the parser should always be able to differentiate between the two uses. However,
you can see why the regular expression example at the top of this page could cause initial confusion.

To solve this issue, you can simply escape the `=` character in the regular expression. This will behave in exactly the
same way but since the `=` character is no longer the first, the error is not raised:

```javascript
var regex = /\=1/;
```

Alternatively, you can use the `RegExp` constructor, which removes the need for the escaping `/` characters:

```javascript
var regex = new RegExp("=1");
```
