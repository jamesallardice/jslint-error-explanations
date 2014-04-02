<!---
{
    "titles": [
        "Use a named parameter"
    ],
    "slugs": [
        "use-a-named-parameter"
    ],
    "linters": [
        "jslint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "Use a named parameter" error is thrown when JSLint encounters a **access a
property of the arguments object by numerical index**. The following example
adds two numbers. Since the function has no named parameters it uses the
`arguments` object:

<!---
{
    "linter": "jslint"
}
-->
```javascript
function add2() {
    "use strict";
    return arguments[0] + arguments[1];
}
```

### Why do I get this error?

This error is raised to highlight **potentially slow and potentially confusing
code**. Using the `arguments` object is slow. Many JavaScript engines will not
actually create the object unless you reference it within a function. Running a
[benchmark][perf] in Chrome 30.0 reveals a 54% performance improvement when
using named arguments.

As well as the performance issues, using the `arguments` object over named
parameters harms the readability of your code. It is much easier to understand
what a function is going to do, and what you should be passing it, when that
information is available from the signature. To solve this error, simply use
named function parameters where possible:

<!---
{
    "linter": "jslint"
}
-->
```javascript
// This is much easier to understand
function add2(firstNumber, secondNumber) {
    "use strict";
    return firstNumber + secondNumber;
}
```

Note, however, that there are valid use cases for the `arguments` object. JSLint
will only warn when you attempt to access a property of it by numeric index. The
reason for this is that if you know the position of the argument in the list,
there should be no reason you cannot give it an identifier in the function
signature. Here's an example of a slightly more useful `add` function which uses
the `arguments` object to allow the addition of any number of arguments:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/*jslint plusplus: true */
function add() {

    "use strict";

    var total = 0,
        i;

    for (i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }

    return total;
}
```

This passes JSLint because we are no longer using a numeric index directly to
access an argument. Even though `i` refers to a number JSLint will allow this to
pass as it's a valid use case for the `arguments` object.

[perf]: http://jsperf.com/named-arguments-vs-arguments-object
