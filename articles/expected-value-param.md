<!---
{
    "titles": [
        "Expected parameter (value) in set '{a}' function"
    ],
    "slugs": [
        "expected-parameter-value-in-set-a-function"
    ],
    "linters": [
        "jslint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "Expected parameter (value) in set '{a}' function" error is thrown when
JSLint encounters **property setter function in which the first parameter is not
named `value`**. In the following example we create an object `x` with a getter
and setter. The getter will always return half of the set value:

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
    set x (val) {
        "use strict";
        this.actual = val;
    }
};
```

### Why do I get this error?

This error is raised to highlight a **lack of convention**. Your code will run
without error if you do not change it, but could be confusing to other
developers. ECMAScript 5 added new syntax for object property getter and setter
functions. The specification states the following in reference to setters ([ES5
&sect;8.6.1][es5-8.6.1]):

> The function’s [[Call]] internal method... is called with an arguments list
> containing the assigned value as its sole argument each time a set access of
> the property is performed.

By convention, this single argument should be named `value`, since it will be
used to set the value of something. To fix this error simply rename the
parameter accordingly:

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

[es5-8.6.1]: http://es5.github.com/#x8.6.1
