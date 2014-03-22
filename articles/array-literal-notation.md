<!---
{
    "titles": [
        "The array literal notation [] is preferrable",
        "Use the array literal notation []",
        "W009"
    ],
    "tools": [
        "jslint",
        "jshint"
    ],
    "tags": [
        "array"
    ],
    "contributors": [
        "jallardice"
    ],
    "slugs": [
        "the-object-array-notation-is-preferrable",
        "use-the-array-literal-notation",
        "w009"
    ]
}
-->

### History

In both JSLint and JSHint this warning started life as "Use the array literal notation []". In JSHint 1.0.0 the message
was changed to "The array literal notation [] is preferrable". The circumstances under which the warning is issued have
not changed.

### When do I get this error?

The "The array literal notation [] is preferrable" error (and the alternative "Use the array literal notation []"
error) are thrown when JSLint or JSHint encounters **a call to the `Array` constructor preceded by the `new` operator**. Here's an example:

```javascript
var x = new Array();
```

### Why do I get this error?

This error is raised to highlight a **potentially dangerous and unnecessarily verbose piece of code**. Before we look at why that above snippet is potentially dangerous, here's a rewritten version using array literal notation that passes JSLint and JSHint. Notice that it's significantly shorter:

```javascript
var x = [];
```

Since the `Array` constructor is actually just a property of the global object, it can be overwritten. If it has been overwritten, then it's possible the first example above will generate a type error. For example, if you had run something like `Array = 50`, a type error would be thrown because `Array` is no longer a function.

Here's an example in which we overwrite the `Array` constructor. Note that JSLint and JSHint do not know that's what has happened. Therefore, they take the safe approach and forbids the of the `Array` constructor completely:

```javascript
window.Array = 50;
var x = new Array(); //TypeError: Array is not a function
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a [special option syntax](http://jshint.com/docs/#options). The identifier of this warning is **W009**. This means you can tell JSHint to not issue this warning with the `/*jshint -W009 */` directive.
