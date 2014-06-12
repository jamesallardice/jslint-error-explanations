<!---
{
    "titles": [
        "Redefinition of '{a}'",
        "W079"
    ],
    "slugs": [
        "redefinition-of-a",
        "w079"
    ],
    "linters": [
        "jshint",
        "eslint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "Redefinition of '{a}'" error is thrown when JSHint or ESLint encounters a
**variable declaration with an identifier that is the same as that of a built-in
native object**. In the following example we attempt to declare a variable with
the identifier `String`:

<!---
{
    "linter": "jshint"
}
-->
```javascript
var String = "My String";
```

This warning will often appear alongside the related "[Read only][ro]" message
so you may find it useful to read the explanations of that one too.

### Why do I get this error?

This error is raised to highlight a **potentially dangerous piece of code**.
Your code may run fine if you do not fix this error, but it will be confusing to
others, especially at first glance to someone quickly searching through your
script, and it will be likely to break third party scripts.

It is perfectly valid to reassign (and thereby override) any of the native
built-in functions, but there are limited use cases for it. JSHint forbids this
practice completely and does not provide an option to allow it. The list of
objects to which this rule applies is as follows. Each item concerns all
versions of JSHint and ESLint unless noted otherwise:

 - `Array`
 - `Boolean`
 - `Date`
 - `decodeURI`
 - `decodeURIComponent`
 - `encodeURI`
 - `encodeURIComponent`
 - `Error`
 - `eval`
 - `EvalError`
 - `Function`
 - `hasOwnProperty` (JSHint only)
 - `Infinity` (ESLint only)
 - `isFinite`
 - `isNaN`
 - `JSON`
 - `Map` (added to JSHint in version r11)
 - `Math`
 - `NaN` (added to JSHint in version r11, not in ESLint)
 - `Number`
 - `Object`
 - `parseInt`
 - `parseFloat`
 - `RangeError`
 - `ReferenceError`
 - `RegExp`
 - `Set` (added to JSHint in version r11)
 - `String`
 - `SyntaxError`
 - `TypeError`
 - `undefined` (ESLint only)
 - `URIError`
 - `WeakMap` (added to JSHint in version r11)
 - `WeakSet` (added to JSHint in version r11)


In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W079**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W079 */` directive.

In ESLint the rule that generates this warning is named `no-native-reassign`.
You can disable it by setting it to `0`, or enable it by setting it to `1`.

[ro]: /read-only
[jshintopts]: http://jshint.com/docs/#options
