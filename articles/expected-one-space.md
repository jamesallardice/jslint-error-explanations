<!---
{
    "titles": [
        "Expected exactly one space between '{a}' and '{b}'"
    ],
    "slugs": [
        "expected-exactly-one-space-between-a-and-b"
    ],
    "linters": [
        "jslint"
    ],
    "author": "jallardice"
}
-->

### When do I get this error?

The "Expected exactly one space between '{a}' and '{b}'" error is thrown when
JSLint encounters **a number of spaces that is not equal to one** in the
following situations (there are numerous other examples that can cause this
error, but these are some of the common ones):

Between any keyword (such as `if`, `for` or `while`) and its associated opening
parenthesis:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var x = true;
if(x) {
    x = false;
}
```

Between the `function` keyword and its associated opening parenthesis, when the
function is parsed as an expression (but not when it's parsed as a function
declaration):

<!---
{
    "linter": "jslint"
}
-->
```javascript
var x = function() {
    "use strict";
    return true;
};
```

Between a closing parenthesis and its associated opening curly brace (such as in
a function statement, `if` statement, `switch` statement etc):

<!---
{
    "linter": "jslint"
}
-->
```javascript
var x = true;
if (x){
    x = false;
}
```

### Why do I get this error?

This error is raised to highlight a **lack of convention** and a **deviation
from a coding style**. Your code will run without error if you do not change it,
but may contravene best practices and look messy to other developers. If you are
happy with your coding style, you can tell JSLint to ignore whitespace (or the
lack of whitespace) by setting the `white` option to true:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/*jslint white: true */
var x = true;
if (x){
    x = false;
}
```

However, if you are using JSLint to [enforce a consistent style][style], you
will probably want to listen to what the error tells you, and just make sure you
always use the correct whitespace:

<!---
{
    "linter": "jslint"
}
-->
```javascript
var x = true;
if (x){
    x = false;
}
```

[style]: http://globaldev.co.uk/2012/11/maintaining-consistent-javascript-with-jslint
