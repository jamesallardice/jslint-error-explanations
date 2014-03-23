<!---
{
    "titles": [
        "'with' is not allowed in strict mode",
        "E010"
    ],
    "tools": [
        "jshint"
    ],
    "author": "jallardice",
    "slugs": [
        "with-is-not-allowed-in-strict-mode",
        "e010"
    ]
}
-->

### When do I get this error?

JSHint will throw the "'with' is not allowed in strict mode" error when it encounters **a `with` statement inside code
running in strict mode**. In the following example we attempt to use a `with` statement inside a function that contains
a strict mode directive:

```javascript
function example() {
    "use strict";
    var a = {
        b: 10
    };
    with (a) {
        b = 20;
    }
}
```

### Why do I get this error?

This error is raised to highlight a **JavaScript syntax error**. Your code will fail if you do not resolve this issue.
The ECMAScript 5 specification clearly states that the presence of a `with` statement within strict mode code is illegal
([ES5 &sect;12.10.1](http://es5.github.com/#x12.10.1)):

> Strict mode code may not include a *WithStatement*. The occurrence of a *WithStatement* in such a context is treated
> as a SyntaxError.

You can solve this problem by reworking code that uses `with` statements to fully qualify the "namespace". The following
example will behave in exactly the same way as the first example above:

```javascript
function example() {
    "use strict";
    var a = {
        b: 10
    };
    a.b = 20;
}
```

If you rely upon the behaviour of the `with` statement for a valid use-case, your only option is to ensure your code
does not run in strict mode. This results in a different message from JSHint, but one that can be surpressed (in version
1.0.0 and above) with the appropriate warning identifier flag:

```javascript
function example() {
    var a = {
        b: 10
    };
    with (a) {
        b = 20;
    }
}
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax](http://jshint.com/docs/#options). Since this message relates to a fatal syntax error you cannot
disable it.
