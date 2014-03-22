<!---
{
    "titles": [
        "Unexpected sync method: '{a}'"
    ],
    "tools": [
        "jslint"
    ],
    "tags": [
        "async"
    ],
    "contributors": [
        "jallardice"
    ],
    "slugs": [
        "unexpected-sync-method-a"
    ]
}
-->

### When do I get this error?

JSLint will throw the "Unexpected sync method: '{a}'" error when it encounters **an attempt to access a property whose
identifier ends with the string `Sync`**. In the following example we attempt to get an array of file names within a
directory (this is a Node.js example, and this error will most commonly occur in Node.js code, but JSLint will raise it
regardless of the status of the `node` option):

```javascript
/*jslint node: true */
var fs = require("fs"),
    files = fs.readdirSync("myDirectory");
```

Note that although the error messages states "method", JSLint will actually raise this error for an attempt to access
any property that fits the criteria, whether it's a method call or not (it doesn't check to see if a pair of invoking
parentheses follow the identifier).

### Why do I get this error?

This error is raised to highlight a **lack of convention** and possible **bad practice**. Your code should run without
problems if you don't change it, but there are likely to be better ways to acheive the same result.

In Node.js in particular, there are many asynchronous methods that provide synchronous equivalents. For example, there
is a [`readdir` method](http://nodejs.org/api/fs.html#fs_fs_readdir_path_callback) that is the asynchronous version of
the [`readdirSync` method](http://nodejs.org/api/fs.html#fs_fs_readdirsync_path) in our example above.

In almost all situations it's preferrable to use the asynchronous method over the synchronous one. The reason is that
synchronous methods will block execution until they have finished doing whatever they need to do. In the browser this
can result in an apparently "frozen" page. To fix this issue, simply rework your code to use the asynchronous version of
the method:

```javascript
/*jslint node: true */
var fs = require("fs");

fs.readdir("myDirectory", function (err, files) {
    "use strict";
    if (!err) {
        files.forEach(function (file) {
            console.log(file);
        });
    }
});
```

Alternatively, if you have a real need to use synchronous methods, you can surpress this error by setting the `stupid`
option to `true`. You can tell by the name of the option how Douglas Crockford, author of JSLint, feels about this:

```javascript
/*jslint node: true, stupid: true */
var fs = require("fs"),
    files = fs.readdirSync("myDirectory");
```
