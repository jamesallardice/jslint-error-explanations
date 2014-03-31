<!---
{
    "titles": [
        "Option 'validthis' can't be used in a global scope",
        "E009"
    ],
    "slugs": [
        "option-validthis-cant-be-used-in-a-global-scope",
        "e009"
    ],
    "linters": [
        "jshint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "Option 'validthis' can't be used in a global scope" error is thrown when
JSHint encounters **the `validthis` option in a global scope**.  Here's a silly
example in which we declare a function that is intended to be invoked in the
context of an object:

<!---
{
    "linter": "jshint"
}
-->
```javascript
/*jshint validthis: true */
function example() {
    "use strict";
    this.x = 10;
}

var obj = {};
example.call(obj);
```

### Why do I get this error?

This error is raised to highlight a **breach of JSHint rules**. Your code will
most likely run without error if you do not fix this issue, but you are breaking
the rules of JSHint and will be unable to validate the rest of your code.

The `validthis` option is used to indicate to JSHint that a function including
the use of this is not going to violate the rules of strict mode. Since this
applies only to functions, it makes no sense to define this option in the global
scope. You should only use it (in function scope) when you are certain the
function will be called with a context. Here's what the [JSHint docs][validthis]
have to say:

> This option suppresses warnings about possible strict violations when the code
> is running in strict mode and you use `this` in a non-constructor function.
> You should use this option—in a function scope only—when you are positive that
> your use of `this` is valid in the strict mode (for example, if you call your
> function using `Function.call`).
>
> **Note**: This option can be used only inside of a function scope. JSHint will
> fail with an error if you will try to set this option globally.

To resolve this issue, you simply need to move the directive including the
`validthis` option into the function. You will need it in each function that
runs in strict mode and contains references to `this`:

<!---
{
    "linter": "jshint"
}
-->
```javascript
function example() {
    /*jshint validthis: true */
    "use strict";
    this.x = 10;
}

var obj = {};
example.call(obj);
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. Since this message relates to JSHint error
rather than a warning it is not possible to disable it.

[validthis]: http://jshint.com/docs/options/#validthis
[jshintopts]: http://jshint.com/docs/#options
