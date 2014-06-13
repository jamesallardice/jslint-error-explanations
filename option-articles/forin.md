<!---
{
    "titles": [
        "forin"
    ],
    "slugs": [
        "option-forin"
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

In JSLint the `forin` option is used to allow the usage of unfiltered for-in
statements. Since the for-in statement will enumerate properties from the
prototype chain and not just from the object in question, it can potentially
cause problems if other code is modifying native prototypes without your
knowledge. In the following example we use a for-in loop to iterate over the
elements of an array. This is commonly called out as bad practice because
enumerable methods added to `Array.prototype` will be produced:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/*jslint forin: true */
/*global doSomething */

var arr = [],
    i;

for (i in arr) {
    doSomething(arr[i]);
}
```

The JSHint `forin` option is used to **require** the filtering of such loops.
Here's the same example again:

<!---
{
    "linter": "jshint"
}
-->
```javascript
/*jshint forin: true */
/*global doSomething */

var arr = [],
    i;

for (i in arr) {
    doSomething(arr[i]);
}
```

A "filtered" for-in statement is one that ensures only properties that belong to
the object in question are operated on. This is usually achieved by wrapping the
body of the for-in in an `if` statement that makes sure each property is an
"own" property of the object:

<!---
{
    "linter": "jshint"
}
-->
```javascript
/*jshint forin: true */
/*global doSomething */

var arr = [],
    i;

for (i in arr) {
    if (arr.hasOwnProperty(i)) {
        doSomething(arr[i]);
    }
}
```

### When should I use this option?

With JSLint, if the `forin` option is not set, you'll get a "[The body of a for
in should be wrapped in an if statement to filter unwanted properties from the
prototype][forin]" error any time an unfiltered for-in statement is used. In
JSHint the opposite is true and you'll receive the same error message for each
unfiltered for-in when the option *is* set.

Note that in JSHint this is an *enforcing* option which means JSHint does not
apply it by default. If you do not explicitly set this option to `true` JSHint
will allow the use of bitwise operators anywhere in your code.

#### Recommendation

 - **JSLint** - Do not set this option (you will not be able to use unfiltered
   for-in statements).

 - **JSHint** - Set this option to `true` (you will not be able to use unfiltered
   for-in statements).

[forin]: /the-body-of-a-for-in-should-be-wrapped-in-an-if-statement
