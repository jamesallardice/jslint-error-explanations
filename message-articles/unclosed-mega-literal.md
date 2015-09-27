<!---
{
    "titles": [
        "Unclosed mega literal",
        "Unclosed template literal",
        "E052"
    ],
    "slugs": [
        "unclosed-mega-literal",
        "unclosed-template-literal",
        "e052"
    ],
    "linters": [
        "jslint",
        "jshint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "Unclosed mega literal" error is thrown when JSLint encounters an **unclosed
template string literal**. JSHint raises the "Unclosed template literal" error
in the same situation. Note that because [template string literals][tsl] are an
ES2015 (ES6) feature this error should only appear when linting ES2015 code with
the appropriate option set in the linter.

In the following example we attempt to assign an unclosed template string
literal to `a`:

```javascript
/*jslint es6: true */
let x = `unclosed;
```

### Why do I get this error?

This error is raised to highlight a **fatal JavaScript syntax error**. Your code
will not run unless you fix this issue. The ECMAScript grammar states that any
template literal must be closed by the backtick character ([ES2015 &sect;11.8.68][es6-11.8.6]):

> *Template* ::<br>
> &nbsp;&nbsp;&nbsp;&nbsp;*NoSubstitutionTemplate*<br>
> &nbsp;&nbsp;&nbsp;&nbsp;*TemplateHead*<br><br>
> *NoSubstitutionTemplate* ::<br>
> &nbsp;&nbsp;&nbsp;&nbsp;\` *TemplateCharacters*<sub>opt</sub> \`

The grammar for *NoSubstitutionTemplate* is straightforward and shows the
necessary backticks. The second production is far more complicated and beyond
the scope of this article but does also require an opening and closing backtick.

To fix the error, simply close any unclosed template strings:

```javascript
/*jslint es6: true */
let x = `unclosed`;
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. Since this message relates to a fatal
syntax error you cannot disable it.

[tsl]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/template_strings
[es6-11.8.6]: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-template-literal-lexical-components
[jshintopts]: http://jshint.com/docs/#options
