<!---
{
    "titles": [
        "Bad escapement of EOL. Use option multistr if needed",
        "Multiline support is limited to browsers supporting ES5 only",
        "W043"
    ],
    "slugs": [
        "bad-escapement-of-eol-use-option-multistr-if-needed",
        "multiline-support-is-limited",
        "w043"
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

This warning has existed in various forms across the three main linters. It was
introduced in the original version of JSHint and has remained (in a way) in all
three tools from some point since.

 - In JSLint the warning given since August 2013 is "Unexpected '\\'"

 - In JSLint between May 2011 and August 2013 the message used was the more
   generic "This is an ES5 feature"

 - Before May 2011 this functionality was not supported in JSLint

 - In JSHint 1.0.0 and above the message is "Bad escaping of EOL. Use option
   multistr if needed"

 - In JSHint prior to version 1.0.0 the message was "Bad escapement of EOL. Use
   option multistr if needed"

 - In ESLint the message is "Multiline support is limited to browsers supporting
   ES5 only"

The situations that produce the warning have not changed despite changes to the
text of the warning itself.

### When do I get this error?

The "Bad escapement of EOL. Use option multistr if needed" error, and the
alternative "Multiline support is limited to browsers supporting ES5 only", is
thrown when JSHint or ESLint encounters **a multiline string**. JSHint will only
issue this warning if the `multistr` option is not set to `true`. In the
following example we attempt to assign a multiline string to the variable
`myString`:

<!---
{
    "linter": "jshint"
}
-->
```javascript
var myString = "Line 1 \
                Line 2";
```

### Why do I get this error?

This error is raised to highlight the use of **a newer language feature that
might not be supported** in all the environments in which your code should run.
In particular, various older browsers will be likely to throw syntax errors when
parsing your script.

The ECMAScript specification was updated to allow multiline strings in version 5
([ES5 &sect;7.8.4][es5-7.8.4]):

> A line terminator character cannot appear in a string literal, except as part
> of a *LineContinuation* to produce the empty character sequence. The correct
> way to cause a line terminator character to be part of the String value of a
> string literal is to use an escape sequence such as `\n` or `\u000A`.

If you're receiving this error in JSHint you can listen to the message and set
the `multistr` option to allow the use of multiline strings:

<!---
{
    "linter": "jshint"
}
-->
```javascript
/*jshint multistr: true */
var myString = "Line 1 \
                Line 2";
```

If you're using a version of JSLint from between May 2011 and August 2013 you
can avoid this warning by setting the `es5` option:

<!---
{
    "linter": "jslint",
    "version": "2013-05-31"
}
-->
```javascript
/*jslint es5: true */
var myString = "Line 1 \
                Line 2";
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W043**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W043 */` directive.

In ESLint the rule that generates this warning is named `no-multi-str`. You can
disable it by setting it to `0`, or enable it by setting it to `1`.

[es5-7.8.4]: http://es5.github.io/#x7.8.4

[jshintopts]: http://jshint.com/docs/#options
