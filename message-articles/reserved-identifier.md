<!---
{
    "titles": [
        "Expected an identifier and instead saw '{a}' (a reserved word)",
        "W024"
    ],
    "slugs": [
        "expected-an-identifier-and-instead-saw-a-a-reserved-word",
        "w024"
    ],
    "linters": [
        "jslint",
        "jshint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "Expected an identifier and instead saw '{a}' (a reserved word)" error is
thrown when JSLint or JSHint encounters **a reference to what should be an
identifier but is actually a keyword that is reserved by the language**. In the
following example we attempt to declare a variable with the identifier `default`
which is a reserved word:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var default = 10;
```

JSLint prior to September 2013 and JSHint prior to version 2.0.0 would also
raise this error when it encountered an object property identifier that is a
reserved word. This is valid in the ECMAScript 5 specification, but was not
valid previously. In this example we attempt to declare an object property with
the identifier `default`:

<!---
{
    "linter": "jshint",
    "version": "1.1.0"
}
-->
```javascript
var x = {
    default: "a default value"
};
```

### Why do I get this error?

This error is raised to highlight a **fatal JavaScript syntax error**. Your code
will not run if you do not fix this error. Reserved words are special
identifiers that are set aside by the ECMAScript specification for special use.
The specification defines three sets of reserved words. The first set is
"keywords", which are all used by the current version of the language. Here's
the full list ([ES5 &sect;7.6.1.1][es5-7.6.1.1]):

 - `break`
 - `case`
 - `catch`
 - `continue`
 - `debugger`
 - `default`
 - `delete`
 - `do`
 - `else`
 - `finally`
 - `for`
 - `function`
 - `if`
 - `in`
 - `instanceof`
 - `new`
 - `return`
 - `switch`
 - `this`
 - `throw`
 - `try`
 - `typeof`
 - `var`
 - `void`
 - `while`
 - `with`

The second set is "future reserved words", which are not currently used by the
language but are expected to be used in the future. They are reserved now so
that future code is backwards compatible. Here's the full list ([ES5
&sect;7.6.1.2][es5-7.6.1.2]):

 - `class`
 - `const`
 - `enum`
 - `export`
 - `extends`
 - `import`
 - `super`

The third set is made up of identifiers that are also considered future reserved
words, when they occur within strict mode code. JSLint will treat them in the
same way as all of the previously listed reserved words, regardless of whether
the code is in strict mode or not. Here's the list:

 - `implements`
 - `interface`
 - `let`
 - `package`
 - `private`
 - `protected`
 - `public`
 - `static`
 - `yield`

You may not use any of the words listed above as an identifier. The only way to
fix this issue is to change the name of your variable to something more
sensible.

For the second example above, this error is raised to highlight a **potential
JavaScript syntax error**. Your code will not run in browsers that do not
support this feature of ECMAScript 5 (notably Internet Explorer 8 and below). If
you do not care about these older browsers, you can tell JSLint to ignore this
syntax by using the `es5` directive (or updating to a more recent version of
JSLint):

<!---
{
    "linter": "jshint",
    "version": "1.1.0"
}
-->
```javascript
/*jshint es5: true */
var x = {
    default: "a default value"
};
```

However, if you *do* need your code to run in older browsers, you will need to
change your syntax slightly and quote the identifier so it's treated as a string
rather than a reserved word:

<!---
{
    "linter": "jshint",
    "version": "1.1.0"
}
-->
```javascript
var x = {
    "default": "a default value"
};
```

In JSHint 1.0.0 and above you have the ability to ignore any warning with a
[special option syntax][jshintopts]. The identifier of this warning is **W024**.
This means you can tell JSHint to not issue this warning with the `/*jshint
-W024 */` directive.

[es5-7.6.1.1]: http://es5.github.com/#x7.6.1.1
[es5-7.6.1.2]: http://es5.github.com/#x7.6.1.2
[jshintopts]: http://jshint.com/docs/#options
