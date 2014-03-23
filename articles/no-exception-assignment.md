<!---
{
    "titles": [
        "Do not assign to the exception parameter"
    ],
    "tools": [
        "jslint",
        "jshint"
    ],
    "author": "jallardice",
    "slugs": [
        "no-exception-assignment"
    ]
}
-->

### When do I get this error?

JSLint (prior to July 2013) and JSHint will throw the "Do not assign to the exception parameter" error when they
encounter **an assignment inside a `catch` block to the identifer associated with that block**. In the following example
we attempt to assign a new value to the exception parameter `e`:

```javascript
try {
    // Some code that might throw an exception
} catch (e) {
    e = 10;
}
```

Since July 2013, JSLint has removed this message and instead now reuses a different message, ["Read only](/read-only).
More detail may be found on the page for that message:

```javascript
try {
    // Some code that might throw an exception
} catch (e) {
    e = 10;
}
```

### Why do I get this error?

This error is raised to highlight **a lack of convention**. The obvious issue with assigning something to an exception
parameter is that you lose access to the value passed to the `catch` block completely. There is nothing like the
`arguments` object that will allow you to get back a reference to it. This could be confusing to other developers
maintaining your code in the future.

#### A note regarding the exception parameter

According to the ECMAScript specification, a `catch` block has its own lexical environment, which is created upon
entering the block. The lexical environment maintains a reference to the lexical environment from which it was entered,
which means you have access to variables defined in outer scopes. The lexical environment created when entering the
`catch` block gets a binding between the identifier and the exception value passed to the block ([ES5
&sect;12.14](http://es5.github.com/#x12.14)):

> The production *Catch* `: catch (` *Identifier* `)` *Block* is evaluated as follows:
>
>  1. Let *C* be the parameter that has been passed to this production.
>  2. Let *oldEnv* be the running execution context’s LexicalEnvironment.
>  3. Let *catchEnv* be the result of calling NewDeclarativeEnvironment passing oldEnv as the argument.
>  4. Call the CreateMutableBinding concrete method of *catchEnv* passing the *Identifier* String value as the
>     argument.
>  5. Call the SetMutableBinding concrete method of *catchEnv* passing the *Identifier*, *C*, and false as arguments...
>  6. Set the running execution context’s LexicalEnvironment to *catchEnv*.
>  7. Let *B* be the result of evaluating *Block*.
>  8. Set the running execution context’s LexicalEnvironment to *oldEnv*.
>  9. Return *B*.
>
> **NOTE** No matter how control leaves the <em>Block</em> the LexicalEnvironment is always restored to its former
> state.

That note at the end is important. When the `catch` block exits, we return to the original lexical environment. This
means that the binding for the identifier in the `catch` block will cease to exist (since the lexical environment that
contained it no longer exists).

However, in Internet Explorer 8 and below, the `catch` block identifier leaks into the outer scope. In those browsers,
you could accidently be assigning a value to the exception parameter, rather than a variable with the same identifier in
an outer scope. For more information, have a read of this [excellent article by Ben Alman](http://weblog.bocoup.com/the-
catch-with-try-catch/).

In JSHint 1.0.0 and above you have the ability to ignore any warning with a [special option
syntax](http://jshint.com/docs/#options). The identifier of this warning is **W022**. This means you can tell JSHint to
not issue this warning with the `/*jshint -W022 */` directive.
