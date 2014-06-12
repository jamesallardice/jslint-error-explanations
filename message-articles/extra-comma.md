<!---
{
    "titles": [
        "Extra comma. (it breaks older versions of IE)",
        "Trailing comma",
        "Unexpected ','",
        "W070"
    ],
    "slugs": [
        "extra-comma",
        "trailing-comma",
        "w070"
    ],
    "linters": [
        "jslint",
        "jshint",
        "eslint"
    ],
    "author": "jallardice"
}
-->

### History

This warning has existed in various forms across the three main linters. It was
introduced in the original version of JSLint and has remained in all three tools
ever since.

 - In JSLint the warning given is the generic *"Unexpected ','"*

 - In JSHint the message used is *"Extra comma. (it breaks older versions of
   IE)"*

 - In ESLint the message has always been *"Trailing comma"*

The situations that produce the warning have not changed despite changes to the
text of the warning itself.

### When do I get this error?

The "Extra comma. (it breaks older versions of IE)" error (and the alternative
"Trailing comma" and "Unexpected ',' errors") are thrown when JSLint, JSHint and
ESLint encounter **a comma following the final element of an array literal** or
**a comma following the final value in an object literal**. Since version 2.0.0
JSHint will only raise this warning if the `es3` option is set to `true`. Here's
an example:

<!---
{
    "linter": "jshint"
}
-->
```javascript
/*jshint es3: true */
var x = {
    prop1: 10,
    prop2: 20,
};
```

### Why do I get this error?

This error is raised to highlight a **potential fatal syntax error**. When it
comes to object literals, the difference in the ECMAScript specification from
version 3 to version 5 is quite clear. Here's the relevant snippet of grammar
from the ES3 spec:

> *ObjectLiteral* :<br>
> &nbsp;&nbsp;&nbsp;&nbsp;`{ }`<br>
> &nbsp;&nbsp;&nbsp;&nbsp;`{` *PropertyNameAndValueList* `}`

The *PropertyNameAndValueList* production simply gives the grammar for property
names and values, followed by a comma if that comma is followed by another
property name and value. When you compare that with the same section from the
ECMAScript 5 specification you can see a simple addition that makes it possible
to include a trailing comma after the final property name and value ([ES5
&sect;11.1.5][es5-11.1.5]):

> *ObjectLiteral* :<br>
> &nbsp;&nbsp;&nbsp;&nbsp;`{ }`<br>
> &nbsp;&nbsp;&nbsp;&nbsp;`{` *PropertyNameAndValueList* `}`<br>
> &nbsp;&nbsp;&nbsp;&nbsp;`{` *PropertyNameAndValueList* `, }`

In environments that do not support ECMAScript 5, the above code will cause a
syntax error. Therefore, if you may need to support such environments, it's best
to remove the trailing comma:

<!---
{
    "linter": "jshint"
}
-->
```javascript
/*jshint es3: true */
var x = {
    prop1: 10,
    prop2: 20
};
```

In the case of array literals the situation is a bit less clear. The
specification does not differ from ECMAScript 3 to 5 and has always allowed the
use of a trailing comma ([ES5 &sect;11.1.4][es5-11.1.4]):

> *ArrayLiteral* :<br>
> &nbsp;&nbsp;&nbsp;&nbsp;`[` *Elison*<sub>opt</sub> `]`<br>
> &nbsp;&nbsp;&nbsp;&nbsp;`[` *ElementList* `]`<br>
> &nbsp;&nbsp;&nbsp;&nbsp;`[` *ElementList* `,` *Elison*<sub>opt</sub> `]`

Unfortunately, browser implementations of ECMAScript differ in their treatment
of trailing commas. More recent environments will all treat such syntax as
valid, as per the spec. As with object literals, if your code might need to run
is pre-ES5 environments, it's highly recommended that you remove any trailing
commas:

<!---
{
    "linter": "jshint"
}
-->
```javascript
/*jshint es3: true */
var x = [
    "element1",
    "element2"
];
```

If you are using an older version of JSHint (pre-2.0.0) and you want to use
trailing commas you will have to set the `es5` option to `true`. As of version
2.0.0 JSHint will treat all code as valid ES5 code. In JSHint 1.0.0 and above
you have the ability to ignore any warning with a [special option
syntax][jshintopts]. The identifier of this warning is **W070**. This means you
can tell JSHint to not issue this warning with the `/*jshint -W070 */`
directive.

In ESLint the rule that generates this warning is named `no-comma-dangle`. You
can disable it by setting it to `0`, or enable it by setting it to `1`.

[es5-11.1.5]: https://es5.github.com/#11.1.5
[es5-11.1.4]: https://es5.github.com/#11.1.4
[jshintopts]: http://jshint.com/docs/#options
