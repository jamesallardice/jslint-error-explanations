<!---
{
    "titles": [
        "latedef"
    ],
    "slugs": [
        "option-jshint-latedef"
    ],
    "linters": [
        "jshint"
    ],
    "author": "jallardice",
    "subject": "option"
}
-->

### What does this option do?

The JSHint `latedef` option is used to ensure variables and functions are
declared before they are used. That is to say, the declarations appear
physically in the source code above references to those declared variables or
functions. Because declarations in JavaScript are hoisted to the top of the
scope in which they occur it is perfectly safe to reference them earlier.

In the following example the `doStuff` function declaration is hoisted to the
top of the global scope so it is accessible throughout the program regardless of
its position in the source:

<!---
{
    "linter": "jshint"
}
-->
```javascript
/*jshint latedef: true */
doStuff();
function doStuff() {}
```

### When should I use this option?

The use of the `latedef` JSHint option will cause a "['{a}' was used before it
was defined][latedef]" error any time it encounters a reference to an identifier
that has not yet been declared. By declaring variables and functions before you
need to refer to them you can make your code easier to read through, since most
people will read it from top to bottom. If a function is declared at the bottom
of a file but used throughout the reader will have to scroll around to find the
definition rather than immediately seeing it at the top.

<!---
{
    "linter": "jshint"
}
-->
```javascript
/*jshint immed: true */
function doStuff() {}
doStuff();
```

Note that this is an *enforcing* option which means JSHint does not apply it by
default. If you do not explicitly set this option to `true` JSHint will allow
references to appear before declarations.

#### Recommendation

Set this option to `true` (ensures declarations appear before references).

[latedef]: /a-was-used-before-it-was-defined
