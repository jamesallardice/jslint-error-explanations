<!---
{
    "titles": [
        "The body of a for in should be wrapped in an if statement to filter unwanted properties from the prototype",
        "W089"

    ],
    "slugs": [
        "the-body-of-a-for-in-should-be-wrapped-in-an-if-statement",
        "w089"
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

The "The body of a for in should be wrapped in an if statement to filter
unwanted properties from the prototype" error is thrown when JSLint encounters
**a `for-in` statement in which the first statement is not an `if` statement
containing a call to the `hasOwnProperty` method**. JSHint and ESLint are a
little more lenient and do not enable this feature by default. They will only
warn when they encounter a `for-in` statement in which the first statement is
not an `if` statement, regardless of the condition of that `if` statement.
Here's an example in which we attempt to enumerate the properties of an object:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/*jshint forin: true */
/*eslint guard-for-in: 1 */
/*global doSomething */

var me = {
        name: "James",
        age: 23
    },
    prop;

for (prop in me) {
    doSomething(prop);
}
```

### Why do I get this error?

This error is raised to highlight **bad practice** and **code that may not work
as you expect it to**. Your code may run without error, depending on whether
you've extended the prototype of the object you're trying to enumerate, or, for
example, `Object.prototype`, with enumerable properties, but it's bad practice
and could lead to problems in the future.

The for-in construct will enumerate all enumerable properties of an object,
whether they belong to the object itself or an object in its prototype chain.
Consider the following example, in which we add a completely useless random
method to `Object.prototype`:

<!---
{
    "linter": "jslint"
}
-->
```javascript
Object.prototype.random = function () {
    "use strict";
    return Math.random();
};
```

After the above snippet has executed, all objects in our script will have access
to that `random` method (via their prototype chain, all the way down to
`Object.prototype`). Since we have not defined our method as non-enumerable
(which is only possible in ECMAScript 5 environments that support the
`Object.create` and `Object.defineProperty` methods), it will be enumerated
along with any other enumerable properties by a `for-in` loop.

However, all objects also inherit a (non-enumerable) method called
`hasOwnProperty`, which can be used to check whether or not an object has a
property with a given identifier that belongs to it and not to its prototype, or
any objects down its prototype chain ([ES5 &sect;15.2.4.5][es5-15.2.4.5]):

> &zwnj;3. Let *desc* be the result of calling the [[GetOwnProperty]] internal
> method of *O* passing *P* as the argument.<br>
> &zwnj;4. If *desc* is undefined, return false.<br>
> &zwnj;5. Return true.

The "[[GetOwnProperty]] internal method" ([ES5 &sect;8.12.1][es5-8.12.1])
returns a value that tells the engine whether or not the object in question has
an "own property" with the given identifier. And "own property" is defined as a
"property that is directly contained by its object" ([ES5
&sect;4.3.30][es5-4.3.30]).

In our example, since the `random` method would be accessible (via inheritance)
to the `me` object, but isn't an "own property" of it, we would need to use the
`hasOwnProperty` method to ensure we don't mistakenly handle it:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/*jshint forin: true */
/*eslint guard-for-in: 1 */
/*global doSomething */

var me = {
        name: "James",
        age: 23
    },
    prop;

for (prop in me) {
    if (me.hasOwnProperty(prop)) {
        doSomething(prop);
    }
}
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W089**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W089 */` directive.

In ESLint the rule that generates this warning is named `guard-for-in`. You can
disable it by setting it to `0`, or enable it by setting it to `1`.

[es5-15.2.4.5]: http://es5.github.com/#x15.2.4.5
[es5-8.12.1]: http://es5.github.com/#x8.12.1
[es5-4.3.30]: http://es5.github.com/#x4.3.30
[jshintopts]: http://jshint.com/docs/#options
