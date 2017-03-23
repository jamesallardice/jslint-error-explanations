<!---
{
    "titles": [
        "Empty class"
    ],
    "slugs": [
        "empty-class"
    ],
    "linters": [
        "jslint",
        "jshint",
        "eslint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "Empty class" error is thrown when JSLint, JSHint (only versions before
1.0.0) or ESLint encounters **a regular expression literal containing an empty
character class**. The following example defines a regular expression including
an empty character class:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var r = /^abc[]/;
```

### Why do I get this error?

This error is raised to highlight **code that may not work as you expect it
to**. According to the regular expression grammar in the ECMAScript standard,
empty character classes are allowed ([ES5 A.7][es5-a7]):

> *CharacterClass* ::<br>
> &nbsp;&nbsp;&nbsp;&nbsp;`[` [lookahead &notin; {`^`}] *ClassRanges* `]`<br>
> &nbsp;&nbsp;&nbsp;&nbsp;`[ ^` *ClassRanges* `]`<br><br>
> *ClassRanges* ::<br>
> &nbsp;&nbsp;&nbsp;&nbsp;[empty]<br>
> &nbsp;&nbsp;&nbsp;&nbsp;*NonemptyClassRanges*

However, an empty character class can never match anything, meaning the regular
expression in the example above will always fail to match. Since it's unlikely
you intended such behaviour, a warning is raised to highlight the fact that you
may have overlooked something, or simply made a small typo.

There is no JSLint or JSHint option that can be set to suppress this error. The
best way to resolve it is to simply remove any empty character classes from the
regular expressions in question:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var r = /^abc/;
```

However, if you really do need an empty character class, you can use the
`RegExp` constructor to create your regular expression:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var r = new RegExp("^abc[]");
```

In ESLint the rule that generates this warning is named `no-empty-class`. You
can disable it by setting it to `0`, or enable it by setting it to `1`.

[es5-a7]: http://es5.github.com/#A.7
