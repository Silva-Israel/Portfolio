(this.webpackJsonptodo = this.webpackJsonptodo || []).push([
    [0],
    {
        13: function (e, t, n) {},
        15: function (e, t, n) {},
        20: function (e, t, n) {
            "use strict";
            n.r(t);
            var o = n(1),
                c = n.n(o),
                r = n(6),
                i = n.n(r),
                u = (n(13), n(5)),
                d = n(8),
                l = n(0);
            function s(e) {
                var t = e.todo,
                    n = e.toggleTodo;
                return Object(l.jsx)("div", {
                    children: Object(l.jsxs)("label", {
                        children: [
                            Object(l.jsx)("input", {
                                type: "checkbox",
                                checked: t.complete,
                                onChange: function () {
                                    n(t.id);
                                },
                            }),
                            t.name,
                        ],
                    }),
                });
            }
            function a(e) {
                var t = e.todos,
                    n = e.toggleTodo;
                return t.map(function (e) {
                    return Object(l.jsx)(s, { toggleTodo: n, todo: e }, e.id);
                });
            }
            var j = n(7),
                f = n.n(j),
                b = (n(15), "todoApp.todos");
            var p = function () {
                var e = Object(o.useState)([
                        { id: 1, name: "Wash dishes", complete: !1 },
                        { id: 2, name: "Do laundry", complete: !0 },
                    ]),
                    t = Object(d.a)(e, 2),
                    n = t[0],
                    c = t[1],
                    r = Object(o.useRef)();
                return (
                    Object(o.useEffect)(function () {
                        var e = JSON.parse(localStorage.getItem(b));
                        e && c(e);
                    }, []),
                    Object(o.useEffect)(
                        function () {
                            localStorage.setItem(b, JSON.stringify(n));
                        },
                        [n]
                    ),
                    Object(l.jsxs)(l.Fragment, {
                        children: [
                            Object(l.jsx)("h1", {
                                children: "Izzy's Todo List",
                            }),
                            Object(l.jsx)(a, {
                                todos: n,
                                toggleTodo: function (e) {
                                    var t = Object(u.a)(n),
                                        o = t.find(function (t) {
                                            return t.id === e;
                                        });
                                    (o.complete = !o.complete), c(t);
                                },
                            }),
                            Object(l.jsx)("input", { ref: r, type: "text" }),
                            Object(l.jsx)("button", {
                                onClick: function (e) {
                                    var t = r.current.value;
                                    "" !== t &&
                                        (c(function (e) {
                                            return [].concat(Object(u.a)(e), [
                                                {
                                                    id: f()(),
                                                    name: t,
                                                    complete: !1,
                                                },
                                            ]);
                                        }),
                                        (r.current.value = null));
                                },
                                children: "Add",
                            }),
                            Object(l.jsx)("button", {
                                onClick: function () {
                                    var e = n.filter(function (e) {
                                        return !e.complete;
                                    });
                                    c(e);
                                },
                                children: "Clear Complete",
                            }),
                            Object(l.jsxs)("div", {
                                children: [
                                    n.filter(function (e) {
                                        return !e.complete;
                                    }).length,
                                    " left to do",
                                ],
                            }),
                        ],
                    })
                );
            };
            i.a.render(
                Object(l.jsx)(c.a.StrictMode, {
                    children: Object(l.jsx)(p, {}),
                }),
                document.getElementById("root")
            );
        },
    },
    [[20, 1, 2]],
]);
//# sourceMappingURL=main.8416075a.chunk.js.map
