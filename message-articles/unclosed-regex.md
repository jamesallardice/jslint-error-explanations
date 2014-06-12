<!---
{
    "titles": [
        "Unclosed regular expression",
        "E015"
    ],
    "slugs": [
        "unclosed-regular-expression",
        "e015"
    ],
    "linters": [
        "jslint",
        "jshint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "Unclosed regular expression" error is thrown when JSLint or JSHint encounters **a regular expression literal with no closing `/` character**. Here's an example:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var regex = /^unclosed$;
```

### Why do I get this error?

This error is raised to highlight a **fatal JavaScript syntax error**. Your code
will not run unless you fix this issue. The ECMAScript 5 specification lists the
following grammar for regular expression literals ([ES5
&sect;7.8.5][es5-7.8.5]):

> *RegularExpressionLiteral* ::<br>
> &nbsp;&nbsp;&nbsp;&nbsp;`/` *RegularExpressionBody* `/`
> *RegularExpressionFlags*

This production makes it clear that regular expression literal bodies must be
terminated by a `/` character. Not doing so will always cause a syntax error. To
fix this issue, simply close the regular expression in question:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var regex = /^closed$/;
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. Since this message relates to a fatal
syntax error you cannot disable it.

[es5-7.8.5]: http://es5.github.com/#x7.8.5
[jshintopts]: http://jshint.com/docs/#options
