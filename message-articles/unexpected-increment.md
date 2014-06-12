<!---
{
    "titles": [
        "Unexpected '++'",
        "Unexpected '--'",
        "Unary operator '++' used",
        "Unary operator '--' used"
    ],
    "slugs": [
        "unexpected-plus-plus",
        "unexpected-minus-minus",
        "unary-operator-plus-plus-used",
        "unary-operator-minus-minus-used",
        "unexpected-increment",
        "unexpected-decrement"
    ],
    "linters": [
        "jslint",
        "eslint"
    ],
    "author": "jallardice"
}
-->

### History

This warning has existed in two forms in JSLint and ESLint. It was introduced in
the original version of JSLint and has remained in both tools since. It is not
present in JSHint.

 - In JSLint the warning given is "Unexpected '++'" (or "Unexpected '--'")

 - In ESLint the message has always been "Unary operator '++' used" (or "Unary
   operator '--' used")

The situations that produce the warning have not changed despite changes to the
text of the warning itself.

### When do I get this error?

The "Unexpected '++'" error, and the alternative "Unary operator '++' used", is
thrown when JSLint or ESLint encounters a **use of the increment or decrement
operators**. In ESLint the warning is only raised if the `no-plusplus` option is
set to `1`. Here's an example:

<!---
{
    "linter": "jslint",
    "eslint": {
        "no-plusplus": 1
    }
}
-->
```javascript
var x = 1,
    y = 10;

x++;
y--;
```

### Why do I get this error?

This error message is perhaps the most debated of all JSLint error messages. It
exists solely to warn you that JSLint has encountered a **violation of a
specific coding style**. The style in question is the style of the author of
JSLint, Douglas Crockford. For his reasoning, you can read the [JSLint
documentation][doc]:

> The ++ (increment) and -- (decrement) operators have been known to contribute
> to bad code by encouraging excessive trickiness. They are second only to
> faulty architecture in enabling to viruses and other security menaces. Also,
> preincrement/postincrement confusion can produce off-by-one errors that are
> extremely difficult to diagnose.

There are many JavaScript developers who disagree with that, but the fact
remains, it's a rule in JSLint so you need a way to work around it. What JSLint
would prefer you to do is use the normal addition and subtraction operators,
which can be combined with the assignment operator for a slight decrease in
length:

<!---
{
    "linter": "jslint",
    "eslint": {
        "no-plusplus": 1
    }
}
-->
```javascript
var x = 1,
    y = 10;

x = x + 1; // or x += 1;
y = y - 1; // or y -= 1;
```

If you would prefer not to do that, and would rather stick with the normal
increment and decrement operators, you can set the `plusplus` option to `true`
to tell JSLint to allow them:

<!---
{
    "linter": "jslint",
    "eslint": {
        "no-plusplus": 1
    }
}
-->
```javascript
/*jslint plusplus: true */
var x = 1,
    y = 10;

x++;
y--;
```

In ESLint the rule that generates this warning is named `no-plusplus`. You
can disable it by setting it to `0`, or enable it by setting it to `1`.

[doc]: http://www.jslint.com/lint.html#inc
