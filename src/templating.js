var sh = require("shelljs");
var path = require("path");
var hogan = require("hogan.js");
var _ = require("underscore");


function TemplateContext(opts) {
  opts = opts || {};
  this.cache = {};
  this.layouts = opts.layouts || {};
  this.partials = opts.partials || {};
}
TemplateContext.prototype = {
  render: function(template,data,opts) {
    opts = opts || {};
    var layout = opts.layout || this.defaultLayout;
    var partials = opts.partials || this.partials;
    if(layout) {
      var layoutFn = this.layouts[layout];
      return this.render(layoutFn,data,{partials: _.extend({yield: template},this.partials)});
    }
    return this.run(template,data,partials);
  },
  run: function(template,data,partials) {
    if(typeof template.render !== "function") {
      if(!this.cache[template]) {
        this.cache[template] = hogan.compile(template);
      }
      template = this.cache[template];
    }
    return template.render(data,partials);
  }
};


module.exports = {
  fromPaths: function(opts) {
    opts = opts || {};
    var partials = sh.ls(opts.partials).reduce(function(partials,fn) {
      partials[path.basename(fn,".html")] = hogan.compile(sh.cat(fn));
      return partials;
    },{});
    var layouts = sh.ls(opts.layouts).reduce(function(all,fn) {
      all[path.basename(fn,".html")] = hogan.compile(sh.cat(fn));
      return all;
    },{});
    return new TemplateContext({partials: partials, layouts: layouts});
  }
};
