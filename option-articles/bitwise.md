<!---
{
    "titles": [
        "bitwise"
    ],
    "slugs": [
        "option-bitwise"
    ],
    "linters": [
        "jslint",
        "jshint"
    ],
    "author": "jallardice",
    "subject": "option"
}
-->

### What does this option do?

In JSLint the `bitwise` option is used to allow the usage of any bitwise
operators. In JavaScript the available bitwise operators are `<<` (bitwise left
shift), `>>` (bitwise right shift), `>>>` (unsigned bitwise right shift), `&`
(bitwise AND), `|` (bitwise OR), `^` (bitwise XOR) and `~` (bitwise NOT). In the
following example we are using the bitwise OR operator to round a number down to
the closest integer which is a relatively common shorthand trick:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/*jslint bitwise: true */
var x = 1.2345 | 0;
```

The JSHint `bitwise` option is used to **disallow** the use of those operators.
Here's the same example again:

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

With JSLint, if the `bitwise` option is not set, you'll get an "Unexpected
'{a}'" error, where "{a}" is a bitwise operator, any time a bitwise operator is
used. In JSHint the opposite is true and you'll receive an "Unexpected use of
'{a}'" error for each bitwise operator occurence when the option is set.

If you require the use of bitwise operators for actual program logic then you
cannot enable this option. However, if you do not need to use such operators and
want to prevent tricks such as the one shown above, enabling this option is a
good way to do so.

Note that in JSHint this is an *enforcing* option which means JSHint does not
apply it by default. If you do not explicitly set this option to `true` JSHint
will allow the use of bitwise operators anywhere in your code.

#### Recommendation

 - **JSLint** - Set this option to `true` (you will be able to use bitwise
   operators).

 - **JSHint** - Do not set this option (you will be able to use bitwise
   operators).
