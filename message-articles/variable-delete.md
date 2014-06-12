<!---
{
    "titles": [
        "Only properties should be deleted",
        "Variables should not be deleted",
        "W051"
    ],
    "slugs": [
        "only-properties-should-be-deleted",
        "variables-should-not-be-deleted",
        "w051"
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

This warning has existed in two forms in JSLint, JSHint and ESLint. It was
introduced in the original version of JSLint and has remained in all three tools
ever since.

 - In JSLint the warning given is *"Only properties should be deleted"*

 - In JSHint and ESLint the warning has always been *"Variables should not be
   deleted"*

The situations that produce the warning have not changed despite changes to the
text of the warning itself.

### When do I get this error?

The "Only properties should be deleted" error, and the alternative "Variables
should not be    deleted" error, is thrown when JSLint, JSHint or ESLint
encounters **the `delete` operator followed by a single identifier**. In the
following example we declare a variable x and then attempt to delete it:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var x = 10;
delete x;
```

### Why do I get this error?

This error is raised to highlight code that probably **doesn't work as you
expect it to**. It can also indicate a **fatal syntax error**. The `delete`
operator will only delete properties of objects. It cannot "delete" variables or
anything else. Here's a valid use of the delete operator. Notice how this time
there are no JSLint errors:

<!---
{
    "linter": "jshint"
}
-->
```js
var x = {
    prop: 10
};
delete x.prop;
```

The ECMAScript 5 specification details the behaviour of the `delete` operator
([ES5 &sect;11.4.1][es5-11.4.1]). When the operand is a reference to an object
property this is what happens:

> If IsPropertyReference(ref) is true, then<br>
> &nbsp;&nbsp;&nbsp;&nbsp;Return the result of calling the [[Delete]] internal
> method on ToObject(GetBase(ref)) providing GetReferencedName(ref) and
> IsStrictReference(ref) as the arguments.

But when the operand is a reference to an Environment Record binding (something
that is not an object property), the runtime will attempt to delete it (and
fail) unless the code is running in strict mode. In that case a syntax error is
thrown:

> Else, ref is a Reference to an Environment Record binding, so<br>
> &nbsp;&nbsp;&nbsp;&nbsp;If IsStrictReference(ref) is true, throw a SyntaxError
> exception.<br>
> &nbsp;&nbsp;&nbsp;&nbsp;...[attempt to delete]...

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W051**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W051 */` directive.

[es5-11.4.1]: http://es5.github.io/#x11.4.1
[jshintopts]: http://jshint.com/docs/#options
