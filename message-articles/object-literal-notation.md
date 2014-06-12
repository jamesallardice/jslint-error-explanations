<!---
{
    "titles": [
        "The object literal notation {} is preferrable",
        "The object literal notation {} is preferable",
        "Use the object literal notation {}",
        "Use the object literal notation {} or Object.create(null)",
        "W010"
    ],
    "slugs": [
        "the-object-literal-notation-is-preferrable",
        "the-object-literal-notation-is-preferable",
        "use-the-object-literal-notation",
        "use-the-object-literal-notation-or-object-create-null",
        "w010"
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

This warning has existed in various forms across the three main linters. It was
introduced in the original version of JSLint and has remained in all three tools
ever since.

 - In JSLint versions dated May 2013 onwards the warning given is "Use the
   object literal notation {} or Object.create(null)"

 - In JSLint prior to May 2013 and JSHint prior to version 1.0.0 the warning
   given is *"Use the object literal notation {}"*

 - In JSHint since 1.0.0 the warning given is *"The object literal notation {}
   is preferrable"*

 - In ESLint the warning has always been *"The object literal notation {} is
   preferrable"*

The situations that produce the warning have not changed despite changes to the
text of the warning itself.

### When do I get this error?

The "The object literal notation {} is preferrable" error (and the alternative
"Use the object literal notation {}" and "Use the object literal notation {} or
Object.create(null)" error) are thrown when JSLint, JSHint and ESLint encounter
**a call to the `Object` constructor preceded by the `new` operator**. Here's an
example:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var x = new Object();
```

### Why do I get this error?

This error is raised to highlight a **potentially dangerous and unnecessarily
verbose piece of code**. Before we look at why that above snippet is potentially
dangerous, here's a rewritten version using object literal notation that passes
all three linters. Notice that it's significantly shorter:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var x = {};
```

Since the `Object` constructor is actually just a property of the global object,
it can be overwritten. If it has been overwritten, then it's possible the first
example above will generate a type error. For example, if you had run something
like `Object = 50`, a type error would be thrown because `Object` is no longer a
function.

Here's an example in which we overwrite the `Object` constructor. Note that
JSLint, JSHint and ESLint do not know that's what has happened. Therefore, they
take the safe approach and forbid the use of the `Object` constructor completely:

<!---
{
    "linter": "jslint"
}
-->
```javascript
Object = 50;
var x = new Object(); //TypeError: Array is not a function
```

Always using the literal form prevents running into problems like this, however
unlikely they may be. Note that the literal form is identical to the constructor
form ([ES5 &sect;11.1.5][es5-11.1.5]):

> The production *ObjectLiteral* : `{ }` is evaluated as follows:<br>
> &nbsp;&nbsp;&nbsp;&nbsp;1. Return a new object created as if by the expression
> `new Object()` ...


In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W010**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W010 */` directive.

In ESLint the rule that generates this warning is named `no-new-object`.
You can disable it by setting it to `0`, or enable it by setting it to `1`.

#### A note on `Object.create(null)`

Since May 2013 JSLint has given a slightly different message in this situation.
It now tells you to "use the object literal notation or Object.create(null)".
When you create an object there's a high chance you won't ever make use of any
of the properties it inherits from `Object.prototype`. If that's the case you
can create an object that doesn't have a prototype chain:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var x = Object.create(null);
```

It's important to remember that this is *not* identical to an object literal. An
object literal inherits from `Object.prototype` but an object created with
`Object.create(null)` does not. This is useful when all you need is a simple
key-value store.

[es5-11.1.5]: http://es5.github.io/#x11.1.5
[jshintopts]: http://jshint.com/docs/#options
