<!---
{
    "titles": [
        "Unexpected comment"
    ],
    "tools": [
        "jslint"
    ],
    "author": "jallardice",
    "slugs": [
        "unexpected-comment"
    ]
}
-->

### When do I get this error?

JSLint will throw the "Unexpected comment" error when it encounters a **single or multiline comment in a JSON file**. It will only generate this error when in JSON mode (it enters JSON mode when the first character of the input is either `{` or `[`). In the following example we attempt to comment one of our JSON properties:

```javascript
{
    "name": "James", // My first name
    "age": 23
}
```

### Why do I get this error?

This error is raised to highlight a **fatal syntax error** The [JSON specification](http://json.org/) does not provide any mechanism for comments. Attempting to deserialize the above example (using `JSON.parse` for example) will throw a syntax error. To solve this issue, simply remove any comments from your JSON:

```javascript
{
    "name": "James",
    "age": 23
}
```
