<!---
{
    "titles": [
        "Unexpected comment"
    ],
    "slugs": [
        "unexpected-comment"
    ],
    "linters": [
        "jslint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "Unexpected comment" error is thrown when JSLint encounters a single-line or
multi-line **comment in a JSON string**. It will only generate this error when
in JSON mode (it enters JSON mode when the first character of the input is
either `{` or `[`). In the following example we attempt to comment one of our
JSON properties:

<!---
{
    "linter": "jslint"
}
-->
```javascript
{
    "name": "James", // My first name
    "age": 24
}
```

### Why do I get this error?

This error is raised to highlight a **fatal syntax error**. The [JSON
specification][json] does not provide any mechanism for comments. Attempting to
deserialize the above example (using `JSON.parse` for example) will throw a
syntax error. To solve this issue, simply remove any comments from your JSON:

<!---
{
    "linter": "jslint"
}
-->
```javascript
{
    "name": "James",
    "age": 24
}
```

[json]: http://json.org/
