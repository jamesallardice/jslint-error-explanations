<!---
{
    "titles": [
        "Unexpected 'with'",
        "Don't use 'with'",
        "Expected an identifier and instead saw 'with'",
        "Unexpected use of 'with' statement",
        "W085"
    ],
    "slugs": [
        "unexpected-with",
        "dont-use-with",
        "expected-an-identifier-and-instead-saw-with",
        "unexpected-use-of-with-statement",
        "w085"
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

This warning has existed in two forms in JSLint, JSHint and ESLint. It was
introduced in the original version of JSLint and has remained in all three
linters ever since.

 - In JSLint versions dated July 2013 and later the warning given is "Unexpected
   'with'"

 - In JSLint versions from before July 2013 the message used is "Expected an
   identifier and instead saw 'with'"

 - In JSHint the message has always been "Don't use 'with'"

 - In ESLint the message has always been "Unexpected use of 'with' statement"

The situations that produce the warning have not changed despite changes to the
text of the warning itself.

### When do I get this error?

The "Unexpected 'with'" error, and the alternatives "Don't use 'with'" and
"Unexpected use of 'with' statement", is thrown when JSLint, JSHint or ESLint
encounters **the `with` statement in code that is not running in strict mode**.
Here's an example:

<!---
{
    "linter": "jshint"
}
-->
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

This error is raised to highlight a **lack of convention** and the use of a
**bad practice**. Your code may work as expected but you're doing something that
is not encouraged and could break in the future.

The with statement was designed to make it easier to access deeply nested object
properties. In the example above, we don't have to write `a.b` inside the `with`
statement, since the body of the statement is executed with an **augmented
lexical environment** that causes the reference to `b` to refer to a property of
`a`.

In the example above, we attempt to set two properties of `a` inside the `with`
statement. But `a` doesn't have a property with the identifier `c`. So instead
of it being created, we are actually referring to the `c` in the parent scope
and accidentally change its value.

This is the main reason the use of `with` is discouraged; it introduces
potential ambiguity around every identifier reference. For more details you may
be interested in [the article][dc] Douglas Crockford has written on the matter.

In fact, if your code is running in strict mode, any use of it will cause a
syntax error (see the article regarding the related "['with' is not allowed in
strict mode][withstrict]" message for more information). There are much better
ways to achieve the same thing:

<!---
{
    "linter": "jshint"
}
-->
```javascript
function example() {
    var a = {
        b: 10
    };
    a.b = 30;
    a.c = 40;
}
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W085**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W085 */` directive.

[withstrict]: /with-is-not-allowed-in-strict-mode
[dc]: http://yuiblog.com/blog/2006/04/11/with-statement-considered-harmful/
[jshintopts]: http://jshint.com/docs/#options
