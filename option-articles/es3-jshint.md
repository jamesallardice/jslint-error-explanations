<!---
{
    "titles": [
        "es3"
    ],
    "slugs": [
        "option-jshint-es3"
    ],
    "linters": [
        "jshint"
    ],
    "author": "jallardice",
    "subject": "option"
}
-->

### What does this option do?

The JSHint `es3` option is used to tell JSHint that your code will be running in
a ECMAScript 3 environment (as opposed to ECMAScript 5, which is the current
version of the standard). It was introduced in JSHint 2.0.0. This will disallow
the use of various ES5 features and enable various error messages that apply
only to older ES3 environments (such as Internet Explorer 8 and below). The
following example defines a setter and a getter on an object. These features
were introduced in the ES5 specification:

<!---
{
    "linter": "jshint"
}
-->
```javascript
/*jshint es3: true */
var person = {
    firstName: "James",
    lastName: "Brown",
    get name () {
        return this.firstName + " " + this.lastName;
    },
    set fullName (name) {
        var parts = name.split(" ");
        this.firstName = parts[0];
        this.lastName = parts[1];
    }
};
```

### What errors can it cause?

 - "[Missing radix parameter][radix]"

 - "[Expected an identifier and instead saw '{a}' (a reserved word)][reserved]"

 - "[Extra comma. (it breaks older versions of IE)][comma]"

 - "[get/set are ES5 features][getset]"

### When should I use this option?

The use of the `es3` JSHint option can cause various error messages that would
not be produced otherwise. This is a good thing, but only if your code has to
run in environments that do not conform to ECMAScript 5.

Note that this is an *enforcing* option which means JSHint does not apply it by
default. If you do not explicitly set this option to `true` JSHint will allow
the use of ES5 features anywhere in your code. Also note that if you're using an
older version of JSHint (prior to 2.0.0) this option will be unavailable and
JSHint will *disallow* the use of ES5 features by default.

#### Recommendation

Set this option to `true` if you need to support Internet Explorer 8 and below.

[radix]: /missing-radix-parameter
[reserved]: /expected-an-identifier-and-instead-saw-a-a-reserved-word
[comma]: /extra-comma
[getset]: /get-set-are-es5-features
