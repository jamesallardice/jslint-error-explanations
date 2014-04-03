<!---
{
    "titles": [
        "Implied eval is evil. Pass a function instead of a string",
        "Implied eval. Consider passing a function instead of a string",
        "W066"
    ],
    "slugs": [
        "implied-eval-is-evil-pass-a-function-instead-of-a-string",
        "implied-eval-consider-passing-a-function",
        "w066"
    ],
    "linters": [
        "jslint",
        "jshint",
        "eslint"
    ],
    "author": "jallardice"
}
-->

### History

This warning has existed in two forms across the three main linters. It was
introduced in the original version of JSLint and has remained in all three tools
ever since.

 - In JSLint and JSHint prior to version 1.0.0 the warning given is *"Implied
   eval is evil. Pass a function instead of a string"*

 - In JSHint 1.0.0 and above the message used is *"Implied eval. Consider
   passing a function instead of a string"*

 - In ESLint the message has always been *"Implied eval. Consider passing a
   function instead of a string"*

The situations that produce the warning have not changed despite changes to the
text of the warning itself.

### When do I get this error?

The "Implied    eval is evil. Pass a function instead of a string" error (and
the alternative "Implied eval. Consider    passing a function instead of a
string" error) is thrown when JSLint, JSHint and ESLint encounter **a call to
`setTimeout` or `setInterval` in which the first argument is a string**. Here's
an example that should pop up a browser alert after one second:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/*jslint browser: true */
setTimeout("alert('Hello!');", 1000);
```

### Why do I get this error?

This error is raised to highlight a **bad practice** and a possible
**misunderstanding of the language**. By passing a string to `setTimeout` or
`setInterval` you are adding significant extra work for the engine. It has to
parse that string as a complete program, akin to the `eval` function. For full
details of why this is a problem see the article on the related message: "[eval
is evil][evil]".

You can fix this issue by simply passing a function to `setTimeout` or
`setInterval` instead of a string. In a situation like that of the example
above, you can achieve this by passing an anonymous function:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/*jslint browser: true, devel: true */
setTimeout(function () {
    "use strict";
    alert('Hello!');
}, 1000);
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W066**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W066 */` directive.

In ESLint the rule that generates this warning is named `no-implied-eval`. You
can disable it by setting it to `0`, or enable it by setting it to `1`.

[evil]: /eval-is-evil
[jshintopts]: http://jshint.com/docs/#options
