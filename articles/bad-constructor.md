<!---
{
    "titles": [
        "Bad constructor",
        "W056"
    ],
    "slugs": [
        "bad-constructor",
        "e056"
    ],
    "linters": [
        "jslint",
        "jshint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "Bad constructor" error is thrown when JSLint or JSHint encounters **the
`new` operator followed by a literal value**. In the following example we are
attempting to apply the `new` operator to a numeric literal:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var num = new 5();
```

### Why do I get this error?

In the case of assignment to a function call this error is raised to highlight a
**fatal type error**. Your code will throw an error in all environments if
you do not resolve this issue.

The `new` operator attempts to invoke the internal `[[Construct]]` property of
its operand ([ES5 &sect;11.2.2][es5-11.2.2]):

> The production NewExpression : `new` NewExpression is evaluated as follows:
> <br><br>
> &nbsp;&nbsp;&nbsp;&nbsp;1. Let ref be the result of evaluating NewExpression.
> <br>
> &nbsp;&nbsp;&nbsp;&nbsp;2. Let constructor be GetValue(ref).<br>
> &nbsp;&nbsp;&nbsp;&nbsp;3. If Type(constructor) is not Object, throw a
> TypeError exception.<br>
> &nbsp;&nbsp;&nbsp;&nbsp;4. If constructor does not implement the [[Construct]]
> internal method, throw a TypeError exception.

We are particularly interested in steps 3 and 4. In the example above the
operand is a numeric literal and therefore its type is not "Object". As stated
by the third rule this will cause a type error to be thrown.

If the type of the operand *is* Object but it does not have an internal
`[[Construct]]` method the same thing happens and a type error is thrown in step
4. JSLint and JSHint can detect this to a point and will issue the same "Bad
constructor" warning if you attempt to apply `new` to an object literal:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var num = new {}();
```

To avoid this warning simply stop attempting to misuse the `new` operator. It is
only useful for creating instances of a constructor function and has no sensible
meaning when applied to non-function objects or literals.

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W056**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W056 */` directive.

[jshintopts]: http://jshint.com/docs/#options
[es5-11.2.2]: http://es5.github.io/#x11.2.2
