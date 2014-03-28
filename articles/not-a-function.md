<!---
{
    "titles": [
        "'{a}' is not a function",
        "W063"
    ],
    "slugs": [
        "a-is-not-a-function",
        "w063"
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

The "'{a}' is not a function" error is thrown when JSLint, JSHint or ESLint
encounters **an attempt to invoke the `Math` object as a function**. JSLint and
ESLint (but not JSHint) will also raise this warning when they encounter **an
attempt to invoke the `JSON` object as a function**. Here's an example:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var x = Math(),
    y = JSON();
```

### Why do I get this error?

This error is raised to highlight what is most likely a **misunderstanding of
the language**. The `Math` property of the global object is described in the
specification as follows ([ES5 &sect;15.8][es5-15.8]):

> The Math object does not have a [[Construct]] internal property; it is not
> possible to use the Math object as a constructor with the `new` operator.
>
> The Math object does not have a [[Call]] internal property; it is not possible
> to invoke the Math object as a function.

This makes it very clear that the Math object cannot be invoked in the way you
normally call a function or a constructor. Instead it is simply an object with a
set of properties, some of which are functions.

The specification makes the same note about the `JSON` object ([ES5
&sect;15.12][es5-15.12]):

> The JSON object does not have a [[Construct]] internal property; it is not
> possible to use the JSON object as a constructor with the `new` operator.
>
> The JSON object does not have a [[Call]] internal property; it is not possible
> to invoke the JSON object as a function.

Both `Math` and `JSON` objects expose a number of properties that can be
accessed in the normal way. If you're receiving this error the chances are you
intended to invoke one of the function properties instead of the object itself.
For example:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var x = Math.random(),
    y = JSON.stringify({});
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W063**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W063 */` directive.

In ESLint the rule that generates this warning is named `no-obj-calls`. You can
disable it by setting it to `0`, or enable it by setting it to `1`.

[es5-15.8]: http://es5.github.io/#x15.8
[es5-15.12]: http://es5.github.io/#x15.12
[jshintopts]: http://jshint.com/docs/#options
