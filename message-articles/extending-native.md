<!---
{
    "titles": [
        "Extending prototype of native object: '{a}'",
        "{a} prototype is read only, properties should not be added",
        "W121"
    ],
    "slugs": [
        "extending-prototype-of-native-object",
        "a-prototype-is-read-only",
        "w121"
    ],
    "linters": [
        "jshint",
        "eslint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "Extending prototype of native object: '{a}'" error, and the alternative
"{a} prototype is read only, properties should not be added" error, is thrown
when JSHint (only versions 2.3.0 and above) or ESLint encounters **a assignment
to a property of the `prototype` of a native object*. JSHint will only raise
this warning if the `freeze` option is set to `true`. The following example
defines a `reverse` method on the native `String` prototype:

<!---
{
    "linter": "jshint"
}
-->
```javascript
/*jshint freeze: true */
String.prototype.reverse = function () {
    "use strict";
    return this.split("").reverse().join("");
};
```

ESLint will also issue the warning when the `Object.defineProperty` method is
used. JSHint does not warn in this situation:

<!---
{
    "linter": "eslint"
}
-->
```javascript
/*jshint freeze: true */
Object.defineProperty(String.prototype, "reverse", {
    value: function () {
        "use strict";
        return this.split("").reverse().join("");
    }
});
```

*Side note*: the implementation of string reversal above is naive because it
fails to take into account the way characters are encoded internally in
JavaScript. See [this Stack Overflow answer][reverse] for a great explanation.

### Why do I get this error?

This error is raised to highlight the use of a technique commonly regarded as
**bad practice**. By defining custom properties on native prototypes you can
easily introduce problems in old browsers (in particular Internet Explorer 8 and
below). The first pattern shown above will result in an enumerable property on
`String.prototype`. If this is done to `Object.prototype` the new property will
be produced by the `for...in` construct causing unexpected iterations of the
loop.

It's also very easy to accidentally shadow custom native prototype methods. For
example, imagine you have defined a `count` method on `Object.prototype` which
returns the number of properties an object has. If any object defines its own
`count` property as part of the program logic the prototype method will be
shadowed and inaccessible via the normal member operator. This makes it easy to
introduce bugs and can also affect third party code.

In ESLint the rule that generates this warning is named `no-extend-native`. You
can disable it by setting it to `0`, or enable it by setting it to `1`.

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W121**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W121 */` directive. You can also set the `freeze` option to `false`.

[reverse]: http://stackoverflow.com/questions/958908/how-do-you-reverse-a-string-in-place-in-javascript/16776621#16776621
[jshintopts]: http://jshint.com/docs/#options
