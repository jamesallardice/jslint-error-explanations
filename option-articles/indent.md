<!---
{
    "titles": [
        "indent"
    ],
    "slugs": [
        "option-indent"
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

In JSLint and JSHint the `indent` option is used to enforce a specific tab width
in your code. Both tools make their own assumptions about when indentation
should occur but are largely identical in this regard. In the following example
we specify an indentation width of 4 spaces. Both tools expect the body of an
`if` statement to be indented so both will warn if the identation is not of the
required width:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/*jslint indent: 4 */
function doSomething(x) {
    "use strict";
    if (x) {
      return;
    }
}
```

### When should I use this option?

With JSLint you'll get an "Expected '{a}' at column {b}, not column {c}" error
any time an incorrect indentation width is found. In JSHint you'll get an
"Expected '{a}' to have an indentation at {b} instead at {c}" error under the
same circumstances. By enabling the validation of indentation you can ensure it
remains consistent throughout your code which will make it much easier to read.
Common values for this option are `4` and `2` but the exact number depends on
your personal preference and existing conventions.

Note that in JSHint this is an *enforcing* option which means JSHint does not
apply it by default. If you do not explicitly set this option to an integer
JSHint will not warn about indentation anywhere in your code.

#### Recommendation

 - **JSLint** - Set this option to `2` or `4` to enable indentation validation

 - **JSHint** - Set this option to `2` or `4` to enable indentation validation
