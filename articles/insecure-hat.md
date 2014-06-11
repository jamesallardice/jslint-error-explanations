<!---
{
    "titles": [
        "Insecure ^"
    ],
    "slugs": [
        "insecure-hat",
        "w059"
    ],
    "linters": [
        "jslint",
        "jshint",
        "eslint"
    ],
    "author": "hyeend"
}
-->

### When do I get this error?

The "Insecure ^" error is thrown when JSLint encounters a regular expression containing the negation operator ^.

JSLint will only raise this warning if the `regexp` option is set to true.
<!---
{
    "linter": "jslint"
}
-->
```javascript
 "Hello Bob".match(/[^a-z]/g);
 /* Returns [ 'H', ' ', 'B' ]
*/
```

### Why do I get this error?

This error is raised to highlight **potentially dangerous matches** such as some special control characters. For example, an attacker might include a unicode character or an EOL character, which would get matched by the over-zealous not and may cause your application to respond in unexpected ways.

It is safe to ignore or disable this error if you are only matching in order to dispose of the matched characters, for example:

<!---
{
    "linter": "jslint"
}
-->
```javascript
/*jslint regexp:true*/ // Allow ^ because we're only using it to remove the matching characters
 "Hello Bob".replace(/[^A-Z]/g, "");
 /*jslint regexp:false*/
 /* Returns
[ 'HB' ]
  */
```
