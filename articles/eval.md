<!---
{
    "titles": [
        "eval is evil",
        "eval can be harmful",
        "W061"
    ],
    "slugs": [
        "unexpected-else-after-return",
        "unnecessary-else-after-disruption",
        "w061"
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
introduced in the original version of JSLint and has remained in all three tools
ever since.

 - In JSLint the warning given is "eval is evil"

 - In JSHint 1.0.0 and above, and in all versions of ESLint, the message used is
   "eval can be harmful"

 - In JSHint prior to 1.0.0 the message used is "eval is evil"

The situations that produce the warning have not changed despite changes to the
text of the warning itself.

### When do I get this error?

The "eval is evil" error (and the alternative "eval can be harmful" error) is
thrown when JSLint, JSHint or ESLint encounters **a call to the eval function**.
Here's an example in which we use eval to access an object property by a
computed name:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var myString = "x",
    myObject = {
        x: 10
    },
    value = eval("myObject." + myString);
```

### Why do I get this error?

There are numerous reasons for this error. Some of the major ones include
**potentially dangerous code** and a likelihood of a **misunderstanding of the
language**. It can also indicate **slow, inefficient code**. For more details,
[Angus Croll's article][croll] on the subject is highly recommended.

It's well-documented that `eval` is probably the most misused feature of
JavaScript. The main reason for this is that there is almost always a better way
to achieve the same thing. It's quite likely that if you're reading this, you
are trying to do something like our example above - access an object property
with a string. There's a much better way to do that, using the square bracket
syntax to access properties with a variable:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var myString = "x",
    myObject = {
        x: 10
    },
    value = myObject[myString];
```

The `eval` function is slow. If you're using it unecessarily, you're slowing
down your program for no reason. One cause of this is the fact that the engine
has to parse the argument as a complete new program ([ES5
&sect;15.1.2.1][es5-15.1.2.1]):

> When the `eval` function is called with one argument *x*, the following steps
> are taken:<br>
>
> &nbsp;&nbsp;&nbsp;&nbsp;1. If Type(*x*) is not String, return *x*.<br>
> &nbsp;&nbsp;&nbsp;&nbsp;2. Let *prog* be the ECMAScript code that is the
> result of parsing *x* as a *Program*.

Because `eval` therefore allows for arbitrary execution of a complete JavaScript
program, it can also result in difficult debugging. If you are running large
amounts of code through `eval` you will not get useful errors. The line numbers
reported in the errors will correspond to the call to `eval` only, and not the
actual code that caused the problem.

However, in the situation where you absolutely have to use `eval`, you can tell
both JSLint and JSHint to allow it. But you should only do this as a last
resort. Just set the `evil` option to `true`:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/*jslint evil: true */
var myString = "x",
    myObject = {
        x: 10
    },
    value = eval("myObject." + myString);
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W061**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W061 */` directive.

In ESLint the rule that generates this warning is named `no-eval`. You can
disable it by setting it to `0`, or enable it by setting it to `1`.

[croll]: http://javascriptweblog.wordpress.com/2010/04/19/how-evil-is-eval/
[es5-15.1.2.1]: http://es5.github.com/#x15.1.2.1
[jshintopts]: http://jshint.com/docs/#options
