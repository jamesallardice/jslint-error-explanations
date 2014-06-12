<!---
{
    "titles": [
        "This function has too many parameters. ({a})",
        "Too many parameters per function ({a})",
        "This function has too many parameters ({a}). Maximum allowed is {b}",
        "W072"
    ],
    "slugs": [
        "this-function-has-too-many-parameters",
        "too-many-parameters-per-function",
        "this-function-has-too-many-parameters-a",
        "w072"
    ],
    "linters": [
        "jshint",
        "eslint"
    ],
    "author": "jallardice"
}
-->

### History

This warning has existed in two forms in JSHint and ESLint. It has never
existing in JSLint. It was introduced in the r11 version of JSHint and has
remained both JSHint and ESLint ever since.

 - In JSHint prior to version 1.0.0 the warning given is "Too many parameters
   per function. ({a})"

 - In JSHint 1.0.0 and above the message is "This function has too many
   parameters ({a})"

 - In ESLint the message is the slightly more descriptive "This function has too
   many parameters ({a}). Maximum allowed is {b}"

The situations that produce the warning have not changed despite changes to the
text of the warning itself.

### When do I get this error?

The "Too many parameters    per function. ({a})" error, and the alternative
"This function has too many    parameters ({a})", is thrown when JSHint or
ESLint encounters an attempt to **a function signature with more named
parameters than specified by the configuration**. In JSHint the configuration is
controlled by the `maxparams` option. In ESLint it's `max-params`. Here's an
example in which we attempt to declare a function that takes 3 arguments:

<!---
{
    "linter": "jshint"
}
-->
```javascript
/*jshint maxparams: 2 */
/*eslint max-params: [1, 2] */
function Person(name, age, gender) {
    "use strict";
    this.name = name;
    this.age = age;
    this.gender = gender;
}
```

### Why do I get this error?

This error is raised to highlight a **deviation from a coding style**. The
ECMAScript standard does not specify a minimum or maximum number of arguments a
function (the following excerpt applies to function declarations but the grammar
for function expressions is almost identical) can accept ([ES5
&sect;13][es5-13]):

> *FunctionDeclaration* :<br>
> &nbsp;&nbsp;&nbsp;&nbsp;`function` *Identifier* `(`
> *FormalParameterList*<sub>opt</sub> `) {` *FunctionBody* `}`<br><br>
>
> *FormalParameterList* :<br>
> &nbsp;&nbsp;&nbsp;&nbsp;*Identifier*<br>
> &nbsp;&nbsp;&nbsp;&nbsp;*FormalParameterList* `,` *Identifier*

You can see from the grammar quoted above that any number of formal parameters
are valid syntax. However, you may wish to enforce a maximum number to help keep
code readable and maintainable. A common strategy is to accept a single argument
e.g. `options`, which is usually an object with various properties. We could
rewrite our `Person` constructor from the example above to use a single named
parameter and therefore conform to the specified coding style:

<!---
{
    "linter": "jshint"
}
-->
```javascript
/*jshint maxparams: 2 */
/*eslint max-params: [1, 2] */
function Person(options) {
    "use strict";
    this.name = options.name;
    this.age = options.age;
    this.gender = options.gender;
}
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W072**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W072 */` directive.

In ESLint the rule that generates this warning is named `max-params`. You can
disable it by setting it to `0`, or enable it by setting it to `1`.

[es5-13]: http://es5.github.com/#x13
[jshintopts]: http://jshint.com/docs/#options
