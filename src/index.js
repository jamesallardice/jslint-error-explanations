var config = require("../config.js");
var express = require("express");

var Posts = require("./posts.js");

var app = express();

var posts = new Posts({
  items: storage.readPosts("../content/explain/*")
});

app.use(express.static(__dirname + '/../assets'))

c = {pageHandler: function() {},makeEngineHandler: function(){ return function() {}},legacyHandler: function() {}};

pages.all().forEach(function(page) {
  app.get(page.slug,c.pageHandler(page));
});

posts.engines().forEach(function(engine) {
  app.get("/:engine/:slug",c.makeEngineHandler(engine));
});

app.get("/:legacy-slug",c.legacyHandler);


console.log("lint-explain listening on " + config.port);
app.listen(config.port);
