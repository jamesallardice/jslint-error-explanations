<!---
{
    "titles": [
        "Missing radix parameter",
        "W065"
    ],
    "slugs": [
        "missing-radix-parameter",
        "w065"
    ],
    "linters": [
        "jslint",
        "jshint",
        "eslint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "Missing radix parameter" error is thrown when JSLint, JSHint or ESLint
encounters **a call to the `parseInt` function that only has one argument**. As
of JSHint 2.3.0 the warning will only be issued if the `es3` option is set to
`true`. Here's an example:

<!---
{
    "linter": "jslint"
}
-->
```javascript
parseInt("10");
```

### Why do I get this error?

This error is raised to highlight a **potential oversight that could lead to
problems**. The second argument of the `parseInt` function is used to specify a
radix. If no radix is specified, the function can return suprising results. If
the string begins with a `0` it will be interpreted as an octal (base 8) number.
For example, `parseInt("010")` will return `8`, and not `10`. This behaviour was
allowed by the ECMAScript 3 specification. However, here's what the ECMAScript 5
specification has to say ([ES5 &sect;15.1.2.2][es5-15.1.2.2]:

>  The `parseInt` function produces an integer value dictated by interpretation
>  of the contents of the string argument according to the specified radix.
>  Leading white space in string is ignored. If radix is undefined or 0, it is
>  assumed to be 10 except when the number begins with the character pairs `0x`
>  or `0X`, in which case a radix of 16 is assumed.

As of ECMAScript 5, this quirk of `parseInt` has been removed. However, since
it's likely you will want your code to run successfully in older environments
that do not support ES5, you should always pass a radix to `parseInt`:

<!---
{
    "linter": "jslint"
}
-->
```javascript
parseInt("10", 10);
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W065**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W065 */` directive.

[es5-15.1.2.2]: http://es5.github.io/#x15.1.2.2
[jshintopts]: http://jshint.com/docs/#options
