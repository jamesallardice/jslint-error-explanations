<!---
{
    "titles": [
        "bitwise"
    ],
    "slugs": [
        "option-jshint-bitwise"
    ],
    "linters": [
        "jshint"
    ],
    "author": "jallardice",
    "subject": "option"
}
-->

### What does this option do?

The JSHint `bitwise` option is used to disallow the usage of any bitwise operators.

<!---
{
    "linter": "jshint"
}
-->
```javascript
/*jshint bitwise: true */
var x = 1 & 2;
```

### What error messages can it cause or prevent?
