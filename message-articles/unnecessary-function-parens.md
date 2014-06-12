<!---
{
    "titles": [
        "Do not wrap function literals in parens unless they are to be immediately invoked",
        "Wrapping non-IIFE function literals in parens is unnecessary",
        "W068"
    ],
    "slugs": [
        "do-not-wrap-function-literals-in-parens",
        "wrapping-non-iife-functions-in-parens-is-unnecessary",
        "w068"
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
introduced in a very early version of JSLint and has remained in all three tools
ever since.

 - In JSLint and JSHint prior to version 1.0.0 the warning given is *"Do not
   wrap function literals in parens unless they are to be immediately invoked"*

 - In JSHint since 1.0.0 the warning given is *"Wrapping non-IIFE function
   literals in parens is unnecessary."*

 - In ESLint the warning has always been *"Wrapping non-IIFE function literals
   in parens is unnecessary."*

The situations that produce the warning have not changed despite changes to the
text of the warning itself. If you have not come across the acronym "IIFE"
before, you may be interested in [Ben Alman's article][iife] on the subject, in
which he coins the term to stand for "Immediately Invoked Function Expression".

### When do I get this error?

The "Do not wrap function literals in parens unless they are to be immediately
invoked" error (and the alternative "Wrapping non-IIFE function literals in
parens is unnecessary" error) are thrown when JSLint, JSHint or ESLint
encounters **a function expression wrapped in parentheses with no following
invoking parentheses**. JSHint will throw this error in the same situation, but
only if the `immed` option is set to `true`. In the following example we assign
a function expression to a variable `x`:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/*jshint immed: true */
var x = (function () {
    "use strict";
    return 10;
});
```

### Why do I get this error?

This error is raised to highlight a **potentially confusing piece of code**. It
is common in JavaScript to see immediately invoked function expressions. Here's
the above snippet again, this time with the invoking parentheses. Notice how
subtle the difference is:

<!---
{
    "linter": "jslint"
}
-->
```js
var x = (function () {
    "use strict";
    return 10;
}());
```

While the difference may not look like much, the two snippets are completely
different in their behaviour. The first example (which does not pass JSLint)
will result in a function expression assigned to `x`. The second snippet will
result in the *return value* of that function assigned to `x`.

When you see a function expression wrapped in parentheses, you would usually
expect it to be an immediately invoked function expression. When it isn't, there
is greater potential for confusion and misunderstanding of your code.

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W068**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W068 */` directive.

In ESLint the rule that generates this warning is named `no-wrap-func`. You can
disable it by setting it to `0`, or enable it by setting it to `1`.

[iife]: http://benalman.com/news/2010/11/immediately-invoked-function-expression
[jshintopts]: http://jshint.com/docs/#options
