<!---
{
    "titles": [
        "Don't use 'with'",
        "Expected an identifier and instead saw 'with'",
        "Unexpected 'with'",
        "W085"
    ],
    "tools": [
        "jslint",
        "jshint"
    ],
    "tags": [
        "with-statement"
    ],
    "contributors": [
        "jallardice"
    ],
    "slugs": [
        "dont-use-with",
        "expected-an-identifier-and-instead-saw-with",
        "unexpected-with",
        "w085"
    ]
}
-->

### History

In JSLint this message started life as "Expected an identifier and instead saw 'with'". In July 2013 JSLint changed the
message to "Unexpected 'with'". In JSHint, the message has always been "Don't use 'with'". All three messages are
produced under the same situations.

### When do I get this error?

The "Don't use 'with'" error (and the alternative "Unexpected 'with'" and "Expected an identifier and instead saw
'with'" errors) are thrown when JSLint/JSHint encounters **any use of the `with` statement**. The following example
makes use of `with` to make property access shorter to type:

```javascript
function example() {
    var a = {
            b: 10
        },
        c = 20;
    with (a) {
        b = 30;
        c = 40;
    }
}
```

### Why do I get this error?

The `with` statement was designed to make it easier to access deeply nested object properties. In the example above, we
don't have to write `a.b` inside the `with` statement, since the body of the statement is executed with an *augmented
lexical environment* that causes the reference to `b` to refer to a property of `a`.

In the example above, we attempt to set two properties of `a` inside the `with` statement. But `a` doesn't have a
property with the identifier `c`. So instead of it being created, we are actually referring to the `c` in the parent
scope and accidentally change its value.

This is the main reason the use of `with` is discouraged. In fact, if your code is running in strict mode, any use of it
will cause a syntax error (see the article regarding the related JSHint
"['with' is not allowed in strict mode](http://jslinterrors.com/with-is-not-allowed-in-strict-mode)" message for more
information). There are much better ways to achieve the same thing:

```javascript
function example() {
    "use strict";
    var a = {
        b: 10
    };
    a.b = 30;
    a.c = 40;
}
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax](http://jshint.com/docs/#options). The identifier of this warning is **W085**. This means you
can tell JSHint to not issue this warning with the `/*jshint -W085 */` directive.
