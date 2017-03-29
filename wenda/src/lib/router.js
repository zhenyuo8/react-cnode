/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2014-05-22 17:33:53
 * @version $Id$
 */

  var urlObj = function (x) {
    var re = {};
    var h = location.href;
    var l = h.indexOf(x);
    if (l <= -1) { return {}; }
    h = h.substr(l + 1);
    if (!h) { return {}; }
    h = h.split('&');
    var i, len = h.length, node;
    for (var i = 0; i < len; i++) {
      node = h[i];
      node = node.split('=');
      re[node[0]] = node[1] || null;
    }
    return re;
  }

  var router = function (join, data) {
    this.data = data || {};
    this.join = join || '#';
  }

  //设置地址参数
  router.prototype.set =  function (obj) {
    for (var n in obj) {
      if (obj.n === null || obj[n] === undefined) {
        delete this.data[n];
      } else {
        this.data[n] = obj[n];
      }
    }
    this.re();
  }

  //获取地址参数
  router.prototype.get = function (name) {
    if (typeof name != 'string') { return null; }
    return this.data[name];
  }

  router.prototype.re = function (obj) {
    var data = obj || this.data;

    var h = '';
    for (var n in data) {
      if (h) { h += '&'; }
      if (jQuery.isArray(data[n])) {
        h += n + '=' + data[n].join('|');
      } else {
        h += n + '=' + data[n];
      }
    }
    h = h ? this.join + h : '';
    h = 'http://'+window.location.host + location.pathname + h;
    if (this.join == '#') {
      window.history.pushState({},0,h);
    }
    if (this.join == "?") {
      window.location.href = h;
    }
  }

  module.exports = function (join) {
    return new router(join, urlObj(join));
  }