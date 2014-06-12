<!---
{
    "titles": [
        "Do not use {a} as a constructor",
        "W053"
    ],
    "slugs": [
        "do-not-use-a-as-a-constructor",
        "w053"
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

The "Do not use {a} as a constructor" error is thrown when JSLint, JSHint or
ESLint encounters **a call to `String`, `Number`, `Boolean`, `Math` or `JSON`
preceded by the `new` operator**. In the following example we attempt to assign
some values to variables by invoking these functions as constructors:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var str = new String("hello"),
    num = new Number(10),
    bool = new Boolean(false),
    math = new Math(),
    json = new JSON({ myProp: 10 });
```

### Why do I get this error?

This error is raised to highlight a **bad practice** and a piece of code that
**may not work as you intend it to**. It can also highlight a possible **fatal
JavaScript error**. Your code could run without error if you do not change it,
but could be confusing to other developers and could also behave in unexpected
ways.

The `String`, `Number` and `Boolean` constructor functions return objects of
type `String`, `Number` and `Boolean`, which is rarely what you want. Usually,
you want literal string, number or boolean values, because strictly comparing an
object to a literal will always return false. In the case of these objects, to
fix this error, use literal values rather than their corresponding wrapper
objects:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var str = "hello",
    num = 10,
    bool = false;
```

Note that this does not cause you to lose any functionality, since literal
values are internally cast to instances of the appropriate type when you call a
method on them. Also note that you are free to use these functions to perform
type conversions i.e. by invoking them without the `new` operator:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var str = String(10),    // "10"
    num = Number("123"), // 123
    bool = Boolean("");  // false
```

The case is a little different for the `Math` and `JSON` objects. These two
objects are not functions, and cannot be constructed. Attempts to instantiate
them will result in a type error. If you're trying to serialize an object into a
JSON string, you need to use the `JSON.stringify` method instead:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var json = JSON.stringify({ myProp: 10 });
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W053**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W053 */` directive.

[jshintopts]: http://jshint.com/docs/#options
