<!---
{
    "titles": [
        "Unexpected TODO comment"
    ],
    "slugs": [
        "unexpected-todo-comment"
    ],
    "linters": [
        "jslint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "Unexpected TODO comment" error is thrown when JSLint encounters an attempt
to **a comment in which the first word is `TODO`**. The regular expression used by JSLint to determine whether a comment is a "todo" comment or not is `/^\W*to\s*do(?:\W|$)/i`.  Here's a few examples:

<!---
{
    "linter": "jslint"
}
-->
```javascript
// TODO: Finish writing about JSLint errors
// todo
// to do
// ... to do
```

### Why do I get this error?

This error is raised to highlight a **lack of convention**. Comments that start
with the word `TODO` are commonly used to mark unfinished parts of code. JSLint
takes the safe approach and assumes that your code is not production-ready if it
contains such comments. If you are happy with "todo" comments being in your
code, you can pass the `todo` option to JSLint to tell it to ignore them:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/*jslint todo: true */

// TODO: Finish writing about JSLint errors
// todo
// to do
// ... to do
```
