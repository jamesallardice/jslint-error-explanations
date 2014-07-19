# JSLint Error Explanations

This is the repository for the content of the [JSLint Errors][site] website. If
you're reading this hopefully you're looking to help out by adding an article
for a missing JSLint, JSHint or ESLint error message.

## Contributing

If you would like to add a new explanation or correct a mistake in an existing
one please fork this repository and make your changes in accordance with the
[contribution guidelines][contrib]. All pull requests will be considered.

If you have a feature request related to the website or API please raise an
issue in this repository. Although only the explanations themselves are tracked
here this is the place for all discussion around the site and API too.

## API

There is a simple API that can be used to find an explanation for linter
messages dynamically. It's designed for integration into IDEs or web UIs. All
responses are served with an `Access-Control-Allow-Origin: *` header so you can
request explanations from client-side JavaScript. See the [documentation][api]
for all the details.

## FAQ

 - Where did the code for the [website][site] go?

The website itself is no longer open-source. All content remains open and
licensed under the Creative Commons [Attribution-ShareAlike 3.0
Unported][ccasa3] license.

 - Who can use the API?

Anyone! There are no restrictions whatsoever but please be sensible. But if you
are planning on making thousands of requests over short periods of time please
let me know or I'll probably throttle you.

[site]: http://jslinterrors.com/
[contrib]: CONTRIBUTING.md
[api]: http://jslinterrors.com/api/
[ccasa3]: http://creativecommons.org/licenses/by-sa/3.0/
