<!---
{
    "titles": [
        "The array literal notation [] is preferrable",
        "Use the array literal notation []",
        "W009"
    ],
    "tools": [
        "jslint",
        "jshint",
        "eslint"
    ],
    "author": "jallardice",
    "slugs": [
        "the-object-array-notation-is-preferrable",
        "use-the-array-literal-notation",
        "w009"
    ]
}
-->

### History

This warning has existed in two forms across the three main linters. It was
introduced in the original version of JSLint and has remained in all three tools
ever since.

 - In JSLint and JSHint prior to version 1.0.0 the warning given is *"Use the
   array literal notation []"*

 - In JSHint since 1.0.0 the warning given is *"The array literal notation [] is
   preferrable"*

 - In ESLint the warning has always been *"The array literal notation [] is
   preferrable"*

The situations that produce the warning have not changed despite changes to the
text of the warning itself.

### When do I get this error?

The "The array literal notation [] is preferrable" error (and the alternative
"Use the array literal notation []" error) are thrown when JSLint or JSHint
encounter **a call to the `Array` constructor preceded by the `new` operator**.
Here's an example:

<!---
{
    "linter": "jslint",
    "eslint": {
        "no-array-constructor": 1
    }
}
-->
```javascript
var x = new Array();
```

ESLint is slightly more accurate and also warns when it encounters **a call to
the `Array` constructor with no arguments**, regardless of whether the `new`
operator is present or not. This makes sense because the `Array` constructor
behaves the same way in both situations ([ES5 &sect;15.4.1][es5-15.4.1]):

> When Array is called as a function rather than as a constructor, it creates
> and initialises a new Array object. Thus the function call `Array(...)` is
> equivalent to the object creation expression `new Array(...)` with the same
> arguments.

All three linters are able to distinguish between calls that pass a number as
the first argument. In that case they will not issue a warning.

### Why do I get this error?

This error is raised to highlight a **potentially dangerous and unnecessarily
verbose piece of code**. Before we look at why that above snippet is potentially
dangerous, here's a rewritten version using array literal notation that passes
JSLint and JSHint. Notice that it's significantly shorter:

<!---
{
    "linter": "jslint",
    "eslint": {
        "no-array-constructor": 1
    }
}
-->
```javascript
var x = [];
```

Since the `Array` constructor is actually just a property of the global object,
it can be overwritten. If it has been overwritten, then it's possible the first
example above will generate a type error. For example, if you had run something
like `Array = 50`, a type error would be thrown because `Array` is no longer a
function.

Here's an example in which we overwrite the `Array` constructor. Note that
JSLint and JSHint do not know that's what has happened. Therefore, they take the
safe approach and forbids the of the `Array` constructor completely:

<!---
{
    "linter": "jslint",
    "eslint": {
        "no-array-constructor": 1
    }
}
-->
```javascript
window.Array = 50;
var x = new Array(); //TypeError: Array is not a function
```

However there is one relatively common situation in which the `Array`
constructor is correctly used and that's when you need to create an array of
specific length. The array literal notation provides no mechanism to do this.
All three linters cover this use case and do not warn when they encounter a call
to the `Array` constructor with arguments:

<!---
{
    "linter": "jslint",
    "eslint": {
        "no-array-constructor": 1
    }
}
-->
```javascript
var x = new Array(10);
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this
warning is **W009**. This means you can tell JSHint to not issue this warning
with the `/*jshint -W009 */` directive.

[jshintopts]: http://jshint.com/docs/#options
[es5-15.4.1]: http://es5.github.io/#x15.4.1
