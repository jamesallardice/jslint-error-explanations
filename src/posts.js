var _ = require("underscore");

function Posts(opts) {
  opts = opts || {};
  this.items  = opts.items || [];
  ["_byTag","engines","_bySlug"].forEach(function(method) {
    this[method] = _.memoize(this[method]);
  },this);
}

Posts.prototype = {
  engines: function() {
    return _.uniq(_.flatten(_.pluck(this.all(),"engines")));
  },
  findBySlug: function(slug) {
    return this._bySlug()[slug];
  },
  findByEngineAndSlug: function(slug,engine) {
  },
  withTags: function() {
    var tags = [].slice.call(arguments);
    return tags.reduce(function(all,tag) {
      return all.concat(this.byTag(Tag));
    }.bind(this),[]);
  },
  byTag: function(tag) {
    if(tag === "all") return this.all();
    return this._byTag()[tag];
  },
  _byTag: function() {
    return this.all().reduce(function(all,post) {
      post.tags.forEach(function(tag) {
        all[tag] = all[tag] || [];
        all[tag].push(post)
      });
      return all;
    },{});
  },
  all: function() {
    return this.items;
  },
  _bySlug: function() {
    return this.all().reduce(function(h,post) {
      h[post.slug] = post;
      return h;
    },{});
  }
};


module.exports = Posts;

