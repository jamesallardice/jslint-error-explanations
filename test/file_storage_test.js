var storage = require("../src/file_storage.js");
var _ = require("underscore");

var priv = storage["-private"];

describe("fileStorage",function() {


  context("reading post",function() {

    var header = "title: Unreticulated splines\ntags: a b c\n\n\n  ";
    var body = "\n<h1>Hi!</h1>";
    var post = "\n\n---\n" + header + "\n---" + body;
    var slug = "a-is-a-statement-label";
    var fileName = "/foo/200bar/baz/2000-01-01-" + slug + ".html";
    
    var headerData = {
      title: "Unreticulated splines",
      tags: "a b c"
    };

    var post;
    before(function() {
      post = priv.parseContentAndFilename(fileName,post);
    })
    it("has body",function() {
      assert.equal(post.body,body);
    });
    it("contains header field",function() {
      _.each(headerData,function(v,k) {
        assert.deepEqual(post[k],v);
      })
    });
    it("contains slug",function() {
      assert.equal(post.slug,slug);
    });
  });

});
