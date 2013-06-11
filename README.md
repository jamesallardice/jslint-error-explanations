JSLint Error Explanations
=========================

Welcome to the JSLint Error Explanations repository! If you're here, hopefully you are looking to help out by writing a detailed article or two about specific [JSLint](http://www.jslint.com/) error messages.

## Reporting problems with existing content

If you discover a mistake in one of the existing error explanations, feel free to fix it yourself and open a pull request. I'll try to get it merged in as soon as possible. Alternatively, open an issue here on GitHub and I'll get around to fixing the problem myself.

## Building the site locally

JSLint Error Explanations runs on Jekyll, and if you've already got that installed it's very straightforward to get up and running.

 - Install [Jekyll](https://github.com/mojombo/jekyll) (it's a Ruby gem); if you are on Linux, Unix or Mac OS X and have [Ruby](http://www.ruby-lang.org/) and [RubyGems](http://rubygems.org/) installed all you need to do is `gem install jekyll`

 - Fork this repository and clone it in your development environment

 - `cd` into the repository directory and run the following command:

    `jekyll serve --watch`

 - Jekyll should now build the site automatically, and will watch for changes to any of the files, rebuilding when necessary.
 
 - Navigate to *http://localhost:4000* to see the site running on your machine (obviously, you will need to change the port if you have configured Jekyll differently. 4000 is the default.)

## Writing articles

The best way to understand the structure and style of the articles is to read through a couple that already exist. Each article resides in its own file, in the *_posts* directory. You can find a [list of all the articles](https://github.com/jamesallardice/jslint-error-explanations/wiki/List-of-pages-that-are-needed) that need to be written in the wiki. Please follow these basic guidelines for any articles you create:

 - The file name must follow the existing format of `yyyy-mm-dd-jslint-error-message-slug.html`. The date is used by Jekyll to order to posts. The order is currently the same as the order in JSLint itself.

 - The files are written in HTML. I could have used Markdown, but that would have been too easy (not really, I just ended up using HTML for some unknown reason). They should only be HTML fragments, as they get dropped into a complete document.

 - All `textarea` elements are automatically converted into simple interactive JSLint-enabled editors. You can pass options to JSLint with the `data-jslintopts` attribute. Its value should be a JSON string:

   `<textarea data-jslintopts='{ "adsafe": true, "fragment": true }'></textarea>`
   
   You can also specify which validator the editor should default to with the `data-linter` attribute:
   
   `<textarea data-linter="JSHint"></textarea>`

## License

All articles on the site are licensed under the <a href="http://creativecommons.org/licenses/by-sa/3.0/">Creative Commons Attribution-ShareAlike 3.0 Unported License (CC BY-SA 3.0)</a>. That means you are free to do whatever you like with them, as long as you include a notice that the content was found on this site.
