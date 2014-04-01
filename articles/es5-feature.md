<!---
{
    "titles": [
        "This is an ES5 feature"
    ],
    "slugs": [
        "this-is-an-es5-feature"
    ],
    "linters": [
        "jslint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

This is one of many generic error messages uses by JSLint in a number of
situations. Most of these cases are covered in detail by dedicated articles.
Following is a list of situations that will cause JSLint to generate this
message. Where possible the cause is linked to a more detailed page:

 - The use of a [multiline string][multistr]

 - The use of [object property getters or setters][getset]

[multistr]: /bad-escapement-of-eol-use-option-multistr-if-needed
[getset]: /get-set-are-es5-features
