<!---
{
    "titles": [
        "Do not use 'new' for side effects",
        "W031"
    ],
    "slugs": [
        "do-not-use-new-for-side-effects",
        "w031"
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

The "Do not use 'new' for side effects" error is thrown when JSLint, JSHint or
ESLint encounters a **function invocation preceded by the new operator when not
part of an assignment or comparison expression**. JSHint will only issue this
warning if the `nonew` option is set to `true`.  In the following example we
call the built-in Date function as a constructor but don't assign the returned
instance to anything:

<!---
{
    "linter": "jslint",
    "eslint": {
        "no-new": 1
    }
}
-->
```javascript
/*jshint nonew: true */
new Date();
```

### Why do I get this error?

This error is raised to highlight a a *lack of convention**. While the code is
perfectly valid it contravenes best practice, and in the case of the example
above it indicates completely pointless code.

By not assigning the return value of a constructor to something you will lose
the reference to that instance. Generally, by constructing an instance you would
want to keep that reference, whether to use again later or for "internal" use as
part of a comparison. What's the point of constructing something you are going
to throw away as soon as it's been created?

If you have a constructor function that performs work beyond simply setting up
an instance, and you are calling that constructor just for these "side effects",
consider reworking your code to allow you to call the function normally, without
the new operator. In the following simple example the side effect of calling the
constructor is the incrementation of a variable:

<!---
{
    "linter": "jslint",
    "eslint": {
        "no-new": 1
    }
}
-->
```js
/*jshint nonew: true */
var counter = 0;

function Person(name) {
    "use strict";
    this.name = name;
    counter += 1;
}

var me = new Person("James");
new Person(); // Increments 'counter' as a side-effect
```

In the above example we create two instances of `Person` but only keep the
reference to one. The second call is simply there for the side effect of
incrementing the counter. This example could be reworked to increment the
counter without calling the constructor:

<!---
{
    "linter": "jslint",
    "eslint": {
        "no-new": 1
    }
}
-->
```js
/*jshint nonew: true */
var counter = 0;

function Person(name) {
    "use strict";
    this.name = name;
    counter += 1;
}

var me = new Person("James");
counter += 1; // Don't use the constructor
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W031**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W031 */` directive.

In ESLint the rule that generates this warning is named `no-new`. You can
disable it by setting it to `0`, or enable it by setting it to `1`.

[jshintopts]: http://jshint.com/docs/#options
[es5-12.6.4]: http://es5.github.io/#x12.6.4
