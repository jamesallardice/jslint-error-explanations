<!---
{
    "titles": [
        "eqeqeq"
    ],
    "slugs": [
        "option-jshint-eqeqeq"
    ],
    "linters": [
        "jshint"
    ],
    "author": "jallardice",
    "subject": "option"
}
-->

### What does this option do?

The JSHint `eqeqeq` option is used to prohibit the use of the equals operator
`==` and the does-not-equal operator `!=`. This enforces the use of the strict
equality operators (`===` and `!==` instead). The strict equality operators
differ from their non-strict counterparts by first comparing the type of each
operand, rather than attempting to coerce them to a common type. In the
following example we make use of the non-strict equality operator to check
whether a value is either `null` or `undefined`:

<!---
{
    "linter": "jshint"
}
-->
```javascript
/*jshint eqeqeq: true */
var x;
if (x == null) {
    // This will execute if x is null or undefined
    doSomething();
}
```

### When should I use this option?

The use of the `eqeqeq` JSHint option will cause an "Expected '===' and instead
saw '=='" error any time it encounters an equals or does-not-equal operator. As
demonstrated in the above example these operators can be used in some situations
to produce shorter code. However, their use can lead to bugs and unexpected
behaviour. For that reason it's generally considered best practice to use the
strict equality operators wherever possible. The example above can be written as
follows instead:

<!---
{
    "linter": "jshint"
}
-->
```javascript
/*jshint eqeqeq: true */
var x;
if (typeof x === "undefined" || x === null) {
    // This will execute if x is null or undefined
    doSomething();
}
```

Note that this is an *enforcing* option which means JSHint does not apply it by
default. If you do not explicitly set this option to `true` JSHint will allow
the use of non-strict equality operators anywhere in your code.

#### Recommendation

Set this option to `true` (enforces the use of strict equality operators).
