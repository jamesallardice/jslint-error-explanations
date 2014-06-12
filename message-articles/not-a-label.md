<!---
{
    "titles": [
        "'{a}' is not a label",
        "'{a}' is not a statement label",
        "Undefined label '{a}'",
        "W090"
    ],
    "slugs": [
        "a-is-not-a-label",
        "a-is-not-a-statement-label",
        "undefined-label-a",
        "w090"
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

This warning has existed in three forms across the three main linters. It was
introduced in the original version of JSLint and has remained (in a way) in all
three tools ever since.

 - In JSLint the warning given is "'{a}' is not a label"

 - In JSHint the warning given has always been "'{a}' is not a statement label"

 - In ESLint the Esprima parser fails to parse the code so the message given
   matches the V8 engine error "Undefined label '{a}'"

The situations that produce the warning have not changed despite changes to the
text of the warning itself.

### When do I get this error?

The "'{a}' is not a label" error, and the alternatives "'{a}' is not a statement
label" and "Undefined label '{a}'", is thrown when JSLint, JSHint or ESLint
encounters **a `break` or `continue` statement referencing a label that does not
exist**. In the following example we try to break out of a `for` loop to the
non-existent `example` label:

<!---
{
    "linter": "jslint"
}
-->
```javascript
function demo() {
    "use strict";
    var i;
    for (i = 0; i < 10; i += 1) {
        if (i === 5) {
            break example;
        }
    }
}
```

### Why do I get this error?

This error is raised to highlight a **fatal JavaScript syntax error**. It is not
valid to reference an identifier that does not appear in the label set of the
enclosing statement. This is stated in the ECMAScript 5 specification ([section
&sect;12.7][es5-12.7] and [section &sect;12.8][es5-12.8]):

> A program is considered syntactically incorrect if...
>
> - ...
> - The program contains a `break` statement with the optional Identifier, where
> Identifier does not appear in the label set of an enclosing [statement]

In the snippet above, the `for` statement has not been explicitly labelled, and
therefore there is no label in its label set with the identifier example. When
the interpreter reaches the `break` statement a syntax error will be thrown.
This can be avoided by removing the identifier from the `break` statement:

<!---
{
    "linter": "jslint"
}
-->
```javascript
function demo() {
    "use strict";
    var i;
    for (i = 0; i < 10; i += 1) {
        if (i === 5) {
            break;
        }
    }
}
```

Or alternatively by adding a label with the correct identifer to the label set
of the `for` statement (although since November 2013 this will cause JSLint to
raise a different warning, because it is now of the opinion that label
statements should not be used at all):

<!---
{
    "linter": "jslint"
}
-->
```javascript
function demo() {
    "use strict";
    var i;
example:
    for (i = 0; i < 10; i += 1) {
        if (i === 5) {
            break example;
        }
    }
}
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W090**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W090 */` directive.

[es5-12.7]: http://es5.github.io/#x12.7
[es5-12.8]: http://es5.github.io/#x12.8
[jshintopts]: http://jshint.com/docs/#options
