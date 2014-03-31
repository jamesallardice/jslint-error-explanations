<!---
{
    "titles": [
        "Unexpected parameter '{a}' in get {b} function",
        "W076"
    ],
    "slugs": [
        "unexpected-parameter-a-in-get-b-function",
        "w076"
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
introduced in the original version of JSLint and has remained (in a way) in all
three tools ever since.

 - In JSLint and JSHint the warning given is "Unexpected parameter '{a}' in get
   {b} function"

 - In ESLint the message used is the more generic "Unexpected identifier"

The situations that produce the warning have not changed despite changes to the
text of the warning itself.

### When do I get this error?

The "Unexpected parameter '{a}' in get    {b} function" error, and the
alternative "Unexpected identifier", is thrown when JSLint, JSHint or ESLint
encounters **a named parameter in the signature of a property getter function**.
In the following example we create an object x with a getter and setter. The
getter will always return half of the set value:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var x = {
    actual: 10,
    get x (value) {
        "use strict";
        return this.actual / 2;
    },
    set x (value) {
        "use strict";
        this.actual = value;
    }
};
```

### Why do I get this error?

This error is raised to highlight a **completely pointless and potentially
confusing piece of code**. Your code will run without error if you do not change
it, but could be confusing to other developers and adds unnecessary bytes to the
weight of your script. ECMAScript 5 added new syntax for object property getter
and setter functions. The specification states the following in reference to
getters ([ES5 &sect;8.6.1][es5-8.6.1]):

> The function’s [[Call]] internal method... is called with an empty arguments
> list to return the property value each time a get access of the property is
> performed.

Since the runtime will never pass any arguments to the getter function, there is
no need to provide any named parameters in the function signature. Simply remove
them to fix the error:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var x = {
    actual: 10,
    get x () {
        "use strict";
        return this.actual / 2;
    },
    set x (value) {
        "use strict";
        this.actual = value;
    }
};
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W076**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W076 */` directive.

[es5-8.6.1]: http://es5.github.com/#x8.6.1
[jshintopts]: http://jshint.com/docs/#options
