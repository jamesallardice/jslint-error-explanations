<!---
{
    "titles": [
        "Function statements should not be placed in blocks",
        "Function declarations should not be placed in blocks",
        "W082"

    ],
    "slugs": [
        "function-statements-should-not-be-placed-in-blocks",
        "function-declarations-should-not-be-placed-in-blocks",
        "w082"
    ],
    "linters": [
        "jslint",
        "jshint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "Function statements should not be placed in blocks" error (and the
alternative "Function declarations should not be placed in blocks" error) is
thrown when JSLint or JSHint encounters **a function declaration inside a block
statement**. In the following example we attempt to declare the `example`
function only if some condition is true:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var x = true;
if (x) {
    function example() {
        "use strict";
        return true;
    }
}
```

### Why do I get this error?

This error is raised to highlight **code that may not work as you expect it
to**. In most environments Your code will run without error, but maybe not in
the way you expect. In some environments it could cause a **fatal syntax
error**.

Function declarations (or "function statements" as they are misleadingly called
in the JSLint error message) are hoisted to the top of the scope in which they
appear, as described by Declaration Binding Instantiation ([ES5
&sect;10.5][es5-10.5]). Therefore, it is not possible to conditionally declare a
function with a function statement. The above example is actually interpreted as
follows:

<!---
{
    "linter": "jslint"
}
-->
```javascript
function example() {
    "use strict";
    return true;
}
var x = true;
if (x) {}
```

As you can see, regardless of the result of the condition, the example function
is always declared. If you were to, for example, declare it twice (once in an if
block and once in the corresponding else block) you would actually end up with
the second declaration overwriting the first regardless of the result of the
condition.

Since assignments are not hoisted (they happen where you expect them to), if you
want to declare a function conditionally, you can use a function expression,
instead of a function declaration. A function expression can easily by produced
by assigning a function to a variable:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var x = true,
    example;

if (x) {
    example = function () {
        "use strict";
        return true;
    };
}
```

#### Syntax errors

It's important to note that there is no support in the ECMAScript 5
specification for function declarations within block statements. However, most
engines are happy to parse the code and not generate a syntax error. There is a
note about this in the spec ([ES5 &sect;12][es5-12]):

> Several widely used implementations of ECMAScript are known to support the use
> of FunctionDeclaration as a Statement. However there are significant and
> irreconcilable variations among the implementations in the semantics applied
> to such *FunctionDeclarations*. Because of these irreconcilable difference,
> the use of a *FunctionDeclaration* as a *Statement* results in code that is
> not reliably portable among implementations. It is recommended that ECMAScript
> implementations either disallow this usage of *FunctionDeclaration* or issue a
> warning when such a usage is encountered. Future editions of ECMAScript may
> define alternative portable means for declaring functions in a *Statement*
> context.

Unfortunately the misleading use of the term "statement" in the message produced
by JSLint doesn't help in this regard. A function declaration is not a statement
as defined by the spec. There *is* such thing as a function statement in
Mozilla's implementation but this is a non-standard addition that should not be
relied upon.

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W082**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W082 */` directive.

[es5-12]: http://es5.github.io/#x12
[jshintopts]: http://jshint.com/docs/#options
