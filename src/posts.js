function Posts(opts) {
  opts = opts || {};
  this.items  = opts.items || [];
}

Posts.prototype = {
  engines: function() {
    if(this._engines) return this._engines;
    this._engines = _.uniq(_.flatten(_.pluck(this.all(),"engines")));
    return this._engines;
  },
  all: function() {
    return this.items;
  }
}


module.exports = Posts;

