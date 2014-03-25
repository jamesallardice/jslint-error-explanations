<!---
{
    "titles": [
        "{a} is a statement label",
        "Found identifier with the same name as label",
        "W037"
    ],
    "slugs": [
        "a-is-a-statement-label",
        "found-identifier-with-the-same-name-as-label",
        "w037"
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

This warning has existed in two forms across the three main linters. It was
introduced in the original version of JSLint and has remained in all three tools
ever since.

 - In all versions of JSLint and JSHint the warning given is *"{a} is a
   statement label"*

 - In ESLint the warning given is *"Found identifier with the same name as
   label"*

The situations that produce the warning have not changed despite changes to the
text of the warning itself.

### When do I get this error?

The "{a} is a statement label" error (and the alternative "Found identifier with
the same name as label" error) are thrown when JSLint, JSHint or ESLint
encounters **a reference that shares an identifier with a label defined in the
same scope**. In the following example there is a variable declared in the
global execution context with the identifier `x`. Inside the `test` function,
there is a `for` statement with a label that also has the identifier `x`. JSLint
and JSHint throw this error when we attempt to refer to the `x` variable:

<!---
{
    "linter": "jslint",
    "eslint": {
        "no-label-var": 1
    }
}
-->
```javascript
var x = 0; // Variable with identifier 'x'

function test(i) {

    "use strict";

x: // Label with identifier 'x'
    while (i) {
        i -= 1;
        x = i; // Reference to variable 'x'
        if (i === 5) {
            break x; // Reference to label 'x'
        }
    }
}

test(10);
```

ESLint raises its equivalent "Found identifier with the same name as label"
error a little more readily. All it needs to find is a variable and label with
the same identifier:

<!---
{
    "linter": "eslint",
    "eslint": {
        "no-label-var": 1
    }
}
-->
```javascript
var x = 0;
x:
for (; x < 10; x++);
```

### Why do I get this error?

This error is raised to help improve the readability of your code. It may be
confusing to others (and to you, if you revisit your code some time in the
future) to have various references using the same identifier but to refer to
completely different things.

However, the code in the example above is valid and will not cause problems in
any environment. Read on if you would like to understand the actual behaviour of
the code.

The ECMAScript 5 specification states the following ([section
§12.12][es5-12.12]):

> The production *Identifier* : *Statement* is evaluated by adding *Identifier*
> to the label set of *Statement* and then evaluating *Statement*.

Every statement has a label set (it's empty by default for most statements,
except loops and switch statements which have an implicit label so you can break
out of them). When you give a statement a label, the identifier of that label is
added to the label set. The label set is completely separate from the variable
environment of the scope, so there is no potential for naming conflicts between
label identifiers and variable identifiers. Therefore, this error is designed
purely to make your code clearer and easier to follow.

You can prevent it by simply using different identifiers for labels and
variables:

<!---
{
    "linter": "eslint",
    "eslint": {
        "no-label-var": 1
    }
}
-->
```javascript
var x = 0;
y:
for (; x < 10; x++);
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this
warning is **W037**. This means you can tell JSHint to not issue this warning
with the `/*jshint -W037 */` directive.

In ESLint the rule that generates this warning is named `no-label-var`. You can
disable it by setting it to `0`, or enable it by setting it to `1`.

[jshintopts]: http://jshint.com/docs/#options
[es5-12.12]: http://es5.github.com/#x12.12
