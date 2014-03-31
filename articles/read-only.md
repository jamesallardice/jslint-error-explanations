<!---
{
    "titles": [
        "Read only",
        "{a} is a read-only native object",
        "W020"
    ],
    "slugs": [
        "read-only",
        "a-is-a-read-only-native-object",
        "w020"
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

This warning has existed in two forms across the three main linters. It was
introduced in the original version of JSLint and has remained (in a way) in all
three tools ever since.

 - In JSLint and JSHint the warning given is "Read only"

 - In ESLint the message has always been "{a} is a read-only native object"

The situations that produce the warning have not changed despite changes to the
text of the warning itself.

### When do I get this error?

The "Read only" error, and the alternative "{a} is a read-only native object",
is thrown when JSLint, JSHint or ESLint encounters **assign a value to built-in
native object**. In the following example we attempt to overwrite the native
global `String` constructor function:

<!---
{
    "linter": "jslint"
}
-->
```javascript
String = function () {
    "use strict";
    return "Overwritten";
};
```

Between April 2013 and August 2013 JSLint also produced this message when it
encountered **an assignment inside a `catch` block to the identifer associated
with that block**. This message was used instead of the older "[Do not assign to
the exception parameter][exassign]" warning. Please see the page for that
message for more details. The rest of this article will apply only to the above
cause. In August 2013 this functionality was removed from JSLint:

<!---
{
    "linter": "jslint",
    "version": "2013-03-28"
}
-->
```javascript
try {
    // Some code that might throw an exception
    throw new Error();
} catch (e) {
    e = 10;
}
```

### Why do I get this error?

This error is raised to highlight a ** potentially dangerous piece of code**.
Your code may work properly if you do not fix this error, but it may be
confusing to others, especially at first glance to someone quickly searching
through your script, and it may break third party scripts.

It is perfectly valid to overwrite any of the native built-in functions, but
there are limited use cases for it. JSLint and JSHint both forbid this practice
completely and do not provide an option to allow it. The list of objects treated
as "read only" is as follows. Each item applies to all versions of JSLint,
JSHint and ESLint unless noted otherwise:

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
 - `Map` (added to JSLint in September 2013 and to JSHint in version r11)
 - `Math`
 - `NaN` (added to JSHint in version r11, not in JSLint or ESLint)
 - `Number`
 - `Object`
 - `parseInt`
 - `parseFloat`
 - `Promise` (added to JSLint in September 2013, not in JSHint or ESLint)
 - `Proxy` (added to JSLint in September 2013, not in JSHint or ESLint)
 - `RangeError`
 - `ReferenceError`
 - `Reflect` (added to JSLint in September 2013, not in JSHint or ESLint)
 - `RegExp`
 - `Set` (added to JSLint in September 2013 and to JSHint in version r11)
 - `String`
 - `Symbol` (added to JSLint in September 2013, not in JSHint or ESLint)
 - `SyntaxError`
 - `System` (added to JSLint in September 2013, not in JSHint or ESLint)
 - `TypeError`
 - `undefined` (ESLint only)
 - `URIError`
 - `WeakMap` (added to JSLint in September 2013 and to JSHint in version r11)
 - `WeakSet` (added to JSLint in September 2013 and to JSHint in version r11)

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W020**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W020 */` directive.

[exassign]: /do-not-assign-to-the-exception-parameter
[jshintopts]: http://jshint.com/docs/#options
