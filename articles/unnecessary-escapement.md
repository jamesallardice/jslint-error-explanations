<!---
{
    "titles": [
        "Unnecessary escapement",
        "Unexpected '\\'"
    ],
    "slugs": [
        "unnecessary-escapement",
        "unexpected-backslash"
    ],
    "linters": [
        "jslint"
    ],
    "author": "jallardice"
}
-->

### History

This warning has existed in two forms in JSLint. It was introduced in the
original version and has remained ever since. It is not present in JSHint or
ESLint.

 - In JSLint versions dated December 2010 and earlier the warning given is
   "Unnecessary escapement"

 - In more recent versions the message has changed to "Unexpected '\'"

The situations that produce the warning have not changed despite changes to the
text of the warning itself.

### When do I get this error?

The "Unnecessary escapement" error (and the alternative "Unexpected '\') is
thrown when JSLint encounters **a string containing a unicode or hexadecimal
escape sequence that could be replaced with the literal character**. In the
following example we use the unicode escape sequence for the | (vertical line)
character:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var title = "My Website \u007c Welcome";
```

### Why do I get this error?

This error is raised to highlight a **potentially confusing piece of code**.
When the character in question is safely represented without an escape sequence
it is generally preferrable not to use an escape sequence because it makes the
code easier to read. It would be difficult to know exactly what character is
represented by `\u007c` in the above example without looking it up.

The error is easily resolved by simply replacing unnecessary escape sequences
with the appropriate characters:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var title = "My Website | Welcome";
```
