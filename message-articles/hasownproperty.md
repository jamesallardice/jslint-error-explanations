<!---
{
    "titles": [
        "'hasOwnProperty' is a really bad name",
        "W001"
    ],
    "slugs": [
        "hasownproperty-is-a-really-bad-name",
        "w001"
    ],
    "linters": [
        "jshint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "'hasOwnProperty' is a really bad name" error is thrown when JSHint
encounters **an assignment to an object property with the identifier
`hasOwnProperty`**. This applies to both object literals and to normal
assignment statements. In the following example we define an object with a
property called `hasOwnProperty`:

<!---
{
    "linter": "jshint"
}
-->
```javascript
var demo = {
    hasOwnProperty: 1
};
```

### Why do I get this error?

This error is raised to highlight **confusing code that could cause problems in
the future**. Your code may run as expected but it's likely to cause issues with
maintenance and be confusing to other developers.

Most objects in JavaScript have access (via inheritance from `Object.prototype`)
to the `hasOwnProperty` method which is used to check whether a given property
is defined on a given object. This method is commonly used within `for...in`
loops to ensure only enumerable properties of the object in question are
handled, and not enumerable properties of objects further down its prototype
chain. See the somewhat related "[The body of a for in should be wrapped in an
if statement to filter unwanted properties from the prototype][forin]" error for
more details:

<!---
{
    "linter": "jshint"
}
-->
```javascript
/*global doSomething */
var me = {
    name: "James",
    age: 23
};

for (var prop in me) {
    if (me.hasOwnProperty(prop)) {
        doSomething(prop);
    }
}
```

In that example, were you to add a property `hasOwnProperty: 1` to `me`, the
guard in the `for...in` loop would fail with an error telling you that
`hasOwnProperty` is not a function. If the value of your custom `hasOwnProperty`
is a function then it will be invoked and the code may work but would be very
misleading to anyone else reading.

The solution to this error is to simply not use `hasOwnProperty` as a property
identifier. If you are concerned that the value of `hasOwnProperty` is no longer
the native function you may want to call the native function in the context of
your object in `for...in` loop guards:

<!---
{
    "linter": "jshint"
}
-->
```javascript
/*global doSomething */
var me = {
    name: "James",
    age: 23,
    hasOwnProperty: 1 // This would cause the previous example to fail
};

for (var prop in me) {
    if (Object.hasOwnProperty.call(me, prop)) { // Use the real hasOwnProperty
        doSomething(prop);
    }
}
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this
warning is **W001**. This means you can tell JSHint to not issue this warning
with the `/*jshint -W001 */` directive.

[forin]: /the-body-of-a-for-in-should-be-wrapped-in-an-if-statement
[jshintopts]: http://jshint.com/docs/#options
