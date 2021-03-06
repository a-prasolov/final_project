"function" != typeof Object.create && (Object.create = function(a) {
    function b() {} return b.prototype = a, new b });
var ua = { toString: function() { return navigator.userAgent }, test: function(a) { return this.toString().toLowerCase().indexOf(a.toLowerCase()) > -1 } };
ua.version = (ua.toString().toLowerCase().match(/[\s\S]+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1], ua.webkit = ua.test("webkit"), ua.gecko = ua.test("gecko") && !ua.webkit, ua.opera = ua.test("opera"), ua.ie = ua.test("msie") && !ua.opera, ua.ie6 = ua.ie && document.compatMode && "undefined" == typeof document.documentElement.style.maxHeight, ua.ie7 = ua.ie && document.documentElement && "undefined" != typeof document.documentElement.style.maxHeight && "undefined" == typeof XDomainRequest, ua.ie8 = ua.ie && "undefined" != typeof XDomainRequest;
var domReady = function() { var a = [],
            b = function() { if (!arguments.callee.done) { arguments.callee.done = !0; for (var b = 0; b < a.length; b++) a[b]() } }; return document.addEventListener && document.addEventListener("DOMContentLoaded", b, !1), ua.ie && (! function() { try { document.documentElement.doScroll("left"), document.body.length } catch (a) { return void setTimeout(arguments.callee, 50) }
                b() }(), document.onreadystatechange = function() { "complete" === document.readyState && (document.onreadystatechange = null, b()) }), ua.webkit && document.readyState && ! function() { "loading" !== document.readyState ? b() : setTimeout(arguments.callee, 10) }(), window.onload = b,
            function(c) { return "function" == typeof c && (b.done ? c() : a[a.length] = c), c } }(),
    cssHelper = function() { var b, a = { BLOCKS: /[^\s{;][^{;]*\{(?:[^{}]*\{[^{}]*\}[^{}]*|[^{}]*)*\}/g, BLOCKS_INSIDE: /[^\s{][^{]*\{[^{}]*\}/g, DECLARATIONS: /[a-zA-Z\-]+[^;]*:[^;]+;/g, RELATIVE_URLS: /url\(['"]?([^\/\)'"][^:\)'"]+)['"]?\)/g, REDUNDANT_COMPONENTS: /(?:\/\*([^*\\\\]|\*(?!\/))+\*\/|@import[^;]+;|@-moz-document\s*url-prefix\(\)\s*{(([^{}])+{([^{}])+}([^{}])+)+})/g, REDUNDANT_WHITESPACE: /\s*(,|:|;|\{|\})\s*/g, WHITESPACE_IN_PARENTHESES: /\(\s*(\S*)\s*\)/g, MORE_WHITESPACE: /\s{2,}/g, FINAL_SEMICOLONS: /;\}/g, NOT_WHITESPACE: /\S+/g },
            c = !1,
            d = [],
            e = function(a) { "function" == typeof a && (d[d.length] = a) },
            f = function() { for (var a = 0; a < d.length; a++) d[a](b) },
            g = {},
            h = function(a, b) { if (g[a]) { var c = g[a].listeners; if (c)
                        for (var d = 0; d < c.length; d++) c[d](b) } },
            j = function(a, b, c) { if (ua.ie && !window.XMLHttpRequest && (window.XMLHttpRequest = function() { return new ActiveXObject("Microsoft.XMLHTTP") }), !XMLHttpRequest) return ""; var d = new XMLHttpRequest; try { d.open("get", a, !0), d.setRequestHeader("X_REQUESTED_WITH", "XMLHttpRequest") } catch (a) { return void c() } var e = !1;
                setTimeout(function() { e = !0 }, 5e3), document.documentElement.style.cursor = "progress", d.onreadystatechange = function() { 4 !== d.readyState || e || (!d.status && "file:" === location.protocol || d.status >= 200 && d.status < 300 || 304 === d.status || navigator.userAgent.indexOf("Safari") > -1 && "undefined" == typeof d.status ? b(d.responseText) : c(), document.documentElement.style.cursor = "", d = null) }, d.send("") },
            k = function(b) { return b = b.replace(a.REDUNDANT_COMPONENTS, ""), b = b.replace(a.REDUNDANT_WHITESPACE, "$1"), b = b.replace(a.WHITESPACE_IN_PARENTHESES, "($1)"), b = b.replace(a.MORE_WHITESPACE, " "), b = b.replace(a.FINAL_SEMICOLONS, "}") },
            l = { stylesheet: function(b) { var c = {},
                        d = [],
                        e = [],
                        f = [],
                        g = [],
                        h = b.cssHelperText,
                        i = b.getAttribute("media"); if (i) var j = i.toLowerCase().split(",");
                    else var j = ["all"]; for (var k = 0; k < j.length; k++) d[d.length] = l.mediaQuery(j[k], c); var m = h.match(a.BLOCKS); if (null !== m)
                        for (var k = 0; k < m.length; k++)
                            if ("@media " === m[k].substring(0, 7)) { var n = l.mediaQueryList(m[k], c);
                                f = f.concat(n.getRules()), e[e.length] = n } else f[f.length] = g[g.length] = l.rule(m[k], c, null);
                    return c.element = b, c.getCssText = function() { return h }, c.getAttrMediaQueries = function() { return d }, c.getMediaQueryLists = function() { return e }, c.getRules = function() { return f }, c.getRulesWithoutMQ = function() { return g }, c }, mediaQueryList: function(b, c) { var d = {},
                        e = b.indexOf("{"),
                        f = b.substring(0, e);
                    b = b.substring(e + 1, b.length - 1); for (var g = [], h = [], i = f.toLowerCase().substring(7).split(","), j = 0; j < i.length; j++) g[g.length] = l.mediaQuery(i[j], d); var k = b.match(a.BLOCKS_INSIDE); if (null !== k)
                        for (j = 0; j < k.length; j++) h[h.length] = l.rule(k[j], c, d); return d.type = "mediaQueryList", d.getMediaQueries = function() { return g }, d.getRules = function() { return h }, d.getListText = function() { return f }, d.getCssText = function() { return b }, d }, mediaQuery: function(b, c) { b = b || ""; var d, e; "mediaQueryList" === c.type ? d = c : e = c; for (var g, f = !1, h = [], i = !0, j = b.match(a.NOT_WHITESPACE), k = 0; k < j.length; k++) { var l = j[k]; if (g || "not" !== l && "only" !== l)
                            if (g) { if ("(" === l.charAt(0)) { var m = l.substring(1, l.length - 1).split(":");
                                    h[h.length] = { mediaFeature: m[0], value: m[1] || null } } } else g = l;
                        else "not" === l && (f = !0) } return { getQueryText: function() { return b }, getAttrStyleSheet: function() { return e || null }, getList: function() { return d || null }, getValid: function() { return i }, getNot: function() { return f }, getMediaType: function() { return g }, getExpressions: function() { return h } } }, rule: function(a, b, c) { for (var d = {}, e = a.indexOf("{"), f = a.substring(0, e), g = f.split(","), h = [], i = a.substring(e + 1, a.length - 1).split(";"), j = 0; j < i.length; j++) h[h.length] = l.declaration(i[j], d); return d.getStylesheet = function() { return b || null }, d.getMediaQueryList = function() { return c || null }, d.getSelectors = function() { return g }, d.getSelectorText = function() { return f }, d.getDeclarations = function() { return h }, d.getPropertyValue = function(a) { for (var b = 0; b < h.length; b++)
                            if (h[b].getProperty() === a) return h[b].getValue();
                        return null }, d }, declaration: function(a, b) { var c = a.indexOf(":"),
                        d = a.substring(0, c),
                        e = a.substring(c + 1); return { getRule: function() { return b || null }, getProperty: function() { return d }, getValue: function() { return e } } } },
            m = function(a) { if ("string" == typeof a.cssHelperText) { var c = { stylesheet: null, mediaQueryLists: [], rules: [], selectors: {}, declarations: [], properties: {} },
                        d = c.stylesheet = l.stylesheet(a),
                        f = (c.mediaQueryLists = d.getMediaQueryLists(), c.rules = d.getRules()),
                        g = c.selectors,
                        h = function(a) { for (var b = a.getSelectors(), c = 0; c < b.length; c++) { var d = b[c];
                                g[d] || (g[d] = []), g[d][g[d].length] = a } }; for (i = 0; i < f.length; i++) h(f[i]); var j = c.declarations; for (i = 0; i < f.length; i++) j = c.declarations = j.concat(f[i].getDeclarations()); var k = c.properties; for (i = 0; i < j.length; i++) { var m = j[i].getProperty();
                        k[m] || (k[m] = []), k[m][k[m].length] = j[i] } return a.cssHelperParsed = c, b[b.length] = a, c } },
            n = function(a, b) {},
            o = function() { c = !0, b = []; for (var d = [], e = function() { for (var a = 0; a < d.length; a++) m(d[a]); var b = document.getElementsByTagName("style"); for (a = 0; a < b.length; a++) n(b[a]);
                        c = !1, f() }, g = document.getElementsByTagName("link"), h = 0; h < g.length; h++) { var i = g[h];
                    i.getAttribute("rel").indexOf("style") > -1 && i.href && 0 !== i.href.length && !i.disabled && (d[d.length] = i) } if (d.length > 0) { var l = 0,
                        o = function() { l++, l === d.length && e() },
                        p = function(b) { var c = b.href;
                            j(c, function(d) { d = k(d).replace(a.RELATIVE_URLS, "url(" + c.substring(0, c.lastIndexOf("/")) + "/$1)"), b.cssHelperText = d, o() }, o) }; for (h = 0; h < d.length; h++) p(d[h]) } else e() },
            p = { stylesheets: "array", mediaQueryLists: "array", rules: "array", selectors: "object", declarations: "array", properties: "object" },
            q = { stylesheets: null, mediaQueryLists: null, rules: null, selectors: null, declarations: null, properties: null },
            r = function(a, b) { if (null !== q[a]) { if ("array" === p[a]) return q[a] = q[a].concat(b); var c = q[a]; for (var d in b) b.hasOwnProperty(d) && (c[d] ? c[d] = c[d].concat(b[d]) : c[d] = b[d]); return c } },
            s = function(a) { q[a] = "array" === p[a] ? [] : {}; for (var c = 0; c < b.length; c++) { var d = "stylesheets" === a ? "stylesheet" : a;
                    r(a, b[c].cssHelperParsed[d]) } return q[a] },
            t = function(a) { return "undefined" != typeof window.innerWidth ? window["inner" + a] : "undefined" != typeof document.documentElement && "undefined" != typeof document.documentElement.clientWidth && 0 != document.documentElement.clientWidth ? document.documentElement["client" + a] : void 0 }; return { addStyle: function(a, b, c) { var d, e = "css-mediaqueries-js",
                    f = "",
                    g = document.getElementById(e); return b && b.length > 0 && (f = b.join(","), e += f), null !== g ? d = g : (d = document.createElement("style"), d.setAttribute("type", "text/css"), d.setAttribute("id", e), d.setAttribute("media", f), document.getElementsByTagName("head")[0].appendChild(d)), d.styleSheet ? d.styleSheet.cssText += a : d.appendChild(document.createTextNode(a)), d.addedWithCssHelper = !0, "undefined" == typeof c || c === !0 ? cssHelper.parsed(function(b) { var c = n(d, a); for (var e in c) c.hasOwnProperty(e) && r(e, c[e]);
                    h("newStyleParsed", d) }) : d.parsingDisallowed = !0, d }, removeStyle: function(a) { if (a.parentNode) return a.parentNode.removeChild(a) }, parsed: function(a) { c ? e(a) : "undefined" != typeof b ? "function" == typeof a && a(b) : (e(a), o()) }, stylesheets: function(a) { cssHelper.parsed(function(b) { a(q.stylesheets || s("stylesheets")) }) }, mediaQueryLists: function(a) { cssHelper.parsed(function(b) { a(q.mediaQueryLists || s("mediaQueryLists")) }) }, rules: function(a) { cssHelper.parsed(function(b) { a(q.rules || s("rules")) }) }, selectors: function(a) { cssHelper.parsed(function(b) { a(q.selectors || s("selectors")) }) }, declarations: function(a) { cssHelper.parsed(function(b) { a(q.declarations || s("declarations")) }) }, properties: function(a) { cssHelper.parsed(function(b) { a(q.properties || s("properties")) }) }, broadcast: h, addListener: function(a, b) { "function" == typeof b && (g[a] || (g[a] = { listeners: [] }), g[a].listeners[g[a].listeners.length] = b) }, removeListener: function(a, b) { if ("function" == typeof b && g[a])
                    for (var c = g[a].listeners, d = 0; d < c.length; d++) c[d] === b && (c.splice(d, 1), d -= 1) }, getViewportWidth: function() { return t("Width") }, getViewportHeight: function() { return t("Height") } } }();
domReady(function() { var b, c = { LENGTH_UNIT: /[0-9]+(em|ex|px|in|cm|mm|pt|pc)$/, RESOLUTION_UNIT: /[0-9]+(dpi|dpcm)$/, ASPECT_RATIO: /^[0-9]+\/[0-9]+$/, ABSOLUTE_VALUE: /^[0-9]*(\.[0-9]+)*$/ },
        d = [],
        e = function() { var a = "css3-mediaqueries-test",
                b = document.createElement("div");
            b.id = a; var c = cssHelper.addStyle("@media all and (width) { #" + a + " { width: 1px !important; } }", [], !1);
            document.body.appendChild(b); var d = 1 === b.offsetWidth; return c.parentNode.removeChild(c), b.parentNode.removeChild(b), e = function() { return d }, d },
        f = function() { b = document.createElement("div"), b.style.cssText = "position:absolute;top:-9999em;left:-9999em;margin:0;border:none;padding:0;width:1em;font-size:1em;", document.body.appendChild(b), 16 !== b.offsetWidth && (b.style.fontSize = 16 / b.offsetWidth + "em"), b.style.width = "" },
        g = function(a) { b.style.width = a; var c = b.offsetWidth; return b.style.width = "", c },
        h = function(a, b) { var d = a.length,
                e = "min-" === a.substring(0, 4),
                f = !e && "max-" === a.substring(0, 4); if (null !== b) { var h, i; if (c.LENGTH_UNIT.exec(b)) h = "length", i = g(b);
                else if (c.RESOLUTION_UNIT.exec(b)) { h = "resolution", i = parseInt(b, 10); var j = b.substring((i + "").length) } else c.ASPECT_RATIO.exec(b) ? (h = "aspect-ratio", i = b.split("/")) : c.ABSOLUTE_VALUE ? (h = "absolute", i = b) : h = "unknown" } var k, l; if ("device-width" === a.substring(d - 12, d)) return k = screen.width, null !== b ? "length" === h && (e && k >= i || f && k < i || !e && !f && k === i) : k > 0; if ("device-height" === a.substring(d - 13, d)) return l = screen.height, null !== b ? "length" === h && (e && l >= i || f && l < i || !e && !f && l === i) : l > 0; if ("width" === a.substring(d - 5, d)) return k = document.documentElement.clientWidth || document.body.clientWidth, null !== b ? "length" === h && (e && k >= i || f && k < i || !e && !f && k === i) : k > 0; if ("height" === a.substring(d - 6, d)) return l = document.documentElement.clientHeight || document.body.clientHeight, null !== b ? "length" === h && (e && l >= i || f && l < i || !e && !f && l === i) : l > 0; if ("orientation" === a.substring(d - 11, d)) return k = document.documentElement.clientWidth || document.body.clientWidth, l = document.documentElement.clientHeight || document.body.clientHeight, "absolute" === h && ("portrait" === i ? k <= l : k > l); if ("aspect-ratio" === a.substring(d - 12, d)) { k = document.documentElement.clientWidth || document.body.clientWidth, l = document.documentElement.clientHeight || document.body.clientHeight; var m = k / l,
                    n = i[1] / i[0]; return "aspect-ratio" === h && (e && m >= n || f && m < n || !e && !f && m === n) } if ("device-aspect-ratio" === a.substring(d - 19, d)) return "aspect-ratio" === h && screen.width * i[1] === screen.height * i[0]; if ("color-index" === a.substring(d - 11, d)) { var o = Math.pow(2, screen.colorDepth); return null !== b ? "absolute" === h && (e && o >= i || f && o < i || !e && !f && o === i) : o > 0 } if ("color" === a.substring(d - 5, d)) { var p = screen.colorDepth; return null !== b ? "absolute" === h && (e && p >= i || f && p < i || !e && !f && p === i) : p > 0 } if ("resolution" === a.substring(d - 10, d)) { var q; return q = g("dpcm" === j ? "1cm" : "1in"), null !== b ? "resolution" === h && (e && q >= i || f && q < i || !e && !f && q === i) : q > 0 } return !1 },
        i = function(a) { var b = a.getValid(),
                c = a.getExpressions(),
                d = c.length; if (d > 0) { for (var e = 0; e < d && b; e++) b = h(c[e].mediaFeature, c[e].value); var f = a.getNot(); return b && !f || f && !b } return b },
        j = function(a, b) { for (var c = a.getMediaQueries(), e = {}, f = 0; f < c.length; f++) { var g = c[f].getMediaType(); if (0 !== c[f].getExpressions().length) { var h = !0; if ("all" !== g && b && b.length > 0) { h = !1; for (var j = 0; j < b.length; j++) b[j] === g && (h = !0) }
                    h && i(c[f]) && (e[g] = !0) } } var k = [],
                l = 0; for (var m in e) e.hasOwnProperty(m) && (l > 0 && (k[l++] = ","), k[l++] = m);
            k.length > 0 && (d[d.length] = cssHelper.addStyle("@media " + k.join("") + "{" + a.getCssText() + "}", b, !1)) },
        k = function(a, b) { for (var c = 0; c < a.length; c++) j(a[c], b) },
        l = function(a) { for (var b = a.getAttrMediaQueries(), c = !1, e = {}, f = 0; f < b.length; f++) i(b[f]) && (e[b[f].getMediaType()] = b[f].getExpressions().length > 0); var g = [],
                h = []; for (var j in e) e.hasOwnProperty(j) && (g[g.length] = j, e[j] && (h[h.length] = j), "all" === j && (c = !0));
            h.length > 0 && (d[d.length] = cssHelper.addStyle(a.getCssText(), h, !1)); var l = a.getMediaQueryLists();
            c ? k(l) : k(l, g) },
        m = function(a) { for (var b = 0; b < a.length; b++) l(a[b]);
            ua.ie ? (document.documentElement.style.display = "block", setTimeout(function() { document.documentElement.style.display = "" }, 0), setTimeout(function() { cssHelper.broadcast("cssMediaQueriesTested") }, 100)) : cssHelper.broadcast("cssMediaQueriesTested") },
        n = function() { for (var a = 0; a < d.length; a++) cssHelper.removeStyle(d[a]);
            d = [], cssHelper.stylesheets(m) },
        o = 0,
        p = function() { var a = cssHelper.getViewportWidth(),
                b = cssHelper.getViewportHeight(); if (ua.ie) { var c = document.createElement("div");
                c.style.position = "absolute", c.style.top = "-9999em", c.style.overflow = "scroll", document.body.appendChild(c), o = c.offsetWidth - c.clientWidth, document.body.removeChild(c) } var d, f = function() { var c = cssHelper.getViewportWidth(),
                    f = cssHelper.getViewportHeight();
                (Math.abs(c - a) > o || Math.abs(f - b) > o) && (a = c, b = f, clearTimeout(d), d = setTimeout(function() { e() ? cssHelper.broadcast("cssMediaQueriesTested") : n() }, 500)) };
            window.onresize = function() { var a = window.onresize || function() {}; return function() { a(), f() } }() },
        q = document.documentElement; return q.style.marginLeft = "-32767px", setTimeout(function() { q.style.marginLeft = "" }, 5e3),
        function() { e() ? q.style.marginLeft = "" : (cssHelper.addListener("newStyleParsed", function(a) { l(a.cssHelperParsed.stylesheet) }), cssHelper.addListener("cssMediaQueriesTested", function() { ua.ie && (q.style.width = "1px"), setTimeout(function() { q.style.width = "", q.style.marginLeft = "" }, 0), cssHelper.removeListener("cssMediaQueriesTested", arguments.callee) }), f(), n()), p() } }());
try { document.execCommand("BackgroundImageCache", !1, !0) } catch (a) {}