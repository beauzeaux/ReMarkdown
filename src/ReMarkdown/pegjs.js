/*
 * AMD wrapper
 */
define([], function(){
/*
 * PEG.js 0.8.0
 *
 * http://pegjs.majda.cz/
 *
 * Copyright (c) 2010-2013 David Majda
 * Licensed under the MIT license.
 */
var PEG = function (undefined) {
    var modules = {define: function (e, t) {
        function n(e) {
            for (var t = r + e, n = /[^\/]+\/\.\.\/|\.\//; n.test(t);)t = t.replace(n, "");
            return modules[t]
        }

        var r = e.replace(/(^|\/)[^/]+$/, "$1"), s = {exports: {}};
        t(s, n), this[e] = s.exports
    }};
    return modules.define("utils", function (e) {
        var t = {range: function (e, t) {
            t === undefined && (t = e, e = 0);
            for (var n = new Array(Math.max(0, t - e)), r = 0, s = e; t > s; r++, s++)n[r] = s;
            return n
        }, find: function (e, t) {
            for (var n = e.length, r = 0; n > r; r++)if (t(e[r]))return e[r]
        }, indexOf: function (e, t) {
            for (var n = e.length, r = 0; n > r; r++)if (t(e[r]))return r;
            return-1
        }, contains: function (e, t) {
            for (var n = e.length, r = 0; n > r; r++)if (e[r] === t)return!0;
            return!1
        }, each: function (e, t) {
            for (var n = e.length, r = 0; n > r; r++)t(e[r], r)
        }, map: function (e, t) {
            for (var n = [], r = e.length, s = 0; r > s; s++)n[s] = t(e[s], s);
            return n
        }, pluck: function (e, n) {
            return t.map(e, function (e) {
                return e[n]
            })
        }, keys: function (e) {
            var t = [];
            for (var n in e)e.hasOwnProperty(n) && t.push(n);
            return t
        }, values: function (e) {
            var t = [];
            for (var n in e)e.hasOwnProperty(n) && t.push(e[n]);
            return t
        }, clone: function (e) {
            var t = {};
            for (var n in e)e.hasOwnProperty(n) && (t[n] = e[n]);
            return t
        }, defaults: function (e, t) {
            for (var n in t)t.hasOwnProperty(n) && (n in e || (e[n] = t[n]))
        }, subclass: function (e, t) {
            function n() {
                this.constructor = e
            }

            n.prototype = t.prototype, e.prototype = new n
        }, padLeft: function (e, t, n) {
            for (var r = e, s = n - e.length, i = 0; s > i; i++)r = t + r;
            return r
        }, escape: function (e) {
            var n, r, s = e.charCodeAt(0);
            return 255 >= s ? (n = "x", r = 2) : (n = "u", r = 4), "\\" + n + t.padLeft(s.toString(16).toUpperCase(), "0", r)
        }, quote: function (e) {
            return'"' + e.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g, t.escape) + '"'
        }, quoteForRegexpClass: function (e) {
            return e.replace(/\\/g, "\\\\").replace(/\//g, "\\/").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\v/g, "\\x0B").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x01-\x08\x0E-\x1F\x80-\uFFFF]/g, t.escape)
        }, buildNodeVisitor: function (e) {
            return function (t) {
                return e[t.type].apply(null, arguments)
            }
        }, findRuleByName: function (e, n) {
            return t.find(e.rules, function (e) {
                return e.name === n
            })
        }, indexOfRuleByName: function (e, n) {
            return t.indexOf(e.rules, function (e) {
                return e.name === n
            })
        }};
        e.exports = t
    }), modules.define("grammar-error", function (e, t) {
        var n = t("./utils");
        e.exports = function (e) {
            this.name = "GrammarError", this.message = e
        }, n.subclass(e.exports, Error)
    }), modules.define("parser", function (e, t) {
        e.exports = function () {
            function e(e, t) {
                function n() {
                    this.constructor = e
                }

                n.prototype = t.prototype, e.prototype = new n
            }

            function n(e, t, n, r, s, i) {
                this.message = e, this.expected = t, this.found = n, this.offset = r, this.line = s, this.column = i, this.name = "SyntaxError"
            }

            function r(e) {
                function r(e) {
                    throw o(e, null, Qr)
                }

                function s(t) {
                    function n(t, n, r) {
                        var s, i;
                        for (s = n; r > s; s++)i = e.charAt(s), "\n" === i ? (t.seenCR || t.line++, t.column = 1, t.seenCR = !1) : "\r" === i || "\u2028" === i || "\u2029" === i ? (t.line++, t.column = 1, t.seenCR = !0) : (t.column++, t.seenCR = !1)
                    }

                    return es !== t && (es > t && (es = 0, ts = {line: 1, column: 1, seenCR: !1}), n(ts, es, t), es = t), ts
                }

                function i(e) {
                    ns > Kr || (Kr > ns && (ns = Kr, rs = []), rs.push(e))
                }

                function o(t, r, i) {
                    function o(e) {
                        var t = 1;
                        for (e.sort(function (e, t) {
                            return e.description < t.description ? -1 : e.description > t.description ? 1 : 0
                        }); t < e.length;)e[t - 1] === e[t] ? e.splice(t, 1) : t++
                    }

                    function a(e, t) {
                        function n(e) {
                            function t(e) {
                                return e.charCodeAt(0).toString(16).toUpperCase()
                            }

                            return e.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g,function (e) {
                                return"\\x0" + t(e)
                            }).replace(/[\x10-\x1F\x80-\xFF]/g,function (e) {
                                return"\\x" + t(e)
                            }).replace(/[\u0180-\u0FFF]/g,function (e) {
                                return"\\u0" + t(e)
                            }).replace(/[\u1080-\uFFFF]/g, function (e) {
                                return"\\u" + t(e)
                            })
                        }

                        var r, s, i, o = new Array(e.length);
                        for (i = 0; i < e.length; i++)o[i] = e[i].description;
                        return r = e.length > 1 ? o.slice(0, -1).join(", ") + " or " + o[e.length - 1] : o[0], s = t ? '"' + n(t) + '"' : "end of input", "Expected " + r + " but " + s + " found."
                    }

                    var p = s(i), c = i < e.length ? e.charAt(i) : null;
                    return null !== r && o(r), new n(null !== t ? t : a(r, c), r, c, i, p.line, p.column)
                }

                function a() {
                    var e, t, n, r, s;
                    if (e = Kr, t = rt(), t !== ft)if (n = p(), n === ft && (n = mt), n !== ft) {
                        if (r = [], s = c(), s !== ft)for (; s !== ft;)r.push(s), s = c(); else r = gt;
                        r !== ft ? (Qr = e, t = vt(n, r), e = t) : (Kr = e, e = gt)
                    } else Kr = e, e = gt; else Kr = e, e = gt;
                    return e
                }

                function p() {
                    var e, t, n;
                    return e = Kr, t = m(), t !== ft ? (n = _(), n === ft && (n = mt), n !== ft ? (Qr = e, t = xt(t), e = t) : (Kr = e, e = gt)) : (Kr = e, e = gt), e
                }

                function c() {
                    var e, t, n, r, s, i;
                    return e = Kr, t = T(), t !== ft ? (n = L(), n === ft && (n = mt), n !== ft ? (r = R(), r !== ft ? (s = u(), s !== ft ? (i = _(), i === ft && (i = mt), i !== ft ? (Qr = e, t = Pt(t, n, s), e = t) : (Kr = e, e = gt)) : (Kr = e, e = gt)) : (Kr = e, e = gt)) : (Kr = e, e = gt)) : (Kr = e, e = gt), e
                }

                function u() {
                    var e, t, n, r, s, i;
                    if (e = Kr, t = l(), t !== ft) {
                        for (n = [], r = Kr, s = A(), s !== ft ? (i = l(), i !== ft ? (s = [s, i], r = s) : (Kr = r, r = gt)) : (Kr = r, r = gt); r !== ft;)n.push(r), r = Kr, s = A(), s !== ft ? (i = l(), i !== ft ? (s = [s, i], r = s) : (Kr = r, r = gt)) : (Kr = r, r = gt);
                        n !== ft ? (Qr = e, t = Rt(t, n), e = t) : (Kr = e, e = gt)
                    } else Kr = e, e = gt;
                    return e
                }

                function l() {
                    var e, t, n;
                    for (e = Kr, t = [], n = f(); n !== ft;)t.push(n), n = f();
                    if (t !== ft ? (n = m(), n !== ft ? (Qr = e, t = bt(t, n), e = t) : (Kr = e, e = gt)) : (Kr = e, e = gt), e === ft) {
                        for (e = Kr, t = [], n = f(); n !== ft;)t.push(n), n = f();
                        t !== ft && (Qr = e, t = _t(t)), e = t
                    }
                    return e
                }

                function f() {
                    var e, t, n, r;
                    return e = Kr, t = T(), t !== ft ? (n = b(), n !== ft ? (r = d(), r !== ft ? (Qr = e, t = At(t, r), e = t) : (Kr = e, e = gt)) : (Kr = e, e = gt)) : (Kr = e, e = gt), e === ft && (e = d()), e
                }

                function d() {
                    var e, t, n;
                    return e = Kr, t = y(), t !== ft ? (n = h(), n !== ft ? (Qr = e, t = Ct(n), e = t) : (Kr = e, e = gt)) : (Kr = e, e = gt), e === ft && (e = Kr, t = C(), t !== ft ? (n = m(), n !== ft ? (Qr = e, t = $t(n), e = t) : (Kr = e, e = gt)) : (Kr = e, e = gt), e === ft && (e = Kr, t = C(), t !== ft ? (n = h(), n !== ft ? (Qr = e, t = yt(n), e = t) : (Kr = e, e = gt)) : (Kr = e, e = gt), e === ft && (e = Kr, t = $(), t !== ft ? (n = m(), n !== ft ? (Qr = e, t = Ft(n), e = t) : (Kr = e, e = gt)) : (Kr = e, e = gt), e === ft && (e = Kr, t = $(), t !== ft ? (n = h(), n !== ft ? (Qr = e, t = Et(n), e = t) : (Kr = e, e = gt)) : (Kr = e, e = gt), e === ft && (e = h()))))), e
                }

                function h() {
                    var e, t, n;
                    return e = Kr, t = g(), t !== ft ? (n = F(), n !== ft ? (Qr = e, t = kt(t), e = t) : (Kr = e, e = gt)) : (Kr = e, e = gt), e === ft && (e = Kr, t = g(), t !== ft ? (n = E(), n !== ft ? (Qr = e, t = Ot(t), e = t) : (Kr = e, e = gt)) : (Kr = e, e = gt), e === ft && (e = Kr, t = g(), t !== ft ? (n = k(), n !== ft ? (Qr = e, t = It(t), e = t) : (Kr = e, e = gt)) : (Kr = e, e = gt), e === ft && (e = g()))), e
                }

                function g() {
                    var e, t, n, r, s, i;
                    return e = Kr, t = T(), t !== ft ? (n = Kr, ss++, r = Kr, s = L(), s === ft && (s = mt), s !== ft ? (i = R(), i !== ft ? (s = [s, i], r = s) : (Kr = r, r = gt)) : (Kr = r, r = gt), ss--, r === ft ? n = St : (Kr = n, n = gt), n !== ft ? (Qr = e, t = Tt(t), e = t) : (Kr = e, e = gt)) : (Kr = e, e = gt), e === ft && (e = N(), e === ft && (e = z(), e === ft && (e = Kr, t = S(), t !== ft && (Qr = e, t = Nt()), e = t, e === ft && (e = Kr, t = O(), t !== ft ? (n = u(), n !== ft ? (r = I(), r !== ft ? (Qr = e, t = Lt(n), e = t) : (Kr = e, e = gt)) : (Kr = e, e = gt)) : (Kr = e, e = gt))))), e
                }

                function m() {
                    var e, t, n;
                    return ss++, e = Kr, t = v(), t !== ft ? (n = rt(), n !== ft ? (Qr = e, t = jt(t), e = t) : (Kr = e, e = gt)) : (Kr = e, e = gt), ss--, e === ft && (t = ft, 0 === ss && i(wt)), e
                }

                function v() {
                    var t, n, r, s, o;
                    if (t = Kr, n = Kr, 123 === e.charCodeAt(Kr) ? (r = Dt, Kr++) : (r = ft, 0 === ss && i(Ut)), r !== ft) {
                        for (s = [], o = v(), o === ft && (o = x()); o !== ft;)s.push(o), o = v(), o === ft && (o = x());
                        s !== ft ? (125 === e.charCodeAt(Kr) ? (o = Ht, Kr++) : (o = ft, 0 === ss && i(qt)), o !== ft ? (r = [r, s, o], n = r) : (Kr = n, n = gt)) : (Kr = n, n = gt)
                    } else Kr = n, n = gt;
                    return n !== ft && (n = e.substring(t, Kr)), t = n
                }

                function x() {
                    var e, t;
                    if (e = [], t = P(), t !== ft)for (; t !== ft;)e.push(t), t = P(); else e = gt;
                    return e
                }

                function P() {
                    var t;
                    return zt.test(e.charAt(Kr)) ? (t = e.charAt(Kr), Kr++) : (t = ft, 0 === ss && i(Gt)), t
                }

                function R() {
                    var t, n, r;
                    return t = Kr, 61 === e.charCodeAt(Kr) ? (n = Mt, Kr++) : (n = ft, 0 === ss && i(Bt)), n !== ft ? (r = rt(), r !== ft ? (Qr = t, n = Vt(), t = n) : (Kr = t, t = gt)) : (Kr = t, t = gt), t
                }

                function b() {
                    var t, n, r;
                    return t = Kr, 58 === e.charCodeAt(Kr) ? (n = Wt, Kr++) : (n = ft, 0 === ss && i(Xt)), n !== ft ? (r = rt(), r !== ft ? (Qr = t, n = Yt(), t = n) : (Kr = t, t = gt)) : (Kr = t, t = gt), t
                }

                function _() {
                    var t, n, r;
                    return t = Kr, 59 === e.charCodeAt(Kr) ? (n = Zt, Kr++) : (n = ft, 0 === ss && i(Jt)), n !== ft ? (r = rt(), r !== ft ? (Qr = t, n = Kt(), t = n) : (Kr = t, t = gt)) : (Kr = t, t = gt), t
                }

                function A() {
                    var t, n, r;
                    return t = Kr, 47 === e.charCodeAt(Kr) ? (n = Qt, Kr++) : (n = ft, 0 === ss && i(en)), n !== ft ? (r = rt(), r !== ft ? (Qr = t, n = tn(), t = n) : (Kr = t, t = gt)) : (Kr = t, t = gt), t
                }

                function C() {
                    var t, n, r;
                    return t = Kr, 38 === e.charCodeAt(Kr) ? (n = nn, Kr++) : (n = ft, 0 === ss && i(rn)), n !== ft ? (r = rt(), r !== ft ? (Qr = t, n = sn(), t = n) : (Kr = t, t = gt)) : (Kr = t, t = gt), t
                }

                function $() {
                    var t, n, r;
                    return t = Kr, 33 === e.charCodeAt(Kr) ? (n = on, Kr++) : (n = ft, 0 === ss && i(an)), n !== ft ? (r = rt(), r !== ft ? (Qr = t, n = pn(), t = n) : (Kr = t, t = gt)) : (Kr = t, t = gt), t
                }

                function y() {
                    var t, n, r;
                    return t = Kr, 36 === e.charCodeAt(Kr) ? (n = cn, Kr++) : (n = ft, 0 === ss && i(un)), n !== ft ? (r = rt(), r !== ft ? (Qr = t, n = ln(), t = n) : (Kr = t, t = gt)) : (Kr = t, t = gt), t
                }

                function F() {
                    var t, n, r;
                    return t = Kr, 63 === e.charCodeAt(Kr) ? (n = fn, Kr++) : (n = ft, 0 === ss && i(dn)), n !== ft ? (r = rt(), r !== ft ? (Qr = t, n = hn(), t = n) : (Kr = t, t = gt)) : (Kr = t, t = gt), t
                }

                function E() {
                    var t, n, r;
                    return t = Kr, 42 === e.charCodeAt(Kr) ? (n = gn, Kr++) : (n = ft, 0 === ss && i(mn)), n !== ft ? (r = rt(), r !== ft ? (Qr = t, n = vn(), t = n) : (Kr = t, t = gt)) : (Kr = t, t = gt), t
                }

                function k() {
                    var t, n, r;
                    return t = Kr, 43 === e.charCodeAt(Kr) ? (n = xn, Kr++) : (n = ft, 0 === ss && i(Pn)), n !== ft ? (r = rt(), r !== ft ? (Qr = t, n = Rn(), t = n) : (Kr = t, t = gt)) : (Kr = t, t = gt), t
                }

                function O() {
                    var t, n, r;
                    return t = Kr, 40 === e.charCodeAt(Kr) ? (n = bn, Kr++) : (n = ft, 0 === ss && i(_n)), n !== ft ? (r = rt(), r !== ft ? (Qr = t, n = An(), t = n) : (Kr = t, t = gt)) : (Kr = t, t = gt), t
                }

                function I() {
                    var t, n, r;
                    return t = Kr, 41 === e.charCodeAt(Kr) ? (n = Cn, Kr++) : (n = ft, 0 === ss && i($n)), n !== ft ? (r = rt(), r !== ft ? (Qr = t, n = yn(), t = n) : (Kr = t, t = gt)) : (Kr = t, t = gt), t
                }

                function S() {
                    var t, n, r;
                    return t = Kr, 46 === e.charCodeAt(Kr) ? (n = Fn, Kr++) : (n = ft, 0 === ss && i(En)), n !== ft ? (r = rt(), r !== ft ? (Qr = t, n = kn(), t = n) : (Kr = t, t = gt)) : (Kr = t, t = gt), t
                }

                function T() {
                    var t, n, r, s, o, a;
                    if (ss++, t = Kr, n = Kr, r = Kr, s = et(), s === ft && (95 === e.charCodeAt(Kr) ? (s = In, Kr++) : (s = ft, 0 === ss && i(Sn))), s !== ft) {
                        for (o = [], a = et(), a === ft && (a = K(), a === ft && (95 === e.charCodeAt(Kr) ? (a = In, Kr++) : (a = ft, 0 === ss && i(Sn)))); a !== ft;)o.push(a), a = et(), a === ft && (a = K(), a === ft && (95 === e.charCodeAt(Kr) ? (a = In, Kr++) : (a = ft, 0 === ss && i(Sn))));
                        o !== ft ? (s = [s, o], r = s) : (Kr = r, r = gt)
                    } else Kr = r, r = gt;
                    return r !== ft && (r = e.substring(n, Kr)), n = r, n !== ft ? (r = rt(), r !== ft ? (Qr = t, n = Tn(n), t = n) : (Kr = t, t = gt)) : (Kr = t, t = gt), ss--, t === ft && (n = ft, 0 === ss && i(On)), t
                }

                function N() {
                    var t, n, r, s;
                    return ss++, t = Kr, n = w(), n === ft && (n = U()), n !== ft ? (105 === e.charCodeAt(Kr) ? (r = Ln, Kr++) : (r = ft, 0 === ss && i(wn)), r === ft && (r = mt), r !== ft ? (s = rt(), s !== ft ? (Qr = t, n = jn(n, r), t = n) : (Kr = t, t = gt)) : (Kr = t, t = gt)) : (Kr = t, t = gt), ss--, t === ft && (n = ft, 0 === ss && i(Nn)), t
                }

                function L() {
                    var e, t, n;
                    return ss++, e = Kr, t = w(), t === ft && (t = U()), t !== ft ? (n = rt(), n !== ft ? (Qr = e, t = Un(t), e = t) : (Kr = e, e = gt)) : (Kr = e, e = gt), ss--, e === ft && (t = ft, 0 === ss && i(Dn)), e
                }

                function w() {
                    var t, n, r, s;
                    if (t = Kr, 34 === e.charCodeAt(Kr) ? (n = Hn, Kr++) : (n = ft, 0 === ss && i(qn)), n !== ft) {
                        for (r = [], s = j(); s !== ft;)r.push(s), s = j();
                        r !== ft ? (34 === e.charCodeAt(Kr) ? (s = Hn, Kr++) : (s = ft, 0 === ss && i(qn)), s !== ft ? (Qr = t, n = zn(r), t = n) : (Kr = t, t = gt)) : (Kr = t, t = gt)
                    } else Kr = t, t = gt;
                    return t
                }

                function j() {
                    var e;
                    return e = D(), e === ft && (e = W(), e === ft && (e = X(), e === ft && (e = Y(), e === ft && (e = Z(), e === ft && (e = J()))))), e
                }

                function D() {
                    var t, n, r;
                    return t = Kr, n = Kr, ss++, 34 === e.charCodeAt(Kr) ? (r = Hn, Kr++) : (r = ft, 0 === ss && i(qn)), r === ft && (92 === e.charCodeAt(Kr) ? (r = Gn, Kr++) : (r = ft, 0 === ss && i(Mn)), r === ft && (r = pt())), ss--, r === ft ? n = St : (Kr = n, n = gt), n !== ft ? (e.length > Kr ? (r = e.charAt(Kr), Kr++) : (r = ft, 0 === ss && i(Bn)), r !== ft ? (Qr = t, n = Vn(r), t = n) : (Kr = t, t = gt)) : (Kr = t, t = gt), t
                }

                function U() {
                    var t, n, r, s;
                    if (t = Kr, 39 === e.charCodeAt(Kr) ? (n = Wn, Kr++) : (n = ft, 0 === ss && i(Xn)), n !== ft) {
                        for (r = [], s = H(); s !== ft;)r.push(s), s = H();
                        r !== ft ? (39 === e.charCodeAt(Kr) ? (s = Wn, Kr++) : (s = ft, 0 === ss && i(Xn)), s !== ft ? (Qr = t, n = zn(r), t = n) : (Kr = t, t = gt)) : (Kr = t, t = gt)
                    } else Kr = t, t = gt;
                    return t
                }

                function H() {
                    var e;
                    return e = q(), e === ft && (e = W(), e === ft && (e = X(), e === ft && (e = Y(), e === ft && (e = Z(), e === ft && (e = J()))))), e
                }

                function q() {
                    var t, n, r;
                    return t = Kr, n = Kr, ss++, 39 === e.charCodeAt(Kr) ? (r = Wn, Kr++) : (r = ft, 0 === ss && i(Xn)), r === ft && (92 === e.charCodeAt(Kr) ? (r = Gn, Kr++) : (r = ft, 0 === ss && i(Mn)), r === ft && (r = pt())), ss--, r === ft ? n = St : (Kr = n, n = gt), n !== ft ? (e.length > Kr ? (r = e.charAt(Kr), Kr++) : (r = ft, 0 === ss && i(Bn)), r !== ft ? (Qr = t, n = Vn(r), t = n) : (Kr = t, t = gt)) : (Kr = t, t = gt), t
                }

                function z() {
                    var t, n, r, s, o, a, p;
                    if (ss++, t = Kr, 91 === e.charCodeAt(Kr) ? (n = Zn, Kr++) : (n = ft, 0 === ss && i(Jn)), n !== ft)if (94 === e.charCodeAt(Kr) ? (r = Kn, Kr++) : (r = ft, 0 === ss && i(Qn)), r === ft && (r = mt), r !== ft) {
                        for (s = [], o = G(), o === ft && (o = M()); o !== ft;)s.push(o), o = G(), o === ft && (o = M());
                        s !== ft ? (93 === e.charCodeAt(Kr) ? (o = er, Kr++) : (o = ft, 0 === ss && i(tr)), o !== ft ? (105 === e.charCodeAt(Kr) ? (a = Ln, Kr++) : (a = ft, 0 === ss && i(wn)), a === ft && (a = mt), a !== ft ? (p = rt(), p !== ft ? (Qr = t, n = nr(r, s, a), t = n) : (Kr = t, t = gt)) : (Kr = t, t = gt)) : (Kr = t, t = gt)) : (Kr = t, t = gt)
                    } else Kr = t, t = gt; else Kr = t, t = gt;
                    return ss--, t === ft && (n = ft, 0 === ss && i(Yn)), t
                }

                function G() {
                    var t, n, r, s;
                    return t = Kr, n = M(), n !== ft ? (45 === e.charCodeAt(Kr) ? (r = rr, Kr++) : (r = ft, 0 === ss && i(sr)), r !== ft ? (s = M(), s !== ft ? (Qr = t, n = ir(n, s), t = n) : (Kr = t, t = gt)) : (Kr = t, t = gt)) : (Kr = t, t = gt), t
                }

                function M() {
                    var e, t;
                    return e = Kr, t = B(), t !== ft && (Qr = e, t = or(t)), e = t
                }

                function B() {
                    var e;
                    return e = V(), e === ft && (e = W(), e === ft && (e = X(), e === ft && (e = Y(), e === ft && (e = Z(), e === ft && (e = J()))))), e
                }

                function V() {
                    var t, n, r;
                    return t = Kr, n = Kr, ss++, 93 === e.charCodeAt(Kr) ? (r = er, Kr++) : (r = ft, 0 === ss && i(tr)), r === ft && (92 === e.charCodeAt(Kr) ? (r = Gn, Kr++) : (r = ft, 0 === ss && i(Mn)), r === ft && (r = pt())), ss--, r === ft ? n = St : (Kr = n, n = gt), n !== ft ? (e.length > Kr ? (r = e.charAt(Kr), Kr++) : (r = ft, 0 === ss && i(Bn)), r !== ft ? (Qr = t, n = Vn(r), t = n) : (Kr = t, t = gt)) : (Kr = t, t = gt), t
                }

                function W() {
                    var t, n, r, s;
                    return t = Kr, 92 === e.charCodeAt(Kr) ? (n = Gn, Kr++) : (n = ft, 0 === ss && i(Mn)), n !== ft ? (r = Kr, ss++, s = K(), s === ft && (120 === e.charCodeAt(Kr) ? (s = ar, Kr++) : (s = ft, 0 === ss && i(pr)), s === ft && (117 === e.charCodeAt(Kr) ? (s = cr, Kr++) : (s = ft, 0 === ss && i(ur)), s === ft && (s = pt()))), ss--, s === ft ? r = St : (Kr = r, r = gt), r !== ft ? (e.length > Kr ? (s = e.charAt(Kr), Kr++) : (s = ft, 0 === ss && i(Bn)), s !== ft ? (Qr = t, n = lr(s), t = n) : (Kr = t, t = gt)) : (Kr = t, t = gt)) : (Kr = t, t = gt), t
                }

                function X() {
                    var t, n, r, s;
                    return t = Kr, e.substr(Kr, 2) === fr ? (n = fr, Kr += 2) : (n = ft, 0 === ss && i(dr)), n !== ft ? (r = Kr, ss++, s = K(), ss--, s === ft ? r = St : (Kr = r, r = gt), r !== ft ? (Qr = t, n = hr(), t = n) : (Kr = t, t = gt)) : (Kr = t, t = gt), t
                }

                function Y() {
                    var t, n, r, s, o, a;
                    return t = Kr, e.substr(Kr, 2) === gr ? (n = gr, Kr += 2) : (n = ft, 0 === ss && i(mr)), n !== ft ? (r = Kr, s = Kr, o = Q(), o !== ft ? (a = Q(), a !== ft ? (o = [o, a], s = o) : (Kr = s, s = gt)) : (Kr = s, s = gt), s !== ft && (s = e.substring(r, Kr)), r = s, r !== ft ? (Qr = t, n = vr(r), t = n) : (Kr = t, t = gt)) : (Kr = t, t = gt), t
                }

                function Z() {
                    var t, n, r, s, o, a, p, c;
                    return t = Kr, e.substr(Kr, 2) === xr ? (n = xr, Kr += 2) : (n = ft, 0 === ss && i(Pr)), n !== ft ? (r = Kr, s = Kr, o = Q(), o !== ft ? (a = Q(), a !== ft ? (p = Q(), p !== ft ? (c = Q(), c !== ft ? (o = [o, a, p, c], s = o) : (Kr = s, s = gt)) : (Kr = s, s = gt)) : (Kr = s, s = gt)) : (Kr = s, s = gt), s !== ft && (s = e.substring(r, Kr)), r = s, r !== ft ? (Qr = t, n = vr(r), t = n) : (Kr = t, t = gt)) : (Kr = t, t = gt), t
                }

                function J() {
                    var t, n, r;
                    return t = Kr, 92 === e.charCodeAt(Kr) ? (n = Gn, Kr++) : (n = ft, 0 === ss && i(Mn)), n !== ft ? (r = at(), r !== ft ? (Qr = t, n = Rr(r), t = n) : (Kr = t, t = gt)) : (Kr = t, t = gt), t
                }

                function K() {
                    var t;
                    return br.test(e.charAt(Kr)) ? (t = e.charAt(Kr), Kr++) : (t = ft, 0 === ss && i(_r)), t
                }

                function Q() {
                    var t;
                    return Ar.test(e.charAt(Kr)) ? (t = e.charAt(Kr), Kr++) : (t = ft, 0 === ss && i(Cr)), t
                }

                function et() {
                    var e;
                    return e = tt(), e === ft && (e = nt()), e
                }

                function tt() {
                    var t;
                    return $r.test(e.charAt(Kr)) ? (t = e.charAt(Kr), Kr++) : (t = ft, 0 === ss && i(yr)), t
                }

                function nt() {
                    var t;
                    return Fr.test(e.charAt(Kr)) ? (t = e.charAt(Kr), Kr++) : (t = ft, 0 === ss && i(Er)), t
                }

                function rt() {
                    var e, t;
                    for (e = [], t = ct(), t === ft && (t = at(), t === ft && (t = st())); t !== ft;)e.push(t), t = ct(), t === ft && (t = at(), t === ft && (t = st()));
                    return e
                }

                function st() {
                    var e, t;
                    return ss++, e = it(), e === ft && (e = ot()), ss--, e === ft && (t = ft, 0 === ss && i(kr)), e
                }

                function it() {
                    var t, n, r, s, o, a;
                    if (t = Kr, e.substr(Kr, 2) === Or ? (n = Or, Kr += 2) : (n = ft, 0 === ss && i(Ir)), n !== ft) {
                        for (r = [], s = Kr, o = Kr, ss++, a = pt(), ss--, a === ft ? o = St : (Kr = o, o = gt), o !== ft ? (e.length > Kr ? (a = e.charAt(Kr), Kr++) : (a = ft, 0 === ss && i(Bn)), a !== ft ? (o = [o, a], s = o) : (Kr = s, s = gt)) : (Kr = s, s = gt); s !== ft;)r.push(s), s = Kr, o = Kr, ss++, a = pt(), ss--, a === ft ? o = St : (Kr = o, o = gt), o !== ft ? (e.length > Kr ? (a = e.charAt(Kr), Kr++) : (a = ft, 0 === ss && i(Bn)), a !== ft ? (o = [o, a], s = o) : (Kr = s, s = gt)) : (Kr = s, s = gt);
                        r !== ft ? (n = [n, r], t = n) : (Kr = t, t = gt)
                    } else Kr = t, t = gt;
                    return t
                }

                function ot() {
                    var t, n, r, s, o, a;
                    if (t = Kr, e.substr(Kr, 2) === Sr ? (n = Sr, Kr += 2) : (n = ft, 0 === ss && i(Tr)), n !== ft) {
                        for (r = [], s = Kr, o = Kr, ss++, e.substr(Kr, 2) === Nr ? (a = Nr, Kr += 2) : (a = ft, 0 === ss && i(Lr)), ss--, a === ft ? o = St : (Kr = o, o = gt), o !== ft ? (e.length > Kr ? (a = e.charAt(Kr), Kr++) : (a = ft, 0 === ss && i(Bn)), a !== ft ? (o = [o, a], s = o) : (Kr = s, s = gt)) : (Kr = s, s = gt); s !== ft;)r.push(s), s = Kr, o = Kr, ss++, e.substr(Kr, 2) === Nr ? (a = Nr, Kr += 2) : (a = ft, 0 === ss && i(Lr)), ss--, a === ft ? o = St : (Kr = o, o = gt), o !== ft ? (e.length > Kr ? (a = e.charAt(Kr), Kr++) : (a = ft, 0 === ss && i(Bn)), a !== ft ? (o = [o, a], s = o) : (Kr = s, s = gt)) : (Kr = s, s = gt);
                        r !== ft ? (e.substr(Kr, 2) === Nr ? (s = Nr, Kr += 2) : (s = ft, 0 === ss && i(Lr)), s !== ft ? (n = [n, r, s], t = n) : (Kr = t, t = gt)) : (Kr = t, t = gt)
                    } else Kr = t, t = gt;
                    return t
                }

                function at() {
                    var t, n;
                    return ss++, 10 === e.charCodeAt(Kr) ? (t = jr, Kr++) : (t = ft, 0 === ss && i(Dr)), t === ft && (e.substr(Kr, 2) === Ur ? (t = Ur, Kr += 2) : (t = ft, 0 === ss && i(Hr)), t === ft && (13 === e.charCodeAt(Kr) ? (t = qr, Kr++) : (t = ft, 0 === ss && i(zr)), t === ft && (8232 === e.charCodeAt(Kr) ? (t = Gr, Kr++) : (t = ft, 0 === ss && i(Mr)), t === ft && (8233 === e.charCodeAt(Kr) ? (t = Br, Kr++) : (t = ft, 0 === ss && i(Vr)))))), ss--, t === ft && (n = ft, 0 === ss && i(wr)), t
                }

                function pt() {
                    var t;
                    return Wr.test(e.charAt(Kr)) ? (t = e.charAt(Kr), Kr++) : (t = ft, 0 === ss && i(Xr)), t
                }

                function ct() {
                    var t, n;
                    return ss++, Zr.test(e.charAt(Kr)) ? (t = e.charAt(Kr), Kr++) : (t = ft, 0 === ss && i(Jr)), ss--, t === ft && (n = ft, 0 === ss && i(Yr)), t
                }

                var ut, lt = arguments.length > 1 ? arguments[1] : {}, ft = {}, dt = {grammar: a}, ht = a, gt = ft, mt = null, vt = function (e, t) {
                    return{type: "grammar", initializer: e, rules: t}
                }, xt = function (e) {
                    return{type: "initializer", code: e}
                }, Pt = function (e, t, n) {
                    return{type: "rule", name: e, expression: null !== t ? {type: "named", name: t, expression: n} : n}
                }, Rt = function (e, t) {
                    if (t.length > 0) {
                        var n = [e].concat(is.map(t, function (e) {
                            return e[1]
                        }));
                        return{type: "choice", alternatives: n}
                    }
                    return e
                }, bt = function (e, t) {
                    var n = 1 !== e.length ? {type: "sequence", elements: e} : e[0];
                    return{type: "action", expression: n, code: t}
                }, _t = function (e) {
                    return 1 !== e.length ? {type: "sequence", elements: e} : e[0]
                }, At = function (e, t) {
                    return{type: "labeled", label: e, expression: t}
                }, Ct = function (e) {
                    return{type: "text", expression: e}
                }, $t = function (e) {
                    return{type: "semantic_and", code: e}
                }, yt = function (e) {
                    return{type: "simple_and", expression: e}
                }, Ft = function (e) {
                    return{type: "semantic_not", code: e}
                }, Et = function (e) {
                    return{type: "simple_not", expression: e}
                }, kt = function (e) {
                    return{type: "optional", expression: e}
                }, Ot = function (e) {
                    return{type: "zero_or_more", expression: e}
                }, It = function (e) {
                    return{type: "one_or_more", expression: e}
                }, St = void 0, Tt = function (e) {
                    return{type: "rule_ref", name: e}
                }, Nt = function () {
                    return{type: "any"}
                }, Lt = function (e) {
                    return e
                }, wt = {type: "other", description: "action"}, jt = function (e) {
                    return e.substr(1, e.length - 2)
                }, Dt = "{", Ut = {type: "literal", value: "{", description: '"{"'}, Ht = "}", qt = {type: "literal", value: "}", description: '"}"'}, zt = /^[^{}]/, Gt = {type: "class", value: "[^{}]", description: "[^{}]"}, Mt = "=", Bt = {type: "literal", value: "=", description: '"="'}, Vt = function () {
                    return"="
                }, Wt = ":", Xt = {type: "literal", value: ":", description: '":"'}, Yt = function () {
                    return":"
                }, Zt = ";", Jt = {type: "literal", value: ";", description: '";"'}, Kt = function () {
                    return";"
                }, Qt = "/", en = {type: "literal", value: "/", description: '"/"'}, tn = function () {
                    return"/"
                }, nn = "&", rn = {type: "literal", value: "&", description: '"&"'}, sn = function () {
                    return"&"
                }, on = "!", an = {type: "literal", value: "!", description: '"!"'}, pn = function () {
                    return"!"
                }, cn = "$", un = {type: "literal", value: "$", description: '"$"'}, ln = function () {
                    return"$"
                }, fn = "?", dn = {type: "literal", value: "?", description: '"?"'}, hn = function () {
                    return"?"
                }, gn = "*", mn = {type: "literal", value: "*", description: '"*"'}, vn = function () {
                    return"*"
                }, xn = "+", Pn = {type: "literal", value: "+", description: '"+"'}, Rn = function () {
                    return"+"
                }, bn = "(", _n = {type: "literal", value: "(", description: '"("'}, An = function () {
                    return"("
                }, Cn = ")", $n = {type: "literal", value: ")", description: '")"'}, yn = function () {
                    return")"
                }, Fn = ".", En = {type: "literal", value: ".", description: '"."'}, kn = function () {
                    return"."
                }, On = {type: "other", description: "identifier"}, In = "_", Sn = {type: "literal", value: "_", description: '"_"'}, Tn = function (e) {
                    return e
                }, Nn = {type: "other", description: "literal"}, Ln = "i", wn = {type: "literal", value: "i", description: '"i"'}, jn = function (e, t) {
                    return{type: "literal", value: e, ignoreCase: "i" === t}
                }, Dn = {type: "other", description: "string"}, Un = function (e) {
                    return e
                }, Hn = '"', qn = {type: "literal", value: '"', description: '"\\""'}, zn = function (e) {
                    return e.join("")
                }, Gn = "\\", Mn = {type: "literal", value: "\\", description: '"\\\\"'}, Bn = {type: "any", description: "any character"}, Vn = function (e) {
                    return e
                }, Wn = "'", Xn = {type: "literal", value: "'", description: '"\'"'}, Yn = {type: "other", description: "character class"}, Zn = "[", Jn = {type: "literal", value: "[", description: '"["'}, Kn = "^", Qn = {type: "literal", value: "^", description: '"^"'}, er = "]", tr = {type: "literal", value: "]", description: '"]"'}, nr = function (e, t, n) {
                    var r = is.map(t, function (e) {
                        return e.data
                    }), s = "[" + (null !== e ? e : "") + is.map(t,function (e) {
                        return e.rawText
                    }).join("") + "]" + (null !== n ? n : "");
                    return{type: "class", parts: r, rawText: s, inverted: "^" === e, ignoreCase: "i" === n}
                }, rr = "-", sr = {type: "literal", value: "-", description: '"-"'}, ir = function (e, t) {
                    return e.data.charCodeAt(0) > t.data.charCodeAt(0) && r("Invalid character range: " + e.rawText + "-" + t.rawText + "."), {data: [e.data, t.data], rawText: e.rawText + "-" + t.rawText}
                }, or = function (e) {
                    return{data: e, rawText: is.quoteForRegexpClass(e)}
                }, ar = "x", pr = {type: "literal", value: "x", description: '"x"'}, cr = "u", ur = {type: "literal", value: "u", description: '"u"'}, lr = function (e) {
                    return e.replace("b", "\b").replace("f", "\f").replace("n", "\n").replace("r", "\r").replace("t", "	").replace("v", "")
                }, fr = "\\0", dr = {type: "literal", value: "\\0", description: '"\\\\0"'}, hr = function () {
                    return"\x00"
                }, gr = "\\x", mr = {type: "literal", value: "\\x", description: '"\\\\x"'}, vr = function (e) {
                    return String.fromCharCode(parseInt(e, 16))
                }, xr = "\\u", Pr = {type: "literal", value: "\\u", description: '"\\\\u"'}, Rr = function (e) {
                    return e
                }, br = /^[0-9]/, _r = {type: "class", value: "[0-9]", description: "[0-9]"}, Ar = /^[0-9a-fA-F]/, Cr = {type: "class", value: "[0-9a-fA-F]", description: "[0-9a-fA-F]"}, $r = /^[a-z]/, yr = {type: "class", value: "[a-z]", description: "[a-z]"}, Fr = /^[A-Z]/, Er = {type: "class", value: "[A-Z]", description: "[A-Z]"}, kr = {type: "other", description: "comment"}, Or = "//", Ir = {type: "literal", value: "//", description: '"//"'}, Sr = "/*", Tr = {type: "literal", value: "/*", description: '"/*"'}, Nr = "*/", Lr = {type: "literal", value: "*/", description: '"*/"'}, wr = {type: "other", description: "end of line"}, jr = "\n", Dr = {type: "literal", value: "\n", description: '"\\n"'}, Ur = "\r\n", Hr = {type: "literal", value: "\r\n", description: '"\\r\\n"'}, qr = "\r", zr = {type: "literal", value: "\r", description: '"\\r"'}, Gr = "\u2028", Mr = {type: "literal", value: "\u2028", description: '"\\u2028"'}, Br = "\u2029", Vr = {type: "literal", value: "\u2029", description: '"\\u2029"'}, Wr = /^[\n\r\u2028\u2029]/, Xr = {type: "class", value: "[\\n\\r\\u2028\\u2029]", description: "[\\n\\r\\u2028\\u2029]"}, Yr = {type: "other", description: "whitespace"}, Zr = /^[ \t\x0B\f\xA0\uFEFF\u1680\u180E\u2000-\u200A\u202F\u205F\u3000]/, Jr = {type: "class", value: "[ \\t\\x0B\\f\\xA0\\uFEFF\\u1680\\u180E\\u2000-\\u200A\\u202F\\u205F\\u3000]", description: "[ \\t\\x0B\\f\\xA0\\uFEFF\\u1680\\u180E\\u2000-\\u200A\\u202F\\u205F\\u3000]"}, Kr = 0, Qr = 0, es = 0, ts = {line: 1, column: 1, seenCR: !1}, ns = 0, rs = [], ss = 0;
                if ("startRule"in lt) {
                    if (!(lt.startRule in dt))throw new Error("Can't start parsing from rule \"" + lt.startRule + '".');
                    ht = dt[lt.startRule]
                }
                var is = t("./utils");
                if (ut = ht(), ut !== ft && Kr === e.length)return ut;
                throw ut !== ft && Kr < e.length && i({type: "end", description: "end of input"}), o(null, rs, ns)
            }

            return e(n, Error), {SyntaxError: n, parse: r}
        }()
    }), modules.define("compiler/opcodes", function (e) {
        e.exports = {PUSH: 0, PUSH_CURR_POS: 1, POP: 2, POP_CURR_POS: 3, POP_N: 4, NIP: 5, APPEND: 6, WRAP: 7, TEXT: 8, IF: 9, IF_ERROR: 10, IF_NOT_ERROR: 11, WHILE_NOT_ERROR: 12, MATCH_ANY: 13, MATCH_STRING: 14, MATCH_STRING_IC: 15, MATCH_REGEXP: 16, ACCEPT_N: 17, ACCEPT_STRING: 18, FAIL: 19, REPORT_SAVED_POS: 20, REPORT_CURR_POS: 21, CALL: 22, RULE: 23, SILENT_FAILS_ON: 24, SILENT_FAILS_OFF: 25}
    }), modules.define("compiler/passes/generate-bytecode", function (e, t) {
        var n = t("../../utils"), r = t("../opcodes");
        e.exports = function (e) {
            function t(e) {
                var t = n.indexOf(f, function (t) {
                    return t === e
                });
                return-1 === t ? f.push(e) - 1 : t
            }

            function s(e, n) {
                return t("function(" + e.join(", ") + ") {" + n + "}")
            }

            function i() {
                return Array.prototype.concat.apply([], arguments)
            }

            function o(e, t, n) {
                return e.concat([t.length, n.length], t, n)
            }

            function a(e, t) {
                return e.concat([t.length], t)
            }

            function p(e, t, s, i) {
                var o = n.map(n.values(s), function (e) {
                    return i - e
                });
                return[r.CALL, e, t, o.length].concat(o)
            }

            function c(e, n, s) {
                var a = t("void 0"), p = t("peg$FAILED");
                return i([r.PUSH_CURR_POS], [r.SILENT_FAILS_ON], d(e, {sp: s.sp + 1, env: {}, action: null}), [r.SILENT_FAILS_OFF], o([n ? r.IF_ERROR : r.IF_NOT_ERROR], i([r.POP], [n ? r.POP : r.POP_CURR_POS], [r.PUSH, a]), i([r.POP], [n ? r.POP_CURR_POS : r.POP], [r.PUSH, p])))
            }

            function u(e, a, c) {
                var u = s(n.keys(c.env), e), l = t("void 0"), f = t("peg$FAILED");
                return i([r.REPORT_CURR_POS], p(u, 0, c.env, c.sp), o([r.IF], i([r.POP], [r.PUSH, a ? f : l]), i([r.POP], [r.PUSH, a ? l : f])))
            }

            function l(e) {
                return a([r.WHILE_NOT_ERROR], i([r.APPEND], e))
            }

            var f = [], d = n.buildNodeVisitor({grammar: function (e) {
                n.each(e.rules, d), e.consts = f
            }, rule: function (e) {
                e.bytecode = d(e.expression, {sp: -1, env: {}, action: null})
            }, named: function (e, s) {
                var a = t('{ type: "other", description: ' + n.quote(e.name) + " }");
                return i([r.SILENT_FAILS_ON], d(e.expression, s), [r.SILENT_FAILS_OFF], o([r.IF_ERROR], [r.FAIL, a], []))
            }, choice: function (e, t) {
                function n(e, t) {
                    return i(d(e[0], {sp: t.sp, env: {}, action: null}), e.length > 1 ? o([r.IF_ERROR], i([r.POP], n(e.slice(1), t)), []) : [])
                }

                return n(e.alternatives, t)
            }, action: function (e, t) {
                var a = {}, c = "sequence" !== e.expression.type || 0 === e.expression.elements.length, u = d(e.expression, {sp: t.sp + (c ? 1 : 0), env: a, action: e}), l = s(n.keys(a), e.code);
                return c ? i([r.PUSH_CURR_POS], u, o([r.IF_NOT_ERROR], i([r.REPORT_SAVED_POS, 1], p(l, 1, a, t.sp + 2)), []), [r.NIP]) : u
            }, sequence: function (e, a) {
                function c(t, a) {
                    var u, l;
                    return t.length > 0 ? (u = e.elements.length - t.slice(1).length, i(d(t[0], {sp: a.sp, env: a.env, action: null}), o([r.IF_NOT_ERROR], c(t.slice(1), {sp: a.sp + 1, env: a.env, action: a.action}), i(u > 1 ? [r.POP_N, u] : [r.POP], [r.POP_CURR_POS], [r.PUSH, failedIndex])))) : a.action ? (l = s(n.keys(a.env), a.action.code), i([r.REPORT_SAVED_POS, e.elements.length], p(l, e.elements.length, a.env, a.sp), [r.NIP])) : i([r.WRAP, e.elements.length], [r.NIP])
                }

                var u;
                return e.elements.length > 0 ? (failedIndex = t("peg$FAILED"), i([r.PUSH_CURR_POS], c(e.elements, {sp: a.sp + 1, env: a.env, action: a.action}))) : (u = t("[]"), [r.PUSH, u])
            }, labeled: function (e, t) {
                return t.env[e.label] = t.sp + 1, d(e.expression, {sp: t.sp, env: {}, action: null})
            }, text: function (e, t) {
                return i([r.PUSH_CURR_POS], d(e.expression, {sp: t.sp + 1, env: {}, action: null}), o([r.IF_NOT_ERROR], [r.TEXT], []), [r.NIP])
            }, simple_and: function (e, t) {
                return c(e.expression, !1, t)
            }, simple_not: function (e, t) {
                return c(e.expression, !0, t)
            }, semantic_and: function (e, t) {
                return u(e.code, !1, t)
            }, semantic_not: function (e, t) {
                return u(e.code, !0, t)
            }, optional: function (e, n) {
                var s = t("null");
                return i(d(e.expression, {sp: n.sp, env: {}, action: null}), o([r.IF_ERROR], i([r.POP], [r.PUSH, s]), []))
            }, zero_or_more: function (e, n) {
                var s = t("[]");
                return expressionCode = d(e.expression, {sp: n.sp + 1, env: {}, action: null}), i([r.PUSH, s], expressionCode, l(expressionCode), [r.POP])
            }, one_or_more: function (e, n) {
                var s = t("[]");
                return failedIndex = t("peg$FAILED"), expressionCode = d(e.expression, {sp: n.sp + 1, env: {}, action: null}), i([r.PUSH, s], expressionCode, o([r.IF_NOT_ERROR], i(l(expressionCode), [r.POP]), i([r.POP], [r.POP], [r.PUSH, failedIndex])))
            }, rule_ref: function (t) {
                return[r.RULE, n.indexOfRuleByName(e, t.name)]
            }, literal: function (e) {
                var s, i;
                return e.value.length > 0 ? (s = t(e.ignoreCase ? n.quote(e.value.toLowerCase()) : n.quote(e.value)), i = t(["{", 'type: "literal",', "value: " + n.quote(e.value) + ",", "description: " + n.quote(n.quote(e.value)), "}"].join(" ")), o(e.ignoreCase ? [r.MATCH_STRING_IC, s] : [r.MATCH_STRING, s], e.ignoreCase ? [r.ACCEPT_N, e.value.length] : [r.ACCEPT_STRING, s], [r.FAIL, i])) : (s = t('""'), [r.PUSH, s])
            }, "class": function (e) {
                var s, i, a;
                return s = e.parts.length > 0 ? "/^[" + (e.inverted ? "^" : "") + n.map(e.parts,function (e) {
                    return e instanceof Array ? n.quoteForRegexpClass(e[0]) + "-" + n.quoteForRegexpClass(e[1]) : n.quoteForRegexpClass(e)
                }).join("") + "]/" + (e.ignoreCase ? "i" : "") : e.inverted ? "/^[\\S\\s]/" : "/^(?!)/", i = t(s), a = t(["{", 'type: "class",', "value: " + n.quote(e.rawText) + ",", "description: " + n.quote(e.rawText), "}"].join(" ")), o([r.MATCH_REGEXP, i], [r.ACCEPT_N, 1], [r.FAIL, a])
            }, any: function () {
                var e = t('{ type: "any", description: "any character" }');
                return o([r.MATCH_ANY], [r.ACCEPT_N, 1], [r.FAIL, e])
            }});
            d(e)
        }
    }), modules.define("compiler/passes/generate-javascript", function (module, require) {
        var utils = require("../../utils"), op = require("../opcodes");
        module.exports = function (ast, options) {
            function indent2(e) {
                return e.replace(/^(.+)$/gm, "  $1")
            }

            function indent4(e) {
                return e.replace(/^(.+)$/gm, "    $1")
            }

            function indent8(e) {
                return e.replace(/^(.+)$/gm, "        $1")
            }

            function indent10(e) {
                return e.replace(/^(.+)$/gm, "          $1")
            }

            function generateTables() {
                return"size" === options.optimize ? ["peg$consts = [", indent2(ast.consts.join(",\n")), "],", "", "peg$bytecode = [", indent2(utils.map(ast.rules,function (e) {
                    return"peg$decode(" + utils.quote(utils.map(e.bytecode,function (e) {
                        return String.fromCharCode(e + 32)
                    }).join("")) + ")"
                }).join(",\n")), "],"].join("\n") : utils.map(ast.consts,function (e, t) {
                    return"peg$c" + t + " = " + e + ","
                }).join("\n")
            }

            function generateCacheHeader(e) {
                return["var key    = peg$currPos * " + ast.rules.length + " + " + e + ",", "    cached = peg$cache[key];", "", "if (cached) {", "  peg$currPos = cached.nextPos;", "  return cached.result;", "}", ""].join("\n")
            }

            function generateCacheFooter(e) {
                return["", "peg$cache[key] = { nextPos: peg$currPos, result: " + e + " };"].join("\n")
            }

            function generateInterpreter() {
                function e(e, t) {
                    var n = t + 3, r = "bc[ip + " + (n - 2) + "]", s = "bc[ip + " + (n - 1) + "]";
                    return["ends.push(end);", "ips.push(ip + " + n + " + " + r + " + " + s + ");", "", "if (" + e + ") {", "  end = ip + " + n + " + " + r + ";", "  ip += " + n + ";", "} else {", "  end = ip + " + n + " + " + r + " + " + s + ";", "  ip += " + n + " + " + r + ";", "}", "", "break;"].join("\n")
                }

                function t(e) {
                    var t = 2, n = "bc[ip + " + (t - 1) + "]";
                    return["if (" + e + ") {", "  ends.push(end);", "  ips.push(ip);", "", "  end = ip + " + t + " + " + n + ";", "  ip += " + t + ";", "} else {", "  ip += " + t + " + " + n + ";", "}", "", "break;"].join("\n")
                }

                function n() {
                    var e = 4, t = "bc[ip + " + (e - 1) + "]";
                    return["params = bc.slice(ip + " + e + ", ip + " + e + " + " + t + ");", "for (i = 0; i < " + t + "; i++) {", "  params[i] = stack[stack.length - 1 - params[i]];", "}", "", "stack.splice(", "  stack.length - bc[ip + 2],", "  bc[ip + 2],", "  peg$consts[bc[ip + 1]].apply(null, params)", ");", "", "ip += " + e + " + " + t + ";", "break;"].join("\n")
                }

                var r = [];
                return r.push(["function peg$decode(s) {", "  var bc = new Array(s.length), i;", "", "  for (i = 0; i < s.length; i++) {", "    bc[i] = s.charCodeAt(i) - 32;", "  }", "", "  return bc;", "}", "", "function peg$parseRule(index) {", "  var bc    = peg$bytecode[index],", "      ip    = 0,", "      ips   = [],", "      end   = bc.length,", "      ends  = [],", "      stack = [],", "      params, i;", ""].join("\n")), options.cache && r.push(indent2(generateCacheHeader("index"))), r.push(["  function protect(object) {", '    return Object.prototype.toString.apply(object) === "[object Array]" ? [] : object;', "  }", "", "  while (true) {", "    while (ip < end) {", "      switch (bc[ip]) {", "        case " + op.PUSH + ":", "          stack.push(protect(peg$consts[bc[ip + 1]]));", "          ip += 2;", "          break;", "", "        case " + op.PUSH_CURR_POS + ":", "          stack.push(peg$currPos);", "          ip++;", "          break;", "", "        case " + op.POP + ":", "          stack.pop();", "          ip++;", "          break;", "", "        case " + op.POP_CURR_POS + ":", "          peg$currPos = stack.pop();", "          ip++;", "          break;", "", "        case " + op.POP_N + ":", "          stack.length -= bc[ip + 1];", "          ip += 2;", "          break;", "", "        case " + op.NIP + ":", "          stack.splice(-2, 1);", "          ip++;", "          break;", "", "        case " + op.APPEND + ":", "          stack[stack.length - 2].push(stack.pop());", "          ip++;", "          break;", "", "        case " + op.WRAP + ":", "          stack.push(stack.splice(stack.length - bc[ip + 1], bc[ip + 1]));", "          ip += 2;", "          break;", "", "        case " + op.TEXT + ":", "          stack.pop();", "          stack.push(input.substring(stack[stack.length - 1], peg$currPos));", "          ip++;", "          break;", "", "        case " + op.IF + ":", indent10(e("stack[stack.length - 1]", 0)), "", "        case " + op.IF_ERROR + ":", indent10(e("stack[stack.length - 1] === peg$FAILED", 0)), "", "        case " + op.IF_NOT_ERROR + ":", indent10(e("stack[stack.length - 1] !== peg$FAILED", 0)), "", "        case " + op.WHILE_NOT_ERROR + ":", indent10(t("stack[stack.length - 1] !== peg$FAILED")), "", "        case " + op.MATCH_ANY + ":", indent10(e("input.length > peg$currPos", 0)), "", "        case " + op.MATCH_STRING + ":", indent10(e("input.substr(peg$currPos, peg$consts[bc[ip + 1]].length) === peg$consts[bc[ip + 1]]", 1)), "", "        case " + op.MATCH_STRING_IC + ":", indent10(e("input.substr(peg$currPos, peg$consts[bc[ip + 1]].length).toLowerCase() === peg$consts[bc[ip + 1]]", 1)), "", "        case " + op.MATCH_REGEXP + ":", indent10(e("peg$consts[bc[ip + 1]].test(input.charAt(peg$currPos))", 1)), "", "        case " + op.ACCEPT_N + ":", "          stack.push(input.substr(peg$currPos, bc[ip + 1]));", "          peg$currPos += bc[ip + 1];", "          ip += 2;", "          break;", "", "        case " + op.ACCEPT_STRING + ":", "          stack.push(peg$consts[bc[ip + 1]]);", "          peg$currPos += peg$consts[bc[ip + 1]].length;", "          ip += 2;", "          break;", "", "        case " + op.FAIL + ":", "          stack.push(peg$FAILED);", "          if (peg$silentFails === 0) {", "            peg$fail(peg$consts[bc[ip + 1]]);", "          }", "          ip += 2;", "          break;", "", "        case " + op.REPORT_SAVED_POS + ":", "          peg$reportedPos = stack[stack.length - 1 - bc[ip + 1]];", "          ip += 2;", "          break;", "", "        case " + op.REPORT_CURR_POS + ":", "          peg$reportedPos = peg$currPos;", "          ip++;", "          break;", "", "        case " + op.CALL + ":", indent10(n()), "", "        case " + op.RULE + ":", "          stack.push(peg$parseRule(bc[ip + 1]));", "          ip += 2;", "          break;", "", "        case " + op.SILENT_FAILS_ON + ":", "          peg$silentFails++;", "          ip++;", "          break;", "", "        case " + op.SILENT_FAILS_OFF + ":", "          peg$silentFails--;", "          ip++;", "          break;", "", "        default:", '          throw new Error("Invalid opcode: " + bc[ip] + ".");', "      }", "    }", "", "    if (ends.length > 0) {", "      end = ends.pop();", "      ip = ips.pop();", "    } else {", "      break;", "    }", "  }"].join("\n")), options.cache && r.push(indent2(generateCacheFooter("stack[0]"))), r.push(["", "  return stack[0];", "}"].join("\n")), r.join("\n")
            }

            function generateRuleFunction(rule) {
                function c(e) {
                    return"peg$c" + e
                }

                function s(e) {
                    return"s" + e
                }

                function compile(bc) {
                    function compileCondition(e, t) {
                        var n, r, s, i, o = t + 3, a = bc[ip + o - 2], p = bc[ip + o - 1], c = stack.sp;
                        if (ip += o, n = compile(bc.slice(ip, ip + a)), s = stack.sp, ip += a, p > 0 && (stack.sp = c, r = compile(bc.slice(ip, ip + p)), i = stack.sp, ip += p, s !== i))throw new Error("Branches of a condition must move the stack pointer in the same way.");
                        parts.push("if (" + e + ") {"), parts.push(indent2(n)), p > 0 && (parts.push("} else {"), parts.push(indent2(r))), parts.push("}")
                    }

                    function compileLoop(e) {
                        var t, n, r = 2, s = bc[ip + r - 1], i = stack.sp;
                        if (ip += r, t = compile(bc.slice(ip, ip + s)), n = stack.sp, ip += s, n !== i)throw new Error("Body of a loop can't move the stack pointer.");
                        parts.push("while (" + e + ") {"), parts.push(indent2(t)), parts.push("}")
                    }

                    function compileCall() {
                        var e = 4, t = bc[ip + e - 1], n = c(bc[ip + 1]) + "(" + utils.map(bc.slice(ip + e, ip + e + t), stackIndex).join(", ") + ")";
                        stack.pop(bc[ip + 2]), parts.push(stack.push(n)), ip += e + t
                    }

                    function stackIndex(e) {
                        return stack.index(e)
                    }

                    for (var ip = 0, end = bc.length, parts = [], value; end > ip;)switch (bc[ip]) {
                        case op.PUSH:
                            parts.push(stack.push("[]" === ast.consts[bc[ip + 1]] ? "[]" : c(bc[ip + 1]))), ip += 2;
                            break;
                        case op.PUSH_CURR_POS:
                            parts.push(stack.push("peg$currPos")), ip++;
                            break;
                        case op.POP:
                            stack.pop(), ip++;
                            break;
                        case op.POP_CURR_POS:
                            parts.push("peg$currPos = " + stack.pop() + ";"), ip++;
                            break;
                        case op.POP_N:
                            stack.pop(bc[ip + 1]), ip += 2;
                            break;
                        case op.NIP:
                            value = stack.pop(), stack.pop(), parts.push(stack.push(value)), ip++;
                            break;
                        case op.APPEND:
                            value = stack.pop(), parts.push(stack.top() + ".push(" + value + ");"), ip++;
                            break;
                        case op.WRAP:
                            parts.push(stack.push("[" + stack.pop(bc[ip + 1]).join(", ") + "]")), ip += 2;
                            break;
                        case op.TEXT:
                            stack.pop(), parts.push(stack.push("input.substring(" + stack.top() + ", peg$currPos)")), ip++;
                            break;
                        case op.IF:
                            compileCondition(stack.top(), 0);
                            break;
                        case op.IF_ERROR:
                            compileCondition(stack.top() + " === peg$FAILED", 0);
                            break;
                        case op.IF_NOT_ERROR:
                            compileCondition(stack.top() + " !== peg$FAILED", 0);
                            break;
                        case op.WHILE_NOT_ERROR:
                            compileLoop(stack.top() + " !== peg$FAILED", 0);
                            break;
                        case op.MATCH_ANY:
                            compileCondition("input.length > peg$currPos", 0);
                            break;
                        case op.MATCH_STRING:
                            compileCondition(eval(ast.consts[bc[ip + 1]]).length > 1 ? "input.substr(peg$currPos, " + eval(ast.consts[bc[ip + 1]]).length + ") === " + c(bc[ip + 1]) : "input.charCodeAt(peg$currPos) === " + eval(ast.consts[bc[ip + 1]]).charCodeAt(0), 1);
                            break;
                        case op.MATCH_STRING_IC:
                            compileCondition("input.substr(peg$currPos, " + eval(ast.consts[bc[ip + 1]]).length + ").toLowerCase() === " + c(bc[ip + 1]), 1);
                            break;
                        case op.MATCH_REGEXP:
                            compileCondition(c(bc[ip + 1]) + ".test(input.charAt(peg$currPos))", 1);
                            break;
                        case op.ACCEPT_N:
                            parts.push(stack.push(bc[ip + 1] > 1 ? "input.substr(peg$currPos, " + bc[ip + 1] + ")" : "input.charAt(peg$currPos)")), parts.push(bc[ip + 1] > 1 ? "peg$currPos += " + bc[ip + 1] + ";" : "peg$currPos++;"), ip += 2;
                            break;
                        case op.ACCEPT_STRING:
                            parts.push(stack.push(c(bc[ip + 1]))), parts.push(eval(ast.consts[bc[ip + 1]]).length > 1 ? "peg$currPos += " + eval(ast.consts[bc[ip + 1]]).length + ";" : "peg$currPos++;"), ip += 2;
                            break;
                        case op.FAIL:
                            parts.push(stack.push("peg$FAILED")), parts.push("if (peg$silentFails === 0) { peg$fail(" + c(bc[ip + 1]) + "); }"), ip += 2;
                            break;
                        case op.REPORT_SAVED_POS:
                            parts.push("peg$reportedPos = " + stack.index(bc[ip + 1]) + ";"), ip += 2;
                            break;
                        case op.REPORT_CURR_POS:
                            parts.push("peg$reportedPos = peg$currPos;"), ip++;
                            break;
                        case op.CALL:
                            compileCall();
                            break;
                        case op.RULE:
                            parts.push(stack.push("peg$parse" + ast.rules[bc[ip + 1]].name + "()")), ip += 2;
                            break;
                        case op.SILENT_FAILS_ON:
                            parts.push("peg$silentFails++;"), ip++;
                            break;
                        case op.SILENT_FAILS_OFF:
                            parts.push("peg$silentFails--;"), ip++;
                            break;
                        default:
                            throw new Error("Invalid opcode: " + bc[ip] + ".")
                    }
                    return parts.join("\n")
                }

                var parts = [], code, stack = {sp: -1, maxSp: -1, push: function (e) {
                    var t = s(++this.sp) + " = " + e + ";";
                    return this.sp > this.maxSp && (this.maxSp = this.sp), t
                }, pop: function () {
                    var e, t;
                    return 0 === arguments.length ? s(this.sp--) : (e = arguments[0], t = utils.map(utils.range(this.sp - e + 1, this.sp + 1), s), this.sp -= e, t)
                }, top: function () {
                    return s(this.sp)
                }, index: function (e) {
                    return s(this.sp - e)
                }};
                return code = compile(rule.bytecode), parts.push(["function peg$parse" + rule.name + "() {", "  var " + utils.map(utils.range(0, stack.maxSp + 1), s).join(", ") + ";", ""].join("\n")), options.cache && parts.push(indent2(generateCacheHeader(utils.indexOfRuleByName(ast, rule.name)))), parts.push(indent2(code)), options.cache && parts.push(indent2(generateCacheFooter(s(0)))), parts.push(["", "  return " + s(0) + ";", "}"].join("\n")), parts.join("\n")
            }

            var parts = [], startRuleIndices, startRuleIndex, startRuleFunctions, startRuleFunction;
            parts.push(["(function() {", "  /*", "   * Generated by PEG.js 0.8.0.", "   *", "   * http://pegjs.majda.cz/", "   */", "", "  function peg$subclass(child, parent) {", "    function ctor() { this.constructor = child; }", "    ctor.prototype = parent.prototype;", "    child.prototype = new ctor();", "  }", "", "  function SyntaxError(message, expected, found, offset, line, column) {", "    this.message  = message;", "    this.expected = expected;", "    this.found    = found;", "    this.offset   = offset;", "    this.line     = line;", "    this.column   = column;", "", '    this.name     = "SyntaxError";', "  }", "", "  peg$subclass(SyntaxError, Error);", "", "  function parse(input) {", "    var options = arguments.length > 1 ? arguments[1] : {},", "", "        peg$FAILED = {},", ""].join("\n")), "size" === options.optimize ? (startRuleIndices = "{ " + utils.map(options.allowedStartRules,function (e) {
                return e + ": " + utils.indexOfRuleByName(ast, e)
            }).join(", ") + " }", startRuleIndex = utils.indexOfRuleByName(ast, options.allowedStartRules[0]), parts.push(["        peg$startRuleIndices = " + startRuleIndices + ",", "        peg$startRuleIndex   = " + startRuleIndex + ","].join("\n"))) : (startRuleFunctions = "{ " + utils.map(options.allowedStartRules,function (e) {
                return e + ": peg$parse" + e
            }).join(", ") + " }", startRuleFunction = "peg$parse" + options.allowedStartRules[0], parts.push(["        peg$startRuleFunctions = " + startRuleFunctions + ",", "        peg$startRuleFunction  = " + startRuleFunction + ","].join("\n"))), parts.push(""), parts.push(indent8(generateTables())), parts.push(["", "        peg$currPos          = 0,", "        peg$reportedPos      = 0,", "        peg$cachedPos        = 0,", "        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },", "        peg$maxFailPos       = 0,", "        peg$maxFailExpected  = [],", "        peg$silentFails      = 0,", ""].join("\n")), options.cache && parts.push("        peg$cache = {},"), parts.push(["        peg$result;", ""].join("\n")), "size" === options.optimize ? parts.push(['    if ("startRule" in options) {', "      if (!(options.startRule in peg$startRuleIndices)) {", '        throw new Error("Can\'t start parsing from rule \\"" + options.startRule + "\\".");', "      }", "", "      peg$startRuleIndex = peg$startRuleIndices[options.startRule];", "    }"].join("\n")) : parts.push(['    if ("startRule" in options) {', "      if (!(options.startRule in peg$startRuleFunctions)) {", '        throw new Error("Can\'t start parsing from rule \\"" + options.startRule + "\\".");', "      }", "", "      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];", "    }"].join("\n")), parts.push(["", "    function text() {", "      return input.substring(peg$reportedPos, peg$currPos);", "    }", "", "    function offset() {", "      return peg$reportedPos;", "    }", "", "    function line() {", "      return peg$computePosDetails(peg$reportedPos).line;", "    }", "", "    function column() {", "      return peg$computePosDetails(peg$reportedPos).column;", "    }", "", "    function expected(description) {", "      throw peg$buildException(", "        null,", '        [{ type: "other", description: description }],', "        peg$reportedPos", "      );", "    }", "", "    function error(message) {", "      throw peg$buildException(message, null, peg$reportedPos);", "    }", "", "    function peg$computePosDetails(pos) {", "      function advance(details, startPos, endPos) {", "        var p, ch;", "", "        for (p = startPos; p < endPos; p++) {", "          ch = input.charAt(p);", '          if (ch === "\\n") {', "            if (!details.seenCR) { details.line++; }", "            details.column = 1;", "            details.seenCR = false;", '          } else if (ch === "\\r" || ch === "\\u2028" || ch === "\\u2029") {', "            details.line++;", "            details.column = 1;", "            details.seenCR = true;", "          } else {", "            details.column++;", "            details.seenCR = false;", "          }", "        }", "      }", "", "      if (peg$cachedPos !== pos) {", "        if (peg$cachedPos > pos) {", "          peg$cachedPos = 0;", "          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };", "        }", "        advance(peg$cachedPosDetails, peg$cachedPos, pos);", "        peg$cachedPos = pos;", "      }", "", "      return peg$cachedPosDetails;", "    }", "", "    function peg$fail(expected) {", "      if (peg$currPos < peg$maxFailPos) { return; }", "", "      if (peg$currPos > peg$maxFailPos) {", "        peg$maxFailPos = peg$currPos;", "        peg$maxFailExpected = [];", "      }", "", "      peg$maxFailExpected.push(expected);", "    }", "", "    function peg$buildException(message, expected, pos) {", "      function cleanupExpected(expected) {", "        var i = 1;", "", "        expected.sort(function(a, b) {", "          if (a.description < b.description) {", "            return -1;", "          } else if (a.description > b.description) {", "            return 1;", "          } else {", "            return 0;", "          }", "        });", "", "        while (i < expected.length) {", "          if (expected[i - 1] === expected[i]) {", "            expected.splice(i, 1);", "          } else {", "            i++;", "          }", "        }", "      }", "", "      function buildMessage(expected, found) {", "        function stringEscape(s) {", "          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }", "", "          return s", "            .replace(/\\\\/g,   '\\\\\\\\')", "            .replace(/\"/g,    '\\\\\"')", "            .replace(/\\x08/g, '\\\\b')", "            .replace(/\\t/g,   '\\\\t')", "            .replace(/\\n/g,   '\\\\n')", "            .replace(/\\f/g,   '\\\\f')", "            .replace(/\\r/g,   '\\\\r')", "            .replace(/[\\x00-\\x07\\x0B\\x0E\\x0F]/g, function(ch) { return '\\\\x0' + hex(ch); })", "            .replace(/[\\x10-\\x1F\\x80-\\xFF]/g,    function(ch) { return '\\\\x'  + hex(ch); })", "            .replace(/[\\u0180-\\u0FFF]/g,         function(ch) { return '\\\\u0' + hex(ch); })", "            .replace(/[\\u1080-\\uFFFF]/g,         function(ch) { return '\\\\u'  + hex(ch); });", "        }", "", "        var expectedDescs = new Array(expected.length),", "            expectedDesc, foundDesc, i;", "", "        for (i = 0; i < expected.length; i++) {", "          expectedDescs[i] = expected[i].description;", "        }", "", "        expectedDesc = expected.length > 1", '          ? expectedDescs.slice(0, -1).join(", ")', '              + " or "', "              + expectedDescs[expected.length - 1]", "          : expectedDescs[0];", "", '        foundDesc = found ? "\\"" + stringEscape(found) + "\\"" : "end of input";', "", '        return "Expected " + expectedDesc + " but " + foundDesc + " found.";', "      }", "", "      var posDetails = peg$computePosDetails(pos),", "          found      = pos < input.length ? input.charAt(pos) : null;", "", "      if (expected !== null) {", "        cleanupExpected(expected);", "      }", "", "      return new SyntaxError(", "        message !== null ? message : buildMessage(expected, found),", "        expected,", "        found,", "        pos,", "        posDetails.line,", "        posDetails.column", "      );", "    }", ""].join("\n")), "size" === options.optimize ? (parts.push(indent4(generateInterpreter())), parts.push("")) : utils.each(ast.rules, function (e) {
                parts.push(indent4(generateRuleFunction(e))), parts.push("")
            }), ast.initializer && (parts.push(indent4(ast.initializer.code)), parts.push("")), "size" === options.optimize ? parts.push("    peg$result = peg$parseRule(peg$startRuleIndex);") : parts.push("    peg$result = peg$startRuleFunction();"), parts.push(["", "    if (peg$result !== peg$FAILED && peg$currPos === input.length) {", "      return peg$result;", "    } else {", "      if (peg$result !== peg$FAILED && peg$currPos < input.length) {", '        peg$fail({ type: "end", description: "end of input" });', "      }", "", "      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);", "    }", "  }", "", "  return {", "    SyntaxError: SyntaxError,", "    parse:       parse", "  };", "})()"].join("\n")), ast.code = parts.join("\n")
        }
    }), modules.define("compiler/passes/remove-proxy-rules", function (e, t) {
        var n = t("../../utils");
        e.exports = function (e, t) {
            function r(e) {
                return"rule" === e.type && "rule_ref" === e.expression.type
            }

            function s(e, t, r) {
                function s() {
                }

                function i(e, t, n) {
                    a(e.expression, t, n)
                }

                function o(e) {
                    return function (t, r, s) {
                        n.each(t[e], function (e) {
                            a(e, r, s)
                        })
                    }
                }

                var a = n.buildNodeVisitor({grammar: o("rules"), rule: i, named: i, choice: o("alternatives"), sequence: o("elements"), labeled: i, text: i, simple_and: i, simple_not: i, semantic_and: s, semantic_not: s, optional: i, zero_or_more: i, one_or_more: i, action: i, rule_ref: function (e, t, n) {
                    e.name === t && (e.name = n)
                }, literal: s, "class": s, any: s});
                a(e, t, r)
            }

            var i = [];
            n.each(e.rules, function (o, a) {
                r(o) && (s(e, o.name, o.expression.name), n.contains(t.allowedStartRules, o.name) || i.push(a))
            }), i.reverse(), n.each(i, function (t) {
                e.rules.splice(t, 1)
            })
        }
    }), modules.define("compiler/passes/report-left-recursion", function (e, t) {
        var n = t("../../utils"), r = t("../../grammar-error");
        e.exports = function (e) {
            function t() {
            }

            function s(e, t) {
                o(e.expression, t)
            }

            function i(e) {
                return function (t, r) {
                    n.each(t[e], function (e) {
                        o(e, r)
                    })
                }
            }

            var o = n.buildNodeVisitor({grammar: i("rules"), rule: function (e, t) {
                o(e.expression, t.concat(e.name))
            }, named: s, choice: i("alternatives"), action: s, sequence: function (e, t) {
                e.elements.length > 0 && o(e.elements[0], t)
            }, labeled: s, text: s, simple_and: s, simple_not: s, semantic_and: t, semantic_not: t, optional: s, zero_or_more: s, one_or_more: s, rule_ref: function (t, s) {
                if (n.contains(s, t.name))throw new r('Left recursion detected for rule "' + t.name + '".');
                o(n.findRuleByName(e, t.name), s)
            }, literal: t, "class": t, any: t});
            o(e, [])
        }
    }), modules.define("compiler/passes/report-missing-rules", function (e, t) {
        var n = t("../../utils"), r = t("../../grammar-error");
        e.exports = function (e) {
            function t() {
            }

            function s(e) {
                o(e.expression)
            }

            function i(e) {
                return function (t) {
                    n.each(t[e], o)
                }
            }

            var o = n.buildNodeVisitor({grammar: i("rules"), rule: s, named: s, choice: i("alternatives"), action: s, sequence: i("elements"), labeled: s, text: s, simple_and: s, simple_not: s, semantic_and: t, semantic_not: t, optional: s, zero_or_more: s, one_or_more: s, rule_ref: function (t) {
                if (!n.findRuleByName(e, t.name))throw new r('Referenced rule "' + t.name + '" does not exist.')
            }, literal: t, "class": t, any: t});
            o(e)
        }
    }), modules.define("compiler", function (module, require) {
        var utils = require("./utils");
        module.exports = {passes: {check: {reportMissingRules: require("./compiler/passes/report-missing-rules"), reportLeftRecursion: require("./compiler/passes/report-left-recursion")}, transform: {removeProxyRules: require("./compiler/passes/remove-proxy-rules")}, generate: {generateBytecode: require("./compiler/passes/generate-bytecode"), generateJavascript: require("./compiler/passes/generate-javascript")}}, compile: function (ast, passes) {
            function runPass(e) {
                e(ast, options)
            }

            var options = arguments.length > 2 ? utils.clone(arguments[2]) : {}, stage;
            utils.defaults(options, {allowedStartRules: [ast.rules[0].name], cache: !1, optimize: "speed", output: "parser"});
            for (stage in passes)passes.hasOwnProperty(stage) && utils.each(passes[stage], runPass);
            switch (options.output) {
                case"parser":
                    return eval(ast.code);
                case"source":
                    return ast.code
            }
        }}
    }), modules.define("peg", function (e, t) {
        var n = t("./utils");
        e.exports = {VERSION: "0.8.0", GrammarError: t("./grammar-error"), parser: t("./parser"), compiler: t("./compiler"), buildParser: function (e) {
            function t(e) {
                var t, r = {};
                for (t in e)e.hasOwnProperty(t) && (r[t] = n.values(e[t]));
                return r
            }

            var r = arguments.length > 1 ? n.clone(arguments[1]) : {}, s = "plugins"in r ? r.plugins : [], i = {parser: this.parser, passes: t(this.compiler.passes)};
            return n.each(s, function (e) {
                e.use(i, r)
            }), this.compiler.compile(i.parser.parse(e), i.passes, r)
        }}
    }), modules.peg
}();
return PEG;
});