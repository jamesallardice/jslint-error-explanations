<!---
{
    "titles": [
        "curly"
    ],
    "slugs": [
        "option-jshint-curly"
    ],
    "linters": [
        "jshint"
    ],
    "author": "jallardice",
    "subject": "option"
}
-->

### What does this option do?

The JSHint `curly` option is used to enforce the use of block statements
following the `if`, `for`, `while` and `do` statements. The language grammar
shows that these statements must be followed by another statement which is why
it's possible to omit the curly braces for single-statement bodies such as the
following:

<!---
{
    "linter": "jshint"
}
-->
```javascript
/*jshint curly: true */
while (x)
    y();
    z(); // This is not inside the loop
```

### When should I use this option?

The use of the `curly` JSHint option will cause an "Expected '{' and instead saw
'{b}'" error, where "{b}" is the statement following the statement in question,
any time it encounters a statement that doesn't match the rules discussed above.
As demonstrated in the above example the omission of curly braces can make it
easier to introduce bugs into the code. In general you should use curly braces
where possible and leave it up to your minification or build process to remove
them where necessary. Therefore it's usually sensible to enable this option
unless your coding guidelines ask for the shorter form.

Note that this is an *enforcing* option which means JSHint does not apply it by
default. If you do not explicitly set this option to `true` JSHint will allow
the use of bitwise operators anywhere in your code.

#### Recommendation

Set this option to `true` (enforces the use of curly braces).
