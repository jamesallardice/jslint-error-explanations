<!---
{
    "titles": [
        "Unclosed string",
        "E029"
    ],
    "slugs": [
        "unclosed-string",
        "e029"
    ],
    "linters": [
        "jslint",
        "jshint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "Unclosed string" error is thrown when JSLint or JSHint encounters a **a
string that is not closed before the next line break or the end of the
program**. There are numerous situations that could cause this. In this first
example, we accidentally forget to close our string:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var myString = "my string,
    myNumber = 10;
```

In the next example, we want our string to include a backslash character. The
string appears to be closed but actually isn't, due to the backslash character
escaping the closing quote:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var myString = "my string\",
    myNumber = 10;
```

And this final example, which makes use of the multiline strings allowed by
ECMAScript 5, features a string that has not closed by the end of the program
(the previous two examples failed at the first line break):

<!---
{
    "linter": "jslint"
}
-->
```javascript
var myString = "my multiline \
                string
```

### Why do I get this error?

This error is raised to highlight a **fatal JavaScript syntax error**. Your code
will not run unless you fix this issue. The ECMAScript grammar states that any
string literal must be closed by the same character (either `"` or `'`) that
opened it ([ES5 &sect;7.8.4][es5-7.8.4]):

> *StringLiteral* ::<br>
> &nbsp;&nbsp;&nbsp;&nbsp;`"` *DoubleStringCharacters*<sub>opt</sub> `"`<br>
> &nbsp;&nbsp;&nbsp;&nbsp;`'` *SingleStringCharacters*<sub>opt</sub> `'`

To fix the error, simply close any unclosed strings:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var myString = "my string",
    myNumber = 10;
```

The second example above failed because the backslash character was escaping the
closing quote, turning it into a literal character rather than a syntactic
structure. To include a backslash in a string, you need to escape the backslash
itself:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var myString = "my string\\",
    myNumber = 10;
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. Since this message relates to a fatal
syntax error you cannot disable it.

[es5-7.8.4]: http://es5.github.com/#x7.8.4
[jshintopts]: http://jshint.com/docs/#options
