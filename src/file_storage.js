var sh = require("shelljs");
var ok = require("./ok.js")

var priv = {
  splitHeaderBody: function(contents) {
    var delim = "---";
    var delimRe = new RegExp("^" + delim,"mg");

    var start = delimRe.exec(contents);
    ok.ifDefined(start,"Can't find start of header");

    var end = delimRe.exec(contents);
    ok.ifDefined(end,"Can't find end of header");

    var header = contents.slice(start.index + delim.length + 1,end.index- 1);
    var body = contents.slice(end.index + delim.length);
    return {header: header, body: body};
  },
  headerBody: function(contents) {
    var parts = priv.splitHeaderBody(contents);
    parts.header = priv.parseHeader(parts.header);
    return parts;
  },
  parseHeader: function(header) {
    header  = "{" + header + "}";
    return JSON.parse(header);
  }
};

var api = {
  readPosts: function(path) {
    return sh.ls(path).map(storage.readPost)
  },
  readPost: function(path) {
    var content = sh.cat(path);
    var parts = priv.headerBody(content);
  },
  "-private": priv
}
module.exports = api;
