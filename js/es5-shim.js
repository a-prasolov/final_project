! function() { var r = Array.prototype,
        t = Object.prototype.toString,
        n = { indexOf: function(r, t) { t = +(t || 0); var n = this,
                    e = n.length; if (e > 0 && e > t)
                    for (t = 0 > t ? Math.ceil(t) : Math.floor(t), -e > t && (t = 0), 0 > t && (t += e); e > t;) { if (t in n && n[t] === r) return t;++t }
                return -1 }, forEach: function(r, t) { for (var n = -1, e = this, o = e.length; ++n < o;) n in e && (t ? r.call(t, e[n], n, e) : r(e[n], n, e)) }, map: function(r, t) { for (var n = -1, e = this, o = e.length, i = new Array(o); ++n < o;) n in e && (i[n] = t ? r.call(t, e[n], n, e) : r(e[n], n, e)); return i }, filter: function(r, t) { for (var n = -1, e = this, o = e.length, i = []; ++n < o;) n in e && (t ? r.call(t, e[n], n, e) : r(e[n], n, e)) && i.push(e[n]); return i }, reduce: function(r, t) { var n, e = -1,
                    o = this,
                    i = o.length; if (arguments.length < 2) { for (; ++e < i;)
                        if (e in o) { n = o[e]; break } } else n = t; for (; ++e < i;) e in o && (n = r(n, o[e], e, o)); return n }, some: function(r, t) { for (var n = -1, e = this, o = e.length; ++n < o;)
                    if (n in e && (t ? r.call(t, e[n], n, e) : r(e[n], n, e))) return !0;
                return !1 }, every: function(r, t) { for (var n = -1, e = this, o = e.length; ++n < o;)
                    if (n in e && !(t ? r.call(t, e[n], n, e) : r(e[n], n, e))) return !1;
                return !0 } }; for (var e in n) r[e] || (r[e] = n[e]);
    Array.isArray || (Array.isArray = function(r) { return "[object Array]" === t.call(r) }) }(), Date.now || (Date.now = function() { return (new Date).getTime() }),
    function() { var r = Array.prototype.slice;
        Function.prototype.bind || (Function.prototype.bind = function(t) { var n = this,
                e = r.call(arguments, 1); return function() { return n.apply(t, e.concat(r.call(arguments))) } }) }(),
    function(r) { if (!window.JSON) { var t, n = Object.prototype.toString,
                e = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                o = { "\b": "\\b", "	": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" };
            window.JSON = { stringify: t = function(i) { if (null === i) return "null"; if ("undefined" == typeof i) return r; var u, f, a; switch (n.call(i)) {
                        case "[object String]":
                            return e.lastIndex = 0, '"' + (e.test(i) ? i.replace(e, function(r) { var t = o[r]; return "string" == typeof t ? t : "\\u" + ("0000" + r.charCodeAt(0).toString(16)).slice(-4) }) : i) + '"';
                        case "[object Number]":
                        case "[object Boolean]":
                            return "" + i;
                        case "[object Array]":
                            u = "[", f = 0; for (var c = i.length; c > f;) a = t(i[f]), u += (f++ ? "," : "") + ("undefined" == typeof a ? "null" : a); return u + "]";
                        case "[object Object]":
                            if ("[object Function]" === n.call(i.toJSON)) return t(i.toJSON());
                            u = "{", f = 0; for (var l in i) i.hasOwnProperty(l) && (a = t(i[l]), "undefined" != typeof a && (u += (f++ ? "," : "") + '"' + l + '":' + a)); return u + "}";
                        default:
                            return r } }, parse: function(r) { return Function("return " + r)() } } } }(), Object.keys || (Object.keys = function(r) { var t = []; for (var n in r) r.hasOwnProperty(n) && t.push(n); return t }), String.prototype.trim || (String.prototype.trim = function() { for (var r = this.replace(/^\s\s*/, ""), t = /\s/, n = r.length; t.test(r.charAt(--n));); return r.slice(0, n + 1) });