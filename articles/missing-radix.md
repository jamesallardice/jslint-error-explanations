<!---
{
    "titles": [
        "Missing radix parameter",
        "W065"
    ],
    "tools": [
        "jslint",
        "jshint"
    ],
    "author": "jallardice",
    "slugs": [
        "missing-radix-parameter",
        "w065"
    ]
}
-->

### When do I get this error?

JSLint and JSHint will throw the "Missing radix parameter" error when they encounter **a call to the `parseInt` function
that only has one argument**. Here's an example:

```
var x = parseInt("10");
```

### Why do I get this error?

This error is raised to highlight a **potential oversight that could lead to problems**. The second argument of the
`parseInt` function is used to specify a radix. If no radix is specified, the function can return suprising results.

If no radix is specified and the string begins with a `0`, the string will be interpreted as an octal (base 8) number.
For example, `parseInt("010");` will return `8`, and not `10`. This behaviour was allowed by the ECMAScript 3
specification. However, here's what the ECMAScript 5 specification has to say:

> The `parseInt` function produces an integer value dictated by interpretation of the contents of the *string* argument
> according to the specified *radix*. Leading white space in string is ignored. If *radix* is undefined or 0, it is
> assumed to be 10 except when the number begins with the character pairs `0x` or `0X`, in which case a radix of 16 is
> assumed.

As of ECMAScript 5, this quirk of `parseInt` has been removed. However, since it's likely you will want your code to run
successfully in older environments that do not support ES5, you should always pass a radix to `parseInt`.

### An small oversight in JSLint and JSHint

Note that neither JSLint nor JSHint make an attempt to check the type of the second argument. They only check that there
is one. Therefore, the following snippet does not generate an error, even though it behaves as if you didn't pass in a
radix at all. This is unlikely to cause many problems in the real world, but it's just something to be wary of:

```javascript
var x = parseInt("10", null);
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a [special option
syntax](http://jshint.com/docs/#options). The identifier of this warning is **W065** This means you can tell JSHint to
not issue this warning with the `/*jshint -W065 */` directive.
