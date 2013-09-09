var config = require("../config.js");
var express = require("express");
var sh = require("shelljs");
var _ = require("underscore");
var formatting = require("./formatting.js");


// load content
var Posts = require("./posts.js");
var storage = require("./file_storage.js");

var posts = new Posts({
  items: sh.ls(__dirname + "/../content/explain/*.html").map(storage.readPost)
});
var pages = sh.ls(__dirname + "/../content/pages/*.html").map(storage.readPage);


// view options
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


// setup routing
var app = express();
app.use('/assets',express.static(__dirname + '/../assets'))

pages.forEach(function(page) {
  app.get("/" + page.slug,function(req,res) {
    var opts = _.extend({},page);
    if(page.posts) {
      opts.columns = formatting.toColumns(formatting.formatPosts(posts.byTag(page.posts)))
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


// boot app
console.log("lint-explain listening on " + config.port);
app.listen(config.port);
