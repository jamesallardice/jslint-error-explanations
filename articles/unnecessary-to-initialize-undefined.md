<!---
{
    "titles": [
        "It is not necessary to initialize '{a}' to 'undefined'",
        "W080"
    ],
    "tools": [
        "jslint",
        "jshint"
    ],
    "tags": [
        "variable"
    ],
    "contributors": [
        "jallardice"
    ],
    "slugs": [
        "it-is-not-necessary-to-initialize-a-to-undefined",
        "w080"
    ]
}
-->

### When do I get this error?

JSLint and JSHint will throw the "It is not necessary to initialize '{a}' to 'undefined'" error when they encounter **a variable statement in which the variable is explicitly initialized to `undefined`**. Here's an example in which we attempt to declare a variable `x` and assign `undefined` to it:

```javascript
var x = undefined;
```

### Why do I get this error?

This error is raised to highlight **a completely pointless piece of code**. Your code will run without error if you do not change it, but you're needlessly increasing the size of your script.

Since variable declarations are hoisted to the top of the scope in which they occur, and assignments happen in the expected place, variables are always initialized to `undefined` implicitly. The following is what happens when you enter a new scope ([ES5 &sect;10.5](http://es5.github.com/#x10.5)):

> 8. For each *VariableDeclaration*... *d* in source text order do
> &nbsp;&nbsp;&nbsp;&nbsp;a. Let *dn* be the *Identifier* in *d*.
> &nbsp;&nbsp;&nbsp;&nbsp;b. Let *varAlreadyDeclared* be the result of calling *env's* HasBinding concrete method passing *dn* as the argument.
> &nbsp;&nbsp;&nbsp;&nbsp;c. If *varAlreadyDeclared* is false, then
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;i. Call *env's* CreateMutableBinding concrete method passing *dn* and *configurableBindings* as the arguments.
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ii. Call *env's* SetMutableBinding concrete method passing *dn*, undefined, and *strict* as the arguments.


It's the last line that's interesting. Effectively, it creates a binding in the current scope between the given identifier and the value `undefined`. This shows that every variable has the value `undefined` when it is created. When the variable statement is actually parsed, it is assigned a value if an assignment expression is present as part of the statement (as it is in our example above). This is further clarified by the following ([ES5 &sect;12.2](http://es5.github.com/#x12.2)):

> Variables are initialised to undefined when created. A variable with an *Initialiser* is assigned the value of its *AssignmentExpression* when the *VariableStatement* is executed, not when the variable is created.

You can fix the error by simply removing the assignment expression from the variable statement. The variable will still have the same value:

```javascript
var x;
```

If, for whatever reason, you *have* to assign something to the variable, you can replace `undefined` with something that returns the `undefined` value. The simplest example of that is the `void` operator:

```javascript
var x = void 0;
```

If you have overwritten `undefined` so you're actually assigning a different value to your variable, use a more sensible identifier. There is no JSLint option to surpress this error.

In JSHint 1.0.0 and above you have the ability to ignore any warning with a [special option syntax](http://jshint.com/docs/#options). The identifier of this warning is **W080**. This means you can tell JSHint to not issue this warning with the `/*jshint -W080 */` directive.
