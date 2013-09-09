var _ = require("underscore");
var cheerio = require("cheerio");

var format;
module.exports = format = {
  toColumns: function(posts) {
    var mid = Math.ceil(posts.length / 2);
    return [{posts:posts.slice(0,mid)}, {posts:posts.slice(mid)}];
  },
  formatTags: function(tags) {
    var names = {
      jshint: "JSHint",
      jslint: "JSLint",
      adsafe: "ADsafe"
    }
    return tags.map(function(tag) {
      return {
        name: names[tag],
        tag: tag
      }
    })
  },
  truncateWords: function(str) {
    var words = str.split(" ")
    if(words.length <= 30) return str;
    return words.slice(0,30).join(" ").replace(/\.$/,"") + "…";
  },
  formatPosts: function(posts) {
    return posts.map(function(post) {
      return _.defaults({
        tags: format.formatTags(post.tags),
        url: "/" + post.slug,
        body: format.truncateWords(cheerio.load(post.body)("p").eq(1).text())
      },post);
    });
  }
};
