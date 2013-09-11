<!---
{
    "titles": [
        "Unexpected label '{a}'",
        "Label '{a}' on {b} statement",
        "W028"
    ],
    "tools": [
        "jslint",
        "jshint"
    ],
    "tags": [
        "labelled-statement"
    ],
    "contributors": [
        "jallardice"
    ],
    "slugs": [
        "unexpected-label-a",
        "label-a-on-b-statement",
        "w028"
    ]
}
-->

### When do I get this error?

The "Unexpected label '{a}'" error (and the alternative "Label '{a}' on {b} statement" error) are thrown when JSLint or
JSHint encounters **a labelled statement whose statement is not an iteration or switch statement**, or, in the case of
JSLint, **a labelled statement in the global execution context**. The following example contains a labelled `var`
statement:

```javascript
function test() {
    "use strict";

labelled: //Label for the following var statement
    var x = 10;

}
```

### Why do I get this error?

This error occurs in two different situations. Both require their own explanation.

#### A labelled statement whose statement is not an iteration or switch statement

The error is raised in this situation because JSLint or JSHint has detected **a completely useless and potentially
confusing piece of code**. According to the ECMAScript standard, any statement can be labelled. However, since the
language does not define a `goto` statement, labelled statements are only useful in conjunction with the `break` and
`continue` statements, in the context of a loop or a switch.

The specification sums this up in [section &sect;12.12](http://es5.github.com/#x12.12):

> A *Statement* may be prefixed by a label. Labelled statements are only used in conjunction with labelled `break` and
> `continue` statements. ECMAScript has no `goto` statement.

Therefore, there is no reason at all to use a label unless it's labelling a `for`, `while`, `do` or `switch` statement.

#### A labelled statement in the global execution context

The error is raised in this situation because JSLint has detected **a potentially confusing or dangerious piece of
code**. The same rules of the language (as detailed in the previous section) apply when the labelled statement occurs in
the global execution context, but JSLint behaves slightly differently.

JSLint disallows the use of any labelled statements in the global execution context, whether they are iteration/switch
statements or not. This is in contrast to the behaviour inside a function context, where labelled iteration and switch
statements *are* allowed. The reasoning behind this is unclear, but it's probably simply because in languages that
support a `goto` statement, labels in this sort of global scope would be very dangerous.

Since there is no way to refer to a label apart from inside an iteration or switch statement with the `break` or
`continue` statement, and since every statement has its own label set, there is no way for a label in the global scope
to interfere with other code (you cannot for example overwrite a label defined elsewhere in the scope by defining one
with the same identifier).

For more detail, see this [Stack Overflow question](http://stackoverflow.com/questions/11530485/whats-wrong-with-using-a
-labelled-statement-in-global-code). Note that JSHint does not follow the behaviour of JSLint in this case.
