<!---
{
    "titles": [
        "Nested comment"
    ],
    "slugs": [
        "nested-comment"
    ],
    "linters": [
        "jslint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "Nested comment" error is thrown when JSLint encounters **the character sequence `/*` inside a multiline comment**. Here's an example:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/* This is a multiline comment.
   /* It's valid JavaScript,
   but JSLint doesn't like it */
```

### Why do I get this error?

This error is raised to highlight a **potentially dangerous piece of code**.
While it is valid to include the `/*` sequence in a multiline comment, it is not
valid to include `*/`. If you were to do so, everything following the first `*/`
would be parsed as if it is not part of the comment. Here's an example (notice
the syntax highlighting which demonstrates the error):

<!---
{
    "linter": "jslint"
}
-->
```javascript
/* This is a multiline comment.
   /* It's valid JavaScript, */
   but JSLint doesn't like it */
```

You can resolve this issue by simply removing `/*` character sequences from multiline comments:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/* This is a multiline comment.
   It's valid JavaScript,
   but JSLint doesn't like it */
```
