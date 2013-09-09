function ok(okay,msg) {
  if(!okay) privs.handle(msg);
}

var privs = {};
privs.handle = function(msg) {
  throw new Error(msg);
};
Object.defineProperty(ok,"-private",{
  value: privs,
  enumerable: false
});

privs.make = function(test) {
  return function(x,msg) {
    ok(test(x),msg);
  }
};

ok.ifDefined = privs.make(function(x) {
  return x != undefined; 
});

module.exports = ok;
