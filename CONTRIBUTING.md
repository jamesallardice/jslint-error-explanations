## Contributing

### Authors

Each article is associated with a single author. If this is your first time
create a `.json` file in the `authors` directory. By convention this file should
be named with your first initial and last name. Within that file describe
yourself with the following JSON format:

```json
{
    "name": "James Allardice",
    "twitter": "james_allardice",
    "github": "jamesallardice",
    "gplus": "110229746715330149995",
    "gravatar": "321be24529d43c2bacc7167337299e3d",
    "bio": "JavaScript engineer..."
}
```

Some of those properties are optional. Here's the details:

Property   | Type     | Description
-----------|----------|--------------
`name`     | `String` | The name by which you wish to be known. Displayed on the site.
`twitter`  | `String` | (Optional) Your Twitter handle (without the "@"). Linked to on the site.
`github`   | `String` | (Optional) Your GitHub username. Linked to on the site.
`gplus`    | `String` | (Optional) Your Google+ user ID. Used to display author data in Google search results
`gravatar` | `String` | (Optional) Your Gravatar user ID.
`bio`      | `String` | (Optional) A short biography of yourself. Displayed on the site.

### Articles

Once you've set up your author file you can write a new article. Articles are
written in [GitHub flavoured Markdown][gfm]. Simply create a `.md` file with a
sensible name in the `articles` directory. At the top of every article there
should be an HTML comment containing JSON of the following format:

```html
<!---
{
    "titles": [
        "Bad for-in variable '{a}'",
        "Creating global 'for' variable",
        "Invalid left-hand side in for-in",
        "W088"
    ],
    "slugs": [
        "bad-for-in-variable",
        "creating-global-for-variable",
        "invalid-left-hand-side-in-for-in",
        "w088"
    ],
    "linters": [
        "jslint",
        "jshint",
        "eslint"
    ],
    "author": "jallardice"
}
-->
```

Each property is important and must be specified. Here's the details:

Property  | Type     | Description
----------|----------|--------------
`titles`  | `Array`  | The messages produced by the linters. Include the JSHint message identifier if appropriate.
`slugs`   | `Array`  | URL slugs corresponding to the messages. Must match the order of the messages.
`linters` | `Array`  | The linters to which the article can apply. Valid strings are "jslint", "jshint" and "eslint".
`author`  | `String` | Your name. Must match the name of your "author" file.

### Code blocks

Most articles will include blocks of code. The [JSLint Errors website][site]
converts each code block into an interactive editor and runs a linter on the
contents of it. You can specify options that tell consumers which linter the
block should apply to by default. Add an HTML comment before the code block of
the following format:

```html
<!---
{
    "linter": "jslint",
    "version": "2014-02-06"
}
-->
```

Every code block requires one of these comments but some of the properties are
optional:

Property  | Type     | Description
----------|----------|-------------
`linter`  | `String` | The linter to use by default. Valid strings are "jslint", "jshint" and "eslint"
`version` | `String` | (Optional) The version of the linter to use by default

### Conventions

 - Lines should be hard-wrapped at 80 characters where possible
 - Markdown links should be of the `[text][id]` format with map of IDs to URLs
   at the end of the file
 - Prefer fenced code blocks to traditional indented blocks
 - If an article includes headings they should be of `h3` level and below

[site]: http://jslinterrors.com/
[gfm]: http://github.github.com/github-flavored-markdown/
