<!---
{
    "titles": [
        "Strings must use {a}quote",
        "W108",
        "W109"
    ],
    "slugs": [
        "strings-must-use-singlequote",
        "strings-must-use-doublequote",
        "w108",
        "w109"
    ],
    "linters": [
        "jshint",
        "eslint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "Strings must use singlequote" and "Strings must use doublequote" errors are
thrown when JSHint or ESLint encounters **string literal delimited by double
quote characters when the `quotmark` option is set to `single`** or a **string
literal delimited by single quote characters when the `quotmark` option is set
to `double`**.  In the following example we attempt to assign a string literal
to the variable `x`:

<!---
{
    "linter": "jshint"
}
-->
```javascript
/*jshint quotmark: double */
var x = 'My String';
```

### Why do I get this error?

This error is raised to highlight a **deviation from a specific coding style**.
Your code will run fine if you do not fix this error, but it demonstrates a lack
of care. There is no difference in JavaScript between single and double quotes.
This is made clear by the grammar for string literals ([ES5
&sect;7.8.4][es5-7.8.4]):

> *StringLiteral* ::<br>
> &nbsp;&nbsp;&nbsp;&nbsp;`"` *DoubleStringCharacters*<sub>opt</sub> `"`<br>
> &nbsp;&nbsp;&nbsp;&nbsp;`'` *SingleStringCharacters*<sub>opt</sub> `'`

The only difference is that *DoubleStringCharacters* cannot contain another
double quote, and *SingleStringCharacters* cannot contain a single quote (as
that would terminate the string literal). If this option is set to either
`double` or `single` then it is likely your codebase requires you to conform to
a specific style in which one type of quote is preferred. To fix the error,
simply use the correct type of quote:

<!---
{
    "linter": "jshint"
}
-->
```javascript
/*jshint quotmark: double */
var x = "My String";
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W108**
(for double quotes) or **W109** (for single quotes). This means you can tell
JSHint to not issue this warning with the `/*jshint -W108 */` or `/*jshint -W109
*/` directive.

[es5-7.8.4]: http://es5.github.io/#x7.8.4
[jshintopts]: http://jshint.com/docs/#options
