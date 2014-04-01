<!---
{
    "titles": [
        "Unclosed comment",
        "E017"
    ],
    "slugs": [
        "unclosed-comment",
        "e017"
    ],
    "linters": [
        "jslint",
        "jshint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "Unclosed comment" error is thrown when JSLint or JSHint encounters **a multiline comment that does not end with the character sequence `*/`**. Here's an example:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/* This is a comment
 * but I forgot to
 * close it.
```

### Why do I get this error?

This error is raised to highlight a **fatal JavaScript syntax error**. Your code
will not run unless you fix this issue. The ECMAScript 5 specification lists the following grammar for multiline comments ([ES5 &sect;7.4][es5-7.4]):

> *MultiLineComment* ::<br>
> &nbsp;&nbsp;&nbsp;&nbsp;`/*` *MultiLineCommentChars*<sub>opt</sub> `*/`

We can see from the above quote that multiline comments must end with the `*/` characters. If you have an unclosed multiline comment a syntax error will be thrown when the interpreter reaches the end of the file. Here's the above snippet once more, except we've closed the comment this time:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/* This is a comment
 * but I remembered to
 * close it. */
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. Since this message relates to a fatal
syntax error you cannot disable it.

#### ~~JSHint bug alert~~

**Fixed as of JSHint 1.0.0**. As you may have noticed if you have switched one
of the examples above to use a pre-1.0.0 version of JSHint instead of JSLint, a
large number of the same message appear to get generated for the first unclosed
comment, to the point where the parser gives up and tells you that there are too
many errors.

[es5-7.4]: http://es5.github.com/#x7.4
[jshintopts]: http://jshint.com/docs/#options
