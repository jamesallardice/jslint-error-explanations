<!---
{
    "titles": [
        "Use a named parameter"
    ],
    "tools": [
        "jslint"
    ],
    "author": "jallardice",
    "slugs": [
        "use-a-named-parameter"
    ]
}
-->

### When do I get this error?

JSLint will throw the "Use a named parameter" error when it encounters an attempt to **access a property of the
`arguments` object by numerical index**. In the following example we assign the first function argument to `x`:

```javascript
function add2() {
    "use strict";
    return arguments[0] + arguments[1];
}
```

### Why do I get this error?

This error is raised to highlight a **potentially slow and potentially confusing piece of code**. Using the `arguments`
object is slow. Many JavaScript engines will not actually create the object unless you access it within a function.
Running [a benchmark](http://jsperf.com/named-arguments-vs-arguments-object) in Chrome 30.0 reveals a 54% performance
improvement when using named arguments:

![JSPerf results][http://jslinterrors.com/assets/images/1832-01-01-1.png]

As well as the performance issues, using the `arguments` object over named parameters harms the readability of your
code. It is much easier to understand what a function is going to do, and what you should be passing it, when that
information is available from the signature. To solve this error, simply use named function parameters where possible:

```javascript
// This is much easier to understand
function add2(firstNumber, secondNumber) {
    "use strict";
    return firstNumber + secondNumber;
}
```

Note, however, that there are valid use cases for the `arguments` object. JSLint will only warn when you attempt to
access a property of it by numeric index. The reason for this is that if you know the position of the argument in the
list, there should be no reason you cannot give it an identifier in the function signature.
