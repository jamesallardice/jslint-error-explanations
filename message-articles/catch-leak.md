<!---
{
    "titles": [
        "Value of '{a}' may be overwritten in IE8 and earlier",
        "W002"
    ],
    "slugs": [
        "value-of-a-may-be-overwritten-in-ie8",
        "w002"
    ],
    "linters": [
        "jshint",
        "eslint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "Value of '{a}' may be overwritten in IE8 and earlier" error is thrown when
JSHint or ESLint encounters **a `try...catch` statement in which the `catch`
identifier is the same as a variable or function identifier**. The error is only
raised when the identifier in question is declared in the same scope as the
`catch`. In the following example we declare a variable, `a`, and then use `a`
as the identifier in the `catch` block:

<!---
{
    "linter": "jshint"
}
-->
```javascript
var a = 1;
try {
    b();
} catch (a) {}
```

JSLint will also raise an error in this situation but it uses the more generic
"'{a}' is already defined" message.

### Why do I get this error?

This error is raised to highlight **code that may not work as you expect in
older browsers**. In modern browsers you code will run without any problems but
in Internet Explorer 8 and below you may end up with hard-to-trace bugs.

The ECMAScript 5 specification shows that the identifier of a `catch` block
should be bound to a new declarative environment, created especially for the
`catch` block, rather than that of the enclosing scope ([ES5 12.14][es5-12.14]):

> The production *Catch*: `catch (` *Identifier* `)` *Block* is evaluated as
> follows:<br>
> 1. Let *C* be the parameter that has been passed to this production.
> 2. Let *oldEnv* be the running execution context's LexicalEnvironment.
> 3. Let *catchEnv* be the result of calling NewDeclarativeEnvironment passing
> *oldEnv* as the argument.
> 4. Call the CreateMutableBinding concrete method of *catchEnv* passing the
> *Identifier* String value as the argument.
> 5. Call the SetMutableBinding concrete method of *catchEnv* passing the
> *Identifier*, *C* and false as arguments. Note that the last argument is
> immaterial in this situation.
> 6. Set the running execution context's LexicalEnvironment to *catchEnv*.
> 7. Let *B* be the result of evaluating *Block*.
> 8. Set the running execution context's LexicalEnvironment to *oldEnv*.
> 9. Return *B*.

Effectively this says that a `catch` block has its own lexical environment to
which its identifier is bound. When the `catch` block has been executed the
running execution context's lexical environment is reset to the state it was in
before the `catch` block. The running execution context is the scope in which
the `catch` block occurs. This works as stated in all modern browsers but in
Internet Explorer 8 and below the identifier of the `catch` block appears to be
bound to the running execution context's lexical environment rather than that of
the `catch` block. The result is that an existing variable with the same
identifier will be overwritten with the value of the exception. For an excellent
in-depth analysis of this bug see [The "catch" with try...catch][ben] by Ben
Alman.


To resolve this issue simply ensure your exception parameter has an identifier
unique to its scope:

<!---
{
    "linter": "jshint"
}
-->
```javascript
var a = 1;
try {
    b();
} catch (e) {}
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this
warning is **W002**. This means you can tell JSHint to not issue this warning
with the `/*jshint -W002 */` directive.

[es5-12.14]: http://es5.github.io/#12.14
[ben]: http://weblog.bocoup.com/the-catch-with-try-catch/
[jshintopts]: http://jshint.com/docs/#options
