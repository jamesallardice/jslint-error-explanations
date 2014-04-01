<!---
{
    "titles": [
        "ES5 option is now set per default",
        "I003"
    ],
    "slugs": [
        "es5-option-is-now-set-per-default",
        "i003"
    ],
    "linters": [
        "jshint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "ES5 option is now set per default" error is thrown when JSHint (version
2.0.0 and above only) encounters **the `es5` option with a value of `true`**.
Here's an example in which we set the `es5` option so we can use reserved words
as property identifers (which was not allowed in ES3):

<!---
{
    "linter": "jshint"
}
-->
```javascript
/*jshint es5: true */
var x = {
    default: 10
};
```

### Why do I get this error?

This error is raised to highlight a **pointless piece of code*. If you're using
JSHint 2.0.0 or above, the `es5` option will be set to `true` by default, due to
the fact that environments supporting the ES5 spec are now far more widespread.

You can simply remove the option from any JSHint directives or `.jshintrc`
files. Select JSHint version 1.1.0 or below in the following example to see the
difference from when the `es5` option was not on by default:

<!---
{
    "linter": "jshint"
}
-->
```javascript
var x = {
    default: 10
};
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. Since this is an informational JSHint
message, it cannot be disabled.

[jshintopts]: http://jshint.com/docs/#options
