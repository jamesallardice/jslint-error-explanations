<!---
{
    "titles": [
        "freeze"
    ],
    "slugs": [
        "option-jshint-freeze"
    ],
    "linters": [
        "jshint"
    ],
    "author": "jallardice",
    "subject": "option"
}
-->

### What does this option do?

The JSHint `freeze` option is used to disallow the extension of native object
prototypes. This is often viewed as bad practice and was a relatively common
source of bugs in older JavaScript environments. In the following example we
attempt to add a method to reverse strings to the native `String` object:

<!---
{
    "linter": "jshint"
}
-->
```javascript
/*jshint freeze: true */
String.prototype.reverse = function () {
    return this.split("").reverse().join("");
};
```

The option does not prevent extension of native prototypes via the
`Object.defineProperty` method since it allows you to safely extend such objects
with non-enumerable properties:

<!---
{
    "linter": "jshint"
}
-->
```javascript
/*jshint freeze: true */
Object.defineProperty(String.prototype, "reverse", {
    value: function () {
        return this.split("").reverse().join("");
    }
});
```

*Side note*: the implementation of string reversal above is naive because it
fails to take into account the way characters are encoded internally in
JavaScript. See [this Stack Overflow answer][reverse] for a great explanation.

### When should I use this option?

The use of the `freeze` JSHint option will cause an "[Extending prototype of
native object: '{a}'][native]" error, where "{a}" is the native prototype in
question, any time it encounters an assignment that matches the rules discussed
above. It's generally considered bad practice to extend native prototypes
because it makes it easier to introduce bugs related to property enumeration and
shadowing. See the article discussing the "[Extending prototype of native
object: '{a}'][native]" error message for more details.

Note that this is an *enforcing* option which means JSHint does not apply it by
default. If you do not explicitly set this option to `true` JSHint will allow
the extension of native prototypes anywhere in your code.

#### Recommendation

Set this option to `true` (disallows the extension of native prototypes).

[reverse]: http://stackoverflow.com/questions/958908/how-do-you-reverse-a-string-in-place-in-javascript/16776621#16776621
[native]: /extending-prototype-of-native-object
