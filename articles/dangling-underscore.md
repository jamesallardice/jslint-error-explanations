<!---
{
    "titles": [
        "Unexpected dangling '_' in '{a}'",
        "W105"
    ],
    "slugs": [
        "unexpected-dangling-_-in-a",
        "w105"
    ],
    "linters": [
        "jslint",
        "jshint",
        "eslint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "Unexpected dangling '_' in '{a}'" error is thrown when JSLint, JSHint or
ESLint encounters **an identifier that begins or ends with the underscore
character**. JSHint will only raise this warning **when the `nomen` option is
set to `true`**. ESLint only raises this warning for **variable and function
identifiers** and not for object property identifiers. In the following example
we use several such identifiers:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/*jshint nomen: true */
var _x = 10,
    y = {
        z_: 20
    };

function _test() {
    "use strict";
    return true;
}
```

### Why do I get this error?

This error is raised to highlight a **lack of convention**. Your code will run
without error if you do not change it, but could be confusing to other
developers, and could also indicate a lack of understanding of the language.

Identifiers prefixed with the underscore character are often used to indicate a
private variable. Since JavaScript doesn't have a real notion of "private", this
can be misleading.

If you're using JSLint, you can fix the error by setting the `nomen` (short for
nomenclature) option to true. Conversely, if you're using JSHint, you can simply
remove the same option:

<!---
{
    "linter": "jslint"
}
-->
```js
/*jslint nomen: true */
var _x = 10,
    y = {
        z_: 20
    };

function _test() {
    "use strict";
    return true;
}
```

Alternatively, you can simply remove the underscore character from the start or
end of your identifiers (note that use of this character elsewhere in
identifiers is accepted):

<!---
{
    "linter": "jslint"
}
-->
```js
/*jshint nomen: true */
var x = 10,
    y = {
        z: 20
    };

function test_with_underscores() {
    "use strict";
    return true;
}
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W105**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W105 */` directive.

[es5-12.2]: http://es5.github.com/#x12.2
[jshintopts]: http://jshint.com/docs/#options
