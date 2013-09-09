var storage = require("../src/file_storage.js");

var priv = storage["-private"];

describe("fileStorage",function() {


  context("reading post",function() {

    var header = "\"title\": \"Unreticulated splines\",\n\"tags\": [\"a\", \"b\", \"c\"]\n\n\n  ";
    var body = "\n<h1>Hi!</h1>";
    var post = "\n\n---\n" + header + "\n---" + body;
    
    var headerData = {
      title: "Unreticulated splines",
      tags: ["a","b","c"]
    };

    var parts;
    before(function() {
      parts = priv.headerBody(post);
    })
    it("extracts body",function() {
      assert.equal(parts.body,body);
    });
    it("extracts header",function() {
      assert.deepEqual(parts.header,headerData);
    });
  });
});
