var config = require("../config.js");
var express = require("express");
var sh = require("shelljs");
var _ = require("underscore");
var cheerio = require("cheerio");


var Posts = require("./posts.js");
var storage = require("./file_storage.js");

var app = express();

var posts = new Posts({
  items: sh.ls(__dirname + "/../content/explain/*.html").map(storage.readPost)
});

app.use('/assets',express.static(__dirname + '/../assets'))

var templates = require("./templating.js");
var template = templates.fromPaths({
  partials: __dirname + "/../views/partials/*.html",
  layouts: __dirname + "/../views/layouts/*.html",
});


var contentConfig = require(__dirname + "/../config.yml");
var authors = contentConfig.authors;

var defaultOpts = {
  showAds: false,
  debugJs: false
};

var toColumns = function(posts) {
  var mid = Math.ceil(posts.length / 2);
  return [{posts:posts.slice(0,mid)}, {posts:posts.slice(mid)}];
};
var formatTags = function(tags) {
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
};

var truncateWords = function(str) {
  var words = str.split(" ")
  if(words.length <= 30) return str;
  return words.slice(0,30).join(" ").replace(/\.$/,"") + "…";
}

var formatPosts = function(posts) {
  return posts.map(function(post) {
    return _.defaults({
      tags: formatTags(post.tags),
      url: "/" + post.slug,
      body: truncateWords(cheerio.load(post.body)("p").eq(1).text())
    },post);
  });
}

var pages = sh.ls(__dirname + "/../content/pages/*.html").map(storage.readPage);
pages.forEach(function(page) {
  app.get("/" + page.slug,function(req,res) {
    var opts = _.extend({},page);
    if(page.posts) {
      opts.columns = toColumns(formatPosts(posts.byTag(page.posts)))
    }
    opts = _.extend(opts,defaultOpts);
    res.send(template.render(page.body,opts,{layout: page.layout}));
  });
});

app.get("/:slug.json",function(req,res) {
  var post = posts.findBySlug(req.params.slug);
  if(!post) {
    return res.send(500);
  }
  res.send(post);
});

app.get("/:slug",function(req,res) {
  var post = posts.findBySlug(req.params.slug);
  if(!post) {
    console.error("No slug for " + req.params.slug);
    return res.send(404);
  }
  var postOpts = _.extend({},post);
  if(post.author) {
    postOpts.author = authors[post.author];
  }
  var opts = _.extend(postOpts,defaultOpts);
  res.send(template.render(post.body,opts,{layout: "post"}));
});


console.log("lint-explain listening on " + config.port);
app.listen(config.port);
