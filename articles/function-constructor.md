<!---
{
    "titles": [
        "The Function constructor is eval",
        "The Function constructor is a form of eval",
        "W054"

    ],
    "slugs": [
        "the-function-constructor-is-eval",
        "the-function-constructor-is-a-form-of-eval",
        "w054"
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

This warning has existed in two forms in JSLint, JSHint and ESLint. It was
introduced in the original version of JSLint and has remained in all three
linters ever since.

 - In JSLint and JSHint prior to version 1.0.0 the warning given is "The
   Function constructor is eval"

 - In JSHint 1.0.0 and above the message used is "The Function constructor is a
   form of eval"

 - In ESLint the messages has always been "The Function constructor is eval"

### When do I get this error?

The "The Function constructor is eval" error (and the alternative "The Function
constructor is a form of eval" error) is thrown when JSLint, JSHint or ESLint
encounters **a call to the `Function` constructor preceded by the `new`
operator**. Here's a simple example which defines a function to add two numbers:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var add = new Function("a", "b", "return a + b");
```

### Why do I get this error?

This error is raised to highlight a **bad practice**. By passing a string to the
`Function` constructor you are requiring the engine to parse that string much in
the way it has to when you call the `eval` function. For full details of why
this is a problem, see the article on the related "[eval is evil][eval]"
message.

In simple cases like that of our example above, you can fix the issue by using a
function declaration or function expression:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var add = function (a, b) {
    "use strict";
    return a + b;
};
```

In more advanced cases where you really need to use the `Function` constructor,
you can set the `evil` option to `true` to prevent both JSLint and JSHint from
complaining about it:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/*jslint evil: true */
var add = new Function("a", "b", "return a + b");
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W054**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W054 */` directive.

In ESLint the rule that generates this warning is named `no-new-func`. You can
disable it by setting it to `0`, or enable it by setting it to `1`.

[eval]: /eval-is-evil
[jshintopts]: http://jshint.com/docs/#options
