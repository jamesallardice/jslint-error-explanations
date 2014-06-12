<!---
{
    "titles": [
        "Mixed double and single quotes",
        "W110"
    ],
    "slugs": [
        "mixed-double-and-single-quotes",
        "w110"
    ],
    "linters": [
        "jshint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "Mixed double and single quotes" error is thrown when JSHint encounters
**string literal delimited by double or single quote characters when a string
literal delimited by the other has already been found**. It will only raise this
warning if the `quotmark` option is set to `true`. In the following example we
attempt to assign string literals to the variables `x` and `y`:

<!---
{
    "linter": "jshint"
}
-->
```javascript
/*jshint quotmark: true */
var x = "My String",
    y = 'Another string';
```

### Why do I get this error?

This error is raised to highlight a **lack of consistency**. Your code will run
fine if you do not fix this error, but it demonstrates a lack of care. There is
no difference in JavaScript between single and double quotes. This is made clear
by the grammar for string literals ([ES5 &sect;7.8.4][es5-7.8.4]):

> *StringLiteral* ::<br>
> &nbsp;&nbsp;&nbsp;&nbsp;`"` *DoubleStringCharacters*<sub>opt</sub> `"`<br>
> &nbsp;&nbsp;&nbsp;&nbsp;`'` *SingleStringCharacters*<sub>opt</sub> `'`

The only difference is that *DoubleStringCharacters* cannot contain another
double quote, and *SingleStringCharacters* cannot contain a single quote (as
that would terminate the string literal). However, it would usually be frowned
upon to mix both types of quote within one program (there are obvious
exceptions, such as nested quotes). You can easily resolve this issue by
sticking to one type, and you should consider setting the `quotmark` option to
either `double` or `single` to enforce your preference:

<!---
{
    "linter": "jshint"
}
-->
```javascript
/*jshint quotmark: double */
var x = "My String",
    y = "Another string";
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W110**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W110 */` directive. You can also set the `quotmark` option to `false`.

[es5-7.8.4]: http://es5.github.io/#x7.8.4
[jshintopts]: http://jshint.com/docs/#options
