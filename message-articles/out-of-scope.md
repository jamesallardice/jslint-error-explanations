<!---
{
    "titles": [
        "{a} used out of scope",
        "{a} used outside of binding context",
        "W038"
    ],
    "slugs": [
        "a-used-out-of-scope",
        "a-used-outside-of-binding-context",
        "w038"
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

 - In all versions of JSLint and JSHint the warning given is *"{a} used out of
   scope"*

 - In ESLint the warning given is *"{a} used outside of binding context"*

The situations that produce the warning have not changed despite changes to the
text of the warning itself.

### When do I get this error?

The "{a} used out of scope" error (and the alternative "{a} used outside of
binding context" error) are thrown when JSLint, JSHint or ESLint encounters **a
reference to a variable declared in an inner block**. In the following example
we declare the variable `x` in the body of an `if` statement and then attempt to
return it from the enclosing function:

<!---
{
    "linter": "jslint",
    "eslint": {
        "block-scoped-var": 1
    }
}
-->
```javascript
function test(a) {
    "use strict";
    if (a) {
        var x = 1;
    }
    return x;
}
```

### Why do I get this error?

This error is raised to highlight a possible **misunderstanding of the
language**. Your code will most likely work as expected if you do not resolve
this issue, but you may have misunderstood how JavaScript handles variable
declarations.

However, the code in the example above is valid and will not cause problems in
any environment. Read on if you would like to understand the actual behaviour of
the code.

All declarations are hoisted to the top of the scope in which they appear.
Variables in JavaScript have function scope, not block scope. In many other
languages, the variable `x` in the above example would be scoped to the `if`
statement body and would not be accessible to the containing scope. In
JavaScript, this is not the case and the variable is actually accessible in the
containing scope, although it won't have a value until the assignment statement
is executed.

To avoid this warning you should declare variables in the outermost appropriate
block. In our example the outermost block in which the `x` variable is
referenced is the function body so we should declare it there. Notice that the
assignment still occurs within the `if` statement body but by moving the
declaration up to the top of the function body our code more closely represents
the way the JavaScript engine will interpret it:

<!---
{
    "linter": "jslint",
    "eslint": {
        "block-scoped-var": 1
    }
}
-->
```javascript
function test(a) {
    "use strict";
    var x;
    if (a) {
        x = 1;
    }
    return x;
}
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this
warning is **W038**. This means you can tell JSHint to not issue this warning
with the `/*jshint -W038 */` directive.

In ESLint the rule that generates this warning is named `block-scoped-var`. You
can disable it by setting it to `0`, or enable it by setting it to `1`.

[jshintopts]: http://jshint.com/docs/#options
[es5-12.12]: http://es5.github.com/#x12.12
