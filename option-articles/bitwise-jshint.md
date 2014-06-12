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

The JSHint `bitwise` option is used to disallow the usage of any bitwise
operators. In JavaScript the available bitwise operators are `<<` (bitwise left
shift), `>>` (bitwise right shift), `>>>` (unsigned bitwise right shift), `&`
(bitwise AND), `|` (bitwise OR) and `^` (bitwise XOR). In the following example
we are using the bitwise OR operator to round a number down to the closest
integer which is a relatively common shorthand trick:

<!---
{
    "linter": "jshint"
}
-->
```javascript
/*jshint bitwise: true */
var x = 1.2345 | 0;
```

### When should I use this option?

The use of the `bitwise` JSHint option will cause an "Unexpected use of '{a}'"
error, where "{a}" is a bitwise operator, any time a bitwise operator is used.
If you require the use of bitwise operators for actual program logic then you
cannot enable this option. However, if you do not need to use such operators and
want to prevent tricks such as the one shown above, enabling this option is a
good way to do so.

Note that this is an *enforcing* option which means JSHint does not apply it by
default. If you do not explicitly set this option to `true` JSHint will allow
the use of bitwise operators anywhere in your code.
