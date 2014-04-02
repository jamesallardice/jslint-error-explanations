<!---
{
    "titles": [
        "Don't make functions within a loop",
        "W083"
    ],
    "slugs": [
        "dont-make-functions-within-a-loop",
        "w083"
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

The "Don't make functions within a loop" error is thrown when JSLint, JSHint and
ESLint encounter **a function expression in a `for`, `while` or `do` statement
body**. In the following example we attempt to add a click event listener to
each element with a given class name. The event handler is intended to overwrite
the contents of the clicked element with the value of `i` at a specific
iteration of the loop:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/*jslint browser: true, plusplus: true */

var elems = document.getElementsByClassName("myClass"), i;

for (i = 0; i < elems.length; i++) {
    elems[i].addEventListener("click", function () {
        "use strict";
        this.innerHTML = i;
    });
}
```

### Why do I get this error?

This error is raised to highlight code that **may not work as you expect it to**
and could also indicate **misunderstanding of how the language works**. Your
code may run without any problems if you do not fix this error, but in some
situations it could behave unexpectedly.

There are a couple of fundamental problems with functions in loops. Imagine
`elems` in the above example contains 5 elements. You might expect a click on
the second element to set that element's content to `1` (not `2` since the loop
starts at `0`). However that isn't what happens. Instead, the element is
overwritten with `4` which is the final value of `i` when the loop finished.
This happens because each function retains a reference to the same copy of `i`.
We can get around this by forcing each function to take its *own* copy of `i` at
whatever value it has at that time:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/*jslint browser: true, plusplus: true */

var elems = document.getElementsByClassName("myClass"), i;

for (i = 0; i < elems.length; i++) {
    (function (iCopy) {
        "use strict";
        elems[i].addEventListener("click", function () {
            this.innerHTML = iCopy;
        });
    }(i));
}
```

What we have now captures the value of `i` at each iteration of the loop. This
happens because JavaScript passes arguments to functions by value. This means
that `iCopy` within the capturing function is not related to `i` in any way
(except for the fact that they happen to have the same value at that point in
time). If `i` changes later (which it does - on the next iteration of the loop)
then `iCopy` is not affected.

This will work as we expect it to but the problem now is that the JavaScript
interpreter will create an instance of the capturing function per loop
iteration. It has to do this because it doesn't know if the function object will
be modified elsewhere. Since functions are standard JavaScript objects, they can
have properties like any other object, which could be changed in the loop. Thus
by creating the function in the loop context, you cause the interpreter to
create multiple function instances, which can cause unexpected behavior and
[performance problems][perf]. To fix the issue, we need to move the function out
of the loop:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/*jslint browser: true, plusplus: true */

var elems = document.getElementsByClassName("myClass"), i;

function makeClickHandler(i) {
    "use strict";
    return function () {
        this.innerHTML = i;
    };
}

for (i = 0; i < elems.length; i++) {
    elems[i].addEventListener("click", makeClickHandler(i));
}
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W083**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W083 */` directive. You can also set the `loopfunc` option to `true`.

In ESLint the rule that generates this warning is named `no-loop-func`. You can
disable it by setting it to `0`, or enable it by setting it to `1`.

[perf]: http://jsperf.com/closure-vs-name-function-in-a-loop/2
[jshintopts]: http://jshint.com/docs/#options
