<!---
{
    "titles": [
        "A constructor name should start with an uppercase letter",
        "A constructor name '{a}' should start with an uppercase letter"
        "W055"
    ],
    "slugs": [
        "a-constructor-name-should-start-with-an-uppercase-letter",
        "a-constructor-name-a-should-start-with-an-uppercase-letter",
        "w055"
    ],
    "linters": [
        "jslint",
        "jshint",
        "newcap"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "A constructor name should start with an uppercase letter" error is thrown
when JSLint, JSHint or ESLint encounters **an identifier, preceded by the `new`
operator, whose first character is a lowercase letter**. JSHint will only raise
this warning **when the `newcap` option is set to `true`**. In the following
example we declare a constructor function `myConstructor` and then attempt to
instantiate it:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/*jshint newcap: true */
function myConstructor() {
    "use strict";
    this.property = "Something";
}

var myInstance = new myConstructor();
```

### Why do I get this error?

This error is raised to highlight a **lack of convention**. It is common practice for constructor function identifiers to begin with an uppercase letter. JSLint simply enforces this convention. Here's the above snippet rewritten to pass JSLint. Notice that the only difference is the uppercase "M":

<!---
{
    "linter": "jslint"
}
-->
```js
/*jshint newcap: true */
function MyClass() {
    "use strict";
    this.property = "Something";
}

var myInstance = new MyClass();
```

It is worth bearing in mind that this is only a convention and is not required
by the language in any way. You can safely ignore this error if you prefer to
name your constructor functions differently. By setting the `newcap` option, you
can tell JSLint to allow lowercase constructors.

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W055**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W055 */` directive.

[es5-12.2]: http://es5.github.com/#x12.2
[jshintopts]: http://jshint.com/docs/#options
