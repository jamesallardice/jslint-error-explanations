<!---
{
    "titles": [
        "The object literal notation {} is preferrable",
        "Use the object literal notation {}",
        "W010"
    ],
    "tools": [
        "jslint",
        "jshint"
    ],
    "author": "jallardice",
    "slugs": [
        "the-object-literal-notation-is-preferrable",
        "use-the-object-literal-notation",
        "w010"
    ]
}
-->

### History

In both JSLint and JSHint this warning started life as "Use the object literal notation {}". In JSHint 1.0.0 the message
was changed to "The object literal notation {} is preferrable". The circumstances under which the warning is issued have
not changed.

### When do I get this error?

The "Use the object literal notation {}" error (and the alternative "The object literal notation {} is preferrable"
error) is thrown when JSLint and JSHint encounter **a call to the `Object` constructor preceded by the `new` operator**.
Here's an example:

```javascript
var x = new Object();
```

### Why do I get this error?

This error is raised to highlight a **potentially dangerous and unnecessarily verbose piece of code**. Before we look at
why that above snippet is potentially dangerous, here's a rewritten version using array literal notation that passes
JSLint and JSHint. Notice that it's significantly shorter:

```javascript
var x = {};
```

Since the `Object` constructor is actually just a property of the global object, it can be overwritten. If it has been
overwritten, then it's possible the first example above will generate a type error. For example, if you had run
something like `Object = 50`, a type error would be thrown because `Object` is no longer a function.

Here's an example in which we overwrite the `Object` constructor. Note that JSLint and JSHint do not know that's what
has happened. Therefore, they take the safe approach and forbid the use of the `Object` constructor completely:

```javascript
/*jslint browser: true */
window.Object = 50;
var x = new Object(); //TypeError: Object is not a function
```

Always using the literal form prevents running into problems like this, however unlikely they may be. Note that the
literal form is identical to the constructor form ([ES5 &sect;11.1.5](http://es5.github.com/#x11.1.5)):

> The production *ObjectLiteral* `: { }` is evaluated as follows:
>
> &nbsp;&nbsp;&nbsp;&nbsp;1. Return a new object created as if by the expression `new Object()` ...

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax](http://jshint.com/docs/#options). The identifier of this warning is **W010**. This means you
can tell JSHint to not issue this warning with the `/*jshint -W010 */` directive.
