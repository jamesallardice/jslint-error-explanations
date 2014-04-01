<!---
{
    "titles": [
        "Unused '{a}'",
        "'{a}' is defined but never used",
        "W098"
    ],
    "slugs": [
        "unused-a",
        "a-is-defined-but-never-used",
        "w098"
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

 - In JSLint the warning given is "Unused '{a}'"

 - In JSHint and ESLint the message has always been "'{a}' is defined but never
   used"

### When do I get this error?

The "Unused '{a}'" error, and the alternative "'{a}' is defined but never used",
is thrown when JSLint, JSHint or ESLint encounters an **environment record
binding with an identifier that is not referenced aside from its declaration**.
In JSHint the warning is only raised if the `unused` option is set to `true`. In
the following example there are various unused identifiers:

<!---
{
    "linter": "jshint"
}
-->
```javascript
/*jshint unused: true */
function demo(a, b) {
    "use strict";
    var c;
}
```

### Why do I get this error?

This error is raised to highlight a **potentially useless code**. Your code will
run without error if you just ignore this warning, but it could be doing
unnecessary work and could be confusing to other developers exposed to your
code.

When you declare a variable or a function in JavaScript there is no obligation
to use it later on. Therefore, code such as the example above is perfectly valid
but also completely useless. If this warning relates to variables that are
simply defined and never used, you can simply remove those variable declarations
completely. However, sometimes you may declare variables in one file but use
them in another. If that's the case and you're using JSHint you can use the
`exported` directive to signify those variables:

<!---
{
    "linter": "jshint"
}
-->
```javascript
/*jshint unused: true */
/*exported demo */
function demo(a, b) {
    "use strict";
    var c;
}
```

#### A note about function arguments

The behaviour described above is not ideal when it comes to function parameters.
It's relatively common to have function arguments that are not referred to
within the function but are necessary in the function signature because
subsequent arguments *are* referred to. For example:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/*jshint unused: true, node: true */
/*jslint node: true */
var fs = require("fs");
fs.readdir("dir", function (err, files) {
    "use strict";
    console.log(files); // Ignoring any error in 'err'
});
```

In this example we don't care about the `err` argument so we don't refer to it.
JSLint still complains that the variable is unused. JSHint and ESLint are clever
enough to know that since `files` is used there is no need to warn about `err`
but in JSLint you'll have to set the `unparam` option to `true` to avoid a
warning in this situation:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/*jshint unused: true, node: true */
/*jslint unparam: true, node: true */
var fs = require("fs");
fs.readdir("dir", function (err, files) {
    "use strict";
    console.log(files); // Ignoring any error in 'err'
});
```

In JSHint 1.1.0 and above you are able to configure the behaviour around
function arguments. The `unused` option accepts a string rather than a boolean:

 - `vars` - Only warn about unused variable and function declarations. Don't
   warn about any function parameters.

 - `last-param` - Warn about unused variable and function declarations and the
   last parameter of functions. This is the default value if you set the option
   to `true`.

 - `strict` - Warn about unused variable and function declarations and all
   parameters of functions. This is the equivalent to the pre-1.1.0 and JSLint
   behaviour.

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W098**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W098 */` directive. You can also set the `sub` option to `true`.

In ESLint the rule that generates this warning is named `no-unused-vars`. You
can disable it by setting it to `0`, or enable it by setting it to `1`.

[es5-13]: http://es5.github.com/#x13
[jshintopts]: http://jshint.com/docs/#options
