var sh = require("shelljs");
var ok = require("./ok.js")
var path = require("path");
var _ = require("underscore");

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
  },
  parseContentAndFilename: function(path,content) {
    var slugAndOrder = priv.jekyll.parseFilename(path);
    var parts = priv.headerBody(content);
    return _.extend(parts.header,slugAndOrder,{
      body: parts.body
    });
  }
};
priv.jekyll = {
  parseFilename: function(fn) {
    var base = path.basename(fn);
    var matches = /(\d{4}-\d\d-\d\d)-([^\.]+)/.exec(base);
    ok.ifDefined(matches,"Couldn't parse Jekyll file name " + fn);
    return {order: matches[1], slug: matches[2]};
  },
};

var api = {
  readPosts: function(path) {
    return sh.ls(path).map(api.readPost)
  },
  readPost: function(path) {
    var content = sh.cat(path);
    return priv.parseContentAndFilename(path,content);
  },
  "-private": priv
}
module.exports = api;
