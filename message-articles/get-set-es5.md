<!---
{
    "titles": [
        "get/set are ES5 features",
        "E034"
    ],
    "slugs": [
        "get-set-are-es5-features",
        "e034"
    ],
    "linters": [
        "jslint",
        "jshint"
    ],
    "author": "jallardice"
}
-->

### History

This warning has existed in two forms across JSLint and JSHint. It was
introduced in May 2011 version of JSLint and remained in both tools for a period
of time.

 - In JSLint between May 2011 and August 2013 the message used was the generic
   "[This is an ES5 feature][es5]"

 - Before May 2011 and after August 2013 this functionality is not supported in
   JSLint

 - In JSHint prior to version 2.0.0 the message used was "get/set are ES5
   features"

 - In JSHint 2.0.0 and above this functionality is not supported

### When do I get this error?

The "get/set are ES5 features" error, and the alternative "This is an ES5
feature", is thrown when JSHint or JSLint encounters **an object property getter
or setter**. In the following example we create an object `x` with a getter and
setter. The getter is intended to always return half of the set value:

<!---
{
    "linter": "jshint",
    "version": "1.1.0"
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

### Why do I get this error?

This error is raised to highlight the use of **a newer language feature that
might not be supported** in all the environments in which your code should run.
In particular, various older browsers will be likely to throw syntax errors when
parsing your script.

ECMAScript 5 added support for object property getters and setters as a
mechanism for running a function on property access and modification ([ES5
&sect;11.1.5][es5-11.1.5]):

> *PropertyAssignment* :<br>
> &nbsp;&nbsp;&nbsp;&nbsp;*PropertyName* : *AssignmentExpression*<br>
> &nbsp;&nbsp;&nbsp;&nbsp;`get` *PropertyName* `( ) {` *FunctionBody* `}`<br>
> &nbsp;&nbsp;&nbsp;&nbsp;`set` *PropertyName* `(` *PropertySetParameterList* `)
  {` *FunctionBody* `}`

If you're sure that your code doesn't need to run in older browsers that don't
support the ES5 getter/setter syntax, you can fix this error by setting the
`es5` option to `true`:

<!---
{
    "linter": "jshint",
    "version": "1.1.0"
}
-->
```javascript
/*jslint es5: true */
/*jshint es5: true */
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

[es5]: /this-is-an-es5-feature
[es5-11.1.5]: http://es5.github.com/#x11.1.5
