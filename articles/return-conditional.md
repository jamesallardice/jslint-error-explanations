<!---
{
    "titles": [
        "Did you mean to return a conditional instead of an assignment?",
        "Return statement should not contain assignment",
        "W093"
    ],
    "slugs": [
        "did-you-mean-to-return-a-conditional",
        "return-statement-should-not-contain-assignment",
        "w093"
    ],
    "linters": [
        "jshint",
        "eslint"
    ],
    "author": "jklein"
}
-->

### When do I get this error?

The "Did you mean to return a conditional instead of an assignment?" error, and
the alternative "Return statement should not contain assignment", is thrown when
JSHint or ESLint encounters a **return statement containing an assignment
expression**. In the following example we attempt to assign the result of an
operation to `result` and also return the result of that assignment:

<!---
{
    "linter": "jshint"
}
-->
```javascript
var result;
function multiply(a, b) {
    "use strict";
    return result = a * b;
}
```

Since May 2013 JSLint has used the more generic "[Unexpected assignment
expression][unexpass]" warning in the same situation.

### Why do I get this error?

This error is raised to highlight a **lack of convention**. Your code may run
fine if you do not fix this error, but it will be confusing to others,
especially at first glance to someone quickly searching through your script.

The above example works because the assignment expression, `result = a * b`,
returns the resultant value of `result`. Since in a `return` statement the
expression is evaluated and its result is returned from the function we end up
with the value we expect. You can resolve this error by splitting the logic out
into two distinct steps which makes the code much more readable:

<!---
{
    "linter": "jshint"
}
-->
```javascript
var result;
function multiply(a, b) {
    "use strict";
    result = a * b;
    return result;
}
```

If you didn't mean to return the result of an assignment and are receiving this
error then the chances are you actually wanted to return a boolean value. This
is why JSHint asks if you meant to return a conditional. If that's the case,
make sure the expression is conditional by using `===` instead of `=`:

<!---
{
    "linter": "jshint"
}
-->
```javascript
var result;
function multiply(a, b) {
    "use strict";
    return result === a * b;
}
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W093**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W093 */` directive.

In ESLint the rule that generates this warning is named `no-return-assign`. You
can disable it by setting it to `0`, or enable it by setting it to `1`.

[unexpass]: /unexpected-assignment-expression
[jshintopts]: http://jshint.com/docs/#options
