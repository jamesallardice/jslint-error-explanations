<!---
{
    "titles": [
        "Unregistered property name '{a}'",
        "Unexpected /\\*property\\*/ '{a}'",
        "Unexpected /*member '{a}'",
        "W036"
    ],
    "slugs": [
        "unregistered-property-name",
        "unexpected-property",
        "unexpected-member",
        "w036"
    ],
    "linters": [
        "jslint",
        "jshint"
    ],
    "author": "jallardice"
}
-->

### History

This warning has existed in a number of forms in both JSLint and JSHint. It was
introduced in the original version of both and has remained ever since.

 - In JSLint versions dated before May 2015 the warning given is "Unexpected
   /\*property\*/ '{a}'"

 - In more recent versions the message has changed to "Unregistered property
   name '{a}'"

 - In JSHint the message has always been "Unexpected /*member '{a}'"

The situations that produce the warning have not changed despite changes to the
text of the warning itself.

### When do I get this error?

The "Unregistered property name '{a}'" error (and the alternatives, "Unexpected
/\*property\*/ '{a}'" and "Unexpected /\*member '{a}'") is thrown when JSLint or
JSHint encounters **a non-whitelisted property identifier**. In the following
example we are attempting to create an object literal with a property named `x`:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/*property y, z */
var obj = {
    x: 1
};
```

### Why do I get this error?

This error is raised to highlight a **possible typo** or a **deviation from a
code style guide**. Unless the message is indicating a typo it's likely that
your code will work without fault but you may be breaking rules set by your
organization.

This error will only be thrown if the linter configuration specifies a property
name whitelist. In JSLint this is likely to appear in the form of a `/*property
*/` directive at the top of the file. In older versions of JSLint `/*properties
*/` was also accepted. In JSHint the relevant directive is `/*members */`. Note
that the `/*members */` directive in JSHint is deprecated and this functionality
is likely to be removed in a future version.

To resolve the issue ensure you are only referencing properties that are
whitelisted. Alternatively, add the property identifier in question to the list.

```javascript
/*property x, y, z */
var obj = {
    x: 1
};
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W036**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W036 */` directive.

[jshintopts]: http://jshint.com/docs/#options
