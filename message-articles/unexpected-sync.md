<!---
{
    "titles": [
        "Unexpected sync method: '{a}'"
    ],
    "slugs": [
        "unexpected-sync-method-a"
    ],
    "linters": [
        "jslint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "Unexpected sync method: '{a}'" error is thrown when JSLint (versions from
March 2012 onwards) encounters an attempt to **access a property whose
identifier ends with the character sequence `Sync`**. In the following Node.js
example we attempt to get an array containing the names of files within a
directory:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/*jslint node: true */
var fs = require("fs"),
    files = fs.readdirSync("myDirectory");
```

Note that although the error messages states "method", JSLint will actually
raise this error for an attempt to access any property that fits the criteria,
whether it's a method or not (it doesn't check to see if a pair of invoking
parentheses follow the identifier).

### Why do I get this error?

This error is raised to highlight a **lack of convention** and possible **bad
practice**. Your code should run without problems if you don't change it, but
it's likely there are better ways to acheive the same result.

In Node.js in particular, there are many asynchronous methods that provide
synchronous equivalents. For example, there is a [`readdir`][readdir] method
that is the asynchronous version of the [`readdirSync`][readdirsync] method in
our example above.

In almost all situations it's preferrable to use the asynchronous method over
the synchronous one. The reason is that synchronous methods will block execution
until they have finished doing whatever they need to do. In the browser this can
result in an apparently "frozen" page. To fix this issue, simply rework your
code to use the asynchronous version of the method:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/*jslint node: true */
var fs = require("fs");

fs.readdir("myDirectory", function (err, files) {
    "use strict";
    if (!err) {
        console.log(files);
    }
});
```

Alternatively, if you have a real need to use synchronous methods, you can
surpress this error by setting the `stupid` option to `true`. You can tell by
the name of the option how Douglas Crockford, author of JSLint, feels about
this:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/*jslint node: true, stupid: true */
var fs = require("fs"),
    files = fs.readdirSync("myDirectory");
```

[readdir]: http://nodejs.org/api/fs.html#fs_fs_readdir_path_callback
