(window.webpackJsonp = window.webpackJsonp || []).push([
    [1],
    {
        0: function (t, e, n) {
            t.exports = n("zUnb");
        },
        zUnb: function (t, e, n) {
            "use strict";
            function r(t) {
                return "function" == typeof t;
            }
            n.r(e);
            let s = !1;
            const i = {
                Promise: void 0,
                set useDeprecatedSynchronousErrorHandling(t) {
                    if (t) {
                        const t = new Error();
                        console.warn(
                            "DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" +
                                t.stack
                        );
                    } else
                        s &&
                            console.log(
                                "RxJS: Back to a better error behavior. Thank you. <3"
                            );
                    s = t;
                },
                get useDeprecatedSynchronousErrorHandling() {
                    return s;
                },
            };
            function o(t) {
                setTimeout(() => {
                    throw t;
                }, 0);
            }
            const a = {
                    closed: !0,
                    next(t) {},
                    error(t) {
                        if (i.useDeprecatedSynchronousErrorHandling) throw t;
                        o(t);
                    },
                    complete() {},
                },
                l = (() =>
                    Array.isArray ||
                    ((t) => t && "number" == typeof t.length))();
            function c(t) {
                return null !== t && "object" == typeof t;
            }
            const u = (() => {
                function t(t) {
                    return (
                        Error.call(this),
                        (this.message = t
                            ? `${
                                  t.length
                              } errors occurred during unsubscription:\n${t
                                  .map((t, e) => `${e + 1}) ${t.toString()}`)
                                  .join("\n  ")}`
                            : ""),
                        (this.name = "UnsubscriptionError"),
                        (this.errors = t),
                        this
                    );
                }
                return (t.prototype = Object.create(Error.prototype)), t;
            })();
            let h = (() => {
                class t {
                    constructor(t) {
                        (this.closed = !1),
                            (this._parentOrParents = null),
                            (this._subscriptions = null),
                            t &&
                                ((this._ctorUnsubscribe = !0),
                                (this._unsubscribe = t));
                    }
                    unsubscribe() {
                        let e;
                        if (this.closed) return;
                        let {
                            _parentOrParents: n,
                            _ctorUnsubscribe: s,
                            _unsubscribe: i,
                            _subscriptions: o,
                        } = this;
                        if (
                            ((this.closed = !0),
                            (this._parentOrParents = null),
                            (this._subscriptions = null),
                            n instanceof t)
                        )
                            n.remove(this);
                        else if (null !== n)
                            for (let t = 0; t < n.length; ++t)
                                n[t].remove(this);
                        if (r(i)) {
                            s && (this._unsubscribe = void 0);
                            try {
                                i.call(this);
                            } catch (a) {
                                e = a instanceof u ? d(a.errors) : [a];
                            }
                        }
                        if (l(o)) {
                            let t = -1,
                                n = o.length;
                            for (; ++t < n; ) {
                                const n = o[t];
                                if (c(n))
                                    try {
                                        n.unsubscribe();
                                    } catch (a) {
                                        (e = e || []),
                                            a instanceof u
                                                ? (e = e.concat(d(a.errors)))
                                                : e.push(a);
                                    }
                            }
                        }
                        if (e) throw new u(e);
                    }
                    add(e) {
                        let n = e;
                        if (!e) return t.EMPTY;
                        switch (typeof e) {
                            case "function":
                                n = new t(e);
                            case "object":
                                if (
                                    n === this ||
                                    n.closed ||
                                    "function" != typeof n.unsubscribe
                                )
                                    return n;
                                if (this.closed) return n.unsubscribe(), n;
                                if (!(n instanceof t)) {
                                    const e = n;
                                    (n = new t()), (n._subscriptions = [e]);
                                }
                                break;
                            default:
                                throw new Error(
                                    "unrecognized teardown " +
                                        e +
                                        " added to Subscription."
                                );
                        }
                        let { _parentOrParents: r } = n;
                        if (null === r) n._parentOrParents = this;
                        else if (r instanceof t) {
                            if (r === this) return n;
                            n._parentOrParents = [r, this];
                        } else {
                            if (-1 !== r.indexOf(this)) return n;
                            r.push(this);
                        }
                        const s = this._subscriptions;
                        return (
                            null === s
                                ? (this._subscriptions = [n])
                                : s.push(n),
                            n
                        );
                    }
                    remove(t) {
                        const e = this._subscriptions;
                        if (e) {
                            const n = e.indexOf(t);
                            -1 !== n && e.splice(n, 1);
                        }
                    }
                }
                return (
                    (t.EMPTY = (function (t) {
                        return (t.closed = !0), t;
                    })(new t())),
                    t
                );
            })();
            function d(t) {
                return t.reduce(
                    (t, e) => t.concat(e instanceof u ? e.errors : e),
                    []
                );
            }
            const p = (() =>
                "function" == typeof Symbol
                    ? Symbol("rxSubscriber")
                    : "@@rxSubscriber_" + Math.random())();
            class f extends h {
                constructor(t, e, n) {
                    switch (
                        (super(),
                        (this.syncErrorValue = null),
                        (this.syncErrorThrown = !1),
                        (this.syncErrorThrowable = !1),
                        (this.isStopped = !1),
                        arguments.length)
                    ) {
                        case 0:
                            this.destination = a;
                            break;
                        case 1:
                            if (!t) {
                                this.destination = a;
                                break;
                            }
                            if ("object" == typeof t) {
                                t instanceof f
                                    ? ((this.syncErrorThrowable =
                                          t.syncErrorThrowable),
                                      (this.destination = t),
                                      t.add(this))
                                    : ((this.syncErrorThrowable = !0),
                                      (this.destination = new g(this, t)));
                                break;
                            }
                        default:
                            (this.syncErrorThrowable = !0),
                                (this.destination = new g(this, t, e, n));
                    }
                }
                [p]() {
                    return this;
                }
                static create(t, e, n) {
                    const r = new f(t, e, n);
                    return (r.syncErrorThrowable = !1), r;
                }
                next(t) {
                    this.isStopped || this._next(t);
                }
                error(t) {
                    this.isStopped || ((this.isStopped = !0), this._error(t));
                }
                complete() {
                    this.isStopped || ((this.isStopped = !0), this._complete());
                }
                unsubscribe() {
                    this.closed || ((this.isStopped = !0), super.unsubscribe());
                }
                _next(t) {
                    this.destination.next(t);
                }
                _error(t) {
                    this.destination.error(t), this.unsubscribe();
                }
                _complete() {
                    this.destination.complete(), this.unsubscribe();
                }
                _unsubscribeAndRecycle() {
                    const { _parentOrParents: t } = this;
                    return (
                        (this._parentOrParents = null),
                        this.unsubscribe(),
                        (this.closed = !1),
                        (this.isStopped = !1),
                        (this._parentOrParents = t),
                        this
                    );
                }
            }
            class g extends f {
                constructor(t, e, n, s) {
                    let i;
                    super(), (this._parentSubscriber = t);
                    let o = this;
                    r(e)
                        ? (i = e)
                        : e &&
                          ((i = e.next),
                          (n = e.error),
                          (s = e.complete),
                          e !== a &&
                              ((o = Object.create(e)),
                              r(o.unsubscribe) &&
                                  this.add(o.unsubscribe.bind(o)),
                              (o.unsubscribe = this.unsubscribe.bind(this)))),
                        (this._context = o),
                        (this._next = i),
                        (this._error = n),
                        (this._complete = s);
                }
                next(t) {
                    if (!this.isStopped && this._next) {
                        const { _parentSubscriber: e } = this;
                        i.useDeprecatedSynchronousErrorHandling &&
                        e.syncErrorThrowable
                            ? this.__tryOrSetError(e, this._next, t) &&
                              this.unsubscribe()
                            : this.__tryOrUnsub(this._next, t);
                    }
                }
                error(t) {
                    if (!this.isStopped) {
                        const { _parentSubscriber: e } = this,
                            { useDeprecatedSynchronousErrorHandling: n } = i;
                        if (this._error)
                            n && e.syncErrorThrowable
                                ? (this.__tryOrSetError(e, this._error, t),
                                  this.unsubscribe())
                                : (this.__tryOrUnsub(this._error, t),
                                  this.unsubscribe());
                        else if (e.syncErrorThrowable)
                            n
                                ? ((e.syncErrorValue = t),
                                  (e.syncErrorThrown = !0))
                                : o(t),
                                this.unsubscribe();
                        else {
                            if ((this.unsubscribe(), n)) throw t;
                            o(t);
                        }
                    }
                }
                complete() {
                    if (!this.isStopped) {
                        const { _parentSubscriber: t } = this;
                        if (this._complete) {
                            const e = () => this._complete.call(this._context);
                            i.useDeprecatedSynchronousErrorHandling &&
                            t.syncErrorThrowable
                                ? (this.__tryOrSetError(t, e),
                                  this.unsubscribe())
                                : (this.__tryOrUnsub(e), this.unsubscribe());
                        } else this.unsubscribe();
                    }
                }
                __tryOrUnsub(t, e) {
                    try {
                        t.call(this._context, e);
                    } catch (n) {
                        if (
                            (this.unsubscribe(),
                            i.useDeprecatedSynchronousErrorHandling)
                        )
                            throw n;
                        o(n);
                    }
                }
                __tryOrSetError(t, e, n) {
                    if (!i.useDeprecatedSynchronousErrorHandling)
                        throw new Error("bad call");
                    try {
                        e.call(this._context, n);
                    } catch (r) {
                        return i.useDeprecatedSynchronousErrorHandling
                            ? ((t.syncErrorValue = r),
                              (t.syncErrorThrown = !0),
                              !0)
                            : (o(r), !0);
                    }
                    return !1;
                }
                _unsubscribe() {
                    const { _parentSubscriber: t } = this;
                    (this._context = null),
                        (this._parentSubscriber = null),
                        t.unsubscribe();
                }
            }
            const m = (() =>
                ("function" == typeof Symbol && Symbol.observable) ||
                "@@observable")();
            function y(t) {
                return t;
            }
            let v = (() => {
                class t {
                    constructor(t) {
                        (this._isScalar = !1), t && (this._subscribe = t);
                    }
                    lift(e) {
                        const n = new t();
                        return (n.source = this), (n.operator = e), n;
                    }
                    subscribe(t, e, n) {
                        const { operator: r } = this,
                            s = (function (t, e, n) {
                                if (t) {
                                    if (t instanceof f) return t;
                                    if (t[p]) return t[p]();
                                }
                                return t || e || n ? new f(t, e, n) : new f(a);
                            })(t, e, n);
                        if (
                            (s.add(
                                r
                                    ? r.call(s, this.source)
                                    : this.source ||
                                      (i.useDeprecatedSynchronousErrorHandling &&
                                          !s.syncErrorThrowable)
                                    ? this._subscribe(s)
                                    : this._trySubscribe(s)
                            ),
                            i.useDeprecatedSynchronousErrorHandling &&
                                s.syncErrorThrowable &&
                                ((s.syncErrorThrowable = !1),
                                s.syncErrorThrown))
                        )
                            throw s.syncErrorValue;
                        return s;
                    }
                    _trySubscribe(t) {
                        try {
                            return this._subscribe(t);
                        } catch (e) {
                            i.useDeprecatedSynchronousErrorHandling &&
                                ((t.syncErrorThrown = !0),
                                (t.syncErrorValue = e)),
                                (function (t) {
                                    for (; t; ) {
                                        const {
                                            closed: e,
                                            destination: n,
                                            isStopped: r,
                                        } = t;
                                        if (e || r) return !1;
                                        t = n && n instanceof f ? n : null;
                                    }
                                    return !0;
                                })(t)
                                    ? t.error(e)
                                    : console.warn(e);
                        }
                    }
                    forEach(t, e) {
                        return new (e = _(e))((e, n) => {
                            let r;
                            r = this.subscribe(
                                (e) => {
                                    try {
                                        t(e);
                                    } catch (s) {
                                        n(s), r && r.unsubscribe();
                                    }
                                },
                                n,
                                e
                            );
                        });
                    }
                    _subscribe(t) {
                        const { source: e } = this;
                        return e && e.subscribe(t);
                    }
                    [m]() {
                        return this;
                    }
                    pipe(...t) {
                        return 0 === t.length
                            ? this
                            : (0 === (e = t).length
                                  ? y
                                  : 1 === e.length
                                  ? e[0]
                                  : function (t) {
                                        return e.reduce((t, e) => e(t), t);
                                    })(this);
                        var e;
                    }
                    toPromise(t) {
                        return new (t = _(t))((t, e) => {
                            let n;
                            this.subscribe(
                                (t) => (n = t),
                                (t) => e(t),
                                () => t(n)
                            );
                        });
                    }
                }
                return (t.create = (e) => new t(e)), t;
            })();
            function _(t) {
                if ((t || (t = i.Promise || Promise), !t))
                    throw new Error("no Promise impl found");
                return t;
            }
            const b = (() => {
                function t() {
                    return (
                        Error.call(this),
                        (this.message = "object unsubscribed"),
                        (this.name = "ObjectUnsubscribedError"),
                        this
                    );
                }
                return (t.prototype = Object.create(Error.prototype)), t;
            })();
            class w extends h {
                constructor(t, e) {
                    super(),
                        (this.subject = t),
                        (this.subscriber = e),
                        (this.closed = !1);
                }
                unsubscribe() {
                    if (this.closed) return;
                    this.closed = !0;
                    const t = this.subject,
                        e = t.observers;
                    if (
                        ((this.subject = null),
                        !e || 0 === e.length || t.isStopped || t.closed)
                    )
                        return;
                    const n = e.indexOf(this.subscriber);
                    -1 !== n && e.splice(n, 1);
                }
            }
            class C extends f {
                constructor(t) {
                    super(t), (this.destination = t);
                }
            }
            let S = (() => {
                class t extends v {
                    constructor() {
                        super(),
                            (this.observers = []),
                            (this.closed = !1),
                            (this.isStopped = !1),
                            (this.hasError = !1),
                            (this.thrownError = null);
                    }
                    [p]() {
                        return new C(this);
                    }
                    lift(t) {
                        const e = new x(this, this);
                        return (e.operator = t), e;
                    }
                    next(t) {
                        if (this.closed) throw new b();
                        if (!this.isStopped) {
                            const { observers: e } = this,
                                n = e.length,
                                r = e.slice();
                            for (let s = 0; s < n; s++) r[s].next(t);
                        }
                    }
                    error(t) {
                        if (this.closed) throw new b();
                        (this.hasError = !0),
                            (this.thrownError = t),
                            (this.isStopped = !0);
                        const { observers: e } = this,
                            n = e.length,
                            r = e.slice();
                        for (let s = 0; s < n; s++) r[s].error(t);
                        this.observers.length = 0;
                    }
                    complete() {
                        if (this.closed) throw new b();
                        this.isStopped = !0;
                        const { observers: t } = this,
                            e = t.length,
                            n = t.slice();
                        for (let r = 0; r < e; r++) n[r].complete();
                        this.observers.length = 0;
                    }
                    unsubscribe() {
                        (this.isStopped = !0),
                            (this.closed = !0),
                            (this.observers = null);
                    }
                    _trySubscribe(t) {
                        if (this.closed) throw new b();
                        return super._trySubscribe(t);
                    }
                    _subscribe(t) {
                        if (this.closed) throw new b();
                        return this.hasError
                            ? (t.error(this.thrownError), h.EMPTY)
                            : this.isStopped
                            ? (t.complete(), h.EMPTY)
                            : (this.observers.push(t), new w(this, t));
                    }
                    asObservable() {
                        const t = new v();
                        return (t.source = this), t;
                    }
                }
                return (t.create = (t, e) => new x(t, e)), t;
            })();
            class x extends S {
                constructor(t, e) {
                    super(), (this.destination = t), (this.source = e);
                }
                next(t) {
                    const { destination: e } = this;
                    e && e.next && e.next(t);
                }
                error(t) {
                    const { destination: e } = this;
                    e && e.error && this.destination.error(t);
                }
                complete() {
                    const { destination: t } = this;
                    t && t.complete && this.destination.complete();
                }
                _subscribe(t) {
                    const { source: e } = this;
                    return e ? this.source.subscribe(t) : h.EMPTY;
                }
            }
            function E(t) {
                return t && "function" == typeof t.schedule;
            }
            function T(t, e) {
                return function (n) {
                    if ("function" != typeof t)
                        throw new TypeError(
                            "argument is not a function. Are you looking for `mapTo()`?"
                        );
                    return n.lift(new k(t, e));
                };
            }
            class k {
                constructor(t, e) {
                    (this.project = t), (this.thisArg = e);
                }
                call(t, e) {
                    return e.subscribe(new O(t, this.project, this.thisArg));
                }
            }
            class O extends f {
                constructor(t, e, n) {
                    super(t),
                        (this.project = e),
                        (this.count = 0),
                        (this.thisArg = n || this);
                }
                _next(t) {
                    let e;
                    try {
                        e = this.project.call(this.thisArg, t, this.count++);
                    } catch (n) {
                        return void this.destination.error(n);
                    }
                    this.destination.next(e);
                }
            }
            const A = (t) => (e) => {
                for (let n = 0, r = t.length; n < r && !e.closed; n++)
                    e.next(t[n]);
                e.complete();
            };
            function D() {
                return "function" == typeof Symbol && Symbol.iterator
                    ? Symbol.iterator
                    : "@@iterator";
            }
            const I = D(),
                R = (t) =>
                    t && "number" == typeof t.length && "function" != typeof t;
            function P(t) {
                return (
                    !!t &&
                    "function" != typeof t.subscribe &&
                    "function" == typeof t.then
                );
            }
            const V = (t) => {
                if (t && "function" == typeof t[m])
                    return (
                        (r = t),
                        (t) => {
                            const e = r[m]();
                            if ("function" != typeof e.subscribe)
                                throw new TypeError(
                                    "Provided object does not correctly implement Symbol.observable"
                                );
                            return e.subscribe(t);
                        }
                    );
                if (R(t)) return A(t);
                if (P(t))
                    return (
                        (n = t),
                        (t) => (
                            n
                                .then(
                                    (e) => {
                                        t.closed || (t.next(e), t.complete());
                                    },
                                    (e) => t.error(e)
                                )
                                .then(null, o),
                            t
                        )
                    );
                if (t && "function" == typeof t[I])
                    return (
                        (e = t),
                        (t) => {
                            const n = e[I]();
                            for (;;) {
                                let e;
                                try {
                                    e = n.next();
                                } catch (r) {
                                    return t.error(r), t;
                                }
                                if (e.done) {
                                    t.complete();
                                    break;
                                }
                                if ((t.next(e.value), t.closed)) break;
                            }
                            return (
                                "function" == typeof n.return &&
                                    t.add(() => {
                                        n.return && n.return();
                                    }),
                                t
                            );
                        }
                    );
                {
                    const e = c(t) ? "an invalid object" : `'${t}'`;
                    throw new TypeError(
                        `You provided ${e} where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.`
                    );
                }
                var e, n, r;
            };
            function j(t, e) {
                return new v((n) => {
                    const r = new h();
                    let s = 0;
                    return (
                        r.add(
                            e.schedule(function () {
                                s !== t.length
                                    ? (n.next(t[s++]),
                                      n.closed || r.add(this.schedule()))
                                    : n.complete();
                            })
                        ),
                        r
                    );
                });
            }
            function M(t, e) {
                return e
                    ? (function (t, e) {
                          if (null != t) {
                              if (
                                  (function (t) {
                                      return t && "function" == typeof t[m];
                                  })(t)
                              )
                                  return (function (t, e) {
                                      return new v((n) => {
                                          const r = new h();
                                          return (
                                              r.add(
                                                  e.schedule(() => {
                                                      const s = t[m]();
                                                      r.add(
                                                          s.subscribe({
                                                              next(t) {
                                                                  r.add(
                                                                      e.schedule(
                                                                          () =>
                                                                              n.next(
                                                                                  t
                                                                              )
                                                                      )
                                                                  );
                                                              },
                                                              error(t) {
                                                                  r.add(
                                                                      e.schedule(
                                                                          () =>
                                                                              n.error(
                                                                                  t
                                                                              )
                                                                      )
                                                                  );
                                                              },
                                                              complete() {
                                                                  r.add(
                                                                      e.schedule(
                                                                          () =>
                                                                              n.complete()
                                                                      )
                                                                  );
                                                              },
                                                          })
                                                      );
                                                  })
                                              ),
                                              r
                                          );
                                      });
                                  })(t, e);
                              if (P(t))
                                  return (function (t, e) {
                                      return new v((n) => {
                                          const r = new h();
                                          return (
                                              r.add(
                                                  e.schedule(() =>
                                                      t.then(
                                                          (t) => {
                                                              r.add(
                                                                  e.schedule(
                                                                      () => {
                                                                          n.next(
                                                                              t
                                                                          ),
                                                                              r.add(
                                                                                  e.schedule(
                                                                                      () =>
                                                                                          n.complete()
                                                                                  )
                                                                              );
                                                                      }
                                                                  )
                                                              );
                                                          },
                                                          (t) => {
                                                              r.add(
                                                                  e.schedule(
                                                                      () =>
                                                                          n.error(
                                                                              t
                                                                          )
                                                                  )
                                                              );
                                                          }
                                                      )
                                                  )
                                              ),
                                              r
                                          );
                                      });
                                  })(t, e);
                              if (R(t)) return j(t, e);
                              if (
                                  (function (t) {
                                      return t && "function" == typeof t[I];
                                  })(t) ||
                                  "string" == typeof t
                              )
                                  return (function (t, e) {
                                      if (!t)
                                          throw new Error(
                                              "Iterable cannot be null"
                                          );
                                      return new v((n) => {
                                          const r = new h();
                                          let s;
                                          return (
                                              r.add(() => {
                                                  s &&
                                                      "function" ==
                                                          typeof s.return &&
                                                      s.return();
                                              }),
                                              r.add(
                                                  e.schedule(() => {
                                                      (s = t[I]()),
                                                          r.add(
                                                              e.schedule(
                                                                  function () {
                                                                      if (
                                                                          n.closed
                                                                      )
                                                                          return;
                                                                      let t, e;
                                                                      try {
                                                                          const n =
                                                                              s.next();
                                                                          (t =
                                                                              n.value),
                                                                              (e =
                                                                                  n.done);
                                                                      } catch (r) {
                                                                          return void n.error(
                                                                              r
                                                                          );
                                                                      }
                                                                      e
                                                                          ? n.complete()
                                                                          : (n.next(
                                                                                t
                                                                            ),
                                                                            this.schedule());
                                                                  }
                                                              )
                                                          );
                                                  })
                                              ),
                                              r
                                          );
                                      });
                                  })(t, e);
                          }
                          throw new TypeError(
                              ((null !== t && typeof t) || t) +
                                  " is not observable"
                          );
                      })(t, e)
                    : t instanceof v
                    ? t
                    : new v(V(t));
            }
            class N extends f {
                constructor(t) {
                    super(), (this.parent = t);
                }
                _next(t) {
                    this.parent.notifyNext(t);
                }
                _error(t) {
                    this.parent.notifyError(t), this.unsubscribe();
                }
                _complete() {
                    this.parent.notifyComplete(), this.unsubscribe();
                }
            }
            class U extends f {
                notifyNext(t) {
                    this.destination.next(t);
                }
                notifyError(t) {
                    this.destination.error(t);
                }
                notifyComplete() {
                    this.destination.complete();
                }
            }
            function L(t, e) {
                if (!e.closed) return t instanceof v ? t.subscribe(e) : V(t)(e);
            }
            function F(t, e, n = Number.POSITIVE_INFINITY) {
                return "function" == typeof e
                    ? (r) =>
                          r.pipe(
                              F(
                                  (n, r) =>
                                      M(t(n, r)).pipe(
                                          T((t, s) => e(n, t, r, s))
                                      ),
                                  n
                              )
                          )
                    : ("number" == typeof e && (n = e),
                      (e) => e.lift(new H(t, n)));
            }
            class H {
                constructor(t, e = Number.POSITIVE_INFINITY) {
                    (this.project = t), (this.concurrent = e);
                }
                call(t, e) {
                    return e.subscribe(new z(t, this.project, this.concurrent));
                }
            }
            class z extends U {
                constructor(t, e, n = Number.POSITIVE_INFINITY) {
                    super(t),
                        (this.project = e),
                        (this.concurrent = n),
                        (this.hasCompleted = !1),
                        (this.buffer = []),
                        (this.active = 0),
                        (this.index = 0);
                }
                _next(t) {
                    this.active < this.concurrent
                        ? this._tryNext(t)
                        : this.buffer.push(t);
                }
                _tryNext(t) {
                    let e;
                    const n = this.index++;
                    try {
                        e = this.project(t, n);
                    } catch (r) {
                        return void this.destination.error(r);
                    }
                    this.active++, this._innerSub(e);
                }
                _innerSub(t) {
                    const e = new N(this),
                        n = this.destination;
                    n.add(e);
                    const r = L(t, e);
                    r !== e && n.add(r);
                }
                _complete() {
                    (this.hasCompleted = !0),
                        0 === this.active &&
                            0 === this.buffer.length &&
                            this.destination.complete(),
                        this.unsubscribe();
                }
                notifyNext(t) {
                    this.destination.next(t);
                }
                notifyComplete() {
                    const t = this.buffer;
                    this.active--,
                        t.length > 0
                            ? this._next(t.shift())
                            : 0 === this.active &&
                              this.hasCompleted &&
                              this.destination.complete();
                }
            }
            function $(t = Number.POSITIVE_INFINITY) {
                return F(y, t);
            }
            function q(t, e) {
                return e ? j(t, e) : new v(A(t));
            }
            function B() {
                return function (t) {
                    return t.lift(new W(t));
                };
            }
            class W {
                constructor(t) {
                    this.connectable = t;
                }
                call(t, e) {
                    const { connectable: n } = this;
                    n._refCount++;
                    const r = new Z(t, n),
                        s = e.subscribe(r);
                    return r.closed || (r.connection = n.connect()), s;
                }
            }
            class Z extends f {
                constructor(t, e) {
                    super(t), (this.connectable = e);
                }
                _unsubscribe() {
                    const { connectable: t } = this;
                    if (!t) return void (this.connection = null);
                    this.connectable = null;
                    const e = t._refCount;
                    if (e <= 0) return void (this.connection = null);
                    if (((t._refCount = e - 1), e > 1))
                        return void (this.connection = null);
                    const { connection: n } = this,
                        r = t._connection;
                    (this.connection = null),
                        !r || (n && r !== n) || r.unsubscribe();
                }
            }
            class G extends v {
                constructor(t, e) {
                    super(),
                        (this.source = t),
                        (this.subjectFactory = e),
                        (this._refCount = 0),
                        (this._isComplete = !1);
                }
                _subscribe(t) {
                    return this.getSubject().subscribe(t);
                }
                getSubject() {
                    const t = this._subject;
                    return (
                        (t && !t.isStopped) ||
                            (this._subject = this.subjectFactory()),
                        this._subject
                    );
                }
                connect() {
                    let t = this._connection;
                    return (
                        t ||
                            ((this._isComplete = !1),
                            (t = this._connection = new h()),
                            t.add(
                                this.source.subscribe(
                                    new K(this.getSubject(), this)
                                )
                            ),
                            t.closed &&
                                ((this._connection = null), (t = h.EMPTY))),
                        t
                    );
                }
                refCount() {
                    return B()(this);
                }
            }
            const Q = (() => {
                const t = G.prototype;
                return {
                    operator: { value: null },
                    _refCount: { value: 0, writable: !0 },
                    _subject: { value: null, writable: !0 },
                    _connection: { value: null, writable: !0 },
                    _subscribe: { value: t._subscribe },
                    _isComplete: { value: t._isComplete, writable: !0 },
                    getSubject: { value: t.getSubject },
                    connect: { value: t.connect },
                    refCount: { value: t.refCount },
                };
            })();
            class K extends C {
                constructor(t, e) {
                    super(t), (this.connectable = e);
                }
                _error(t) {
                    this._unsubscribe(), super._error(t);
                }
                _complete() {
                    (this.connectable._isComplete = !0),
                        this._unsubscribe(),
                        super._complete();
                }
                _unsubscribe() {
                    const t = this.connectable;
                    if (t) {
                        this.connectable = null;
                        const e = t._connection;
                        (t._refCount = 0),
                            (t._subject = null),
                            (t._connection = null),
                            e && e.unsubscribe();
                    }
                }
            }
            function J() {
                return new S();
            }
            function Y(t) {
                for (let e in t) if (t[e] === Y) return e;
                throw Error(
                    "Could not find renamed property on target object."
                );
            }
            function X(t, e) {
                for (const n in e)
                    e.hasOwnProperty(n) &&
                        !t.hasOwnProperty(n) &&
                        (t[n] = e[n]);
            }
            function tt(t) {
                if ("string" == typeof t) return t;
                if (Array.isArray(t)) return "[" + t.map(tt).join(", ") + "]";
                if (null == t) return "" + t;
                if (t.overriddenName) return "" + t.overriddenName;
                if (t.name) return "" + t.name;
                const e = t.toString();
                if (null == e) return "" + e;
                const n = e.indexOf("\n");
                return -1 === n ? e : e.substring(0, n);
            }
            function et(t, e) {
                return null == t || "" === t
                    ? null === e
                        ? ""
                        : e
                    : null == e || "" === e
                    ? t
                    : t + " " + e;
            }
            const nt = Y({ __forward_ref__: Y });
            function rt(t) {
                return (
                    (t.__forward_ref__ = rt),
                    (t.toString = function () {
                        return tt(this());
                    }),
                    t
                );
            }
            function st(t) {
                return it(t) ? t() : t;
            }
            function it(t) {
                return (
                    "function" == typeof t &&
                    t.hasOwnProperty(nt) &&
                    t.__forward_ref__ === rt
                );
            }
            function ot(t) {
                return {
                    token: t.token,
                    providedIn: t.providedIn || null,
                    factory: t.factory,
                    value: void 0,
                };
            }
            function at(t) {
                return {
                    factory: t.factory,
                    providers: t.providers || [],
                    imports: t.imports || [],
                };
            }
            function lt(t) {
                return ct(t, ht) || ct(t, pt);
            }
            function ct(t, e) {
                return t.hasOwnProperty(e) ? t[e] : null;
            }
            function ut(t) {
                return t && (t.hasOwnProperty(dt) || t.hasOwnProperty(ft))
                    ? t[dt]
                    : null;
            }
            const ht = Y({ "\u0275prov": Y }),
                dt = Y({ "\u0275inj": Y }),
                pt = Y({ ngInjectableDef: Y }),
                ft = Y({ ngInjectorDef: Y });
            var gt = (function (t) {
                return (
                    (t[(t.Default = 0)] = "Default"),
                    (t[(t.Host = 1)] = "Host"),
                    (t[(t.Self = 2)] = "Self"),
                    (t[(t.SkipSelf = 4)] = "SkipSelf"),
                    (t[(t.Optional = 8)] = "Optional"),
                    t
                );
            })({});
            let mt;
            function yt(t) {
                const e = mt;
                return (mt = t), e;
            }
            function vt(t, e, n) {
                const r = lt(t);
                if (r && "root" == r.providedIn)
                    return void 0 === r.value
                        ? (r.value = r.factory())
                        : r.value;
                if (n & gt.Optional) return null;
                if (void 0 !== e) return e;
                throw new Error(`Injector: NOT_FOUND [${tt(t)}]`);
            }
            function _t(t) {
                return { toString: t }.toString();
            }
            var bt = (function (t) {
                    return (
                        (t[(t.OnPush = 0)] = "OnPush"),
                        (t[(t.Default = 1)] = "Default"),
                        t
                    );
                })({}),
                wt = (function (t) {
                    return (
                        (t[(t.Emulated = 0)] = "Emulated"),
                        (t[(t.None = 2)] = "None"),
                        (t[(t.ShadowDom = 3)] = "ShadowDom"),
                        t
                    );
                })({});
            const Ct = "undefined" != typeof globalThis && globalThis,
                St = "undefined" != typeof window && window,
                xt =
                    "undefined" != typeof self &&
                    "undefined" != typeof WorkerGlobalScope &&
                    self instanceof WorkerGlobalScope &&
                    self,
                Et = "undefined" != typeof global && global,
                Tt = Ct || Et || St || xt,
                kt = {},
                Ot = [],
                At = Y({ "\u0275cmp": Y }),
                Dt = Y({ "\u0275dir": Y }),
                It = Y({ "\u0275pipe": Y }),
                Rt = Y({ "\u0275mod": Y }),
                Pt = Y({ "\u0275loc": Y }),
                Vt = Y({ "\u0275fac": Y }),
                jt = Y({ __NG_ELEMENT_ID__: Y });
            let Mt = 0;
            function Nt(t) {
                return _t(() => {
                    const e = {},
                        n = {
                            type: t.type,
                            providersResolver: null,
                            decls: t.decls,
                            vars: t.vars,
                            factory: null,
                            template: t.template || null,
                            consts: t.consts || null,
                            ngContentSelectors: t.ngContentSelectors,
                            hostBindings: t.hostBindings || null,
                            hostVars: t.hostVars || 0,
                            hostAttrs: t.hostAttrs || null,
                            contentQueries: t.contentQueries || null,
                            declaredInputs: e,
                            inputs: null,
                            outputs: null,
                            exportAs: t.exportAs || null,
                            onPush: t.changeDetection === bt.OnPush,
                            directiveDefs: null,
                            pipeDefs: null,
                            selectors: t.selectors || Ot,
                            viewQuery: t.viewQuery || null,
                            features: t.features || null,
                            data: t.data || {},
                            encapsulation: t.encapsulation || wt.Emulated,
                            id: "c",
                            styles: t.styles || Ot,
                            _: null,
                            setInput: null,
                            schemas: t.schemas || null,
                            tView: null,
                        },
                        r = t.directives,
                        s = t.features,
                        i = t.pipes;
                    return (
                        (n.id += Mt++),
                        (n.inputs = zt(t.inputs, e)),
                        (n.outputs = zt(t.outputs)),
                        s && s.forEach((t) => t(n)),
                        (n.directiveDefs = r
                            ? () => ("function" == typeof r ? r() : r).map(Ut)
                            : null),
                        (n.pipeDefs = i
                            ? () => ("function" == typeof i ? i() : i).map(Lt)
                            : null),
                        n
                    );
                });
            }
            function Ut(t) {
                return (
                    qt(t) ||
                    (function (t) {
                        return t[Dt] || null;
                    })(t)
                );
            }
            function Lt(t) {
                return (function (t) {
                    return t[It] || null;
                })(t);
            }
            const Ft = {};
            function Ht(t) {
                const e = {
                    type: t.type,
                    bootstrap: t.bootstrap || Ot,
                    declarations: t.declarations || Ot,
                    imports: t.imports || Ot,
                    exports: t.exports || Ot,
                    transitiveCompileScopes: null,
                    schemas: t.schemas || null,
                    id: t.id || null,
                };
                return (
                    null != t.id &&
                        _t(() => {
                            Ft[t.id] = t.type;
                        }),
                    e
                );
            }
            function zt(t, e) {
                if (null == t) return kt;
                const n = {};
                for (const r in t)
                    if (t.hasOwnProperty(r)) {
                        let s = t[r],
                            i = s;
                        Array.isArray(s) && ((i = s[1]), (s = s[0])),
                            (n[s] = r),
                            e && (e[s] = i);
                    }
                return n;
            }
            const $t = Nt;
            function qt(t) {
                return t[At] || null;
            }
            function Bt(t, e) {
                const n = t[Rt] || null;
                if (!n && !0 === e)
                    throw new Error(
                        `Type ${tt(t)} does not have '\u0275mod' property.`
                    );
                return n;
            }
            const Wt = 20,
                Zt = 10;
            function Gt(t) {
                return Array.isArray(t) && "object" == typeof t[1];
            }
            function Qt(t) {
                return Array.isArray(t) && !0 === t[1];
            }
            function Kt(t) {
                return 0 != (8 & t.flags);
            }
            function Jt(t) {
                return 2 == (2 & t.flags);
            }
            function Yt(t) {
                return 1 == (1 & t.flags);
            }
            function Xt(t) {
                return null !== t.template;
            }
            function te(t, e) {
                return t.hasOwnProperty(Vt) ? t[Vt] : null;
            }
            class ee extends Error {
                constructor(t, e) {
                    super(
                        (function (t, e) {
                            return `${t ? `NG0${t}: ` : ""}${e}`;
                        })(t, e)
                    ),
                        (this.code = t);
                }
            }
            function ne(t) {
                return "string" == typeof t ? t : null == t ? "" : String(t);
            }
            function re(t) {
                return "function" == typeof t
                    ? t.name || t.toString()
                    : "object" == typeof t &&
                      null != t &&
                      "function" == typeof t.type
                    ? t.type.name || t.type.toString()
                    : ne(t);
            }
            function se(t, e) {
                const n = e ? " in " + e : "";
                throw new ee("201", `No provider for ${re(t)} found${n}`);
            }
            class ie {
                constructor(t, e, n) {
                    (this.previousValue = t),
                        (this.currentValue = e),
                        (this.firstChange = n);
                }
                isFirstChange() {
                    return this.firstChange;
                }
            }
            function oe() {
                return ae;
            }
            function ae(t) {
                return t.type.prototype.ngOnChanges && (t.setInput = ce), le;
            }
            function le() {
                const t = ue(this),
                    e = null == t ? void 0 : t.current;
                if (e) {
                    const n = t.previous;
                    if (n === kt) t.previous = e;
                    else for (let t in e) n[t] = e[t];
                    (t.current = null), this.ngOnChanges(e);
                }
            }
            function ce(t, e, n, r) {
                const s =
                        ue(t) ||
                        (function (t, e) {
                            return (t.__ngSimpleChanges__ = e);
                        })(t, { previous: kt, current: null }),
                    i = s.current || (s.current = {}),
                    o = s.previous,
                    a = this.declaredInputs[n],
                    l = o[a];
                (i[a] = new ie(l && l.currentValue, e, o === kt)), (t[r] = e);
            }
            function ue(t) {
                return t.__ngSimpleChanges__ || null;
            }
            oe.ngInherit = !0;
            let he = void 0;
            function de(t) {
                return !!t.listen;
            }
            const pe = {
                createRenderer: (t, e) =>
                    void 0 !== he
                        ? he
                        : "undefined" != typeof document
                        ? document
                        : void 0,
            };
            function fe(t) {
                for (; Array.isArray(t); ) t = t[0];
                return t;
            }
            function ge(t, e) {
                return fe(e[t]);
            }
            function me(t, e) {
                return fe(e[t.index]);
            }
            function ye(t, e) {
                return t.data[e];
            }
            function ve(t, e) {
                return t[e];
            }
            function _e(t, e) {
                const n = e[t];
                return Gt(n) ? n : n[0];
            }
            function be(t) {
                const e = (function (t) {
                    return t.__ngContext__ || null;
                })(t);
                return e ? (Array.isArray(e) ? e : e.lView) : null;
            }
            function we(t) {
                return 4 == (4 & t[2]);
            }
            function Ce(t) {
                return 128 == (128 & t[2]);
            }
            function Se(t, e) {
                return null == e ? null : t[e];
            }
            function xe(t) {
                t[18] = 0;
            }
            function Ee(t, e) {
                t[5] += e;
                let n = t,
                    r = t[3];
                for (
                    ;
                    null !== r &&
                    ((1 === e && 1 === n[5]) || (-1 === e && 0 === n[5]));

                )
                    (r[5] += e), (n = r), (r = r[3]);
            }
            const Te = {
                lFrame: Ze(null),
                bindingsEnabled: !0,
                isInCheckNoChangesMode: !1,
            };
            function ke() {
                return Te.bindingsEnabled;
            }
            function Oe() {
                return Te.lFrame.lView;
            }
            function Ae() {
                return Te.lFrame.tView;
            }
            function De(t) {
                Te.lFrame.contextLView = t;
            }
            function Ie() {
                let t = Re();
                for (; null !== t && 64 === t.type; ) t = t.parent;
                return t;
            }
            function Re() {
                return Te.lFrame.currentTNode;
            }
            function Pe(t, e) {
                const n = Te.lFrame;
                (n.currentTNode = t), (n.isParent = e);
            }
            function Ve() {
                return Te.lFrame.isParent;
            }
            function je() {
                return Te.isInCheckNoChangesMode;
            }
            function Me(t) {
                Te.isInCheckNoChangesMode = t;
            }
            function Ne() {
                const t = Te.lFrame;
                let e = t.bindingRootIndex;
                return (
                    -1 === e &&
                        (e = t.bindingRootIndex = t.tView.bindingStartIndex),
                    e
                );
            }
            function Ue() {
                return Te.lFrame.bindingIndex++;
            }
            function Le(t, e) {
                const n = Te.lFrame;
                (n.bindingIndex = n.bindingRootIndex = t), Fe(e);
            }
            function Fe(t) {
                Te.lFrame.currentDirectiveIndex = t;
            }
            function He() {
                return Te.lFrame.currentQueryIndex;
            }
            function ze(t) {
                Te.lFrame.currentQueryIndex = t;
            }
            function $e(t) {
                const e = t[1];
                return 2 === e.type ? e.declTNode : 1 === e.type ? t[6] : null;
            }
            function qe(t, e, n) {
                if (n & gt.SkipSelf) {
                    let r = e,
                        s = t;
                    for (
                        ;
                        (r = r.parent),
                            !(
                                null !== r ||
                                n & gt.Host ||
                                ((r = $e(s)), null === r) ||
                                ((s = s[15]), 10 & r.type)
                            );

                    );
                    if (null === r) return !1;
                    (e = r), (t = s);
                }
                const r = (Te.lFrame = We());
                return (r.currentTNode = e), (r.lView = t), !0;
            }
            function Be(t) {
                const e = We(),
                    n = t[1];
                (Te.lFrame = e),
                    (e.currentTNode = n.firstChild),
                    (e.lView = t),
                    (e.tView = n),
                    (e.contextLView = t),
                    (e.bindingIndex = n.bindingStartIndex),
                    (e.inI18n = !1);
            }
            function We() {
                const t = Te.lFrame,
                    e = null === t ? null : t.child;
                return null === e ? Ze(t) : e;
            }
            function Ze(t) {
                const e = {
                    currentTNode: null,
                    isParent: !0,
                    lView: null,
                    tView: null,
                    selectedIndex: -1,
                    contextLView: null,
                    elementDepthCount: 0,
                    currentNamespace: null,
                    currentDirectiveIndex: -1,
                    bindingRootIndex: -1,
                    bindingIndex: -1,
                    currentQueryIndex: 0,
                    parent: t,
                    child: null,
                    inI18n: !1,
                };
                return null !== t && (t.child = e), e;
            }
            function Ge() {
                const t = Te.lFrame;
                return (
                    (Te.lFrame = t.parent),
                    (t.currentTNode = null),
                    (t.lView = null),
                    t
                );
            }
            const Qe = Ge;
            function Ke() {
                const t = Ge();
                (t.isParent = !0),
                    (t.tView = null),
                    (t.selectedIndex = -1),
                    (t.contextLView = null),
                    (t.elementDepthCount = 0),
                    (t.currentDirectiveIndex = -1),
                    (t.currentNamespace = null),
                    (t.bindingRootIndex = -1),
                    (t.bindingIndex = -1),
                    (t.currentQueryIndex = 0);
            }
            function Je() {
                return Te.lFrame.selectedIndex;
            }
            function Ye(t) {
                Te.lFrame.selectedIndex = t;
            }
            function Xe() {
                const t = Te.lFrame;
                return ye(t.tView, t.selectedIndex);
            }
            function tn(t, e) {
                for (let n = e.directiveStart, r = e.directiveEnd; n < r; n++) {
                    const e = t.data[n].type.prototype,
                        {
                            ngAfterContentInit: r,
                            ngAfterContentChecked: s,
                            ngAfterViewInit: i,
                            ngAfterViewChecked: o,
                            ngOnDestroy: a,
                        } = e;
                    r && (t.contentHooks || (t.contentHooks = [])).push(-n, r),
                        s &&
                            ((t.contentHooks || (t.contentHooks = [])).push(
                                n,
                                s
                            ),
                            (
                                t.contentCheckHooks ||
                                (t.contentCheckHooks = [])
                            ).push(n, s)),
                        i && (t.viewHooks || (t.viewHooks = [])).push(-n, i),
                        o &&
                            ((t.viewHooks || (t.viewHooks = [])).push(n, o),
                            (t.viewCheckHooks || (t.viewCheckHooks = [])).push(
                                n,
                                o
                            )),
                        null != a &&
                            (t.destroyHooks || (t.destroyHooks = [])).push(
                                n,
                                a
                            );
                }
            }
            function en(t, e, n) {
                sn(t, e, 3, n);
            }
            function nn(t, e, n, r) {
                (3 & t[2]) === n && sn(t, e, n, r);
            }
            function rn(t, e) {
                let n = t[2];
                (3 & n) === e && ((n &= 2047), (n += 1), (t[2] = n));
            }
            function sn(t, e, n, r) {
                const s = null != r ? r : -1,
                    i = e.length - 1;
                let o = 0;
                for (let a = void 0 !== r ? 65535 & t[18] : 0; a < i; a++)
                    if ("number" == typeof e[a + 1]) {
                        if (((o = e[a]), null != r && o >= r)) break;
                    } else
                        e[a] < 0 && (t[18] += 65536),
                            (o < s || -1 == s) &&
                                (on(t, n, e, a),
                                (t[18] = (4294901760 & t[18]) + a + 2)),
                            a++;
            }
            function on(t, e, n, r) {
                const s = n[r] < 0,
                    i = n[r + 1],
                    o = t[s ? -n[r] : n[r]];
                s
                    ? t[2] >> 11 < t[18] >> 16 &&
                      (3 & t[2]) === e &&
                      ((t[2] += 2048), i.call(o))
                    : i.call(o);
            }
            const an = -1;
            class ln {
                constructor(t, e, n) {
                    (this.factory = t),
                        (this.resolving = !1),
                        (this.canSeeViewProviders = e),
                        (this.injectImpl = n);
                }
            }
            function cn(t, e, n) {
                const r = de(t);
                let s = 0;
                for (; s < n.length; ) {
                    const i = n[s];
                    if ("number" == typeof i) {
                        if (0 !== i) break;
                        s++;
                        const o = n[s++],
                            a = n[s++],
                            l = n[s++];
                        r
                            ? t.setAttribute(e, a, l, o)
                            : e.setAttributeNS(o, a, l);
                    } else {
                        const o = i,
                            a = n[++s];
                        hn(o)
                            ? r && t.setProperty(e, o, a)
                            : r
                            ? t.setAttribute(e, o, a)
                            : e.setAttribute(o, a),
                            s++;
                    }
                }
                return s;
            }
            function un(t) {
                return 3 === t || 4 === t || 6 === t;
            }
            function hn(t) {
                return 64 === t.charCodeAt(0);
            }
            function dn(t, e) {
                if (null === e || 0 === e.length);
                else if (null === t || 0 === t.length) t = e.slice();
                else {
                    let n = -1;
                    for (let r = 0; r < e.length; r++) {
                        const s = e[r];
                        "number" == typeof s
                            ? (n = s)
                            : 0 === n ||
                              pn(
                                  t,
                                  n,
                                  s,
                                  null,
                                  -1 === n || 2 === n ? e[++r] : null
                              );
                    }
                }
                return t;
            }
            function pn(t, e, n, r, s) {
                let i = 0,
                    o = t.length;
                if (-1 === e) o = -1;
                else
                    for (; i < t.length; ) {
                        const n = t[i++];
                        if ("number" == typeof n) {
                            if (n === e) {
                                o = -1;
                                break;
                            }
                            if (n > e) {
                                o = i - 1;
                                break;
                            }
                        }
                    }
                for (; i < t.length; ) {
                    const e = t[i];
                    if ("number" == typeof e) break;
                    if (e === n) {
                        if (null === r)
                            return void (null !== s && (t[i + 1] = s));
                        if (r === t[i + 1]) return void (t[i + 2] = s);
                    }
                    i++, null !== r && i++, null !== s && i++;
                }
                -1 !== o && (t.splice(o, 0, e), (i = o + 1)),
                    t.splice(i++, 0, n),
                    null !== r && t.splice(i++, 0, r),
                    null !== s && t.splice(i++, 0, s);
            }
            function fn(t) {
                return t !== an;
            }
            function gn(t) {
                return 32767 & t;
            }
            function mn(t, e) {
                let n = t >> 16,
                    r = e;
                for (; n > 0; ) (r = r[15]), n--;
                return r;
            }
            let yn = !0;
            function vn(t) {
                const e = yn;
                return (yn = t), e;
            }
            let _n = 0;
            function bn(t, e) {
                const n = Cn(t, e);
                if (-1 !== n) return n;
                const r = e[1];
                r.firstCreatePass &&
                    ((t.injectorIndex = e.length),
                    wn(r.data, t),
                    wn(e, null),
                    wn(r.blueprint, null));
                const s = Sn(t, e),
                    i = t.injectorIndex;
                if (fn(s)) {
                    const t = gn(s),
                        n = mn(s, e),
                        r = n[1].data;
                    for (let s = 0; s < 8; s++) e[i + s] = n[t + s] | r[t + s];
                }
                return (e[i + 8] = s), i;
            }
            function wn(t, e) {
                t.push(0, 0, 0, 0, 0, 0, 0, 0, e);
            }
            function Cn(t, e) {
                return -1 === t.injectorIndex ||
                    (t.parent && t.parent.injectorIndex === t.injectorIndex) ||
                    null === e[t.injectorIndex + 8]
                    ? -1
                    : t.injectorIndex;
            }
            function Sn(t, e) {
                if (t.parent && -1 !== t.parent.injectorIndex)
                    return t.parent.injectorIndex;
                let n = 0,
                    r = null,
                    s = e;
                for (; null !== s; ) {
                    const t = s[1],
                        e = t.type;
                    if (
                        ((r = 2 === e ? t.declTNode : 1 === e ? s[6] : null),
                        null === r)
                    )
                        return an;
                    if ((n++, (s = s[15]), -1 !== r.injectorIndex))
                        return r.injectorIndex | (n << 16);
                }
                return an;
            }
            function xn(t, e, n) {
                !(function (t, e, n) {
                    let r;
                    "string" == typeof n
                        ? (r = n.charCodeAt(0) || 0)
                        : n.hasOwnProperty(jt) && (r = n[jt]),
                        null == r && (r = n[jt] = _n++);
                    const s = 255 & r,
                        i = 1 << s,
                        o = 64 & s,
                        a = 32 & s,
                        l = e.data;
                    128 & s
                        ? o
                            ? a
                                ? (l[t + 7] |= i)
                                : (l[t + 6] |= i)
                            : a
                            ? (l[t + 5] |= i)
                            : (l[t + 4] |= i)
                        : o
                        ? a
                            ? (l[t + 3] |= i)
                            : (l[t + 2] |= i)
                        : a
                        ? (l[t + 1] |= i)
                        : (l[t] |= i);
                })(t, e, n);
            }
            function En(t, e, n) {
                if (n & gt.Optional) return t;
                se(e, "NodeInjector");
            }
            function Tn(t, e, n, r) {
                if (
                    (n & gt.Optional && void 0 === r && (r = null),
                    0 == (n & (gt.Self | gt.Host)))
                ) {
                    const s = t[9],
                        i = yt(void 0);
                    try {
                        return s
                            ? s.get(e, r, n & gt.Optional)
                            : vt(e, r, n & gt.Optional);
                    } finally {
                        yt(i);
                    }
                }
                return En(r, e, n);
            }
            function kn(t, e, n, r = gt.Default, s) {
                if (null !== t) {
                    const i = (function (t) {
                        if ("string" == typeof t) return t.charCodeAt(0) || 0;
                        const e = t.hasOwnProperty(jt) ? t[jt] : void 0;
                        return "number" == typeof e
                            ? e >= 0
                                ? 255 & e
                                : An
                            : e;
                    })(n);
                    if ("function" == typeof i) {
                        if (!qe(e, t, r))
                            return r & gt.Host ? En(s, n, r) : Tn(e, n, r, s);
                        try {
                            const t = i();
                            if (null != t || r & gt.Optional) return t;
                            se(n);
                        } finally {
                            Qe();
                        }
                    } else if ("number" == typeof i) {
                        let s = null,
                            o = Cn(t, e),
                            a = an,
                            l = r & gt.Host ? e[16][6] : null;
                        for (
                            (-1 === o || r & gt.SkipSelf) &&
                            ((a = -1 === o ? Sn(t, e) : e[o + 8]),
                            a !== an && Vn(r, !1)
                                ? ((s = e[1]), (o = gn(a)), (e = mn(a, e)))
                                : (o = -1));
                            -1 !== o;

                        ) {
                            const t = e[1];
                            if (Pn(i, o, t.data)) {
                                const t = Dn(o, e, n, s, r, l);
                                if (t !== On) return t;
                            }
                            (a = e[o + 8]),
                                a !== an &&
                                Vn(r, e[1].data[o + 8] === l) &&
                                Pn(i, o, e)
                                    ? ((s = t), (o = gn(a)), (e = mn(a, e)))
                                    : (o = -1);
                        }
                    }
                }
                return Tn(e, n, r, s);
            }
            const On = {};
            function An() {
                return new jn(Ie(), Oe());
            }
            function Dn(t, e, n, r, s, i) {
                const o = e[1],
                    a = o.data[t + 8],
                    l = In(
                        a,
                        o,
                        n,
                        null == r ? Jt(a) && yn : r != o && 0 != (3 & a.type),
                        s & gt.Host && i === a
                    );
                return null !== l ? Rn(e, o, l, a) : On;
            }
            function In(t, e, n, r, s) {
                const i = t.providerIndexes,
                    o = e.data,
                    a = 1048575 & i,
                    l = t.directiveStart,
                    c = i >> 20,
                    u = s ? a + c : t.directiveEnd;
                for (let h = r ? a : a + c; h < u; h++) {
                    const t = o[h];
                    if ((h < l && n === t) || (h >= l && t.type === n))
                        return h;
                }
                if (s) {
                    const t = o[l];
                    if (t && Xt(t) && t.type === n) return l;
                }
                return null;
            }
            function Rn(t, e, n, r) {
                let s = t[n];
                const i = e.data;
                if (s instanceof ln) {
                    const o = s;
                    o.resolving &&
                        (function (t, e) {
                            throw new ee(
                                "200",
                                "Circular dependency in DI detected for " + t
                            );
                        })(re(i[n]));
                    const a = vn(o.canSeeViewProviders);
                    o.resolving = !0;
                    const l = o.injectImpl ? yt(o.injectImpl) : null;
                    qe(t, r, gt.Default);
                    try {
                        (s = t[n] = o.factory(void 0, i, t, r)),
                            e.firstCreatePass &&
                                n >= r.directiveStart &&
                                (function (t, e, n) {
                                    const {
                                        ngOnChanges: r,
                                        ngOnInit: s,
                                        ngDoCheck: i,
                                    } = e.type.prototype;
                                    if (r) {
                                        const r = ae(e);
                                        (
                                            n.preOrderHooks ||
                                            (n.preOrderHooks = [])
                                        ).push(t, r),
                                            (
                                                n.preOrderCheckHooks ||
                                                (n.preOrderCheckHooks = [])
                                            ).push(t, r);
                                    }
                                    s &&
                                        (
                                            n.preOrderHooks ||
                                            (n.preOrderHooks = [])
                                        ).push(0 - t, s),
                                        i &&
                                            ((
                                                n.preOrderHooks ||
                                                (n.preOrderHooks = [])
                                            ).push(t, i),
                                            (
                                                n.preOrderCheckHooks ||
                                                (n.preOrderCheckHooks = [])
                                            ).push(t, i));
                                })(n, i[n], e);
                    } finally {
                        null !== l && yt(l), vn(a), (o.resolving = !1), Qe();
                    }
                }
                return s;
            }
            function Pn(t, e, n) {
                const r = 64 & t,
                    s = 32 & t;
                let i;
                return (
                    (i =
                        128 & t
                            ? r
                                ? s
                                    ? n[e + 7]
                                    : n[e + 6]
                                : s
                                ? n[e + 5]
                                : n[e + 4]
                            : r
                            ? s
                                ? n[e + 3]
                                : n[e + 2]
                            : s
                            ? n[e + 1]
                            : n[e]),
                    !!(i & (1 << t))
                );
            }
            function Vn(t, e) {
                return !(t & gt.Self || (t & gt.Host && e));
            }
            class jn {
                constructor(t, e) {
                    (this._tNode = t), (this._lView = e);
                }
                get(t, e) {
                    return kn(this._tNode, this._lView, t, void 0, e);
                }
            }
            function Mn(t) {
                const e = t;
                if (it(t))
                    return () => {
                        const t = Mn(st(e));
                        return t ? t() : null;
                    };
                let n = te(e);
                if (null === n) {
                    const t = ut(e);
                    n = t && t.factory;
                }
                return n || null;
            }
            function Nn(t) {
                return _t(() => {
                    const e = t.prototype.constructor,
                        n = e[Vt] || Mn(e),
                        r = Object.prototype;
                    let s = Object.getPrototypeOf(t.prototype).constructor;
                    for (; s && s !== r; ) {
                        const t = s[Vt] || Mn(s);
                        if (t && t !== n) return t;
                        s = Object.getPrototypeOf(s);
                    }
                    return (t) => new t();
                });
            }
            function Un(t) {
                return (function (t, e) {
                    if ("class" === e) return t.classes;
                    if ("style" === e) return t.styles;
                    const n = t.attrs;
                    if (n) {
                        const t = n.length;
                        let r = 0;
                        for (; r < t; ) {
                            const s = n[r];
                            if (un(s)) break;
                            if (0 === s) r += 2;
                            else if ("number" == typeof s)
                                for (r++; r < t && "string" == typeof n[r]; )
                                    r++;
                            else {
                                if (s === e) return n[r + 1];
                                r += 2;
                            }
                        }
                    }
                    return null;
                })(Ie(), t);
            }
            const Ln = "__parameters__",
                Fn = "__prop__metadata__";
            function Hn(t) {
                return function (...e) {
                    if (t) {
                        const n = t(...e);
                        for (const t in n) this[t] = n[t];
                    }
                };
            }
            function zn(t, e, n) {
                return _t(() => {
                    const r = Hn(e);
                    function s(...t) {
                        if (this instanceof s) return r.apply(this, t), this;
                        const e = new s(...t);
                        return (n.annotation = e), n;
                        function n(t, n, r) {
                            const s = t.hasOwnProperty(Ln)
                                ? t[Ln]
                                : Object.defineProperty(t, Ln, { value: [] })[
                                      Ln
                                  ];
                            for (; s.length <= r; ) s.push(null);
                            return (s[r] = s[r] || []).push(e), t;
                        }
                    }
                    return (
                        n && (s.prototype = Object.create(n.prototype)),
                        (s.prototype.ngMetadataName = t),
                        (s.annotationCls = s),
                        s
                    );
                });
            }
            function $n(t, e, n, r) {
                return _t(() => {
                    const s = Hn(e);
                    function i(...t) {
                        if (this instanceof i) return s.apply(this, t), this;
                        const e = new i(...t);
                        return function (n, s) {
                            const i = n.constructor,
                                o = i.hasOwnProperty(Fn)
                                    ? i[Fn]
                                    : Object.defineProperty(i, Fn, {
                                          value: {},
                                      })[Fn];
                            (o[s] = (o.hasOwnProperty(s) && o[s]) || []),
                                o[s].unshift(e),
                                r && r(n, s, ...t);
                        };
                    }
                    return (
                        n && (i.prototype = Object.create(n.prototype)),
                        (i.prototype.ngMetadataName = t),
                        (i.annotationCls = i),
                        i
                    );
                });
            }
            class qn {
                constructor(t, e) {
                    (this._desc = t),
                        (this.ngMetadataName = "InjectionToken"),
                        (this.ɵprov = void 0),
                        "number" == typeof e
                            ? (this.__NG_ELEMENT_ID__ = e)
                            : void 0 !== e &&
                              (this.ɵprov = ot({
                                  token: this,
                                  providedIn: e.providedIn || "root",
                                  factory: e.factory,
                              }));
                }
                toString() {
                    return "InjectionToken " + this._desc;
                }
            }
            const Bn = new qn("AnalyzeForEntryComponents"),
                Wn = Function;
            function Zn(t, e) {
                void 0 === e && (e = t);
                for (let n = 0; n < t.length; n++) {
                    let r = t[n];
                    Array.isArray(r)
                        ? (e === t && (e = t.slice(0, n)), Zn(r, e))
                        : e !== t && e.push(r);
                }
                return e;
            }
            function Gn(t, e) {
                t.forEach((t) => (Array.isArray(t) ? Gn(t, e) : e(t)));
            }
            function Qn(t, e, n) {
                e >= t.length ? t.push(n) : t.splice(e, 0, n);
            }
            function Kn(t, e) {
                return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
            }
            function Jn(t, e, n) {
                let r = Xn(t, e);
                return (
                    r >= 0
                        ? (t[1 | r] = n)
                        : ((r = ~r),
                          (function (t, e, n, r) {
                              let s = t.length;
                              if (s == e) t.push(n, r);
                              else if (1 === s) t.push(r, t[0]), (t[0] = n);
                              else {
                                  for (s--, t.push(t[s - 1], t[s]); s > e; )
                                      (t[s] = t[s - 2]), s--;
                                  (t[e] = n), (t[e + 1] = r);
                              }
                          })(t, r, e, n)),
                    r
                );
            }
            function Yn(t, e) {
                const n = Xn(t, e);
                if (n >= 0) return t[1 | n];
            }
            function Xn(t, e) {
                return (function (t, e, n) {
                    let r = 0,
                        s = t.length >> 1;
                    for (; s !== r; ) {
                        const n = r + ((s - r) >> 1),
                            i = t[n << 1];
                        if (e === i) return n << 1;
                        i > e ? (s = n) : (r = n + 1);
                    }
                    return ~(s << 1);
                })(t, e);
            }
            const tr = zn("Inject", (t) => ({ token: t })),
                er = zn("Optional"),
                nr = zn("Self"),
                rr = zn("SkipSelf"),
                sr = zn("Host"),
                ir = {},
                or = /\n/gm,
                ar = "__source",
                lr = Y({ provide: String, useValue: Y });
            let cr = void 0;
            function ur(t) {
                const e = cr;
                return (cr = t), e;
            }
            function hr(t, e = gt.Default) {
                if (void 0 === cr)
                    throw new Error(
                        "inject() must be called from an injection context"
                    );
                return null === cr
                    ? vt(t, void 0, e)
                    : cr.get(t, e & gt.Optional ? null : void 0, e);
            }
            function dr(t, e = gt.Default) {
                return (mt || hr)(st(t), e);
            }
            function pr(t) {
                const e = [];
                for (let n = 0; n < t.length; n++) {
                    const r = st(t[n]);
                    if (Array.isArray(r)) {
                        if (0 === r.length)
                            throw new Error(
                                "Arguments array must have arguments."
                            );
                        let t = void 0,
                            n = gt.Default;
                        for (let e = 0; e < r.length; e++) {
                            const s = r[e];
                            s instanceof er ||
                            "Optional" === s.ngMetadataName ||
                            s === er
                                ? (n |= gt.Optional)
                                : s instanceof rr ||
                                  "SkipSelf" === s.ngMetadataName ||
                                  s === rr
                                ? (n |= gt.SkipSelf)
                                : s instanceof nr ||
                                  "Self" === s.ngMetadataName ||
                                  s === nr
                                ? (n |= gt.Self)
                                : s instanceof sr ||
                                  "Host" === s.ngMetadataName ||
                                  s === sr
                                ? (n |= gt.Host)
                                : (t =
                                      s instanceof tr || s === tr
                                          ? s.token
                                          : s);
                        }
                        e.push(dr(t, n));
                    } else e.push(dr(r));
                }
                return e;
            }
            class fr {
                constructor(t) {
                    this.changingThisBreaksApplicationSecurity = t;
                }
                toString() {
                    return (
                        "SafeValue must use [property]=binding: " +
                        this.changingThisBreaksApplicationSecurity +
                        " (see https://g.co/ng/security#xss)"
                    );
                }
            }
            function gr(t) {
                return t instanceof fr
                    ? t.changingThisBreaksApplicationSecurity
                    : t;
            }
            const mr =
                    /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi,
                yr =
                    /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
            var vr = (function (t) {
                return (
                    (t[(t.NONE = 0)] = "NONE"),
                    (t[(t.HTML = 1)] = "HTML"),
                    (t[(t.STYLE = 2)] = "STYLE"),
                    (t[(t.SCRIPT = 3)] = "SCRIPT"),
                    (t[(t.URL = 4)] = "URL"),
                    (t[(t.RESOURCE_URL = 5)] = "RESOURCE_URL"),
                    t
                );
            })({});
            function _r(t) {
                const e = (function () {
                    const t = Oe();
                    return t && t[12];
                })();
                return e
                    ? e.sanitize(vr.URL, t) || ""
                    : (function (t, e) {
                          const n = (function (t) {
                              return (
                                  (t instanceof fr && t.getTypeName()) || null
                              );
                          })(t);
                          if (null != n && n !== e) {
                              if ("ResourceURL" === n && "URL" === e) return !0;
                              throw new Error(
                                  `Required a safe ${e}, got a ${n} (see https://g.co/ng/security#xss)`
                              );
                          }
                          return n === e;
                      })(t, "URL")
                    ? gr(t)
                    : ((n = ne(t)),
                      (n = String(n)).match(mr) || n.match(yr)
                          ? n
                          : "unsafe:" + n);
                var n;
            }
            function br(t) {
                return t.ngDebugContext;
            }
            function wr(t) {
                return t.ngOriginalError;
            }
            function Cr(t, ...e) {
                t.error(...e);
            }
            class Sr {
                constructor() {
                    this._console = console;
                }
                handleError(t) {
                    const e = this._findOriginalError(t),
                        n = this._findContext(t),
                        r = (function (t) {
                            return t.ngErrorLogger || Cr;
                        })(t);
                    r(this._console, "ERROR", t),
                        e && r(this._console, "ORIGINAL ERROR", e),
                        n && r(this._console, "ERROR CONTEXT", n);
                }
                _findContext(t) {
                    return t
                        ? br(t)
                            ? br(t)
                            : this._findContext(wr(t))
                        : null;
                }
                _findOriginalError(t) {
                    let e = wr(t);
                    for (; e && wr(e); ) e = wr(e);
                    return e;
                }
            }
            function xr(t, e) {
                t.__ngContext__ = e;
            }
            const Er = (() =>
                (
                    ("undefined" != typeof requestAnimationFrame &&
                        requestAnimationFrame) ||
                    setTimeout
                ).bind(Tt))();
            function Tr(t) {
                return t instanceof Function ? t() : t;
            }
            var kr = (function (t) {
                return (
                    (t[(t.Important = 1)] = "Important"),
                    (t[(t.DashCase = 2)] = "DashCase"),
                    t
                );
            })({});
            function Or(t, e) {
                return (void 0)(t, e);
            }
            function Ar(t) {
                const e = t[3];
                return Qt(e) ? e[3] : e;
            }
            function Dr(t) {
                return Rr(t[13]);
            }
            function Ir(t) {
                return Rr(t[4]);
            }
            function Rr(t) {
                for (; null !== t && !Qt(t); ) t = t[4];
                return t;
            }
            function Pr(t, e, n, r, s) {
                if (null != r) {
                    let i,
                        o = !1;
                    Qt(r) ? (i = r) : Gt(r) && ((o = !0), (r = r[0]));
                    const a = fe(r);
                    0 === t && null !== n
                        ? null == s
                            ? Fr(e, n, a)
                            : Lr(e, n, a, s || null, !0)
                        : 1 === t && null !== n
                        ? Lr(e, n, a, s || null, !0)
                        : 2 === t
                        ? (function (t, e, n) {
                              const r = zr(t, e);
                              r &&
                                  (function (t, e, n, r) {
                                      de(t)
                                          ? t.removeChild(e, n, r)
                                          : e.removeChild(n);
                                  })(t, r, e, n);
                          })(e, a, o)
                        : 3 === t && e.destroyNode(a),
                        null != i &&
                            (function (t, e, n, r, s) {
                                const i = n[7];
                                i !== fe(n) && Pr(e, t, r, i, s);
                                for (let o = Zt; o < n.length; o++) {
                                    const s = n[o];
                                    Zr(s[1], s, t, e, r, i);
                                }
                            })(e, t, i, n, s);
                }
            }
            function Vr(t, e, n) {
                return de(t)
                    ? t.createElement(e, n)
                    : null === n
                    ? t.createElement(e)
                    : t.createElementNS(n, e);
            }
            function jr(t, e) {
                const n = t[9],
                    r = n.indexOf(e),
                    s = e[3];
                1024 & e[2] && ((e[2] &= -1025), Ee(s, -1)), n.splice(r, 1);
            }
            function Mr(t, e) {
                if (t.length <= Zt) return;
                const n = Zt + e,
                    r = t[n];
                if (r) {
                    const i = r[17];
                    null !== i && i !== t && jr(i, r),
                        e > 0 && (t[n - 1][4] = r[4]);
                    const o = Kn(t, Zt + e);
                    Zr(r[1], (s = r), s[11], 2, null, null),
                        (s[0] = null),
                        (s[6] = null);
                    const a = o[19];
                    null !== a && a.detachView(o[1]),
                        (r[3] = null),
                        (r[4] = null),
                        (r[2] &= -129);
                }
                var s;
                return r;
            }
            function Nr(t, e) {
                if (!(256 & e[2])) {
                    const n = e[11];
                    de(n) && n.destroyNode && Zr(t, e, n, 3, null, null),
                        (function (t) {
                            let e = t[13];
                            if (!e) return Ur(t[1], t);
                            for (; e; ) {
                                let n = null;
                                if (Gt(e)) n = e[13];
                                else {
                                    const t = e[10];
                                    t && (n = t);
                                }
                                if (!n) {
                                    for (; e && !e[4] && e !== t; )
                                        Gt(e) && Ur(e[1], e), (e = e[3]);
                                    null === e && (e = t),
                                        Gt(e) && Ur(e[1], e),
                                        (n = e && e[4]);
                                }
                                e = n;
                            }
                        })(e);
                }
            }
            function Ur(t, e) {
                if (!(256 & e[2])) {
                    (e[2] &= -129),
                        (e[2] |= 256),
                        (function (t, e) {
                            let n;
                            if (null != t && null != (n = t.destroyHooks))
                                for (let r = 0; r < n.length; r += 2) {
                                    const t = e[n[r]];
                                    if (!(t instanceof ln)) {
                                        const e = n[r + 1];
                                        if (Array.isArray(e))
                                            for (
                                                let n = 0;
                                                n < e.length;
                                                n += 2
                                            )
                                                e[n + 1].call(t[e[n]]);
                                        else e.call(t);
                                    }
                                }
                        })(t, e),
                        (function (t, e) {
                            const n = t.cleanup,
                                r = e[7];
                            let s = -1;
                            if (null !== n)
                                for (let i = 0; i < n.length - 1; i += 2)
                                    if ("string" == typeof n[i]) {
                                        const t = n[i + 1],
                                            o =
                                                "function" == typeof t
                                                    ? t(e)
                                                    : fe(e[t]),
                                            a = r[(s = n[i + 2])],
                                            l = n[i + 3];
                                        "boolean" == typeof l
                                            ? o.removeEventListener(n[i], a, l)
                                            : l >= 0
                                            ? r[(s = l)]()
                                            : r[(s = -l)].unsubscribe(),
                                            (i += 2);
                                    } else {
                                        const t = r[(s = n[i + 1])];
                                        n[i].call(t);
                                    }
                            if (null !== r) {
                                for (let t = s + 1; t < r.length; t++)
                                    (0, r[t])();
                                e[7] = null;
                            }
                        })(t, e),
                        1 === e[1].type && de(e[11]) && e[11].destroy();
                    const n = e[17];
                    if (null !== n && Qt(e[3])) {
                        n !== e[3] && jr(n, e);
                        const r = e[19];
                        null !== r && r.detachView(t);
                    }
                }
            }
            function Lr(t, e, n, r, s) {
                de(t) ? t.insertBefore(e, n, r, s) : e.insertBefore(n, r, s);
            }
            function Fr(t, e, n) {
                de(t) ? t.appendChild(e, n) : e.appendChild(n);
            }
            function Hr(t, e, n, r, s) {
                null !== r ? Lr(t, e, n, r, s) : Fr(t, e, n);
            }
            function zr(t, e) {
                return de(t) ? t.parentNode(e) : e.parentNode;
            }
            function $r(t, e, n, r) {
                const s = (function (t, e, n) {
                        return (function (t, e, n) {
                            let r = e;
                            for (; null !== r && 40 & r.type; )
                                r = (e = r).parent;
                            if (null === r) return n[0];
                            if (2 & r.flags) {
                                const e =
                                    t.data[r.directiveStart].encapsulation;
                                if (e === wt.None || e === wt.Emulated)
                                    return null;
                            }
                            return me(r, n);
                        })(t, e.parent, n);
                    })(t, r, e),
                    i = e[11],
                    o = (function (t, e, n) {
                        return (function (t, e, n) {
                            return 40 & t.type ? me(t, n) : null;
                        })(t, 0, n);
                    })(r.parent || e[6], 0, e);
                if (null != s)
                    if (Array.isArray(n))
                        for (let a = 0; a < n.length; a++)
                            Hr(i, s, n[a], o, !1);
                    else Hr(i, s, n, o, !1);
            }
            function qr(t, e) {
                if (null !== e) {
                    const n = e.type;
                    if (3 & n) return me(e, t);
                    if (4 & n) return Br(-1, t[e.index]);
                    if (8 & n) {
                        const n = e.child;
                        if (null !== n) return qr(t, n);
                        {
                            const n = t[e.index];
                            return Qt(n) ? Br(-1, n) : fe(n);
                        }
                    }
                    if (32 & n) return Or(e, t)() || fe(t[e.index]);
                    {
                        const n = t[16],
                            r = n[6],
                            s = Ar(n),
                            i = r.projection[e.projection];
                        return null != i ? qr(s, i) : qr(t, e.next);
                    }
                }
                return null;
            }
            function Br(t, e) {
                const n = Zt + t + 1;
                if (n < e.length) {
                    const t = e[n],
                        r = t[1].firstChild;
                    if (null !== r) return qr(t, r);
                }
                return e[7];
            }
            function Wr(t, e, n, r, s, i, o) {
                for (; null != n; ) {
                    const a = r[n.index],
                        l = n.type;
                    if (
                        (o && 0 === e && (a && xr(fe(a), r), (n.flags |= 4)),
                        64 != (64 & n.flags))
                    )
                        if (8 & l)
                            Wr(t, e, n.child, r, s, i, !1), Pr(e, t, s, a, i);
                        else if (32 & l) {
                            const o = Or(n, r);
                            let l;
                            for (; (l = o()); ) Pr(e, t, s, l, i);
                            Pr(e, t, s, a, i);
                        } else
                            16 & l ? Gr(t, e, r, n, s, i) : Pr(e, t, s, a, i);
                    n = o ? n.projectionNext : n.next;
                }
            }
            function Zr(t, e, n, r, s, i) {
                Wr(n, r, t.firstChild, e, s, i, !1);
            }
            function Gr(t, e, n, r, s, i) {
                const o = n[16],
                    a = o[6].projection[r.projection];
                if (Array.isArray(a))
                    for (let l = 0; l < a.length; l++) Pr(e, t, s, a[l], i);
                else Wr(t, e, a, o[3], s, i, !0);
            }
            function Qr(t, e, n) {
                de(t) ? t.setAttribute(e, "style", n) : (e.style.cssText = n);
            }
            function Kr(t, e, n) {
                de(t)
                    ? "" === n
                        ? t.removeAttribute(e, "class")
                        : t.setAttribute(e, "class", n)
                    : (e.className = n);
            }
            function Jr(t, e, n) {
                let r = t.length;
                for (;;) {
                    const s = t.indexOf(e, n);
                    if (-1 === s) return s;
                    if (0 === s || t.charCodeAt(s - 1) <= 32) {
                        const n = e.length;
                        if (s + n === r || t.charCodeAt(s + n) <= 32) return s;
                    }
                    n = s + 1;
                }
            }
            const Yr = "ng-template";
            function Xr(t, e, n) {
                let r = 0;
                for (; r < t.length; ) {
                    let s = t[r++];
                    if (n && "class" === s) {
                        if (((s = t[r]), -1 !== Jr(s.toLowerCase(), e, 0)))
                            return !0;
                    } else if (1 === s) {
                        for (
                            ;
                            r < t.length && "string" == typeof (s = t[r++]);

                        )
                            if (s.toLowerCase() === e) return !0;
                        return !1;
                    }
                }
                return !1;
            }
            function ts(t) {
                return 4 === t.type && t.value !== Yr;
            }
            function es(t, e, n) {
                return e === (4 !== t.type || n ? t.value : Yr);
            }
            function ns(t, e, n) {
                let r = 4;
                const s = t.attrs || [],
                    i = (function (t) {
                        for (let e = 0; e < t.length; e++)
                            if (un(t[e])) return e;
                        return t.length;
                    })(s);
                let o = !1;
                for (let a = 0; a < e.length; a++) {
                    const l = e[a];
                    if ("number" != typeof l) {
                        if (!o)
                            if (4 & r) {
                                if (
                                    ((r = 2 | (1 & r)),
                                    ("" !== l && !es(t, l, n)) ||
                                        ("" === l && 1 === e.length))
                                ) {
                                    if (rs(r)) return !1;
                                    o = !0;
                                }
                            } else {
                                const c = 8 & r ? l : e[++a];
                                if (8 & r && null !== t.attrs) {
                                    if (!Xr(t.attrs, c, n)) {
                                        if (rs(r)) return !1;
                                        o = !0;
                                    }
                                    continue;
                                }
                                const u = ss(8 & r ? "class" : l, s, ts(t), n);
                                if (-1 === u) {
                                    if (rs(r)) return !1;
                                    o = !0;
                                    continue;
                                }
                                if ("" !== c) {
                                    let t;
                                    t = u > i ? "" : s[u + 1].toLowerCase();
                                    const e = 8 & r ? t : null;
                                    if (
                                        (e && -1 !== Jr(e, c, 0)) ||
                                        (2 & r && c !== t)
                                    ) {
                                        if (rs(r)) return !1;
                                        o = !0;
                                    }
                                }
                            }
                    } else {
                        if (!o && !rs(r) && !rs(l)) return !1;
                        if (o && rs(l)) continue;
                        (o = !1), (r = l | (1 & r));
                    }
                }
                return rs(r) || o;
            }
            function rs(t) {
                return 0 == (1 & t);
            }
            function ss(t, e, n, r) {
                if (null === e) return -1;
                let s = 0;
                if (r || !n) {
                    let n = !1;
                    for (; s < e.length; ) {
                        const r = e[s];
                        if (r === t) return s;
                        if (3 === r || 6 === r) n = !0;
                        else {
                            if (1 === r || 2 === r) {
                                let t = e[++s];
                                for (; "string" == typeof t; ) t = e[++s];
                                continue;
                            }
                            if (4 === r) break;
                            if (0 === r) {
                                s += 4;
                                continue;
                            }
                        }
                        s += n ? 1 : 2;
                    }
                    return -1;
                }
                return (function (t, e) {
                    let n = t.indexOf(4);
                    if (n > -1)
                        for (n++; n < t.length; ) {
                            const r = t[n];
                            if ("number" == typeof r) return -1;
                            if (r === e) return n;
                            n++;
                        }
                    return -1;
                })(e, t);
            }
            function is(t, e, n = !1) {
                for (let r = 0; r < e.length; r++)
                    if (ns(t, e[r], n)) return !0;
                return !1;
            }
            function os(t, e) {
                return t ? ":not(" + e.trim() + ")" : e;
            }
            function as(t) {
                let e = t[0],
                    n = 1,
                    r = 2,
                    s = "",
                    i = !1;
                for (; n < t.length; ) {
                    let o = t[n];
                    if ("string" == typeof o)
                        if (2 & r) {
                            const e = t[++n];
                            s +=
                                "[" +
                                o +
                                (e.length > 0 ? '="' + e + '"' : "") +
                                "]";
                        } else 8 & r ? (s += "." + o) : 4 & r && (s += " " + o);
                    else
                        "" === s || rs(o) || ((e += os(i, s)), (s = "")),
                            (r = o),
                            (i = i || !rs(r));
                    n++;
                }
                return "" !== s && (e += os(i, s)), e;
            }
            const ls = {};
            function cs(t) {
                us(Ae(), Oe(), Je() + t, je());
            }
            function us(t, e, n, r) {
                if (!r)
                    if (3 == (3 & e[2])) {
                        const r = t.preOrderCheckHooks;
                        null !== r && en(e, r, n);
                    } else {
                        const r = t.preOrderHooks;
                        null !== r && nn(e, r, 0, n);
                    }
                Ye(n);
            }
            function hs(t, e) {
                return (t << 17) | (e << 2);
            }
            function ds(t) {
                return (t >> 17) & 32767;
            }
            function ps(t) {
                return 2 | t;
            }
            function fs(t) {
                return (131068 & t) >> 2;
            }
            function gs(t, e) {
                return (-131069 & t) | (e << 2);
            }
            function ms(t) {
                return 1 | t;
            }
            function ys(t, e) {
                const n = t.contentQueries;
                if (null !== n)
                    for (let r = 0; r < n.length; r += 2) {
                        const s = n[r],
                            i = n[r + 1];
                        if (-1 !== i) {
                            const n = t.data[i];
                            ze(s), n.contentQueries(2, e[i], i);
                        }
                    }
            }
            function vs(t, e, n, r, s, i, o, a, l, c) {
                const u = e.blueprint.slice();
                return (
                    (u[0] = s),
                    (u[2] = 140 | r),
                    xe(u),
                    (u[3] = u[15] = t),
                    (u[8] = n),
                    (u[10] = o || (t && t[10])),
                    (u[11] = a || (t && t[11])),
                    (u[12] = l || (t && t[12]) || null),
                    (u[9] = c || (t && t[9]) || null),
                    (u[6] = i),
                    (u[16] = 2 == e.type ? t[16] : u),
                    u
                );
            }
            function _s(t, e, n, r, s) {
                let i = t.data[e];
                if (null === i)
                    (i = (function (t, e, n, r, s) {
                        const i = Re(),
                            o = Ve(),
                            a = (t.data[e] = (function (t, e, n, r, s, i) {
                                return {
                                    type: n,
                                    index: r,
                                    insertBeforeIndex: null,
                                    injectorIndex: e ? e.injectorIndex : -1,
                                    directiveStart: -1,
                                    directiveEnd: -1,
                                    directiveStylingLast: -1,
                                    propertyBindings: null,
                                    flags: 0,
                                    providerIndexes: 0,
                                    value: s,
                                    attrs: i,
                                    mergedAttrs: null,
                                    localNames: null,
                                    initialInputs: void 0,
                                    inputs: null,
                                    outputs: null,
                                    tViews: null,
                                    next: null,
                                    projectionNext: null,
                                    child: null,
                                    parent: e,
                                    projection: null,
                                    styles: null,
                                    stylesWithoutHost: null,
                                    residualStyles: void 0,
                                    classes: null,
                                    classesWithoutHost: null,
                                    residualClasses: void 0,
                                    classBindings: 0,
                                    styleBindings: 0,
                                };
                            })(0, o ? i : i && i.parent, n, e, r, s));
                        return (
                            null === t.firstChild && (t.firstChild = a),
                            null !== i &&
                                (o
                                    ? null == i.child &&
                                      null !== a.parent &&
                                      (i.child = a)
                                    : null === i.next && (i.next = a)),
                            a
                        );
                    })(t, e, n, r, s)),
                        Te.lFrame.inI18n && (i.flags |= 64);
                else if (64 & i.type) {
                    (i.type = n), (i.value = r), (i.attrs = s);
                    const t = (function () {
                        const t = Te.lFrame,
                            e = t.currentTNode;
                        return t.isParent ? e : e.parent;
                    })();
                    i.injectorIndex = null === t ? -1 : t.injectorIndex;
                }
                return Pe(i, !0), i;
            }
            function bs(t, e, n, r) {
                if (0 === n) return -1;
                const s = e.length;
                for (let i = 0; i < n; i++)
                    e.push(r), t.blueprint.push(r), t.data.push(null);
                return s;
            }
            function ws(t, e, n) {
                Be(e);
                try {
                    const r = t.viewQuery;
                    null !== r && Ks(1, r, n);
                    const s = t.template;
                    null !== s && xs(t, e, s, 1, n),
                        t.firstCreatePass && (t.firstCreatePass = !1),
                        t.staticContentQueries && ys(t, e),
                        t.staticViewQueries && Ks(2, t.viewQuery, n);
                    const i = t.components;
                    null !== i &&
                        (function (t, e) {
                            for (let n = 0; n < e.length; n++) Bs(t, e[n]);
                        })(e, i);
                } catch (r) {
                    throw (
                        (t.firstCreatePass && (t.incompleteFirstPass = !0), r)
                    );
                } finally {
                    (e[2] &= -5), Ke();
                }
            }
            function Cs(t, e, n, r) {
                const s = e[2];
                if (256 == (256 & s)) return;
                Be(e);
                const i = je();
                try {
                    xe(e),
                        (Te.lFrame.bindingIndex = t.bindingStartIndex),
                        null !== n && xs(t, e, n, 2, r);
                    const o = 3 == (3 & s);
                    if (!i)
                        if (o) {
                            const n = t.preOrderCheckHooks;
                            null !== n && en(e, n, null);
                        } else {
                            const n = t.preOrderHooks;
                            null !== n && nn(e, n, 0, null), rn(e, 0);
                        }
                    if (
                        ((function (t) {
                            for (let e = Dr(t); null !== e; e = Ir(e)) {
                                if (!e[2]) continue;
                                const t = e[9];
                                for (let e = 0; e < t.length; e++) {
                                    const n = t[e],
                                        r = n[3];
                                    0 == (1024 & n[2]) && Ee(r, 1),
                                        (n[2] |= 1024);
                                }
                            }
                        })(e),
                        (function (t) {
                            for (let e = Dr(t); null !== e; e = Ir(e))
                                for (let t = Zt; t < e.length; t++) {
                                    const n = e[t],
                                        r = n[1];
                                    Ce(n) && Cs(r, n, r.template, n[8]);
                                }
                        })(e),
                        null !== t.contentQueries && ys(t, e),
                        !i)
                    )
                        if (o) {
                            const n = t.contentCheckHooks;
                            null !== n && en(e, n);
                        } else {
                            const n = t.contentHooks;
                            null !== n && nn(e, n, 1), rn(e, 1);
                        }
                    !(function (t, e) {
                        const n = t.hostBindingOpCodes;
                        if (null !== n)
                            try {
                                for (let t = 0; t < n.length; t++) {
                                    const r = n[t];
                                    if (r < 0) Ye(~r);
                                    else {
                                        const s = r,
                                            i = n[++t],
                                            o = n[++t];
                                        Le(i, s), o(2, e[s]);
                                    }
                                }
                            } finally {
                                Ye(-1);
                            }
                    })(t, e);
                    const a = t.components;
                    null !== a &&
                        (function (t, e) {
                            for (let n = 0; n < e.length; n++) $s(t, e[n]);
                        })(e, a);
                    const l = t.viewQuery;
                    if ((null !== l && Ks(2, l, r), !i))
                        if (o) {
                            const n = t.viewCheckHooks;
                            null !== n && en(e, n);
                        } else {
                            const n = t.viewHooks;
                            null !== n && nn(e, n, 2), rn(e, 2);
                        }
                    !0 === t.firstUpdatePass && (t.firstUpdatePass = !1),
                        i || (e[2] &= -73),
                        1024 & e[2] && ((e[2] &= -1025), Ee(e[3], -1));
                } finally {
                    Ke();
                }
            }
            function Ss(t, e, n, r) {
                const s = e[10],
                    i = !je(),
                    o = we(e);
                try {
                    i && !o && s.begin && s.begin(),
                        o && ws(t, e, r),
                        Cs(t, e, n, r);
                } finally {
                    i && !o && s.end && s.end();
                }
            }
            function xs(t, e, n, r, s) {
                const i = Je();
                try {
                    Ye(-1),
                        2 & r && e.length > Wt && us(t, e, Wt, je()),
                        n(r, s);
                } finally {
                    Ye(i);
                }
            }
            function Es(t, e, n) {
                ke() &&
                    ((function (t, e, n, r) {
                        const s = n.directiveStart,
                            i = n.directiveEnd;
                        t.firstCreatePass || bn(n, e), xr(r, e);
                        const o = n.initialInputs;
                        for (let a = s; a < i; a++) {
                            const r = t.data[a],
                                i = Xt(r);
                            i && Ls(e, n, r);
                            const l = Rn(e, t, a, n);
                            xr(l, e),
                                null !== o && Fs(0, a - s, l, r, 0, o),
                                i && (_e(n.index, e)[8] = l);
                        }
                    })(t, e, n, me(n, e)),
                    128 == (128 & n.flags) &&
                        (function (t, e, n) {
                            const r = n.directiveStart,
                                s = n.directiveEnd,
                                i = n.index,
                                o = Te.lFrame.currentDirectiveIndex;
                            try {
                                Ye(i);
                                for (let n = r; n < s; n++) {
                                    const r = t.data[n],
                                        s = e[n];
                                    Fe(n),
                                        (null === r.hostBindings &&
                                            0 === r.hostVars &&
                                            null === r.hostAttrs) ||
                                            Vs(r, s);
                                }
                            } finally {
                                Ye(-1), Fe(o);
                            }
                        })(t, e, n));
            }
            function Ts(t, e, n = me) {
                const r = e.localNames;
                if (null !== r) {
                    let s = e.index + 1;
                    for (let i = 0; i < r.length; i += 2) {
                        const o = r[i + 1],
                            a = -1 === o ? n(e, t) : t[o];
                        t[s++] = a;
                    }
                }
            }
            function ks(t) {
                const e = t.tView;
                return null === e || e.incompleteFirstPass
                    ? (t.tView = Os(
                          1,
                          null,
                          t.template,
                          t.decls,
                          t.vars,
                          t.directiveDefs,
                          t.pipeDefs,
                          t.viewQuery,
                          t.schemas,
                          t.consts
                      ))
                    : e;
            }
            function Os(t, e, n, r, s, i, o, a, l, c) {
                const u = Wt + r,
                    h = u + s,
                    d = (function (t, e) {
                        const n = [];
                        for (let r = 0; r < e; r++) n.push(r < t ? null : ls);
                        return n;
                    })(u, h),
                    p = "function" == typeof c ? c() : c;
                return (d[1] = {
                    type: t,
                    blueprint: d,
                    template: n,
                    queries: null,
                    viewQuery: a,
                    declTNode: e,
                    data: d.slice().fill(null, u),
                    bindingStartIndex: u,
                    expandoStartIndex: h,
                    hostBindingOpCodes: null,
                    firstCreatePass: !0,
                    firstUpdatePass: !0,
                    staticViewQueries: !1,
                    staticContentQueries: !1,
                    preOrderHooks: null,
                    preOrderCheckHooks: null,
                    contentHooks: null,
                    contentCheckHooks: null,
                    viewHooks: null,
                    viewCheckHooks: null,
                    destroyHooks: null,
                    cleanup: null,
                    contentQueries: null,
                    components: null,
                    directiveRegistry: "function" == typeof i ? i() : i,
                    pipeRegistry: "function" == typeof o ? o() : o,
                    firstChild: null,
                    schemas: l,
                    consts: p,
                    incompleteFirstPass: !1,
                });
            }
            function As(t, e, n, r) {
                const s = Ys(e);
                null === n
                    ? s.push(r)
                    : (s.push(n),
                      t.firstCreatePass && Xs(t).push(r, s.length - 1));
            }
            function Ds(t, e, n) {
                for (let r in t)
                    if (t.hasOwnProperty(r)) {
                        const s = t[r];
                        (n = null === n ? {} : n).hasOwnProperty(r)
                            ? n[r].push(e, s)
                            : (n[r] = [e, s]);
                    }
                return n;
            }
            function Is(t, e, n, r, s, i, o, a) {
                const l = me(e, n);
                let c,
                    u = e.inputs;
                var h;
                !a && null != u && (c = u[r])
                    ? (ei(t, n, c, r, s),
                      Jt(e) &&
                          (function (t, e) {
                              const n = _e(e, t);
                              16 & n[2] || (n[2] |= 64);
                          })(n, e.index))
                    : 3 & e.type &&
                      ((r =
                          "class" === (h = r)
                              ? "className"
                              : "for" === h
                              ? "htmlFor"
                              : "formaction" === h
                              ? "formAction"
                              : "innerHtml" === h
                              ? "innerHTML"
                              : "readonly" === h
                              ? "readOnly"
                              : "tabindex" === h
                              ? "tabIndex"
                              : h),
                      (s = null != o ? o(s, e.value || "", r) : s),
                      de(i)
                          ? i.setProperty(l, r, s)
                          : hn(r) ||
                            (l.setProperty ? l.setProperty(r, s) : (l[r] = s)));
            }
            function Rs(t, e, n, r) {
                let s = !1;
                if (ke()) {
                    const i = (function (t, e, n) {
                            const r = t.directiveRegistry;
                            let s = null;
                            if (r)
                                for (let i = 0; i < r.length; i++) {
                                    const o = r[i];
                                    is(n, o.selectors, !1) &&
                                        (s || (s = []),
                                        xn(bn(n, e), t, o.type),
                                        Xt(o)
                                            ? (js(t, n), s.unshift(o))
                                            : s.push(o));
                                }
                            return s;
                        })(t, e, n),
                        o = null === r ? null : { "": -1 };
                    if (null !== i) {
                        (s = !0), Ns(n, t.data.length, i.length);
                        for (let t = 0; t < i.length; t++) {
                            const e = i[t];
                            e.providersResolver && e.providersResolver(e);
                        }
                        let r = !1,
                            a = !1,
                            l = bs(t, e, i.length, null);
                        for (let s = 0; s < i.length; s++) {
                            const c = i[s];
                            (n.mergedAttrs = dn(n.mergedAttrs, c.hostAttrs)),
                                Us(t, n, e, l, c),
                                Ms(l, c, o),
                                null !== c.contentQueries && (n.flags |= 8),
                                (null === c.hostBindings &&
                                    null === c.hostAttrs &&
                                    0 === c.hostVars) ||
                                    (n.flags |= 128);
                            const u = c.type.prototype;
                            !r &&
                                (u.ngOnChanges || u.ngOnInit || u.ngDoCheck) &&
                                ((
                                    t.preOrderHooks || (t.preOrderHooks = [])
                                ).push(n.index),
                                (r = !0)),
                                a ||
                                    (!u.ngOnChanges && !u.ngDoCheck) ||
                                    ((
                                        t.preOrderCheckHooks ||
                                        (t.preOrderCheckHooks = [])
                                    ).push(n.index),
                                    (a = !0)),
                                l++;
                        }
                        !(function (t, e) {
                            const n = e.directiveEnd,
                                r = t.data,
                                s = e.attrs,
                                i = [];
                            let o = null,
                                a = null;
                            for (let l = e.directiveStart; l < n; l++) {
                                const t = r[l],
                                    n = t.inputs,
                                    c = null === s || ts(e) ? null : Hs(n, s);
                                i.push(c),
                                    (o = Ds(n, l, o)),
                                    (a = Ds(t.outputs, l, a));
                            }
                            null !== o &&
                                (o.hasOwnProperty("class") && (e.flags |= 16),
                                o.hasOwnProperty("style") && (e.flags |= 32)),
                                (e.initialInputs = i),
                                (e.inputs = o),
                                (e.outputs = a);
                        })(t, n);
                    }
                    o &&
                        (function (t, e, n) {
                            if (e) {
                                const r = (t.localNames = []);
                                for (let t = 0; t < e.length; t += 2) {
                                    const s = n[e[t + 1]];
                                    if (null == s)
                                        throw new ee(
                                            "301",
                                            `Export of name '${
                                                e[t + 1]
                                            }' not found!`
                                        );
                                    r.push(e[t], s);
                                }
                            }
                        })(n, r, o);
                }
                return (n.mergedAttrs = dn(n.mergedAttrs, n.attrs)), s;
            }
            function Ps(t, e, n, r, s, i) {
                const o = i.hostBindings;
                if (o) {
                    let n = t.hostBindingOpCodes;
                    null === n && (n = t.hostBindingOpCodes = []);
                    const i = ~e.index;
                    (function (t) {
                        let e = t.length;
                        for (; e > 0; ) {
                            const n = t[--e];
                            if ("number" == typeof n && n < 0) return n;
                        }
                        return 0;
                    })(n) != i && n.push(i),
                        n.push(r, s, o);
                }
            }
            function Vs(t, e) {
                null !== t.hostBindings && t.hostBindings(1, e);
            }
            function js(t, e) {
                (e.flags |= 2),
                    (t.components || (t.components = [])).push(e.index);
            }
            function Ms(t, e, n) {
                if (n) {
                    if (e.exportAs)
                        for (let r = 0; r < e.exportAs.length; r++)
                            n[e.exportAs[r]] = t;
                    Xt(e) && (n[""] = t);
                }
            }
            function Ns(t, e, n) {
                (t.flags |= 1),
                    (t.directiveStart = e),
                    (t.directiveEnd = e + n),
                    (t.providerIndexes = e);
            }
            function Us(t, e, n, r, s) {
                t.data[r] = s;
                const i = s.factory || (s.factory = te(s.type)),
                    o = new ln(i, Xt(s), null);
                (t.blueprint[r] = o),
                    (n[r] = o),
                    Ps(t, e, 0, r, bs(t, n, s.hostVars, ls), s);
            }
            function Ls(t, e, n) {
                const r = me(e, t),
                    s = ks(n),
                    i = t[10],
                    o = Ws(
                        t,
                        vs(
                            t,
                            s,
                            null,
                            n.onPush ? 64 : 16,
                            r,
                            e,
                            i,
                            i.createRenderer(r, n),
                            null,
                            null
                        )
                    );
                t[e.index] = o;
            }
            function Fs(t, e, n, r, s, i) {
                const o = i[e];
                if (null !== o) {
                    const t = r.setInput;
                    for (let e = 0; e < o.length; ) {
                        const s = o[e++],
                            i = o[e++],
                            a = o[e++];
                        null !== t ? r.setInput(n, a, s, i) : (n[i] = a);
                    }
                }
            }
            function Hs(t, e) {
                let n = null,
                    r = 0;
                for (; r < e.length; ) {
                    const s = e[r];
                    if (0 !== s)
                        if (5 !== s) {
                            if ("number" == typeof s) break;
                            t.hasOwnProperty(s) &&
                                (null === n && (n = []),
                                n.push(s, t[s], e[r + 1])),
                                (r += 2);
                        } else r += 2;
                    else r += 4;
                }
                return n;
            }
            function zs(t, e, n, r) {
                return new Array(t, !0, !1, e, null, 0, r, n, null, null);
            }
            function $s(t, e) {
                const n = _e(e, t);
                if (Ce(n)) {
                    const t = n[1];
                    80 & n[2] ? Cs(t, n, t.template, n[8]) : n[5] > 0 && qs(n);
                }
            }
            function qs(t) {
                for (let n = Dr(t); null !== n; n = Ir(n))
                    for (let t = Zt; t < n.length; t++) {
                        const e = n[t];
                        if (1024 & e[2]) {
                            const t = e[1];
                            Cs(t, e, t.template, e[8]);
                        } else e[5] > 0 && qs(e);
                    }
                const e = t[1].components;
                if (null !== e)
                    for (let n = 0; n < e.length; n++) {
                        const r = _e(e[n], t);
                        Ce(r) && r[5] > 0 && qs(r);
                    }
            }
            function Bs(t, e) {
                const n = _e(e, t),
                    r = n[1];
                !(function (t, e) {
                    for (let n = e.length; n < t.blueprint.length; n++)
                        e.push(t.blueprint[n]);
                })(r, n),
                    ws(r, n, n[8]);
            }
            function Ws(t, e) {
                return t[13] ? (t[14][4] = e) : (t[13] = e), (t[14] = e), e;
            }
            function Zs(t) {
                for (; t; ) {
                    t[2] |= 64;
                    const e = Ar(t);
                    if (0 != (512 & t[2]) && !e) return t;
                    t = e;
                }
                return null;
            }
            function Gs(t, e, n) {
                const r = e[10];
                r.begin && r.begin();
                try {
                    Cs(t, e, t.template, n);
                } catch (s) {
                    throw (ti(e, s), s);
                } finally {
                    r.end && r.end();
                }
            }
            function Qs(t) {
                !(function (t) {
                    for (let e = 0; e < t.components.length; e++) {
                        const n = t.components[e],
                            r = be(n),
                            s = r[1];
                        Ss(s, r, s.template, n);
                    }
                })(t[8]);
            }
            function Ks(t, e, n) {
                ze(0), e(t, n);
            }
            const Js = (() => Promise.resolve(null))();
            function Ys(t) {
                return t[7] || (t[7] = []);
            }
            function Xs(t) {
                return t.cleanup || (t.cleanup = []);
            }
            function ti(t, e) {
                const n = t[9],
                    r = n ? n.get(Sr, null) : null;
                r && r.handleError(e);
            }
            function ei(t, e, n, r, s) {
                for (let i = 0; i < n.length; ) {
                    const o = n[i++],
                        a = n[i++],
                        l = e[o],
                        c = t.data[o];
                    null !== c.setInput ? c.setInput(l, s, r, a) : (l[a] = s);
                }
            }
            function ni(t, e, n) {
                let r = n ? t.styles : null,
                    s = n ? t.classes : null,
                    i = 0;
                if (null !== e)
                    for (let o = 0; o < e.length; o++) {
                        const t = e[o];
                        "number" == typeof t
                            ? (i = t)
                            : 1 == i
                            ? (s = et(s, t))
                            : 2 == i && (r = et(r, t + ": " + e[++o] + ";"));
                    }
                n ? (t.styles = r) : (t.stylesWithoutHost = r),
                    n ? (t.classes = s) : (t.classesWithoutHost = s);
            }
            const ri = new qn("INJECTOR", -1);
            class si {
                get(t, e = ir) {
                    if (e === ir) {
                        const e = new Error(
                            `NullInjectorError: No provider for ${tt(t)}!`
                        );
                        throw ((e.name = "NullInjectorError"), e);
                    }
                    return e;
                }
            }
            const ii = new qn("Set Injector scope."),
                oi = {},
                ai = {},
                li = [];
            let ci = void 0;
            function ui() {
                return void 0 === ci && (ci = new si()), ci;
            }
            function hi(t, e = null, n = null, r) {
                return new di(t, n, e || ui(), r);
            }
            class di {
                constructor(t, e, n, r = null) {
                    (this.parent = n),
                        (this.records = new Map()),
                        (this.injectorDefTypes = new Set()),
                        (this.onDestroy = new Set()),
                        (this._destroyed = !1);
                    const s = [];
                    e && Gn(e, (n) => this.processProvider(n, t, e)),
                        Gn([t], (t) => this.processInjectorType(t, [], s)),
                        this.records.set(ri, gi(void 0, this));
                    const i = this.records.get(ii);
                    (this.scope = null != i ? i.value : null),
                        (this.source =
                            r || ("object" == typeof t ? null : tt(t)));
                }
                get destroyed() {
                    return this._destroyed;
                }
                destroy() {
                    this.assertNotDestroyed(), (this._destroyed = !0);
                    try {
                        this.onDestroy.forEach((t) => t.ngOnDestroy());
                    } finally {
                        this.records.clear(),
                            this.onDestroy.clear(),
                            this.injectorDefTypes.clear();
                    }
                }
                get(t, e = ir, n = gt.Default) {
                    this.assertNotDestroyed();
                    const r = ur(this);
                    try {
                        if (!(n & gt.SkipSelf)) {
                            let e = this.records.get(t);
                            if (void 0 === e) {
                                const n =
                                    ("function" == typeof (s = t) ||
                                        ("object" == typeof s &&
                                            s instanceof qn)) &&
                                    lt(t);
                                (e =
                                    n && this.injectableDefInScope(n)
                                        ? gi(pi(t), oi)
                                        : null),
                                    this.records.set(t, e);
                            }
                            if (null != e) return this.hydrate(t, e);
                        }
                        return (n & gt.Self ? ui() : this.parent).get(
                            t,
                            (e = n & gt.Optional && e === ir ? null : e)
                        );
                    } catch (i) {
                        if ("NullInjectorError" === i.name) {
                            if (
                                ((i.ngTempTokenPath =
                                    i.ngTempTokenPath || []).unshift(tt(t)),
                                r)
                            )
                                throw i;
                            return (function (t, e, n, r) {
                                const s = t.ngTempTokenPath;
                                throw (
                                    (e[ar] && s.unshift(e[ar]),
                                    (t.message = (function (t, e, n, r = null) {
                                        t =
                                            t &&
                                            "\n" === t.charAt(0) &&
                                            "\u0275" == t.charAt(1)
                                                ? t.substr(2)
                                                : t;
                                        let s = tt(e);
                                        if (Array.isArray(e))
                                            s = e.map(tt).join(" -> ");
                                        else if ("object" == typeof e) {
                                            let t = [];
                                            for (let n in e)
                                                if (e.hasOwnProperty(n)) {
                                                    let r = e[n];
                                                    t.push(
                                                        n +
                                                            ":" +
                                                            ("string" ==
                                                            typeof r
                                                                ? JSON.stringify(
                                                                      r
                                                                  )
                                                                : tt(r))
                                                    );
                                                }
                                            s = `{${t.join(", ")}}`;
                                        }
                                        return `${n}${
                                            r ? "(" + r + ")" : ""
                                        }[${s}]: ${t.replace(or, "\n  ")}`;
                                    })("\n" + t.message, s, n, r)),
                                    (t.ngTokenPath = s),
                                    (t.ngTempTokenPath = null),
                                    t)
                                );
                            })(i, t, "R3InjectorError", this.source);
                        }
                        throw i;
                    } finally {
                        ur(r);
                    }
                    var s;
                }
                _resolveInjectorDefTypes() {
                    this.injectorDefTypes.forEach((t) => this.get(t));
                }
                toString() {
                    const t = [];
                    return (
                        this.records.forEach((e, n) => t.push(tt(n))),
                        `R3Injector[${t.join(", ")}]`
                    );
                }
                assertNotDestroyed() {
                    if (this._destroyed)
                        throw new Error("Injector has already been destroyed.");
                }
                processInjectorType(t, e, n) {
                    if (!(t = st(t))) return !1;
                    let r = ut(t);
                    const s = (null == r && t.ngModule) || void 0,
                        i = void 0 === s ? t : s,
                        o = -1 !== n.indexOf(i);
                    if ((void 0 !== s && (r = ut(s)), null == r)) return !1;
                    if (null != r.imports && !o) {
                        let t;
                        n.push(i);
                        try {
                            Gn(r.imports, (r) => {
                                this.processInjectorType(r, e, n) &&
                                    (void 0 === t && (t = []), t.push(r));
                            });
                        } finally {
                        }
                        if (void 0 !== t)
                            for (let e = 0; e < t.length; e++) {
                                const { ngModule: n, providers: r } = t[e];
                                Gn(r, (t) =>
                                    this.processProvider(t, n, r || li)
                                );
                            }
                    }
                    this.injectorDefTypes.add(i),
                        this.records.set(i, gi(r.factory, oi));
                    const a = r.providers;
                    if (null != a && !o) {
                        const e = t;
                        Gn(a, (t) => this.processProvider(t, e, a));
                    }
                    return void 0 !== s && void 0 !== t.providers;
                }
                processProvider(t, e, n) {
                    let r = yi((t = st(t))) ? t : st(t && t.provide);
                    const s = (function (t, e, n) {
                        return mi(t) ? gi(void 0, t.useValue) : gi(fi(t), oi);
                    })(t);
                    if (yi(t) || !0 !== t.multi) this.records.get(r);
                    else {
                        let e = this.records.get(r);
                        e ||
                            ((e = gi(void 0, oi, !0)),
                            (e.factory = () => pr(e.multi)),
                            this.records.set(r, e)),
                            (r = t),
                            e.multi.push(t);
                    }
                    this.records.set(r, s);
                }
                hydrate(t, e) {
                    var n;
                    return (
                        e.value === oi &&
                            ((e.value = ai), (e.value = e.factory())),
                        "object" == typeof e.value &&
                            e.value &&
                            null !== (n = e.value) &&
                            "object" == typeof n &&
                            "function" == typeof n.ngOnDestroy &&
                            this.onDestroy.add(e.value),
                        e.value
                    );
                }
                injectableDefInScope(t) {
                    return (
                        !!t.providedIn &&
                        ("string" == typeof t.providedIn
                            ? "any" === t.providedIn ||
                              t.providedIn === this.scope
                            : this.injectorDefTypes.has(t.providedIn))
                    );
                }
            }
            function pi(t) {
                const e = lt(t),
                    n = null !== e ? e.factory : te(t);
                if (null !== n) return n;
                const r = ut(t);
                if (null !== r) return r.factory;
                if (t instanceof qn)
                    throw new Error(
                        `Token ${tt(t)} is missing a \u0275prov definition.`
                    );
                if (t instanceof Function)
                    return (function (t) {
                        const e = t.length;
                        if (e > 0) {
                            const n = (function (t, e) {
                                const n = [];
                                for (let r = 0; r < t; r++) n.push("?");
                                return n;
                            })(e);
                            throw new Error(
                                `Can't resolve all parameters for ${tt(
                                    t
                                )}: (${n.join(", ")}).`
                            );
                        }
                        const n = (function (t) {
                            const e = t && (t[ht] || t[pt]);
                            if (e) {
                                const n = (function (t) {
                                    if (t.hasOwnProperty("name")) return t.name;
                                    const e = ("" + t).match(
                                        /^function\s*([^\s(]+)/
                                    );
                                    return null === e ? "" : e[1];
                                })(t);
                                return (
                                    console.warn(
                                        `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
                                    ),
                                    e
                                );
                            }
                            return null;
                        })(t);
                        return null !== n ? () => n.factory(t) : () => new t();
                    })(t);
                throw new Error("unreachable");
            }
            function fi(t, e, n) {
                let r = void 0;
                if (yi(t)) {
                    const e = st(t);
                    return te(e) || pi(e);
                }
                if (mi(t)) r = () => st(t.useValue);
                else if ((s = t) && s.useFactory)
                    r = () => t.useFactory(...pr(t.deps || []));
                else if (
                    (function (t) {
                        return !(!t || !t.useExisting);
                    })(t)
                )
                    r = () => dr(st(t.useExisting));
                else {
                    const e = st(t && (t.useClass || t.provide));
                    if (
                        !(function (t) {
                            return !!t.deps;
                        })(t)
                    )
                        return te(e) || pi(e);
                    r = () => new e(...pr(t.deps));
                }
                var s;
                return r;
            }
            function gi(t, e, n = !1) {
                return { factory: t, value: e, multi: n ? [] : void 0 };
            }
            function mi(t) {
                return null !== t && "object" == typeof t && lr in t;
            }
            function yi(t) {
                return "function" == typeof t;
            }
            const vi = function (t, e, n) {
                return (function (t, e = null, n = null, r) {
                    const s = hi(t, e, n, r);
                    return s._resolveInjectorDefTypes(), s;
                })({ name: n }, e, t, n);
            };
            let _i = (() => {
                class t {
                    static create(t, e) {
                        return Array.isArray(t)
                            ? vi(t, e, "")
                            : vi(t.providers, t.parent, t.name || "");
                    }
                }
                return (
                    (t.THROW_IF_NOT_FOUND = ir),
                    (t.NULL = new si()),
                    (t.ɵprov = ot({
                        token: t,
                        providedIn: "any",
                        factory: () => dr(ri),
                    })),
                    (t.__NG_ELEMENT_ID__ = -1),
                    t
                );
            })();
            function bi(t, e) {
                tn(be(t)[1], Ie());
            }
            function wi(t) {
                let e = Object.getPrototypeOf(t.type.prototype).constructor,
                    n = !0;
                const r = [t];
                for (; e; ) {
                    let s = void 0;
                    if (Xt(t)) s = e.ɵcmp || e.ɵdir;
                    else {
                        if (e.ɵcmp)
                            throw new Error(
                                "Directives cannot inherit Components"
                            );
                        s = e.ɵdir;
                    }
                    if (s) {
                        if (n) {
                            r.push(s);
                            const e = t;
                            (e.inputs = Ci(t.inputs)),
                                (e.declaredInputs = Ci(t.declaredInputs)),
                                (e.outputs = Ci(t.outputs));
                            const n = s.hostBindings;
                            n && Ei(t, n);
                            const i = s.viewQuery,
                                o = s.contentQueries;
                            if (
                                (i && Si(t, i),
                                o && xi(t, o),
                                X(t.inputs, s.inputs),
                                X(t.declaredInputs, s.declaredInputs),
                                X(t.outputs, s.outputs),
                                Xt(s) && s.data.animation)
                            ) {
                                const e = t.data;
                                e.animation = (e.animation || []).concat(
                                    s.data.animation
                                );
                            }
                        }
                        const e = s.features;
                        if (e)
                            for (let r = 0; r < e.length; r++) {
                                const s = e[r];
                                s && s.ngInherit && s(t), s === wi && (n = !1);
                            }
                    }
                    e = Object.getPrototypeOf(e);
                }
                !(function (t) {
                    let e = 0,
                        n = null;
                    for (let r = t.length - 1; r >= 0; r--) {
                        const s = t[r];
                        (s.hostVars = e += s.hostVars),
                            (s.hostAttrs = dn(
                                s.hostAttrs,
                                (n = dn(n, s.hostAttrs))
                            ));
                    }
                })(r);
            }
            function Ci(t) {
                return t === kt ? {} : t === Ot ? [] : t;
            }
            function Si(t, e) {
                const n = t.viewQuery;
                t.viewQuery = n
                    ? (t, r) => {
                          e(t, r), n(t, r);
                      }
                    : e;
            }
            function xi(t, e) {
                const n = t.contentQueries;
                t.contentQueries = n
                    ? (t, r, s) => {
                          e(t, r, s), n(t, r, s);
                      }
                    : e;
            }
            function Ei(t, e) {
                const n = t.hostBindings;
                t.hostBindings = n
                    ? (t, r) => {
                          e(t, r), n(t, r);
                      }
                    : e;
            }
            let Ti = null;
            function ki() {
                if (!Ti) {
                    const t = Tt.Symbol;
                    if (t && t.iterator) Ti = t.iterator;
                    else {
                        const t = Object.getOwnPropertyNames(Map.prototype);
                        for (let e = 0; e < t.length; ++e) {
                            const n = t[e];
                            "entries" !== n &&
                                "size" !== n &&
                                Map.prototype[n] === Map.prototype.entries &&
                                (Ti = n);
                        }
                    }
                }
                return Ti;
            }
            class Oi {
                constructor(t) {
                    this.wrapped = t;
                }
                static wrap(t) {
                    return new Oi(t);
                }
                static unwrap(t) {
                    return Oi.isWrapped(t) ? t.wrapped : t;
                }
                static isWrapped(t) {
                    return t instanceof Oi;
                }
            }
            function Ai(t) {
                return (
                    !!Di(t) &&
                    (Array.isArray(t) || (!(t instanceof Map) && ki() in t))
                );
            }
            function Di(t) {
                return (
                    null !== t &&
                    ("function" == typeof t || "object" == typeof t)
                );
            }
            function Ii(t, e, n) {
                return (t[e] = n);
            }
            function Ri(t, e, n) {
                return !Object.is(t[e], n) && ((t[e] = n), !0);
            }
            function Pi(t, e, n, r) {
                const s = Oe();
                return (
                    Ri(s, Ue(), e) &&
                        (Ae(),
                        (function (t, e, n, r, s, i) {
                            const o = me(t, e);
                            !(function (t, e, n, r, s, i, o) {
                                if (null == i)
                                    de(t)
                                        ? t.removeAttribute(e, s, n)
                                        : e.removeAttribute(s);
                                else {
                                    const a =
                                        null == o ? ne(i) : o(i, r || "", s);
                                    de(t)
                                        ? t.setAttribute(e, s, a, n)
                                        : n
                                        ? e.setAttributeNS(n, s, a)
                                        : e.setAttribute(s, a);
                                }
                            })(e[11], o, i, t.value, n, r, s);
                        })(Xe(), s, t, e, n, r)),
                    Pi
                );
            }
            function Vi(t, e, n, r) {
                return Ri(t, Ue(), n) ? e + ne(n) + r : ls;
            }
            function ji(t, e, n, r, s, i, o, a) {
                const l = Oe(),
                    c = Ae(),
                    u = t + Wt,
                    h = c.firstCreatePass
                        ? (function (t, e, n, r, s, i, o, a, l) {
                              const c = e.consts,
                                  u = _s(e, t, 4, o || null, Se(c, a));
                              Rs(e, n, u, Se(c, l)), tn(e, u);
                              const h = (u.tViews = Os(
                                  2,
                                  u,
                                  r,
                                  s,
                                  i,
                                  e.directiveRegistry,
                                  e.pipeRegistry,
                                  null,
                                  e.schemas,
                                  c
                              ));
                              return (
                                  null !== e.queries &&
                                      (e.queries.template(e, u),
                                      (h.queries = e.queries.embeddedTView(u))),
                                  u
                              );
                          })(u, c, l, e, n, r, s, i, o)
                        : c.data[u];
                Pe(h, !1);
                const d = l[11].createComment("");
                $r(c, l, d, h),
                    xr(d, l),
                    Ws(l, (l[u] = zs(d, l, d, h))),
                    Yt(h) && Es(c, l, h),
                    null != o && Ts(l, h, a);
            }
            function Mi(t) {
                return ve(Te.lFrame.contextLView, Wt + t);
            }
            function Ni(t, e = gt.Default) {
                const n = Oe();
                return null === n ? dr(t, e) : kn(Ie(), n, st(t), e);
            }
            function Ui(t, e, n) {
                const r = Oe();
                return (
                    Ri(r, Ue(), e) && Is(Ae(), Xe(), r, t, e, r[11], n, !1), Ui
                );
            }
            function Li(t, e, n, r, s) {
                const i = s ? "class" : "style";
                ei(t, n, e.inputs[i], i, r);
            }
            function Fi(t, e, n, r) {
                const s = Oe(),
                    i = Ae(),
                    o = Wt + t,
                    a = s[11],
                    l = (s[o] = Vr(a, e, Te.lFrame.currentNamespace)),
                    c = i.firstCreatePass
                        ? (function (t, e, n, r, s, i, o) {
                              const a = e.consts,
                                  l = _s(e, t, 2, s, Se(a, i));
                              return (
                                  Rs(e, n, l, Se(a, o)),
                                  null !== l.attrs && ni(l, l.attrs, !1),
                                  null !== l.mergedAttrs &&
                                      ni(l, l.mergedAttrs, !0),
                                  null !== e.queries &&
                                      e.queries.elementStart(e, l),
                                  l
                              );
                          })(o, i, s, 0, e, n, r)
                        : i.data[o];
                Pe(c, !0);
                const u = c.mergedAttrs;
                null !== u && cn(a, l, u);
                const h = c.classes;
                null !== h && Kr(a, l, h);
                const d = c.styles;
                null !== d && Qr(a, l, d),
                    64 != (64 & c.flags) && $r(i, s, l, c),
                    0 === Te.lFrame.elementDepthCount && xr(l, s),
                    Te.lFrame.elementDepthCount++,
                    Yt(c) &&
                        (Es(i, s, c),
                        (function (t, e, n) {
                            if (Kt(e)) {
                                const r = e.directiveEnd;
                                for (let s = e.directiveStart; s < r; s++) {
                                    const e = t.data[s];
                                    e.contentQueries &&
                                        e.contentQueries(1, n[s], s);
                                }
                            }
                        })(i, c, s)),
                    null !== r && Ts(s, c);
            }
            function Hi() {
                let t = Ie();
                Ve() ? (Te.lFrame.isParent = !1) : ((t = t.parent), Pe(t, !1));
                const e = t;
                Te.lFrame.elementDepthCount--;
                const n = Ae();
                n.firstCreatePass &&
                    (tn(n, t), Kt(t) && n.queries.elementEnd(t)),
                    null != e.classesWithoutHost &&
                        (function (t) {
                            return 0 != (16 & t.flags);
                        })(e) &&
                        Li(n, e, Oe(), e.classesWithoutHost, !0),
                    null != e.stylesWithoutHost &&
                        (function (t) {
                            return 0 != (32 & t.flags);
                        })(e) &&
                        Li(n, e, Oe(), e.stylesWithoutHost, !1);
            }
            function zi(t, e, n, r) {
                Fi(t, e, n, r), Hi();
            }
            function $i() {
                return Oe();
            }
            function qi(t) {
                return !!t && "function" == typeof t.then;
            }
            function Bi(t) {
                return !!t && "function" == typeof t.subscribe;
            }
            function Wi(t, e, n = !1, r) {
                const s = Oe(),
                    i = Ae(),
                    o = Ie();
                return (
                    (function (t, e, n, r, s, i, o = !1, a) {
                        const l = Yt(r),
                            c = t.firstCreatePass && Xs(t),
                            u = Ys(e);
                        let h = !0;
                        if (3 & r.type) {
                            const d = me(r, e),
                                p = a ? a(d) : kt,
                                f = p.target || d,
                                g = u.length,
                                m = a
                                    ? (t) => a(fe(t[r.index])).target
                                    : r.index;
                            if (de(n)) {
                                let o = null;
                                if (
                                    (!a &&
                                        l &&
                                        (o = (function (t, e, n, r) {
                                            const s = t.cleanup;
                                            if (null != s)
                                                for (
                                                    let i = 0;
                                                    i < s.length - 1;
                                                    i += 2
                                                ) {
                                                    const t = s[i];
                                                    if (
                                                        t === n &&
                                                        s[i + 1] === r
                                                    ) {
                                                        const t = e[7],
                                                            n = s[i + 2];
                                                        return t.length > n
                                                            ? t[n]
                                                            : null;
                                                    }
                                                    "string" == typeof t &&
                                                        (i += 2);
                                                }
                                            return null;
                                        })(t, e, s, r.index)),
                                    null !== o)
                                )
                                    ((
                                        o.__ngLastListenerFn__ || o
                                    ).__ngNextListenerFn__ = i),
                                        (o.__ngLastListenerFn__ = i),
                                        (h = !1);
                                else {
                                    i = Gi(r, e, i, !1);
                                    const t = n.listen(p.name || f, s, i);
                                    u.push(i, t), c && c.push(s, m, g, g + 1);
                                }
                            } else
                                (i = Gi(r, e, i, !0)),
                                    f.addEventListener(s, i, o),
                                    u.push(i),
                                    c && c.push(s, m, g, o);
                        } else i = Gi(r, e, i, !1);
                        const d = r.outputs;
                        let p;
                        if (h && null !== d && (p = d[s])) {
                            const t = p.length;
                            if (t)
                                for (let n = 0; n < t; n += 2) {
                                    const t = e[p[n]][p[n + 1]].subscribe(i),
                                        o = u.length;
                                    u.push(i, t),
                                        c && c.push(s, r.index, o, -(o + 1));
                                }
                        }
                    })(i, s, s[11], o, t, e, n, r),
                    Wi
                );
            }
            function Zi(t, e, n) {
                try {
                    return !1 !== e(n);
                } catch (r) {
                    return ti(t, r), !1;
                }
            }
            function Gi(t, e, n, r) {
                return function s(i) {
                    if (i === Function) return n;
                    const o = 2 & t.flags ? _e(t.index, e) : e;
                    0 == (32 & e[2]) && Zs(o);
                    let a = Zi(e, n, i),
                        l = s.__ngNextListenerFn__;
                    for (; l; )
                        (a = Zi(e, l, i) && a), (l = l.__ngNextListenerFn__);
                    return (
                        r &&
                            !1 === a &&
                            (i.preventDefault(), (i.returnValue = !1)),
                        a
                    );
                };
            }
            function Qi(t = 1) {
                return (function (t) {
                    return (Te.lFrame.contextLView = (function (t, e) {
                        for (; t > 0; ) (e = e[15]), t--;
                        return e;
                    })(t, Te.lFrame.contextLView))[8];
                })(t);
            }
            function Ki(t, e, n) {
                return Ji(t, "", e, "", n), Ki;
            }
            function Ji(t, e, n, r, s) {
                const i = Oe(),
                    o = Vi(i, e, n, r);
                return o !== ls && Is(Ae(), Xe(), i, t, o, i[11], s, !1), Ji;
            }
            const Yi = [];
            function Xi(t, e, n, r, s) {
                const i = t[n + 1],
                    o = null === e;
                let a = r ? ds(i) : fs(i),
                    l = !1;
                for (; 0 !== a && (!1 === l || o); ) {
                    const n = t[a + 1];
                    to(t[a], e) && ((l = !0), (t[a + 1] = r ? ms(n) : ps(n))),
                        (a = r ? ds(n) : fs(n));
                }
                l && (t[n + 1] = r ? ps(i) : ms(i));
            }
            function to(t, e) {
                return (
                    null === t ||
                    null == e ||
                    (Array.isArray(t) ? t[1] : t) === e ||
                    (!(!Array.isArray(t) || "string" != typeof e) &&
                        Xn(t, e) >= 0)
                );
            }
            function eo(t, e) {
                return (
                    (function (t, e, n, r) {
                        const s = Oe(),
                            i = Ae(),
                            o = (function (t) {
                                const e = Te.lFrame,
                                    n = e.bindingIndex;
                                return (e.bindingIndex = e.bindingIndex + 2), n;
                            })();
                        i.firstUpdatePass &&
                            (function (t, e, n, r) {
                                const s = t.data;
                                if (null === s[n + 1]) {
                                    const i = s[Je()],
                                        o = (function (t, e) {
                                            return e >= t.expandoStartIndex;
                                        })(t, n);
                                    (function (t, e) {
                                        return 0 != (16 & t.flags);
                                    })(i) &&
                                        null === e &&
                                        !o &&
                                        (e = !1),
                                        (e = (function (t, e, n, r) {
                                            const s = (function (t) {
                                                const e =
                                                    Te.lFrame
                                                        .currentDirectiveIndex;
                                                return -1 === e ? null : t[e];
                                            })(t);
                                            let i = e.residualClasses;
                                            if (null === s)
                                                0 === e.classBindings &&
                                                    ((n = ro(
                                                        (n = no(
                                                            null,
                                                            t,
                                                            e,
                                                            n,
                                                            r
                                                        )),
                                                        e.attrs,
                                                        r
                                                    )),
                                                    (i = null));
                                            else {
                                                const o =
                                                    e.directiveStylingLast;
                                                if (-1 === o || t[o] !== s)
                                                    if (
                                                        ((n = no(
                                                            s,
                                                            t,
                                                            e,
                                                            n,
                                                            r
                                                        )),
                                                        null === i)
                                                    ) {
                                                        let n = (function (
                                                            t,
                                                            e,
                                                            n
                                                        ) {
                                                            const r =
                                                                e.classBindings;
                                                            if (0 !== fs(r))
                                                                return t[ds(r)];
                                                        })(t, e);
                                                        void 0 !== n &&
                                                            Array.isArray(n) &&
                                                            ((n = no(
                                                                null,
                                                                t,
                                                                e,
                                                                n[1],
                                                                r
                                                            )),
                                                            (n = ro(
                                                                n,
                                                                e.attrs,
                                                                r
                                                            )),
                                                            (function (
                                                                t,
                                                                e,
                                                                n,
                                                                r
                                                            ) {
                                                                t[
                                                                    ds(
                                                                        e.classBindings
                                                                    )
                                                                ] = r;
                                                            })(t, e, 0, n));
                                                    } else
                                                        i = (function (
                                                            t,
                                                            e,
                                                            n
                                                        ) {
                                                            let r = void 0;
                                                            const s =
                                                                e.directiveEnd;
                                                            for (
                                                                let i =
                                                                    1 +
                                                                    e.directiveStylingLast;
                                                                i < s;
                                                                i++
                                                            )
                                                                r = ro(
                                                                    r,
                                                                    t[i]
                                                                        .hostAttrs,
                                                                    true
                                                                );
                                                            return ro(
                                                                r,
                                                                e.attrs,
                                                                true
                                                            );
                                                        })(t, e);
                                            }
                                            return (
                                                void 0 !== i &&
                                                    (e.residualClasses = i),
                                                n
                                            );
                                        })(s, i, e, r)),
                                        (function (t, e, n, r, s, i) {
                                            let o = e.classBindings,
                                                a = ds(o),
                                                l = fs(o);
                                            t[r] = n;
                                            let c,
                                                u = !1;
                                            if (Array.isArray(n)) {
                                                const t = n;
                                                (c = t[1]),
                                                    (null === c ||
                                                        Xn(t, c) > 0) &&
                                                        (u = !0);
                                            } else c = n;
                                            if (s)
                                                if (0 !== l) {
                                                    const e = ds(t[a + 1]);
                                                    (t[r + 1] = hs(e, a)),
                                                        0 !== e &&
                                                            (t[e + 1] = gs(
                                                                t[e + 1],
                                                                r
                                                            )),
                                                        (t[a + 1] =
                                                            (131071 &
                                                                t[a + 1]) |
                                                            (r << 17));
                                                } else
                                                    (t[r + 1] = hs(a, 0)),
                                                        0 !== a &&
                                                            (t[a + 1] = gs(
                                                                t[a + 1],
                                                                r
                                                            )),
                                                        (a = r);
                                            else
                                                (t[r + 1] = hs(l, 0)),
                                                    0 === a
                                                        ? (a = r)
                                                        : (t[l + 1] = gs(
                                                              t[l + 1],
                                                              r
                                                          )),
                                                    (l = r);
                                            u && (t[r + 1] = ps(t[r + 1])),
                                                Xi(t, c, r, !0),
                                                Xi(t, c, r, !1),
                                                (function (t, e, n, r, s) {
                                                    const i = t.residualClasses;
                                                    null != i &&
                                                        "string" == typeof e &&
                                                        Xn(i, e) >= 0 &&
                                                        (n[r + 1] = ms(
                                                            n[r + 1]
                                                        ));
                                                })(e, c, t, r),
                                                (o = hs(a, l)),
                                                (e.classBindings = o);
                                        })(s, i, e, n, o);
                                }
                            })(i, t, o, true),
                            e !== ls &&
                                Ri(s, o, e) &&
                                (function (t, e, n, r, s, i, o, a) {
                                    if (!(3 & e.type)) return;
                                    const l = t.data,
                                        c = l[a + 1];
                                    io(
                                        1 == (1 & c)
                                            ? so(l, e, n, s, fs(c), o)
                                            : void 0
                                    ) ||
                                        (io(i) ||
                                            ((function (t) {
                                                return 2 == (2 & t);
                                            })(c) &&
                                                (i = so(l, null, n, s, a, o))),
                                        (function (t, e, n, r, s) {
                                            const i = de(t);
                                            s
                                                ? i
                                                    ? t.addClass(n, r)
                                                    : n.classList.add(r)
                                                : i
                                                ? t.removeClass(n, r)
                                                : n.classList.remove(r);
                                        })(r, 0, ge(Je(), n), s, i));
                                })(
                                    i,
                                    i.data[Je()],
                                    s,
                                    s[11],
                                    t,
                                    (s[o + 1] = (function (t, e) {
                                        return (
                                            null == t ||
                                                ("object" == typeof t &&
                                                    (t = tt(gr(t)))),
                                            t
                                        );
                                    })(e)),
                                    true,
                                    o
                                );
                    })(t, e),
                    eo
                );
            }
            function no(t, e, n, r, s) {
                let i = null;
                const o = n.directiveEnd;
                let a = n.directiveStylingLast;
                for (
                    -1 === a ? (a = n.directiveStart) : a++;
                    a < o && ((i = e[a]), (r = ro(r, i.hostAttrs, s)), i !== t);

                )
                    a++;
                return null !== t && (n.directiveStylingLast = a), r;
            }
            function ro(t, e, n) {
                const r = n ? 1 : 2;
                let s = -1;
                if (null !== e)
                    for (let i = 0; i < e.length; i++) {
                        const o = e[i];
                        "number" == typeof o
                            ? (s = o)
                            : s === r &&
                              (Array.isArray(t) ||
                                  (t = void 0 === t ? [] : ["", t]),
                              Jn(t, o, !!n || e[++i]));
                    }
                return void 0 === t ? null : t;
            }
            function so(t, e, n, r, s, i) {
                const o = null === e;
                let a = void 0;
                for (; s > 0; ) {
                    const e = t[s],
                        i = Array.isArray(e),
                        l = i ? e[1] : e,
                        c = null === l;
                    let u = n[s + 1];
                    u === ls && (u = c ? Yi : void 0);
                    let h = c ? Yn(u, r) : l === r ? u : void 0;
                    if ((i && !io(h) && (h = Yn(e, r)), io(h) && ((a = h), o)))
                        return a;
                    const d = t[s + 1];
                    s = o ? ds(d) : fs(d);
                }
                if (null !== e) {
                    let t = i ? e.residualClasses : e.residualStyles;
                    null != t && (a = Yn(t, r));
                }
                return a;
            }
            function io(t) {
                return void 0 !== t;
            }
            function oo(t, e = "") {
                const n = Oe(),
                    r = Ae(),
                    s = t + Wt,
                    i = r.firstCreatePass ? _s(r, s, 1, e, null) : r.data[s],
                    o = (n[s] = (function (t, e) {
                        return de(t) ? t.createText(e) : t.createTextNode(e);
                    })(n[11], e));
                $r(r, n, o, i), Pe(i, !1);
            }
            function ao(t) {
                return lo("", t, ""), ao;
            }
            function lo(t, e, n) {
                const r = Oe(),
                    s = Vi(r, t, e, n);
                return (
                    s !== ls &&
                        (function (t, e, n) {
                            const r = ge(e, t);
                            !(function (t, e, n) {
                                de(t) ? t.setValue(e, n) : (e.textContent = n);
                            })(t[11], r, n);
                        })(r, Je(), s),
                    lo
                );
            }
            function co(t, e, n) {
                const r = Oe();
                return (
                    Ri(r, Ue(), e) && Is(Ae(), Xe(), r, t, e, r[11], n, !0), co
                );
            }
            const uo = void 0;
            var ho = [
                "en",
                [["a", "p"], ["AM", "PM"], uo],
                [["AM", "PM"], uo, uo],
                [
                    ["S", "M", "T", "W", "T", "F", "S"],
                    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    [
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                    ],
                    ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                ],
                uo,
                [
                    [
                        "J",
                        "F",
                        "M",
                        "A",
                        "M",
                        "J",
                        "J",
                        "A",
                        "S",
                        "O",
                        "N",
                        "D",
                    ],
                    [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                    ],
                    [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                    ],
                ],
                uo,
                [
                    ["B", "A"],
                    ["BC", "AD"],
                    ["Before Christ", "Anno Domini"],
                ],
                0,
                [6, 0],
                ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
                ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
                ["{1}, {0}", uo, "{1} 'at' {0}", uo],
                [
                    ".",
                    ",",
                    ";",
                    "%",
                    "+",
                    "-",
                    "E",
                    "\xd7",
                    "\u2030",
                    "\u221e",
                    "NaN",
                    ":",
                ],
                ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"],
                "USD",
                "$",
                "US Dollar",
                {},
                "ltr",
                function (t) {
                    let e = Math.floor(Math.abs(t)),
                        n = t.toString().replace(/^[^.]*\.?/, "").length;
                    return 1 === e && 0 === n ? 1 : 5;
                },
            ];
            let po = {};
            function fo(t) {
                return (
                    t in po ||
                        (po[t] =
                            Tt.ng &&
                            Tt.ng.common &&
                            Tt.ng.common.locales &&
                            Tt.ng.common.locales[t]),
                    po[t]
                );
            }
            var go = (function (t) {
                return (
                    (t[(t.LocaleId = 0)] = "LocaleId"),
                    (t[(t.DayPeriodsFormat = 1)] = "DayPeriodsFormat"),
                    (t[(t.DayPeriodsStandalone = 2)] = "DayPeriodsStandalone"),
                    (t[(t.DaysFormat = 3)] = "DaysFormat"),
                    (t[(t.DaysStandalone = 4)] = "DaysStandalone"),
                    (t[(t.MonthsFormat = 5)] = "MonthsFormat"),
                    (t[(t.MonthsStandalone = 6)] = "MonthsStandalone"),
                    (t[(t.Eras = 7)] = "Eras"),
                    (t[(t.FirstDayOfWeek = 8)] = "FirstDayOfWeek"),
                    (t[(t.WeekendRange = 9)] = "WeekendRange"),
                    (t[(t.DateFormat = 10)] = "DateFormat"),
                    (t[(t.TimeFormat = 11)] = "TimeFormat"),
                    (t[(t.DateTimeFormat = 12)] = "DateTimeFormat"),
                    (t[(t.NumberSymbols = 13)] = "NumberSymbols"),
                    (t[(t.NumberFormats = 14)] = "NumberFormats"),
                    (t[(t.CurrencyCode = 15)] = "CurrencyCode"),
                    (t[(t.CurrencySymbol = 16)] = "CurrencySymbol"),
                    (t[(t.CurrencyName = 17)] = "CurrencyName"),
                    (t[(t.Currencies = 18)] = "Currencies"),
                    (t[(t.Directionality = 19)] = "Directionality"),
                    (t[(t.PluralCase = 20)] = "PluralCase"),
                    (t[(t.ExtraData = 21)] = "ExtraData"),
                    t
                );
            })({});
            const mo = "en-US";
            let yo = mo;
            function vo(t) {
                var e, n;
                (n = "Expected localeId to be defined"),
                    null == (e = t) &&
                        (function (t, e, n, r) {
                            throw new Error(
                                "ASSERTION ERROR: " +
                                    t +
                                    ` [Expected=> null != ${e} <=Actual]`
                            );
                        })(n, e),
                    "string" == typeof t &&
                        (yo = t.toLowerCase().replace(/_/g, "-"));
            }
            function _o(t, e, n, r, s) {
                if (((t = st(t)), Array.isArray(t)))
                    for (let i = 0; i < t.length; i++) _o(t[i], e, n, r, s);
                else {
                    const i = Ae(),
                        o = Oe();
                    let a = yi(t) ? t : st(t.provide),
                        l = fi(t);
                    const c = Ie(),
                        u = 1048575 & c.providerIndexes,
                        h = c.directiveStart,
                        d = c.providerIndexes >> 20;
                    if (yi(t) || !t.multi) {
                        const r = new ln(l, s, Ni),
                            p = Co(a, e, s ? u : u + d, h);
                        -1 === p
                            ? (xn(bn(c, o), i, a),
                              bo(i, t, e.length),
                              e.push(a),
                              c.directiveStart++,
                              c.directiveEnd++,
                              s && (c.providerIndexes += 1048576),
                              n.push(r),
                              o.push(r))
                            : ((n[p] = r), (o[p] = r));
                    } else {
                        const p = Co(a, e, u + d, h),
                            f = Co(a, e, u, u + d),
                            g = p >= 0 && n[p],
                            m = f >= 0 && n[f];
                        if ((s && !m) || (!s && !g)) {
                            xn(bn(c, o), i, a);
                            const u = (function (t, e, n, r, s) {
                                const i = new ln(t, n, Ni);
                                return (
                                    (i.multi = []),
                                    (i.index = e),
                                    (i.componentProviders = 0),
                                    wo(i, s, r && !n),
                                    i
                                );
                            })(s ? xo : So, n.length, s, r, l);
                            !s && m && (n[f].providerFactory = u),
                                bo(i, t, e.length, 0),
                                e.push(a),
                                c.directiveStart++,
                                c.directiveEnd++,
                                s && (c.providerIndexes += 1048576),
                                n.push(u),
                                o.push(u);
                        } else
                            bo(
                                i,
                                t,
                                p > -1 ? p : f,
                                wo(n[s ? f : p], l, !s && r)
                            );
                        !s && r && m && n[f].componentProviders++;
                    }
                }
            }
            function bo(t, e, n, r) {
                const s = yi(e);
                if (s || e.useClass) {
                    const i = (e.useClass || e).prototype.ngOnDestroy;
                    if (i) {
                        const o = t.destroyHooks || (t.destroyHooks = []);
                        if (!s && e.multi) {
                            const t = o.indexOf(n);
                            -1 === t ? o.push(n, [r, i]) : o[t + 1].push(r, i);
                        } else o.push(n, i);
                    }
                }
            }
            function wo(t, e, n) {
                return n && t.componentProviders++, t.multi.push(e) - 1;
            }
            function Co(t, e, n, r) {
                for (let s = n; s < r; s++) if (e[s] === t) return s;
                return -1;
            }
            function So(t, e, n, r) {
                return Eo(this.multi, []);
            }
            function xo(t, e, n, r) {
                const s = this.multi;
                let i;
                if (this.providerFactory) {
                    const t = this.providerFactory.componentProviders,
                        e = Rn(n, n[1], this.providerFactory.index, r);
                    (i = e.slice(0, t)), Eo(s, i);
                    for (let n = t; n < e.length; n++) i.push(e[n]);
                } else (i = []), Eo(s, i);
                return i;
            }
            function Eo(t, e) {
                for (let n = 0; n < t.length; n++) e.push((0, t[n])());
                return e;
            }
            function To(t, e = []) {
                return (n) => {
                    n.providersResolver = (n, r) =>
                        (function (t, e, n) {
                            const r = Ae();
                            if (r.firstCreatePass) {
                                const s = Xt(t);
                                _o(n, r.data, r.blueprint, s, !0),
                                    _o(e, r.data, r.blueprint, s, !1);
                            }
                        })(n, r ? r(t) : t, e);
                };
            }
            class ko {}
            class Oo {
                resolveComponentFactory(t) {
                    throw (function (t) {
                        const e = Error(
                            `No component factory found for ${tt(
                                t
                            )}. Did you add it to @NgModule.entryComponents?`
                        );
                        return (e.ngComponent = t), e;
                    })(t);
                }
            }
            let Ao = (() => {
                class t {}
                return (t.NULL = new Oo()), t;
            })();
            function Do(...t) {}
            function Io(t, e) {
                return new Po(me(t, e));
            }
            const Ro = function () {
                return Io(Ie(), Oe());
            };
            let Po = (() => {
                class t {
                    constructor(t) {
                        this.nativeElement = t;
                    }
                }
                return (t.__NG_ELEMENT_ID__ = Ro), t;
            })();
            class Vo {}
            let jo = (() => {
                class t {}
                return (t.__NG_ELEMENT_ID__ = () => Mo()), t;
            })();
            const Mo = function () {
                const t = Oe(),
                    e = _e(Ie().index, t);
                return (function (t) {
                    return t[11];
                })(Gt(e) ? e : t);
            };
            let No = (() => {
                class t {}
                return (
                    (t.ɵprov = ot({
                        token: t,
                        providedIn: "root",
                        factory: () => null,
                    })),
                    t
                );
            })();
            class Uo {
                constructor(t) {
                    (this.full = t),
                        (this.major = t.split(".")[0]),
                        (this.minor = t.split(".")[1]),
                        (this.patch = t.split(".").slice(2).join("."));
                }
            }
            const Lo = new Uo("11.0.8");
            class Fo {
                constructor() {}
                supports(t) {
                    return Ai(t);
                }
                create(t) {
                    return new zo(t);
                }
            }
            const Ho = (t, e) => e;
            class zo {
                constructor(t) {
                    (this.length = 0),
                        (this._linkedRecords = null),
                        (this._unlinkedRecords = null),
                        (this._previousItHead = null),
                        (this._itHead = null),
                        (this._itTail = null),
                        (this._additionsHead = null),
                        (this._additionsTail = null),
                        (this._movesHead = null),
                        (this._movesTail = null),
                        (this._removalsHead = null),
                        (this._removalsTail = null),
                        (this._identityChangesHead = null),
                        (this._identityChangesTail = null),
                        (this._trackByFn = t || Ho);
                }
                forEachItem(t) {
                    let e;
                    for (e = this._itHead; null !== e; e = e._next) t(e);
                }
                forEachOperation(t) {
                    let e = this._itHead,
                        n = this._removalsHead,
                        r = 0,
                        s = null;
                    for (; e || n; ) {
                        const i =
                                !n || (e && e.currentIndex < Wo(n, r, s))
                                    ? e
                                    : n,
                            o = Wo(i, r, s),
                            a = i.currentIndex;
                        if (i === n) r--, (n = n._nextRemoved);
                        else if (((e = e._next), null == i.previousIndex)) r++;
                        else {
                            s || (s = []);
                            const t = o - r,
                                e = a - r;
                            if (t != e) {
                                for (let n = 0; n < t; n++) {
                                    const r = n < s.length ? s[n] : (s[n] = 0),
                                        i = r + n;
                                    e <= i && i < t && (s[n] = r + 1);
                                }
                                s[i.previousIndex] = e - t;
                            }
                        }
                        o !== a && t(i, o, a);
                    }
                }
                forEachPreviousItem(t) {
                    let e;
                    for (
                        e = this._previousItHead;
                        null !== e;
                        e = e._nextPrevious
                    )
                        t(e);
                }
                forEachAddedItem(t) {
                    let e;
                    for (e = this._additionsHead; null !== e; e = e._nextAdded)
                        t(e);
                }
                forEachMovedItem(t) {
                    let e;
                    for (e = this._movesHead; null !== e; e = e._nextMoved)
                        t(e);
                }
                forEachRemovedItem(t) {
                    let e;
                    for (e = this._removalsHead; null !== e; e = e._nextRemoved)
                        t(e);
                }
                forEachIdentityChange(t) {
                    let e;
                    for (
                        e = this._identityChangesHead;
                        null !== e;
                        e = e._nextIdentityChange
                    )
                        t(e);
                }
                diff(t) {
                    if ((null == t && (t = []), !Ai(t)))
                        throw new Error(
                            `Error trying to diff '${tt(
                                t
                            )}'. Only arrays and iterables are allowed`
                        );
                    return this.check(t) ? this : null;
                }
                onDestroy() {}
                check(t) {
                    this._reset();
                    let e,
                        n,
                        r,
                        s = this._itHead,
                        i = !1;
                    if (Array.isArray(t)) {
                        this.length = t.length;
                        for (let e = 0; e < this.length; e++)
                            (n = t[e]),
                                (r = this._trackByFn(e, n)),
                                null !== s && Object.is(s.trackById, r)
                                    ? (i &&
                                          (s = this._verifyReinsertion(
                                              s,
                                              n,
                                              r,
                                              e
                                          )),
                                      Object.is(s.item, n) ||
                                          this._addIdentityChange(s, n))
                                    : ((s = this._mismatch(s, n, r, e)),
                                      (i = !0)),
                                (s = s._next);
                    } else
                        (e = 0),
                            (function (t, e) {
                                if (Array.isArray(t))
                                    for (let n = 0; n < t.length; n++) e(t[n]);
                                else {
                                    const n = t[ki()]();
                                    let r;
                                    for (; !(r = n.next()).done; ) e(r.value);
                                }
                            })(t, (t) => {
                                (r = this._trackByFn(e, t)),
                                    null !== s && Object.is(s.trackById, r)
                                        ? (i &&
                                              (s = this._verifyReinsertion(
                                                  s,
                                                  t,
                                                  r,
                                                  e
                                              )),
                                          Object.is(s.item, t) ||
                                              this._addIdentityChange(s, t))
                                        : ((s = this._mismatch(s, t, r, e)),
                                          (i = !0)),
                                    (s = s._next),
                                    e++;
                            }),
                            (this.length = e);
                    return (
                        this._truncate(s), (this.collection = t), this.isDirty
                    );
                }
                get isDirty() {
                    return (
                        null !== this._additionsHead ||
                        null !== this._movesHead ||
                        null !== this._removalsHead ||
                        null !== this._identityChangesHead
                    );
                }
                _reset() {
                    if (this.isDirty) {
                        let t;
                        for (
                            t = this._previousItHead = this._itHead;
                            null !== t;
                            t = t._next
                        )
                            t._nextPrevious = t._next;
                        for (
                            t = this._additionsHead;
                            null !== t;
                            t = t._nextAdded
                        )
                            t.previousIndex = t.currentIndex;
                        for (
                            this._additionsHead = this._additionsTail = null,
                                t = this._movesHead;
                            null !== t;
                            t = t._nextMoved
                        )
                            t.previousIndex = t.currentIndex;
                        (this._movesHead = this._movesTail = null),
                            (this._removalsHead = this._removalsTail = null),
                            (this._identityChangesHead =
                                this._identityChangesTail =
                                    null);
                    }
                }
                _mismatch(t, e, n, r) {
                    let s;
                    return (
                        null === t
                            ? (s = this._itTail)
                            : ((s = t._prev), this._remove(t)),
                        null !==
                        (t =
                            null === this._linkedRecords
                                ? null
                                : this._linkedRecords.get(n, r))
                            ? (Object.is(t.item, e) ||
                                  this._addIdentityChange(t, e),
                              this._moveAfter(t, s, r))
                            : null !==
                              (t =
                                  null === this._unlinkedRecords
                                      ? null
                                      : this._unlinkedRecords.get(n, null))
                            ? (Object.is(t.item, e) ||
                                  this._addIdentityChange(t, e),
                              this._reinsertAfter(t, s, r))
                            : (t = this._addAfter(new $o(e, n), s, r)),
                        t
                    );
                }
                _verifyReinsertion(t, e, n, r) {
                    let s =
                        null === this._unlinkedRecords
                            ? null
                            : this._unlinkedRecords.get(n, null);
                    return (
                        null !== s
                            ? (t = this._reinsertAfter(s, t._prev, r))
                            : t.currentIndex != r &&
                              ((t.currentIndex = r), this._addToMoves(t, r)),
                        t
                    );
                }
                _truncate(t) {
                    for (; null !== t; ) {
                        const e = t._next;
                        this._addToRemovals(this._unlink(t)), (t = e);
                    }
                    null !== this._unlinkedRecords &&
                        this._unlinkedRecords.clear(),
                        null !== this._additionsTail &&
                            (this._additionsTail._nextAdded = null),
                        null !== this._movesTail &&
                            (this._movesTail._nextMoved = null),
                        null !== this._itTail && (this._itTail._next = null),
                        null !== this._removalsTail &&
                            (this._removalsTail._nextRemoved = null),
                        null !== this._identityChangesTail &&
                            (this._identityChangesTail._nextIdentityChange =
                                null);
                }
                _reinsertAfter(t, e, n) {
                    null !== this._unlinkedRecords &&
                        this._unlinkedRecords.remove(t);
                    const r = t._prevRemoved,
                        s = t._nextRemoved;
                    return (
                        null === r
                            ? (this._removalsHead = s)
                            : (r._nextRemoved = s),
                        null === s
                            ? (this._removalsTail = r)
                            : (s._prevRemoved = r),
                        this._insertAfter(t, e, n),
                        this._addToMoves(t, n),
                        t
                    );
                }
                _moveAfter(t, e, n) {
                    return (
                        this._unlink(t),
                        this._insertAfter(t, e, n),
                        this._addToMoves(t, n),
                        t
                    );
                }
                _addAfter(t, e, n) {
                    return (
                        this._insertAfter(t, e, n),
                        (this._additionsTail =
                            null === this._additionsTail
                                ? (this._additionsHead = t)
                                : (this._additionsTail._nextAdded = t)),
                        t
                    );
                }
                _insertAfter(t, e, n) {
                    const r = null === e ? this._itHead : e._next;
                    return (
                        (t._next = r),
                        (t._prev = e),
                        null === r ? (this._itTail = t) : (r._prev = t),
                        null === e ? (this._itHead = t) : (e._next = t),
                        null === this._linkedRecords &&
                            (this._linkedRecords = new Bo()),
                        this._linkedRecords.put(t),
                        (t.currentIndex = n),
                        t
                    );
                }
                _remove(t) {
                    return this._addToRemovals(this._unlink(t));
                }
                _unlink(t) {
                    null !== this._linkedRecords &&
                        this._linkedRecords.remove(t);
                    const e = t._prev,
                        n = t._next;
                    return (
                        null === e ? (this._itHead = n) : (e._next = n),
                        null === n ? (this._itTail = e) : (n._prev = e),
                        t
                    );
                }
                _addToMoves(t, e) {
                    return (
                        t.previousIndex === e ||
                            (this._movesTail =
                                null === this._movesTail
                                    ? (this._movesHead = t)
                                    : (this._movesTail._nextMoved = t)),
                        t
                    );
                }
                _addToRemovals(t) {
                    return (
                        null === this._unlinkedRecords &&
                            (this._unlinkedRecords = new Bo()),
                        this._unlinkedRecords.put(t),
                        (t.currentIndex = null),
                        (t._nextRemoved = null),
                        null === this._removalsTail
                            ? ((this._removalsTail = this._removalsHead = t),
                              (t._prevRemoved = null))
                            : ((t._prevRemoved = this._removalsTail),
                              (this._removalsTail =
                                  this._removalsTail._nextRemoved =
                                      t)),
                        t
                    );
                }
                _addIdentityChange(t, e) {
                    return (
                        (t.item = e),
                        (this._identityChangesTail =
                            null === this._identityChangesTail
                                ? (this._identityChangesHead = t)
                                : (this._identityChangesTail._nextIdentityChange =
                                      t)),
                        t
                    );
                }
            }
            class $o {
                constructor(t, e) {
                    (this.item = t),
                        (this.trackById = e),
                        (this.currentIndex = null),
                        (this.previousIndex = null),
                        (this._nextPrevious = null),
                        (this._prev = null),
                        (this._next = null),
                        (this._prevDup = null),
                        (this._nextDup = null),
                        (this._prevRemoved = null),
                        (this._nextRemoved = null),
                        (this._nextAdded = null),
                        (this._nextMoved = null),
                        (this._nextIdentityChange = null);
                }
            }
            class qo {
                constructor() {
                    (this._head = null), (this._tail = null);
                }
                add(t) {
                    null === this._head
                        ? ((this._head = this._tail = t),
                          (t._nextDup = null),
                          (t._prevDup = null))
                        : ((this._tail._nextDup = t),
                          (t._prevDup = this._tail),
                          (t._nextDup = null),
                          (this._tail = t));
                }
                get(t, e) {
                    let n;
                    for (n = this._head; null !== n; n = n._nextDup)
                        if (
                            (null === e || e <= n.currentIndex) &&
                            Object.is(n.trackById, t)
                        )
                            return n;
                    return null;
                }
                remove(t) {
                    const e = t._prevDup,
                        n = t._nextDup;
                    return (
                        null === e ? (this._head = n) : (e._nextDup = n),
                        null === n ? (this._tail = e) : (n._prevDup = e),
                        null === this._head
                    );
                }
            }
            class Bo {
                constructor() {
                    this.map = new Map();
                }
                put(t) {
                    const e = t.trackById;
                    let n = this.map.get(e);
                    n || ((n = new qo()), this.map.set(e, n)), n.add(t);
                }
                get(t, e) {
                    const n = this.map.get(t);
                    return n ? n.get(t, e) : null;
                }
                remove(t) {
                    const e = t.trackById;
                    return this.map.get(e).remove(t) && this.map.delete(e), t;
                }
                get isEmpty() {
                    return 0 === this.map.size;
                }
                clear() {
                    this.map.clear();
                }
            }
            function Wo(t, e, n) {
                const r = t.previousIndex;
                if (null === r) return r;
                let s = 0;
                return n && r < n.length && (s = n[r]), r + e + s;
            }
            class Zo {
                constructor() {}
                supports(t) {
                    return t instanceof Map || Di(t);
                }
                create() {
                    return new Go();
                }
            }
            class Go {
                constructor() {
                    (this._records = new Map()),
                        (this._mapHead = null),
                        (this._appendAfter = null),
                        (this._previousMapHead = null),
                        (this._changesHead = null),
                        (this._changesTail = null),
                        (this._additionsHead = null),
                        (this._additionsTail = null),
                        (this._removalsHead = null),
                        (this._removalsTail = null);
                }
                get isDirty() {
                    return (
                        null !== this._additionsHead ||
                        null !== this._changesHead ||
                        null !== this._removalsHead
                    );
                }
                forEachItem(t) {
                    let e;
                    for (e = this._mapHead; null !== e; e = e._next) t(e);
                }
                forEachPreviousItem(t) {
                    let e;
                    for (
                        e = this._previousMapHead;
                        null !== e;
                        e = e._nextPrevious
                    )
                        t(e);
                }
                forEachChangedItem(t) {
                    let e;
                    for (e = this._changesHead; null !== e; e = e._nextChanged)
                        t(e);
                }
                forEachAddedItem(t) {
                    let e;
                    for (e = this._additionsHead; null !== e; e = e._nextAdded)
                        t(e);
                }
                forEachRemovedItem(t) {
                    let e;
                    for (e = this._removalsHead; null !== e; e = e._nextRemoved)
                        t(e);
                }
                diff(t) {
                    if (t) {
                        if (!(t instanceof Map || Di(t)))
                            throw new Error(
                                `Error trying to diff '${tt(
                                    t
                                )}'. Only maps and objects are allowed`
                            );
                    } else t = new Map();
                    return this.check(t) ? this : null;
                }
                onDestroy() {}
                check(t) {
                    this._reset();
                    let e = this._mapHead;
                    if (
                        ((this._appendAfter = null),
                        this._forEach(t, (t, n) => {
                            if (e && e.key === n)
                                this._maybeAddToChanges(e, t),
                                    (this._appendAfter = e),
                                    (e = e._next);
                            else {
                                const r = this._getOrCreateRecordForKey(n, t);
                                e = this._insertBeforeOrAppend(e, r);
                            }
                        }),
                        e)
                    ) {
                        e._prev && (e._prev._next = null),
                            (this._removalsHead = e);
                        for (let t = e; null !== t; t = t._nextRemoved)
                            t === this._mapHead && (this._mapHead = null),
                                this._records.delete(t.key),
                                (t._nextRemoved = t._next),
                                (t.previousValue = t.currentValue),
                                (t.currentValue = null),
                                (t._prev = null),
                                (t._next = null);
                    }
                    return (
                        this._changesTail &&
                            (this._changesTail._nextChanged = null),
                        this._additionsTail &&
                            (this._additionsTail._nextAdded = null),
                        this.isDirty
                    );
                }
                _insertBeforeOrAppend(t, e) {
                    if (t) {
                        const n = t._prev;
                        return (
                            (e._next = t),
                            (e._prev = n),
                            (t._prev = e),
                            n && (n._next = e),
                            t === this._mapHead && (this._mapHead = e),
                            (this._appendAfter = t),
                            t
                        );
                    }
                    return (
                        this._appendAfter
                            ? ((this._appendAfter._next = e),
                              (e._prev = this._appendAfter))
                            : (this._mapHead = e),
                        (this._appendAfter = e),
                        null
                    );
                }
                _getOrCreateRecordForKey(t, e) {
                    if (this._records.has(t)) {
                        const n = this._records.get(t);
                        this._maybeAddToChanges(n, e);
                        const r = n._prev,
                            s = n._next;
                        return (
                            r && (r._next = s),
                            s && (s._prev = r),
                            (n._next = null),
                            (n._prev = null),
                            n
                        );
                    }
                    const n = new Qo(t);
                    return (
                        this._records.set(t, n),
                        (n.currentValue = e),
                        this._addToAdditions(n),
                        n
                    );
                }
                _reset() {
                    if (this.isDirty) {
                        let t;
                        for (
                            this._previousMapHead = this._mapHead,
                                t = this._previousMapHead;
                            null !== t;
                            t = t._next
                        )
                            t._nextPrevious = t._next;
                        for (
                            t = this._changesHead;
                            null !== t;
                            t = t._nextChanged
                        )
                            t.previousValue = t.currentValue;
                        for (
                            t = this._additionsHead;
                            null != t;
                            t = t._nextAdded
                        )
                            t.previousValue = t.currentValue;
                        (this._changesHead = this._changesTail = null),
                            (this._additionsHead = this._additionsTail = null),
                            (this._removalsHead = null);
                    }
                }
                _maybeAddToChanges(t, e) {
                    Object.is(e, t.currentValue) ||
                        ((t.previousValue = t.currentValue),
                        (t.currentValue = e),
                        this._addToChanges(t));
                }
                _addToAdditions(t) {
                    null === this._additionsHead
                        ? (this._additionsHead = this._additionsTail = t)
                        : ((this._additionsTail._nextAdded = t),
                          (this._additionsTail = t));
                }
                _addToChanges(t) {
                    null === this._changesHead
                        ? (this._changesHead = this._changesTail = t)
                        : ((this._changesTail._nextChanged = t),
                          (this._changesTail = t));
                }
                _forEach(t, e) {
                    t instanceof Map
                        ? t.forEach(e)
                        : Object.keys(t).forEach((n) => e(t[n], n));
                }
            }
            class Qo {
                constructor(t) {
                    (this.key = t),
                        (this.previousValue = null),
                        (this.currentValue = null),
                        (this._nextPrevious = null),
                        (this._next = null),
                        (this._prev = null),
                        (this._nextAdded = null),
                        (this._nextRemoved = null),
                        (this._nextChanged = null);
                }
            }
            let Ko = (() => {
                    class t {
                        constructor(t) {
                            this.factories = t;
                        }
                        static create(e, n) {
                            if (null != n) {
                                const t = n.factories.slice();
                                e = e.concat(t);
                            }
                            return new t(e);
                        }
                        static extend(e) {
                            return {
                                provide: t,
                                useFactory: (n) => {
                                    if (!n)
                                        throw new Error(
                                            "Cannot extend IterableDiffers without a parent injector"
                                        );
                                    return t.create(e, n);
                                },
                                deps: [[t, new rr(), new er()]],
                            };
                        }
                        find(t) {
                            const e = this.factories.find((e) => e.supports(t));
                            if (null != e) return e;
                            throw new Error(
                                `Cannot find a differ supporting object '${t}' of type '${
                                    ((n = t), n.name || typeof n)
                                }'`
                            );
                            var n;
                        }
                    }
                    return (
                        (t.ɵprov = ot({
                            token: t,
                            providedIn: "root",
                            factory: () => new t([new Fo()]),
                        })),
                        t
                    );
                })(),
                Jo = (() => {
                    class t {
                        constructor(t) {
                            this.factories = t;
                        }
                        static create(e, n) {
                            if (n) {
                                const t = n.factories.slice();
                                e = e.concat(t);
                            }
                            return new t(e);
                        }
                        static extend(e) {
                            return {
                                provide: t,
                                useFactory: (n) => {
                                    if (!n)
                                        throw new Error(
                                            "Cannot extend KeyValueDiffers without a parent injector"
                                        );
                                    return t.create(e, n);
                                },
                                deps: [[t, new rr(), new er()]],
                            };
                        }
                        find(t) {
                            const e = this.factories.find((e) => e.supports(t));
                            if (e) return e;
                            throw new Error(
                                `Cannot find a differ supporting object '${t}'`
                            );
                        }
                    }
                    return (
                        (t.ɵprov = ot({
                            token: t,
                            providedIn: "root",
                            factory: () => new t([new Zo()]),
                        })),
                        t
                    );
                })();
            function Yo(t, e, n, r, s = !1) {
                for (; null !== n; ) {
                    const i = e[n.index];
                    if ((null !== i && r.push(fe(i)), Qt(i)))
                        for (let t = Zt; t < i.length; t++) {
                            const e = i[t],
                                n = e[1].firstChild;
                            null !== n && Yo(e[1], e, n, r);
                        }
                    const o = n.type;
                    if (8 & o) Yo(t, e, n.child, r);
                    else if (32 & o) {
                        const t = Or(n, e);
                        let s;
                        for (; (s = t()); ) r.push(s);
                    } else if (16 & o) {
                        const t = e[16],
                            s = t[6].projection[n.projection];
                        if (Array.isArray(s)) r.push(...s);
                        else {
                            const e = Ar(t);
                            Yo(e[1], e, s, r, !0);
                        }
                    }
                    n = s ? n.projectionNext : n.next;
                }
                return r;
            }
            class Xo {
                constructor(t, e) {
                    (this._lView = t),
                        (this._cdRefInjectingView = e),
                        (this._appRef = null),
                        (this._attachedToViewContainer = !1);
                }
                get rootNodes() {
                    const t = this._lView,
                        e = t[1];
                    return Yo(e, t, e.firstChild, []);
                }
                get context() {
                    return this._lView[8];
                }
                get destroyed() {
                    return 256 == (256 & this._lView[2]);
                }
                destroy() {
                    if (this._appRef) this._appRef.detachView(this);
                    else if (this._attachedToViewContainer) {
                        const t = this._lView[3];
                        if (Qt(t)) {
                            const e = t[8],
                                n = e ? e.indexOf(this) : -1;
                            n > -1 && (Mr(t, n), Kn(e, n));
                        }
                        this._attachedToViewContainer = !1;
                    }
                    Nr(this._lView[1], this._lView);
                }
                onDestroy(t) {
                    As(this._lView[1], this._lView, null, t);
                }
                markForCheck() {
                    Zs(this._cdRefInjectingView || this._lView);
                }
                detach() {
                    this._lView[2] &= -129;
                }
                reattach() {
                    this._lView[2] |= 128;
                }
                detectChanges() {
                    Gs(this._lView[1], this._lView, this.context);
                }
                checkNoChanges() {
                    !(function (t, e, n) {
                        Me(!0);
                        try {
                            Gs(t, e, n);
                        } finally {
                            Me(!1);
                        }
                    })(this._lView[1], this._lView, this.context);
                }
                attachToViewContainerRef() {
                    if (this._appRef)
                        throw new Error(
                            "This view is already attached directly to the ApplicationRef!"
                        );
                    this._attachedToViewContainer = !0;
                }
                detachFromAppRef() {
                    var t;
                    (this._appRef = null),
                        Zr(
                            this._lView[1],
                            (t = this._lView),
                            t[11],
                            2,
                            null,
                            null
                        );
                }
                attachToAppRef(t) {
                    if (this._attachedToViewContainer)
                        throw new Error(
                            "This view is already attached to a ViewContainer!"
                        );
                    this._appRef = t;
                }
            }
            class ta extends Xo {
                constructor(t) {
                    super(t), (this._view = t);
                }
                detectChanges() {
                    Qs(this._view);
                }
                checkNoChanges() {
                    !(function (t) {
                        Me(!0);
                        try {
                            Qs(t);
                        } finally {
                            Me(!1);
                        }
                    })(this._view);
                }
                get context() {
                    return null;
                }
            }
            const ea = function (t = !1) {
                return (function (t, e, n) {
                    if (!n && Jt(t)) {
                        const n = _e(t.index, e);
                        return new Xo(n, n);
                    }
                    return 47 & t.type ? new Xo(e[16], e) : null;
                })(Ie(), Oe(), t);
            };
            let na = (() => {
                class t {}
                return (
                    (t.__NG_ELEMENT_ID__ = ea),
                    (t.__ChangeDetectorRef__ = !0),
                    t
                );
            })();
            const ra = [new Zo()],
                sa = new Ko([new Fo()]),
                ia = new Jo(ra),
                oa = function () {
                    return ua(Ie(), Oe());
                };
            let aa = (() => {
                class t {}
                return (t.__NG_ELEMENT_ID__ = oa), t;
            })();
            const la = aa,
                ca = class extends la {
                    constructor(t, e, n) {
                        super(),
                            (this._declarationLView = t),
                            (this._declarationTContainer = e),
                            (this.elementRef = n);
                    }
                    createEmbeddedView(t) {
                        const e = this._declarationTContainer.tViews,
                            n = vs(
                                this._declarationLView,
                                e,
                                t,
                                16,
                                null,
                                e.declTNode,
                                null,
                                null,
                                null,
                                null
                            );
                        n[17] =
                            this._declarationLView[
                                this._declarationTContainer.index
                            ];
                        const r = this._declarationLView[19];
                        return (
                            null !== r && (n[19] = r.createEmbeddedView(e)),
                            ws(e, n, t),
                            new Xo(n)
                        );
                    }
                };
            function ua(t, e) {
                return 4 & t.type ? new ca(e, t, Io(t, e)) : null;
            }
            class ha {}
            class da {}
            const pa = function () {
                return _a(Ie(), Oe());
            };
            let fa = (() => {
                class t {}
                return (t.__NG_ELEMENT_ID__ = pa), t;
            })();
            const ga = fa,
                ma = class extends ga {
                    constructor(t, e, n) {
                        super(),
                            (this._lContainer = t),
                            (this._hostTNode = e),
                            (this._hostLView = n);
                    }
                    get element() {
                        return Io(this._hostTNode, this._hostLView);
                    }
                    get injector() {
                        return new jn(this._hostTNode, this._hostLView);
                    }
                    get parentInjector() {
                        const t = Sn(this._hostTNode, this._hostLView);
                        if (fn(t)) {
                            const e = mn(t, this._hostLView),
                                n = gn(t);
                            return new jn(e[1].data[n + 8], e);
                        }
                        return new jn(null, this._hostLView);
                    }
                    clear() {
                        for (; this.length > 0; ) this.remove(this.length - 1);
                    }
                    get(t) {
                        const e = ya(this._lContainer);
                        return (null !== e && e[t]) || null;
                    }
                    get length() {
                        return this._lContainer.length - Zt;
                    }
                    createEmbeddedView(t, e, n) {
                        const r = t.createEmbeddedView(e || {});
                        return this.insert(r, n), r;
                    }
                    createComponent(t, e, n, r, s) {
                        const i = n || this.parentInjector;
                        if (!s && null == t.ngModule && i) {
                            const t = i.get(ha, null);
                            t && (s = t);
                        }
                        const o = t.create(i, r, void 0, s);
                        return this.insert(o.hostView, e), o;
                    }
                    insert(t, e) {
                        const n = t._lView,
                            r = n[1];
                        if (Qt(n[3])) {
                            const e = this.indexOf(t);
                            if (-1 !== e) this.detach(e);
                            else {
                                const e = n[3],
                                    r = new ma(e, e[6], e[3]);
                                r.detach(r.indexOf(t));
                            }
                        }
                        const s = this._adjustIndex(e),
                            i = this._lContainer;
                        !(function (t, e, n, r) {
                            const s = Zt + r,
                                i = n.length;
                            r > 0 && (n[s - 1][4] = e),
                                r < i - Zt
                                    ? ((e[4] = n[s]), Qn(n, Zt + r, e))
                                    : (n.push(e), (e[4] = null)),
                                (e[3] = n);
                            const o = e[17];
                            null !== o &&
                                n !== o &&
                                (function (t, e) {
                                    const n = t[9];
                                    e[16] !== e[3][3][16] && (t[2] = !0),
                                        null === n ? (t[9] = [e]) : n.push(e);
                                })(o, e);
                            const a = e[19];
                            null !== a && a.insertView(t), (e[2] |= 128);
                        })(r, n, i, s);
                        const o = Br(s, i),
                            a = n[11],
                            l = zr(a, i[7]);
                        return (
                            null !== l &&
                                (function (t, e, n, r, s, i) {
                                    (r[0] = s),
                                        (r[6] = e),
                                        Zr(t, r, n, 1, s, i);
                                })(r, i[6], a, n, l, o),
                            t.attachToViewContainerRef(),
                            Qn(va(i), s, t),
                            t
                        );
                    }
                    move(t, e) {
                        return this.insert(t, e);
                    }
                    indexOf(t) {
                        const e = ya(this._lContainer);
                        return null !== e ? e.indexOf(t) : -1;
                    }
                    remove(t) {
                        const e = this._adjustIndex(t, -1),
                            n = Mr(this._lContainer, e);
                        n && (Kn(va(this._lContainer), e), Nr(n[1], n));
                    }
                    detach(t) {
                        const e = this._adjustIndex(t, -1),
                            n = Mr(this._lContainer, e);
                        return n && null != Kn(va(this._lContainer), e)
                            ? new Xo(n)
                            : null;
                    }
                    _adjustIndex(t, e = 0) {
                        return null == t ? this.length + e : t;
                    }
                };
            function ya(t) {
                return t[8];
            }
            function va(t) {
                return t[8] || (t[8] = []);
            }
            function _a(t, e) {
                let n;
                const r = e[t.index];
                if (Qt(r)) n = r;
                else {
                    let s;
                    if (8 & t.type) s = fe(r);
                    else {
                        const n = e[11];
                        s = n.createComment("");
                        const r = me(t, e);
                        Lr(
                            n,
                            zr(n, r),
                            s,
                            (function (t, e) {
                                return de(t) ? t.nextSibling(e) : e.nextSibling;
                            })(n, r),
                            !1
                        );
                    }
                    (e[t.index] = n = zs(r, e, s, t)), Ws(e, n);
                }
                return new ma(n, t, e);
            }
            const ba = {};
            class wa extends Ao {
                constructor(t) {
                    super(), (this.ngModule = t);
                }
                resolveComponentFactory(t) {
                    const e = qt(t);
                    return new xa(e, this.ngModule);
                }
            }
            function Ca(t) {
                const e = [];
                for (let n in t)
                    t.hasOwnProperty(n) &&
                        e.push({ propName: t[n], templateName: n });
                return e;
            }
            const Sa = new qn("SCHEDULER_TOKEN", {
                providedIn: "root",
                factory: () => Er,
            });
            class xa extends ko {
                constructor(t, e) {
                    super(),
                        (this.componentDef = t),
                        (this.ngModule = e),
                        (this.componentType = t.type),
                        (this.selector = t.selectors.map(as).join(",")),
                        (this.ngContentSelectors = t.ngContentSelectors
                            ? t.ngContentSelectors
                            : []),
                        (this.isBoundToModule = !!e);
                }
                get inputs() {
                    return Ca(this.componentDef.inputs);
                }
                get outputs() {
                    return Ca(this.componentDef.outputs);
                }
                create(t, e, n, r) {
                    const s = (r = r || this.ngModule)
                            ? (function (t, e) {
                                  return {
                                      get: (n, r, s) => {
                                          const i = t.get(n, ba, s);
                                          return i !== ba || r === ba
                                              ? i
                                              : e.get(n, r, s);
                                      },
                                  };
                              })(t, r.injector)
                            : t,
                        i = s.get(Vo, pe),
                        o = s.get(No, null),
                        a = i.createRenderer(null, this.componentDef),
                        l = this.componentDef.selectors[0][0] || "div",
                        c = n
                            ? (function (t, e, n) {
                                  if (de(t))
                                      return t.selectRootElement(
                                          e,
                                          n === wt.ShadowDom
                                      );
                                  let r =
                                      "string" == typeof e
                                          ? t.querySelector(e)
                                          : e;
                                  return (r.textContent = ""), r;
                              })(a, n, this.componentDef.encapsulation)
                            : Vr(
                                  i.createRenderer(null, this.componentDef),
                                  l,
                                  (function (t) {
                                      const e = t.toLowerCase();
                                      return "svg" === e
                                          ? "http://www.w3.org/2000/svg"
                                          : "math" === e
                                          ? "http://www.w3.org/1998/MathML/"
                                          : null;
                                  })(l)
                              ),
                        u = this.componentDef.onPush ? 576 : 528,
                        h = {
                            components: [],
                            scheduler: Er,
                            clean: Js,
                            playerHandler: null,
                            flags: 0,
                        },
                        d = Os(
                            0,
                            null,
                            null,
                            1,
                            0,
                            null,
                            null,
                            null,
                            null,
                            null
                        ),
                        p = vs(null, d, h, u, null, null, i, a, o, s);
                    let f, g;
                    Be(p);
                    try {
                        const t = (function (t, e, n, r, s, i) {
                            const o = n[1];
                            n[20] = t;
                            const a = _s(o, 20, 2, "#host", null),
                                l = (a.mergedAttrs = e.hostAttrs);
                            null !== l &&
                                (ni(a, l, !0),
                                null !== t &&
                                    (cn(s, t, l),
                                    null !== a.classes && Kr(s, t, a.classes),
                                    null !== a.styles && Qr(s, t, a.styles)));
                            const c = r.createRenderer(t, e),
                                u = vs(
                                    n,
                                    ks(e),
                                    null,
                                    e.onPush ? 64 : 16,
                                    n[20],
                                    a,
                                    r,
                                    c,
                                    null,
                                    null
                                );
                            return (
                                o.firstCreatePass &&
                                    (xn(bn(a, n), o, e.type),
                                    js(o, a),
                                    Ns(a, n.length, 1)),
                                Ws(n, u),
                                (n[20] = u)
                            );
                        })(c, this.componentDef, p, i, a);
                        if (c)
                            if (n) cn(a, c, ["ng-version", Lo.full]);
                            else {
                                const { attrs: t, classes: e } = (function (t) {
                                    const e = [],
                                        n = [];
                                    let r = 1,
                                        s = 2;
                                    for (; r < t.length; ) {
                                        let i = t[r];
                                        if ("string" == typeof i)
                                            2 === s
                                                ? "" !== i && e.push(i, t[++r])
                                                : 8 === s && n.push(i);
                                        else {
                                            if (!rs(s)) break;
                                            s = i;
                                        }
                                        r++;
                                    }
                                    return { attrs: e, classes: n };
                                })(this.componentDef.selectors[0]);
                                t && cn(a, c, t),
                                    e && e.length > 0 && Kr(a, c, e.join(" "));
                            }
                        if (((g = ye(d, Wt)), void 0 !== e)) {
                            const t = (g.projection = []);
                            for (
                                let n = 0;
                                n < this.ngContentSelectors.length;
                                n++
                            ) {
                                const r = e[n];
                                t.push(null != r ? Array.from(r) : null);
                            }
                        }
                        (f = (function (t, e, n, r, s) {
                            const i = n[1],
                                o = (function (t, e, n) {
                                    const r = Ie();
                                    t.firstCreatePass &&
                                        (n.providersResolver &&
                                            n.providersResolver(n),
                                        Us(t, r, e, bs(t, e, 1, null), n));
                                    const s = Rn(e, t, r.directiveStart, r);
                                    xr(s, e);
                                    const i = me(r, e);
                                    return i && xr(i, e), s;
                                })(i, n, e);
                            if (
                                (r.components.push(o),
                                (t[8] = o),
                                s && s.forEach((t) => t(o, e)),
                                e.contentQueries)
                            ) {
                                const t = Ie();
                                e.contentQueries(1, o, t.directiveStart);
                            }
                            const a = Ie();
                            return (
                                !i.firstCreatePass ||
                                    (null === e.hostBindings &&
                                        null === e.hostAttrs) ||
                                    (Ye(a.index),
                                    Ps(
                                        n[1],
                                        a,
                                        0,
                                        a.directiveStart,
                                        a.directiveEnd,
                                        e
                                    ),
                                    Vs(e, o)),
                                o
                            );
                        })(t, this.componentDef, p, h, [bi])),
                            ws(d, p, null);
                    } finally {
                        Ke();
                    }
                    return new Ea(this.componentType, f, Io(g, p), p, g);
                }
            }
            class Ea extends class {} {
                constructor(t, e, n, r, s) {
                    super(),
                        (this.location = n),
                        (this._rootLView = r),
                        (this._tNode = s),
                        (this.instance = e),
                        (this.hostView = this.changeDetectorRef = new ta(r)),
                        (this.componentType = t);
                }
                get injector() {
                    return new jn(this._tNode, this._rootLView);
                }
                destroy() {
                    this.hostView.destroy();
                }
                onDestroy(t) {
                    this.hostView.onDestroy(t);
                }
            }
            const Ta = new Map();
            class ka extends ha {
                constructor(t, e) {
                    super(),
                        (this._parent = e),
                        (this._bootstrapComponents = []),
                        (this.injector = this),
                        (this.destroyCbs = []),
                        (this.componentFactoryResolver = new wa(this));
                    const n = Bt(t),
                        r = t[Pt] || null;
                    r && vo(r),
                        (this._bootstrapComponents = Tr(n.bootstrap)),
                        (this._r3Injector = hi(
                            t,
                            e,
                            [
                                { provide: ha, useValue: this },
                                {
                                    provide: Ao,
                                    useValue: this.componentFactoryResolver,
                                },
                            ],
                            tt(t)
                        )),
                        this._r3Injector._resolveInjectorDefTypes(),
                        (this.instance = this.get(t));
                }
                get(t, e = _i.THROW_IF_NOT_FOUND, n = gt.Default) {
                    return t === _i || t === ha || t === ri
                        ? this
                        : this._r3Injector.get(t, e, n);
                }
                destroy() {
                    const t = this._r3Injector;
                    !t.destroyed && t.destroy(),
                        this.destroyCbs.forEach((t) => t()),
                        (this.destroyCbs = null);
                }
                onDestroy(t) {
                    this.destroyCbs.push(t);
                }
            }
            class Oa extends da {
                constructor(t) {
                    super(),
                        (this.moduleType = t),
                        null !== Bt(t) &&
                            (function (t) {
                                const e = new Set();
                                !(function t(n) {
                                    const r = Bt(n, !0),
                                        s = r.id;
                                    null !== s &&
                                        ((function (t, e, n) {
                                            if (e && e !== n)
                                                throw new Error(
                                                    `Duplicate module registered for ${t} - ${tt(
                                                        e
                                                    )} vs ${tt(e.name)}`
                                                );
                                        })(s, Ta.get(s), n),
                                        Ta.set(s, n));
                                    const i = Tr(r.imports);
                                    for (const o of i)
                                        e.has(o) || (e.add(o), t(o));
                                })(t);
                            })(t);
                }
                create(t) {
                    return new ka(this.moduleType, t);
                }
            }
            function Aa(t, e, n) {
                const r = Ne() + t,
                    s = Oe();
                return s[r] === ls
                    ? Ii(s, r, n ? e.call(n) : e())
                    : (function (t, e) {
                          return t[e];
                      })(s, r);
            }
            function Da(t, e, n, r) {
                return (function (t, e, n, r, s, i) {
                    const o = e + n;
                    return Ri(t, o, s)
                        ? Ii(t, o + 1, i ? r.call(i, s) : r(s))
                        : Ia(t, o + 1);
                })(Oe(), Ne(), t, e, n, r);
            }
            function Ia(t, e) {
                const n = t[e];
                return n === ls ? void 0 : n;
            }
            function Ra(t, e, n, r) {
                const s = t + Wt,
                    i = Oe(),
                    o = ve(i, s);
                return (function (t, e) {
                    return (
                        Oi.isWrapped(e) &&
                            ((e = Oi.unwrap(e)),
                            (t[Te.lFrame.bindingIndex] = ls)),
                        e
                    );
                })(
                    i,
                    (function (t, e) {
                        return t[1].data[e].pure;
                    })(i, s)
                        ? (function (t, e, n, r, s, i, o) {
                              const a = e + n;
                              return (function (t, e, n, r) {
                                  const s = Ri(t, e, n);
                                  return Ri(t, e + 1, r) || s;
                              })(t, a, s, i)
                                  ? Ii(t, a + 2, o ? r.call(o, s, i) : r(s, i))
                                  : Ia(t, a + 2);
                          })(i, Ne(), e, o.transform, n, r, o)
                        : o.transform(n, r)
                );
            }
            const Pa = class extends S {
                constructor(t = !1) {
                    super(), (this.__isAsync = t);
                }
                emit(t) {
                    super.next(t);
                }
                subscribe(t, e, n) {
                    let r,
                        s = (t) => null,
                        i = () => null;
                    t && "object" == typeof t
                        ? ((r = this.__isAsync
                              ? (e) => {
                                    setTimeout(() => t.next(e));
                                }
                              : (e) => {
                                    t.next(e);
                                }),
                          t.error &&
                              (s = this.__isAsync
                                  ? (e) => {
                                        setTimeout(() => t.error(e));
                                    }
                                  : (e) => {
                                        t.error(e);
                                    }),
                          t.complete &&
                              (i = this.__isAsync
                                  ? () => {
                                        setTimeout(() => t.complete());
                                    }
                                  : () => {
                                        t.complete();
                                    }))
                        : ((r = this.__isAsync
                              ? (e) => {
                                    setTimeout(() => t(e));
                                }
                              : (e) => {
                                    t(e);
                                }),
                          e &&
                              (s = this.__isAsync
                                  ? (t) => {
                                        setTimeout(() => e(t));
                                    }
                                  : (t) => {
                                        e(t);
                                    }),
                          n &&
                              (i = this.__isAsync
                                  ? () => {
                                        setTimeout(() => n());
                                    }
                                  : () => {
                                        n();
                                    }));
                    const o = super.subscribe(r, s, i);
                    return t instanceof h && t.add(o), o;
                }
            };
            function Va() {
                return this._results[ki()]();
            }
            class ja {
                constructor() {
                    (this.dirty = !0),
                        (this._results = []),
                        (this.changes = new Pa()),
                        (this.length = 0);
                    const t = ki(),
                        e = ja.prototype;
                    e[t] || (e[t] = Va);
                }
                map(t) {
                    return this._results.map(t);
                }
                filter(t) {
                    return this._results.filter(t);
                }
                find(t) {
                    return this._results.find(t);
                }
                reduce(t, e) {
                    return this._results.reduce(t, e);
                }
                forEach(t) {
                    this._results.forEach(t);
                }
                some(t) {
                    return this._results.some(t);
                }
                toArray() {
                    return this._results.slice();
                }
                toString() {
                    return this._results.toString();
                }
                reset(t) {
                    (this._results = Zn(t)),
                        (this.dirty = !1),
                        (this.length = this._results.length),
                        (this.last = this._results[this.length - 1]),
                        (this.first = this._results[0]);
                }
                notifyOnChanges() {
                    this.changes.emit(this);
                }
                setDirty() {
                    this.dirty = !0;
                }
                destroy() {
                    this.changes.complete(), this.changes.unsubscribe();
                }
            }
            class Ma {
                constructor(t) {
                    (this.queryList = t), (this.matches = null);
                }
                clone() {
                    return new Ma(this.queryList);
                }
                setDirty() {
                    this.queryList.setDirty();
                }
            }
            class Na {
                constructor(t = []) {
                    this.queries = t;
                }
                createEmbeddedView(t) {
                    const e = t.queries;
                    if (null !== e) {
                        const n =
                                null !== t.contentQueries
                                    ? t.contentQueries[0]
                                    : e.length,
                            r = [];
                        for (let t = 0; t < n; t++) {
                            const n = e.getByIndex(t);
                            r.push(
                                this.queries[n.indexInDeclarationView].clone()
                            );
                        }
                        return new Na(r);
                    }
                    return null;
                }
                insertView(t) {
                    this.dirtyQueriesWithMatches(t);
                }
                detachView(t) {
                    this.dirtyQueriesWithMatches(t);
                }
                dirtyQueriesWithMatches(t) {
                    for (let e = 0; e < this.queries.length; e++)
                        null !== Ja(t, e).matches && this.queries[e].setDirty();
                }
            }
            class Ua {
                constructor(t, e, n, r = null) {
                    (this.predicate = t),
                        (this.descendants = e),
                        (this.isStatic = n),
                        (this.read = r);
                }
            }
            class La {
                constructor(t = []) {
                    this.queries = t;
                }
                elementStart(t, e) {
                    for (let n = 0; n < this.queries.length; n++)
                        this.queries[n].elementStart(t, e);
                }
                elementEnd(t) {
                    for (let e = 0; e < this.queries.length; e++)
                        this.queries[e].elementEnd(t);
                }
                embeddedTView(t) {
                    let e = null;
                    for (let n = 0; n < this.length; n++) {
                        const r = null !== e ? e.length : 0,
                            s = this.getByIndex(n).embeddedTView(t, r);
                        s &&
                            ((s.indexInDeclarationView = n),
                            null !== e ? e.push(s) : (e = [s]));
                    }
                    return null !== e ? new La(e) : null;
                }
                template(t, e) {
                    for (let n = 0; n < this.queries.length; n++)
                        this.queries[n].template(t, e);
                }
                getByIndex(t) {
                    return this.queries[t];
                }
                get length() {
                    return this.queries.length;
                }
                track(t) {
                    this.queries.push(t);
                }
            }
            class Fa {
                constructor(t, e = -1) {
                    (this.metadata = t),
                        (this.matches = null),
                        (this.indexInDeclarationView = -1),
                        (this.crossesNgTemplate = !1),
                        (this._appliesToNextNode = !0),
                        (this._declarationNodeIndex = e);
                }
                elementStart(t, e) {
                    this.isApplyingToNode(e) && this.matchTNode(t, e);
                }
                elementEnd(t) {
                    this._declarationNodeIndex === t.index &&
                        (this._appliesToNextNode = !1);
                }
                template(t, e) {
                    this.elementStart(t, e);
                }
                embeddedTView(t, e) {
                    return this.isApplyingToNode(t)
                        ? ((this.crossesNgTemplate = !0),
                          this.addMatch(-t.index, e),
                          new Fa(this.metadata))
                        : null;
                }
                isApplyingToNode(t) {
                    if (
                        this._appliesToNextNode &&
                        !1 === this.metadata.descendants
                    ) {
                        const e = this._declarationNodeIndex;
                        let n = t.parent;
                        for (; null !== n && 8 & n.type && n.index !== e; )
                            n = n.parent;
                        return e === (null !== n ? n.index : -1);
                    }
                    return this._appliesToNextNode;
                }
                matchTNode(t, e) {
                    const n = this.metadata.predicate;
                    if (Array.isArray(n))
                        for (let r = 0; r < n.length; r++) {
                            const s = n[r];
                            this.matchTNodeWithReadOption(t, e, Ha(e, s)),
                                this.matchTNodeWithReadOption(
                                    t,
                                    e,
                                    In(e, t, s, !1, !1)
                                );
                        }
                    else
                        n === aa
                            ? 4 & e.type &&
                              this.matchTNodeWithReadOption(t, e, -1)
                            : this.matchTNodeWithReadOption(
                                  t,
                                  e,
                                  In(e, t, n, !1, !1)
                              );
                }
                matchTNodeWithReadOption(t, e, n) {
                    if (null !== n) {
                        const r = this.metadata.read;
                        if (null !== r)
                            if (
                                r === Po ||
                                r === fa ||
                                (r === aa && 4 & e.type)
                            )
                                this.addMatch(e.index, -2);
                            else {
                                const n = In(e, t, r, !1, !1);
                                null !== n && this.addMatch(e.index, n);
                            }
                        else this.addMatch(e.index, n);
                    }
                }
                addMatch(t, e) {
                    null === this.matches
                        ? (this.matches = [t, e])
                        : this.matches.push(t, e);
                }
            }
            function Ha(t, e) {
                const n = t.localNames;
                if (null !== n)
                    for (let r = 0; r < n.length; r += 2)
                        if (n[r] === e) return n[r + 1];
                return null;
            }
            function za(t, e, n, r) {
                return -1 === n
                    ? (function (t, e) {
                          return 11 & t.type
                              ? Io(t, e)
                              : 4 & t.type
                              ? ua(t, e)
                              : null;
                      })(e, t)
                    : -2 === n
                    ? (function (t, e, n) {
                          return n === Po
                              ? Io(e, t)
                              : n === aa
                              ? ua(e, t)
                              : n === fa
                              ? _a(e, t)
                              : void 0;
                      })(t, e, r)
                    : Rn(t, t[1], n, e);
            }
            function $a(t, e, n, r) {
                const s = e[19].queries[r];
                if (null === s.matches) {
                    const r = t.data,
                        i = n.matches,
                        o = [];
                    for (let t = 0; t < i.length; t += 2) {
                        const s = i[t];
                        o.push(
                            s < 0
                                ? null
                                : za(e, r[s], i[t + 1], n.metadata.read)
                        );
                    }
                    s.matches = o;
                }
                return s.matches;
            }
            function qa(t, e, n, r) {
                const s = t.queries.getByIndex(n),
                    i = s.matches;
                if (null !== i) {
                    const o = $a(t, e, s, n);
                    for (let t = 0; t < i.length; t += 2) {
                        const n = i[t];
                        if (n > 0) r.push(o[t / 2]);
                        else {
                            const s = i[t + 1],
                                o = e[-n];
                            for (let t = Zt; t < o.length; t++) {
                                const e = o[t];
                                e[17] === e[3] && qa(e[1], e, s, r);
                            }
                            if (null !== o[9]) {
                                const t = o[9];
                                for (let e = 0; e < t.length; e++) {
                                    const n = t[e];
                                    qa(n[1], n, s, r);
                                }
                            }
                        }
                    }
                }
                return r;
            }
            function Ba(t) {
                const e = Oe(),
                    n = Ae(),
                    r = He();
                ze(r + 1);
                const s = Ja(n, r);
                if (t.dirty && we(e) === s.metadata.isStatic) {
                    if (null === s.matches) t.reset([]);
                    else {
                        const i = s.crossesNgTemplate
                            ? qa(n, e, r, [])
                            : $a(n, e, s, r);
                        t.reset(i), t.notifyOnChanges();
                    }
                    return !0;
                }
                return !1;
            }
            function Wa(t, e, n) {
                !(function (t, e, n, r, s, i) {
                    t.firstCreatePass && Ka(t, new Ua(n, r, false, s), -1),
                        Qa(t, e);
                })(Ae(), Oe(), t, e, n);
            }
            function Za(t, e, n, r) {
                !(function (t, e, n, r, s, i, o, a) {
                    t.firstCreatePass &&
                        (Ka(t, new Ua(n, r, false, s), o.index),
                        (function (t, e) {
                            const n =
                                t.contentQueries || (t.contentQueries = []);
                            e !== (n.length ? n[n.length - 1] : -1) &&
                                n.push(t.queries.length - 1, e);
                        })(t, a)),
                        Qa(t, e);
                })(Ae(), Oe(), e, n, r, 0, Ie(), t);
            }
            function Ga() {
                return (t = Oe()), (e = He()), t[19].queries[e].queryList;
                var t, e;
            }
            function Qa(t, e) {
                const n = new ja();
                As(t, e, n, n.destroy),
                    null === e[19] && (e[19] = new Na()),
                    e[19].queries.push(new Ma(n));
            }
            function Ka(t, e, n) {
                null === t.queries && (t.queries = new La()),
                    t.queries.track(new Fa(e, n));
            }
            function Ja(t, e) {
                return t.queries.getByIndex(e);
            }
            const Ya = $n("Input", (t) => ({ bindingPropertyName: t })),
                Xa = $n("Output", (t) => ({ bindingPropertyName: t })),
                tl = new qn("Application Initializer");
            let el = (() => {
                class t {
                    constructor(t) {
                        (this.appInits = t),
                            (this.resolve = Do),
                            (this.reject = Do),
                            (this.initialized = !1),
                            (this.done = !1),
                            (this.donePromise = new Promise((t, e) => {
                                (this.resolve = t), (this.reject = e);
                            }));
                    }
                    runInitializers() {
                        if (this.initialized) return;
                        const t = [],
                            e = () => {
                                (this.done = !0), this.resolve();
                            };
                        if (this.appInits)
                            for (let n = 0; n < this.appInits.length; n++) {
                                const e = this.appInits[n]();
                                qi(e) && t.push(e);
                            }
                        Promise.all(t)
                            .then(() => {
                                e();
                            })
                            .catch((t) => {
                                this.reject(t);
                            }),
                            0 === t.length && e(),
                            (this.initialized = !0);
                    }
                }
                return (
                    (t.ɵfac = function (e) {
                        return new (e || t)(dr(tl, 8));
                    }),
                    (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
                    t
                );
            })();
            const nl = new qn("AppId"),
                rl = {
                    provide: nl,
                    useFactory: function () {
                        return `${sl()}${sl()}${sl()}`;
                    },
                    deps: [],
                };
            function sl() {
                return String.fromCharCode(97 + Math.floor(25 * Math.random()));
            }
            const il = new qn("Platform Initializer"),
                ol = new qn("Platform ID"),
                al = new qn("appBootstrapListener");
            let ll = (() => {
                class t {
                    log(t) {
                        console.log(t);
                    }
                    warn(t) {
                        console.warn(t);
                    }
                }
                return (
                    (t.ɵfac = function (e) {
                        return new (e || t)();
                    }),
                    (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
                    t
                );
            })();
            const cl = new qn("LocaleId"),
                ul = new qn("DefaultCurrencyCode");
            class hl {
                constructor(t, e) {
                    (this.ngModuleFactory = t), (this.componentFactories = e);
                }
            }
            const dl = function (t) {
                    return new Oa(t);
                },
                pl = dl,
                fl = function (t) {
                    return Promise.resolve(dl(t));
                },
                gl = function (t) {
                    const e = dl(t),
                        n = Tr(Bt(t).declarations).reduce((t, e) => {
                            const n = qt(e);
                            return n && t.push(new xa(n)), t;
                        }, []);
                    return new hl(e, n);
                },
                ml = gl,
                yl = function (t) {
                    return Promise.resolve(gl(t));
                };
            let vl = (() => {
                class t {
                    constructor() {
                        (this.compileModuleSync = pl),
                            (this.compileModuleAsync = fl),
                            (this.compileModuleAndAllComponentsSync = ml),
                            (this.compileModuleAndAllComponentsAsync = yl);
                    }
                    clearCache() {}
                    clearCacheFor(t) {}
                    getModuleId(t) {}
                }
                return (
                    (t.ɵfac = function (e) {
                        return new (e || t)();
                    }),
                    (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
                    t
                );
            })();
            const _l = (() => Promise.resolve(0))();
            function bl(t) {
                "undefined" == typeof Zone
                    ? _l.then(() => {
                          t && t.apply(null, null);
                      })
                    : Zone.current.scheduleMicroTask("scheduleMicrotask", t);
            }
            class wl {
                constructor({
                    enableLongStackTrace: t = !1,
                    shouldCoalesceEventChangeDetection: e = !1,
                }) {
                    if (
                        ((this.hasPendingMacrotasks = !1),
                        (this.hasPendingMicrotasks = !1),
                        (this.isStable = !0),
                        (this.onUnstable = new Pa(!1)),
                        (this.onMicrotaskEmpty = new Pa(!1)),
                        (this.onStable = new Pa(!1)),
                        (this.onError = new Pa(!1)),
                        "undefined" == typeof Zone)
                    )
                        throw new Error(
                            "In this configuration Angular requires Zone.js"
                        );
                    Zone.assertZonePatched();
                    const n = this;
                    (n._nesting = 0),
                        (n._outer = n._inner = Zone.current),
                        Zone.TaskTrackingZoneSpec &&
                            (n._inner = n._inner.fork(
                                new Zone.TaskTrackingZoneSpec()
                            )),
                        t &&
                            Zone.longStackTraceZoneSpec &&
                            (n._inner = n._inner.fork(
                                Zone.longStackTraceZoneSpec
                            )),
                        (n.shouldCoalesceEventChangeDetection = e),
                        (n.lastRequestAnimationFrameId = -1),
                        (n.nativeRequestAnimationFrame = (function () {
                            let t = Tt.requestAnimationFrame,
                                e = Tt.cancelAnimationFrame;
                            if ("undefined" != typeof Zone && t && e) {
                                const n =
                                    t[Zone.__symbol__("OriginalDelegate")];
                                n && (t = n);
                                const r =
                                    e[Zone.__symbol__("OriginalDelegate")];
                                r && (e = r);
                            }
                            return {
                                nativeRequestAnimationFrame: t,
                                nativeCancelAnimationFrame: e,
                            };
                        })().nativeRequestAnimationFrame),
                        (function (t) {
                            const e =
                                !!t.shouldCoalesceEventChangeDetection &&
                                t.nativeRequestAnimationFrame &&
                                (() => {
                                    !(function (t) {
                                        -1 === t.lastRequestAnimationFrameId &&
                                            ((t.lastRequestAnimationFrameId =
                                                t.nativeRequestAnimationFrame.call(
                                                    Tt,
                                                    () => {
                                                        t.fakeTopEventTask ||
                                                            (t.fakeTopEventTask =
                                                                Zone.root.scheduleEventTask(
                                                                    "fakeTopEventTask",
                                                                    () => {
                                                                        (t.lastRequestAnimationFrameId =
                                                                            -1),
                                                                            xl(
                                                                                t
                                                                            ),
                                                                            Sl(
                                                                                t
                                                                            );
                                                                    },
                                                                    void 0,
                                                                    () => {},
                                                                    () => {}
                                                                )),
                                                            t.fakeTopEventTask.invoke();
                                                    }
                                                )),
                                            xl(t));
                                    })(t);
                                });
                            t._inner = t._inner.fork({
                                name: "angular",
                                properties: {
                                    isAngularZone: !0,
                                    maybeDelayChangeDetection: e,
                                },
                                onInvokeTask: (n, r, s, i, o, a) => {
                                    try {
                                        return El(t), n.invokeTask(s, i, o, a);
                                    } finally {
                                        e && "eventTask" === i.type && e(),
                                            Tl(t);
                                    }
                                },
                                onInvoke: (e, n, r, s, i, o, a) => {
                                    try {
                                        return El(t), e.invoke(r, s, i, o, a);
                                    } finally {
                                        Tl(t);
                                    }
                                },
                                onHasTask: (e, n, r, s) => {
                                    e.hasTask(r, s),
                                        n === r &&
                                            ("microTask" == s.change
                                                ? ((t._hasPendingMicrotasks =
                                                      s.microTask),
                                                  xl(t),
                                                  Sl(t))
                                                : "macroTask" == s.change &&
                                                  (t.hasPendingMacrotasks =
                                                      s.macroTask));
                                },
                                onHandleError: (e, n, r, s) => (
                                    e.handleError(r, s),
                                    t.runOutsideAngular(() =>
                                        t.onError.emit(s)
                                    ),
                                    !1
                                ),
                            });
                        })(n);
                }
                static isInAngularZone() {
                    return !0 === Zone.current.get("isAngularZone");
                }
                static assertInAngularZone() {
                    if (!wl.isInAngularZone())
                        throw new Error(
                            "Expected to be in Angular Zone, but it is not!"
                        );
                }
                static assertNotInAngularZone() {
                    if (wl.isInAngularZone())
                        throw new Error(
                            "Expected to not be in Angular Zone, but it is!"
                        );
                }
                run(t, e, n) {
                    return this._inner.run(t, e, n);
                }
                runTask(t, e, n, r) {
                    const s = this._inner,
                        i = s.scheduleEventTask(
                            "NgZoneEvent: " + r,
                            t,
                            Cl,
                            Do,
                            Do
                        );
                    try {
                        return s.runTask(i, e, n);
                    } finally {
                        s.cancelTask(i);
                    }
                }
                runGuarded(t, e, n) {
                    return this._inner.runGuarded(t, e, n);
                }
                runOutsideAngular(t) {
                    return this._outer.run(t);
                }
            }
            const Cl = {};
            function Sl(t) {
                if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable)
                    try {
                        t._nesting++, t.onMicrotaskEmpty.emit(null);
                    } finally {
                        if ((t._nesting--, !t.hasPendingMicrotasks))
                            try {
                                t.runOutsideAngular(() =>
                                    t.onStable.emit(null)
                                );
                            } finally {
                                t.isStable = !0;
                            }
                    }
            }
            function xl(t) {
                t.hasPendingMicrotasks = !!(
                    t._hasPendingMicrotasks ||
                    (t.shouldCoalesceEventChangeDetection &&
                        -1 !== t.lastRequestAnimationFrameId)
                );
            }
            function El(t) {
                t._nesting++,
                    t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
            }
            function Tl(t) {
                t._nesting--, Sl(t);
            }
            class kl {
                constructor() {
                    (this.hasPendingMicrotasks = !1),
                        (this.hasPendingMacrotasks = !1),
                        (this.isStable = !0),
                        (this.onUnstable = new Pa()),
                        (this.onMicrotaskEmpty = new Pa()),
                        (this.onStable = new Pa()),
                        (this.onError = new Pa());
                }
                run(t, e, n) {
                    return t.apply(e, n);
                }
                runGuarded(t, e, n) {
                    return t.apply(e, n);
                }
                runOutsideAngular(t) {
                    return t();
                }
                runTask(t, e, n, r) {
                    return t.apply(e, n);
                }
            }
            let Ol = (() => {
                    class t {
                        constructor(t) {
                            (this._ngZone = t),
                                (this._pendingCount = 0),
                                (this._isZoneStable = !0),
                                (this._didWork = !1),
                                (this._callbacks = []),
                                (this.taskTrackingZone = null),
                                this._watchAngularEvents(),
                                t.run(() => {
                                    this.taskTrackingZone =
                                        "undefined" == typeof Zone
                                            ? null
                                            : Zone.current.get(
                                                  "TaskTrackingZone"
                                              );
                                });
                        }
                        _watchAngularEvents() {
                            this._ngZone.onUnstable.subscribe({
                                next: () => {
                                    (this._didWork = !0),
                                        (this._isZoneStable = !1);
                                },
                            }),
                                this._ngZone.runOutsideAngular(() => {
                                    this._ngZone.onStable.subscribe({
                                        next: () => {
                                            wl.assertNotInAngularZone(),
                                                bl(() => {
                                                    (this._isZoneStable = !0),
                                                        this._runCallbacksIfReady();
                                                });
                                        },
                                    });
                                });
                        }
                        increasePendingRequestCount() {
                            return (
                                (this._pendingCount += 1),
                                (this._didWork = !0),
                                this._pendingCount
                            );
                        }
                        decreasePendingRequestCount() {
                            if (
                                ((this._pendingCount -= 1),
                                this._pendingCount < 0)
                            )
                                throw new Error(
                                    "pending async requests below zero"
                                );
                            return (
                                this._runCallbacksIfReady(), this._pendingCount
                            );
                        }
                        isStable() {
                            return (
                                this._isZoneStable &&
                                0 === this._pendingCount &&
                                !this._ngZone.hasPendingMacrotasks
                            );
                        }
                        _runCallbacksIfReady() {
                            if (this.isStable())
                                bl(() => {
                                    for (; 0 !== this._callbacks.length; ) {
                                        let t = this._callbacks.pop();
                                        clearTimeout(t.timeoutId),
                                            t.doneCb(this._didWork);
                                    }
                                    this._didWork = !1;
                                });
                            else {
                                let t = this.getPendingTasks();
                                (this._callbacks = this._callbacks.filter(
                                    (e) =>
                                        !e.updateCb ||
                                        !e.updateCb(t) ||
                                        (clearTimeout(e.timeoutId), !1)
                                )),
                                    (this._didWork = !0);
                            }
                        }
                        getPendingTasks() {
                            return this.taskTrackingZone
                                ? this.taskTrackingZone.macroTasks.map((t) => ({
                                      source: t.source,
                                      creationLocation: t.creationLocation,
                                      data: t.data,
                                  }))
                                : [];
                        }
                        addCallback(t, e, n) {
                            let r = -1;
                            e &&
                                e > 0 &&
                                (r = setTimeout(() => {
                                    (this._callbacks = this._callbacks.filter(
                                        (t) => t.timeoutId !== r
                                    )),
                                        t(
                                            this._didWork,
                                            this.getPendingTasks()
                                        );
                                }, e)),
                                this._callbacks.push({
                                    doneCb: t,
                                    timeoutId: r,
                                    updateCb: n,
                                });
                        }
                        whenStable(t, e, n) {
                            if (n && !this.taskTrackingZone)
                                throw new Error(
                                    'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?'
                                );
                            this.addCallback(t, e, n),
                                this._runCallbacksIfReady();
                        }
                        getPendingRequestCount() {
                            return this._pendingCount;
                        }
                        findProviders(t, e, n) {
                            return [];
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)(dr(wl));
                        }),
                        (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
                        t
                    );
                })(),
                Al = (() => {
                    class t {
                        constructor() {
                            (this._applications = new Map()),
                                Rl.addToWindow(this);
                        }
                        registerApplication(t, e) {
                            this._applications.set(t, e);
                        }
                        unregisterApplication(t) {
                            this._applications.delete(t);
                        }
                        unregisterAllApplications() {
                            this._applications.clear();
                        }
                        getTestability(t) {
                            return this._applications.get(t) || null;
                        }
                        getAllTestabilities() {
                            return Array.from(this._applications.values());
                        }
                        getAllRootElements() {
                            return Array.from(this._applications.keys());
                        }
                        findTestabilityInTree(t, e = !0) {
                            return Rl.findTestabilityInTree(this, t, e);
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)();
                        }),
                        (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
                        t
                    );
                })();
            class Dl {
                addToWindow(t) {}
                findTestabilityInTree(t, e, n) {
                    return null;
                }
            }
            let Il,
                Rl = new Dl(),
                Pl = !0,
                Vl = !1;
            function jl() {
                return (Vl = !0), Pl;
            }
            const Ml = new qn("AllowMultipleToken");
            class Nl {
                constructor(t, e) {
                    (this.name = t), (this.token = e);
                }
            }
            function Ul(t, e, n = []) {
                const r = "Platform: " + e,
                    s = new qn(r);
                return (e = []) => {
                    let i = Ll();
                    if (!i || i.injector.get(Ml, !1))
                        if (t)
                            t(n.concat(e).concat({ provide: s, useValue: !0 }));
                        else {
                            const t = n
                                .concat(e)
                                .concat(
                                    { provide: s, useValue: !0 },
                                    { provide: ii, useValue: "platform" }
                                );
                            !(function (t) {
                                if (
                                    Il &&
                                    !Il.destroyed &&
                                    !Il.injector.get(Ml, !1)
                                )
                                    throw new Error(
                                        "There can be only one platform. Destroy the previous one to create a new one."
                                    );
                                Il = t.get(Fl);
                                const e = t.get(il, null);
                                e && e.forEach((t) => t());
                            })(_i.create({ providers: t, name: r }));
                        }
                    return (function (t) {
                        const e = Ll();
                        if (!e) throw new Error("No platform exists!");
                        if (!e.injector.get(t, null))
                            throw new Error(
                                "A platform with a different configuration has been created. Please destroy it first."
                            );
                        return e;
                    })(s);
                };
            }
            function Ll() {
                return Il && !Il.destroyed ? Il : null;
            }
            let Fl = (() => {
                class t {
                    constructor(t) {
                        (this._injector = t),
                            (this._modules = []),
                            (this._destroyListeners = []),
                            (this._destroyed = !1);
                    }
                    bootstrapModuleFactory(t, e) {
                        const n = (function (t, e) {
                                let n;
                                return (
                                    (n =
                                        "noop" === t
                                            ? new kl()
                                            : ("zone.js" === t ? void 0 : t) ||
                                              new wl({
                                                  enableLongStackTrace: jl(),
                                                  shouldCoalesceEventChangeDetection:
                                                      e,
                                              })),
                                    n
                                );
                            })(
                                e ? e.ngZone : void 0,
                                (e && e.ngZoneEventCoalescing) || !1
                            ),
                            r = [{ provide: wl, useValue: n }];
                        return n.run(() => {
                            const e = _i.create({
                                    providers: r,
                                    parent: this.injector,
                                    name: t.moduleType.name,
                                }),
                                s = t.create(e),
                                i = s.injector.get(Sr, null);
                            if (!i)
                                throw new Error(
                                    "No ErrorHandler. Is platform module (BrowserModule) included?"
                                );
                            return (
                                n.runOutsideAngular(() => {
                                    const t = n.onError.subscribe({
                                        next: (t) => {
                                            i.handleError(t);
                                        },
                                    });
                                    s.onDestroy(() => {
                                        $l(this._modules, s), t.unsubscribe();
                                    });
                                }),
                                (function (t, e, n) {
                                    try {
                                        const r = n();
                                        return qi(r)
                                            ? r.catch((n) => {
                                                  throw (
                                                      (e.runOutsideAngular(() =>
                                                          t.handleError(n)
                                                      ),
                                                      n)
                                                  );
                                              })
                                            : r;
                                    } catch (r) {
                                        throw (
                                            (e.runOutsideAngular(() =>
                                                t.handleError(r)
                                            ),
                                            r)
                                        );
                                    }
                                })(i, n, () => {
                                    const t = s.injector.get(el);
                                    return (
                                        t.runInitializers(),
                                        t.donePromise.then(
                                            () => (
                                                vo(
                                                    s.injector.get(cl, mo) || mo
                                                ),
                                                this._moduleDoBootstrap(s),
                                                s
                                            )
                                        )
                                    );
                                })
                            );
                        });
                    }
                    bootstrapModule(t, e = []) {
                        const n = Hl({}, e);
                        return (function (t, e, n) {
                            const r = new Oa(n);
                            return Promise.resolve(r);
                        })(0, 0, t).then((t) =>
                            this.bootstrapModuleFactory(t, n)
                        );
                    }
                    _moduleDoBootstrap(t) {
                        const e = t.injector.get(zl);
                        if (t._bootstrapComponents.length > 0)
                            t._bootstrapComponents.forEach((t) =>
                                e.bootstrap(t)
                            );
                        else {
                            if (!t.instance.ngDoBootstrap)
                                throw new Error(
                                    `The module ${tt(
                                        t.instance.constructor
                                    )} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.`
                                );
                            t.instance.ngDoBootstrap(e);
                        }
                        this._modules.push(t);
                    }
                    onDestroy(t) {
                        this._destroyListeners.push(t);
                    }
                    get injector() {
                        return this._injector;
                    }
                    destroy() {
                        if (this._destroyed)
                            throw new Error(
                                "The platform has already been destroyed!"
                            );
                        this._modules.slice().forEach((t) => t.destroy()),
                            this._destroyListeners.forEach((t) => t()),
                            (this._destroyed = !0);
                    }
                    get destroyed() {
                        return this._destroyed;
                    }
                }
                return (
                    (t.ɵfac = function (e) {
                        return new (e || t)(dr(_i));
                    }),
                    (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
                    t
                );
            })();
            function Hl(t, e) {
                return Array.isArray(e)
                    ? e.reduce(Hl, t)
                    : Object.assign(Object.assign({}, t), e);
            }
            let zl = (() => {
                class t {
                    constructor(t, e, n, r, s, i) {
                        (this._zone = t),
                            (this._console = e),
                            (this._injector = n),
                            (this._exceptionHandler = r),
                            (this._componentFactoryResolver = s),
                            (this._initStatus = i),
                            (this._bootstrapListeners = []),
                            (this._views = []),
                            (this._runningTick = !1),
                            (this._stable = !0),
                            (this.componentTypes = []),
                            (this.components = []),
                            (this._onMicrotaskEmptySubscription =
                                this._zone.onMicrotaskEmpty.subscribe({
                                    next: () => {
                                        this._zone.run(() => {
                                            this.tick();
                                        });
                                    },
                                }));
                        const o = new v((t) => {
                                (this._stable =
                                    this._zone.isStable &&
                                    !this._zone.hasPendingMacrotasks &&
                                    !this._zone.hasPendingMicrotasks),
                                    this._zone.runOutsideAngular(() => {
                                        t.next(this._stable), t.complete();
                                    });
                            }),
                            a = new v((t) => {
                                let e;
                                this._zone.runOutsideAngular(() => {
                                    e = this._zone.onStable.subscribe(() => {
                                        wl.assertNotInAngularZone(),
                                            bl(() => {
                                                this._stable ||
                                                    this._zone
                                                        .hasPendingMacrotasks ||
                                                    this._zone
                                                        .hasPendingMicrotasks ||
                                                    ((this._stable = !0),
                                                    t.next(!0));
                                            });
                                    });
                                });
                                const n = this._zone.onUnstable.subscribe(
                                    () => {
                                        wl.assertInAngularZone(),
                                            this._stable &&
                                                ((this._stable = !1),
                                                this._zone.runOutsideAngular(
                                                    () => {
                                                        t.next(!1);
                                                    }
                                                ));
                                    }
                                );
                                return () => {
                                    e.unsubscribe(), n.unsubscribe();
                                };
                            });
                        this.isStable = (function (...t) {
                            let e = Number.POSITIVE_INFINITY,
                                n = null,
                                r = t[t.length - 1];
                            return (
                                E(r)
                                    ? ((n = t.pop()),
                                      t.length > 1 &&
                                          "number" == typeof t[t.length - 1] &&
                                          (e = t.pop()))
                                    : "number" == typeof r && (e = t.pop()),
                                null === n &&
                                1 === t.length &&
                                t[0] instanceof v
                                    ? t[0]
                                    : $(e)(q(t, n))
                            );
                        })(
                            o,
                            a.pipe((t) => {
                                return B()(
                                    ((e = J),
                                    function (t) {
                                        let n;
                                        n =
                                            "function" == typeof e
                                                ? e
                                                : function () {
                                                      return e;
                                                  };
                                        const r = Object.create(t, Q);
                                        return (
                                            (r.source = t),
                                            (r.subjectFactory = n),
                                            r
                                        );
                                    })(t)
                                );
                                var e;
                            })
                        );
                    }
                    bootstrap(t, e) {
                        if (!this._initStatus.done)
                            throw new Error(
                                "Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module."
                            );
                        let n;
                        (n =
                            t instanceof ko
                                ? t
                                : this._componentFactoryResolver.resolveComponentFactory(
                                      t
                                  )),
                            this.componentTypes.push(n.componentType);
                        const r = n.isBoundToModule
                                ? void 0
                                : this._injector.get(ha),
                            s = n.create(_i.NULL, [], e || n.selector, r),
                            i = s.location.nativeElement,
                            o = s.injector.get(Ol, null),
                            a = o && s.injector.get(Al);
                        return (
                            o && a && a.registerApplication(i, o),
                            s.onDestroy(() => {
                                this.detachView(s.hostView),
                                    $l(this.components, s),
                                    a && a.unregisterApplication(i);
                            }),
                            this._loadComponent(s),
                            jl() &&
                                this._console.log(
                                    "Angular is running in development mode. Call enableProdMode() to enable production mode."
                                ),
                            s
                        );
                    }
                    tick() {
                        if (this._runningTick)
                            throw new Error(
                                "ApplicationRef.tick is called recursively"
                            );
                        try {
                            this._runningTick = !0;
                            for (let t of this._views) t.detectChanges();
                        } catch (t) {
                            this._zone.runOutsideAngular(() =>
                                this._exceptionHandler.handleError(t)
                            );
                        } finally {
                            this._runningTick = !1;
                        }
                    }
                    attachView(t) {
                        const e = t;
                        this._views.push(e), e.attachToAppRef(this);
                    }
                    detachView(t) {
                        const e = t;
                        $l(this._views, e), e.detachFromAppRef();
                    }
                    _loadComponent(t) {
                        this.attachView(t.hostView),
                            this.tick(),
                            this.components.push(t),
                            this._injector
                                .get(al, [])
                                .concat(this._bootstrapListeners)
                                .forEach((e) => e(t));
                    }
                    ngOnDestroy() {
                        this._views.slice().forEach((t) => t.destroy()),
                            this._onMicrotaskEmptySubscription.unsubscribe();
                    }
                    get viewCount() {
                        return this._views.length;
                    }
                }
                return (
                    (t.ɵfac = function (e) {
                        return new (e || t)(
                            dr(wl),
                            dr(ll),
                            dr(_i),
                            dr(Sr),
                            dr(Ao),
                            dr(el)
                        );
                    }),
                    (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
                    t
                );
            })();
            function $l(t, e) {
                const n = t.indexOf(e);
                n > -1 && t.splice(n, 1);
            }
            class ql {}
            class Bl {}
            const Wl = {
                factoryPathPrefix: "",
                factoryPathSuffix: ".ngfactory",
            };
            let Zl = (() => {
                class t {
                    constructor(t, e) {
                        (this._compiler = t), (this._config = e || Wl);
                    }
                    load(t) {
                        return this.loadAndCompile(t);
                    }
                    loadAndCompile(t) {
                        let [e, r] = t.split("#");
                        return (
                            void 0 === r && (r = "default"),
                            n("zn8P")(e)
                                .then((t) => t[r])
                                .then((t) => Gl(t, e, r))
                                .then((t) =>
                                    this._compiler.compileModuleAsync(t)
                                )
                        );
                    }
                    loadFactory(t) {
                        let [e, r] = t.split("#"),
                            s = "NgFactory";
                        return (
                            void 0 === r && ((r = "default"), (s = "")),
                            n("zn8P")(
                                this._config.factoryPathPrefix +
                                    e +
                                    this._config.factoryPathSuffix
                            )
                                .then((t) => t[r + s])
                                .then((t) => Gl(t, e, r))
                        );
                    }
                }
                return (
                    (t.ɵfac = function (e) {
                        return new (e || t)(dr(vl), dr(Bl, 8));
                    }),
                    (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
                    t
                );
            })();
            function Gl(t, e, n) {
                if (!t) throw new Error(`Cannot find '${n}' in '${e}'`);
                return t;
            }
            const Ql = Ul(null, "core", [
                    { provide: ol, useValue: "unknown" },
                    { provide: Fl, deps: [_i] },
                    { provide: Al, deps: [] },
                    { provide: ll, deps: [] },
                ]),
                Kl = [
                    {
                        provide: zl,
                        useClass: zl,
                        deps: [wl, ll, _i, Sr, Ao, el],
                    },
                    {
                        provide: Sa,
                        deps: [wl],
                        useFactory: function (t) {
                            let e = [];
                            return (
                                t.onStable.subscribe(() => {
                                    for (; e.length; ) e.pop()();
                                }),
                                function (t) {
                                    e.push(t);
                                }
                            );
                        },
                    },
                    { provide: el, useClass: el, deps: [[new er(), tl]] },
                    { provide: vl, useClass: vl, deps: [] },
                    rl,
                    {
                        provide: Ko,
                        useFactory: function () {
                            return sa;
                        },
                        deps: [],
                    },
                    {
                        provide: Jo,
                        useFactory: function () {
                            return ia;
                        },
                        deps: [],
                    },
                    {
                        provide: cl,
                        useFactory: function (t) {
                            return (
                                vo(
                                    (t =
                                        t ||
                                        ("undefined" != typeof $localize &&
                                            $localize.locale) ||
                                        mo)
                                ),
                                t
                            );
                        },
                        deps: [[new tr(cl), new er(), new rr()]],
                    },
                    { provide: ul, useValue: "USD" },
                ];
            let Jl = (() => {
                    class t {
                        constructor(t) {}
                    }
                    return (
                        (t.ɵmod = Ht({ type: t })),
                        (t.ɵinj = at({
                            factory: function (e) {
                                return new (e || t)(dr(zl));
                            },
                            providers: Kl,
                        })),
                        t
                    );
                })(),
                Yl = null;
            function Xl() {
                return Yl;
            }
            const tc = new qn("DocumentToken");
            let ec = (() => {
                class t {}
                return (
                    (t.ɵfac = function (e) {
                        return new (e || t)();
                    }),
                    (t.ɵprov = ot({
                        factory: nc,
                        token: t,
                        providedIn: "platform",
                    })),
                    t
                );
            })();
            function nc() {
                return dr(sc);
            }
            const rc = new qn("Location Initialized");
            let sc = (() => {
                class t extends ec {
                    constructor(t) {
                        super(), (this._doc = t), this._init();
                    }
                    _init() {
                        (this.location = Xl().getLocation()),
                            (this._history = Xl().getHistory());
                    }
                    getBaseHrefFromDOM() {
                        return Xl().getBaseHref(this._doc);
                    }
                    onPopState(t) {
                        Xl()
                            .getGlobalEventTarget(this._doc, "window")
                            .addEventListener("popstate", t, !1);
                    }
                    onHashChange(t) {
                        Xl()
                            .getGlobalEventTarget(this._doc, "window")
                            .addEventListener("hashchange", t, !1);
                    }
                    get href() {
                        return this.location.href;
                    }
                    get protocol() {
                        return this.location.protocol;
                    }
                    get hostname() {
                        return this.location.hostname;
                    }
                    get port() {
                        return this.location.port;
                    }
                    get pathname() {
                        return this.location.pathname;
                    }
                    get search() {
                        return this.location.search;
                    }
                    get hash() {
                        return this.location.hash;
                    }
                    set pathname(t) {
                        this.location.pathname = t;
                    }
                    pushState(t, e, n) {
                        ic()
                            ? this._history.pushState(t, e, n)
                            : (this.location.hash = n);
                    }
                    replaceState(t, e, n) {
                        ic()
                            ? this._history.replaceState(t, e, n)
                            : (this.location.hash = n);
                    }
                    forward() {
                        this._history.forward();
                    }
                    back() {
                        this._history.back();
                    }
                    getState() {
                        return this._history.state;
                    }
                }
                return (
                    (t.ɵfac = function (e) {
                        return new (e || t)(dr(tc));
                    }),
                    (t.ɵprov = ot({
                        factory: oc,
                        token: t,
                        providedIn: "platform",
                    })),
                    t
                );
            })();
            function ic() {
                return !!window.history.pushState;
            }
            function oc() {
                return new sc(dr(tc));
            }
            function ac(t, e) {
                if (0 == t.length) return e;
                if (0 == e.length) return t;
                let n = 0;
                return (
                    t.endsWith("/") && n++,
                    e.startsWith("/") && n++,
                    2 == n ? t + e.substring(1) : 1 == n ? t + e : t + "/" + e
                );
            }
            function lc(t) {
                const e = t.match(/#|\?|$/),
                    n = (e && e.index) || t.length;
                return t.slice(0, n - ("/" === t[n - 1] ? 1 : 0)) + t.slice(n);
            }
            function cc(t) {
                return t && "?" !== t[0] ? "?" + t : t;
            }
            let uc = (() => {
                class t {}
                return (
                    (t.ɵfac = function (e) {
                        return new (e || t)();
                    }),
                    (t.ɵprov = ot({
                        factory: hc,
                        token: t,
                        providedIn: "root",
                    })),
                    t
                );
            })();
            function hc(t) {
                const e = dr(tc).location;
                return new pc(dr(ec), (e && e.origin) || "");
            }
            const dc = new qn("appBaseHref");
            let pc = (() => {
                    class t extends uc {
                        constructor(t, e) {
                            if (
                                (super(),
                                (this._platformLocation = t),
                                null == e &&
                                    (e =
                                        this._platformLocation.getBaseHrefFromDOM()),
                                null == e)
                            )
                                throw new Error(
                                    "No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document."
                                );
                            this._baseHref = e;
                        }
                        onPopState(t) {
                            this._platformLocation.onPopState(t),
                                this._platformLocation.onHashChange(t);
                        }
                        getBaseHref() {
                            return this._baseHref;
                        }
                        prepareExternalUrl(t) {
                            return ac(this._baseHref, t);
                        }
                        path(t = !1) {
                            const e =
                                    this._platformLocation.pathname +
                                    cc(this._platformLocation.search),
                                n = this._platformLocation.hash;
                            return n && t ? `${e}${n}` : e;
                        }
                        pushState(t, e, n, r) {
                            const s = this.prepareExternalUrl(n + cc(r));
                            this._platformLocation.pushState(t, e, s);
                        }
                        replaceState(t, e, n, r) {
                            const s = this.prepareExternalUrl(n + cc(r));
                            this._platformLocation.replaceState(t, e, s);
                        }
                        forward() {
                            this._platformLocation.forward();
                        }
                        back() {
                            this._platformLocation.back();
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)(dr(ec), dr(dc, 8));
                        }),
                        (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
                        t
                    );
                })(),
                fc = (() => {
                    class t extends uc {
                        constructor(t, e) {
                            super(),
                                (this._platformLocation = t),
                                (this._baseHref = ""),
                                null != e && (this._baseHref = e);
                        }
                        onPopState(t) {
                            this._platformLocation.onPopState(t),
                                this._platformLocation.onHashChange(t);
                        }
                        getBaseHref() {
                            return this._baseHref;
                        }
                        path(t = !1) {
                            let e = this._platformLocation.hash;
                            return (
                                null == e && (e = "#"),
                                e.length > 0 ? e.substring(1) : e
                            );
                        }
                        prepareExternalUrl(t) {
                            const e = ac(this._baseHref, t);
                            return e.length > 0 ? "#" + e : e;
                        }
                        pushState(t, e, n, r) {
                            let s = this.prepareExternalUrl(n + cc(r));
                            0 == s.length &&
                                (s = this._platformLocation.pathname),
                                this._platformLocation.pushState(t, e, s);
                        }
                        replaceState(t, e, n, r) {
                            let s = this.prepareExternalUrl(n + cc(r));
                            0 == s.length &&
                                (s = this._platformLocation.pathname),
                                this._platformLocation.replaceState(t, e, s);
                        }
                        forward() {
                            this._platformLocation.forward();
                        }
                        back() {
                            this._platformLocation.back();
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)(dr(ec), dr(dc, 8));
                        }),
                        (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
                        t
                    );
                })(),
                gc = (() => {
                    class t {
                        constructor(t, e) {
                            (this._subject = new Pa()),
                                (this._urlChangeListeners = []),
                                (this._platformStrategy = t);
                            const n = this._platformStrategy.getBaseHref();
                            (this._platformLocation = e),
                                (this._baseHref = lc(yc(n))),
                                this._platformStrategy.onPopState((t) => {
                                    this._subject.emit({
                                        url: this.path(!0),
                                        pop: !0,
                                        state: t.state,
                                        type: t.type,
                                    });
                                });
                        }
                        path(t = !1) {
                            return this.normalize(
                                this._platformStrategy.path(t)
                            );
                        }
                        getState() {
                            return this._platformLocation.getState();
                        }
                        isCurrentPathEqualTo(t, e = "") {
                            return this.path() == this.normalize(t + cc(e));
                        }
                        normalize(e) {
                            return t.stripTrailingSlash(
                                (function (t, e) {
                                    return t && e.startsWith(t)
                                        ? e.substring(t.length)
                                        : e;
                                })(this._baseHref, yc(e))
                            );
                        }
                        prepareExternalUrl(t) {
                            return (
                                t && "/" !== t[0] && (t = "/" + t),
                                this._platformStrategy.prepareExternalUrl(t)
                            );
                        }
                        go(t, e = "", n = null) {
                            this._platformStrategy.pushState(n, "", t, e),
                                this._notifyUrlChangeListeners(
                                    this.prepareExternalUrl(t + cc(e)),
                                    n
                                );
                        }
                        replaceState(t, e = "", n = null) {
                            this._platformStrategy.replaceState(n, "", t, e),
                                this._notifyUrlChangeListeners(
                                    this.prepareExternalUrl(t + cc(e)),
                                    n
                                );
                        }
                        forward() {
                            this._platformStrategy.forward();
                        }
                        back() {
                            this._platformStrategy.back();
                        }
                        onUrlChange(t) {
                            this._urlChangeListeners.push(t),
                                this._urlChangeSubscription ||
                                    (this._urlChangeSubscription =
                                        this.subscribe((t) => {
                                            this._notifyUrlChangeListeners(
                                                t.url,
                                                t.state
                                            );
                                        }));
                        }
                        _notifyUrlChangeListeners(t = "", e) {
                            this._urlChangeListeners.forEach((n) => n(t, e));
                        }
                        subscribe(t, e, n) {
                            return this._subject.subscribe({
                                next: t,
                                error: e,
                                complete: n,
                            });
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)(dr(uc), dr(ec));
                        }),
                        (t.normalizeQueryParams = cc),
                        (t.joinWithSlash = ac),
                        (t.stripTrailingSlash = lc),
                        (t.ɵprov = ot({
                            factory: mc,
                            token: t,
                            providedIn: "root",
                        })),
                        t
                    );
                })();
            function mc() {
                return new gc(dr(uc), dr(ec));
            }
            function yc(t) {
                return t.replace(/\/index.html$/, "");
            }
            var vc = (function (t) {
                return (
                    (t[(t.Zero = 0)] = "Zero"),
                    (t[(t.One = 1)] = "One"),
                    (t[(t.Two = 2)] = "Two"),
                    (t[(t.Few = 3)] = "Few"),
                    (t[(t.Many = 4)] = "Many"),
                    (t[(t.Other = 5)] = "Other"),
                    t
                );
            })({});
            class _c {}
            let bc = (() => {
                class t extends _c {
                    constructor(t) {
                        super(), (this.locale = t);
                    }
                    getPluralCategory(t, e) {
                        switch (
                            (function (t) {
                                return (function (t) {
                                    const e = (function (t) {
                                        return t
                                            .toLowerCase()
                                            .replace(/_/g, "-");
                                    })(t);
                                    let n = fo(e);
                                    if (n) return n;
                                    const r = e.split("-")[0];
                                    if (((n = fo(r)), n)) return n;
                                    if ("en" === r) return ho;
                                    throw new Error(
                                        `Missing locale data for the locale "${t}".`
                                    );
                                })(t)[go.PluralCase];
                            })(e || this.locale)(t)
                        ) {
                            case vc.Zero:
                                return "zero";
                            case vc.One:
                                return "one";
                            case vc.Two:
                                return "two";
                            case vc.Few:
                                return "few";
                            case vc.Many:
                                return "many";
                            default:
                                return "other";
                        }
                    }
                }
                return (
                    (t.ɵfac = function (e) {
                        return new (e || t)(dr(cl));
                    }),
                    (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
                    t
                );
            })();
            function wc(t, e) {
                e = encodeURIComponent(e);
                for (const n of t.split(";")) {
                    const t = n.indexOf("="),
                        [r, s] =
                            -1 == t ? [n, ""] : [n.slice(0, t), n.slice(t + 1)];
                    if (r.trim() === e) return decodeURIComponent(s);
                }
                return null;
            }
            class Cc {
                constructor(t, e, n, r) {
                    (this.$implicit = t),
                        (this.ngForOf = e),
                        (this.index = n),
                        (this.count = r);
                }
                get first() {
                    return 0 === this.index;
                }
                get last() {
                    return this.index === this.count - 1;
                }
                get even() {
                    return this.index % 2 == 0;
                }
                get odd() {
                    return !this.even;
                }
            }
            let Sc = (() => {
                class t {
                    constructor(t, e, n) {
                        (this._viewContainer = t),
                            (this._template = e),
                            (this._differs = n),
                            (this._ngForOf = null),
                            (this._ngForOfDirty = !0),
                            (this._differ = null);
                    }
                    set ngForOf(t) {
                        (this._ngForOf = t), (this._ngForOfDirty = !0);
                    }
                    set ngForTrackBy(t) {
                        this._trackByFn = t;
                    }
                    get ngForTrackBy() {
                        return this._trackByFn;
                    }
                    set ngForTemplate(t) {
                        t && (this._template = t);
                    }
                    ngDoCheck() {
                        if (this._ngForOfDirty) {
                            this._ngForOfDirty = !1;
                            const n = this._ngForOf;
                            if (!this._differ && n)
                                try {
                                    this._differ = this._differs
                                        .find(n)
                                        .create(this.ngForTrackBy);
                                } catch (e) {
                                    throw new Error(
                                        `Cannot find a differ supporting object '${n}' of type '${
                                            ((t = n), t.name || typeof t)
                                        }'. NgFor only supports binding to Iterables such as Arrays.`
                                    );
                                }
                        }
                        var t;
                        if (this._differ) {
                            const t = this._differ.diff(this._ngForOf);
                            t && this._applyChanges(t);
                        }
                    }
                    _applyChanges(t) {
                        const e = [];
                        t.forEachOperation((t, n, r) => {
                            if (null == t.previousIndex) {
                                const n =
                                        this._viewContainer.createEmbeddedView(
                                            this._template,
                                            new Cc(null, this._ngForOf, -1, -1),
                                            null === r ? void 0 : r
                                        ),
                                    s = new xc(t, n);
                                e.push(s);
                            } else if (null == r)
                                this._viewContainer.remove(
                                    null === n ? void 0 : n
                                );
                            else if (null !== n) {
                                const s = this._viewContainer.get(n);
                                this._viewContainer.move(s, r);
                                const i = new xc(t, s);
                                e.push(i);
                            }
                        });
                        for (let n = 0; n < e.length; n++)
                            this._perViewChange(e[n].view, e[n].record);
                        for (
                            let n = 0, r = this._viewContainer.length;
                            n < r;
                            n++
                        ) {
                            const t = this._viewContainer.get(n);
                            (t.context.index = n),
                                (t.context.count = r),
                                (t.context.ngForOf = this._ngForOf);
                        }
                        t.forEachIdentityChange((t) => {
                            this._viewContainer.get(
                                t.currentIndex
                            ).context.$implicit = t.item;
                        });
                    }
                    _perViewChange(t, e) {
                        t.context.$implicit = e.item;
                    }
                    static ngTemplateContextGuard(t, e) {
                        return !0;
                    }
                }
                return (
                    (t.ɵfac = function (e) {
                        return new (e || t)(Ni(fa), Ni(aa), Ni(Ko));
                    }),
                    (t.ɵdir = $t({
                        type: t,
                        selectors: [["", "ngFor", "", "ngForOf", ""]],
                        inputs: {
                            ngForOf: "ngForOf",
                            ngForTrackBy: "ngForTrackBy",
                            ngForTemplate: "ngForTemplate",
                        },
                    })),
                    t
                );
            })();
            class xc {
                constructor(t, e) {
                    (this.record = t), (this.view = e);
                }
            }
            let Ec = (() => {
                class t {
                    constructor(t, e) {
                        (this._viewContainer = t),
                            (this._context = new Tc()),
                            (this._thenTemplateRef = null),
                            (this._elseTemplateRef = null),
                            (this._thenViewRef = null),
                            (this._elseViewRef = null),
                            (this._thenTemplateRef = e);
                    }
                    set ngIf(t) {
                        (this._context.$implicit = this._context.ngIf = t),
                            this._updateView();
                    }
                    set ngIfThen(t) {
                        kc("ngIfThen", t),
                            (this._thenTemplateRef = t),
                            (this._thenViewRef = null),
                            this._updateView();
                    }
                    set ngIfElse(t) {
                        kc("ngIfElse", t),
                            (this._elseTemplateRef = t),
                            (this._elseViewRef = null),
                            this._updateView();
                    }
                    _updateView() {
                        this._context.$implicit
                            ? this._thenViewRef ||
                              (this._viewContainer.clear(),
                              (this._elseViewRef = null),
                              this._thenTemplateRef &&
                                  (this._thenViewRef =
                                      this._viewContainer.createEmbeddedView(
                                          this._thenTemplateRef,
                                          this._context
                                      )))
                            : this._elseViewRef ||
                              (this._viewContainer.clear(),
                              (this._thenViewRef = null),
                              this._elseTemplateRef &&
                                  (this._elseViewRef =
                                      this._viewContainer.createEmbeddedView(
                                          this._elseTemplateRef,
                                          this._context
                                      )));
                    }
                    static ngTemplateContextGuard(t, e) {
                        return !0;
                    }
                }
                return (
                    (t.ɵfac = function (e) {
                        return new (e || t)(Ni(fa), Ni(aa));
                    }),
                    (t.ɵdir = $t({
                        type: t,
                        selectors: [["", "ngIf", ""]],
                        inputs: {
                            ngIf: "ngIf",
                            ngIfThen: "ngIfThen",
                            ngIfElse: "ngIfElse",
                        },
                    })),
                    t
                );
            })();
            class Tc {
                constructor() {
                    (this.$implicit = null), (this.ngIf = null);
                }
            }
            function kc(t, e) {
                if (e && !e.createEmbeddedView)
                    throw new Error(
                        `${t} must be a TemplateRef, but received '${tt(e)}'.`
                    );
            }
            let Oc = (() => {
                    class t {}
                    return (
                        (t.ɵmod = Ht({ type: t })),
                        (t.ɵinj = at({
                            factory: function (e) {
                                return new (e || t)();
                            },
                            providers: [{ provide: _c, useClass: bc }],
                        })),
                        t
                    );
                })(),
                Ac = (() => {
                    class t {}
                    return (
                        (t.ɵprov = ot({
                            token: t,
                            providedIn: "root",
                            factory: () => new Dc(dr(tc), window),
                        })),
                        t
                    );
                })();
            class Dc {
                constructor(t, e) {
                    (this.document = t),
                        (this.window = e),
                        (this.offset = () => [0, 0]);
                }
                setOffset(t) {
                    this.offset = Array.isArray(t) ? () => t : t;
                }
                getScrollPosition() {
                    return this.supportsScrolling()
                        ? [this.window.pageXOffset, this.window.pageYOffset]
                        : [0, 0];
                }
                scrollToPosition(t) {
                    this.supportsScrolling() &&
                        this.window.scrollTo(t[0], t[1]);
                }
                scrollToAnchor(t) {
                    var e;
                    if (!this.supportsScrolling()) return;
                    const n =
                        null !== (e = this.document.getElementById(t)) &&
                        void 0 !== e
                            ? e
                            : this.document.getElementsByName(t)[0];
                    void 0 !== n &&
                        (this.scrollToElement(n), this.attemptFocus(n));
                }
                setHistoryScrollRestoration(t) {
                    if (this.supportScrollRestoration()) {
                        const e = this.window.history;
                        e && e.scrollRestoration && (e.scrollRestoration = t);
                    }
                }
                scrollToElement(t) {
                    const e = t.getBoundingClientRect(),
                        n = e.left + this.window.pageXOffset,
                        r = e.top + this.window.pageYOffset,
                        s = this.offset();
                    this.window.scrollTo(n - s[0], r - s[1]);
                }
                attemptFocus(t) {
                    return t.focus(), this.document.activeElement === t;
                }
                supportScrollRestoration() {
                    try {
                        if (!this.supportsScrolling()) return !1;
                        const t =
                            Ic(this.window.history) ||
                            Ic(Object.getPrototypeOf(this.window.history));
                        return !(!t || (!t.writable && !t.set));
                    } catch (t) {
                        return !1;
                    }
                }
                supportsScrolling() {
                    try {
                        return (
                            !!this.window &&
                            !!this.window.scrollTo &&
                            "pageXOffset" in this.window
                        );
                    } catch (t) {
                        return !1;
                    }
                }
            }
            function Ic(t) {
                return Object.getOwnPropertyDescriptor(t, "scrollRestoration");
            }
            class Rc extends class extends class {} {
                constructor() {
                    super();
                }
                supportsDOMEvents() {
                    return !0;
                }
            } {
                static makeCurrent() {
                    var t;
                    (t = new Rc()), Yl || (Yl = t);
                }
                getProperty(t, e) {
                    return t[e];
                }
                log(t) {
                    window.console &&
                        window.console.log &&
                        window.console.log(t);
                }
                logGroup(t) {
                    window.console &&
                        window.console.group &&
                        window.console.group(t);
                }
                logGroupEnd() {
                    window.console &&
                        window.console.groupEnd &&
                        window.console.groupEnd();
                }
                onAndCancel(t, e, n) {
                    return (
                        t.addEventListener(e, n, !1),
                        () => {
                            t.removeEventListener(e, n, !1);
                        }
                    );
                }
                dispatchEvent(t, e) {
                    t.dispatchEvent(e);
                }
                remove(t) {
                    return t.parentNode && t.parentNode.removeChild(t), t;
                }
                getValue(t) {
                    return t.value;
                }
                createElement(t, e) {
                    return (e = e || this.getDefaultDocument()).createElement(
                        t
                    );
                }
                createHtmlDocument() {
                    return document.implementation.createHTMLDocument(
                        "fakeTitle"
                    );
                }
                getDefaultDocument() {
                    return document;
                }
                isElementNode(t) {
                    return t.nodeType === Node.ELEMENT_NODE;
                }
                isShadowRoot(t) {
                    return t instanceof DocumentFragment;
                }
                getGlobalEventTarget(t, e) {
                    return "window" === e
                        ? window
                        : "document" === e
                        ? t
                        : "body" === e
                        ? t.body
                        : null;
                }
                getHistory() {
                    return window.history;
                }
                getLocation() {
                    return window.location;
                }
                getBaseHref(t) {
                    const e =
                        Vc || ((Vc = document.querySelector("base")), Vc)
                            ? Vc.getAttribute("href")
                            : null;
                    return null == e
                        ? null
                        : ((n = e),
                          Pc || (Pc = document.createElement("a")),
                          Pc.setAttribute("href", n),
                          "/" === Pc.pathname.charAt(0)
                              ? Pc.pathname
                              : "/" + Pc.pathname);
                    var n;
                }
                resetBaseElement() {
                    Vc = null;
                }
                getUserAgent() {
                    return window.navigator.userAgent;
                }
                performanceNow() {
                    return window.performance && window.performance.now
                        ? window.performance.now()
                        : new Date().getTime();
                }
                supportsCookies() {
                    return !0;
                }
                getCookie(t) {
                    return wc(document.cookie, t);
                }
            }
            let Pc,
                Vc = null;
            const jc = new qn("TRANSITION_ID"),
                Mc = [
                    {
                        provide: tl,
                        useFactory: function (t, e, n) {
                            return () => {
                                n.get(el).donePromise.then(() => {
                                    const n = Xl();
                                    Array.prototype.slice
                                        .apply(
                                            e.querySelectorAll(
                                                "style[ng-transition]"
                                            )
                                        )
                                        .filter(
                                            (e) =>
                                                e.getAttribute(
                                                    "ng-transition"
                                                ) === t
                                        )
                                        .forEach((t) => n.remove(t));
                                });
                            };
                        },
                        deps: [jc, tc, _i],
                        multi: !0,
                    },
                ];
            class Nc {
                static init() {
                    var t;
                    (t = new Nc()), (Rl = t);
                }
                addToWindow(t) {
                    (Tt.getAngularTestability = (e, n = !0) => {
                        const r = t.findTestabilityInTree(e, n);
                        if (null == r)
                            throw new Error(
                                "Could not find testability for element."
                            );
                        return r;
                    }),
                        (Tt.getAllAngularTestabilities = () =>
                            t.getAllTestabilities()),
                        (Tt.getAllAngularRootElements = () =>
                            t.getAllRootElements()),
                        Tt.frameworkStabilizers ||
                            (Tt.frameworkStabilizers = []),
                        Tt.frameworkStabilizers.push((t) => {
                            const e = Tt.getAllAngularTestabilities();
                            let n = e.length,
                                r = !1;
                            const s = function (e) {
                                (r = r || e), n--, 0 == n && t(r);
                            };
                            e.forEach(function (t) {
                                t.whenStable(s);
                            });
                        });
                }
                findTestabilityInTree(t, e, n) {
                    if (null == e) return null;
                    const r = t.getTestability(e);
                    return null != r
                        ? r
                        : n
                        ? Xl().isShadowRoot(e)
                            ? this.findTestabilityInTree(t, e.host, !0)
                            : this.findTestabilityInTree(t, e.parentElement, !0)
                        : null;
                }
            }
            const Uc = new qn("EventManagerPlugins");
            let Lc = (() => {
                class t {
                    constructor(t, e) {
                        (this._zone = e),
                            (this._eventNameToPlugin = new Map()),
                            t.forEach((t) => (t.manager = this)),
                            (this._plugins = t.slice().reverse());
                    }
                    addEventListener(t, e, n) {
                        return this._findPluginFor(e).addEventListener(t, e, n);
                    }
                    addGlobalEventListener(t, e, n) {
                        return this._findPluginFor(e).addGlobalEventListener(
                            t,
                            e,
                            n
                        );
                    }
                    getZone() {
                        return this._zone;
                    }
                    _findPluginFor(t) {
                        const e = this._eventNameToPlugin.get(t);
                        if (e) return e;
                        const n = this._plugins;
                        for (let r = 0; r < n.length; r++) {
                            const e = n[r];
                            if (e.supports(t))
                                return this._eventNameToPlugin.set(t, e), e;
                        }
                        throw new Error(
                            "No event manager plugin found for event " + t
                        );
                    }
                }
                return (
                    (t.ɵfac = function (e) {
                        return new (e || t)(dr(Uc), dr(wl));
                    }),
                    (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
                    t
                );
            })();
            class Fc {
                constructor(t) {
                    this._doc = t;
                }
                addGlobalEventListener(t, e, n) {
                    const r = Xl().getGlobalEventTarget(this._doc, t);
                    if (!r)
                        throw new Error(
                            `Unsupported event target ${r} for event ${e}`
                        );
                    return this.addEventListener(r, e, n);
                }
            }
            let Hc = (() => {
                    class t {
                        constructor() {
                            this._stylesSet = new Set();
                        }
                        addStyles(t) {
                            const e = new Set();
                            t.forEach((t) => {
                                this._stylesSet.has(t) ||
                                    (this._stylesSet.add(t), e.add(t));
                            }),
                                this.onStylesAdded(e);
                        }
                        onStylesAdded(t) {}
                        getAllStyles() {
                            return Array.from(this._stylesSet);
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)();
                        }),
                        (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
                        t
                    );
                })(),
                zc = (() => {
                    class t extends Hc {
                        constructor(t) {
                            super(),
                                (this._doc = t),
                                (this._hostNodes = new Set()),
                                (this._styleNodes = new Set()),
                                this._hostNodes.add(t.head);
                        }
                        _addStylesToHost(t, e) {
                            t.forEach((t) => {
                                const n = this._doc.createElement("style");
                                (n.textContent = t),
                                    this._styleNodes.add(e.appendChild(n));
                            });
                        }
                        addHost(t) {
                            this._addStylesToHost(this._stylesSet, t),
                                this._hostNodes.add(t);
                        }
                        removeHost(t) {
                            this._hostNodes.delete(t);
                        }
                        onStylesAdded(t) {
                            this._hostNodes.forEach((e) =>
                                this._addStylesToHost(t, e)
                            );
                        }
                        ngOnDestroy() {
                            this._styleNodes.forEach((t) => Xl().remove(t));
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)(dr(tc));
                        }),
                        (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
                        t
                    );
                })();
            const $c = {
                    svg: "http://www.w3.org/2000/svg",
                    xhtml: "http://www.w3.org/1999/xhtml",
                    xlink: "http://www.w3.org/1999/xlink",
                    xml: "http://www.w3.org/XML/1998/namespace",
                    xmlns: "http://www.w3.org/2000/xmlns/",
                },
                qc = /%COMP%/g;
            function Bc(t, e, n) {
                for (let r = 0; r < e.length; r++) {
                    let s = e[r];
                    Array.isArray(s)
                        ? Bc(t, s, n)
                        : ((s = s.replace(qc, t)), n.push(s));
                }
                return n;
            }
            function Wc(t) {
                return (e) => {
                    if ("__ngUnwrap__" === e) return t;
                    !1 === t(e) && (e.preventDefault(), (e.returnValue = !1));
                };
            }
            let Zc = (() => {
                class t {
                    constructor(t, e, n) {
                        (this.eventManager = t),
                            (this.sharedStylesHost = e),
                            (this.appId = n),
                            (this.rendererByCompId = new Map()),
                            (this.defaultRenderer = new Gc(t));
                    }
                    createRenderer(t, e) {
                        if (!t || !e) return this.defaultRenderer;
                        switch (e.encapsulation) {
                            case wt.Emulated: {
                                let n = this.rendererByCompId.get(e.id);
                                return (
                                    n ||
                                        ((n = new Qc(
                                            this.eventManager,
                                            this.sharedStylesHost,
                                            e,
                                            this.appId
                                        )),
                                        this.rendererByCompId.set(e.id, n)),
                                    n.applyToHost(t),
                                    n
                                );
                            }
                            case 1:
                            case wt.ShadowDom:
                                return new Kc(
                                    this.eventManager,
                                    this.sharedStylesHost,
                                    t,
                                    e
                                );
                            default:
                                if (!this.rendererByCompId.has(e.id)) {
                                    const t = Bc(e.id, e.styles, []);
                                    this.sharedStylesHost.addStyles(t),
                                        this.rendererByCompId.set(
                                            e.id,
                                            this.defaultRenderer
                                        );
                                }
                                return this.defaultRenderer;
                        }
                    }
                    begin() {}
                    end() {}
                }
                return (
                    (t.ɵfac = function (e) {
                        return new (e || t)(dr(Lc), dr(zc), dr(nl));
                    }),
                    (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
                    t
                );
            })();
            class Gc {
                constructor(t) {
                    (this.eventManager = t), (this.data = Object.create(null));
                }
                destroy() {}
                createElement(t, e) {
                    return e
                        ? document.createElementNS($c[e] || e, t)
                        : document.createElement(t);
                }
                createComment(t) {
                    return document.createComment(t);
                }
                createText(t) {
                    return document.createTextNode(t);
                }
                appendChild(t, e) {
                    t.appendChild(e);
                }
                insertBefore(t, e, n) {
                    t && t.insertBefore(e, n);
                }
                removeChild(t, e) {
                    t && t.removeChild(e);
                }
                selectRootElement(t, e) {
                    let n =
                        "string" == typeof t ? document.querySelector(t) : t;
                    if (!n)
                        throw new Error(
                            `The selector "${t}" did not match any elements`
                        );
                    return e || (n.textContent = ""), n;
                }
                parentNode(t) {
                    return t.parentNode;
                }
                nextSibling(t) {
                    return t.nextSibling;
                }
                setAttribute(t, e, n, r) {
                    if (r) {
                        e = r + ":" + e;
                        const s = $c[r];
                        s ? t.setAttributeNS(s, e, n) : t.setAttribute(e, n);
                    } else t.setAttribute(e, n);
                }
                removeAttribute(t, e, n) {
                    if (n) {
                        const r = $c[n];
                        r
                            ? t.removeAttributeNS(r, e)
                            : t.removeAttribute(`${n}:${e}`);
                    } else t.removeAttribute(e);
                }
                addClass(t, e) {
                    t.classList.add(e);
                }
                removeClass(t, e) {
                    t.classList.remove(e);
                }
                setStyle(t, e, n, r) {
                    r & (kr.DashCase | kr.Important)
                        ? t.style.setProperty(
                              e,
                              n,
                              r & kr.Important ? "important" : ""
                          )
                        : (t.style[e] = n);
                }
                removeStyle(t, e, n) {
                    n & kr.DashCase
                        ? t.style.removeProperty(e)
                        : (t.style[e] = "");
                }
                setProperty(t, e, n) {
                    t[e] = n;
                }
                setValue(t, e) {
                    t.nodeValue = e;
                }
                listen(t, e, n) {
                    return "string" == typeof t
                        ? this.eventManager.addGlobalEventListener(t, e, Wc(n))
                        : this.eventManager.addEventListener(t, e, Wc(n));
                }
            }
            class Qc extends Gc {
                constructor(t, e, n, r) {
                    super(t), (this.component = n);
                    const s = Bc(r + "-" + n.id, n.styles, []);
                    e.addStyles(s),
                        (this.contentAttr = "_ngcontent-%COMP%".replace(
                            qc,
                            r + "-" + n.id
                        )),
                        (this.hostAttr = "_nghost-%COMP%".replace(
                            qc,
                            r + "-" + n.id
                        ));
                }
                applyToHost(t) {
                    super.setAttribute(t, this.hostAttr, "");
                }
                createElement(t, e) {
                    const n = super.createElement(t, e);
                    return super.setAttribute(n, this.contentAttr, ""), n;
                }
            }
            class Kc extends Gc {
                constructor(t, e, n, r) {
                    super(t),
                        (this.sharedStylesHost = e),
                        (this.hostEl = n),
                        (this.shadowRoot = n.attachShadow({ mode: "open" })),
                        this.sharedStylesHost.addHost(this.shadowRoot);
                    const s = Bc(r.id, r.styles, []);
                    for (let i = 0; i < s.length; i++) {
                        const t = document.createElement("style");
                        (t.textContent = s[i]), this.shadowRoot.appendChild(t);
                    }
                }
                nodeOrShadowRoot(t) {
                    return t === this.hostEl ? this.shadowRoot : t;
                }
                destroy() {
                    this.sharedStylesHost.removeHost(this.shadowRoot);
                }
                appendChild(t, e) {
                    return super.appendChild(this.nodeOrShadowRoot(t), e);
                }
                insertBefore(t, e, n) {
                    return super.insertBefore(this.nodeOrShadowRoot(t), e, n);
                }
                removeChild(t, e) {
                    return super.removeChild(this.nodeOrShadowRoot(t), e);
                }
                parentNode(t) {
                    return this.nodeOrShadowRoot(
                        super.parentNode(this.nodeOrShadowRoot(t))
                    );
                }
            }
            let Jc = (() => {
                class t extends Fc {
                    constructor(t) {
                        super(t);
                    }
                    supports(t) {
                        return !0;
                    }
                    addEventListener(t, e, n) {
                        return (
                            t.addEventListener(e, n, !1),
                            () => this.removeEventListener(t, e, n)
                        );
                    }
                    removeEventListener(t, e, n) {
                        return t.removeEventListener(e, n);
                    }
                }
                return (
                    (t.ɵfac = function (e) {
                        return new (e || t)(dr(tc));
                    }),
                    (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
                    t
                );
            })();
            const Yc = ["alt", "control", "meta", "shift"],
                Xc = {
                    "\b": "Backspace",
                    "\t": "Tab",
                    "\x7f": "Delete",
                    "\x1b": "Escape",
                    Del: "Delete",
                    Esc: "Escape",
                    Left: "ArrowLeft",
                    Right: "ArrowRight",
                    Up: "ArrowUp",
                    Down: "ArrowDown",
                    Menu: "ContextMenu",
                    Scroll: "ScrollLock",
                    Win: "OS",
                },
                tu = {
                    A: "1",
                    B: "2",
                    C: "3",
                    D: "4",
                    E: "5",
                    F: "6",
                    G: "7",
                    H: "8",
                    I: "9",
                    J: "*",
                    K: "+",
                    M: "-",
                    N: ".",
                    O: "/",
                    "`": "0",
                    "\x90": "NumLock",
                },
                eu = {
                    alt: (t) => t.altKey,
                    control: (t) => t.ctrlKey,
                    meta: (t) => t.metaKey,
                    shift: (t) => t.shiftKey,
                };
            let nu = (() => {
                class t extends Fc {
                    constructor(t) {
                        super(t);
                    }
                    supports(e) {
                        return null != t.parseEventName(e);
                    }
                    addEventListener(e, n, r) {
                        const s = t.parseEventName(n),
                            i = t.eventCallback(
                                s.fullKey,
                                r,
                                this.manager.getZone()
                            );
                        return this.manager
                            .getZone()
                            .runOutsideAngular(() =>
                                Xl().onAndCancel(e, s.domEventName, i)
                            );
                    }
                    static parseEventName(e) {
                        const n = e.toLowerCase().split("."),
                            r = n.shift();
                        if (
                            0 === n.length ||
                            ("keydown" !== r && "keyup" !== r)
                        )
                            return null;
                        const s = t._normalizeKey(n.pop());
                        let i = "";
                        if (
                            (Yc.forEach((t) => {
                                const e = n.indexOf(t);
                                e > -1 && (n.splice(e, 1), (i += t + "."));
                            }),
                            (i += s),
                            0 != n.length || 0 === s.length)
                        )
                            return null;
                        const o = {};
                        return (o.domEventName = r), (o.fullKey = i), o;
                    }
                    static getEventFullKey(t) {
                        let e = "",
                            n = (function (t) {
                                let e = t.key;
                                if (null == e) {
                                    if (((e = t.keyIdentifier), null == e))
                                        return "Unidentified";
                                    e.startsWith("U+") &&
                                        ((e = String.fromCharCode(
                                            parseInt(e.substring(2), 16)
                                        )),
                                        3 === t.location &&
                                            tu.hasOwnProperty(e) &&
                                            (e = tu[e]));
                                }
                                return Xc[e] || e;
                            })(t);
                        return (
                            (n = n.toLowerCase()),
                            " " === n
                                ? (n = "space")
                                : "." === n && (n = "dot"),
                            Yc.forEach((r) => {
                                r != n && (0, eu[r])(t) && (e += r + ".");
                            }),
                            (e += n),
                            e
                        );
                    }
                    static eventCallback(e, n, r) {
                        return (s) => {
                            t.getEventFullKey(s) === e &&
                                r.runGuarded(() => n(s));
                        };
                    }
                    static _normalizeKey(t) {
                        switch (t) {
                            case "esc":
                                return "escape";
                            default:
                                return t;
                        }
                    }
                }
                return (
                    (t.ɵfac = function (e) {
                        return new (e || t)(dr(tc));
                    }),
                    (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
                    t
                );
            })();
            const ru = Ul(Ql, "browser", [
                    { provide: ol, useValue: "browser" },
                    {
                        provide: il,
                        useValue: function () {
                            Rc.makeCurrent(), Nc.init();
                        },
                        multi: !0,
                    },
                    {
                        provide: tc,
                        useFactory: function () {
                            return (
                                (function (t) {
                                    he = t;
                                })(document),
                                document
                            );
                        },
                        deps: [],
                    },
                ]),
                su = [
                    [],
                    { provide: ii, useValue: "root" },
                    {
                        provide: Sr,
                        useFactory: function () {
                            return new Sr();
                        },
                        deps: [],
                    },
                    {
                        provide: Uc,
                        useClass: Jc,
                        multi: !0,
                        deps: [tc, wl, ol],
                    },
                    { provide: Uc, useClass: nu, multi: !0, deps: [tc] },
                    [],
                    { provide: Zc, useClass: Zc, deps: [Lc, zc, nl] },
                    { provide: Vo, useExisting: Zc },
                    { provide: Hc, useExisting: zc },
                    { provide: zc, useClass: zc, deps: [tc] },
                    { provide: Ol, useClass: Ol, deps: [wl] },
                    { provide: Lc, useClass: Lc, deps: [Uc, wl] },
                    [],
                ];
            let iu = (() => {
                class t {
                    constructor(t) {
                        if (t)
                            throw new Error(
                                "BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead."
                            );
                    }
                    static withServerTransition(e) {
                        return {
                            ngModule: t,
                            providers: [
                                { provide: nl, useValue: e.appId },
                                { provide: jc, useExisting: nl },
                                Mc,
                            ],
                        };
                    }
                }
                return (
                    (t.ɵmod = Ht({ type: t })),
                    (t.ɵinj = at({
                        factory: function (e) {
                            return new (e || t)(dr(t, 12));
                        },
                        providers: su,
                        imports: [Oc, Jl],
                    })),
                    t
                );
            })();
            function ou(...t) {
                let e = t[t.length - 1];
                return E(e) ? (t.pop(), j(t, e)) : q(t);
            }
            "undefined" != typeof window && window;
            class au extends S {
                constructor(t) {
                    super(), (this._value = t);
                }
                get value() {
                    return this.getValue();
                }
                _subscribe(t) {
                    const e = super._subscribe(t);
                    return e && !e.closed && t.next(this._value), e;
                }
                getValue() {
                    if (this.hasError) throw this.thrownError;
                    if (this.closed) throw new b();
                    return this._value;
                }
                next(t) {
                    super.next((this._value = t));
                }
            }
            class lu extends f {
                notifyNext(t, e, n, r, s) {
                    this.destination.next(e);
                }
                notifyError(t, e) {
                    this.destination.error(t);
                }
                notifyComplete(t) {
                    this.destination.complete();
                }
            }
            class cu extends f {
                constructor(t, e, n) {
                    super(),
                        (this.parent = t),
                        (this.outerValue = e),
                        (this.outerIndex = n),
                        (this.index = 0);
                }
                _next(t) {
                    this.parent.notifyNext(
                        this.outerValue,
                        t,
                        this.outerIndex,
                        this.index++,
                        this
                    );
                }
                _error(t) {
                    this.parent.notifyError(t, this), this.unsubscribe();
                }
                _complete() {
                    this.parent.notifyComplete(this), this.unsubscribe();
                }
            }
            function uu(t, e, n, r, s = new cu(t, n, r)) {
                if (!s.closed) return e instanceof v ? e.subscribe(s) : V(e)(s);
            }
            const hu = {};
            class du {
                constructor(t) {
                    this.resultSelector = t;
                }
                call(t, e) {
                    return e.subscribe(new pu(t, this.resultSelector));
                }
            }
            class pu extends lu {
                constructor(t, e) {
                    super(t),
                        (this.resultSelector = e),
                        (this.active = 0),
                        (this.values = []),
                        (this.observables = []);
                }
                _next(t) {
                    this.values.push(hu), this.observables.push(t);
                }
                _complete() {
                    const t = this.observables,
                        e = t.length;
                    if (0 === e) this.destination.complete();
                    else {
                        (this.active = e), (this.toRespond = e);
                        for (let n = 0; n < e; n++)
                            this.add(uu(this, t[n], void 0, n));
                    }
                }
                notifyComplete(t) {
                    0 == (this.active -= 1) && this.destination.complete();
                }
                notifyNext(t, e, n) {
                    const r = this.values,
                        s = this.toRespond
                            ? r[n] === hu
                                ? --this.toRespond
                                : this.toRespond
                            : 0;
                    (r[n] = e),
                        0 === s &&
                            (this.resultSelector
                                ? this._tryResultSelector(r)
                                : this.destination.next(r.slice()));
                }
                _tryResultSelector(t) {
                    let e;
                    try {
                        e = this.resultSelector.apply(this, t);
                    } catch (n) {
                        return void this.destination.error(n);
                    }
                    this.destination.next(e);
                }
            }
            const fu = (() => {
                    function t() {
                        return (
                            Error.call(this),
                            (this.message = "no elements in sequence"),
                            (this.name = "EmptyError"),
                            this
                        );
                    }
                    return (t.prototype = Object.create(Error.prototype)), t;
                })(),
                gu = new v((t) => t.complete());
            function mu(t) {
                return t
                    ? (function (t) {
                          return new v((e) => t.schedule(() => e.complete()));
                      })(t)
                    : gu;
            }
            function yu(t) {
                return new v((e) => {
                    let n;
                    try {
                        n = t();
                    } catch (r) {
                        return void e.error(r);
                    }
                    return (n ? M(n) : mu()).subscribe(e);
                });
            }
            function vu(t, e) {
                return "function" == typeof e
                    ? (n) =>
                          n.pipe(
                              vu((n, r) =>
                                  M(t(n, r)).pipe(T((t, s) => e(n, t, r, s)))
                              )
                          )
                    : (e) => e.lift(new _u(t));
            }
            class _u {
                constructor(t) {
                    this.project = t;
                }
                call(t, e) {
                    return e.subscribe(new bu(t, this.project));
                }
            }
            class bu extends U {
                constructor(t, e) {
                    super(t), (this.project = e), (this.index = 0);
                }
                _next(t) {
                    let e;
                    const n = this.index++;
                    try {
                        e = this.project(t, n);
                    } catch (r) {
                        return void this.destination.error(r);
                    }
                    this._innerSub(e);
                }
                _innerSub(t) {
                    const e = this.innerSubscription;
                    e && e.unsubscribe();
                    const n = new N(this),
                        r = this.destination;
                    r.add(n),
                        (this.innerSubscription = L(t, n)),
                        this.innerSubscription !== n &&
                            r.add(this.innerSubscription);
                }
                _complete() {
                    const { innerSubscription: t } = this;
                    (t && !t.closed) || super._complete(), this.unsubscribe();
                }
                _unsubscribe() {
                    this.innerSubscription = void 0;
                }
                notifyComplete() {
                    (this.innerSubscription = void 0),
                        this.isStopped && super._complete();
                }
                notifyNext(t) {
                    this.destination.next(t);
                }
            }
            const wu = (() => {
                function t() {
                    return (
                        Error.call(this),
                        (this.message = "argument out of range"),
                        (this.name = "ArgumentOutOfRangeError"),
                        this
                    );
                }
                return (t.prototype = Object.create(Error.prototype)), t;
            })();
            function Cu(t) {
                return (e) => (0 === t ? mu() : e.lift(new Su(t)));
            }
            class Su {
                constructor(t) {
                    if (((this.total = t), this.total < 0)) throw new wu();
                }
                call(t, e) {
                    return e.subscribe(new xu(t, this.total));
                }
            }
            class xu extends f {
                constructor(t, e) {
                    super(t), (this.total = e), (this.count = 0);
                }
                _next(t) {
                    const e = this.total,
                        n = ++this.count;
                    n <= e &&
                        (this.destination.next(t),
                        n === e &&
                            (this.destination.complete(), this.unsubscribe()));
                }
            }
            function Eu() {
                return $(1);
            }
            function Tu(...t) {
                return Eu()(ou(...t));
            }
            function ku(t, e) {
                let n = !1;
                return (
                    arguments.length >= 2 && (n = !0),
                    function (r) {
                        return r.lift(new Ou(t, e, n));
                    }
                );
            }
            class Ou {
                constructor(t, e, n = !1) {
                    (this.accumulator = t), (this.seed = e), (this.hasSeed = n);
                }
                call(t, e) {
                    return e.subscribe(
                        new Au(t, this.accumulator, this.seed, this.hasSeed)
                    );
                }
            }
            class Au extends f {
                constructor(t, e, n, r) {
                    super(t),
                        (this.accumulator = e),
                        (this._seed = n),
                        (this.hasSeed = r),
                        (this.index = 0);
                }
                get seed() {
                    return this._seed;
                }
                set seed(t) {
                    (this.hasSeed = !0), (this._seed = t);
                }
                _next(t) {
                    if (this.hasSeed) return this._tryNext(t);
                    (this.seed = t), this.destination.next(t);
                }
                _tryNext(t) {
                    const e = this.index++;
                    let n;
                    try {
                        n = this.accumulator(this.seed, t, e);
                    } catch (r) {
                        this.destination.error(r);
                    }
                    (this.seed = n), this.destination.next(n);
                }
            }
            function Du(t, e) {
                return function (n) {
                    return n.lift(new Iu(t, e));
                };
            }
            class Iu {
                constructor(t, e) {
                    (this.predicate = t), (this.thisArg = e);
                }
                call(t, e) {
                    return e.subscribe(new Ru(t, this.predicate, this.thisArg));
                }
            }
            class Ru extends f {
                constructor(t, e, n) {
                    super(t),
                        (this.predicate = e),
                        (this.thisArg = n),
                        (this.count = 0);
                }
                _next(t) {
                    let e;
                    try {
                        e = this.predicate.call(this.thisArg, t, this.count++);
                    } catch (n) {
                        return void this.destination.error(n);
                    }
                    e && this.destination.next(t);
                }
            }
            function Pu(t) {
                return function (e) {
                    const n = new Vu(t),
                        r = e.lift(n);
                    return (n.caught = r);
                };
            }
            class Vu {
                constructor(t) {
                    this.selector = t;
                }
                call(t, e) {
                    return e.subscribe(new ju(t, this.selector, this.caught));
                }
            }
            class ju extends U {
                constructor(t, e, n) {
                    super(t), (this.selector = e), (this.caught = n);
                }
                error(t) {
                    if (!this.isStopped) {
                        let n;
                        try {
                            n = this.selector(t, this.caught);
                        } catch (e) {
                            return void super.error(e);
                        }
                        this._unsubscribeAndRecycle();
                        const r = new N(this);
                        this.add(r);
                        const s = L(n, r);
                        s !== r && this.add(s);
                    }
                }
            }
            function Mu(t, e) {
                return F(t, e, 1);
            }
            function Nu(t) {
                return function (e) {
                    return 0 === t ? mu() : e.lift(new Uu(t));
                };
            }
            class Uu {
                constructor(t) {
                    if (((this.total = t), this.total < 0)) throw new wu();
                }
                call(t, e) {
                    return e.subscribe(new Lu(t, this.total));
                }
            }
            class Lu extends f {
                constructor(t, e) {
                    super(t),
                        (this.total = e),
                        (this.ring = new Array()),
                        (this.count = 0);
                }
                _next(t) {
                    const e = this.ring,
                        n = this.total,
                        r = this.count++;
                    e.length < n ? e.push(t) : (e[r % n] = t);
                }
                _complete() {
                    const t = this.destination;
                    let e = this.count;
                    if (e > 0) {
                        const n =
                                this.count >= this.total
                                    ? this.total
                                    : this.count,
                            r = this.ring;
                        for (let s = 0; s < n; s++) {
                            const s = e++ % n;
                            t.next(r[s]);
                        }
                    }
                    t.complete();
                }
            }
            function Fu(t = $u) {
                return (e) => e.lift(new Hu(t));
            }
            class Hu {
                constructor(t) {
                    this.errorFactory = t;
                }
                call(t, e) {
                    return e.subscribe(new zu(t, this.errorFactory));
                }
            }
            class zu extends f {
                constructor(t, e) {
                    super(t), (this.errorFactory = e), (this.hasValue = !1);
                }
                _next(t) {
                    (this.hasValue = !0), this.destination.next(t);
                }
                _complete() {
                    if (this.hasValue) return this.destination.complete();
                    {
                        let e;
                        try {
                            e = this.errorFactory();
                        } catch (t) {
                            e = t;
                        }
                        this.destination.error(e);
                    }
                }
            }
            function $u() {
                return new fu();
            }
            function qu(t = null) {
                return (e) => e.lift(new Bu(t));
            }
            class Bu {
                constructor(t) {
                    this.defaultValue = t;
                }
                call(t, e) {
                    return e.subscribe(new Wu(t, this.defaultValue));
                }
            }
            class Wu extends f {
                constructor(t, e) {
                    super(t), (this.defaultValue = e), (this.isEmpty = !0);
                }
                _next(t) {
                    (this.isEmpty = !1), this.destination.next(t);
                }
                _complete() {
                    this.isEmpty && this.destination.next(this.defaultValue),
                        this.destination.complete();
                }
            }
            function Zu(t, e) {
                const n = arguments.length >= 2;
                return (r) =>
                    r.pipe(
                        t ? Du((e, n) => t(e, n, r)) : y,
                        Cu(1),
                        n ? qu(e) : Fu(() => new fu())
                    );
            }
            function Gu() {}
            function Qu(t, e, n) {
                return function (r) {
                    return r.lift(new Ku(t, e, n));
                };
            }
            class Ku {
                constructor(t, e, n) {
                    (this.nextOrObserver = t),
                        (this.error = e),
                        (this.complete = n);
                }
                call(t, e) {
                    return e.subscribe(
                        new Ju(
                            t,
                            this.nextOrObserver,
                            this.error,
                            this.complete
                        )
                    );
                }
            }
            class Ju extends f {
                constructor(t, e, n, s) {
                    super(t),
                        (this._tapNext = Gu),
                        (this._tapError = Gu),
                        (this._tapComplete = Gu),
                        (this._tapError = n || Gu),
                        (this._tapComplete = s || Gu),
                        r(e)
                            ? ((this._context = this), (this._tapNext = e))
                            : e &&
                              ((this._context = e),
                              (this._tapNext = e.next || Gu),
                              (this._tapError = e.error || Gu),
                              (this._tapComplete = e.complete || Gu));
                }
                _next(t) {
                    try {
                        this._tapNext.call(this._context, t);
                    } catch (e) {
                        return void this.destination.error(e);
                    }
                    this.destination.next(t);
                }
                _error(t) {
                    try {
                        this._tapError.call(this._context, t);
                    } catch (t) {
                        return void this.destination.error(t);
                    }
                    this.destination.error(t);
                }
                _complete() {
                    try {
                        this._tapComplete.call(this._context);
                    } catch (t) {
                        return void this.destination.error(t);
                    }
                    return this.destination.complete();
                }
            }
            class Yu {
                constructor(t) {
                    this.callback = t;
                }
                call(t, e) {
                    return e.subscribe(new Xu(t, this.callback));
                }
            }
            class Xu extends f {
                constructor(t, e) {
                    super(t), this.add(new h(e));
                }
            }
            class th {
                constructor(t, e) {
                    (this.id = t), (this.url = e);
                }
            }
            class eh extends th {
                constructor(t, e, n = "imperative", r = null) {
                    super(t, e),
                        (this.navigationTrigger = n),
                        (this.restoredState = r);
                }
                toString() {
                    return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
                }
            }
            class nh extends th {
                constructor(t, e, n) {
                    super(t, e), (this.urlAfterRedirects = n);
                }
                toString() {
                    return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
                }
            }
            class rh extends th {
                constructor(t, e, n) {
                    super(t, e), (this.reason = n);
                }
                toString() {
                    return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
                }
            }
            class sh extends th {
                constructor(t, e, n) {
                    super(t, e), (this.error = n);
                }
                toString() {
                    return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
                }
            }
            class ih extends th {
                constructor(t, e, n, r) {
                    super(t, e), (this.urlAfterRedirects = n), (this.state = r);
                }
                toString() {
                    return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
                }
            }
            class oh extends th {
                constructor(t, e, n, r) {
                    super(t, e), (this.urlAfterRedirects = n), (this.state = r);
                }
                toString() {
                    return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
                }
            }
            class ah extends th {
                constructor(t, e, n, r, s) {
                    super(t, e),
                        (this.urlAfterRedirects = n),
                        (this.state = r),
                        (this.shouldActivate = s);
                }
                toString() {
                    return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
                }
            }
            class lh extends th {
                constructor(t, e, n, r) {
                    super(t, e), (this.urlAfterRedirects = n), (this.state = r);
                }
                toString() {
                    return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
                }
            }
            class ch extends th {
                constructor(t, e, n, r) {
                    super(t, e), (this.urlAfterRedirects = n), (this.state = r);
                }
                toString() {
                    return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
                }
            }
            class uh {
                constructor(t) {
                    this.route = t;
                }
                toString() {
                    return `RouteConfigLoadStart(path: ${this.route.path})`;
                }
            }
            class hh {
                constructor(t) {
                    this.route = t;
                }
                toString() {
                    return `RouteConfigLoadEnd(path: ${this.route.path})`;
                }
            }
            class dh {
                constructor(t) {
                    this.snapshot = t;
                }
                toString() {
                    return `ChildActivationStart(path: '${
                        (this.snapshot.routeConfig &&
                            this.snapshot.routeConfig.path) ||
                        ""
                    }')`;
                }
            }
            class ph {
                constructor(t) {
                    this.snapshot = t;
                }
                toString() {
                    return `ChildActivationEnd(path: '${
                        (this.snapshot.routeConfig &&
                            this.snapshot.routeConfig.path) ||
                        ""
                    }')`;
                }
            }
            class fh {
                constructor(t) {
                    this.snapshot = t;
                }
                toString() {
                    return `ActivationStart(path: '${
                        (this.snapshot.routeConfig &&
                            this.snapshot.routeConfig.path) ||
                        ""
                    }')`;
                }
            }
            class gh {
                constructor(t) {
                    this.snapshot = t;
                }
                toString() {
                    return `ActivationEnd(path: '${
                        (this.snapshot.routeConfig &&
                            this.snapshot.routeConfig.path) ||
                        ""
                    }')`;
                }
            }
            class mh {
                constructor(t, e, n) {
                    (this.routerEvent = t),
                        (this.position = e),
                        (this.anchor = n);
                }
                toString() {
                    return `Scroll(anchor: '${this.anchor}', position: '${
                        this.position
                            ? `${this.position[0]}, ${this.position[1]}`
                            : null
                    }')`;
                }
            }
            const yh = "primary";
            class vh {
                constructor(t) {
                    this.params = t || {};
                }
                has(t) {
                    return Object.prototype.hasOwnProperty.call(this.params, t);
                }
                get(t) {
                    if (this.has(t)) {
                        const e = this.params[t];
                        return Array.isArray(e) ? e[0] : e;
                    }
                    return null;
                }
                getAll(t) {
                    if (this.has(t)) {
                        const e = this.params[t];
                        return Array.isArray(e) ? e : [e];
                    }
                    return [];
                }
                get keys() {
                    return Object.keys(this.params);
                }
            }
            function _h(t) {
                return new vh(t);
            }
            function bh(t) {
                const e = Error("NavigationCancelingError: " + t);
                return (e.ngNavigationCancelingError = !0), e;
            }
            function wh(t, e, n) {
                const r = n.path.split("/");
                if (r.length > t.length) return null;
                if (
                    "full" === n.pathMatch &&
                    (e.hasChildren() || r.length < t.length)
                )
                    return null;
                const s = {};
                for (let i = 0; i < r.length; i++) {
                    const e = r[i],
                        n = t[i];
                    if (e.startsWith(":")) s[e.substring(1)] = n;
                    else if (e !== n.path) return null;
                }
                return { consumed: t.slice(0, r.length), posParams: s };
            }
            function Ch(t, e) {
                const n = Object.keys(t),
                    r = Object.keys(e);
                if (!n || !r || n.length != r.length) return !1;
                let s;
                for (let i = 0; i < n.length; i++)
                    if (((s = n[i]), !Sh(t[s], e[s]))) return !1;
                return !0;
            }
            function Sh(t, e) {
                if (Array.isArray(t) && Array.isArray(e)) {
                    if (t.length !== e.length) return !1;
                    const n = [...t].sort(),
                        r = [...e].sort();
                    return n.every((t, e) => r[e] === t);
                }
                return t === e;
            }
            function xh(t) {
                return Array.prototype.concat.apply([], t);
            }
            function Eh(t) {
                return t.length > 0 ? t[t.length - 1] : null;
            }
            function Th(t, e) {
                for (const n in t) t.hasOwnProperty(n) && e(t[n], n);
            }
            function kh(t) {
                return Bi(t) ? t : qi(t) ? M(Promise.resolve(t)) : ou(t);
            }
            function Oh(t, e, n) {
                return n
                    ? (function (t, e) {
                          return Ch(t, e);
                      })(t.queryParams, e.queryParams) && Ah(t.root, e.root)
                    : (function (t, e) {
                          return (
                              Object.keys(e).length <= Object.keys(t).length &&
                              Object.keys(e).every((n) => Sh(t[n], e[n]))
                          );
                      })(t.queryParams, e.queryParams) && Dh(t.root, e.root);
            }
            function Ah(t, e) {
                if (!jh(t.segments, e.segments)) return !1;
                if (t.numberOfChildren !== e.numberOfChildren) return !1;
                for (const n in e.children) {
                    if (!t.children[n]) return !1;
                    if (!Ah(t.children[n], e.children[n])) return !1;
                }
                return !0;
            }
            function Dh(t, e) {
                return Ih(t, e, e.segments);
            }
            function Ih(t, e, n) {
                if (t.segments.length > n.length)
                    return (
                        !!jh(t.segments.slice(0, n.length), n) &&
                        !e.hasChildren()
                    );
                if (t.segments.length === n.length) {
                    if (!jh(t.segments, n)) return !1;
                    for (const n in e.children) {
                        if (!t.children[n]) return !1;
                        if (!Dh(t.children[n], e.children[n])) return !1;
                    }
                    return !0;
                }
                {
                    const r = n.slice(0, t.segments.length),
                        s = n.slice(t.segments.length);
                    return (
                        !!jh(t.segments, r) &&
                        !!t.children.primary &&
                        Ih(t.children.primary, e, s)
                    );
                }
            }
            class Rh {
                constructor(t, e, n) {
                    (this.root = t),
                        (this.queryParams = e),
                        (this.fragment = n);
                }
                get queryParamMap() {
                    return (
                        this._queryParamMap ||
                            (this._queryParamMap = _h(this.queryParams)),
                        this._queryParamMap
                    );
                }
                toString() {
                    return Uh.serialize(this);
                }
            }
            class Ph {
                constructor(t, e) {
                    (this.segments = t),
                        (this.children = e),
                        (this.parent = null),
                        Th(e, (t, e) => (t.parent = this));
                }
                hasChildren() {
                    return this.numberOfChildren > 0;
                }
                get numberOfChildren() {
                    return Object.keys(this.children).length;
                }
                toString() {
                    return Lh(this);
                }
            }
            class Vh {
                constructor(t, e) {
                    (this.path = t), (this.parameters = e);
                }
                get parameterMap() {
                    return (
                        this._parameterMap ||
                            (this._parameterMap = _h(this.parameters)),
                        this._parameterMap
                    );
                }
                toString() {
                    return Wh(this);
                }
            }
            function jh(t, e) {
                return (
                    t.length === e.length &&
                    t.every((t, n) => t.path === e[n].path)
                );
            }
            class Mh {}
            class Nh {
                parse(t) {
                    const e = new Jh(t);
                    return new Rh(
                        e.parseRootSegment(),
                        e.parseQueryParams(),
                        e.parseFragment()
                    );
                }
                serialize(t) {
                    return `${"/" + Fh(t.root, !0)}${(function (t) {
                        const e = Object.keys(t).map((e) => {
                            const n = t[e];
                            return Array.isArray(n)
                                ? n.map((t) => `${zh(e)}=${zh(t)}`).join("&")
                                : `${zh(e)}=${zh(n)}`;
                        });
                        return e.length ? "?" + e.join("&") : "";
                    })(t.queryParams)}${
                        "string" == typeof t.fragment
                            ? "#" + encodeURI(t.fragment)
                            : ""
                    }`;
                }
            }
            const Uh = new Nh();
            function Lh(t) {
                return t.segments.map((t) => Wh(t)).join("/");
            }
            function Fh(t, e) {
                if (!t.hasChildren()) return Lh(t);
                if (e) {
                    const e = t.children.primary
                            ? Fh(t.children.primary, !1)
                            : "",
                        n = [];
                    return (
                        Th(t.children, (t, e) => {
                            e !== yh && n.push(`${e}:${Fh(t, !1)}`);
                        }),
                        n.length > 0 ? `${e}(${n.join("//")})` : e
                    );
                }
                {
                    const e = (function (t, e) {
                        let n = [];
                        return (
                            Th(t.children, (t, r) => {
                                r === yh && (n = n.concat(e(t, r)));
                            }),
                            Th(t.children, (t, r) => {
                                r !== yh && (n = n.concat(e(t, r)));
                            }),
                            n
                        );
                    })(t, (e, n) =>
                        n === yh
                            ? [Fh(t.children.primary, !1)]
                            : [`${n}:${Fh(e, !1)}`]
                    );
                    return 1 === Object.keys(t.children).length &&
                        null != t.children.primary
                        ? `${Lh(t)}/${e[0]}`
                        : `${Lh(t)}/(${e.join("//")})`;
                }
            }
            function Hh(t) {
                return encodeURIComponent(t)
                    .replace(/%40/g, "@")
                    .replace(/%3A/gi, ":")
                    .replace(/%24/g, "$")
                    .replace(/%2C/gi, ",");
            }
            function zh(t) {
                return Hh(t).replace(/%3B/gi, ";");
            }
            function $h(t) {
                return Hh(t)
                    .replace(/\(/g, "%28")
                    .replace(/\)/g, "%29")
                    .replace(/%26/gi, "&");
            }
            function qh(t) {
                return decodeURIComponent(t);
            }
            function Bh(t) {
                return qh(t.replace(/\+/g, "%20"));
            }
            function Wh(t) {
                return `${$h(t.path)}${
                    ((e = t.parameters),
                    Object.keys(e)
                        .map((t) => `;${$h(t)}=${$h(e[t])}`)
                        .join(""))
                }`;
                var e;
            }
            const Zh = /^[^\/()?;=#]+/;
            function Gh(t) {
                const e = t.match(Zh);
                return e ? e[0] : "";
            }
            const Qh = /^[^=?&#]+/,
                Kh = /^[^?&#]+/;
            class Jh {
                constructor(t) {
                    (this.url = t), (this.remaining = t);
                }
                parseRootSegment() {
                    return (
                        this.consumeOptional("/"),
                        "" === this.remaining ||
                        this.peekStartsWith("?") ||
                        this.peekStartsWith("#")
                            ? new Ph([], {})
                            : new Ph([], this.parseChildren())
                    );
                }
                parseQueryParams() {
                    const t = {};
                    if (this.consumeOptional("?"))
                        do {
                            this.parseQueryParam(t);
                        } while (this.consumeOptional("&"));
                    return t;
                }
                parseFragment() {
                    return this.consumeOptional("#")
                        ? decodeURIComponent(this.remaining)
                        : null;
                }
                parseChildren() {
                    if ("" === this.remaining) return {};
                    this.consumeOptional("/");
                    const t = [];
                    for (
                        this.peekStartsWith("(") || t.push(this.parseSegment());
                        this.peekStartsWith("/") &&
                        !this.peekStartsWith("//") &&
                        !this.peekStartsWith("/(");

                    )
                        this.capture("/"), t.push(this.parseSegment());
                    let e = {};
                    this.peekStartsWith("/(") &&
                        (this.capture("/"), (e = this.parseParens(!0)));
                    let n = {};
                    return (
                        this.peekStartsWith("(") && (n = this.parseParens(!1)),
                        (t.length > 0 || Object.keys(e).length > 0) &&
                            (n.primary = new Ph(t, e)),
                        n
                    );
                }
                parseSegment() {
                    const t = Gh(this.remaining);
                    if ("" === t && this.peekStartsWith(";"))
                        throw new Error(
                            `Empty path url segment cannot have parameters: '${this.remaining}'.`
                        );
                    return (
                        this.capture(t), new Vh(qh(t), this.parseMatrixParams())
                    );
                }
                parseMatrixParams() {
                    const t = {};
                    for (; this.consumeOptional(";"); ) this.parseParam(t);
                    return t;
                }
                parseParam(t) {
                    const e = Gh(this.remaining);
                    if (!e) return;
                    this.capture(e);
                    let n = "";
                    if (this.consumeOptional("=")) {
                        const t = Gh(this.remaining);
                        t && ((n = t), this.capture(n));
                    }
                    t[qh(e)] = qh(n);
                }
                parseQueryParam(t) {
                    const e = (function (t) {
                        const e = t.match(Qh);
                        return e ? e[0] : "";
                    })(this.remaining);
                    if (!e) return;
                    this.capture(e);
                    let n = "";
                    if (this.consumeOptional("=")) {
                        const t = (function (t) {
                            const e = t.match(Kh);
                            return e ? e[0] : "";
                        })(this.remaining);
                        t && ((n = t), this.capture(n));
                    }
                    const r = Bh(e),
                        s = Bh(n);
                    if (t.hasOwnProperty(r)) {
                        let e = t[r];
                        Array.isArray(e) || ((e = [e]), (t[r] = e)), e.push(s);
                    } else t[r] = s;
                }
                parseParens(t) {
                    const e = {};
                    for (
                        this.capture("(");
                        !this.consumeOptional(")") && this.remaining.length > 0;

                    ) {
                        const n = Gh(this.remaining),
                            r = this.remaining[n.length];
                        if ("/" !== r && ")" !== r && ";" !== r)
                            throw new Error(`Cannot parse url '${this.url}'`);
                        let s = void 0;
                        n.indexOf(":") > -1
                            ? ((s = n.substr(0, n.indexOf(":"))),
                              this.capture(s),
                              this.capture(":"))
                            : t && (s = yh);
                        const i = this.parseChildren();
                        (e[s] =
                            1 === Object.keys(i).length
                                ? i.primary
                                : new Ph([], i)),
                            this.consumeOptional("//");
                    }
                    return e;
                }
                peekStartsWith(t) {
                    return this.remaining.startsWith(t);
                }
                consumeOptional(t) {
                    return (
                        !!this.peekStartsWith(t) &&
                        ((this.remaining = this.remaining.substring(t.length)),
                        !0)
                    );
                }
                capture(t) {
                    if (!this.consumeOptional(t))
                        throw new Error(`Expected "${t}".`);
                }
            }
            class Yh {
                constructor(t) {
                    this._root = t;
                }
                get root() {
                    return this._root.value;
                }
                parent(t) {
                    const e = this.pathFromRoot(t);
                    return e.length > 1 ? e[e.length - 2] : null;
                }
                children(t) {
                    const e = Xh(t, this._root);
                    return e ? e.children.map((t) => t.value) : [];
                }
                firstChild(t) {
                    const e = Xh(t, this._root);
                    return e && e.children.length > 0
                        ? e.children[0].value
                        : null;
                }
                siblings(t) {
                    const e = td(t, this._root);
                    return e.length < 2
                        ? []
                        : e[e.length - 2].children
                              .map((t) => t.value)
                              .filter((e) => e !== t);
                }
                pathFromRoot(t) {
                    return td(t, this._root).map((t) => t.value);
                }
            }
            function Xh(t, e) {
                if (t === e.value) return e;
                for (const n of e.children) {
                    const e = Xh(t, n);
                    if (e) return e;
                }
                return null;
            }
            function td(t, e) {
                if (t === e.value) return [e];
                for (const n of e.children) {
                    const r = td(t, n);
                    if (r.length) return r.unshift(e), r;
                }
                return [];
            }
            class ed {
                constructor(t, e) {
                    (this.value = t), (this.children = e);
                }
                toString() {
                    return `TreeNode(${this.value})`;
                }
            }
            function nd(t) {
                const e = {};
                return (
                    t && t.children.forEach((t) => (e[t.value.outlet] = t)), e
                );
            }
            class rd extends Yh {
                constructor(t, e) {
                    super(t), (this.snapshot = e), cd(this, t);
                }
                toString() {
                    return this.snapshot.toString();
                }
            }
            function sd(t, e) {
                const n = (function (t, e) {
                        const n = new ad(
                            [],
                            {},
                            {},
                            "",
                            {},
                            yh,
                            e,
                            null,
                            t.root,
                            -1,
                            {}
                        );
                        return new ld("", new ed(n, []));
                    })(t, e),
                    r = new au([new Vh("", {})]),
                    s = new au({}),
                    i = new au({}),
                    o = new au({}),
                    a = new au(""),
                    l = new id(r, s, o, a, i, yh, e, n.root);
                return (l.snapshot = n.root), new rd(new ed(l, []), n);
            }
            class id {
                constructor(t, e, n, r, s, i, o, a) {
                    (this.url = t),
                        (this.params = e),
                        (this.queryParams = n),
                        (this.fragment = r),
                        (this.data = s),
                        (this.outlet = i),
                        (this.component = o),
                        (this._futureSnapshot = a);
                }
                get routeConfig() {
                    return this._futureSnapshot.routeConfig;
                }
                get root() {
                    return this._routerState.root;
                }
                get parent() {
                    return this._routerState.parent(this);
                }
                get firstChild() {
                    return this._routerState.firstChild(this);
                }
                get children() {
                    return this._routerState.children(this);
                }
                get pathFromRoot() {
                    return this._routerState.pathFromRoot(this);
                }
                get paramMap() {
                    return (
                        this._paramMap ||
                            (this._paramMap = this.params.pipe(
                                T((t) => _h(t))
                            )),
                        this._paramMap
                    );
                }
                get queryParamMap() {
                    return (
                        this._queryParamMap ||
                            (this._queryParamMap = this.queryParams.pipe(
                                T((t) => _h(t))
                            )),
                        this._queryParamMap
                    );
                }
                toString() {
                    return this.snapshot
                        ? this.snapshot.toString()
                        : `Future(${this._futureSnapshot})`;
                }
            }
            function od(t, e = "emptyOnly") {
                const n = t.pathFromRoot;
                let r = 0;
                if ("always" !== e)
                    for (r = n.length - 1; r >= 1; ) {
                        const t = n[r],
                            e = n[r - 1];
                        if (t.routeConfig && "" === t.routeConfig.path) r--;
                        else {
                            if (e.component) break;
                            r--;
                        }
                    }
                return (function (t) {
                    return t.reduce(
                        (t, e) => ({
                            params: Object.assign(
                                Object.assign({}, t.params),
                                e.params
                            ),
                            data: Object.assign(
                                Object.assign({}, t.data),
                                e.data
                            ),
                            resolve: Object.assign(
                                Object.assign({}, t.resolve),
                                e._resolvedData
                            ),
                        }),
                        { params: {}, data: {}, resolve: {} }
                    );
                })(n.slice(r));
            }
            class ad {
                constructor(t, e, n, r, s, i, o, a, l, c, u) {
                    (this.url = t),
                        (this.params = e),
                        (this.queryParams = n),
                        (this.fragment = r),
                        (this.data = s),
                        (this.outlet = i),
                        (this.component = o),
                        (this.routeConfig = a),
                        (this._urlSegment = l),
                        (this._lastPathIndex = c),
                        (this._resolve = u);
                }
                get root() {
                    return this._routerState.root;
                }
                get parent() {
                    return this._routerState.parent(this);
                }
                get firstChild() {
                    return this._routerState.firstChild(this);
                }
                get children() {
                    return this._routerState.children(this);
                }
                get pathFromRoot() {
                    return this._routerState.pathFromRoot(this);
                }
                get paramMap() {
                    return (
                        this._paramMap || (this._paramMap = _h(this.params)),
                        this._paramMap
                    );
                }
                get queryParamMap() {
                    return (
                        this._queryParamMap ||
                            (this._queryParamMap = _h(this.queryParams)),
                        this._queryParamMap
                    );
                }
                toString() {
                    return `Route(url:'${this.url
                        .map((t) => t.toString())
                        .join("/")}', path:'${
                        this.routeConfig ? this.routeConfig.path : ""
                    }')`;
                }
            }
            class ld extends Yh {
                constructor(t, e) {
                    super(e), (this.url = t), cd(this, e);
                }
                toString() {
                    return ud(this._root);
                }
            }
            function cd(t, e) {
                (e.value._routerState = t), e.children.forEach((e) => cd(t, e));
            }
            function ud(t) {
                const e =
                    t.children.length > 0
                        ? ` { ${t.children.map(ud).join(", ")} } `
                        : "";
                return `${t.value}${e}`;
            }
            function hd(t) {
                if (t.snapshot) {
                    const e = t.snapshot,
                        n = t._futureSnapshot;
                    (t.snapshot = n),
                        Ch(e.queryParams, n.queryParams) ||
                            t.queryParams.next(n.queryParams),
                        e.fragment !== n.fragment &&
                            t.fragment.next(n.fragment),
                        Ch(e.params, n.params) || t.params.next(n.params),
                        (function (t, e) {
                            if (t.length !== e.length) return !1;
                            for (let n = 0; n < t.length; ++n)
                                if (!Ch(t[n], e[n])) return !1;
                            return !0;
                        })(e.url, n.url) || t.url.next(n.url),
                        Ch(e.data, n.data) || t.data.next(n.data);
                } else
                    (t.snapshot = t._futureSnapshot),
                        t.data.next(t._futureSnapshot.data);
            }
            function dd(t, e) {
                var n, r;
                return (
                    Ch(t.params, e.params) &&
                    jh((n = t.url), (r = e.url)) &&
                    n.every((t, e) => Ch(t.parameters, r[e].parameters)) &&
                    !(!t.parent != !e.parent) &&
                    (!t.parent || dd(t.parent, e.parent))
                );
            }
            function pd(t, e, n) {
                if (n && t.shouldReuseRoute(e.value, n.value.snapshot)) {
                    const r = n.value;
                    r._futureSnapshot = e.value;
                    const s = (function (t, e, n) {
                        return e.children.map((e) => {
                            for (const r of n.children)
                                if (
                                    t.shouldReuseRoute(
                                        e.value,
                                        r.value.snapshot
                                    )
                                )
                                    return pd(t, e, r);
                            return pd(t, e);
                        });
                    })(t, e, n);
                    return new ed(r, s);
                }
                {
                    const n = t.retrieve(e.value);
                    if (n) {
                        const t = n.route;
                        return fd(e, t), t;
                    }
                    {
                        const n = new id(
                                new au((r = e.value).url),
                                new au(r.params),
                                new au(r.queryParams),
                                new au(r.fragment),
                                new au(r.data),
                                r.outlet,
                                r.component,
                                r
                            ),
                            s = e.children.map((e) => pd(t, e));
                        return new ed(n, s);
                    }
                }
                var r;
            }
            function fd(t, e) {
                if (t.value.routeConfig !== e.value.routeConfig)
                    throw new Error(
                        "Cannot reattach ActivatedRouteSnapshot created from a different route"
                    );
                if (t.children.length !== e.children.length)
                    throw new Error(
                        "Cannot reattach ActivatedRouteSnapshot with a different number of children"
                    );
                e.value._futureSnapshot = t.value;
                for (let n = 0; n < t.children.length; ++n)
                    fd(t.children[n], e.children[n]);
            }
            function gd(t) {
                return (
                    "object" == typeof t &&
                    null != t &&
                    !t.outlets &&
                    !t.segmentPath
                );
            }
            function md(t) {
                return "object" == typeof t && null != t && t.outlets;
            }
            function yd(t, e, n, r, s) {
                let i = {};
                return (
                    r &&
                        Th(r, (t, e) => {
                            i[e] = Array.isArray(t)
                                ? t.map((t) => "" + t)
                                : "" + t;
                        }),
                    new Rh(n.root === t ? e : vd(n.root, t, e), i, s)
                );
            }
            function vd(t, e, n) {
                const r = {};
                return (
                    Th(t.children, (t, s) => {
                        r[s] = t === e ? n : vd(t, e, n);
                    }),
                    new Ph(t.segments, r)
                );
            }
            class _d {
                constructor(t, e, n) {
                    if (
                        ((this.isAbsolute = t),
                        (this.numberOfDoubleDots = e),
                        (this.commands = n),
                        t && n.length > 0 && gd(n[0]))
                    )
                        throw new Error(
                            "Root segment cannot have matrix parameters"
                        );
                    const r = n.find(md);
                    if (r && r !== Eh(n))
                        throw new Error(
                            "{outlets:{}} has to be the last command"
                        );
                }
                toRoot() {
                    return (
                        this.isAbsolute &&
                        1 === this.commands.length &&
                        "/" == this.commands[0]
                    );
                }
            }
            class bd {
                constructor(t, e, n) {
                    (this.segmentGroup = t),
                        (this.processChildren = e),
                        (this.index = n);
                }
            }
            function wd(t, e, n) {
                if (
                    (t || (t = new Ph([], {})),
                    0 === t.segments.length && t.hasChildren())
                )
                    return Cd(t, e, n);
                const r = (function (t, e, n) {
                        let r = 0,
                            s = e;
                        const i = { match: !1, pathIndex: 0, commandIndex: 0 };
                        for (; s < t.segments.length; ) {
                            if (r >= n.length) return i;
                            const e = t.segments[s],
                                o = n[r];
                            if (md(o)) break;
                            const a = "" + o,
                                l = r < n.length - 1 ? n[r + 1] : null;
                            if (s > 0 && void 0 === a) break;
                            if (
                                a &&
                                l &&
                                "object" == typeof l &&
                                void 0 === l.outlets
                            ) {
                                if (!Td(a, l, e)) return i;
                                r += 2;
                            } else {
                                if (!Td(a, {}, e)) return i;
                                r++;
                            }
                            s++;
                        }
                        return { match: !0, pathIndex: s, commandIndex: r };
                    })(t, e, n),
                    s = n.slice(r.commandIndex);
                if (r.match && r.pathIndex < t.segments.length) {
                    const e = new Ph(t.segments.slice(0, r.pathIndex), {});
                    return (
                        (e.children.primary = new Ph(
                            t.segments.slice(r.pathIndex),
                            t.children
                        )),
                        Cd(e, 0, s)
                    );
                }
                return r.match && 0 === s.length
                    ? new Ph(t.segments, {})
                    : r.match && !t.hasChildren()
                    ? Sd(t, e, n)
                    : r.match
                    ? Cd(t, 0, s)
                    : Sd(t, e, n);
            }
            function Cd(t, e, n) {
                if (0 === n.length) return new Ph(t.segments, {});
                {
                    const r = (function (t) {
                            return md(t[0]) ? t[0].outlets : { [yh]: t };
                        })(n),
                        s = {};
                    return (
                        Th(r, (n, r) => {
                            "string" == typeof n && (n = [n]),
                                null !== n && (s[r] = wd(t.children[r], e, n));
                        }),
                        Th(t.children, (t, e) => {
                            void 0 === r[e] && (s[e] = t);
                        }),
                        new Ph(t.segments, s)
                    );
                }
            }
            function Sd(t, e, n) {
                const r = t.segments.slice(0, e);
                let s = 0;
                for (; s < n.length; ) {
                    const i = n[s];
                    if (md(i)) {
                        const t = xd(i.outlets);
                        return new Ph(r, t);
                    }
                    if (0 === s && gd(n[0])) {
                        r.push(new Vh(t.segments[e].path, n[0])), s++;
                        continue;
                    }
                    const o = md(i) ? i.outlets.primary : "" + i,
                        a = s < n.length - 1 ? n[s + 1] : null;
                    o && a && gd(a)
                        ? (r.push(new Vh(o, Ed(a))), (s += 2))
                        : (r.push(new Vh(o, {})), s++);
                }
                return new Ph(r, {});
            }
            function xd(t) {
                const e = {};
                return (
                    Th(t, (t, n) => {
                        "string" == typeof t && (t = [t]),
                            null !== t && (e[n] = Sd(new Ph([], {}), 0, t));
                    }),
                    e
                );
            }
            function Ed(t) {
                const e = {};
                return Th(t, (t, n) => (e[n] = "" + t)), e;
            }
            function Td(t, e, n) {
                return t == n.path && Ch(e, n.parameters);
            }
            class kd {
                constructor(t, e, n, r) {
                    (this.routeReuseStrategy = t),
                        (this.futureState = e),
                        (this.currState = n),
                        (this.forwardEvent = r);
                }
                activate(t) {
                    const e = this.futureState._root,
                        n = this.currState ? this.currState._root : null;
                    this.deactivateChildRoutes(e, n, t),
                        hd(this.futureState.root),
                        this.activateChildRoutes(e, n, t);
                }
                deactivateChildRoutes(t, e, n) {
                    const r = nd(e);
                    t.children.forEach((t) => {
                        const e = t.value.outlet;
                        this.deactivateRoutes(t, r[e], n), delete r[e];
                    }),
                        Th(r, (t, e) => {
                            this.deactivateRouteAndItsChildren(t, n);
                        });
                }
                deactivateRoutes(t, e, n) {
                    const r = t.value,
                        s = e ? e.value : null;
                    if (r === s)
                        if (r.component) {
                            const s = n.getContext(r.outlet);
                            s && this.deactivateChildRoutes(t, e, s.children);
                        } else this.deactivateChildRoutes(t, e, n);
                    else s && this.deactivateRouteAndItsChildren(e, n);
                }
                deactivateRouteAndItsChildren(t, e) {
                    this.routeReuseStrategy.shouldDetach(t.value.snapshot)
                        ? this.detachAndStoreRouteSubtree(t, e)
                        : this.deactivateRouteAndOutlet(t, e);
                }
                detachAndStoreRouteSubtree(t, e) {
                    const n = e.getContext(t.value.outlet);
                    if (n && n.outlet) {
                        const e = n.outlet.detach(),
                            r = n.children.onOutletDeactivated();
                        this.routeReuseStrategy.store(t.value.snapshot, {
                            componentRef: e,
                            route: t,
                            contexts: r,
                        });
                    }
                }
                deactivateRouteAndOutlet(t, e) {
                    const n = e.getContext(t.value.outlet),
                        r = n && t.value.component ? n.children : e,
                        s = nd(t);
                    for (const i of Object.keys(s))
                        this.deactivateRouteAndItsChildren(s[i], r);
                    n &&
                        n.outlet &&
                        (n.outlet.deactivate(),
                        n.children.onOutletDeactivated());
                }
                activateChildRoutes(t, e, n) {
                    const r = nd(e);
                    t.children.forEach((t) => {
                        this.activateRoutes(t, r[t.value.outlet], n),
                            this.forwardEvent(new gh(t.value.snapshot));
                    }),
                        t.children.length &&
                            this.forwardEvent(new ph(t.value.snapshot));
                }
                activateRoutes(t, e, n) {
                    const r = t.value,
                        s = e ? e.value : null;
                    if ((hd(r), r === s))
                        if (r.component) {
                            const s = n.getOrCreateContext(r.outlet);
                            this.activateChildRoutes(t, e, s.children);
                        } else this.activateChildRoutes(t, e, n);
                    else if (r.component) {
                        const e = n.getOrCreateContext(r.outlet);
                        if (this.routeReuseStrategy.shouldAttach(r.snapshot)) {
                            const t = this.routeReuseStrategy.retrieve(
                                r.snapshot
                            );
                            this.routeReuseStrategy.store(r.snapshot, null),
                                e.children.onOutletReAttached(t.contexts),
                                (e.attachRef = t.componentRef),
                                (e.route = t.route.value),
                                e.outlet &&
                                    e.outlet.attach(
                                        t.componentRef,
                                        t.route.value
                                    ),
                                Od(t.route);
                        } else {
                            const n = (function (t) {
                                    for (let e = t.parent; e; e = e.parent) {
                                        const t = e.routeConfig;
                                        if (t && t._loadedConfig)
                                            return t._loadedConfig;
                                        if (t && t.component) return null;
                                    }
                                    return null;
                                })(r.snapshot),
                                s = n
                                    ? n.module.componentFactoryResolver
                                    : null;
                            (e.attachRef = null),
                                (e.route = r),
                                (e.resolver = s),
                                e.outlet && e.outlet.activateWith(r, s),
                                this.activateChildRoutes(t, null, e.children);
                        }
                    } else this.activateChildRoutes(t, null, n);
                }
            }
            function Od(t) {
                hd(t.value), t.children.forEach(Od);
            }
            class Ad {
                constructor(t, e) {
                    (this.routes = t), (this.module = e);
                }
            }
            function Dd(t) {
                return "function" == typeof t;
            }
            function Id(t) {
                return t instanceof Rh;
            }
            const Rd = Symbol("INITIAL_VALUE");
            function Pd() {
                return vu((t) =>
                    (function (...t) {
                        let e = void 0,
                            n = void 0;
                        return (
                            E(t[t.length - 1]) && (n = t.pop()),
                            "function" == typeof t[t.length - 1] &&
                                (e = t.pop()),
                            1 === t.length && l(t[0]) && (t = t[0]),
                            q(t, n).lift(new du(e))
                        );
                    })(
                        ...t.map((t) =>
                            t.pipe(
                                Cu(1),
                                (function (...t) {
                                    const e = t[t.length - 1];
                                    return E(e)
                                        ? (t.pop(), (n) => Tu(t, n, e))
                                        : (e) => Tu(t, e);
                                })(Rd)
                            )
                        )
                    ).pipe(
                        ku((t, e) => {
                            let n = !1;
                            return e.reduce((t, r, s) => {
                                if (t !== Rd) return t;
                                if ((r === Rd && (n = !0), !n)) {
                                    if (!1 === r) return r;
                                    if (s === e.length - 1 || Id(r)) return r;
                                }
                                return t;
                            }, t);
                        }, Rd),
                        Du((t) => t !== Rd),
                        T((t) => (Id(t) ? t : !0 === t)),
                        Cu(1)
                    )
                );
            }
            let Vd = (() => {
                class t {}
                return (
                    (t.ɵfac = function (e) {
                        return new (e || t)();
                    }),
                    (t.ɵcmp = Nt({
                        type: t,
                        selectors: [["ng-component"]],
                        decls: 1,
                        vars: 0,
                        template: function (t, e) {
                            1 & t && zi(0, "router-outlet");
                        },
                        directives: function () {
                            return [Pp];
                        },
                        encapsulation: 2,
                    })),
                    t
                );
            })();
            function jd(t, e = "") {
                for (let n = 0; n < t.length; n++) {
                    const r = t[n];
                    Md(r, Nd(e, r));
                }
            }
            function Md(t, e) {
                t.children && jd(t.children, e);
            }
            function Nd(t, e) {
                return e
                    ? t || e.path
                        ? t && !e.path
                            ? t + "/"
                            : !t && e.path
                            ? e.path
                            : `${t}/${e.path}`
                        : ""
                    : t;
            }
            function Ud(t) {
                const e = t.children && t.children.map(Ud),
                    n = e
                        ? Object.assign(Object.assign({}, t), { children: e })
                        : Object.assign({}, t);
                return (
                    !n.component &&
                        (e || n.loadChildren) &&
                        n.outlet &&
                        n.outlet !== yh &&
                        (n.component = Vd),
                    n
                );
            }
            function Ld(t) {
                return t.outlet || yh;
            }
            function Fd(t, e) {
                const n = t.filter((t) => Ld(t) === e);
                return n.push(...t.filter((t) => Ld(t) !== e)), n;
            }
            const Hd = {
                matched: !1,
                consumedSegments: [],
                lastChild: 0,
                parameters: {},
                positionalParamSegments: {},
            };
            function zd(t, e, n) {
                var r;
                if ("" === e.path)
                    return "full" === e.pathMatch &&
                        (t.hasChildren() || n.length > 0)
                        ? Object.assign({}, Hd)
                        : {
                              matched: !0,
                              consumedSegments: [],
                              lastChild: 0,
                              parameters: {},
                              positionalParamSegments: {},
                          };
                const s = (e.matcher || wh)(n, t, e);
                if (!s) return Object.assign({}, Hd);
                const i = {};
                Th(s.posParams, (t, e) => {
                    i[e] = t.path;
                });
                const o =
                    s.consumed.length > 0
                        ? Object.assign(
                              Object.assign({}, i),
                              s.consumed[s.consumed.length - 1].parameters
                          )
                        : i;
                return {
                    matched: !0,
                    consumedSegments: s.consumed,
                    lastChild: s.consumed.length,
                    parameters: o,
                    positionalParamSegments:
                        null !== (r = s.posParams) && void 0 !== r ? r : {},
                };
            }
            function $d(t, e, n, r, s = "corrected") {
                if (
                    n.length > 0 &&
                    (function (t, e, n) {
                        return n.some((n) => qd(t, e, n) && Ld(n) !== yh);
                    })(t, n, r)
                ) {
                    const s = new Ph(
                        e,
                        (function (t, e, n, r) {
                            const s = {};
                            (s.primary = r),
                                (r._sourceSegment = t),
                                (r._segmentIndexShift = e.length);
                            for (const i of n)
                                if ("" === i.path && Ld(i) !== yh) {
                                    const n = new Ph([], {});
                                    (n._sourceSegment = t),
                                        (n._segmentIndexShift = e.length),
                                        (s[Ld(i)] = n);
                                }
                            return s;
                        })(t, e, r, new Ph(n, t.children))
                    );
                    return (
                        (s._sourceSegment = t),
                        (s._segmentIndexShift = e.length),
                        { segmentGroup: s, slicedSegments: [] }
                    );
                }
                if (
                    0 === n.length &&
                    (function (t, e, n) {
                        return n.some((n) => qd(t, e, n));
                    })(t, n, r)
                ) {
                    const i = new Ph(
                        t.segments,
                        (function (t, e, n, r, s, i) {
                            const o = {};
                            for (const a of r)
                                if (qd(t, n, a) && !s[Ld(a)]) {
                                    const n = new Ph([], {});
                                    (n._sourceSegment = t),
                                        (n._segmentIndexShift =
                                            "legacy" === i
                                                ? t.segments.length
                                                : e.length),
                                        (o[Ld(a)] = n);
                                }
                            return Object.assign(Object.assign({}, s), o);
                        })(t, e, n, r, t.children, s)
                    );
                    return (
                        (i._sourceSegment = t),
                        (i._segmentIndexShift = e.length),
                        { segmentGroup: i, slicedSegments: n }
                    );
                }
                const i = new Ph(t.segments, t.children);
                return (
                    (i._sourceSegment = t),
                    (i._segmentIndexShift = e.length),
                    { segmentGroup: i, slicedSegments: n }
                );
            }
            function qd(t, e, n) {
                return (
                    (!(t.hasChildren() || e.length > 0) ||
                        "full" !== n.pathMatch) &&
                    "" === n.path
                );
            }
            function Bd(t, e, n, r) {
                return (
                    !!(Ld(t) === r || (r !== yh && qd(e, n, t))) &&
                    ("**" === t.path || zd(e, t, n).matched)
                );
            }
            function Wd(t, e, n) {
                return 0 === e.length && !t.children[n];
            }
            class Zd {
                constructor(t) {
                    this.segmentGroup = t || null;
                }
            }
            class Gd {
                constructor(t) {
                    this.urlTree = t;
                }
            }
            function Qd(t) {
                return new v((e) => e.error(new Zd(t)));
            }
            function Kd(t) {
                return new v((e) => e.error(new Gd(t)));
            }
            function Jd(t) {
                return new v((e) =>
                    e.error(
                        new Error(
                            `Only absolute redirects can have named outlets. redirectTo: '${t}'`
                        )
                    )
                );
            }
            class Yd {
                constructor(t, e, n, r, s) {
                    (this.configLoader = e),
                        (this.urlSerializer = n),
                        (this.urlTree = r),
                        (this.config = s),
                        (this.allowRedirects = !0),
                        (this.ngModule = t.get(ha));
                }
                apply() {
                    const t = $d(
                            this.urlTree.root,
                            [],
                            [],
                            this.config
                        ).segmentGroup,
                        e = new Ph(t.segments, t.children);
                    return this.expandSegmentGroup(
                        this.ngModule,
                        this.config,
                        e,
                        yh
                    )
                        .pipe(
                            T((t) =>
                                this.createUrlTree(
                                    Xd(t),
                                    this.urlTree.queryParams,
                                    this.urlTree.fragment
                                )
                            )
                        )
                        .pipe(
                            Pu((t) => {
                                if (t instanceof Gd)
                                    return (
                                        (this.allowRedirects = !1),
                                        this.match(t.urlTree)
                                    );
                                if (t instanceof Zd) throw this.noMatchError(t);
                                throw t;
                            })
                        );
                }
                match(t) {
                    return this.expandSegmentGroup(
                        this.ngModule,
                        this.config,
                        t.root,
                        yh
                    )
                        .pipe(
                            T((e) =>
                                this.createUrlTree(
                                    Xd(e),
                                    t.queryParams,
                                    t.fragment
                                )
                            )
                        )
                        .pipe(
                            Pu((t) => {
                                if (t instanceof Zd) throw this.noMatchError(t);
                                throw t;
                            })
                        );
                }
                noMatchError(t) {
                    return new Error(
                        `Cannot match any routes. URL Segment: '${t.segmentGroup}'`
                    );
                }
                createUrlTree(t, e, n) {
                    const r =
                        t.segments.length > 0 ? new Ph([], { [yh]: t }) : t;
                    return new Rh(r, e, n);
                }
                expandSegmentGroup(t, e, n, r) {
                    return 0 === n.segments.length && n.hasChildren()
                        ? this.expandChildren(t, e, n).pipe(
                              T((t) => new Ph([], t))
                          )
                        : this.expandSegment(t, n, e, n.segments, r, !0);
                }
                expandChildren(t, e, n) {
                    const r = [];
                    for (const s of Object.keys(n.children))
                        "primary" === s ? r.unshift(s) : r.push(s);
                    return M(r).pipe(
                        Mu((r) => {
                            const s = n.children[r],
                                i = Fd(e, r);
                            return this.expandSegmentGroup(t, i, s, r).pipe(
                                T((t) => ({ segment: t, outlet: r }))
                            );
                        }),
                        ku((t, e) => ((t[e.outlet] = e.segment), t), {}),
                        (function (t, e) {
                            const n = arguments.length >= 2;
                            return (r) =>
                                r.pipe(
                                    t ? Du((e, n) => t(e, n, r)) : y,
                                    Nu(1),
                                    n ? qu(e) : Fu(() => new fu())
                                );
                        })()
                    );
                }
                expandSegment(t, e, n, r, s, i) {
                    return M(n).pipe(
                        Mu((o) =>
                            this.expandSegmentAgainstRoute(
                                t,
                                e,
                                n,
                                o,
                                r,
                                s,
                                i
                            ).pipe(
                                Pu((t) => {
                                    if (t instanceof Zd) return ou(null);
                                    throw t;
                                })
                            )
                        ),
                        Zu((t) => !!t),
                        Pu((t, n) => {
                            if (t instanceof fu || "EmptyError" === t.name) {
                                if (Wd(e, r, s)) return ou(new Ph([], {}));
                                throw new Zd(e);
                            }
                            throw t;
                        })
                    );
                }
                expandSegmentAgainstRoute(t, e, n, r, s, i, o) {
                    return Bd(r, e, s, i)
                        ? void 0 === r.redirectTo
                            ? this.matchSegmentAgainstRoute(t, e, r, s, i)
                            : o && this.allowRedirects
                            ? this.expandSegmentAgainstRouteUsingRedirect(
                                  t,
                                  e,
                                  n,
                                  r,
                                  s,
                                  i
                              )
                            : Qd(e)
                        : Qd(e);
                }
                expandSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i) {
                    return "**" === r.path
                        ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(
                              t,
                              n,
                              r,
                              i
                          )
                        : this.expandRegularSegmentAgainstRouteUsingRedirect(
                              t,
                              e,
                              n,
                              r,
                              s,
                              i
                          );
                }
                expandWildCardWithParamsAgainstRouteUsingRedirect(t, e, n, r) {
                    const s = this.applyRedirectCommands([], n.redirectTo, {});
                    return n.redirectTo.startsWith("/")
                        ? Kd(s)
                        : this.lineralizeSegments(n, s).pipe(
                              F((n) => {
                                  const s = new Ph(n, {});
                                  return this.expandSegment(t, s, e, n, r, !1);
                              })
                          );
                }
                expandRegularSegmentAgainstRouteUsingRedirect(
                    t,
                    e,
                    n,
                    r,
                    s,
                    i
                ) {
                    const {
                        matched: o,
                        consumedSegments: a,
                        lastChild: l,
                        positionalParamSegments: c,
                    } = zd(e, r, s);
                    if (!o) return Qd(e);
                    const u = this.applyRedirectCommands(a, r.redirectTo, c);
                    return r.redirectTo.startsWith("/")
                        ? Kd(u)
                        : this.lineralizeSegments(r, u).pipe(
                              F((r) =>
                                  this.expandSegment(
                                      t,
                                      e,
                                      n,
                                      r.concat(s.slice(l)),
                                      i,
                                      !1
                                  )
                              )
                          );
                }
                matchSegmentAgainstRoute(t, e, n, r, s) {
                    if ("**" === n.path)
                        return n.loadChildren
                            ? this.configLoader
                                  .load(t.injector, n)
                                  .pipe(
                                      T(
                                          (t) => (
                                              (n._loadedConfig = t),
                                              new Ph(r, {})
                                          )
                                      )
                                  )
                            : ou(new Ph(r, {}));
                    const {
                        matched: i,
                        consumedSegments: o,
                        lastChild: a,
                    } = zd(e, n, r);
                    if (!i) return Qd(e);
                    const l = r.slice(a);
                    return this.getChildConfig(t, n, r).pipe(
                        F((t) => {
                            const r = t.module,
                                i = t.routes,
                                { segmentGroup: a, slicedSegments: c } = $d(
                                    e,
                                    o,
                                    l,
                                    i
                                ),
                                u = new Ph(a.segments, a.children);
                            if (0 === c.length && u.hasChildren())
                                return this.expandChildren(r, i, u).pipe(
                                    T((t) => new Ph(o, t))
                                );
                            if (0 === i.length && 0 === c.length)
                                return ou(new Ph(o, {}));
                            const h = Ld(n) === s;
                            return this.expandSegment(
                                r,
                                u,
                                i,
                                c,
                                h ? yh : s,
                                !0
                            ).pipe(
                                T(
                                    (t) =>
                                        new Ph(o.concat(t.segments), t.children)
                                )
                            );
                        })
                    );
                }
                getChildConfig(t, e, n) {
                    return e.children
                        ? ou(new Ad(e.children, t))
                        : e.loadChildren
                        ? void 0 !== e._loadedConfig
                            ? ou(e._loadedConfig)
                            : this.runCanLoadGuards(t.injector, e, n).pipe(
                                  F((n) =>
                                      n
                                          ? this.configLoader
                                                .load(t.injector, e)
                                                .pipe(
                                                    T(
                                                        (t) => (
                                                            (e._loadedConfig =
                                                                t),
                                                            t
                                                        )
                                                    )
                                                )
                                          : (function (t) {
                                                return new v((e) =>
                                                    e.error(
                                                        bh(
                                                            `Cannot load children because the guard of the route "path: '${t.path}'" returned false`
                                                        )
                                                    )
                                                );
                                            })(e)
                                  )
                              )
                        : ou(new Ad([], t));
                }
                runCanLoadGuards(t, e, n) {
                    const r = e.canLoad;
                    return r && 0 !== r.length
                        ? ou(
                              r.map((r) => {
                                  const s = t.get(r);
                                  let i;
                                  if (
                                      (function (t) {
                                          return t && Dd(t.canLoad);
                                      })(s)
                                  )
                                      i = s.canLoad(e, n);
                                  else {
                                      if (!Dd(s))
                                          throw new Error(
                                              "Invalid CanLoad guard"
                                          );
                                      i = s(e, n);
                                  }
                                  return kh(i);
                              })
                          ).pipe(
                              Pd(),
                              Qu((t) => {
                                  if (!Id(t)) return;
                                  const e = bh(
                                      `Redirecting to "${this.urlSerializer.serialize(
                                          t
                                      )}"`
                                  );
                                  throw ((e.url = t), e);
                              }),
                              T((t) => !0 === t)
                          )
                        : ou(!0);
                }
                lineralizeSegments(t, e) {
                    let n = [],
                        r = e.root;
                    for (;;) {
                        if (
                            ((n = n.concat(r.segments)),
                            0 === r.numberOfChildren)
                        )
                            return ou(n);
                        if (r.numberOfChildren > 1 || !r.children.primary)
                            return Jd(t.redirectTo);
                        r = r.children.primary;
                    }
                }
                applyRedirectCommands(t, e, n) {
                    return this.applyRedirectCreatreUrlTree(
                        e,
                        this.urlSerializer.parse(e),
                        t,
                        n
                    );
                }
                applyRedirectCreatreUrlTree(t, e, n, r) {
                    const s = this.createSegmentGroup(t, e.root, n, r);
                    return new Rh(
                        s,
                        this.createQueryParams(
                            e.queryParams,
                            this.urlTree.queryParams
                        ),
                        e.fragment
                    );
                }
                createQueryParams(t, e) {
                    const n = {};
                    return (
                        Th(t, (t, r) => {
                            if ("string" == typeof t && t.startsWith(":")) {
                                const s = t.substring(1);
                                n[r] = e[s];
                            } else n[r] = t;
                        }),
                        n
                    );
                }
                createSegmentGroup(t, e, n, r) {
                    const s = this.createSegments(t, e.segments, n, r);
                    let i = {};
                    return (
                        Th(e.children, (e, s) => {
                            i[s] = this.createSegmentGroup(t, e, n, r);
                        }),
                        new Ph(s, i)
                    );
                }
                createSegments(t, e, n, r) {
                    return e.map((e) =>
                        e.path.startsWith(":")
                            ? this.findPosParam(t, e, r)
                            : this.findOrReturn(e, n)
                    );
                }
                findPosParam(t, e, n) {
                    const r = n[e.path.substring(1)];
                    if (!r)
                        throw new Error(
                            `Cannot redirect to '${t}'. Cannot find '${e.path}'.`
                        );
                    return r;
                }
                findOrReturn(t, e) {
                    let n = 0;
                    for (const r of e) {
                        if (r.path === t.path) return e.splice(n), r;
                        n++;
                    }
                    return t;
                }
            }
            function Xd(t) {
                const e = {};
                for (const n of Object.keys(t.children)) {
                    const r = Xd(t.children[n]);
                    (r.segments.length > 0 || r.hasChildren()) && (e[n] = r);
                }
                return (function (t) {
                    if (1 === t.numberOfChildren && t.children.primary) {
                        const e = t.children.primary;
                        return new Ph(
                            t.segments.concat(e.segments),
                            e.children
                        );
                    }
                    return t;
                })(new Ph(t.segments, e));
            }
            class tp {
                constructor(t) {
                    (this.path = t),
                        (this.route = this.path[this.path.length - 1]);
                }
            }
            class ep {
                constructor(t, e) {
                    (this.component = t), (this.route = e);
                }
            }
            function np(t, e, n) {
                const r = t._root;
                return sp(r, e ? e._root : null, n, [r.value]);
            }
            function rp(t, e, n) {
                const r = (function (t) {
                    if (!t) return null;
                    for (let e = t.parent; e; e = e.parent) {
                        const t = e.routeConfig;
                        if (t && t._loadedConfig) return t._loadedConfig;
                    }
                    return null;
                })(e);
                return (r ? r.module.injector : n).get(t);
            }
            function sp(
                t,
                e,
                n,
                r,
                s = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
                const i = nd(e);
                return (
                    t.children.forEach((t) => {
                        !(function (
                            t,
                            e,
                            n,
                            r,
                            s = {
                                canDeactivateChecks: [],
                                canActivateChecks: [],
                            }
                        ) {
                            const i = t.value,
                                o = e ? e.value : null,
                                a = n ? n.getContext(t.value.outlet) : null;
                            if (o && i.routeConfig === o.routeConfig) {
                                const l = (function (t, e, n) {
                                    if ("function" == typeof n) return n(t, e);
                                    switch (n) {
                                        case "pathParamsChange":
                                            return !jh(t.url, e.url);
                                        case "pathParamsOrQueryParamsChange":
                                            return (
                                                !jh(t.url, e.url) ||
                                                !Ch(
                                                    t.queryParams,
                                                    e.queryParams
                                                )
                                            );
                                        case "always":
                                            return !0;
                                        case "paramsOrQueryParamsChange":
                                            return (
                                                !dd(t, e) ||
                                                !Ch(
                                                    t.queryParams,
                                                    e.queryParams
                                                )
                                            );
                                        case "paramsChange":
                                        default:
                                            return !dd(t, e);
                                    }
                                })(o, i, i.routeConfig.runGuardsAndResolvers);
                                l
                                    ? s.canActivateChecks.push(new tp(r))
                                    : ((i.data = o.data),
                                      (i._resolvedData = o._resolvedData)),
                                    sp(
                                        t,
                                        e,
                                        i.component
                                            ? a
                                                ? a.children
                                                : null
                                            : n,
                                        r,
                                        s
                                    ),
                                    l &&
                                        a &&
                                        a.outlet &&
                                        a.outlet.isActivated &&
                                        s.canDeactivateChecks.push(
                                            new ep(a.outlet.component, o)
                                        );
                            } else
                                o && ip(e, a, s),
                                    s.canActivateChecks.push(new tp(r)),
                                    sp(
                                        t,
                                        null,
                                        i.component
                                            ? a
                                                ? a.children
                                                : null
                                            : n,
                                        r,
                                        s
                                    );
                        })(t, i[t.value.outlet], n, r.concat([t.value]), s),
                            delete i[t.value.outlet];
                    }),
                    Th(i, (t, e) => ip(t, n.getContext(e), s)),
                    s
                );
            }
            function ip(t, e, n) {
                const r = nd(t),
                    s = t.value;
                Th(r, (t, r) => {
                    ip(
                        t,
                        s.component ? (e ? e.children.getContext(r) : null) : e,
                        n
                    );
                }),
                    n.canDeactivateChecks.push(
                        new ep(
                            s.component && e && e.outlet && e.outlet.isActivated
                                ? e.outlet.component
                                : null,
                            s
                        )
                    );
            }
            function op(t, e) {
                return null !== t && e && e(new fh(t)), ou(!0);
            }
            function ap(t, e) {
                return null !== t && e && e(new dh(t)), ou(!0);
            }
            function lp(t, e, n) {
                const r = e.routeConfig ? e.routeConfig.canActivate : null;
                return r && 0 !== r.length
                    ? ou(
                          r.map((r) =>
                              yu(() => {
                                  const s = rp(r, e, n);
                                  let i;
                                  if (
                                      (function (t) {
                                          return t && Dd(t.canActivate);
                                      })(s)
                                  )
                                      i = kh(s.canActivate(e, t));
                                  else {
                                      if (!Dd(s))
                                          throw new Error(
                                              "Invalid CanActivate guard"
                                          );
                                      i = kh(s(e, t));
                                  }
                                  return i.pipe(Zu());
                              })
                          )
                      ).pipe(Pd())
                    : ou(!0);
            }
            function cp(t, e, n) {
                const r = e[e.length - 1],
                    s = e
                        .slice(0, e.length - 1)
                        .reverse()
                        .map((t) =>
                            (function (t) {
                                const e = t.routeConfig
                                    ? t.routeConfig.canActivateChild
                                    : null;
                                return e && 0 !== e.length
                                    ? { node: t, guards: e }
                                    : null;
                            })(t)
                        )
                        .filter((t) => null !== t)
                        .map((e) =>
                            yu(() =>
                                ou(
                                    e.guards.map((s) => {
                                        const i = rp(s, e.node, n);
                                        let o;
                                        if (
                                            (function (t) {
                                                return (
                                                    t && Dd(t.canActivateChild)
                                                );
                                            })(i)
                                        )
                                            o = kh(i.canActivateChild(r, t));
                                        else {
                                            if (!Dd(i))
                                                throw new Error(
                                                    "Invalid CanActivateChild guard"
                                                );
                                            o = kh(i(r, t));
                                        }
                                        return o.pipe(Zu());
                                    })
                                ).pipe(Pd())
                            )
                        );
                return ou(s).pipe(Pd());
            }
            class up {}
            function hp(t) {
                return new v((e) => e.error(t));
            }
            class dp {
                constructor(t, e, n, r, s, i) {
                    (this.rootComponentType = t),
                        (this.config = e),
                        (this.urlTree = n),
                        (this.url = r),
                        (this.paramsInheritanceStrategy = s),
                        (this.relativeLinkResolution = i);
                }
                recognize() {
                    const t = $d(
                            this.urlTree.root,
                            [],
                            [],
                            this.config.filter((t) => void 0 === t.redirectTo),
                            this.relativeLinkResolution
                        ).segmentGroup,
                        e = this.processSegmentGroup(this.config, t, yh);
                    if (null === e) return null;
                    const n = new ad(
                            [],
                            Object.freeze({}),
                            Object.freeze(
                                Object.assign({}, this.urlTree.queryParams)
                            ),
                            this.urlTree.fragment,
                            {},
                            yh,
                            this.rootComponentType,
                            null,
                            this.urlTree.root,
                            -1,
                            {}
                        ),
                        r = new ed(n, e),
                        s = new ld(this.url, r);
                    return this.inheritParamsAndData(s._root), s;
                }
                inheritParamsAndData(t) {
                    const e = t.value,
                        n = od(e, this.paramsInheritanceStrategy);
                    (e.params = Object.freeze(n.params)),
                        (e.data = Object.freeze(n.data)),
                        t.children.forEach((t) => this.inheritParamsAndData(t));
                }
                processSegmentGroup(t, e, n) {
                    return 0 === e.segments.length && e.hasChildren()
                        ? this.processChildren(t, e)
                        : this.processSegment(t, e, e.segments, n);
                }
                processChildren(t, e) {
                    const n = [];
                    for (const s of Object.keys(e.children)) {
                        const r = e.children[s],
                            i = Fd(t, s),
                            o = this.processSegmentGroup(i, r, s);
                        if (null === o) return null;
                        n.push(...o);
                    }
                    const r = (function (t) {
                        const e = [];
                        for (const n of t) {
                            if (!pp(n)) {
                                e.push(n);
                                continue;
                            }
                            const t = e.find(
                                (t) =>
                                    n.value.routeConfig === t.value.routeConfig
                            );
                            void 0 !== t
                                ? t.children.push(...n.children)
                                : e.push(n);
                        }
                        return e;
                    })(n);
                    return (
                        r.sort((t, e) =>
                            t.value.outlet === yh
                                ? -1
                                : e.value.outlet === yh
                                ? 1
                                : t.value.outlet.localeCompare(e.value.outlet)
                        ),
                        r
                    );
                }
                processSegment(t, e, n, r) {
                    for (const s of t) {
                        const t = this.processSegmentAgainstRoute(s, e, n, r);
                        if (null !== t) return t;
                    }
                    return Wd(e, n, r) ? [] : null;
                }
                processSegmentAgainstRoute(t, e, n, r) {
                    if (t.redirectTo || !Bd(t, e, n, r)) return null;
                    let s,
                        i = [],
                        o = [];
                    if ("**" === t.path) {
                        const r = n.length > 0 ? Eh(n).parameters : {};
                        s = new ad(
                            n,
                            r,
                            Object.freeze(
                                Object.assign({}, this.urlTree.queryParams)
                            ),
                            this.urlTree.fragment,
                            mp(t),
                            Ld(t),
                            t.component,
                            t,
                            fp(e),
                            gp(e) + n.length,
                            yp(t)
                        );
                    } else {
                        const r = zd(e, t, n);
                        if (!r.matched) return null;
                        (i = r.consumedSegments),
                            (o = n.slice(r.lastChild)),
                            (s = new ad(
                                i,
                                r.parameters,
                                Object.freeze(
                                    Object.assign({}, this.urlTree.queryParams)
                                ),
                                this.urlTree.fragment,
                                mp(t),
                                Ld(t),
                                t.component,
                                t,
                                fp(e),
                                gp(e) + i.length,
                                yp(t)
                            ));
                    }
                    const a = (function (t) {
                            return t.children
                                ? t.children
                                : t.loadChildren
                                ? t._loadedConfig.routes
                                : [];
                        })(t),
                        { segmentGroup: l, slicedSegments: c } = $d(
                            e,
                            i,
                            o,
                            a.filter((t) => void 0 === t.redirectTo),
                            this.relativeLinkResolution
                        );
                    if (0 === c.length && l.hasChildren()) {
                        const t = this.processChildren(a, l);
                        return null === t ? null : [new ed(s, t)];
                    }
                    if (0 === a.length && 0 === c.length)
                        return [new ed(s, [])];
                    const u = Ld(t) === r,
                        h = this.processSegment(a, l, c, u ? yh : r);
                    return null === h ? null : [new ed(s, h)];
                }
            }
            function pp(t) {
                const e = t.value.routeConfig;
                return e && "" === e.path && void 0 === e.redirectTo;
            }
            function fp(t) {
                let e = t;
                for (; e._sourceSegment; ) e = e._sourceSegment;
                return e;
            }
            function gp(t) {
                let e = t,
                    n = e._segmentIndexShift ? e._segmentIndexShift : 0;
                for (; e._sourceSegment; )
                    (e = e._sourceSegment),
                        (n += e._segmentIndexShift ? e._segmentIndexShift : 0);
                return n - 1;
            }
            function mp(t) {
                return t.data || {};
            }
            function yp(t) {
                return t.resolve || {};
            }
            function vp(t) {
                return function (e) {
                    return e.pipe(
                        vu((e) => {
                            const n = t(e);
                            return n ? M(n).pipe(T(() => e)) : M([e]);
                        })
                    );
                };
            }
            class _p extends class {
                shouldDetach(t) {
                    return !1;
                }
                store(t, e) {}
                shouldAttach(t) {
                    return !1;
                }
                retrieve(t) {
                    return null;
                }
                shouldReuseRoute(t, e) {
                    return t.routeConfig === e.routeConfig;
                }
            } {}
            const bp = new qn("ROUTES");
            class wp {
                constructor(t, e, n, r) {
                    (this.loader = t),
                        (this.compiler = e),
                        (this.onLoadStartListener = n),
                        (this.onLoadEndListener = r);
                }
                load(t, e) {
                    return (
                        this.onLoadStartListener && this.onLoadStartListener(e),
                        this.loadModuleFactory(e.loadChildren).pipe(
                            T((n) => {
                                this.onLoadEndListener &&
                                    this.onLoadEndListener(e);
                                const r = n.create(t);
                                return new Ad(
                                    xh(r.injector.get(bp)).map(Ud),
                                    r
                                );
                            })
                        )
                    );
                }
                loadModuleFactory(t) {
                    return "string" == typeof t
                        ? M(this.loader.load(t))
                        : kh(t()).pipe(
                              F((t) =>
                                  t instanceof da
                                      ? ou(t)
                                      : M(this.compiler.compileModuleAsync(t))
                              )
                          );
                }
            }
            class Cp {
                constructor() {
                    (this.outlet = null),
                        (this.route = null),
                        (this.resolver = null),
                        (this.children = new Sp()),
                        (this.attachRef = null);
                }
            }
            class Sp {
                constructor() {
                    this.contexts = new Map();
                }
                onChildOutletCreated(t, e) {
                    const n = this.getOrCreateContext(t);
                    (n.outlet = e), this.contexts.set(t, n);
                }
                onChildOutletDestroyed(t) {
                    const e = this.getContext(t);
                    e && (e.outlet = null);
                }
                onOutletDeactivated() {
                    const t = this.contexts;
                    return (this.contexts = new Map()), t;
                }
                onOutletReAttached(t) {
                    this.contexts = t;
                }
                getOrCreateContext(t) {
                    let e = this.getContext(t);
                    return e || ((e = new Cp()), this.contexts.set(t, e)), e;
                }
                getContext(t) {
                    return this.contexts.get(t) || null;
                }
            }
            class xp {
                shouldProcessUrl(t) {
                    return !0;
                }
                extract(t) {
                    return t;
                }
                merge(t, e) {
                    return t;
                }
            }
            function Ep(t) {
                throw t;
            }
            function Tp(t, e, n) {
                return e.parse("/");
            }
            function kp(t, e) {
                return ou(null);
            }
            let Op = (() => {
                    class t {
                        constructor(t, e, n, r, s, i, o, a) {
                            (this.rootComponentType = t),
                                (this.urlSerializer = e),
                                (this.rootContexts = n),
                                (this.location = r),
                                (this.config = a),
                                (this.lastSuccessfulNavigation = null),
                                (this.currentNavigation = null),
                                (this.lastLocationChangeInfo = null),
                                (this.navigationId = 0),
                                (this.isNgZoneEnabled = !1),
                                (this.events = new S()),
                                (this.errorHandler = Ep),
                                (this.malformedUriErrorHandler = Tp),
                                (this.navigated = !1),
                                (this.lastSuccessfulId = -1),
                                (this.hooks = {
                                    beforePreactivation: kp,
                                    afterPreactivation: kp,
                                }),
                                (this.urlHandlingStrategy = new xp()),
                                (this.routeReuseStrategy = new _p()),
                                (this.onSameUrlNavigation = "ignore"),
                                (this.paramsInheritanceStrategy = "emptyOnly"),
                                (this.urlUpdateStrategy = "deferred"),
                                (this.relativeLinkResolution = "corrected"),
                                (this.ngModule = s.get(ha)),
                                (this.console = s.get(ll));
                            const l = s.get(wl);
                            (this.isNgZoneEnabled = l instanceof wl),
                                this.resetConfig(a),
                                (this.currentUrlTree = new Rh(
                                    new Ph([], {}),
                                    {},
                                    null
                                )),
                                (this.rawUrlTree = this.currentUrlTree),
                                (this.browserUrlTree = this.currentUrlTree),
                                (this.configLoader = new wp(
                                    i,
                                    o,
                                    (t) => this.triggerEvent(new uh(t)),
                                    (t) => this.triggerEvent(new hh(t))
                                )),
                                (this.routerState = sd(
                                    this.currentUrlTree,
                                    this.rootComponentType
                                )),
                                (this.transitions = new au({
                                    id: 0,
                                    currentUrlTree: this.currentUrlTree,
                                    currentRawUrl: this.currentUrlTree,
                                    extractedUrl:
                                        this.urlHandlingStrategy.extract(
                                            this.currentUrlTree
                                        ),
                                    urlAfterRedirects:
                                        this.urlHandlingStrategy.extract(
                                            this.currentUrlTree
                                        ),
                                    rawUrl: this.currentUrlTree,
                                    extras: {},
                                    resolve: null,
                                    reject: null,
                                    promise: Promise.resolve(!0),
                                    source: "imperative",
                                    restoredState: null,
                                    currentSnapshot: this.routerState.snapshot,
                                    targetSnapshot: null,
                                    currentRouterState: this.routerState,
                                    targetRouterState: null,
                                    guards: {
                                        canActivateChecks: [],
                                        canDeactivateChecks: [],
                                    },
                                    guardsResult: null,
                                })),
                                (this.navigations = this.setupNavigations(
                                    this.transitions
                                )),
                                this.processNavigations();
                        }
                        setupNavigations(t) {
                            const e = this.events;
                            return t.pipe(
                                Du((t) => 0 !== t.id),
                                T((t) =>
                                    Object.assign(Object.assign({}, t), {
                                        extractedUrl:
                                            this.urlHandlingStrategy.extract(
                                                t.rawUrl
                                            ),
                                    })
                                ),
                                vu((t) => {
                                    let n = !1,
                                        r = !1;
                                    return ou(t).pipe(
                                        Qu((t) => {
                                            this.currentNavigation = {
                                                id: t.id,
                                                initialUrl: t.currentRawUrl,
                                                extractedUrl: t.extractedUrl,
                                                trigger: t.source,
                                                extras: t.extras,
                                                previousNavigation: this
                                                    .lastSuccessfulNavigation
                                                    ? Object.assign(
                                                          Object.assign(
                                                              {},
                                                              this
                                                                  .lastSuccessfulNavigation
                                                          ),
                                                          {
                                                              previousNavigation:
                                                                  null,
                                                          }
                                                      )
                                                    : null,
                                            };
                                        }),
                                        vu((t) => {
                                            const n =
                                                !this.navigated ||
                                                t.extractedUrl.toString() !==
                                                    this.browserUrlTree.toString();
                                            if (
                                                ("reload" ===
                                                    this.onSameUrlNavigation ||
                                                    n) &&
                                                this.urlHandlingStrategy.shouldProcessUrl(
                                                    t.rawUrl
                                                )
                                            )
                                                return ou(t).pipe(
                                                    vu((t) => {
                                                        const n =
                                                            this.transitions.getValue();
                                                        return (
                                                            e.next(
                                                                new eh(
                                                                    t.id,
                                                                    this.serializeUrl(
                                                                        t.extractedUrl
                                                                    ),
                                                                    t.source,
                                                                    t.restoredState
                                                                )
                                                            ),
                                                            n !==
                                                            this.transitions.getValue()
                                                                ? gu
                                                                : [t]
                                                        );
                                                    }),
                                                    vu((t) =>
                                                        Promise.resolve(t)
                                                    ),
                                                    ((r =
                                                        this.ngModule.injector),
                                                    (s = this.configLoader),
                                                    (i = this.urlSerializer),
                                                    (o = this.config),
                                                    function (t) {
                                                        return t.pipe(
                                                            vu((t) =>
                                                                (function (
                                                                    t,
                                                                    e,
                                                                    n,
                                                                    r,
                                                                    s
                                                                ) {
                                                                    return new Yd(
                                                                        t,
                                                                        e,
                                                                        n,
                                                                        r,
                                                                        s
                                                                    ).apply();
                                                                })(
                                                                    r,
                                                                    s,
                                                                    i,
                                                                    t.extractedUrl,
                                                                    o
                                                                ).pipe(
                                                                    T((e) =>
                                                                        Object.assign(
                                                                            Object.assign(
                                                                                {},
                                                                                t
                                                                            ),
                                                                            {
                                                                                urlAfterRedirects:
                                                                                    e,
                                                                            }
                                                                        )
                                                                    )
                                                                )
                                                            )
                                                        );
                                                    }),
                                                    Qu((t) => {
                                                        this.currentNavigation =
                                                            Object.assign(
                                                                Object.assign(
                                                                    {},
                                                                    this
                                                                        .currentNavigation
                                                                ),
                                                                {
                                                                    finalUrl:
                                                                        t.urlAfterRedirects,
                                                                }
                                                            );
                                                    }),
                                                    (function (t, e, n, r, s) {
                                                        return function (i) {
                                                            return i.pipe(
                                                                F((i) =>
                                                                    (function (
                                                                        t,
                                                                        e,
                                                                        n,
                                                                        r,
                                                                        s = "emptyOnly",
                                                                        i = "legacy"
                                                                    ) {
                                                                        try {
                                                                            const o =
                                                                                new dp(
                                                                                    t,
                                                                                    e,
                                                                                    n,
                                                                                    r,
                                                                                    s,
                                                                                    i
                                                                                ).recognize();
                                                                            return null ===
                                                                                o
                                                                                ? hp(
                                                                                      new up()
                                                                                  )
                                                                                : ou(
                                                                                      o
                                                                                  );
                                                                        } catch (o) {
                                                                            return hp(
                                                                                o
                                                                            );
                                                                        }
                                                                    })(
                                                                        t,
                                                                        e,
                                                                        i.urlAfterRedirects,
                                                                        n(
                                                                            i.urlAfterRedirects
                                                                        ),
                                                                        r,
                                                                        s
                                                                    ).pipe(
                                                                        T((t) =>
                                                                            Object.assign(
                                                                                Object.assign(
                                                                                    {},
                                                                                    i
                                                                                ),
                                                                                {
                                                                                    targetSnapshot:
                                                                                        t,
                                                                                }
                                                                            )
                                                                        )
                                                                    )
                                                                )
                                                            );
                                                        };
                                                    })(
                                                        this.rootComponentType,
                                                        this.config,
                                                        (t) =>
                                                            this.serializeUrl(
                                                                t
                                                            ),
                                                        this
                                                            .paramsInheritanceStrategy,
                                                        this
                                                            .relativeLinkResolution
                                                    ),
                                                    Qu((t) => {
                                                        "eager" ===
                                                            this
                                                                .urlUpdateStrategy &&
                                                            (t.extras
                                                                .skipLocationChange ||
                                                                this.setBrowserUrl(
                                                                    t.urlAfterRedirects,
                                                                    !!t.extras
                                                                        .replaceUrl,
                                                                    t.id,
                                                                    t.extras
                                                                        .state
                                                                ),
                                                            (this.browserUrlTree =
                                                                t.urlAfterRedirects));
                                                    }),
                                                    Qu((t) => {
                                                        const n = new ih(
                                                            t.id,
                                                            this.serializeUrl(
                                                                t.extractedUrl
                                                            ),
                                                            this.serializeUrl(
                                                                t.urlAfterRedirects
                                                            ),
                                                            t.targetSnapshot
                                                        );
                                                        e.next(n);
                                                    })
                                                );
                                            var r, s, i, o;
                                            if (
                                                n &&
                                                this.rawUrlTree &&
                                                this.urlHandlingStrategy.shouldProcessUrl(
                                                    this.rawUrlTree
                                                )
                                            ) {
                                                const {
                                                        id: n,
                                                        extractedUrl: r,
                                                        source: s,
                                                        restoredState: i,
                                                        extras: o,
                                                    } = t,
                                                    a = new eh(
                                                        n,
                                                        this.serializeUrl(r),
                                                        s,
                                                        i
                                                    );
                                                e.next(a);
                                                const l = sd(
                                                    r,
                                                    this.rootComponentType
                                                ).snapshot;
                                                return ou(
                                                    Object.assign(
                                                        Object.assign({}, t),
                                                        {
                                                            targetSnapshot: l,
                                                            urlAfterRedirects:
                                                                r,
                                                            extras: Object.assign(
                                                                Object.assign(
                                                                    {},
                                                                    o
                                                                ),
                                                                {
                                                                    skipLocationChange:
                                                                        !1,
                                                                    replaceUrl:
                                                                        !1,
                                                                }
                                                            ),
                                                        }
                                                    )
                                                );
                                            }
                                            return (
                                                (this.rawUrlTree = t.rawUrl),
                                                (this.browserUrlTree =
                                                    t.urlAfterRedirects),
                                                t.resolve(null),
                                                gu
                                            );
                                        }),
                                        vp((t) => {
                                            const {
                                                targetSnapshot: e,
                                                id: n,
                                                extractedUrl: r,
                                                rawUrl: s,
                                                extras: {
                                                    skipLocationChange: i,
                                                    replaceUrl: o,
                                                },
                                            } = t;
                                            return this.hooks.beforePreactivation(
                                                e,
                                                {
                                                    navigationId: n,
                                                    appliedUrlTree: r,
                                                    rawUrlTree: s,
                                                    skipLocationChange: !!i,
                                                    replaceUrl: !!o,
                                                }
                                            );
                                        }),
                                        Qu((t) => {
                                            const e = new oh(
                                                t.id,
                                                this.serializeUrl(
                                                    t.extractedUrl
                                                ),
                                                this.serializeUrl(
                                                    t.urlAfterRedirects
                                                ),
                                                t.targetSnapshot
                                            );
                                            this.triggerEvent(e);
                                        }),
                                        T((t) =>
                                            Object.assign(
                                                Object.assign({}, t),
                                                {
                                                    guards: np(
                                                        t.targetSnapshot,
                                                        t.currentSnapshot,
                                                        this.rootContexts
                                                    ),
                                                }
                                            )
                                        ),
                                        (function (t, e) {
                                            return function (n) {
                                                return n.pipe(
                                                    F((n) => {
                                                        const {
                                                            targetSnapshot: r,
                                                            currentSnapshot: s,
                                                            guards: {
                                                                canActivateChecks:
                                                                    i,
                                                                canDeactivateChecks:
                                                                    o,
                                                            },
                                                        } = n;
                                                        return 0 === o.length &&
                                                            0 === i.length
                                                            ? ou(
                                                                  Object.assign(
                                                                      Object.assign(
                                                                          {},
                                                                          n
                                                                      ),
                                                                      {
                                                                          guardsResult:
                                                                              !0,
                                                                      }
                                                                  )
                                                              )
                                                            : (function (
                                                                  t,
                                                                  e,
                                                                  n,
                                                                  r
                                                              ) {
                                                                  return M(
                                                                      t
                                                                  ).pipe(
                                                                      F((t) =>
                                                                          (function (
                                                                              t,
                                                                              e,
                                                                              n,
                                                                              r,
                                                                              s
                                                                          ) {
                                                                              const i =
                                                                                  e &&
                                                                                  e.routeConfig
                                                                                      ? e
                                                                                            .routeConfig
                                                                                            .canDeactivate
                                                                                      : null;
                                                                              return i &&
                                                                                  0 !==
                                                                                      i.length
                                                                                  ? ou(
                                                                                        i.map(
                                                                                            (
                                                                                                i
                                                                                            ) => {
                                                                                                const o =
                                                                                                    rp(
                                                                                                        i,
                                                                                                        e,
                                                                                                        s
                                                                                                    );
                                                                                                let a;
                                                                                                if (
                                                                                                    (function (
                                                                                                        t
                                                                                                    ) {
                                                                                                        return (
                                                                                                            t &&
                                                                                                            Dd(
                                                                                                                t.canDeactivate
                                                                                                            )
                                                                                                        );
                                                                                                    })(
                                                                                                        o
                                                                                                    )
                                                                                                )
                                                                                                    a =
                                                                                                        kh(
                                                                                                            o.canDeactivate(
                                                                                                                t,
                                                                                                                e,
                                                                                                                n,
                                                                                                                r
                                                                                                            )
                                                                                                        );
                                                                                                else {
                                                                                                    if (
                                                                                                        !Dd(
                                                                                                            o
                                                                                                        )
                                                                                                    )
                                                                                                        throw new Error(
                                                                                                            "Invalid CanDeactivate guard"
                                                                                                        );
                                                                                                    a =
                                                                                                        kh(
                                                                                                            o(
                                                                                                                t,
                                                                                                                e,
                                                                                                                n,
                                                                                                                r
                                                                                                            )
                                                                                                        );
                                                                                                }
                                                                                                return a.pipe(
                                                                                                    Zu()
                                                                                                );
                                                                                            }
                                                                                        )
                                                                                    ).pipe(
                                                                                        Pd()
                                                                                    )
                                                                                  : ou(
                                                                                        !0
                                                                                    );
                                                                          })(
                                                                              t.component,
                                                                              t.route,
                                                                              n,
                                                                              e,
                                                                              r
                                                                          )
                                                                      ),
                                                                      Zu(
                                                                          (t) =>
                                                                              !0 !==
                                                                              t,
                                                                          !0
                                                                      )
                                                                  );
                                                              })(
                                                                  o,
                                                                  r,
                                                                  s,
                                                                  t
                                                              ).pipe(
                                                                  F((n) =>
                                                                      n &&
                                                                      "boolean" ==
                                                                          typeof n
                                                                          ? (function (
                                                                                t,
                                                                                e,
                                                                                n,
                                                                                r
                                                                            ) {
                                                                                return M(
                                                                                    e
                                                                                ).pipe(
                                                                                    Mu(
                                                                                        (
                                                                                            e
                                                                                        ) =>
                                                                                            M(
                                                                                                [
                                                                                                    ap(
                                                                                                        e
                                                                                                            .route
                                                                                                            .parent,
                                                                                                        r
                                                                                                    ),
                                                                                                    op(
                                                                                                        e.route,
                                                                                                        r
                                                                                                    ),
                                                                                                    cp(
                                                                                                        t,
                                                                                                        e.path,
                                                                                                        n
                                                                                                    ),
                                                                                                    lp(
                                                                                                        t,
                                                                                                        e.route,
                                                                                                        n
                                                                                                    ),
                                                                                                ]
                                                                                            ).pipe(
                                                                                                Eu(),
                                                                                                Zu(
                                                                                                    (
                                                                                                        t
                                                                                                    ) =>
                                                                                                        !0 !==
                                                                                                        t,
                                                                                                    !0
                                                                                                )
                                                                                            )
                                                                                    ),
                                                                                    Zu(
                                                                                        (
                                                                                            t
                                                                                        ) =>
                                                                                            !0 !==
                                                                                            t,
                                                                                        !0
                                                                                    )
                                                                                );
                                                                            })(
                                                                                r,
                                                                                i,
                                                                                t,
                                                                                e
                                                                            )
                                                                          : ou(
                                                                                n
                                                                            )
                                                                  ),
                                                                  T((t) =>
                                                                      Object.assign(
                                                                          Object.assign(
                                                                              {},
                                                                              n
                                                                          ),
                                                                          {
                                                                              guardsResult:
                                                                                  t,
                                                                          }
                                                                      )
                                                                  )
                                                              );
                                                    })
                                                );
                                            };
                                        })(this.ngModule.injector, (t) =>
                                            this.triggerEvent(t)
                                        ),
                                        Qu((t) => {
                                            if (Id(t.guardsResult)) {
                                                const e = bh(
                                                    `Redirecting to "${this.serializeUrl(
                                                        t.guardsResult
                                                    )}"`
                                                );
                                                throw (
                                                    ((e.url = t.guardsResult),
                                                    e)
                                                );
                                            }
                                        }),
                                        Qu((t) => {
                                            const e = new ah(
                                                t.id,
                                                this.serializeUrl(
                                                    t.extractedUrl
                                                ),
                                                this.serializeUrl(
                                                    t.urlAfterRedirects
                                                ),
                                                t.targetSnapshot,
                                                !!t.guardsResult
                                            );
                                            this.triggerEvent(e);
                                        }),
                                        Du((t) => {
                                            if (!t.guardsResult) {
                                                this.resetUrlToCurrentUrlTree();
                                                const n = new rh(
                                                    t.id,
                                                    this.serializeUrl(
                                                        t.extractedUrl
                                                    ),
                                                    ""
                                                );
                                                return (
                                                    e.next(n), t.resolve(!1), !1
                                                );
                                            }
                                            return !0;
                                        }),
                                        vp((t) => {
                                            if (
                                                t.guards.canActivateChecks
                                                    .length
                                            )
                                                return ou(t).pipe(
                                                    Qu((t) => {
                                                        const e = new lh(
                                                            t.id,
                                                            this.serializeUrl(
                                                                t.extractedUrl
                                                            ),
                                                            this.serializeUrl(
                                                                t.urlAfterRedirects
                                                            ),
                                                            t.targetSnapshot
                                                        );
                                                        this.triggerEvent(e);
                                                    }),
                                                    vu((t) => {
                                                        let n = !1;
                                                        return ou(t).pipe(
                                                            ((r =
                                                                this
                                                                    .paramsInheritanceStrategy),
                                                            (s =
                                                                this.ngModule
                                                                    .injector),
                                                            function (t) {
                                                                return t.pipe(
                                                                    F((t) => {
                                                                        const {
                                                                            targetSnapshot:
                                                                                e,
                                                                            guards: {
                                                                                canActivateChecks:
                                                                                    n,
                                                                            },
                                                                        } = t;
                                                                        if (
                                                                            !n.length
                                                                        )
                                                                            return ou(
                                                                                t
                                                                            );
                                                                        let i = 0;
                                                                        return M(
                                                                            n
                                                                        ).pipe(
                                                                            Mu(
                                                                                (
                                                                                    t
                                                                                ) =>
                                                                                    (function (
                                                                                        t,
                                                                                        e,
                                                                                        n,
                                                                                        r
                                                                                    ) {
                                                                                        return (function (
                                                                                            t,
                                                                                            e,
                                                                                            n,
                                                                                            r
                                                                                        ) {
                                                                                            const s =
                                                                                                Object.keys(
                                                                                                    t
                                                                                                );
                                                                                            if (
                                                                                                0 ===
                                                                                                s.length
                                                                                            )
                                                                                                return ou(
                                                                                                    {}
                                                                                                );
                                                                                            const i =
                                                                                                {};
                                                                                            return M(
                                                                                                s
                                                                                            ).pipe(
                                                                                                F(
                                                                                                    (
                                                                                                        s
                                                                                                    ) =>
                                                                                                        (function (
                                                                                                            t,
                                                                                                            e,
                                                                                                            n,
                                                                                                            r
                                                                                                        ) {
                                                                                                            const s =
                                                                                                                rp(
                                                                                                                    t,
                                                                                                                    e,
                                                                                                                    r
                                                                                                                );
                                                                                                            return kh(
                                                                                                                s.resolve
                                                                                                                    ? s.resolve(
                                                                                                                          e,
                                                                                                                          n
                                                                                                                      )
                                                                                                                    : s(
                                                                                                                          e,
                                                                                                                          n
                                                                                                                      )
                                                                                                            );
                                                                                                        })(
                                                                                                            t[
                                                                                                                s
                                                                                                            ],
                                                                                                            e,
                                                                                                            n,
                                                                                                            r
                                                                                                        ).pipe(
                                                                                                            Qu(
                                                                                                                (
                                                                                                                    t
                                                                                                                ) => {
                                                                                                                    i[
                                                                                                                        s
                                                                                                                    ] =
                                                                                                                        t;
                                                                                                                }
                                                                                                            )
                                                                                                        )
                                                                                                ),
                                                                                                Nu(
                                                                                                    1
                                                                                                ),
                                                                                                F(
                                                                                                    () =>
                                                                                                        Object.keys(
                                                                                                            i
                                                                                                        )
                                                                                                            .length ===
                                                                                                        s.length
                                                                                                            ? ou(
                                                                                                                  i
                                                                                                              )
                                                                                                            : gu
                                                                                                )
                                                                                            );
                                                                                        })(
                                                                                            t._resolve,
                                                                                            t,
                                                                                            e,
                                                                                            r
                                                                                        ).pipe(
                                                                                            T(
                                                                                                (
                                                                                                    e
                                                                                                ) => (
                                                                                                    (t._resolvedData =
                                                                                                        e),
                                                                                                    (t.data =
                                                                                                        Object.assign(
                                                                                                            Object.assign(
                                                                                                                {},
                                                                                                                t.data
                                                                                                            ),
                                                                                                            od(
                                                                                                                t,
                                                                                                                n
                                                                                                            )
                                                                                                                .resolve
                                                                                                        )),
                                                                                                    null
                                                                                                )
                                                                                            )
                                                                                        );
                                                                                    })(
                                                                                        t.route,
                                                                                        e,
                                                                                        r,
                                                                                        s
                                                                                    )
                                                                            ),
                                                                            Qu(
                                                                                () =>
                                                                                    i++
                                                                            ),
                                                                            Nu(
                                                                                1
                                                                            ),
                                                                            F(
                                                                                (
                                                                                    e
                                                                                ) =>
                                                                                    i ===
                                                                                    n.length
                                                                                        ? ou(
                                                                                              t
                                                                                          )
                                                                                        : gu
                                                                            )
                                                                        );
                                                                    })
                                                                );
                                                            }),
                                                            Qu({
                                                                next: () =>
                                                                    (n = !0),
                                                                complete:
                                                                    () => {
                                                                        if (
                                                                            !n
                                                                        ) {
                                                                            const n =
                                                                                new rh(
                                                                                    t.id,
                                                                                    this.serializeUrl(
                                                                                        t.extractedUrl
                                                                                    ),
                                                                                    "At least one route resolver didn't emit any value."
                                                                                );
                                                                            e.next(
                                                                                n
                                                                            ),
                                                                                t.resolve(
                                                                                    !1
                                                                                );
                                                                        }
                                                                    },
                                                            })
                                                        );
                                                        var r, s;
                                                    }),
                                                    Qu((t) => {
                                                        const e = new ch(
                                                            t.id,
                                                            this.serializeUrl(
                                                                t.extractedUrl
                                                            ),
                                                            this.serializeUrl(
                                                                t.urlAfterRedirects
                                                            ),
                                                            t.targetSnapshot
                                                        );
                                                        this.triggerEvent(e);
                                                    })
                                                );
                                        }),
                                        vp((t) => {
                                            const {
                                                targetSnapshot: e,
                                                id: n,
                                                extractedUrl: r,
                                                rawUrl: s,
                                                extras: {
                                                    skipLocationChange: i,
                                                    replaceUrl: o,
                                                },
                                            } = t;
                                            return this.hooks.afterPreactivation(
                                                e,
                                                {
                                                    navigationId: n,
                                                    appliedUrlTree: r,
                                                    rawUrlTree: s,
                                                    skipLocationChange: !!i,
                                                    replaceUrl: !!o,
                                                }
                                            );
                                        }),
                                        T((t) => {
                                            const e = (function (t, e, n) {
                                                const r = pd(
                                                    t,
                                                    e._root,
                                                    n ? n._root : void 0
                                                );
                                                return new rd(r, e);
                                            })(
                                                this.routeReuseStrategy,
                                                t.targetSnapshot,
                                                t.currentRouterState
                                            );
                                            return Object.assign(
                                                Object.assign({}, t),
                                                { targetRouterState: e }
                                            );
                                        }),
                                        Qu((t) => {
                                            (this.currentUrlTree =
                                                t.urlAfterRedirects),
                                                (this.rawUrlTree =
                                                    this.urlHandlingStrategy.merge(
                                                        this.currentUrlTree,
                                                        t.rawUrl
                                                    )),
                                                (this.routerState =
                                                    t.targetRouterState),
                                                "deferred" ===
                                                    this.urlUpdateStrategy &&
                                                    (t.extras
                                                        .skipLocationChange ||
                                                        this.setBrowserUrl(
                                                            this.rawUrlTree,
                                                            !!t.extras
                                                                .replaceUrl,
                                                            t.id,
                                                            t.extras.state
                                                        ),
                                                    (this.browserUrlTree =
                                                        t.urlAfterRedirects));
                                        }),
                                        ((i = this.rootContexts),
                                        (o = this.routeReuseStrategy),
                                        (a = (t) => this.triggerEvent(t)),
                                        T(
                                            (t) => (
                                                new kd(
                                                    o,
                                                    t.targetRouterState,
                                                    t.currentRouterState,
                                                    a
                                                ).activate(i),
                                                t
                                            )
                                        )),
                                        Qu({
                                            next() {
                                                n = !0;
                                            },
                                            complete() {
                                                n = !0;
                                            },
                                        }),
                                        ((s = () => {
                                            if (!n && !r) {
                                                this.resetUrlToCurrentUrlTree();
                                                const n = new rh(
                                                    t.id,
                                                    this.serializeUrl(
                                                        t.extractedUrl
                                                    ),
                                                    `Navigation ID ${t.id} is not equal to the current navigation id ${this.navigationId}`
                                                );
                                                e.next(n), t.resolve(!1);
                                            }
                                            this.currentNavigation = null;
                                        }),
                                        (t) => t.lift(new Yu(s))),
                                        Pu((n) => {
                                            if (
                                                ((r = !0),
                                                (s = n) &&
                                                    s.ngNavigationCancelingError)
                                            ) {
                                                const r = Id(n.url);
                                                r ||
                                                    ((this.navigated = !0),
                                                    this.resetStateAndUrl(
                                                        t.currentRouterState,
                                                        t.currentUrlTree,
                                                        t.rawUrl
                                                    ));
                                                const s = new rh(
                                                    t.id,
                                                    this.serializeUrl(
                                                        t.extractedUrl
                                                    ),
                                                    n.message
                                                );
                                                e.next(s),
                                                    r
                                                        ? setTimeout(() => {
                                                              const e =
                                                                  this.urlHandlingStrategy.merge(
                                                                      n.url,
                                                                      this
                                                                          .rawUrlTree
                                                                  );
                                                              return this.scheduleNavigation(
                                                                  e,
                                                                  "imperative",
                                                                  null,
                                                                  {
                                                                      skipLocationChange:
                                                                          t
                                                                              .extras
                                                                              .skipLocationChange,
                                                                      replaceUrl:
                                                                          "eager" ===
                                                                          this
                                                                              .urlUpdateStrategy,
                                                                  },
                                                                  {
                                                                      resolve:
                                                                          t.resolve,
                                                                      reject: t.reject,
                                                                      promise:
                                                                          t.promise,
                                                                  }
                                                              );
                                                          }, 0)
                                                        : t.resolve(!1);
                                            } else {
                                                this.resetStateAndUrl(
                                                    t.currentRouterState,
                                                    t.currentUrlTree,
                                                    t.rawUrl
                                                );
                                                const r = new sh(
                                                    t.id,
                                                    this.serializeUrl(
                                                        t.extractedUrl
                                                    ),
                                                    n
                                                );
                                                e.next(r);
                                                try {
                                                    t.resolve(
                                                        this.errorHandler(n)
                                                    );
                                                } catch (i) {
                                                    t.reject(i);
                                                }
                                            }
                                            var s;
                                            return gu;
                                        })
                                    );
                                    var s, i, o, a;
                                })
                            );
                        }
                        resetRootComponentType(t) {
                            (this.rootComponentType = t),
                                (this.routerState.root.component =
                                    this.rootComponentType);
                        }
                        getTransition() {
                            const t = this.transitions.value;
                            return (
                                (t.urlAfterRedirects = this.browserUrlTree), t
                            );
                        }
                        setTransition(t) {
                            this.transitions.next(
                                Object.assign(
                                    Object.assign({}, this.getTransition()),
                                    t
                                )
                            );
                        }
                        initialNavigation() {
                            this.setUpLocationChangeListener(),
                                0 === this.navigationId &&
                                    this.navigateByUrl(this.location.path(!0), {
                                        replaceUrl: !0,
                                    });
                        }
                        setUpLocationChangeListener() {
                            this.locationSubscription ||
                                (this.locationSubscription =
                                    this.location.subscribe((t) => {
                                        const e =
                                            this.extractLocationChangeInfoFromEvent(
                                                t
                                            );
                                        this.shouldScheduleNavigation(
                                            this.lastLocationChangeInfo,
                                            e
                                        ) &&
                                            setTimeout(() => {
                                                const {
                                                        source: t,
                                                        state: n,
                                                        urlTree: r,
                                                    } = e,
                                                    s = { replaceUrl: !0 };
                                                if (n) {
                                                    const t = Object.assign(
                                                        {},
                                                        n
                                                    );
                                                    delete t.navigationId,
                                                        0 !==
                                                            Object.keys(t)
                                                                .length &&
                                                            (s.state = t);
                                                }
                                                this.scheduleNavigation(
                                                    r,
                                                    t,
                                                    n,
                                                    s
                                                );
                                            }, 0),
                                            (this.lastLocationChangeInfo = e);
                                    }));
                        }
                        extractLocationChangeInfoFromEvent(t) {
                            var e;
                            return {
                                source:
                                    "popstate" === t.type
                                        ? "popstate"
                                        : "hashchange",
                                urlTree: this.parseUrl(t.url),
                                state: (
                                    null === (e = t.state) || void 0 === e
                                        ? void 0
                                        : e.navigationId
                                )
                                    ? t.state
                                    : null,
                                transitionId: this.getTransition().id,
                            };
                        }
                        shouldScheduleNavigation(t, e) {
                            if (!t) return !0;
                            const n =
                                e.urlTree.toString() === t.urlTree.toString();
                            return !(
                                e.transitionId === t.transitionId &&
                                n &&
                                (("hashchange" === e.source &&
                                    "popstate" === t.source) ||
                                    ("popstate" === e.source &&
                                        "hashchange" === t.source))
                            );
                        }
                        get url() {
                            return this.serializeUrl(this.currentUrlTree);
                        }
                        getCurrentNavigation() {
                            return this.currentNavigation;
                        }
                        triggerEvent(t) {
                            this.events.next(t);
                        }
                        resetConfig(t) {
                            jd(t),
                                (this.config = t.map(Ud)),
                                (this.navigated = !1),
                                (this.lastSuccessfulId = -1);
                        }
                        ngOnDestroy() {
                            this.dispose();
                        }
                        dispose() {
                            this.locationSubscription &&
                                (this.locationSubscription.unsubscribe(),
                                (this.locationSubscription = void 0));
                        }
                        createUrlTree(t, e = {}) {
                            const {
                                    relativeTo: n,
                                    queryParams: r,
                                    fragment: s,
                                    queryParamsHandling: i,
                                    preserveFragment: o,
                                } = e,
                                a = n || this.routerState.root,
                                l = o ? this.currentUrlTree.fragment : s;
                            let c = null;
                            switch (i) {
                                case "merge":
                                    c = Object.assign(
                                        Object.assign(
                                            {},
                                            this.currentUrlTree.queryParams
                                        ),
                                        r
                                    );
                                    break;
                                case "preserve":
                                    c = this.currentUrlTree.queryParams;
                                    break;
                                default:
                                    c = r || null;
                            }
                            return (
                                null !== c && (c = this.removeEmptyProps(c)),
                                (function (t, e, n, r, s) {
                                    if (0 === n.length)
                                        return yd(e.root, e.root, e, r, s);
                                    const i = (function (t) {
                                        if (
                                            "string" == typeof t[0] &&
                                            1 === t.length &&
                                            "/" === t[0]
                                        )
                                            return new _d(!0, 0, t);
                                        let e = 0,
                                            n = !1;
                                        const r = t.reduce((t, r, s) => {
                                            if (
                                                "object" == typeof r &&
                                                null != r
                                            ) {
                                                if (r.outlets) {
                                                    const e = {};
                                                    return (
                                                        Th(
                                                            r.outlets,
                                                            (t, n) => {
                                                                e[n] =
                                                                    "string" ==
                                                                    typeof t
                                                                        ? t.split(
                                                                              "/"
                                                                          )
                                                                        : t;
                                                            }
                                                        ),
                                                        [...t, { outlets: e }]
                                                    );
                                                }
                                                if (r.segmentPath)
                                                    return [
                                                        ...t,
                                                        r.segmentPath,
                                                    ];
                                            }
                                            return "string" != typeof r
                                                ? [...t, r]
                                                : 0 === s
                                                ? (r
                                                      .split("/")
                                                      .forEach((r, s) => {
                                                          (0 == s &&
                                                              "." === r) ||
                                                              (0 == s &&
                                                              "" === r
                                                                  ? (n = !0)
                                                                  : ".." === r
                                                                  ? e++
                                                                  : "" != r &&
                                                                    t.push(r));
                                                      }),
                                                  t)
                                                : [...t, r];
                                        }, []);
                                        return new _d(n, e, r);
                                    })(n);
                                    if (i.toRoot())
                                        return yd(
                                            e.root,
                                            new Ph([], {}),
                                            e,
                                            r,
                                            s
                                        );
                                    const o = (function (t, e, n) {
                                            if (t.isAbsolute)
                                                return new bd(e.root, !0, 0);
                                            if (
                                                -1 === n.snapshot._lastPathIndex
                                            ) {
                                                const t =
                                                    n.snapshot._urlSegment;
                                                return new bd(
                                                    t,
                                                    t === e.root,
                                                    0
                                                );
                                            }
                                            const r = gd(t.commands[0]) ? 0 : 1;
                                            return (function (t, e, n) {
                                                let r = t,
                                                    s = e,
                                                    i = n;
                                                for (; i > s; ) {
                                                    if (
                                                        ((i -= s),
                                                        (r = r.parent),
                                                        !r)
                                                    )
                                                        throw new Error(
                                                            "Invalid number of '../'"
                                                        );
                                                    s = r.segments.length;
                                                }
                                                return new bd(r, !1, s - i);
                                            })(
                                                n.snapshot._urlSegment,
                                                n.snapshot._lastPathIndex + r,
                                                t.numberOfDoubleDots
                                            );
                                        })(i, e, t),
                                        a = o.processChildren
                                            ? Cd(
                                                  o.segmentGroup,
                                                  o.index,
                                                  i.commands
                                              )
                                            : wd(
                                                  o.segmentGroup,
                                                  o.index,
                                                  i.commands
                                              );
                                    return yd(o.segmentGroup, a, e, r, s);
                                })(a, this.currentUrlTree, t, c, l)
                            );
                        }
                        navigateByUrl(t, e = { skipLocationChange: !1 }) {
                            const n = Id(t) ? t : this.parseUrl(t),
                                r = this.urlHandlingStrategy.merge(
                                    n,
                                    this.rawUrlTree
                                );
                            return this.scheduleNavigation(
                                r,
                                "imperative",
                                null,
                                e
                            );
                        }
                        navigate(t, e = { skipLocationChange: !1 }) {
                            return (
                                (function (t) {
                                    for (let e = 0; e < t.length; e++) {
                                        const n = t[e];
                                        if (null == n)
                                            throw new Error(
                                                `The requested path contains ${n} segment at index ${e}`
                                            );
                                    }
                                })(t),
                                this.navigateByUrl(this.createUrlTree(t, e), e)
                            );
                        }
                        serializeUrl(t) {
                            return this.urlSerializer.serialize(t);
                        }
                        parseUrl(t) {
                            let e;
                            try {
                                e = this.urlSerializer.parse(t);
                            } catch (n) {
                                e = this.malformedUriErrorHandler(
                                    n,
                                    this.urlSerializer,
                                    t
                                );
                            }
                            return e;
                        }
                        isActive(t, e) {
                            if (Id(t)) return Oh(this.currentUrlTree, t, e);
                            const n = this.parseUrl(t);
                            return Oh(this.currentUrlTree, n, e);
                        }
                        removeEmptyProps(t) {
                            return Object.keys(t).reduce((e, n) => {
                                const r = t[n];
                                return null != r && (e[n] = r), e;
                            }, {});
                        }
                        processNavigations() {
                            this.navigations.subscribe(
                                (t) => {
                                    (this.navigated = !0),
                                        (this.lastSuccessfulId = t.id),
                                        this.events.next(
                                            new nh(
                                                t.id,
                                                this.serializeUrl(
                                                    t.extractedUrl
                                                ),
                                                this.serializeUrl(
                                                    this.currentUrlTree
                                                )
                                            )
                                        ),
                                        (this.lastSuccessfulNavigation =
                                            this.currentNavigation),
                                        (this.currentNavigation = null),
                                        t.resolve(!0);
                                },
                                (t) => {
                                    this.console.warn(
                                        "Unhandled Navigation Error: "
                                    );
                                }
                            );
                        }
                        scheduleNavigation(t, e, n, r, s) {
                            const i = this.getTransition(),
                                o =
                                    "imperative" !== e &&
                                    "imperative" ===
                                        (null == i ? void 0 : i.source),
                                a =
                                    (this.lastSuccessfulId === i.id ||
                                    this.currentNavigation
                                        ? i.rawUrl
                                        : i.urlAfterRedirects
                                    ).toString() === t.toString();
                            if (o && a) return Promise.resolve(!0);
                            let l, c, u;
                            s
                                ? ((l = s.resolve),
                                  (c = s.reject),
                                  (u = s.promise))
                                : (u = new Promise((t, e) => {
                                      (l = t), (c = e);
                                  }));
                            const h = ++this.navigationId;
                            return (
                                this.setTransition({
                                    id: h,
                                    source: e,
                                    restoredState: n,
                                    currentUrlTree: this.currentUrlTree,
                                    currentRawUrl: this.rawUrlTree,
                                    rawUrl: t,
                                    extras: r,
                                    resolve: l,
                                    reject: c,
                                    promise: u,
                                    currentSnapshot: this.routerState.snapshot,
                                    currentRouterState: this.routerState,
                                }),
                                u.catch((t) => Promise.reject(t))
                            );
                        }
                        setBrowserUrl(t, e, n, r) {
                            const s = this.urlSerializer.serialize(t);
                            (r = r || {}),
                                this.location.isCurrentPathEqualTo(s) || e
                                    ? this.location.replaceState(
                                          s,
                                          "",
                                          Object.assign(Object.assign({}, r), {
                                              navigationId: n,
                                          })
                                      )
                                    : this.location.go(
                                          s,
                                          "",
                                          Object.assign(Object.assign({}, r), {
                                              navigationId: n,
                                          })
                                      );
                        }
                        resetStateAndUrl(t, e, n) {
                            (this.routerState = t),
                                (this.currentUrlTree = e),
                                (this.rawUrlTree =
                                    this.urlHandlingStrategy.merge(
                                        this.currentUrlTree,
                                        n
                                    )),
                                this.resetUrlToCurrentUrlTree();
                        }
                        resetUrlToCurrentUrlTree() {
                            this.location.replaceState(
                                this.urlSerializer.serialize(this.rawUrlTree),
                                "",
                                { navigationId: this.lastSuccessfulId }
                            );
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)(
                                dr(Wn),
                                dr(Mh),
                                dr(Sp),
                                dr(gc),
                                dr(_i),
                                dr(ql),
                                dr(vl),
                                dr(void 0)
                            );
                        }),
                        (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
                        t
                    );
                })(),
                Ap = (() => {
                    class t {
                        constructor(t, e, n, r, s) {
                            (this.router = t),
                                (this.route = e),
                                (this.commands = []),
                                (this.onChanges = new S()),
                                null == n &&
                                    r.setAttribute(
                                        s.nativeElement,
                                        "tabindex",
                                        "0"
                                    );
                        }
                        ngOnChanges(t) {
                            this.onChanges.next(this);
                        }
                        set routerLink(t) {
                            this.commands =
                                null != t ? (Array.isArray(t) ? t : [t]) : [];
                        }
                        onClick() {
                            const t = {
                                skipLocationChange: Ip(this.skipLocationChange),
                                replaceUrl: Ip(this.replaceUrl),
                                state: this.state,
                            };
                            return (
                                this.router.navigateByUrl(this.urlTree, t), !0
                            );
                        }
                        get urlTree() {
                            return this.router.createUrlTree(this.commands, {
                                relativeTo: this.route,
                                queryParams: this.queryParams,
                                fragment: this.fragment,
                                queryParamsHandling: this.queryParamsHandling,
                                preserveFragment: Ip(this.preserveFragment),
                            });
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)(
                                Ni(Op),
                                Ni(id),
                                Un("tabindex"),
                                Ni(jo),
                                Ni(Po)
                            );
                        }),
                        (t.ɵdir = $t({
                            type: t,
                            selectors: [
                                ["", "routerLink", "", 5, "a", 5, "area"],
                            ],
                            hostBindings: function (t, e) {
                                1 & t &&
                                    Wi("click", function () {
                                        return e.onClick();
                                    });
                            },
                            inputs: {
                                routerLink: "routerLink",
                                queryParams: "queryParams",
                                fragment: "fragment",
                                queryParamsHandling: "queryParamsHandling",
                                preserveFragment: "preserveFragment",
                                skipLocationChange: "skipLocationChange",
                                replaceUrl: "replaceUrl",
                                state: "state",
                            },
                            features: [oe],
                        })),
                        t
                    );
                })(),
                Dp = (() => {
                    class t {
                        constructor(t, e, n) {
                            (this.router = t),
                                (this.route = e),
                                (this.locationStrategy = n),
                                (this.commands = []),
                                (this.onChanges = new S()),
                                (this.subscription = t.events.subscribe((t) => {
                                    t instanceof nh &&
                                        this.updateTargetUrlAndHref();
                                }));
                        }
                        set routerLink(t) {
                            this.commands =
                                null != t ? (Array.isArray(t) ? t : [t]) : [];
                        }
                        ngOnChanges(t) {
                            this.updateTargetUrlAndHref(),
                                this.onChanges.next(this);
                        }
                        ngOnDestroy() {
                            this.subscription.unsubscribe();
                        }
                        onClick(t, e, n, r, s) {
                            if (0 !== t || e || n || r || s) return !0;
                            if (
                                "string" == typeof this.target &&
                                "_self" != this.target
                            )
                                return !0;
                            const i = {
                                skipLocationChange: Ip(this.skipLocationChange),
                                replaceUrl: Ip(this.replaceUrl),
                                state: this.state,
                            };
                            return (
                                this.router.navigateByUrl(this.urlTree, i), !1
                            );
                        }
                        updateTargetUrlAndHref() {
                            this.href =
                                this.locationStrategy.prepareExternalUrl(
                                    this.router.serializeUrl(this.urlTree)
                                );
                        }
                        get urlTree() {
                            return this.router.createUrlTree(this.commands, {
                                relativeTo: this.route,
                                queryParams: this.queryParams,
                                fragment: this.fragment,
                                queryParamsHandling: this.queryParamsHandling,
                                preserveFragment: Ip(this.preserveFragment),
                            });
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)(Ni(Op), Ni(id), Ni(uc));
                        }),
                        (t.ɵdir = $t({
                            type: t,
                            selectors: [
                                ["a", "routerLink", ""],
                                ["area", "routerLink", ""],
                            ],
                            hostVars: 2,
                            hostBindings: function (t, e) {
                                1 & t &&
                                    Wi("click", function (t) {
                                        return e.onClick(
                                            t.button,
                                            t.ctrlKey,
                                            t.shiftKey,
                                            t.altKey,
                                            t.metaKey
                                        );
                                    }),
                                    2 & t &&
                                        (co("href", e.href, _r),
                                        Pi("target", e.target));
                            },
                            inputs: {
                                routerLink: "routerLink",
                                target: "target",
                                queryParams: "queryParams",
                                fragment: "fragment",
                                queryParamsHandling: "queryParamsHandling",
                                preserveFragment: "preserveFragment",
                                skipLocationChange: "skipLocationChange",
                                replaceUrl: "replaceUrl",
                                state: "state",
                            },
                            features: [oe],
                        })),
                        t
                    );
                })();
            function Ip(t) {
                return "" === t || !!t;
            }
            let Rp = (() => {
                    class t {
                        constructor(t, e, n, r, s, i) {
                            (this.router = t),
                                (this.element = e),
                                (this.renderer = n),
                                (this.cdr = r),
                                (this.link = s),
                                (this.linkWithHref = i),
                                (this.classes = []),
                                (this.isActive = !1),
                                (this.routerLinkActiveOptions = { exact: !1 }),
                                (this.routerEventsSubscription =
                                    t.events.subscribe((t) => {
                                        t instanceof nh && this.update();
                                    }));
                        }
                        ngAfterContentInit() {
                            M([
                                this.links.changes,
                                this.linksWithHrefs.changes,
                                ou(null),
                            ])
                                .pipe($())
                                .subscribe((t) => {
                                    this.update(),
                                        this.subscribeToEachLinkOnChanges();
                                });
                        }
                        subscribeToEachLinkOnChanges() {
                            var t;
                            null === (t = this.linkInputChangesSubscription) ||
                                void 0 === t ||
                                t.unsubscribe();
                            const e = [
                                ...this.links.toArray(),
                                ...this.linksWithHrefs.toArray(),
                                this.link,
                                this.linkWithHref,
                            ]
                                .filter((t) => !!t)
                                .map((t) => t.onChanges);
                            this.linkInputChangesSubscription = M(e)
                                .pipe($())
                                .subscribe((t) => {
                                    this.isActive !==
                                        this.isLinkActive(this.router)(t) &&
                                        this.update();
                                });
                        }
                        set routerLinkActive(t) {
                            const e = Array.isArray(t) ? t : t.split(" ");
                            this.classes = e.filter((t) => !!t);
                        }
                        ngOnChanges(t) {
                            this.update();
                        }
                        ngOnDestroy() {
                            var t;
                            this.routerEventsSubscription.unsubscribe(),
                                null ===
                                    (t = this.linkInputChangesSubscription) ||
                                    void 0 === t ||
                                    t.unsubscribe();
                        }
                        update() {
                            this.links &&
                                this.linksWithHrefs &&
                                this.router.navigated &&
                                Promise.resolve().then(() => {
                                    const t = this.hasActiveLinks();
                                    this.isActive !== t &&
                                        ((this.isActive = t),
                                        this.cdr.markForCheck(),
                                        this.classes.forEach((e) => {
                                            t
                                                ? this.renderer.addClass(
                                                      this.element
                                                          .nativeElement,
                                                      e
                                                  )
                                                : this.renderer.removeClass(
                                                      this.element
                                                          .nativeElement,
                                                      e
                                                  );
                                        }));
                                });
                        }
                        isLinkActive(t) {
                            return (e) =>
                                t.isActive(
                                    e.urlTree,
                                    this.routerLinkActiveOptions.exact
                                );
                        }
                        hasActiveLinks() {
                            const t = this.isLinkActive(this.router);
                            return (
                                (this.link && t(this.link)) ||
                                (this.linkWithHref && t(this.linkWithHref)) ||
                                this.links.some(t) ||
                                this.linksWithHrefs.some(t)
                            );
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)(
                                Ni(Op),
                                Ni(Po),
                                Ni(jo),
                                Ni(na),
                                Ni(Ap, 8),
                                Ni(Dp, 8)
                            );
                        }),
                        (t.ɵdir = $t({
                            type: t,
                            selectors: [["", "routerLinkActive", ""]],
                            contentQueries: function (t, e, n) {
                                if (
                                    (1 & t && (Za(n, Ap, !0), Za(n, Dp, !0)),
                                    2 & t)
                                ) {
                                    let t;
                                    Ba((t = Ga())) && (e.links = t),
                                        Ba((t = Ga())) &&
                                            (e.linksWithHrefs = t);
                                }
                            },
                            inputs: {
                                routerLinkActiveOptions:
                                    "routerLinkActiveOptions",
                                routerLinkActive: "routerLinkActive",
                            },
                            exportAs: ["routerLinkActive"],
                            features: [oe],
                        })),
                        t
                    );
                })(),
                Pp = (() => {
                    class t {
                        constructor(t, e, n, r, s) {
                            (this.parentContexts = t),
                                (this.location = e),
                                (this.resolver = n),
                                (this.changeDetector = s),
                                (this.activated = null),
                                (this._activatedRoute = null),
                                (this.activateEvents = new Pa()),
                                (this.deactivateEvents = new Pa()),
                                (this.name = r || yh),
                                t.onChildOutletCreated(this.name, this);
                        }
                        ngOnDestroy() {
                            this.parentContexts.onChildOutletDestroyed(
                                this.name
                            );
                        }
                        ngOnInit() {
                            if (!this.activated) {
                                const t = this.parentContexts.getContext(
                                    this.name
                                );
                                t &&
                                    t.route &&
                                    (t.attachRef
                                        ? this.attach(t.attachRef, t.route)
                                        : this.activateWith(
                                              t.route,
                                              t.resolver || null
                                          ));
                            }
                        }
                        get isActivated() {
                            return !!this.activated;
                        }
                        get component() {
                            if (!this.activated)
                                throw new Error("Outlet is not activated");
                            return this.activated.instance;
                        }
                        get activatedRoute() {
                            if (!this.activated)
                                throw new Error("Outlet is not activated");
                            return this._activatedRoute;
                        }
                        get activatedRouteData() {
                            return this._activatedRoute
                                ? this._activatedRoute.snapshot.data
                                : {};
                        }
                        detach() {
                            if (!this.activated)
                                throw new Error("Outlet is not activated");
                            this.location.detach();
                            const t = this.activated;
                            return (
                                (this.activated = null),
                                (this._activatedRoute = null),
                                t
                            );
                        }
                        attach(t, e) {
                            (this.activated = t),
                                (this._activatedRoute = e),
                                this.location.insert(t.hostView);
                        }
                        deactivate() {
                            if (this.activated) {
                                const t = this.component;
                                this.activated.destroy(),
                                    (this.activated = null),
                                    (this._activatedRoute = null),
                                    this.deactivateEvents.emit(t);
                            }
                        }
                        activateWith(t, e) {
                            if (this.isActivated)
                                throw new Error(
                                    "Cannot activate an already activated outlet"
                                );
                            this._activatedRoute = t;
                            const n = (e =
                                    e || this.resolver).resolveComponentFactory(
                                    t._futureSnapshot.routeConfig.component
                                ),
                                r = this.parentContexts.getOrCreateContext(
                                    this.name
                                ).children,
                                s = new Vp(t, r, this.location.injector);
                            (this.activated = this.location.createComponent(
                                n,
                                this.location.length,
                                s
                            )),
                                this.changeDetector.markForCheck(),
                                this.activateEvents.emit(
                                    this.activated.instance
                                );
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)(
                                Ni(Sp),
                                Ni(fa),
                                Ni(Ao),
                                Un("name"),
                                Ni(na)
                            );
                        }),
                        (t.ɵdir = $t({
                            type: t,
                            selectors: [["router-outlet"]],
                            outputs: {
                                activateEvents: "activate",
                                deactivateEvents: "deactivate",
                            },
                            exportAs: ["outlet"],
                        })),
                        t
                    );
                })();
            class Vp {
                constructor(t, e, n) {
                    (this.route = t),
                        (this.childContexts = e),
                        (this.parent = n);
                }
                get(t, e) {
                    return t === id
                        ? this.route
                        : t === Sp
                        ? this.childContexts
                        : this.parent.get(t, e);
                }
            }
            class jp {}
            class Mp {
                preload(t, e) {
                    return ou(null);
                }
            }
            let Np = (() => {
                    class t {
                        constructor(t, e, n, r, s) {
                            (this.router = t),
                                (this.injector = r),
                                (this.preloadingStrategy = s),
                                (this.loader = new wp(
                                    e,
                                    n,
                                    (e) => t.triggerEvent(new uh(e)),
                                    (e) => t.triggerEvent(new hh(e))
                                ));
                        }
                        setUpPreloading() {
                            this.subscription = this.router.events
                                .pipe(
                                    Du((t) => t instanceof nh),
                                    Mu(() => this.preload())
                                )
                                .subscribe(() => {});
                        }
                        preload() {
                            const t = this.injector.get(ha);
                            return this.processRoutes(t, this.router.config);
                        }
                        ngOnDestroy() {
                            this.subscription &&
                                this.subscription.unsubscribe();
                        }
                        processRoutes(t, e) {
                            const n = [];
                            for (const r of e)
                                if (
                                    r.loadChildren &&
                                    !r.canLoad &&
                                    r._loadedConfig
                                ) {
                                    const t = r._loadedConfig;
                                    n.push(
                                        this.processRoutes(t.module, t.routes)
                                    );
                                } else
                                    r.loadChildren && !r.canLoad
                                        ? n.push(this.preloadConfig(t, r))
                                        : r.children &&
                                          n.push(
                                              this.processRoutes(t, r.children)
                                          );
                            return M(n).pipe(
                                $(),
                                T((t) => {})
                            );
                        }
                        preloadConfig(t, e) {
                            return this.preloadingStrategy.preload(e, () =>
                                this.loader
                                    .load(t.injector, e)
                                    .pipe(
                                        F(
                                            (t) => (
                                                (e._loadedConfig = t),
                                                this.processRoutes(
                                                    t.module,
                                                    t.routes
                                                )
                                            )
                                        )
                                    )
                            );
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)(
                                dr(Op),
                                dr(ql),
                                dr(vl),
                                dr(_i),
                                dr(jp)
                            );
                        }),
                        (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
                        t
                    );
                })(),
                Up = (() => {
                    class t {
                        constructor(t, e, n = {}) {
                            (this.router = t),
                                (this.viewportScroller = e),
                                (this.options = n),
                                (this.lastId = 0),
                                (this.lastSource = "imperative"),
                                (this.restoredId = 0),
                                (this.store = {}),
                                (n.scrollPositionRestoration =
                                    n.scrollPositionRestoration || "disabled"),
                                (n.anchorScrolling =
                                    n.anchorScrolling || "disabled");
                        }
                        init() {
                            "disabled" !==
                                this.options.scrollPositionRestoration &&
                                this.viewportScroller.setHistoryScrollRestoration(
                                    "manual"
                                ),
                                (this.routerEventsSubscription =
                                    this.createScrollEvents()),
                                (this.scrollEventsSubscription =
                                    this.consumeScrollEvents());
                        }
                        createScrollEvents() {
                            return this.router.events.subscribe((t) => {
                                t instanceof eh
                                    ? ((this.store[this.lastId] =
                                          this.viewportScroller.getScrollPosition()),
                                      (this.lastSource = t.navigationTrigger),
                                      (this.restoredId = t.restoredState
                                          ? t.restoredState.navigationId
                                          : 0))
                                    : t instanceof nh &&
                                      ((this.lastId = t.id),
                                      this.scheduleScrollEvent(
                                          t,
                                          this.router.parseUrl(
                                              t.urlAfterRedirects
                                          ).fragment
                                      ));
                            });
                        }
                        consumeScrollEvents() {
                            return this.router.events.subscribe((t) => {
                                t instanceof mh &&
                                    (t.position
                                        ? "top" ===
                                          this.options.scrollPositionRestoration
                                            ? this.viewportScroller.scrollToPosition(
                                                  [0, 0]
                                              )
                                            : "enabled" ===
                                                  this.options
                                                      .scrollPositionRestoration &&
                                              this.viewportScroller.scrollToPosition(
                                                  t.position
                                              )
                                        : t.anchor &&
                                          "enabled" ===
                                              this.options.anchorScrolling
                                        ? this.viewportScroller.scrollToAnchor(
                                              t.anchor
                                          )
                                        : "disabled" !==
                                              this.options
                                                  .scrollPositionRestoration &&
                                          this.viewportScroller.scrollToPosition(
                                              [0, 0]
                                          ));
                            });
                        }
                        scheduleScrollEvent(t, e) {
                            this.router.triggerEvent(
                                new mh(
                                    t,
                                    "popstate" === this.lastSource
                                        ? this.store[this.restoredId]
                                        : null,
                                    e
                                )
                            );
                        }
                        ngOnDestroy() {
                            this.routerEventsSubscription &&
                                this.routerEventsSubscription.unsubscribe(),
                                this.scrollEventsSubscription &&
                                    this.scrollEventsSubscription.unsubscribe();
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)(dr(Op), dr(Ac), dr(void 0));
                        }),
                        (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
                        t
                    );
                })();
            const Lp = new qn("ROUTER_CONFIGURATION"),
                Fp = new qn("ROUTER_FORROOT_GUARD"),
                Hp = [
                    gc,
                    { provide: Mh, useClass: Nh },
                    {
                        provide: Op,
                        useFactory: function (
                            t,
                            e,
                            n,
                            r,
                            s,
                            i,
                            o,
                            a = {},
                            l,
                            c
                        ) {
                            const u = new Op(null, t, e, n, r, s, i, xh(o));
                            if (
                                (l && (u.urlHandlingStrategy = l),
                                c && (u.routeReuseStrategy = c),
                                (function (t, e) {
                                    t.errorHandler &&
                                        (e.errorHandler = t.errorHandler),
                                        t.malformedUriErrorHandler &&
                                            (e.malformedUriErrorHandler =
                                                t.malformedUriErrorHandler),
                                        t.onSameUrlNavigation &&
                                            (e.onSameUrlNavigation =
                                                t.onSameUrlNavigation),
                                        t.paramsInheritanceStrategy &&
                                            (e.paramsInheritanceStrategy =
                                                t.paramsInheritanceStrategy),
                                        t.relativeLinkResolution &&
                                            (e.relativeLinkResolution =
                                                t.relativeLinkResolution),
                                        t.urlUpdateStrategy &&
                                            (e.urlUpdateStrategy =
                                                t.urlUpdateStrategy);
                                })(a, u),
                                a.enableTracing)
                            ) {
                                const t = Xl();
                                u.events.subscribe((e) => {
                                    t.logGroup(
                                        "Router Event: " + e.constructor.name
                                    ),
                                        t.log(e.toString()),
                                        t.log(e),
                                        t.logGroupEnd();
                                });
                            }
                            return u;
                        },
                        deps: [
                            Mh,
                            Sp,
                            gc,
                            _i,
                            ql,
                            vl,
                            bp,
                            Lp,
                            [class {}, new er()],
                            [class {}, new er()],
                        ],
                    },
                    Sp,
                    {
                        provide: id,
                        useFactory: function (t) {
                            return t.routerState.root;
                        },
                        deps: [Op],
                    },
                    { provide: ql, useClass: Zl },
                    Np,
                    Mp,
                    class {
                        preload(t, e) {
                            return e().pipe(Pu(() => ou(null)));
                        }
                    },
                    { provide: Lp, useValue: { enableTracing: !1 } },
                ];
            function zp() {
                return new Nl("Router", Op);
            }
            let $p = (() => {
                class t {
                    constructor(t, e) {}
                    static forRoot(e, n) {
                        return {
                            ngModule: t,
                            providers: [
                                Hp,
                                Zp(e),
                                {
                                    provide: Fp,
                                    useFactory: Wp,
                                    deps: [[Op, new er(), new rr()]],
                                },
                                { provide: Lp, useValue: n || {} },
                                {
                                    provide: uc,
                                    useFactory: Bp,
                                    deps: [ec, [new tr(dc), new er()], Lp],
                                },
                                {
                                    provide: Up,
                                    useFactory: qp,
                                    deps: [Op, Ac, Lp],
                                },
                                {
                                    provide: jp,
                                    useExisting:
                                        n && n.preloadingStrategy
                                            ? n.preloadingStrategy
                                            : Mp,
                                },
                                { provide: Nl, multi: !0, useFactory: zp },
                                [
                                    Gp,
                                    {
                                        provide: tl,
                                        multi: !0,
                                        useFactory: Qp,
                                        deps: [Gp],
                                    },
                                    { provide: Jp, useFactory: Kp, deps: [Gp] },
                                    { provide: al, multi: !0, useExisting: Jp },
                                ],
                            ],
                        };
                    }
                    static forChild(e) {
                        return { ngModule: t, providers: [Zp(e)] };
                    }
                }
                return (
                    (t.ɵmod = Ht({ type: t })),
                    (t.ɵinj = at({
                        factory: function (e) {
                            return new (e || t)(dr(Fp, 8), dr(Op, 8));
                        },
                    })),
                    t
                );
            })();
            function qp(t, e, n) {
                return (
                    n.scrollOffset && e.setOffset(n.scrollOffset),
                    new Up(t, e, n)
                );
            }
            function Bp(t, e, n = {}) {
                return n.useHash ? new fc(t, e) : new pc(t, e);
            }
            function Wp(t) {
                return "guarded";
            }
            function Zp(t) {
                return [
                    { provide: Bn, multi: !0, useValue: t },
                    { provide: bp, multi: !0, useValue: t },
                ];
            }
            let Gp = (() => {
                class t {
                    constructor(t) {
                        (this.injector = t),
                            (this.initNavigation = !1),
                            (this.resultOfPreactivationDone = new S());
                    }
                    appInitializer() {
                        return this.injector
                            .get(rc, Promise.resolve(null))
                            .then(() => {
                                let t = null;
                                const e = new Promise((e) => (t = e)),
                                    n = this.injector.get(Op),
                                    r = this.injector.get(Lp);
                                return (
                                    "disabled" === r.initialNavigation
                                        ? (n.setUpLocationChangeListener(),
                                          t(!0))
                                        : "enabled" === r.initialNavigation ||
                                          "enabledBlocking" ===
                                              r.initialNavigation
                                        ? ((n.hooks.afterPreactivation = () =>
                                              this.initNavigation
                                                  ? ou(null)
                                                  : ((this.initNavigation = !0),
                                                    t(!0),
                                                    this
                                                        .resultOfPreactivationDone)),
                                          n.initialNavigation())
                                        : t(!0),
                                    e
                                );
                            });
                    }
                    bootstrapListener(t) {
                        const e = this.injector.get(Lp),
                            n = this.injector.get(Np),
                            r = this.injector.get(Up),
                            s = this.injector.get(Op),
                            i = this.injector.get(zl);
                        t === i.components[0] &&
                            (("enabledNonBlocking" !== e.initialNavigation &&
                                void 0 !== e.initialNavigation) ||
                                s.initialNavigation(),
                            n.setUpPreloading(),
                            r.init(),
                            s.resetRootComponentType(i.componentTypes[0]),
                            this.resultOfPreactivationDone.next(null),
                            this.resultOfPreactivationDone.complete());
                    }
                }
                return (
                    (t.ɵfac = function (e) {
                        return new (e || t)(dr(_i));
                    }),
                    (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
                    t
                );
            })();
            function Qp(t) {
                return t.appInitializer.bind(t);
            }
            function Kp(t) {
                return t.bootstrapListener.bind(t);
            }
            const Jp = new qn("Router Initializer");
            let Yp = (() => {
                    class t {
                        constructor() {
                            this.isOpen = !1;
                        }
                        toggleOpen() {
                            this.isOpen = !this.isOpen;
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)();
                        }),
                        (t.ɵdir = $t({
                            type: t,
                            selectors: [["", "appDropdown", ""]],
                            hostVars: 2,
                            hostBindings: function (t, e) {
                                1 & t &&
                                    Wi("click", function () {
                                        return e.toggleOpen();
                                    }),
                                    2 & t && eo("open", e.isOpen);
                            },
                        })),
                        t
                    );
                })(),
                Xp = (() => {
                    class t {
                        constructor() {}
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)();
                        }),
                        (t.ɵcmp = Nt({
                            type: t,
                            selectors: [["cms-header"]],
                            decls: 28,
                            vars: 0,
                            consts: [
                                [1, "navbar", "navbar-default"],
                                [1, "container-fuild"],
                                [1, "navbar-header"],
                                ["href", "#", 1, "navbar-brand"],
                                [1, "collapse", "navbar-collapse"],
                                [1, "nav", "navbar-nav"],
                                ["routerLinkActive", "active"],
                                ["routerLink", "/documents"],
                                ["routerLink", "/messages"],
                                ["routerLink", "/contacts"],
                                [1, "nav", "navbar-nav", "navbar-right"],
                                ["appDropdown", "", 1, "dropdown"],
                                [
                                    "href",
                                    "#",
                                    "role",
                                    "button",
                                    1,
                                    "dropdown-toggle",
                                ],
                                [1, "caret"],
                                [1, "dropdown-menu"],
                                ["href", "#"],
                            ],
                            template: function (t, e) {
                                1 & t &&
                                    (Fi(0, "div", 0),
                                    Fi(1, "div", 1),
                                    Fi(2, "div", 2),
                                    Fi(3, "a", 3),
                                    oo(4, "WeLearn CMS"),
                                    Hi(),
                                    Hi(),
                                    Fi(5, "div", 4),
                                    Fi(6, "ul", 5),
                                    Fi(7, "li", 6),
                                    Fi(8, "a", 7),
                                    oo(9, "Documents"),
                                    Hi(),
                                    Hi(),
                                    Fi(10, "li", 6),
                                    Fi(11, "a", 8),
                                    oo(12, "Messages"),
                                    Hi(),
                                    Hi(),
                                    Fi(13, "li", 6),
                                    Fi(14, "a", 9),
                                    oo(15, "Contacts"),
                                    Hi(),
                                    Hi(),
                                    Hi(),
                                    Fi(16, "ul", 10),
                                    Fi(17, "li", 11),
                                    Fi(18, "a", 12),
                                    oo(19, "User "),
                                    zi(20, "span", 13),
                                    Hi(),
                                    Fi(21, "ul", 14),
                                    Fi(22, "li"),
                                    Fi(23, "a", 15),
                                    oo(24, "Save"),
                                    Hi(),
                                    Hi(),
                                    Fi(25, "li"),
                                    Fi(26, "a", 15),
                                    oo(27, "Fetch"),
                                    Hi(),
                                    Hi(),
                                    Hi(),
                                    Hi(),
                                    Hi(),
                                    Hi(),
                                    Hi(),
                                    Hi());
                            },
                            directives: [Rp, Dp, Yp],
                            styles: [""],
                        })),
                        t
                    );
                })(),
                tf = (() => {
                    class t {
                        constructor() {
                            this.title = "cms";
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)();
                        }),
                        (t.ɵcmp = Nt({
                            type: t,
                            selectors: [["cms-root"]],
                            decls: 5,
                            vars: 0,
                            consts: [
                                [1, "container", "pull-left"],
                                [1, "row"],
                                [1, "col-md-12"],
                            ],
                            template: function (t, e) {
                                1 & t &&
                                    (zi(0, "cms-header"),
                                    Fi(1, "div", 0),
                                    Fi(2, "div", 1),
                                    Fi(3, "div", 2),
                                    zi(4, "router-outlet"),
                                    Hi(),
                                    Hi(),
                                    Hi());
                            },
                            directives: [Xp, Pp],
                            styles: [""],
                        })),
                        t
                    );
                })();
            function ef(t, e) {
                return new v((n) => {
                    const r = t.length;
                    if (0 === r) return void n.complete();
                    const s = new Array(r);
                    let i = 0,
                        o = 0;
                    for (let a = 0; a < r; a++) {
                        const l = M(t[a]);
                        let c = !1;
                        n.add(
                            l.subscribe({
                                next: (t) => {
                                    c || ((c = !0), o++), (s[a] = t);
                                },
                                error: (t) => n.error(t),
                                complete: () => {
                                    i++,
                                        (i !== r && c) ||
                                            (o === r &&
                                                n.next(
                                                    e
                                                        ? e.reduce(
                                                              (t, e, n) => (
                                                                  (t[e] = s[n]),
                                                                  t
                                                              ),
                                                              {}
                                                          )
                                                        : s
                                                ),
                                            n.complete());
                                },
                            })
                        );
                    }
                });
            }
            const nf = new qn("NgValueAccessor"),
                rf = { provide: nf, useExisting: rt(() => sf), multi: !0 };
            let sf = (() => {
                class t {
                    constructor(t, e) {
                        (this._renderer = t),
                            (this._elementRef = e),
                            (this.onChange = (t) => {}),
                            (this.onTouched = () => {});
                    }
                    writeValue(t) {
                        this._renderer.setProperty(
                            this._elementRef.nativeElement,
                            "checked",
                            t
                        );
                    }
                    registerOnChange(t) {
                        this.onChange = t;
                    }
                    registerOnTouched(t) {
                        this.onTouched = t;
                    }
                    setDisabledState(t) {
                        this._renderer.setProperty(
                            this._elementRef.nativeElement,
                            "disabled",
                            t
                        );
                    }
                }
                return (
                    (t.ɵfac = function (e) {
                        return new (e || t)(Ni(jo), Ni(Po));
                    }),
                    (t.ɵdir = $t({
                        type: t,
                        selectors: [
                            [
                                "input",
                                "type",
                                "checkbox",
                                "formControlName",
                                "",
                            ],
                            ["input", "type", "checkbox", "formControl", ""],
                            ["input", "type", "checkbox", "ngModel", ""],
                        ],
                        hostBindings: function (t, e) {
                            1 & t &&
                                Wi("change", function (t) {
                                    return e.onChange(t.target.checked);
                                })("blur", function () {
                                    return e.onTouched();
                                });
                        },
                        features: [To([rf])],
                    })),
                    t
                );
            })();
            const of = { provide: nf, useExisting: rt(() => lf), multi: !0 },
                af = new qn("CompositionEventMode");
            let lf = (() => {
                class t {
                    constructor(t, e, n) {
                        (this._renderer = t),
                            (this._elementRef = e),
                            (this._compositionMode = n),
                            (this.onChange = (t) => {}),
                            (this.onTouched = () => {}),
                            (this._composing = !1),
                            null == this._compositionMode &&
                                (this._compositionMode = !(function () {
                                    const t = Xl() ? Xl().getUserAgent() : "";
                                    return /android (\d+)/.test(
                                        t.toLowerCase()
                                    );
                                })());
                    }
                    writeValue(t) {
                        this._renderer.setProperty(
                            this._elementRef.nativeElement,
                            "value",
                            null == t ? "" : t
                        );
                    }
                    registerOnChange(t) {
                        this.onChange = t;
                    }
                    registerOnTouched(t) {
                        this.onTouched = t;
                    }
                    setDisabledState(t) {
                        this._renderer.setProperty(
                            this._elementRef.nativeElement,
                            "disabled",
                            t
                        );
                    }
                    _handleInput(t) {
                        (!this._compositionMode ||
                            (this._compositionMode && !this._composing)) &&
                            this.onChange(t);
                    }
                    _compositionStart() {
                        this._composing = !0;
                    }
                    _compositionEnd(t) {
                        (this._composing = !1),
                            this._compositionMode && this.onChange(t);
                    }
                }
                return (
                    (t.ɵfac = function (e) {
                        return new (e || t)(Ni(jo), Ni(Po), Ni(af, 8));
                    }),
                    (t.ɵdir = $t({
                        type: t,
                        selectors: [
                            [
                                "input",
                                "formControlName",
                                "",
                                3,
                                "type",
                                "checkbox",
                            ],
                            ["textarea", "formControlName", ""],
                            ["input", "formControl", "", 3, "type", "checkbox"],
                            ["textarea", "formControl", ""],
                            ["input", "ngModel", "", 3, "type", "checkbox"],
                            ["textarea", "ngModel", ""],
                            ["", "ngDefaultControl", ""],
                        ],
                        hostBindings: function (t, e) {
                            1 & t &&
                                Wi("input", function (t) {
                                    return e._handleInput(t.target.value);
                                })("blur", function () {
                                    return e.onTouched();
                                })("compositionstart", function () {
                                    return e._compositionStart();
                                })("compositionend", function (t) {
                                    return e._compositionEnd(t.target.value);
                                });
                        },
                        features: [To([of])],
                    })),
                    t
                );
            })();
            function cf(t) {
                return null == t || 0 === t.length;
            }
            function uf(t) {
                return null != t && "number" == typeof t.length;
            }
            const hf = new qn("NgValidators"),
                df = new qn("NgAsyncValidators"),
                pf =
                    /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            class ff {
                static min(t) {
                    return (e) => {
                        if (cf(e.value) || cf(t)) return null;
                        const n = parseFloat(e.value);
                        return !isNaN(n) && n < t
                            ? { min: { min: t, actual: e.value } }
                            : null;
                    };
                }
                static max(t) {
                    return (e) => {
                        if (cf(e.value) || cf(t)) return null;
                        const n = parseFloat(e.value);
                        return !isNaN(n) && n > t
                            ? { max: { max: t, actual: e.value } }
                            : null;
                    };
                }
                static required(t) {
                    return cf(t.value) ? { required: !0 } : null;
                }
                static requiredTrue(t) {
                    return !0 === t.value ? null : { required: !0 };
                }
                static email(t) {
                    return cf(t.value) || pf.test(t.value)
                        ? null
                        : { email: !0 };
                }
                static minLength(t) {
                    return (e) =>
                        cf(e.value) || !uf(e.value)
                            ? null
                            : e.value.length < t
                            ? {
                                  minlength: {
                                      requiredLength: t,
                                      actualLength: e.value.length,
                                  },
                              }
                            : null;
                }
                static maxLength(t) {
                    return (e) =>
                        uf(e.value) && e.value.length > t
                            ? {
                                  maxlength: {
                                      requiredLength: t,
                                      actualLength: e.value.length,
                                  },
                              }
                            : null;
                }
                static pattern(t) {
                    if (!t) return ff.nullValidator;
                    let e, n;
                    return (
                        "string" == typeof t
                            ? ((n = ""),
                              "^" !== t.charAt(0) && (n += "^"),
                              (n += t),
                              "$" !== t.charAt(t.length - 1) && (n += "$"),
                              (e = new RegExp(n)))
                            : ((n = t.toString()), (e = t)),
                        (t) => {
                            if (cf(t.value)) return null;
                            const r = t.value;
                            return e.test(r)
                                ? null
                                : {
                                      pattern: {
                                          requiredPattern: n,
                                          actualValue: r,
                                      },
                                  };
                        }
                    );
                }
                static nullValidator(t) {
                    return null;
                }
                static compose(t) {
                    if (!t) return null;
                    const e = t.filter(gf);
                    return 0 == e.length
                        ? null
                        : function (t) {
                              return yf(vf(t, e));
                          };
                }
                static composeAsync(t) {
                    if (!t) return null;
                    const e = t.filter(gf);
                    return 0 == e.length
                        ? null
                        : function (t) {
                              return (function (...t) {
                                  if (1 === t.length) {
                                      const e = t[0];
                                      if (l(e)) return ef(e, null);
                                      if (
                                          c(e) &&
                                          Object.getPrototypeOf(e) ===
                                              Object.prototype
                                      ) {
                                          const t = Object.keys(e);
                                          return ef(
                                              t.map((t) => e[t]),
                                              t
                                          );
                                      }
                                  }
                                  if ("function" == typeof t[t.length - 1]) {
                                      const e = t.pop();
                                      return ef(
                                          (t =
                                              1 === t.length && l(t[0])
                                                  ? t[0]
                                                  : t),
                                          null
                                      ).pipe(T((t) => e(...t)));
                                  }
                                  return ef(t, null);
                              })(vf(t, e).map(mf)).pipe(T(yf));
                          };
                }
            }
            function gf(t) {
                return null != t;
            }
            function mf(t) {
                const e = qi(t) ? M(t) : t;
                return Bi(e), e;
            }
            function yf(t) {
                let e = {};
                return (
                    t.forEach((t) => {
                        e =
                            null != t
                                ? Object.assign(Object.assign({}, e), t)
                                : e;
                    }),
                    0 === Object.keys(e).length ? null : e
                );
            }
            function vf(t, e) {
                return e.map((e) => e(t));
            }
            function _f(t) {
                return t.map((t) =>
                    (function (t) {
                        return !t.validate;
                    })(t)
                        ? t
                        : (e) => t.validate(e)
                );
            }
            function bf(t) {
                return null != t ? ff.compose(_f(t)) : null;
            }
            function wf(t) {
                return null != t ? ff.composeAsync(_f(t)) : null;
            }
            function Cf(t, e) {
                return null === t ? [e] : Array.isArray(t) ? [...t, e] : [t, e];
            }
            let Sf = (() => {
                    class t {
                        constructor() {
                            (this._rawValidators = []),
                                (this._rawAsyncValidators = []),
                                (this._onDestroyCallbacks = []);
                        }
                        get value() {
                            return this.control ? this.control.value : null;
                        }
                        get valid() {
                            return this.control ? this.control.valid : null;
                        }
                        get invalid() {
                            return this.control ? this.control.invalid : null;
                        }
                        get pending() {
                            return this.control ? this.control.pending : null;
                        }
                        get disabled() {
                            return this.control ? this.control.disabled : null;
                        }
                        get enabled() {
                            return this.control ? this.control.enabled : null;
                        }
                        get errors() {
                            return this.control ? this.control.errors : null;
                        }
                        get pristine() {
                            return this.control ? this.control.pristine : null;
                        }
                        get dirty() {
                            return this.control ? this.control.dirty : null;
                        }
                        get touched() {
                            return this.control ? this.control.touched : null;
                        }
                        get status() {
                            return this.control ? this.control.status : null;
                        }
                        get untouched() {
                            return this.control ? this.control.untouched : null;
                        }
                        get statusChanges() {
                            return this.control
                                ? this.control.statusChanges
                                : null;
                        }
                        get valueChanges() {
                            return this.control
                                ? this.control.valueChanges
                                : null;
                        }
                        get path() {
                            return null;
                        }
                        _setValidators(t) {
                            (this._rawValidators = t || []),
                                (this._composedValidatorFn = bf(
                                    this._rawValidators
                                ));
                        }
                        _setAsyncValidators(t) {
                            (this._rawAsyncValidators = t || []),
                                (this._composedAsyncValidatorFn = wf(
                                    this._rawAsyncValidators
                                ));
                        }
                        get validator() {
                            return this._composedValidatorFn || null;
                        }
                        get asyncValidator() {
                            return this._composedAsyncValidatorFn || null;
                        }
                        _registerOnDestroy(t) {
                            this._onDestroyCallbacks.push(t);
                        }
                        _invokeOnDestroyCallbacks() {
                            this._onDestroyCallbacks.forEach((t) => t()),
                                (this._onDestroyCallbacks = []);
                        }
                        reset(t) {
                            this.control && this.control.reset(t);
                        }
                        hasError(t, e) {
                            return (
                                !!this.control && this.control.hasError(t, e)
                            );
                        }
                        getError(t, e) {
                            return this.control
                                ? this.control.getError(t, e)
                                : null;
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)();
                        }),
                        (t.ɵdir = $t({ type: t })),
                        t
                    );
                })(),
                xf = (() => {
                    class t extends Sf {
                        get formDirective() {
                            return null;
                        }
                        get path() {
                            return null;
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return Ef(e || t);
                        }),
                        (t.ɵdir = $t({ type: t, features: [wi] })),
                        t
                    );
                })();
            const Ef = Nn(xf);
            class Tf extends Sf {
                constructor() {
                    super(...arguments),
                        (this._parent = null),
                        (this.name = null),
                        (this.valueAccessor = null);
                }
            }
            class kf {
                constructor(t) {
                    this._cd = t;
                }
                get ngClassUntouched() {
                    var t, e, n;
                    return (
                        null !==
                            (n =
                                null ===
                                    (e =
                                        null === (t = this._cd) || void 0 === t
                                            ? void 0
                                            : t.control) || void 0 === e
                                    ? void 0
                                    : e.untouched) &&
                        void 0 !== n &&
                        n
                    );
                }
                get ngClassTouched() {
                    var t, e, n;
                    return (
                        null !==
                            (n =
                                null ===
                                    (e =
                                        null === (t = this._cd) || void 0 === t
                                            ? void 0
                                            : t.control) || void 0 === e
                                    ? void 0
                                    : e.touched) &&
                        void 0 !== n &&
                        n
                    );
                }
                get ngClassPristine() {
                    var t, e, n;
                    return (
                        null !==
                            (n =
                                null ===
                                    (e =
                                        null === (t = this._cd) || void 0 === t
                                            ? void 0
                                            : t.control) || void 0 === e
                                    ? void 0
                                    : e.pristine) &&
                        void 0 !== n &&
                        n
                    );
                }
                get ngClassDirty() {
                    var t, e, n;
                    return (
                        null !==
                            (n =
                                null ===
                                    (e =
                                        null === (t = this._cd) || void 0 === t
                                            ? void 0
                                            : t.control) || void 0 === e
                                    ? void 0
                                    : e.dirty) &&
                        void 0 !== n &&
                        n
                    );
                }
                get ngClassValid() {
                    var t, e, n;
                    return (
                        null !==
                            (n =
                                null ===
                                    (e =
                                        null === (t = this._cd) || void 0 === t
                                            ? void 0
                                            : t.control) || void 0 === e
                                    ? void 0
                                    : e.valid) &&
                        void 0 !== n &&
                        n
                    );
                }
                get ngClassInvalid() {
                    var t, e, n;
                    return (
                        null !==
                            (n =
                                null ===
                                    (e =
                                        null === (t = this._cd) || void 0 === t
                                            ? void 0
                                            : t.control) || void 0 === e
                                    ? void 0
                                    : e.invalid) &&
                        void 0 !== n &&
                        n
                    );
                }
                get ngClassPending() {
                    var t, e, n;
                    return (
                        null !==
                            (n =
                                null ===
                                    (e =
                                        null === (t = this._cd) || void 0 === t
                                            ? void 0
                                            : t.control) || void 0 === e
                                    ? void 0
                                    : e.pending) &&
                        void 0 !== n &&
                        n
                    );
                }
            }
            let Of = (() => {
                    class t extends kf {
                        constructor(t) {
                            super(t);
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)(Ni(Tf, 2));
                        }),
                        (t.ɵdir = $t({
                            type: t,
                            selectors: [
                                ["", "formControlName", ""],
                                ["", "ngModel", ""],
                                ["", "formControl", ""],
                            ],
                            hostVars: 14,
                            hostBindings: function (t, e) {
                                2 & t &&
                                    eo("ng-untouched", e.ngClassUntouched)(
                                        "ng-touched",
                                        e.ngClassTouched
                                    )("ng-pristine", e.ngClassPristine)(
                                        "ng-dirty",
                                        e.ngClassDirty
                                    )("ng-valid", e.ngClassValid)(
                                        "ng-invalid",
                                        e.ngClassInvalid
                                    )("ng-pending", e.ngClassPending);
                            },
                            features: [wi],
                        })),
                        t
                    );
                })(),
                Af = (() => {
                    class t extends kf {
                        constructor(t) {
                            super(t);
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)(Ni(xf, 10));
                        }),
                        (t.ɵdir = $t({
                            type: t,
                            selectors: [
                                ["", "formGroupName", ""],
                                ["", "formArrayName", ""],
                                ["", "ngModelGroup", ""],
                                ["", "formGroup", ""],
                                ["form", 3, "ngNoForm", ""],
                                ["", "ngForm", ""],
                            ],
                            hostVars: 14,
                            hostBindings: function (t, e) {
                                2 & t &&
                                    eo("ng-untouched", e.ngClassUntouched)(
                                        "ng-touched",
                                        e.ngClassTouched
                                    )("ng-pristine", e.ngClassPristine)(
                                        "ng-dirty",
                                        e.ngClassDirty
                                    )("ng-valid", e.ngClassValid)(
                                        "ng-invalid",
                                        e.ngClassInvalid
                                    )("ng-pending", e.ngClassPending);
                            },
                            features: [wi],
                        })),
                        t
                    );
                })();
            const Df = { provide: nf, useExisting: rt(() => If), multi: !0 };
            let If = (() => {
                class t {
                    constructor(t, e) {
                        (this._renderer = t),
                            (this._elementRef = e),
                            (this.onChange = (t) => {}),
                            (this.onTouched = () => {});
                    }
                    writeValue(t) {
                        this._renderer.setProperty(
                            this._elementRef.nativeElement,
                            "value",
                            null == t ? "" : t
                        );
                    }
                    registerOnChange(t) {
                        this.onChange = (e) => {
                            t("" == e ? null : parseFloat(e));
                        };
                    }
                    registerOnTouched(t) {
                        this.onTouched = t;
                    }
                    setDisabledState(t) {
                        this._renderer.setProperty(
                            this._elementRef.nativeElement,
                            "disabled",
                            t
                        );
                    }
                }
                return (
                    (t.ɵfac = function (e) {
                        return new (e || t)(Ni(jo), Ni(Po));
                    }),
                    (t.ɵdir = $t({
                        type: t,
                        selectors: [
                            ["input", "type", "number", "formControlName", ""],
                            ["input", "type", "number", "formControl", ""],
                            ["input", "type", "number", "ngModel", ""],
                        ],
                        hostBindings: function (t, e) {
                            1 & t &&
                                Wi("input", function (t) {
                                    return e.onChange(t.target.value);
                                })("blur", function () {
                                    return e.onTouched();
                                });
                        },
                        features: [To([Df])],
                    })),
                    t
                );
            })();
            const Rf = { provide: nf, useExisting: rt(() => Vf), multi: !0 };
            let Pf = (() => {
                    class t {
                        constructor() {
                            this._accessors = [];
                        }
                        add(t, e) {
                            this._accessors.push([t, e]);
                        }
                        remove(t) {
                            for (
                                let e = this._accessors.length - 1;
                                e >= 0;
                                --e
                            )
                                if (this._accessors[e][1] === t)
                                    return void this._accessors.splice(e, 1);
                        }
                        select(t) {
                            this._accessors.forEach((e) => {
                                this._isSameGroup(e, t) &&
                                    e[1] !== t &&
                                    e[1].fireUncheck(t.value);
                            });
                        }
                        _isSameGroup(t, e) {
                            return (
                                !!t[0].control &&
                                t[0]._parent === e._control._parent &&
                                t[1].name === e.name
                            );
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)();
                        }),
                        (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
                        t
                    );
                })(),
                Vf = (() => {
                    class t {
                        constructor(t, e, n, r) {
                            (this._renderer = t),
                                (this._elementRef = e),
                                (this._registry = n),
                                (this._injector = r),
                                (this.onChange = () => {}),
                                (this.onTouched = () => {});
                        }
                        ngOnInit() {
                            (this._control = this._injector.get(Tf)),
                                this._checkName(),
                                this._registry.add(this._control, this);
                        }
                        ngOnDestroy() {
                            this._registry.remove(this);
                        }
                        writeValue(t) {
                            (this._state = t === this.value),
                                this._renderer.setProperty(
                                    this._elementRef.nativeElement,
                                    "checked",
                                    this._state
                                );
                        }
                        registerOnChange(t) {
                            (this._fn = t),
                                (this.onChange = () => {
                                    t(this.value), this._registry.select(this);
                                });
                        }
                        fireUncheck(t) {
                            this.writeValue(t);
                        }
                        registerOnTouched(t) {
                            this.onTouched = t;
                        }
                        setDisabledState(t) {
                            this._renderer.setProperty(
                                this._elementRef.nativeElement,
                                "disabled",
                                t
                            );
                        }
                        _checkName() {
                            !this.name &&
                                this.formControlName &&
                                (this.name = this.formControlName);
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)(Ni(jo), Ni(Po), Ni(Pf), Ni(_i));
                        }),
                        (t.ɵdir = $t({
                            type: t,
                            selectors: [
                                [
                                    "input",
                                    "type",
                                    "radio",
                                    "formControlName",
                                    "",
                                ],
                                ["input", "type", "radio", "formControl", ""],
                                ["input", "type", "radio", "ngModel", ""],
                            ],
                            hostBindings: function (t, e) {
                                1 & t &&
                                    Wi("change", function () {
                                        return e.onChange();
                                    })("blur", function () {
                                        return e.onTouched();
                                    });
                            },
                            inputs: {
                                name: "name",
                                formControlName: "formControlName",
                                value: "value",
                            },
                            features: [To([Rf])],
                        })),
                        t
                    );
                })();
            const jf = { provide: nf, useExisting: rt(() => Mf), multi: !0 };
            let Mf = (() => {
                class t {
                    constructor(t, e) {
                        (this._renderer = t),
                            (this._elementRef = e),
                            (this.onChange = (t) => {}),
                            (this.onTouched = () => {});
                    }
                    writeValue(t) {
                        this._renderer.setProperty(
                            this._elementRef.nativeElement,
                            "value",
                            parseFloat(t)
                        );
                    }
                    registerOnChange(t) {
                        this.onChange = (e) => {
                            t("" == e ? null : parseFloat(e));
                        };
                    }
                    registerOnTouched(t) {
                        this.onTouched = t;
                    }
                    setDisabledState(t) {
                        this._renderer.setProperty(
                            this._elementRef.nativeElement,
                            "disabled",
                            t
                        );
                    }
                }
                return (
                    (t.ɵfac = function (e) {
                        return new (e || t)(Ni(jo), Ni(Po));
                    }),
                    (t.ɵdir = $t({
                        type: t,
                        selectors: [
                            ["input", "type", "range", "formControlName", ""],
                            ["input", "type", "range", "formControl", ""],
                            ["input", "type", "range", "ngModel", ""],
                        ],
                        hostBindings: function (t, e) {
                            1 & t &&
                                Wi("change", function (t) {
                                    return e.onChange(t.target.value);
                                })("input", function (t) {
                                    return e.onChange(t.target.value);
                                })("blur", function () {
                                    return e.onTouched();
                                });
                        },
                        features: [To([jf])],
                    })),
                    t
                );
            })();
            const Nf = { provide: nf, useExisting: rt(() => Uf), multi: !0 };
            let Uf = (() => {
                class t {
                    constructor(t, e) {
                        (this._renderer = t),
                            (this._elementRef = e),
                            (this._optionMap = new Map()),
                            (this._idCounter = 0),
                            (this.onChange = (t) => {}),
                            (this.onTouched = () => {}),
                            (this._compareWith = Object.is);
                    }
                    set compareWith(t) {
                        this._compareWith = t;
                    }
                    writeValue(t) {
                        this.value = t;
                        const e = this._getOptionId(t);
                        null == e &&
                            this._renderer.setProperty(
                                this._elementRef.nativeElement,
                                "selectedIndex",
                                -1
                            );
                        const n = (function (t, e) {
                            return null == t
                                ? "" + e
                                : (e && "object" == typeof e && (e = "Object"),
                                  `${t}: ${e}`.slice(0, 50));
                        })(e, t);
                        this._renderer.setProperty(
                            this._elementRef.nativeElement,
                            "value",
                            n
                        );
                    }
                    registerOnChange(t) {
                        this.onChange = (e) => {
                            (this.value = this._getOptionValue(e)),
                                t(this.value);
                        };
                    }
                    registerOnTouched(t) {
                        this.onTouched = t;
                    }
                    setDisabledState(t) {
                        this._renderer.setProperty(
                            this._elementRef.nativeElement,
                            "disabled",
                            t
                        );
                    }
                    _registerOption() {
                        return (this._idCounter++).toString();
                    }
                    _getOptionId(t) {
                        for (const e of Array.from(this._optionMap.keys()))
                            if (this._compareWith(this._optionMap.get(e), t))
                                return e;
                        return null;
                    }
                    _getOptionValue(t) {
                        const e = (function (t) {
                            return t.split(":")[0];
                        })(t);
                        return this._optionMap.has(e)
                            ? this._optionMap.get(e)
                            : t;
                    }
                }
                return (
                    (t.ɵfac = function (e) {
                        return new (e || t)(Ni(jo), Ni(Po));
                    }),
                    (t.ɵdir = $t({
                        type: t,
                        selectors: [
                            [
                                "select",
                                "formControlName",
                                "",
                                3,
                                "multiple",
                                "",
                            ],
                            ["select", "formControl", "", 3, "multiple", ""],
                            ["select", "ngModel", "", 3, "multiple", ""],
                        ],
                        hostBindings: function (t, e) {
                            1 & t &&
                                Wi("change", function (t) {
                                    return e.onChange(t.target.value);
                                })("blur", function () {
                                    return e.onTouched();
                                });
                        },
                        inputs: { compareWith: "compareWith" },
                        features: [To([Nf])],
                    })),
                    t
                );
            })();
            const Lf = { provide: nf, useExisting: rt(() => Ff), multi: !0 };
            let Ff = (() => {
                class t {
                    constructor(t, e) {
                        (this._renderer = t),
                            (this._elementRef = e),
                            (this._optionMap = new Map()),
                            (this._idCounter = 0),
                            (this.onChange = (t) => {}),
                            (this.onTouched = () => {}),
                            (this._compareWith = Object.is);
                    }
                    set compareWith(t) {
                        this._compareWith = t;
                    }
                    writeValue(t) {
                        let e;
                        if (((this.value = t), Array.isArray(t))) {
                            const n = t.map((t) => this._getOptionId(t));
                            e = (t, e) => {
                                t._setSelected(n.indexOf(e.toString()) > -1);
                            };
                        } else
                            e = (t, e) => {
                                t._setSelected(!1);
                            };
                        this._optionMap.forEach(e);
                    }
                    registerOnChange(t) {
                        this.onChange = (e) => {
                            const n = [];
                            if (void 0 !== e.selectedOptions) {
                                const t = e.selectedOptions;
                                for (let e = 0; e < t.length; e++) {
                                    const r = t.item(e),
                                        s = this._getOptionValue(r.value);
                                    n.push(s);
                                }
                            } else {
                                const t = e.options;
                                for (let e = 0; e < t.length; e++) {
                                    const r = t.item(e);
                                    if (r.selected) {
                                        const t = this._getOptionValue(r.value);
                                        n.push(t);
                                    }
                                }
                            }
                            (this.value = n), t(n);
                        };
                    }
                    registerOnTouched(t) {
                        this.onTouched = t;
                    }
                    setDisabledState(t) {
                        this._renderer.setProperty(
                            this._elementRef.nativeElement,
                            "disabled",
                            t
                        );
                    }
                    _registerOption(t) {
                        const e = (this._idCounter++).toString();
                        return this._optionMap.set(e, t), e;
                    }
                    _getOptionId(t) {
                        for (const e of Array.from(this._optionMap.keys()))
                            if (
                                this._compareWith(
                                    this._optionMap.get(e)._value,
                                    t
                                )
                            )
                                return e;
                        return null;
                    }
                    _getOptionValue(t) {
                        const e = (function (t) {
                            return t.split(":")[0];
                        })(t);
                        return this._optionMap.has(e)
                            ? this._optionMap.get(e)._value
                            : t;
                    }
                }
                return (
                    (t.ɵfac = function (e) {
                        return new (e || t)(Ni(jo), Ni(Po));
                    }),
                    (t.ɵdir = $t({
                        type: t,
                        selectors: [
                            ["select", "multiple", "", "formControlName", ""],
                            ["select", "multiple", "", "formControl", ""],
                            ["select", "multiple", "", "ngModel", ""],
                        ],
                        hostBindings: function (t, e) {
                            1 & t &&
                                Wi("change", function (t) {
                                    return e.onChange(t.target);
                                })("blur", function () {
                                    return e.onTouched();
                                });
                        },
                        inputs: { compareWith: "compareWith" },
                        features: [To([Lf])],
                    })),
                    t
                );
            })();
            function Hf(t, e) {
                $f(t, e, !0),
                    e.valueAccessor.writeValue(t.value),
                    (function (t, e) {
                        e.valueAccessor.registerOnChange((n) => {
                            (t._pendingValue = n),
                                (t._pendingChange = !0),
                                (t._pendingDirty = !0),
                                "change" === t.updateOn && qf(t, e);
                        });
                    })(t, e),
                    (function (t, e) {
                        const n = (t, n) => {
                            e.valueAccessor.writeValue(t),
                                n && e.viewToModelUpdate(t);
                        };
                        t.registerOnChange(n),
                            e._registerOnDestroy(() => {
                                t._unregisterOnChange(n);
                            });
                    })(t, e),
                    (function (t, e) {
                        e.valueAccessor.registerOnTouched(() => {
                            (t._pendingTouched = !0),
                                "blur" === t.updateOn &&
                                    t._pendingChange &&
                                    qf(t, e),
                                "submit" !== t.updateOn && t.markAsTouched();
                        });
                    })(t, e),
                    (function (t, e) {
                        if (e.valueAccessor.setDisabledState) {
                            const n = (t) => {
                                e.valueAccessor.setDisabledState(t);
                            };
                            t.registerOnDisabledChange(n),
                                e._registerOnDestroy(() => {
                                    t._unregisterOnDisabledChange(n);
                                });
                        }
                    })(t, e);
            }
            function zf(t, e) {
                t.forEach((t) => {
                    t.registerOnValidatorChange &&
                        t.registerOnValidatorChange(e);
                });
            }
            function $f(t, e, n) {
                const r = (function (t) {
                    return t._rawValidators;
                })(t);
                null !== e.validator
                    ? t.setValidators(Cf(r, e.validator))
                    : "function" == typeof r && t.setValidators([r]);
                const s = (function (t) {
                    return t._rawAsyncValidators;
                })(t);
                if (
                    (null !== e.asyncValidator
                        ? t.setAsyncValidators(Cf(s, e.asyncValidator))
                        : "function" == typeof s && t.setAsyncValidators([s]),
                    n)
                ) {
                    const n = () => t.updateValueAndValidity();
                    zf(e._rawValidators, n), zf(e._rawAsyncValidators, n);
                }
            }
            function qf(t, e) {
                t._pendingDirty && t.markAsDirty(),
                    t.setValue(t._pendingValue, { emitModelToViewChange: !1 }),
                    e.viewToModelUpdate(t._pendingValue),
                    (t._pendingChange = !1);
            }
            const Bf = [sf, Mf, If, Uf, Ff, Vf];
            function Wf(t, e) {
                const n = t.indexOf(e);
                n > -1 && t.splice(n, 1);
            }
            const Zf = "VALID",
                Gf = "INVALID",
                Qf = "PENDING",
                Kf = "DISABLED";
            function Jf(t) {
                return (eg(t) ? t.validators : t) || null;
            }
            function Yf(t) {
                return Array.isArray(t) ? bf(t) : t || null;
            }
            function Xf(t, e) {
                return (eg(e) ? e.asyncValidators : t) || null;
            }
            function tg(t) {
                return Array.isArray(t) ? wf(t) : t || null;
            }
            function eg(t) {
                return null != t && !Array.isArray(t) && "object" == typeof t;
            }
            class ng {
                constructor(t, e) {
                    (this._hasOwnPendingAsyncValidator = !1),
                        (this._onCollectionChange = () => {}),
                        (this._parent = null),
                        (this.pristine = !0),
                        (this.touched = !1),
                        (this._onDisabledChange = []),
                        (this._rawValidators = t),
                        (this._rawAsyncValidators = e),
                        (this._composedValidatorFn = Yf(this._rawValidators)),
                        (this._composedAsyncValidatorFn = tg(
                            this._rawAsyncValidators
                        ));
                }
                get validator() {
                    return this._composedValidatorFn;
                }
                set validator(t) {
                    this._rawValidators = this._composedValidatorFn = t;
                }
                get asyncValidator() {
                    return this._composedAsyncValidatorFn;
                }
                set asyncValidator(t) {
                    this._rawAsyncValidators = this._composedAsyncValidatorFn =
                        t;
                }
                get parent() {
                    return this._parent;
                }
                get valid() {
                    return this.status === Zf;
                }
                get invalid() {
                    return this.status === Gf;
                }
                get pending() {
                    return this.status == Qf;
                }
                get disabled() {
                    return this.status === Kf;
                }
                get enabled() {
                    return this.status !== Kf;
                }
                get dirty() {
                    return !this.pristine;
                }
                get untouched() {
                    return !this.touched;
                }
                get updateOn() {
                    return this._updateOn
                        ? this._updateOn
                        : this.parent
                        ? this.parent.updateOn
                        : "change";
                }
                setValidators(t) {
                    (this._rawValidators = t),
                        (this._composedValidatorFn = Yf(t));
                }
                setAsyncValidators(t) {
                    (this._rawAsyncValidators = t),
                        (this._composedAsyncValidatorFn = tg(t));
                }
                clearValidators() {
                    this.validator = null;
                }
                clearAsyncValidators() {
                    this.asyncValidator = null;
                }
                markAsTouched(t = {}) {
                    (this.touched = !0),
                        this._parent &&
                            !t.onlySelf &&
                            this._parent.markAsTouched(t);
                }
                markAllAsTouched() {
                    this.markAsTouched({ onlySelf: !0 }),
                        this._forEachChild((t) => t.markAllAsTouched());
                }
                markAsUntouched(t = {}) {
                    (this.touched = !1),
                        (this._pendingTouched = !1),
                        this._forEachChild((t) => {
                            t.markAsUntouched({ onlySelf: !0 });
                        }),
                        this._parent &&
                            !t.onlySelf &&
                            this._parent._updateTouched(t);
                }
                markAsDirty(t = {}) {
                    (this.pristine = !1),
                        this._parent &&
                            !t.onlySelf &&
                            this._parent.markAsDirty(t);
                }
                markAsPristine(t = {}) {
                    (this.pristine = !0),
                        (this._pendingDirty = !1),
                        this._forEachChild((t) => {
                            t.markAsPristine({ onlySelf: !0 });
                        }),
                        this._parent &&
                            !t.onlySelf &&
                            this._parent._updatePristine(t);
                }
                markAsPending(t = {}) {
                    (this.status = Qf),
                        !1 !== t.emitEvent &&
                            this.statusChanges.emit(this.status),
                        this._parent &&
                            !t.onlySelf &&
                            this._parent.markAsPending(t);
                }
                disable(t = {}) {
                    const e = this._parentMarkedDirty(t.onlySelf);
                    (this.status = Kf),
                        (this.errors = null),
                        this._forEachChild((e) => {
                            e.disable(
                                Object.assign(Object.assign({}, t), {
                                    onlySelf: !0,
                                })
                            );
                        }),
                        this._updateValue(),
                        !1 !== t.emitEvent &&
                            (this.valueChanges.emit(this.value),
                            this.statusChanges.emit(this.status)),
                        this._updateAncestors(
                            Object.assign(Object.assign({}, t), {
                                skipPristineCheck: e,
                            })
                        ),
                        this._onDisabledChange.forEach((t) => t(!0));
                }
                enable(t = {}) {
                    const e = this._parentMarkedDirty(t.onlySelf);
                    (this.status = Zf),
                        this._forEachChild((e) => {
                            e.enable(
                                Object.assign(Object.assign({}, t), {
                                    onlySelf: !0,
                                })
                            );
                        }),
                        this.updateValueAndValidity({
                            onlySelf: !0,
                            emitEvent: t.emitEvent,
                        }),
                        this._updateAncestors(
                            Object.assign(Object.assign({}, t), {
                                skipPristineCheck: e,
                            })
                        ),
                        this._onDisabledChange.forEach((t) => t(!1));
                }
                _updateAncestors(t) {
                    this._parent &&
                        !t.onlySelf &&
                        (this._parent.updateValueAndValidity(t),
                        t.skipPristineCheck || this._parent._updatePristine(),
                        this._parent._updateTouched());
                }
                setParent(t) {
                    this._parent = t;
                }
                updateValueAndValidity(t = {}) {
                    this._setInitialStatus(),
                        this._updateValue(),
                        this.enabled &&
                            (this._cancelExistingSubscription(),
                            (this.errors = this._runValidator()),
                            (this.status = this._calculateStatus()),
                            (this.status !== Zf && this.status !== Qf) ||
                                this._runAsyncValidator(t.emitEvent)),
                        !1 !== t.emitEvent &&
                            (this.valueChanges.emit(this.value),
                            this.statusChanges.emit(this.status)),
                        this._parent &&
                            !t.onlySelf &&
                            this._parent.updateValueAndValidity(t);
                }
                _updateTreeValidity(t = { emitEvent: !0 }) {
                    this._forEachChild((e) => e._updateTreeValidity(t)),
                        this.updateValueAndValidity({
                            onlySelf: !0,
                            emitEvent: t.emitEvent,
                        });
                }
                _setInitialStatus() {
                    this.status = this._allControlsDisabled() ? Kf : Zf;
                }
                _runValidator() {
                    return this.validator ? this.validator(this) : null;
                }
                _runAsyncValidator(t) {
                    if (this.asyncValidator) {
                        (this.status = Qf),
                            (this._hasOwnPendingAsyncValidator = !0);
                        const e = mf(this.asyncValidator(this));
                        this._asyncValidationSubscription = e.subscribe((e) => {
                            (this._hasOwnPendingAsyncValidator = !1),
                                this.setErrors(e, { emitEvent: t });
                        });
                    }
                }
                _cancelExistingSubscription() {
                    this._asyncValidationSubscription &&
                        (this._asyncValidationSubscription.unsubscribe(),
                        (this._hasOwnPendingAsyncValidator = !1));
                }
                setErrors(t, e = {}) {
                    (this.errors = t),
                        this._updateControlsErrors(!1 !== e.emitEvent);
                }
                get(t) {
                    return (function (t, e, n) {
                        if (null == e) return null;
                        if (
                            (Array.isArray(e) || (e = e.split(".")),
                            Array.isArray(e) && 0 === e.length)
                        )
                            return null;
                        let r = t;
                        return (
                            e.forEach((t) => {
                                r =
                                    r instanceof sg
                                        ? r.controls.hasOwnProperty(t)
                                            ? r.controls[t]
                                            : null
                                        : (r instanceof ig && r.at(t)) || null;
                            }),
                            r
                        );
                    })(this, t);
                }
                getError(t, e) {
                    const n = e ? this.get(e) : this;
                    return n && n.errors ? n.errors[t] : null;
                }
                hasError(t, e) {
                    return !!this.getError(t, e);
                }
                get root() {
                    let t = this;
                    for (; t._parent; ) t = t._parent;
                    return t;
                }
                _updateControlsErrors(t) {
                    (this.status = this._calculateStatus()),
                        t && this.statusChanges.emit(this.status),
                        this._parent && this._parent._updateControlsErrors(t);
                }
                _initObservables() {
                    (this.valueChanges = new Pa()),
                        (this.statusChanges = new Pa());
                }
                _calculateStatus() {
                    return this._allControlsDisabled()
                        ? Kf
                        : this.errors
                        ? Gf
                        : this._hasOwnPendingAsyncValidator ||
                          this._anyControlsHaveStatus(Qf)
                        ? Qf
                        : this._anyControlsHaveStatus(Gf)
                        ? Gf
                        : Zf;
                }
                _anyControlsHaveStatus(t) {
                    return this._anyControls((e) => e.status === t);
                }
                _anyControlsDirty() {
                    return this._anyControls((t) => t.dirty);
                }
                _anyControlsTouched() {
                    return this._anyControls((t) => t.touched);
                }
                _updatePristine(t = {}) {
                    (this.pristine = !this._anyControlsDirty()),
                        this._parent &&
                            !t.onlySelf &&
                            this._parent._updatePristine(t);
                }
                _updateTouched(t = {}) {
                    (this.touched = this._anyControlsTouched()),
                        this._parent &&
                            !t.onlySelf &&
                            this._parent._updateTouched(t);
                }
                _isBoxedValue(t) {
                    return (
                        "object" == typeof t &&
                        null !== t &&
                        2 === Object.keys(t).length &&
                        "value" in t &&
                        "disabled" in t
                    );
                }
                _registerOnCollectionChange(t) {
                    this._onCollectionChange = t;
                }
                _setUpdateStrategy(t) {
                    eg(t) &&
                        null != t.updateOn &&
                        (this._updateOn = t.updateOn);
                }
                _parentMarkedDirty(t) {
                    return (
                        !t &&
                        !(!this._parent || !this._parent.dirty) &&
                        !this._parent._anyControlsDirty()
                    );
                }
            }
            class rg extends ng {
                constructor(t = null, e, n) {
                    super(Jf(e), Xf(n, e)),
                        (this._onChange = []),
                        this._applyFormState(t),
                        this._setUpdateStrategy(e),
                        this._initObservables(),
                        this.updateValueAndValidity({
                            onlySelf: !0,
                            emitEvent: !!n,
                        });
                }
                setValue(t, e = {}) {
                    (this.value = this._pendingValue = t),
                        this._onChange.length &&
                            !1 !== e.emitModelToViewChange &&
                            this._onChange.forEach((t) =>
                                t(this.value, !1 !== e.emitViewToModelChange)
                            ),
                        this.updateValueAndValidity(e);
                }
                patchValue(t, e = {}) {
                    this.setValue(t, e);
                }
                reset(t = null, e = {}) {
                    this._applyFormState(t),
                        this.markAsPristine(e),
                        this.markAsUntouched(e),
                        this.setValue(this.value, e),
                        (this._pendingChange = !1);
                }
                _updateValue() {}
                _anyControls(t) {
                    return !1;
                }
                _allControlsDisabled() {
                    return this.disabled;
                }
                registerOnChange(t) {
                    this._onChange.push(t);
                }
                _unregisterOnChange(t) {
                    Wf(this._onChange, t);
                }
                registerOnDisabledChange(t) {
                    this._onDisabledChange.push(t);
                }
                _unregisterOnDisabledChange(t) {
                    Wf(this._onDisabledChange, t);
                }
                _forEachChild(t) {}
                _syncPendingControls() {
                    return !(
                        "submit" !== this.updateOn ||
                        (this._pendingDirty && this.markAsDirty(),
                        this._pendingTouched && this.markAsTouched(),
                        !this._pendingChange) ||
                        (this.setValue(this._pendingValue, {
                            onlySelf: !0,
                            emitModelToViewChange: !1,
                        }),
                        0)
                    );
                }
                _applyFormState(t) {
                    this._isBoxedValue(t)
                        ? ((this.value = this._pendingValue = t.value),
                          t.disabled
                              ? this.disable({ onlySelf: !0, emitEvent: !1 })
                              : this.enable({ onlySelf: !0, emitEvent: !1 }))
                        : (this.value = this._pendingValue = t);
                }
            }
            class sg extends ng {
                constructor(t, e, n) {
                    super(Jf(e), Xf(n, e)),
                        (this.controls = t),
                        this._initObservables(),
                        this._setUpdateStrategy(e),
                        this._setUpControls(),
                        this.updateValueAndValidity({
                            onlySelf: !0,
                            emitEvent: !!n,
                        });
                }
                registerControl(t, e) {
                    return this.controls[t]
                        ? this.controls[t]
                        : ((this.controls[t] = e),
                          e.setParent(this),
                          e._registerOnCollectionChange(
                              this._onCollectionChange
                          ),
                          e);
                }
                addControl(t, e) {
                    this.registerControl(t, e),
                        this.updateValueAndValidity(),
                        this._onCollectionChange();
                }
                removeControl(t) {
                    this.controls[t] &&
                        this.controls[t]._registerOnCollectionChange(() => {}),
                        delete this.controls[t],
                        this.updateValueAndValidity(),
                        this._onCollectionChange();
                }
                setControl(t, e) {
                    this.controls[t] &&
                        this.controls[t]._registerOnCollectionChange(() => {}),
                        delete this.controls[t],
                        e && this.registerControl(t, e),
                        this.updateValueAndValidity(),
                        this._onCollectionChange();
                }
                contains(t) {
                    return (
                        this.controls.hasOwnProperty(t) &&
                        this.controls[t].enabled
                    );
                }
                setValue(t, e = {}) {
                    this._checkAllValuesPresent(t),
                        Object.keys(t).forEach((n) => {
                            this._throwIfControlMissing(n),
                                this.controls[n].setValue(t[n], {
                                    onlySelf: !0,
                                    emitEvent: e.emitEvent,
                                });
                        }),
                        this.updateValueAndValidity(e);
                }
                patchValue(t, e = {}) {
                    Object.keys(t).forEach((n) => {
                        this.controls[n] &&
                            this.controls[n].patchValue(t[n], {
                                onlySelf: !0,
                                emitEvent: e.emitEvent,
                            });
                    }),
                        this.updateValueAndValidity(e);
                }
                reset(t = {}, e = {}) {
                    this._forEachChild((n, r) => {
                        n.reset(t[r], { onlySelf: !0, emitEvent: e.emitEvent });
                    }),
                        this._updatePristine(e),
                        this._updateTouched(e),
                        this.updateValueAndValidity(e);
                }
                getRawValue() {
                    return this._reduceChildren(
                        {},
                        (t, e, n) => (
                            (t[n] =
                                e instanceof rg ? e.value : e.getRawValue()),
                            t
                        )
                    );
                }
                _syncPendingControls() {
                    let t = this._reduceChildren(
                        !1,
                        (t, e) => !!e._syncPendingControls() || t
                    );
                    return (
                        t && this.updateValueAndValidity({ onlySelf: !0 }), t
                    );
                }
                _throwIfControlMissing(t) {
                    if (!Object.keys(this.controls).length)
                        throw new Error(
                            "\n        There are no form controls registered with this group yet. If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      "
                        );
                    if (!this.controls[t])
                        throw new Error(
                            `Cannot find form control with name: ${t}.`
                        );
                }
                _forEachChild(t) {
                    Object.keys(this.controls).forEach((e) =>
                        t(this.controls[e], e)
                    );
                }
                _setUpControls() {
                    this._forEachChild((t) => {
                        t.setParent(this),
                            t._registerOnCollectionChange(
                                this._onCollectionChange
                            );
                    });
                }
                _updateValue() {
                    this.value = this._reduceValue();
                }
                _anyControls(t) {
                    for (const e of Object.keys(this.controls)) {
                        const n = this.controls[e];
                        if (this.contains(e) && t(n)) return !0;
                    }
                    return !1;
                }
                _reduceValue() {
                    return this._reduceChildren(
                        {},
                        (t, e, n) => (
                            (e.enabled || this.disabled) && (t[n] = e.value), t
                        )
                    );
                }
                _reduceChildren(t, e) {
                    let n = t;
                    return (
                        this._forEachChild((t, r) => {
                            n = e(n, t, r);
                        }),
                        n
                    );
                }
                _allControlsDisabled() {
                    for (const t of Object.keys(this.controls))
                        if (this.controls[t].enabled) return !1;
                    return (
                        Object.keys(this.controls).length > 0 || this.disabled
                    );
                }
                _checkAllValuesPresent(t) {
                    this._forEachChild((e, n) => {
                        if (void 0 === t[n])
                            throw new Error(
                                `Must supply a value for form control with name: '${n}'.`
                            );
                    });
                }
            }
            class ig extends ng {
                constructor(t, e, n) {
                    super(Jf(e), Xf(n, e)),
                        (this.controls = t),
                        this._initObservables(),
                        this._setUpdateStrategy(e),
                        this._setUpControls(),
                        this.updateValueAndValidity({
                            onlySelf: !0,
                            emitEvent: !!n,
                        });
                }
                at(t) {
                    return this.controls[t];
                }
                push(t) {
                    this.controls.push(t),
                        this._registerControl(t),
                        this.updateValueAndValidity(),
                        this._onCollectionChange();
                }
                insert(t, e) {
                    this.controls.splice(t, 0, e),
                        this._registerControl(e),
                        this.updateValueAndValidity();
                }
                removeAt(t) {
                    this.controls[t] &&
                        this.controls[t]._registerOnCollectionChange(() => {}),
                        this.controls.splice(t, 1),
                        this.updateValueAndValidity();
                }
                setControl(t, e) {
                    this.controls[t] &&
                        this.controls[t]._registerOnCollectionChange(() => {}),
                        this.controls.splice(t, 1),
                        e &&
                            (this.controls.splice(t, 0, e),
                            this._registerControl(e)),
                        this.updateValueAndValidity(),
                        this._onCollectionChange();
                }
                get length() {
                    return this.controls.length;
                }
                setValue(t, e = {}) {
                    this._checkAllValuesPresent(t),
                        t.forEach((t, n) => {
                            this._throwIfControlMissing(n),
                                this.at(n).setValue(t, {
                                    onlySelf: !0,
                                    emitEvent: e.emitEvent,
                                });
                        }),
                        this.updateValueAndValidity(e);
                }
                patchValue(t, e = {}) {
                    t.forEach((t, n) => {
                        this.at(n) &&
                            this.at(n).patchValue(t, {
                                onlySelf: !0,
                                emitEvent: e.emitEvent,
                            });
                    }),
                        this.updateValueAndValidity(e);
                }
                reset(t = [], e = {}) {
                    this._forEachChild((n, r) => {
                        n.reset(t[r], { onlySelf: !0, emitEvent: e.emitEvent });
                    }),
                        this._updatePristine(e),
                        this._updateTouched(e),
                        this.updateValueAndValidity(e);
                }
                getRawValue() {
                    return this.controls.map((t) =>
                        t instanceof rg ? t.value : t.getRawValue()
                    );
                }
                clear() {
                    this.controls.length < 1 ||
                        (this._forEachChild((t) =>
                            t._registerOnCollectionChange(() => {})
                        ),
                        this.controls.splice(0),
                        this.updateValueAndValidity());
                }
                _syncPendingControls() {
                    let t = this.controls.reduce(
                        (t, e) => !!e._syncPendingControls() || t,
                        !1
                    );
                    return (
                        t && this.updateValueAndValidity({ onlySelf: !0 }), t
                    );
                }
                _throwIfControlMissing(t) {
                    if (!this.controls.length)
                        throw new Error(
                            "\n        There are no form controls registered with this array yet. If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      "
                        );
                    if (!this.at(t))
                        throw new Error(
                            "Cannot find form control at index " + t
                        );
                }
                _forEachChild(t) {
                    this.controls.forEach((e, n) => {
                        t(e, n);
                    });
                }
                _updateValue() {
                    this.value = this.controls
                        .filter((t) => t.enabled || this.disabled)
                        .map((t) => t.value);
                }
                _anyControls(t) {
                    return this.controls.some((e) => e.enabled && t(e));
                }
                _setUpControls() {
                    this._forEachChild((t) => this._registerControl(t));
                }
                _checkAllValuesPresent(t) {
                    this._forEachChild((e, n) => {
                        if (void 0 === t[n])
                            throw new Error(
                                `Must supply a value for form control at index: ${n}.`
                            );
                    });
                }
                _allControlsDisabled() {
                    for (const t of this.controls) if (t.enabled) return !1;
                    return this.controls.length > 0 || this.disabled;
                }
                _registerControl(t) {
                    t.setParent(this),
                        t._registerOnCollectionChange(this._onCollectionChange);
                }
            }
            const og = { provide: xf, useExisting: rt(() => lg) },
                ag = (() => Promise.resolve(null))();
            let lg = (() => {
                class t extends xf {
                    constructor(t, e) {
                        super(),
                            (this.submitted = !1),
                            (this._directives = []),
                            (this.ngSubmit = new Pa()),
                            (this.form = new sg({}, bf(t), wf(e)));
                    }
                    ngAfterViewInit() {
                        this._setUpdateStrategy();
                    }
                    get formDirective() {
                        return this;
                    }
                    get control() {
                        return this.form;
                    }
                    get path() {
                        return [];
                    }
                    get controls() {
                        return this.form.controls;
                    }
                    addControl(t) {
                        ag.then(() => {
                            const e = this._findContainer(t.path);
                            (t.control = e.registerControl(t.name, t.control)),
                                Hf(t.control, t),
                                t.control.updateValueAndValidity({
                                    emitEvent: !1,
                                }),
                                this._directives.push(t);
                        });
                    }
                    getControl(t) {
                        return this.form.get(t.path);
                    }
                    removeControl(t) {
                        ag.then(() => {
                            const e = this._findContainer(t.path);
                            e && e.removeControl(t.name),
                                Wf(this._directives, t);
                        });
                    }
                    addFormGroup(t) {
                        ag.then(() => {
                            const e = this._findContainer(t.path),
                                n = new sg({});
                            (function (t, e) {
                                $f(t, e, !1);
                            })(n, t),
                                e.registerControl(t.name, n),
                                n.updateValueAndValidity({ emitEvent: !1 });
                        });
                    }
                    removeFormGroup(t) {
                        ag.then(() => {
                            const e = this._findContainer(t.path);
                            e && e.removeControl(t.name);
                        });
                    }
                    getFormGroup(t) {
                        return this.form.get(t.path);
                    }
                    updateModel(t, e) {
                        ag.then(() => {
                            this.form.get(t.path).setValue(e);
                        });
                    }
                    setValue(t) {
                        this.control.setValue(t);
                    }
                    onSubmit(t) {
                        return (
                            (this.submitted = !0),
                            (e = this._directives),
                            this.form._syncPendingControls(),
                            e.forEach((t) => {
                                const e = t.control;
                                "submit" === e.updateOn &&
                                    e._pendingChange &&
                                    (t.viewToModelUpdate(e._pendingValue),
                                    (e._pendingChange = !1));
                            }),
                            this.ngSubmit.emit(t),
                            !1
                        );
                        var e;
                    }
                    onReset() {
                        this.resetForm();
                    }
                    resetForm(t) {
                        this.form.reset(t), (this.submitted = !1);
                    }
                    _setUpdateStrategy() {
                        this.options &&
                            null != this.options.updateOn &&
                            (this.form._updateOn = this.options.updateOn);
                    }
                    _findContainer(t) {
                        return t.pop(), t.length ? this.form.get(t) : this.form;
                    }
                }
                return (
                    (t.ɵfac = function (e) {
                        return new (e || t)(Ni(hf, 10), Ni(df, 10));
                    }),
                    (t.ɵdir = $t({
                        type: t,
                        selectors: [
                            ["form", 3, "ngNoForm", "", 3, "formGroup", ""],
                            ["ng-form"],
                            ["", "ngForm", ""],
                        ],
                        hostBindings: function (t, e) {
                            1 & t &&
                                Wi("submit", function (t) {
                                    return e.onSubmit(t);
                                })("reset", function () {
                                    return e.onReset();
                                });
                        },
                        inputs: { options: ["ngFormOptions", "options"] },
                        outputs: { ngSubmit: "ngSubmit" },
                        exportAs: ["ngForm"],
                        features: [To([og]), wi],
                    })),
                    t
                );
            })();
            const cg = { provide: Tf, useExisting: rt(() => hg) },
                ug = (() => Promise.resolve(null))();
            let hg = (() => {
                    class t extends Tf {
                        constructor(t, e, n, r) {
                            super(),
                                (this.control = new rg()),
                                (this._registered = !1),
                                (this.update = new Pa()),
                                (this._parent = t),
                                this._setValidators(e),
                                this._setAsyncValidators(n),
                                (this.valueAccessor = (function (t, e) {
                                    if (!e) return null;
                                    Array.isArray(e);
                                    let n = void 0,
                                        r = void 0,
                                        s = void 0;
                                    return (
                                        e.forEach((t) => {
                                            var e;
                                            t.constructor === lf
                                                ? (n = t)
                                                : ((e = t),
                                                  Bf.some(
                                                      (t) => e.constructor === t
                                                  )
                                                      ? (r = t)
                                                      : (s = t));
                                        }),
                                        s || r || n || null
                                    );
                                })(0, r));
                        }
                        ngOnChanges(t) {
                            this._checkForErrors(),
                                this._registered || this._setUpControl(),
                                "isDisabled" in t && this._updateDisabled(t),
                                (function (t, e) {
                                    if (!t.hasOwnProperty("model")) return !1;
                                    const n = t.model;
                                    return (
                                        !!n.isFirstChange() ||
                                        !Object.is(e, n.currentValue)
                                    );
                                })(t, this.viewModel) &&
                                    (this._updateValue(this.model),
                                    (this.viewModel = this.model));
                        }
                        ngOnDestroy() {
                            this.formDirective &&
                                this.formDirective.removeControl(this);
                        }
                        get path() {
                            return this._parent
                                ? [...this._parent.path, this.name]
                                : [this.name];
                        }
                        get formDirective() {
                            return this._parent
                                ? this._parent.formDirective
                                : null;
                        }
                        viewToModelUpdate(t) {
                            (this.viewModel = t), this.update.emit(t);
                        }
                        _setUpControl() {
                            this._setUpdateStrategy(),
                                this._isStandalone()
                                    ? this._setUpStandalone()
                                    : this.formDirective.addControl(this),
                                (this._registered = !0);
                        }
                        _setUpdateStrategy() {
                            this.options &&
                                null != this.options.updateOn &&
                                (this.control._updateOn =
                                    this.options.updateOn);
                        }
                        _isStandalone() {
                            return (
                                !this._parent ||
                                !(!this.options || !this.options.standalone)
                            );
                        }
                        _setUpStandalone() {
                            Hf(this.control, this),
                                this.control.updateValueAndValidity({
                                    emitEvent: !1,
                                });
                        }
                        _checkForErrors() {
                            this._isStandalone() || this._checkParentType(),
                                this._checkName();
                        }
                        _checkParentType() {}
                        _checkName() {
                            this.options &&
                                this.options.name &&
                                (this.name = this.options.name),
                                this._isStandalone();
                        }
                        _updateValue(t) {
                            ug.then(() => {
                                this.control.setValue(t, {
                                    emitViewToModelChange: !1,
                                });
                            });
                        }
                        _updateDisabled(t) {
                            const e = t.isDisabled.currentValue,
                                n = "" === e || (e && "false" !== e);
                            ug.then(() => {
                                n && !this.control.disabled
                                    ? this.control.disable()
                                    : !n &&
                                      this.control.disabled &&
                                      this.control.enable();
                            });
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)(
                                Ni(xf, 9),
                                Ni(hf, 10),
                                Ni(df, 10),
                                Ni(nf, 10)
                            );
                        }),
                        (t.ɵdir = $t({
                            type: t,
                            selectors: [
                                [
                                    "",
                                    "ngModel",
                                    "",
                                    3,
                                    "formControlName",
                                    "",
                                    3,
                                    "formControl",
                                    "",
                                ],
                            ],
                            inputs: {
                                name: "name",
                                isDisabled: ["disabled", "isDisabled"],
                                model: ["ngModel", "model"],
                                options: ["ngModelOptions", "options"],
                            },
                            outputs: { update: "ngModelChange" },
                            exportAs: ["ngModel"],
                            features: [To([cg]), wi, oe],
                        })),
                        t
                    );
                })(),
                dg = (() => {
                    class t {}
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)();
                        }),
                        (t.ɵdir = $t({
                            type: t,
                            selectors: [
                                [
                                    "form",
                                    3,
                                    "ngNoForm",
                                    "",
                                    3,
                                    "ngNativeValidate",
                                    "",
                                ],
                            ],
                            hostAttrs: ["novalidate", ""],
                        })),
                        t
                    );
                })();
            const pg = { provide: hf, useExisting: rt(() => fg), multi: !0 };
            let fg = (() => {
                class t {
                    constructor() {
                        this._required = !1;
                    }
                    get required() {
                        return this._required;
                    }
                    set required(t) {
                        (this._required =
                            null != t && !1 !== t && "" + t != "false"),
                            this._onChange && this._onChange();
                    }
                    validate(t) {
                        return this.required ? ff.required(t) : null;
                    }
                    registerOnValidatorChange(t) {
                        this._onChange = t;
                    }
                }
                return (
                    (t.ɵfac = function (e) {
                        return new (e || t)();
                    }),
                    (t.ɵdir = $t({
                        type: t,
                        selectors: [
                            [
                                "",
                                "required",
                                "",
                                "formControlName",
                                "",
                                3,
                                "type",
                                "checkbox",
                            ],
                            [
                                "",
                                "required",
                                "",
                                "formControl",
                                "",
                                3,
                                "type",
                                "checkbox",
                            ],
                            [
                                "",
                                "required",
                                "",
                                "ngModel",
                                "",
                                3,
                                "type",
                                "checkbox",
                            ],
                        ],
                        hostVars: 1,
                        hostBindings: function (t, e) {
                            2 & t && Pi("required", e.required ? "" : null);
                        },
                        inputs: { required: "required" },
                        features: [To([pg])],
                    })),
                    t
                );
            })();
            const gg = { provide: hf, useExisting: rt(() => mg), multi: !0 };
            let mg = (() => {
                    class t {
                        constructor() {
                            this._validator = ff.nullValidator;
                        }
                        ngOnChanges(t) {
                            "pattern" in t &&
                                (this._createValidator(),
                                this._onChange && this._onChange());
                        }
                        validate(t) {
                            return this._validator(t);
                        }
                        registerOnValidatorChange(t) {
                            this._onChange = t;
                        }
                        _createValidator() {
                            this._validator = ff.pattern(this.pattern);
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)();
                        }),
                        (t.ɵdir = $t({
                            type: t,
                            selectors: [
                                ["", "pattern", "", "formControlName", ""],
                                ["", "pattern", "", "formControl", ""],
                                ["", "pattern", "", "ngModel", ""],
                            ],
                            hostVars: 1,
                            hostBindings: function (t, e) {
                                2 & t &&
                                    Pi("pattern", e.pattern ? e.pattern : null);
                            },
                            inputs: { pattern: "pattern" },
                            features: [To([gg]), oe],
                        })),
                        t
                    );
                })(),
                yg = (() => {
                    class t {}
                    return (
                        (t.ɵmod = Ht({ type: t })),
                        (t.ɵinj = at({
                            factory: function (e) {
                                return new (e || t)();
                            },
                        })),
                        t
                    );
                })(),
                vg = (() => {
                    class t {}
                    return (
                        (t.ɵmod = Ht({ type: t })),
                        (t.ɵinj = at({
                            factory: function (e) {
                                return new (e || t)();
                            },
                            providers: [Pf],
                            imports: [yg],
                        })),
                        t
                    );
                })();
            class _g {}
            class bg {}
            class wg {
                constructor(t) {
                    (this.normalizedNames = new Map()),
                        (this.lazyUpdate = null),
                        t
                            ? (this.lazyInit =
                                  "string" == typeof t
                                      ? () => {
                                            (this.headers = new Map()),
                                                t.split("\n").forEach((t) => {
                                                    const e = t.indexOf(":");
                                                    if (e > 0) {
                                                        const n = t.slice(0, e),
                                                            r = n.toLowerCase(),
                                                            s = t
                                                                .slice(e + 1)
                                                                .trim();
                                                        this.maybeSetNormalizedName(
                                                            n,
                                                            r
                                                        ),
                                                            this.headers.has(r)
                                                                ? this.headers
                                                                      .get(r)
                                                                      .push(s)
                                                                : this.headers.set(
                                                                      r,
                                                                      [s]
                                                                  );
                                                    }
                                                });
                                        }
                                      : () => {
                                            (this.headers = new Map()),
                                                Object.keys(t).forEach((e) => {
                                                    let n = t[e];
                                                    const r = e.toLowerCase();
                                                    "string" == typeof n &&
                                                        (n = [n]),
                                                        n.length > 0 &&
                                                            (this.headers.set(
                                                                r,
                                                                n
                                                            ),
                                                            this.maybeSetNormalizedName(
                                                                e,
                                                                r
                                                            ));
                                                });
                                        })
                            : (this.headers = new Map());
                }
                has(t) {
                    return this.init(), this.headers.has(t.toLowerCase());
                }
                get(t) {
                    this.init();
                    const e = this.headers.get(t.toLowerCase());
                    return e && e.length > 0 ? e[0] : null;
                }
                keys() {
                    return (
                        this.init(), Array.from(this.normalizedNames.values())
                    );
                }
                getAll(t) {
                    return (
                        this.init(), this.headers.get(t.toLowerCase()) || null
                    );
                }
                append(t, e) {
                    return this.clone({ name: t, value: e, op: "a" });
                }
                set(t, e) {
                    return this.clone({ name: t, value: e, op: "s" });
                }
                delete(t, e) {
                    return this.clone({ name: t, value: e, op: "d" });
                }
                maybeSetNormalizedName(t, e) {
                    this.normalizedNames.has(e) ||
                        this.normalizedNames.set(e, t);
                }
                init() {
                    this.lazyInit &&
                        (this.lazyInit instanceof wg
                            ? this.copyFrom(this.lazyInit)
                            : this.lazyInit(),
                        (this.lazyInit = null),
                        this.lazyUpdate &&
                            (this.lazyUpdate.forEach((t) =>
                                this.applyUpdate(t)
                            ),
                            (this.lazyUpdate = null)));
                }
                copyFrom(t) {
                    t.init(),
                        Array.from(t.headers.keys()).forEach((e) => {
                            this.headers.set(e, t.headers.get(e)),
                                this.normalizedNames.set(
                                    e,
                                    t.normalizedNames.get(e)
                                );
                        });
                }
                clone(t) {
                    const e = new wg();
                    return (
                        (e.lazyInit =
                            this.lazyInit && this.lazyInit instanceof wg
                                ? this.lazyInit
                                : this),
                        (e.lazyUpdate = (this.lazyUpdate || []).concat([t])),
                        e
                    );
                }
                applyUpdate(t) {
                    const e = t.name.toLowerCase();
                    switch (t.op) {
                        case "a":
                        case "s":
                            let n = t.value;
                            if (
                                ("string" == typeof n && (n = [n]),
                                0 === n.length)
                            )
                                return;
                            this.maybeSetNormalizedName(t.name, e);
                            const r =
                                ("a" === t.op ? this.headers.get(e) : void 0) ||
                                [];
                            r.push(...n), this.headers.set(e, r);
                            break;
                        case "d":
                            const s = t.value;
                            if (s) {
                                let t = this.headers.get(e);
                                if (!t) return;
                                (t = t.filter((t) => -1 === s.indexOf(t))),
                                    0 === t.length
                                        ? (this.headers.delete(e),
                                          this.normalizedNames.delete(e))
                                        : this.headers.set(e, t);
                            } else
                                this.headers.delete(e),
                                    this.normalizedNames.delete(e);
                    }
                }
                forEach(t) {
                    this.init(),
                        Array.from(this.normalizedNames.keys()).forEach((e) =>
                            t(this.normalizedNames.get(e), this.headers.get(e))
                        );
                }
            }
            class Cg {
                encodeKey(t) {
                    return Sg(t);
                }
                encodeValue(t) {
                    return Sg(t);
                }
                decodeKey(t) {
                    return decodeURIComponent(t);
                }
                decodeValue(t) {
                    return decodeURIComponent(t);
                }
            }
            function Sg(t) {
                return encodeURIComponent(t)
                    .replace(/%40/gi, "@")
                    .replace(/%3A/gi, ":")
                    .replace(/%24/gi, "$")
                    .replace(/%2C/gi, ",")
                    .replace(/%3B/gi, ";")
                    .replace(/%2B/gi, "+")
                    .replace(/%3D/gi, "=")
                    .replace(/%3F/gi, "?")
                    .replace(/%2F/gi, "/");
            }
            class xg {
                constructor(t = {}) {
                    if (
                        ((this.updates = null),
                        (this.cloneFrom = null),
                        (this.encoder = t.encoder || new Cg()),
                        t.fromString)
                    ) {
                        if (t.fromObject)
                            throw new Error(
                                "Cannot specify both fromString and fromObject."
                            );
                        this.map = (function (t, e) {
                            const n = new Map();
                            return (
                                t.length > 0 &&
                                    t.split("&").forEach((t) => {
                                        const r = t.indexOf("="),
                                            [s, i] =
                                                -1 == r
                                                    ? [e.decodeKey(t), ""]
                                                    : [
                                                          e.decodeKey(
                                                              t.slice(0, r)
                                                          ),
                                                          e.decodeValue(
                                                              t.slice(r + 1)
                                                          ),
                                                      ],
                                            o = n.get(s) || [];
                                        o.push(i), n.set(s, o);
                                    }),
                                n
                            );
                        })(t.fromString, this.encoder);
                    } else
                        t.fromObject
                            ? ((this.map = new Map()),
                              Object.keys(t.fromObject).forEach((e) => {
                                  const n = t.fromObject[e];
                                  this.map.set(e, Array.isArray(n) ? n : [n]);
                              }))
                            : (this.map = null);
                }
                has(t) {
                    return this.init(), this.map.has(t);
                }
                get(t) {
                    this.init();
                    const e = this.map.get(t);
                    return e ? e[0] : null;
                }
                getAll(t) {
                    return this.init(), this.map.get(t) || null;
                }
                keys() {
                    return this.init(), Array.from(this.map.keys());
                }
                append(t, e) {
                    return this.clone({ param: t, value: e, op: "a" });
                }
                set(t, e) {
                    return this.clone({ param: t, value: e, op: "s" });
                }
                delete(t, e) {
                    return this.clone({ param: t, value: e, op: "d" });
                }
                toString() {
                    return (
                        this.init(),
                        this.keys()
                            .map((t) => {
                                const e = this.encoder.encodeKey(t);
                                return this.map
                                    .get(t)
                                    .map(
                                        (t) =>
                                            e +
                                            "=" +
                                            this.encoder.encodeValue(t)
                                    )
                                    .join("&");
                            })
                            .filter((t) => "" !== t)
                            .join("&")
                    );
                }
                clone(t) {
                    const e = new xg({ encoder: this.encoder });
                    return (
                        (e.cloneFrom = this.cloneFrom || this),
                        (e.updates = (this.updates || []).concat([t])),
                        e
                    );
                }
                init() {
                    null === this.map && (this.map = new Map()),
                        null !== this.cloneFrom &&
                            (this.cloneFrom.init(),
                            this.cloneFrom
                                .keys()
                                .forEach((t) =>
                                    this.map.set(t, this.cloneFrom.map.get(t))
                                ),
                            this.updates.forEach((t) => {
                                switch (t.op) {
                                    case "a":
                                    case "s":
                                        const e =
                                            ("a" === t.op
                                                ? this.map.get(t.param)
                                                : void 0) || [];
                                        e.push(t.value),
                                            this.map.set(t.param, e);
                                        break;
                                    case "d":
                                        if (void 0 === t.value) {
                                            this.map.delete(t.param);
                                            break;
                                        }
                                        {
                                            let e = this.map.get(t.param) || [];
                                            const n = e.indexOf(t.value);
                                            -1 !== n && e.splice(n, 1),
                                                e.length > 0
                                                    ? this.map.set(t.param, e)
                                                    : this.map.delete(t.param);
                                        }
                                }
                            }),
                            (this.cloneFrom = this.updates = null));
                }
            }
            function Eg(t) {
                return (
                    "undefined" != typeof ArrayBuffer &&
                    t instanceof ArrayBuffer
                );
            }
            function Tg(t) {
                return "undefined" != typeof Blob && t instanceof Blob;
            }
            function kg(t) {
                return "undefined" != typeof FormData && t instanceof FormData;
            }
            class Og {
                constructor(t, e, n, r) {
                    let s;
                    if (
                        ((this.url = e),
                        (this.body = null),
                        (this.reportProgress = !1),
                        (this.withCredentials = !1),
                        (this.responseType = "json"),
                        (this.method = t.toUpperCase()),
                        (function (t) {
                            switch (t) {
                                case "DELETE":
                                case "GET":
                                case "HEAD":
                                case "OPTIONS":
                                case "JSONP":
                                    return !1;
                                default:
                                    return !0;
                            }
                        })(this.method) || r
                            ? ((this.body = void 0 !== n ? n : null), (s = r))
                            : (s = n),
                        s &&
                            ((this.reportProgress = !!s.reportProgress),
                            (this.withCredentials = !!s.withCredentials),
                            s.responseType &&
                                (this.responseType = s.responseType),
                            s.headers && (this.headers = s.headers),
                            s.params && (this.params = s.params)),
                        this.headers || (this.headers = new wg()),
                        this.params)
                    ) {
                        const t = this.params.toString();
                        if (0 === t.length) this.urlWithParams = e;
                        else {
                            const n = e.indexOf("?");
                            this.urlWithParams =
                                e +
                                (-1 === n ? "?" : n < e.length - 1 ? "&" : "") +
                                t;
                        }
                    } else (this.params = new xg()), (this.urlWithParams = e);
                }
                serializeBody() {
                    return null === this.body
                        ? null
                        : Eg(this.body) ||
                          Tg(this.body) ||
                          kg(this.body) ||
                          "string" == typeof this.body
                        ? this.body
                        : this.body instanceof xg
                        ? this.body.toString()
                        : "object" == typeof this.body ||
                          "boolean" == typeof this.body ||
                          Array.isArray(this.body)
                        ? JSON.stringify(this.body)
                        : this.body.toString();
                }
                detectContentTypeHeader() {
                    return null === this.body || kg(this.body)
                        ? null
                        : Tg(this.body)
                        ? this.body.type || null
                        : Eg(this.body)
                        ? null
                        : "string" == typeof this.body
                        ? "text/plain"
                        : this.body instanceof xg
                        ? "application/x-www-form-urlencoded;charset=UTF-8"
                        : "object" == typeof this.body ||
                          "number" == typeof this.body ||
                          Array.isArray(this.body)
                        ? "application/json"
                        : null;
                }
                clone(t = {}) {
                    const e = t.method || this.method,
                        n = t.url || this.url,
                        r = t.responseType || this.responseType,
                        s = void 0 !== t.body ? t.body : this.body,
                        i =
                            void 0 !== t.withCredentials
                                ? t.withCredentials
                                : this.withCredentials,
                        o =
                            void 0 !== t.reportProgress
                                ? t.reportProgress
                                : this.reportProgress;
                    let a = t.headers || this.headers,
                        l = t.params || this.params;
                    return (
                        void 0 !== t.setHeaders &&
                            (a = Object.keys(t.setHeaders).reduce(
                                (e, n) => e.set(n, t.setHeaders[n]),
                                a
                            )),
                        t.setParams &&
                            (l = Object.keys(t.setParams).reduce(
                                (e, n) => e.set(n, t.setParams[n]),
                                l
                            )),
                        new Og(e, n, s, {
                            params: l,
                            headers: a,
                            reportProgress: o,
                            responseType: r,
                            withCredentials: i,
                        })
                    );
                }
            }
            var Ag = (function (t) {
                return (
                    (t[(t.Sent = 0)] = "Sent"),
                    (t[(t.UploadProgress = 1)] = "UploadProgress"),
                    (t[(t.ResponseHeader = 2)] = "ResponseHeader"),
                    (t[(t.DownloadProgress = 3)] = "DownloadProgress"),
                    (t[(t.Response = 4)] = "Response"),
                    (t[(t.User = 5)] = "User"),
                    t
                );
            })({});
            class Dg {
                constructor(t, e = 200, n = "OK") {
                    (this.headers = t.headers || new wg()),
                        (this.status = void 0 !== t.status ? t.status : e),
                        (this.statusText = t.statusText || n),
                        (this.url = t.url || null),
                        (this.ok = this.status >= 200 && this.status < 300);
                }
            }
            class Ig extends Dg {
                constructor(t = {}) {
                    super(t), (this.type = Ag.ResponseHeader);
                }
                clone(t = {}) {
                    return new Ig({
                        headers: t.headers || this.headers,
                        status: void 0 !== t.status ? t.status : this.status,
                        statusText: t.statusText || this.statusText,
                        url: t.url || this.url || void 0,
                    });
                }
            }
            class Rg extends Dg {
                constructor(t = {}) {
                    super(t),
                        (this.type = Ag.Response),
                        (this.body = void 0 !== t.body ? t.body : null);
                }
                clone(t = {}) {
                    return new Rg({
                        body: void 0 !== t.body ? t.body : this.body,
                        headers: t.headers || this.headers,
                        status: void 0 !== t.status ? t.status : this.status,
                        statusText: t.statusText || this.statusText,
                        url: t.url || this.url || void 0,
                    });
                }
            }
            class Pg extends Dg {
                constructor(t) {
                    super(t, 0, "Unknown Error"),
                        (this.name = "HttpErrorResponse"),
                        (this.ok = !1),
                        (this.message =
                            this.status >= 200 && this.status < 300
                                ? "Http failure during parsing for " +
                                  (t.url || "(unknown url)")
                                : `Http failure response for ${
                                      t.url || "(unknown url)"
                                  }: ${t.status} ${t.statusText}`),
                        (this.error = t.error || null);
                }
            }
            function Vg(t, e) {
                return {
                    body: e,
                    headers: t.headers,
                    observe: t.observe,
                    params: t.params,
                    reportProgress: t.reportProgress,
                    responseType: t.responseType,
                    withCredentials: t.withCredentials,
                };
            }
            let jg = (() => {
                class t {
                    constructor(t) {
                        this.handler = t;
                    }
                    request(t, e, n = {}) {
                        let r;
                        if (t instanceof Og) r = t;
                        else {
                            let s = void 0;
                            s =
                                n.headers instanceof wg
                                    ? n.headers
                                    : new wg(n.headers);
                            let i = void 0;
                            n.params &&
                                (i =
                                    n.params instanceof xg
                                        ? n.params
                                        : new xg({ fromObject: n.params })),
                                (r = new Og(
                                    t,
                                    e,
                                    void 0 !== n.body ? n.body : null,
                                    {
                                        headers: s,
                                        params: i,
                                        reportProgress: n.reportProgress,
                                        responseType: n.responseType || "json",
                                        withCredentials: n.withCredentials,
                                    }
                                ));
                        }
                        const s = ou(r).pipe(Mu((t) => this.handler.handle(t)));
                        if (t instanceof Og || "events" === n.observe) return s;
                        const i = s.pipe(Du((t) => t instanceof Rg));
                        switch (n.observe || "body") {
                            case "body":
                                switch (r.responseType) {
                                    case "arraybuffer":
                                        return i.pipe(
                                            T((t) => {
                                                if (
                                                    null !== t.body &&
                                                    !(
                                                        t.body instanceof
                                                        ArrayBuffer
                                                    )
                                                )
                                                    throw new Error(
                                                        "Response is not an ArrayBuffer."
                                                    );
                                                return t.body;
                                            })
                                        );
                                    case "blob":
                                        return i.pipe(
                                            T((t) => {
                                                if (
                                                    null !== t.body &&
                                                    !(t.body instanceof Blob)
                                                )
                                                    throw new Error(
                                                        "Response is not a Blob."
                                                    );
                                                return t.body;
                                            })
                                        );
                                    case "text":
                                        return i.pipe(
                                            T((t) => {
                                                if (
                                                    null !== t.body &&
                                                    "string" != typeof t.body
                                                )
                                                    throw new Error(
                                                        "Response is not a string."
                                                    );
                                                return t.body;
                                            })
                                        );
                                    case "json":
                                    default:
                                        return i.pipe(T((t) => t.body));
                                }
                            case "response":
                                return i;
                            default:
                                throw new Error(
                                    `Unreachable: unhandled observe type ${n.observe}}`
                                );
                        }
                    }
                    delete(t, e = {}) {
                        return this.request("DELETE", t, e);
                    }
                    get(t, e = {}) {
                        return this.request("GET", t, e);
                    }
                    head(t, e = {}) {
                        return this.request("HEAD", t, e);
                    }
                    jsonp(t, e) {
                        return this.request("JSONP", t, {
                            params: new xg().append(e, "JSONP_CALLBACK"),
                            observe: "body",
                            responseType: "json",
                        });
                    }
                    options(t, e = {}) {
                        return this.request("OPTIONS", t, e);
                    }
                    patch(t, e, n = {}) {
                        return this.request("PATCH", t, Vg(n, e));
                    }
                    post(t, e, n = {}) {
                        return this.request("POST", t, Vg(n, e));
                    }
                    put(t, e, n = {}) {
                        return this.request("PUT", t, Vg(n, e));
                    }
                }
                return (
                    (t.ɵfac = function (e) {
                        return new (e || t)(dr(_g));
                    }),
                    (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
                    t
                );
            })();
            class Mg {
                constructor(t, e) {
                    (this.next = t), (this.interceptor = e);
                }
                handle(t) {
                    return this.interceptor.intercept(t, this.next);
                }
            }
            const Ng = new qn("HTTP_INTERCEPTORS");
            let Ug = (() => {
                class t {
                    intercept(t, e) {
                        return e.handle(t);
                    }
                }
                return (
                    (t.ɵfac = function (e) {
                        return new (e || t)();
                    }),
                    (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
                    t
                );
            })();
            const Lg = /^\)\]\}',?\n/;
            class Fg {}
            let Hg = (() => {
                    class t {
                        constructor() {}
                        build() {
                            return new XMLHttpRequest();
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)();
                        }),
                        (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
                        t
                    );
                })(),
                zg = (() => {
                    class t {
                        constructor(t) {
                            this.xhrFactory = t;
                        }
                        handle(t) {
                            if ("JSONP" === t.method)
                                throw new Error(
                                    "Attempted to construct Jsonp request without HttpClientJsonpModule installed."
                                );
                            return new v((e) => {
                                const n = this.xhrFactory.build();
                                if (
                                    (n.open(t.method, t.urlWithParams),
                                    t.withCredentials &&
                                        (n.withCredentials = !0),
                                    t.headers.forEach((t, e) =>
                                        n.setRequestHeader(t, e.join(","))
                                    ),
                                    t.headers.has("Accept") ||
                                        n.setRequestHeader(
                                            "Accept",
                                            "application/json, text/plain, */*"
                                        ),
                                    !t.headers.has("Content-Type"))
                                ) {
                                    const e = t.detectContentTypeHeader();
                                    null !== e &&
                                        n.setRequestHeader("Content-Type", e);
                                }
                                if (t.responseType) {
                                    const e = t.responseType.toLowerCase();
                                    n.responseType = "json" !== e ? e : "text";
                                }
                                const r = t.serializeBody();
                                let s = null;
                                const i = () => {
                                        if (null !== s) return s;
                                        const e =
                                                1223 === n.status
                                                    ? 204
                                                    : n.status,
                                            r = n.statusText || "OK",
                                            i = new wg(
                                                n.getAllResponseHeaders()
                                            ),
                                            o =
                                                (function (t) {
                                                    return "responseURL" in t &&
                                                        t.responseURL
                                                        ? t.responseURL
                                                        : /^X-Request-URL:/m.test(
                                                              t.getAllResponseHeaders()
                                                          )
                                                        ? t.getResponseHeader(
                                                              "X-Request-URL"
                                                          )
                                                        : null;
                                                })(n) || t.url;
                                        return (
                                            (s = new Ig({
                                                headers: i,
                                                status: e,
                                                statusText: r,
                                                url: o,
                                            })),
                                            s
                                        );
                                    },
                                    o = () => {
                                        let {
                                                headers: r,
                                                status: s,
                                                statusText: o,
                                                url: a,
                                            } = i(),
                                            l = null;
                                        204 !== s &&
                                            (l =
                                                void 0 === n.response
                                                    ? n.responseText
                                                    : n.response),
                                            0 === s && (s = l ? 200 : 0);
                                        let c = s >= 200 && s < 300;
                                        if (
                                            "json" === t.responseType &&
                                            "string" == typeof l
                                        ) {
                                            const t = l;
                                            l = l.replace(Lg, "");
                                            try {
                                                l =
                                                    "" !== l
                                                        ? JSON.parse(l)
                                                        : null;
                                            } catch (u) {
                                                (l = t),
                                                    c &&
                                                        ((c = !1),
                                                        (l = {
                                                            error: u,
                                                            text: l,
                                                        }));
                                            }
                                        }
                                        c
                                            ? (e.next(
                                                  new Rg({
                                                      body: l,
                                                      headers: r,
                                                      status: s,
                                                      statusText: o,
                                                      url: a || void 0,
                                                  })
                                              ),
                                              e.complete())
                                            : e.error(
                                                  new Pg({
                                                      error: l,
                                                      headers: r,
                                                      status: s,
                                                      statusText: o,
                                                      url: a || void 0,
                                                  })
                                              );
                                    },
                                    a = (t) => {
                                        const { url: r } = i(),
                                            s = new Pg({
                                                error: t,
                                                status: n.status || 0,
                                                statusText:
                                                    n.statusText ||
                                                    "Unknown Error",
                                                url: r || void 0,
                                            });
                                        e.error(s);
                                    };
                                let l = !1;
                                const c = (r) => {
                                        l || (e.next(i()), (l = !0));
                                        let s = {
                                            type: Ag.DownloadProgress,
                                            loaded: r.loaded,
                                        };
                                        r.lengthComputable &&
                                            (s.total = r.total),
                                            "text" === t.responseType &&
                                                n.responseText &&
                                                (s.partialText =
                                                    n.responseText),
                                            e.next(s);
                                    },
                                    u = (t) => {
                                        let n = {
                                            type: Ag.UploadProgress,
                                            loaded: t.loaded,
                                        };
                                        t.lengthComputable &&
                                            (n.total = t.total),
                                            e.next(n);
                                    };
                                return (
                                    n.addEventListener("load", o),
                                    n.addEventListener("error", a),
                                    t.reportProgress &&
                                        (n.addEventListener("progress", c),
                                        null !== r &&
                                            n.upload &&
                                            n.upload.addEventListener(
                                                "progress",
                                                u
                                            )),
                                    n.send(r),
                                    e.next({ type: Ag.Sent }),
                                    () => {
                                        n.removeEventListener("error", a),
                                            n.removeEventListener("load", o),
                                            t.reportProgress &&
                                                (n.removeEventListener(
                                                    "progress",
                                                    c
                                                ),
                                                null !== r &&
                                                    n.upload &&
                                                    n.upload.removeEventListener(
                                                        "progress",
                                                        u
                                                    )),
                                            n.readyState !== n.DONE &&
                                                n.abort();
                                    }
                                );
                            });
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)(dr(Fg));
                        }),
                        (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
                        t
                    );
                })();
            const $g = new qn("XSRF_COOKIE_NAME"),
                qg = new qn("XSRF_HEADER_NAME");
            class Bg {}
            let Wg = (() => {
                    class t {
                        constructor(t, e, n) {
                            (this.doc = t),
                                (this.platform = e),
                                (this.cookieName = n),
                                (this.lastCookieString = ""),
                                (this.lastToken = null),
                                (this.parseCount = 0);
                        }
                        getToken() {
                            if ("server" === this.platform) return null;
                            const t = this.doc.cookie || "";
                            return (
                                t !== this.lastCookieString &&
                                    (this.parseCount++,
                                    (this.lastToken = wc(t, this.cookieName)),
                                    (this.lastCookieString = t)),
                                this.lastToken
                            );
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)(dr(tc), dr(ol), dr($g));
                        }),
                        (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
                        t
                    );
                })(),
                Zg = (() => {
                    class t {
                        constructor(t, e) {
                            (this.tokenService = t), (this.headerName = e);
                        }
                        intercept(t, e) {
                            const n = t.url.toLowerCase();
                            if (
                                "GET" === t.method ||
                                "HEAD" === t.method ||
                                n.startsWith("http://") ||
                                n.startsWith("https://")
                            )
                                return e.handle(t);
                            const r = this.tokenService.getToken();
                            return (
                                null === r ||
                                    t.headers.has(this.headerName) ||
                                    (t = t.clone({
                                        headers: t.headers.set(
                                            this.headerName,
                                            r
                                        ),
                                    })),
                                e.handle(t)
                            );
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)(dr(Bg), dr(qg));
                        }),
                        (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
                        t
                    );
                })(),
                Gg = (() => {
                    class t {
                        constructor(t, e) {
                            (this.backend = t),
                                (this.injector = e),
                                (this.chain = null);
                        }
                        handle(t) {
                            if (null === this.chain) {
                                const t = this.injector.get(Ng, []);
                                this.chain = t.reduceRight(
                                    (t, e) => new Mg(t, e),
                                    this.backend
                                );
                            }
                            return this.chain.handle(t);
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)(dr(bg), dr(_i));
                        }),
                        (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
                        t
                    );
                })(),
                Qg = (() => {
                    class t {
                        static disable() {
                            return {
                                ngModule: t,
                                providers: [{ provide: Zg, useClass: Ug }],
                            };
                        }
                        static withOptions(e = {}) {
                            return {
                                ngModule: t,
                                providers: [
                                    e.cookieName
                                        ? {
                                              provide: $g,
                                              useValue: e.cookieName,
                                          }
                                        : [],
                                    e.headerName
                                        ? {
                                              provide: qg,
                                              useValue: e.headerName,
                                          }
                                        : [],
                                ],
                            };
                        }
                    }
                    return (
                        (t.ɵmod = Ht({ type: t })),
                        (t.ɵinj = at({
                            factory: function (e) {
                                return new (e || t)();
                            },
                            providers: [
                                Zg,
                                { provide: Ng, useExisting: Zg, multi: !0 },
                                { provide: Bg, useClass: Wg },
                                { provide: $g, useValue: "XSRF-TOKEN" },
                                { provide: qg, useValue: "X-XSRF-TOKEN" },
                            ],
                        })),
                        t
                    );
                })(),
                Kg = (() => {
                    class t {}
                    return (
                        (t.ɵmod = Ht({ type: t })),
                        (t.ɵinj = at({
                            factory: function (e) {
                                return new (e || t)();
                            },
                            providers: [
                                jg,
                                { provide: _g, useClass: Gg },
                                zg,
                                { provide: bg, useExisting: zg },
                                Hg,
                                { provide: Fg, useExisting: Hg },
                            ],
                            imports: [
                                [
                                    Qg.withOptions({
                                        cookieName: "XSRF-TOKEN",
                                        headerName: "X-XSRF-TOKEN",
                                    }),
                                ],
                            ],
                        })),
                        t
                    );
                })(),
                Jg = (() => {
                    class t {
                        constructor(t) {
                            (this.http = t),
                                (this.contactSelectedEvent = new Pa()),
                                (this.contactListChanged = new S()),
                                (this.contacts = []),
                                this.getContacts();
                        }
                        getMaxId() {
                            let t = 0;
                            return (
                                this.contacts.forEach((e) => {
                                    let n = +e.id;
                                    n > t && (t = n);
                                }),
                                t
                            );
                        }
                        getContacts() {
                            this.http
                                .get("http://localhost:3000/contacts")
                                .subscribe(
                                    (t) => {
                                        (this.contacts = t.contacts),
                                            this.sortAndSend();
                                    },
                                    (t) => {
                                        console.log(t);
                                    }
                                );
                        }
                        getContact(t) {
                            return this.http.get(
                                "http://localhost:3000/contacts/" + t
                            );
                        }
                        addContact(t) {
                            if (!t) return;
                            t.id = "";
                            const e = new wg({
                                "Content-Type": "application/json",
                            });
                            this.http
                                .post("http://localhost:3000/contacts", t, {
                                    headers: e,
                                })
                                .subscribe((t) => {
                                    this.contacts.push(t.contact),
                                        this.sortAndSend();
                                });
                        }
                        updateContact(t, e) {
                            if (!t || !e) return;
                            const n = this.contacts.findIndex(
                                (e) => e.id === t.id
                            );
                            if (n < 0) return;
                            e.id = t.id;
                            const r = new wg({
                                "Content-Type": "application/json",
                            });
                            this.http
                                .put(
                                    "http://localhost:3000/contacts/" + t.id,
                                    e,
                                    { headers: r }
                                )
                                .subscribe((t) => {
                                    (this.contacts[n] = e), this.sortAndSend();
                                });
                        }
                        deleteContact(t) {
                            if (!t) return;
                            const e = this.contacts.findIndex((t) => t.id);
                            e < 0 ||
                                this.http
                                    .delete(
                                        "http://localhost:3000/contacts/" + t.id
                                    )
                                    .subscribe((t) => {
                                        this.contacts.splice(e, 1),
                                            this.sortAndSend();
                                    });
                        }
                        sortAndSend() {
                            this.contacts.sort((t, e) =>
                                t.name < e.name ? 1 : t.name > e.name ? -1 : 0
                            ),
                                this.contactListChanged.next(
                                    this.contacts.slice()
                                );
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)(dr(jg));
                        }),
                        (t.ɵprov = ot({
                            token: t,
                            factory: t.ɵfac,
                            providedIn: "root",
                        })),
                        t
                    );
                })();
            function Yg(t, e) {
                if ((1 & t && zi(0, "img", 12), 2 & t)) {
                    const t = Qi();
                    Ki("alt", null == t.contact ? null : t.contact.name),
                        Ui(
                            "src",
                            null == t.contact ? null : t.contact.imageUrl,
                            _r
                        );
                }
            }
            const Xg = function (t) {
                return ["/contacts", t];
            };
            function tm(t, e) {
                if (
                    (1 & t &&
                        (Fi(0, "li", 16), Fi(1, "a", 17), oo(2), Hi(), Hi()),
                    2 & t)
                ) {
                    const t = e.$implicit;
                    cs(1),
                        Ui("routerLink", Da(2, Xg, t.id)),
                        cs(1),
                        ao(null == t ? null : t.name);
                }
            }
            function em(t, e) {
                if (
                    (1 & t &&
                        (Fi(0, "div", 13),
                        Fi(1, "div", 0),
                        Fi(2, "div", 1),
                        Fi(3, "h4"),
                        oo(4, "Group Members: "),
                        Hi(),
                        Fi(5, "ul", 14),
                        ji(6, tm, 3, 4, "li", 15),
                        Hi(),
                        Hi(),
                        Hi(),
                        Hi()),
                    2 & t)
                ) {
                    const t = Qi();
                    cs(6), Ui("ngForOf", t.contact.group);
                }
            }
            const nm = function () {
                return ["edit"];
            };
            let rm = (() => {
                class t {
                    constructor(t, e, n) {
                        (this.contactService = t),
                            (this.router = e),
                            (this.route = n);
                    }
                    ngOnInit() {
                        this.route.params.subscribe((t) => {
                            (this.id = t.id),
                                this.contactService
                                    .getContact(this.id)
                                    .subscribe((t) => {
                                        this.contact = t.contact;
                                    });
                        });
                    }
                    onDelete() {
                        this.contactService.deleteContact(this.contact),
                            this.router.navigateByUrl("contacts"),
                            this.contactService.getContacts(),
                            this.router.navigate(["/contacts"]);
                    }
                }
                return (
                    (t.ɵfac = function (e) {
                        return new (e || t)(Ni(Jg), Ni(Op), Ni(id));
                    }),
                    (t.ɵcmp = Nt({
                        type: t,
                        selectors: [["cms-contact-detail"]],
                        decls: 22,
                        vars: 7,
                        consts: [
                            [1, "row"],
                            [1, "col-xs-12"],
                            [1, "panel", "panel-default"],
                            [1, "panel-heading"],
                            [1, "col-md-7"],
                            ["class", "col-md-6", 3, "src", "alt", 4, "ngIf"],
                            [1, "col-md-6"],
                            [
                                "id",
                                "btn",
                                1,
                                "btn",
                                "btn-primary",
                                3,
                                "routerLink",
                            ],
                            ["id", "btn", 1, "btn", "btn-danger", 3, "click"],
                            [1, "panel-body"],
                            [1, "pull-left"],
                            ["class", "panel-footer", 4, "ngIf"],
                            [1, "col-md-6", 3, "src", "alt"],
                            [1, "panel-footer"],
                            [1, "list-group"],
                            ["class", "list-grou-item", 4, "ngFor", "ngForOf"],
                            [1, "list-grou-item"],
                            [3, "routerLink"],
                        ],
                        template: function (t, e) {
                            1 & t &&
                                (Fi(0, "div", 0),
                                Fi(1, "div", 1),
                                Fi(2, "div", 2),
                                Fi(3, "div", 3),
                                Fi(4, "h4", 4),
                                oo(5),
                                Hi(),
                                Fi(6, "div", 0),
                                ji(7, Yg, 1, 2, "img", 5),
                                Fi(8, "div", 6),
                                Fi(9, "a", 7),
                                oo(10, "Edit"),
                                Hi(),
                                Fi(11, "a", 8),
                                Wi("click", function () {
                                    return e.onDelete();
                                }),
                                oo(12, "Delete"),
                                Hi(),
                                Hi(),
                                Hi(),
                                Hi(),
                                Fi(13, "div", 9),
                                Fi(14, "div", 0),
                                Fi(15, "div", 1),
                                Fi(16, "div", 10),
                                Fi(17, "h4"),
                                oo(18),
                                Hi(),
                                Fi(19, "h4"),
                                oo(20),
                                Hi(),
                                Hi(),
                                Hi(),
                                Hi(),
                                Hi(),
                                ji(21, em, 7, 1, "div", 11),
                                Hi(),
                                Hi(),
                                Hi()),
                                2 & t &&
                                    (cs(5),
                                    ao(
                                        null == e.contact
                                            ? null
                                            : e.contact.name
                                    ),
                                    cs(2),
                                    Ui(
                                        "ngIf",
                                        null == e.contact
                                            ? null
                                            : e.contact.imageUrl
                                    ),
                                    cs(2),
                                    Ui("routerLink", Aa(6, nm)),
                                    cs(9),
                                    lo(
                                        "Email: ",
                                        null == e.contact
                                            ? null
                                            : e.contact.email,
                                        ""
                                    ),
                                    cs(2),
                                    lo(
                                        "Phone: ",
                                        null == e.contact
                                            ? null
                                            : e.contact.phone,
                                        ""
                                    ),
                                    cs(1),
                                    Ui(
                                        "ngIf",
                                        (null == e.contact ||
                                        null == e.contact.group
                                            ? null
                                            : e.contact.group.length) > 0
                                    ));
                        },
                        directives: [Ec, Dp, Sc],
                        styles: [
                            ".btn[_ngcontent-%COMP%]{margin:2px}li[_ngcontent-%COMP%]{list-style:none;font-size:1.1em;margin:10px}",
                        ],
                    })),
                    t
                );
            })();
            class sm {
                constructor(t, e, n, r, s, i, o) {
                    (this.id = t),
                        (this._id = e),
                        (this.name = n),
                        (this.email = r),
                        (this.phone = s),
                        (this.imageUrl = i),
                        (this.group = o);
                }
            }
            function im(t) {
                return null != t;
            }
            let om = (() => {
                class t {
                    constructor(t) {
                        this.name = t;
                    }
                }
                return (
                    (t.COPY = new t("copy")),
                    (t.LINK = new t("link")),
                    (t.MOVE = new t("move")),
                    (t.NONE = new t("none")),
                    t
                );
            })();
            class am {
                constructor() {
                    (this.onDragStartClass = "dnd-drag-start"),
                        (this.onDragEnterClass = "dnd-drag-enter"),
                        (this.onDragOverClass = "dnd-drag-over"),
                        (this.onSortableDragClass = "dnd-sortable-drag"),
                        (this.dragEffect = om.MOVE),
                        (this.dropEffect = om.MOVE),
                        (this.dragCursor = "move"),
                        (this.defaultCursor = "pointer");
                }
            }
            var lm = function (t, e) {
                if (
                    "object" == typeof Reflect &&
                    "function" == typeof Reflect.metadata
                )
                    return Reflect.metadata(t, e);
            };
            let cm = (() => {
                    let t = class {
                        constructor() {
                            this.allowedDropZones = [];
                        }
                    };
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)();
                        }),
                        (t.ɵprov = ot({
                            token: t,
                            factory: function (e) {
                                return t.ɵfac(e);
                            },
                        })),
                        t
                    );
                })(),
                um = (() => {
                    let t = class {
                        constructor(t) {
                            this._config = t;
                        }
                        get elem() {
                            return this._elem;
                        }
                        markSortable(t) {
                            im(this._elem) &&
                                this._elem.classList.remove(
                                    this._config.onSortableDragClass
                                ),
                                im(t) &&
                                    ((this._elem = t),
                                    this._elem.classList.add(
                                        this._config.onSortableDragClass
                                    ));
                        }
                    };
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)(dr(am));
                        }),
                        (t.ɵprov = ot({
                            token: t,
                            factory: function (e) {
                                return t.ɵfac(e);
                            },
                        })),
                        (t = (function (t, e, n, r) {
                            var s,
                                i = arguments.length,
                                o =
                                    i < 3
                                        ? e
                                        : null === r
                                        ? (r = Object.getOwnPropertyDescriptor(
                                              e,
                                              n
                                          ))
                                        : r;
                            if (
                                "object" == typeof Reflect &&
                                "function" == typeof Reflect.decorate
                            )
                                o = Reflect.decorate(t, e, n, r);
                            else
                                for (var a = t.length - 1; a >= 0; a--)
                                    (s = t[a]) &&
                                        (o =
                                            (i < 3
                                                ? s(o)
                                                : i > 3
                                                ? s(e, n, o)
                                                : s(e, n)) || o);
                            return (
                                i > 3 && o && Object.defineProperty(e, n, o), o
                            );
                        })([lm("design:paramtypes", [am])], t)),
                        t
                    );
                })();
            var hm = function (t, e) {
                if (
                    "object" == typeof Reflect &&
                    "function" == typeof Reflect.metadata
                )
                    return Reflect.metadata(t, e);
            };
            let dm = (() => {
                let t = class {
                    constructor(t, e, n, r) {
                        (this._dragDropService = e),
                            (this._config = n),
                            (this._cdr = r),
                            (this._dragEnabled = !1),
                            (this.dropEnabled = !1),
                            (this.dropZones = []),
                            (this.cloneItem = !1),
                            (this._defaultCursor = n.defaultCursor),
                            (this._elem = t.nativeElement),
                            (this._elem.style.cursor = this._defaultCursor),
                            (this._elem.ondragenter = (t) => {
                                this._onDragEnter(t);
                            }),
                            (this._elem.ondragover = (t) => (
                                this._onDragOver(t),
                                null != t.dataTransfer &&
                                    (t.dataTransfer.dropEffect =
                                        this._config.dropEffect.name),
                                !1
                            )),
                            (this._elem.ondragleave = (t) => {
                                this._onDragLeave(t);
                            }),
                            (this._elem.ondrop = (t) => {
                                this._onDrop(t);
                            }),
                            (this._elem.onmousedown = (t) => {
                                this._target = t.target;
                            }),
                            (this._elem.ondragstart = (t) => {
                                if (
                                    !this._dragHandle ||
                                    this._dragHandle.contains(this._target)
                                ) {
                                    if (
                                        (this._onDragStart(t),
                                        null != t.dataTransfer)
                                    ) {
                                        if (
                                            (t.dataTransfer.setData("text", ""),
                                            (t.dataTransfer.effectAllowed =
                                                this.effectAllowed ||
                                                this._config.dragEffect.name),
                                            im(this.dragImage))
                                        )
                                            if (
                                                "string" ==
                                                typeof this.dragImage
                                            )
                                                t.dataTransfer.setDragImage(
                                                    (function (t) {
                                                        let e =
                                                            new HTMLImageElement();
                                                        return (e.src = t), e;
                                                    })(this.dragImage)
                                                );
                                            else if (
                                                "function" ==
                                                typeof this.dragImage
                                            )
                                                t.dataTransfer.setDragImage(
                                                    (0, this.dragImage)()
                                                );
                                            else {
                                                let e = this.dragImage;
                                                t.dataTransfer.setDragImage(
                                                    e.imageElement,
                                                    e.x_offset,
                                                    e.y_offset
                                                );
                                            }
                                        else if (im(this._config.dragImage)) {
                                            let e = this._config.dragImage;
                                            t.dataTransfer.setDragImage(
                                                e.imageElement,
                                                e.x_offset,
                                                e.y_offset
                                            );
                                        } else
                                            this.cloneItem &&
                                                ((this._dragHelper =
                                                    this._elem.cloneNode(!0)),
                                                this._dragHelper.classList.add(
                                                    "dnd-drag-item"
                                                ),
                                                (this._dragHelper.style.position =
                                                    "absolute"),
                                                (this._dragHelper.style.top =
                                                    "0px"),
                                                (this._dragHelper.style.left =
                                                    "-1000px"),
                                                this._elem.parentElement.appendChild(
                                                    this._dragHelper
                                                ),
                                                t.dataTransfer.setDragImage(
                                                    this._dragHelper,
                                                    t.offsetX,
                                                    t.offsetY
                                                ));
                                        (this._dragHandle
                                            ? this._dragHandle
                                            : this._elem
                                        ).style.cursor = this._dragEnabled
                                            ? this.effectCursor
                                                ? this.effectCursor
                                                : this._config.dragCursor
                                            : this._defaultCursor;
                                    }
                                } else t.preventDefault();
                            }),
                            (this._elem.ondragend = (t) => {
                                this._elem.parentElement &&
                                    this._dragHelper &&
                                    this._elem.parentElement.removeChild(
                                        this._dragHelper
                                    ),
                                    this._onDragEnd(t),
                                    ((this._dragHandle
                                        ? this._dragHandle
                                        : this._elem
                                    ).style.cursor = this._defaultCursor);
                            });
                    }
                    set dragEnabled(t) {
                        (this._dragEnabled = !!t),
                            (this._elem.draggable = this._dragEnabled);
                    }
                    get dragEnabled() {
                        return this._dragEnabled;
                    }
                    setDragHandle(t) {
                        this._dragHandle = t;
                    }
                    detectChanges() {
                        setTimeout(() => {
                            this._cdr &&
                                !this._cdr.destroyed &&
                                this._cdr.detectChanges();
                        }, 250);
                    }
                    _onDragEnter(t) {
                        this._isDropAllowed(t) && this._onDragEnterCallback(t);
                    }
                    _onDragOver(t) {
                        this._isDropAllowed(t) &&
                            (t.preventDefault && t.preventDefault(),
                            this._onDragOverCallback(t));
                    }
                    _onDragLeave(t) {
                        this._isDropAllowed(t) && this._onDragLeaveCallback(t);
                    }
                    _onDrop(t) {
                        this._isDropAllowed(t) &&
                            (this._preventAndStop(t),
                            this._onDropCallback(t),
                            this.detectChanges());
                    }
                    _isDropAllowed(t) {
                        if (
                            (this._dragDropService.isDragged ||
                                (t.dataTransfer && t.dataTransfer.files)) &&
                            this.dropEnabled
                        ) {
                            if (this.allowDrop)
                                return this.allowDrop(
                                    this._dragDropService.dragData
                                );
                            if (
                                0 === this.dropZones.length &&
                                0 ===
                                    this._dragDropService.allowedDropZones
                                        .length
                            )
                                return !0;
                            for (
                                let t = 0;
                                t <
                                this._dragDropService.allowedDropZones.length;
                                t++
                            )
                                if (
                                    -1 !==
                                    this.dropZones.indexOf(
                                        this._dragDropService.allowedDropZones[
                                            t
                                        ]
                                    )
                                )
                                    return !0;
                        }
                        return !1;
                    }
                    _preventAndStop(t) {
                        t.preventDefault && t.preventDefault(),
                            t.stopPropagation && t.stopPropagation();
                    }
                    _onDragStart(t) {
                        this._dragEnabled &&
                            ((this._dragDropService.allowedDropZones =
                                this.dropZones),
                            this._onDragStartCallback(t));
                    }
                    _onDragEnd(t) {
                        (this._dragDropService.allowedDropZones = []),
                            this._onDragEndCallback(t);
                    }
                    _onDragEnterCallback(t) {}
                    _onDragOverCallback(t) {}
                    _onDragLeaveCallback(t) {}
                    _onDropCallback(t) {}
                    _onDragStartCallback(t) {}
                    _onDragEndCallback(t) {}
                };
                return (
                    (t.ɵfac = function (e) {
                        return new (e || t)(dr(Po), dr(cm), dr(am), dr(na));
                    }),
                    (t.ɵprov = ot({
                        token: t,
                        factory: function (e) {
                            return t.ɵfac(e);
                        },
                    })),
                    (t = (function (t, e, n, r) {
                        var s,
                            i = arguments.length,
                            o =
                                i < 3
                                    ? e
                                    : null === r
                                    ? (r = Object.getOwnPropertyDescriptor(
                                          e,
                                          n
                                      ))
                                    : r;
                        if (
                            "object" == typeof Reflect &&
                            "function" == typeof Reflect.decorate
                        )
                            o = Reflect.decorate(t, e, n, r);
                        else
                            for (var a = t.length - 1; a >= 0; a--)
                                (s = t[a]) &&
                                    (o =
                                        (i < 3
                                            ? s(o)
                                            : i > 3
                                            ? s(e, n, o)
                                            : s(e, n)) || o);
                        return i > 3 && o && Object.defineProperty(e, n, o), o;
                    })([hm("design:paramtypes", [Po, cm, am, na])], t)),
                    t
                );
            })();
            var pm = function (t, e, n, r) {
                    var s,
                        i = arguments.length,
                        o =
                            i < 3
                                ? e
                                : null === r
                                ? (r = Object.getOwnPropertyDescriptor(e, n))
                                : r;
                    if (
                        "object" == typeof Reflect &&
                        "function" == typeof Reflect.decorate
                    )
                        o = Reflect.decorate(t, e, n, r);
                    else
                        for (var a = t.length - 1; a >= 0; a--)
                            (s = t[a]) &&
                                (o =
                                    (i < 3
                                        ? s(o)
                                        : i > 3
                                        ? s(e, n, o)
                                        : s(e, n)) || o);
                    return i > 3 && o && Object.defineProperty(e, n, o), o;
                },
                fm = function (t, e) {
                    if (
                        "object" == typeof Reflect &&
                        "function" == typeof Reflect.metadata
                    )
                        return Reflect.metadata(t, e);
                };
            let gm = (() => {
                let t = class extends dm {
                    constructor(t, e, n, r) {
                        super(t, e, n, r),
                            (this.onDragStart = new Pa()),
                            (this.onDragEnd = new Pa()),
                            (this.onDragSuccessCallback = new Pa()),
                            (this._defaultCursor = this._elem.style.cursor),
                            (this.dragEnabled = !0);
                    }
                    set draggable(t) {
                        this.dragEnabled = !!t;
                    }
                    set dropzones(t) {
                        this.dropZones = t;
                    }
                    set effectallowed(t) {
                        this.effectAllowed = t;
                    }
                    set effectcursor(t) {
                        this.effectCursor = t;
                    }
                    _onDragStartCallback(t) {
                        (this._dragDropService.isDragged = !0),
                            (this._dragDropService.dragData = this.dragData),
                            (this._dragDropService.onDragSuccessCallback =
                                this.onDragSuccessCallback),
                            this._elem.classList.add(
                                this._config.onDragStartClass
                            ),
                            this.onDragStart.emit({
                                dragData: this.dragData,
                                mouseEvent: t,
                            });
                    }
                    _onDragEndCallback(t) {
                        (this._dragDropService.isDragged = !1),
                            (this._dragDropService.dragData = null),
                            (this._dragDropService.onDragSuccessCallback =
                                null),
                            this._elem.classList.remove(
                                this._config.onDragStartClass
                            ),
                            this.onDragEnd.emit({
                                dragData: this.dragData,
                                mouseEvent: t,
                            });
                    }
                };
                return (
                    (t.ɵfac = function (e) {
                        return new (e || t)(Ni(Po), Ni(cm), Ni(am), Ni(na));
                    }),
                    (t.ɵdir = $t({
                        type: t,
                        selectors: [["", "dnd-draggable", ""]],
                        inputs: {
                            draggable: ["dragEnabled", "draggable"],
                            dropzones: ["dropZones", "dropzones"],
                            effectallowed: ["effectAllowed", "effectallowed"],
                            effectcursor: ["effectCursor", "effectcursor"],
                            dragData: "dragData",
                            dragImage: "dragImage",
                            cloneItem: "cloneItem",
                        },
                        outputs: {
                            onDragStart: "onDragStart",
                            onDragEnd: "onDragEnd",
                            onDragSuccessCallback: "onDragSuccess",
                        },
                        features: [wi],
                    })),
                    pm(
                        [
                            Ya("dragEnabled"),
                            fm("design:type", Boolean),
                            fm("design:paramtypes", [Boolean]),
                        ],
                        t.prototype,
                        "draggable",
                        null
                    ),
                    pm(
                        [Xa(), fm("design:type", Pa)],
                        t.prototype,
                        "onDragStart",
                        void 0
                    ),
                    pm(
                        [Xa(), fm("design:type", Pa)],
                        t.prototype,
                        "onDragEnd",
                        void 0
                    ),
                    pm(
                        [Ya(), fm("design:type", Object)],
                        t.prototype,
                        "dragData",
                        void 0
                    ),
                    pm(
                        [Xa("onDragSuccess"), fm("design:type", Pa)],
                        t.prototype,
                        "onDragSuccessCallback",
                        void 0
                    ),
                    pm(
                        [
                            Ya("dropZones"),
                            fm("design:type", Array),
                            fm("design:paramtypes", [Array]),
                        ],
                        t.prototype,
                        "dropzones",
                        null
                    ),
                    pm(
                        [
                            Ya("effectAllowed"),
                            fm("design:type", String),
                            fm("design:paramtypes", [String]),
                        ],
                        t.prototype,
                        "effectallowed",
                        null
                    ),
                    pm(
                        [
                            Ya("effectCursor"),
                            fm("design:type", String),
                            fm("design:paramtypes", [String]),
                        ],
                        t.prototype,
                        "effectcursor",
                        null
                    ),
                    pm(
                        [Ya(), fm("design:type", Object)],
                        t.prototype,
                        "dragImage",
                        void 0
                    ),
                    pm(
                        [Ya(), fm("design:type", Boolean)],
                        t.prototype,
                        "cloneItem",
                        void 0
                    ),
                    (t = pm([fm("design:paramtypes", [Po, cm, am, na])], t)),
                    t
                );
            })();
            var mm = function (t, e, n, r) {
                    var s,
                        i = arguments.length,
                        o =
                            i < 3
                                ? e
                                : null === r
                                ? (r = Object.getOwnPropertyDescriptor(e, n))
                                : r;
                    if (
                        "object" == typeof Reflect &&
                        "function" == typeof Reflect.decorate
                    )
                        o = Reflect.decorate(t, e, n, r);
                    else
                        for (var a = t.length - 1; a >= 0; a--)
                            (s = t[a]) &&
                                (o =
                                    (i < 3
                                        ? s(o)
                                        : i > 3
                                        ? s(e, n, o)
                                        : s(e, n)) || o);
                    return i > 3 && o && Object.defineProperty(e, n, o), o;
                },
                ym = function (t, e) {
                    if (
                        "object" == typeof Reflect &&
                        "function" == typeof Reflect.metadata
                    )
                        return Reflect.metadata(t, e);
                };
            let vm = (() => {
                    let t = class extends dm {
                        constructor(t, e, n, r) {
                            super(t, e, n, r),
                                (this.onDropSuccess = new Pa()),
                                (this.onDragEnter = new Pa()),
                                (this.onDragOver = new Pa()),
                                (this.onDragLeave = new Pa()),
                                (this.dropEnabled = !0);
                        }
                        set droppable(t) {
                            this.dropEnabled = !!t;
                        }
                        set allowdrop(t) {
                            this.allowDrop = t;
                        }
                        set dropzones(t) {
                            this.dropZones = t;
                        }
                        set effectallowed(t) {
                            this.effectAllowed = t;
                        }
                        set effectcursor(t) {
                            this.effectCursor = t;
                        }
                        _onDragEnterCallback(t) {
                            this._dragDropService.isDragged &&
                                (this._elem.classList.add(
                                    this._config.onDragEnterClass
                                ),
                                this.onDragEnter.emit({
                                    dragData: this._dragDropService.dragData,
                                    mouseEvent: t,
                                }));
                        }
                        _onDragOverCallback(t) {
                            this._dragDropService.isDragged &&
                                (this._elem.classList.add(
                                    this._config.onDragOverClass
                                ),
                                this.onDragOver.emit({
                                    dragData: this._dragDropService.dragData,
                                    mouseEvent: t,
                                }));
                        }
                        _onDragLeaveCallback(t) {
                            this._dragDropService.isDragged &&
                                (this._elem.classList.remove(
                                    this._config.onDragOverClass
                                ),
                                this._elem.classList.remove(
                                    this._config.onDragEnterClass
                                ),
                                this.onDragLeave.emit({
                                    dragData: this._dragDropService.dragData,
                                    mouseEvent: t,
                                }));
                        }
                        _onDropCallback(t) {
                            let e = t.dataTransfer;
                            (this._dragDropService.isDragged ||
                                (e && e.files)) &&
                                (this.onDropSuccess.emit({
                                    dragData: this._dragDropService.dragData,
                                    mouseEvent: t,
                                }),
                                this._dragDropService.onDragSuccessCallback &&
                                    this._dragDropService.onDragSuccessCallback.emit(
                                        {
                                            dragData:
                                                this._dragDropService.dragData,
                                            mouseEvent: t,
                                        }
                                    ),
                                this._elem.classList.remove(
                                    this._config.onDragOverClass
                                ),
                                this._elem.classList.remove(
                                    this._config.onDragEnterClass
                                ));
                        }
                    };
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)(Ni(Po), Ni(cm), Ni(am), Ni(na));
                        }),
                        (t.ɵdir = $t({
                            type: t,
                            selectors: [["", "dnd-droppable", ""]],
                            inputs: {
                                droppable: ["dropEnabled", "droppable"],
                                allowdrop: ["allowDrop", "allowdrop"],
                                dropzones: ["dropZones", "dropzones"],
                                effectallowed: [
                                    "effectAllowed",
                                    "effectallowed",
                                ],
                                effectcursor: ["effectCursor", "effectcursor"],
                            },
                            outputs: {
                                onDropSuccess: "onDropSuccess",
                                onDragEnter: "onDragEnter",
                                onDragOver: "onDragOver",
                                onDragLeave: "onDragLeave",
                            },
                            features: [wi],
                        })),
                        mm(
                            [
                                Ya("dropEnabled"),
                                ym("design:type", Boolean),
                                ym("design:paramtypes", [Boolean]),
                            ],
                            t.prototype,
                            "droppable",
                            null
                        ),
                        mm(
                            [Xa(), ym("design:type", Pa)],
                            t.prototype,
                            "onDropSuccess",
                            void 0
                        ),
                        mm(
                            [Xa(), ym("design:type", Pa)],
                            t.prototype,
                            "onDragEnter",
                            void 0
                        ),
                        mm(
                            [Xa(), ym("design:type", Pa)],
                            t.prototype,
                            "onDragOver",
                            void 0
                        ),
                        mm(
                            [Xa(), ym("design:type", Pa)],
                            t.prototype,
                            "onDragLeave",
                            void 0
                        ),
                        mm(
                            [
                                Ya("allowDrop"),
                                ym("design:type", Function),
                                ym("design:paramtypes", [Function]),
                            ],
                            t.prototype,
                            "allowdrop",
                            null
                        ),
                        mm(
                            [
                                Ya("dropZones"),
                                ym("design:type", Array),
                                ym("design:paramtypes", [Array]),
                            ],
                            t.prototype,
                            "dropzones",
                            null
                        ),
                        mm(
                            [
                                Ya("effectAllowed"),
                                ym("design:type", String),
                                ym("design:paramtypes", [String]),
                            ],
                            t.prototype,
                            "effectallowed",
                            null
                        ),
                        mm(
                            [
                                Ya("effectCursor"),
                                ym("design:type", String),
                                ym("design:paramtypes", [String]),
                            ],
                            t.prototype,
                            "effectcursor",
                            null
                        ),
                        (t = mm(
                            [ym("design:paramtypes", [Po, cm, am, na])],
                            t
                        )),
                        t
                    );
                })(),
                _m = [
                    am,
                    {
                        provide: cm,
                        useFactory: function () {
                            return new cm();
                        },
                    },
                    {
                        provide: um,
                        useFactory: function (t) {
                            return new um(t);
                        },
                        deps: [am],
                    },
                ],
                bm = (() => {
                    let t = (wm = class {
                        static forRoot() {
                            return { ngModule: wm, providers: _m };
                        }
                    });
                    return (
                        (t.ɵmod = Ht({ type: t })),
                        (t.ɵinj = at({
                            factory: function (e) {
                                return new (e || t)();
                            },
                        })),
                        t
                    );
                })();
            var wm;
            function Cm(t, e) {
                if ((1 & t && zi(0, "img", 5), 2 & t)) {
                    const t = Qi();
                    Ki("alt", null == t.contact ? null : t.contact.name),
                        Ui(
                            "src",
                            null == t.contact ? null : t.contact.imageUrl,
                            _r
                        );
                }
            }
            const Sm = function (t) {
                return [t];
            };
            let xm = (() => {
                class t {
                    constructor(t) {
                        this.contactService = t;
                    }
                    ngOnInit() {
                        this.contactService.contactSelectedEvent.emit(
                            this.contact
                        );
                    }
                }
                return (
                    (t.ɵfac = function (e) {
                        return new (e || t)(Ni(Jg));
                    }),
                    (t.ɵcmp = Nt({
                        type: t,
                        selectors: [["cms-contact-item"]],
                        inputs: { contact: "contact" },
                        decls: 6,
                        vars: 5,
                        consts: [
                            [1, "list-group-item", "clearfix", 3, "routerLink"],
                            [1, "pull-left"],
                            [1, "list-group-item-heading"],
                            [1, "pull-right"],
                            [
                                "class",
                                "img-responsive",
                                "style",
                                "max-height: 50px",
                                3,
                                "src",
                                "alt",
                                4,
                                "ngIf",
                            ],
                            [
                                1,
                                "img-responsive",
                                2,
                                "max-height",
                                "50px",
                                3,
                                "src",
                                "alt",
                            ],
                        ],
                        template: function (t, e) {
                            1 & t &&
                                (Fi(0, "a", 0),
                                Fi(1, "div", 1),
                                Fi(2, "h4", 2),
                                oo(3),
                                Hi(),
                                Hi(),
                                Fi(4, "span", 3),
                                ji(5, Cm, 1, 2, "img", 4),
                                Hi(),
                                Hi()),
                                2 & t &&
                                    (Ui("routerLink", Da(3, Sm, e.contact.id)),
                                    cs(3),
                                    ao(e.contact.name),
                                    cs(2),
                                    Ui(
                                        "ngIf",
                                        null == e.contact
                                            ? null
                                            : e.contact.imageUrl
                                    ));
                        },
                        directives: [Dp, Ec],
                        styles: [""],
                    })),
                    t
                );
            })();
            function Em(t, e) {
                1 & t &&
                    (Fi(0, "div", 27),
                    oo(1, " Enter a valid phone number. "),
                    Hi());
            }
            function Tm(t, e) {
                1 & t &&
                    (Fi(0, "div", 28),
                    oo(
                        1,
                        " Contact is already in the group or is the current contact. "
                    ),
                    Hi());
            }
            function km(t, e) {
                if (1 & t) {
                    const t = $i();
                    Fi(0, "div"),
                        Fi(1, "div"),
                        zi(2, "cms-contact-item", 29),
                        Fi(3, "button", 30),
                        Wi("click", function () {
                            De(t);
                            const n = e.index;
                            return Qi().onRemoveItem(n);
                        }),
                        oo(4, " X "),
                        Hi(),
                        Hi(),
                        Hi();
                }
                if (2 & t) {
                    const t = e.$implicit;
                    cs(2), Ui("contact", t);
                }
            }
            function Om(t, e) {
                1 & t &&
                    (Fi(0, "span", 31),
                    oo(1, "Drag contacts in group here"),
                    Hi());
            }
            function Am(t, e) {
                1 & t &&
                    (Fi(0, "div", 27),
                    oo(1, " The Name and Email fields are required. "),
                    Hi());
            }
            const Dm = function () {
                return ["contactGroup"];
            };
            let Im = (() => {
                    class t {
                        constructor(t, e, n) {
                            (this.contactService = t),
                                (this.router = e),
                                (this.route = n),
                                (this.contact = null),
                                (this.groupContacts = []),
                                (this.editMode = !1);
                        }
                        ngOnInit() {
                            this.route.params.subscribe((t) => {
                                (this.id = t.id),
                                    this.id
                                        ? this.contactService
                                              .getContact(this.id)
                                              .subscribe((t) => {
                                                  (this.originalContact =
                                                      t.contact),
                                                      this.originalContact &&
                                                          ((this.editMode = !0),
                                                          (this.contact =
                                                              JSON.parse(
                                                                  JSON.stringify(
                                                                      this
                                                                          .originalContact
                                                                  )
                                                              )),
                                                          this.contact.group &&
                                                              (this.groupContacts =
                                                                  this.contact.group.slice()));
                                              })
                                        : (this.editMode = !1);
                            });
                        }
                        onSubmit(t) {
                            const e = t.value,
                                n = new sm(
                                    e.id,
                                    "",
                                    e.name,
                                    e.email,
                                    e.phone,
                                    e.imageUrl,
                                    this.groupContacts
                                );
                            this.editMode
                                ? this.contactService.updateContact(
                                      this.originalContact,
                                      n
                                  )
                                : this.contactService.addContact(n),
                                n.id
                                    ? this.router.navigate(
                                          ["/contacts", n.id],
                                          { relativeTo: this.route }
                                      )
                                    : this.onCancel();
                        }
                        onCancel() {
                            this.router.navigate(["/contacts"]);
                        }
                        isInvalidContact(t) {
                            if (!t) return !0;
                            if (this.contact && t.id === this.contact.id)
                                return !0;
                            for (let e = 0; e < this.groupContacts.length; e++)
                                if (t.id === this.groupContacts[e].id)
                                    return !0;
                            return !1;
                        }
                        addToGroup(t) {
                            const e = t.dragData;
                            (this.invalidGroupContact =
                                this.isInvalidContact(e)),
                                this.invalidGroupContact ||
                                    (this.groupContacts.push(e),
                                    (this.invalidGroupContact = !1));
                        }
                        onRemoveItem(t) {
                            t < 0 ||
                                t >= this.groupContacts.length ||
                                this.groupContacts.splice(t, 1);
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)(Ni(Jg), Ni(Op), Ni(id));
                        }),
                        (t.ɵcmp = Nt({
                            type: t,
                            selectors: [["cms-contact-edit"]],
                            decls: 44,
                            vars: 12,
                            consts: [
                                [1, "panel", "panel-default"],
                                [1, "panel-body"],
                                ["id", "contact-edit", 3, "ngSubmit"],
                                ["f", "ngForm"],
                                [1, "row"],
                                [1, "col-sm-12", "form-group"],
                                ["for", "name"],
                                [
                                    "required",
                                    "",
                                    "type",
                                    "text",
                                    "id",
                                    "name",
                                    "name",
                                    "name",
                                    "size",
                                    "120",
                                    "max",
                                    "120",
                                    1,
                                    "form-control",
                                    3,
                                    "ngModel",
                                ],
                                ["name", "ngModel"],
                                ["for", "email"],
                                [
                                    "required",
                                    "",
                                    "type",
                                    "text",
                                    "id",
                                    "email",
                                    "name",
                                    "email",
                                    "size",
                                    "120",
                                    "max",
                                    "255",
                                    "pattern",
                                    "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$",
                                    1,
                                    "form-control",
                                    3,
                                    "ngModel",
                                ],
                                ["email", "ngModel"],
                                ["for", "phone"],
                                [
                                    "type",
                                    "text",
                                    "id",
                                    "phone",
                                    "name",
                                    "phone",
                                    "size",
                                    "150",
                                    "max",
                                    "255",
                                    "pattern",
                                    "\\D*([2-9]\\d{2})(\\D*)([2-9]\\d{2})(\\D*)(\\d{4})\\D*",
                                    1,
                                    "form-control",
                                    3,
                                    "ngModel",
                                ],
                                ["phone", "ngModel"],
                                ["class", "alert alert-danger", 4, "ngIf"],
                                ["for", "imageUrl"],
                                [
                                    "type",
                                    "text",
                                    "id",
                                    "imageUrl",
                                    "name",
                                    "imageUrl",
                                    "size",
                                    "150",
                                    "max",
                                    "255",
                                    1,
                                    "form-control",
                                    3,
                                    "ngModel",
                                ],
                                ["imageUrl", "ngModel"],
                                ["for", "groupList"],
                                [
                                    "id",
                                    "inGroup",
                                    "class",
                                    "alert alert-danger",
                                    4,
                                    "ngIf",
                                ],
                                [
                                    "id",
                                    "groupList",
                                    "dnd-droppable",
                                    "",
                                    1,
                                    "row",
                                    2,
                                    "min-height",
                                    "3rem",
                                    3,
                                    "dropZones",
                                    "onDropSuccess",
                                ],
                                [4, "ngFor", "ngForOf"],
                                ["class", "dragMsg", 4, "ngIf"],
                                [1, "col-xs-12", "btn-toolbar"],
                                [
                                    "type",
                                    "submit",
                                    1,
                                    "btn",
                                    "btn-success",
                                    3,
                                    "disabled",
                                ],
                                [
                                    "type",
                                    "button",
                                    1,
                                    "btn",
                                    "btn-primary",
                                    3,
                                    "click",
                                ],
                                [1, "alert", "alert-danger"],
                                ["id", "inGroup", 1, "alert", "alert-danger"],
                                [1, "col-sm-11", 3, "contact"],
                                [
                                    1,
                                    "btn",
                                    "btn-danger",
                                    "col-sm-2",
                                    "deleteButton",
                                    3,
                                    "click",
                                ],
                                [1, "dragMsg"],
                            ],
                            template: function (t, e) {
                                if (1 & t) {
                                    const t = $i();
                                    Fi(0, "div", 0),
                                        Fi(1, "div", 1),
                                        Fi(2, "form", 2, 3),
                                        Wi("ngSubmit", function () {
                                            De(t);
                                            const n = Mi(3);
                                            return e.onSubmit(n);
                                        }),
                                        Fi(4, "div", 4),
                                        Fi(5, "div", 5),
                                        Fi(6, "label", 6),
                                        oo(7, "Name:"),
                                        Hi(),
                                        zi(8, "input", 7, 8),
                                        Hi(),
                                        Hi(),
                                        Fi(10, "div", 4),
                                        Fi(11, "div", 5),
                                        Fi(12, "label", 9),
                                        oo(13, "Email:"),
                                        Hi(),
                                        zi(14, "input", 10, 11),
                                        Hi(),
                                        Hi(),
                                        Fi(16, "div", 4),
                                        Fi(17, "div", 5),
                                        Fi(18, "label", 12),
                                        oo(19, "Phone:"),
                                        Hi(),
                                        zi(20, "input", 13, 14),
                                        Hi(),
                                        Hi(),
                                        ji(22, Em, 2, 0, "div", 15),
                                        Fi(23, "div", 4),
                                        Fi(24, "div", 5),
                                        Fi(25, "label", 16),
                                        oo(26, "Image URL:"),
                                        Hi(),
                                        zi(27, "input", 17, 18),
                                        Hi(),
                                        Hi(),
                                        Fi(29, "div", 4),
                                        Fi(30, "div", 5),
                                        Fi(31, "label", 19),
                                        oo(32, "Group Contacts:"),
                                        Hi(),
                                        ji(33, Tm, 2, 0, "div", 20),
                                        Fi(34, "div", 21),
                                        Wi("onDropSuccess", function (t) {
                                            return e.addToGroup(t);
                                        }),
                                        ji(35, km, 5, 1, "div", 22),
                                        ji(36, Om, 2, 0, "span", 23),
                                        Hi(),
                                        Hi(),
                                        Hi(),
                                        ji(37, Am, 2, 0, "div", 15),
                                        Fi(38, "div", 4),
                                        Fi(39, "div", 24),
                                        Fi(40, "button", 25),
                                        oo(41, "Save"),
                                        Hi(),
                                        Fi(42, "button", 26),
                                        Wi("click", function () {
                                            return e.onCancel();
                                        }),
                                        oo(43, "Cancel"),
                                        Hi(),
                                        Hi(),
                                        Hi(),
                                        Hi(),
                                        Hi(),
                                        Hi();
                                }
                                if (2 & t) {
                                    const t = Mi(3),
                                        n = Mi(9),
                                        r = Mi(21);
                                    cs(8),
                                        Ui(
                                            "ngModel",
                                            null == e.contact
                                                ? null
                                                : e.contact.name
                                        ),
                                        cs(6),
                                        Ui(
                                            "ngModel",
                                            null == e.contact
                                                ? null
                                                : e.contact.email
                                        ),
                                        cs(6),
                                        Ui(
                                            "ngModel",
                                            null == e.contact
                                                ? null
                                                : e.contact.phone
                                        ),
                                        cs(2),
                                        Ui("ngIf", r.touched && r.invalid),
                                        cs(5),
                                        Ui(
                                            "ngModel",
                                            null == e.contact
                                                ? null
                                                : e.contact.imageUrl
                                        ),
                                        cs(6),
                                        Ui(
                                            "ngIf",
                                            !0 === e.invalidGroupContact
                                        ),
                                        cs(1),
                                        Ui("dropZones", Aa(11, Dm)),
                                        cs(1),
                                        Ui("ngForOf", e.groupContacts),
                                        cs(1),
                                        Ui(
                                            "ngIf",
                                            (null == e.groupContacts
                                                ? null
                                                : e.groupContacts.length) < 1
                                        ),
                                        cs(1),
                                        Ui("ngIf", n.touched && n.invalid),
                                        cs(3),
                                        Ui("disabled", !t.valid);
                                }
                            },
                            directives: [
                                dg,
                                Af,
                                lg,
                                lf,
                                fg,
                                Of,
                                hg,
                                mg,
                                Ec,
                                vm,
                                Sc,
                                xm,
                            ],
                            styles: [
                                "input.ng-invalid.ng-touched[_ngcontent-%COMP%]{border:1px solid red}.pad-left-right[_ngcontent-%COMP%]{padding-left:.1rem}.deleteButton[_ngcontent-%COMP%]{margin-left:-1.2rem;width:3.4rem}.buttonDiv[_ngcontent-%COMP%], .deleteButton[_ngcontent-%COMP%]{margin-top:1.5rem}.groupDiv[_ngcontent-%COMP%]{min-height:6rem;border:thin solid #d3d3d3}.dragMsg[_ngcontent-%COMP%]{font-size:2rem;color:#a9a9a9;margin-left:3rem}",
                            ],
                        })),
                        t
                    );
                })(),
                Rm = (() => {
                    class t {
                        transform(t, e) {
                            let n = [];
                            return (
                                e &&
                                    e.length > 0 &&
                                    (n = t.filter((t) =>
                                        t.name.toLowerCase().includes(e)
                                    )),
                                n.length < 1 ? t : n
                            );
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)();
                        }),
                        (t.ɵpipe = {
                            type: (e = {
                                name: "contactsFilter",
                                type: t,
                                pure: !0,
                            }).type,
                            name: e.name,
                            factory: null,
                            pure: !1 !== e.pure,
                            onDestroy: e.type.prototype.ngOnDestroy || null,
                        }),
                        t
                    );
                    var e;
                })();
            const Pm = function () {
                return ["contactGroup"];
            };
            function Vm(t, e) {
                if ((1 & t && zi(0, "cms-contact-item", 13), 2 & t)) {
                    const t = e.$implicit;
                    Ui("contact", t)("dragEnabled", !0)("dragData", t)(
                        "dropZones",
                        Aa(4, Pm)
                    );
                }
            }
            const jm = function () {
                    return ["new"];
                },
                Mm = function (t) {
                    return [t];
                };
            let Nm = (() => {
                    class t {
                        constructor(t) {
                            (this.contactService = t), (this.contacts = []);
                        }
                        ngOnInit() {
                            this.contactService.getContacts(),
                                (this.subscription =
                                    this.contactService.contactListChanged.subscribe(
                                        (t) => {
                                            (this.contacts = t),
                                                this.contacts.sort((t, e) =>
                                                    t.id < e.id
                                                        ? -1
                                                        : t.id > e.id
                                                        ? 1
                                                        : 0
                                                );
                                        }
                                    ));
                        }
                        search(t) {
                            this.term = t;
                        }
                        ngOnDestroy() {
                            this.subscription.unsubscribe();
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)(Ni(Jg));
                        }),
                        (t.ɵcmp = Nt({
                            type: t,
                            selectors: [["cms-contact-list"]],
                            decls: 20,
                            vars: 8,
                            consts: [
                                [1, "row"],
                                [1, "col-xs-12"],
                                [1, "panel", "panel-default"],
                                [1, "panel-heading"],
                                [1, "title", "pad-left-right"],
                                [
                                    1,
                                    "input-group",
                                    "pull-left",
                                    "pad-left-right",
                                    "col-xs-7",
                                ],
                                [
                                    "type",
                                    "text",
                                    "placeholder",
                                    "Enter a search value",
                                    1,
                                    "form-control",
                                    3,
                                    "keyup",
                                ],
                                ["searchBox", ""],
                                [
                                    1,
                                    "glyphicon",
                                    "glyphicon-search",
                                    "input-group-addon",
                                    3,
                                    "click",
                                ],
                                [1, "pull-right", "pad-left-right"],
                                [1, "btn", "btn-success", 3, "routerLink"],
                                [1, "panel-body"],
                                [
                                    "dnd-draggable",
                                    "",
                                    3,
                                    "contact",
                                    "dragEnabled",
                                    "dragData",
                                    "dropZones",
                                    4,
                                    "ngFor",
                                    "ngForOf",
                                ],
                                [
                                    "dnd-draggable",
                                    "",
                                    3,
                                    "contact",
                                    "dragEnabled",
                                    "dragData",
                                    "dropZones",
                                ],
                            ],
                            template: function (t, e) {
                                if (1 & t) {
                                    const t = $i();
                                    Fi(0, "div", 0),
                                        Fi(1, "div", 1),
                                        Fi(2, "div", 2),
                                        Fi(3, "div", 3),
                                        Fi(4, "div", 0),
                                        Fi(5, "span", 4),
                                        oo(6, "Contacts"),
                                        Hi(),
                                        Hi(),
                                        Fi(7, "div", 0),
                                        Fi(8, "div", 5),
                                        Fi(9, "input", 6, 7),
                                        Wi("keyup", function () {
                                            De(t);
                                            const n = Mi(10);
                                            return e.search(n.value);
                                        }),
                                        Hi(),
                                        Fi(11, "div", 8),
                                        Wi("click", function () {
                                            De(t);
                                            const n = Mi(10);
                                            return e.search(n.value);
                                        }),
                                        Hi(),
                                        Hi(),
                                        Fi(12, "div", 9),
                                        Fi(13, "a", 10),
                                        oo(14, "New Contact"),
                                        Hi(),
                                        Hi(),
                                        Hi(),
                                        Hi(),
                                        Fi(15, "div", 11),
                                        Fi(16, "div", 0),
                                        Fi(17, "div", 1),
                                        ji(
                                            18,
                                            Vm,
                                            1,
                                            5,
                                            "cms-contact-item",
                                            12
                                        ),
                                        (function (t, e) {
                                            const n = Ae();
                                            let r;
                                            n.firstCreatePass
                                                ? ((r = (function (t, e) {
                                                      if (e)
                                                          for (
                                                              let n =
                                                                  e.length - 1;
                                                              n >= 0;
                                                              n--
                                                          ) {
                                                              const r = e[n];
                                                              if (t === r.name)
                                                                  return r;
                                                          }
                                                      throw new ee(
                                                          "302",
                                                          `The pipe '${t}' could not be found!`
                                                      );
                                                  })(
                                                      "contactsFilter",
                                                      n.pipeRegistry
                                                  )),
                                                  (n.data[39] = r),
                                                  r.onDestroy &&
                                                      (
                                                          n.destroyHooks ||
                                                          (n.destroyHooks = [])
                                                      ).push(39, r.onDestroy))
                                                : (r = n.data[39]);
                                            const s =
                                                    r.factory ||
                                                    (r.factory = te(r.type)),
                                                i = yt(Ni);
                                            try {
                                                const t = vn(!1),
                                                    e = s();
                                                vn(t),
                                                    (function (t, e, n, r) {
                                                        39 >= t.data.length &&
                                                            ((t.data[39] =
                                                                null),
                                                            (t.blueprint[39] =
                                                                null)),
                                                            (e[39] = r);
                                                    })(n, Oe(), 0, e);
                                            } finally {
                                                yt(i);
                                            }
                                        })(),
                                        Hi(),
                                        Hi(),
                                        Hi(),
                                        Hi(),
                                        Hi(),
                                        Hi();
                                }
                                2 & t &&
                                    (cs(13),
                                    Ui("routerLink", Aa(5, jm)),
                                    cs(5),
                                    Ui(
                                        "ngForOf",
                                        Ra(19, 2, e.contacts, Da(6, Mm, e.term))
                                    ));
                            },
                            directives: [Dp, Sc, xm, gm],
                            pipes: [Rm],
                            styles: [
                                ".title[_ngcontent-%COMP%]{font-size:2.5rem;font-weight:700}.pad-left-right[_ngcontent-%COMP%]{padding-left:1rem;padding-right:1rem}",
                            ],
                        })),
                        t
                    );
                })(),
                Um = (() => {
                    class t {
                        constructor(t) {
                            this.contactService = t;
                        }
                        ngOnInit() {
                            this.contactService.contactSelectedEvent.subscribe(
                                (t) => {
                                    this.selectedContact = t;
                                }
                            );
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)(Ni(Jg));
                        }),
                        (t.ɵcmp = Nt({
                            type: t,
                            selectors: [["cms-contacts"]],
                            decls: 5,
                            vars: 0,
                            consts: [
                                [1, "row"],
                                [1, "col-md-5"],
                                [1, "col-md-4"],
                            ],
                            template: function (t, e) {
                                1 & t &&
                                    (Fi(0, "div", 0),
                                    Fi(1, "div", 1),
                                    zi(2, "cms-contact-list"),
                                    Hi(),
                                    Fi(3, "div", 2),
                                    zi(4, "router-outlet"),
                                    Hi(),
                                    Hi());
                            },
                            directives: [Nm, Pp],
                            styles: [""],
                        })),
                        t
                    );
                })(),
                Lm = (() => {
                    class t {
                        constructor() {}
                        getNativeWindow() {
                            return window;
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)();
                        }),
                        (t.ɵprov = ot({
                            token: t,
                            factory: t.ɵfac,
                            providedIn: "root",
                        })),
                        t
                    );
                })(),
                Fm = (() => {
                    class t {
                        constructor(t) {
                            (this.http = t),
                                (this.documentSelectedEvent = new Pa()),
                                (this.documentChangedEvent = new Pa()),
                                (this.documentListChangedEvent = new S()),
                                (this.documents = []),
                                this.getDocuments();
                        }
                        getMaxId() {
                            let t = 0;
                            return (
                                this.documents.forEach((e) => {
                                    let n = +e.id;
                                    n > t && (t = n);
                                }),
                                t
                            );
                        }
                        getDocuments() {
                            this.http
                                .get("http://localhost:3000/documents")
                                .subscribe(
                                    (t) => {
                                        (this.documents = t.documents),
                                            this.sortAndSend();
                                    },
                                    (t) => {
                                        console.log(t);
                                    }
                                );
                        }
                        getDocument(t) {
                            return this.http.get(
                                "http://localhost:3000/documents/" + t
                            );
                        }
                        addDocument(t) {
                            if (!t) return;
                            t.id = "";
                            const e = new wg({
                                "Content-Type": "application/json",
                            });
                            this.http
                                .post("http://localhost:3000/documents", t, {
                                    headers: e,
                                })
                                .subscribe((t) => {
                                    this.documents.push(t.document),
                                        this.sortAndSend();
                                });
                        }
                        updateDocument(t, e) {
                            if (!t || !e) return;
                            const n = this.documents.findIndex(
                                (e) => e.id === t.id
                            );
                            if (n < 0) return;
                            e.id = t.id;
                            const r = new wg({
                                "Content-Type": "application/json",
                            });
                            this.http
                                .put(
                                    "http://localhost:3000/documents/" + t.id,
                                    e,
                                    { headers: r }
                                )
                                .subscribe((t) => {
                                    (this.documents[n] = e), this.sortAndSend();
                                });
                        }
                        deleteDocument(t) {
                            if (!t) return;
                            const e = this.documents.findIndex(
                                (e) => e.id === t.id
                            );
                            e < 0 ||
                                this.http
                                    .delete(
                                        "http://localhost:3000/documents/" +
                                            t.id
                                    )
                                    .subscribe((t) => {
                                        this.documents.splice(e, 1),
                                            this.sortAndSend();
                                    });
                        }
                        sortAndSend() {
                            this.documents.sort((t, e) =>
                                t.name > e.name ? 1 : e.name > t.name ? -1 : 0
                            ),
                                this.documentListChangedEvent.next(
                                    this.documents.slice()
                                );
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)(dr(jg));
                        }),
                        (t.ɵprov = ot({
                            token: t,
                            factory: t.ɵfac,
                            providedIn: "root",
                        })),
                        t
                    );
                })();
            const Hm = function () {
                return ["edit"];
            };
            let zm = (() => {
                class t {
                    constructor(t, e, n, r) {
                        (this.windRefServ = t),
                            (this.docService = e),
                            (this.router = n),
                            (this.activRoute = r),
                            (this.nativeWindow = t.getNativeWindow());
                    }
                    ngOnInit() {
                        this.activRoute.params.subscribe((t) => {
                            (this.id = t.id),
                                this.docService
                                    .getDocument(this.id)
                                    .subscribe((t) => {
                                        this.document = t.document;
                                    });
                        });
                    }
                    onView() {
                        this.document.url &&
                            this.nativeWindow.open(this.document.url);
                    }
                    onDelete() {
                        this.docService.deleteDocument(this.document),
                            this.router.navigate(["/documents"]);
                    }
                }
                return (
                    (t.ɵfac = function (e) {
                        return new (e || t)(Ni(Lm), Ni(Fm), Ni(Op), Ni(id));
                    }),
                    (t.ɵcmp = Nt({
                        type: t,
                        selectors: [["cms-document-detail"]],
                        decls: 25,
                        vars: 5,
                        consts: [
                            [
                                "xmlns",
                                "http://www.w3.org/1999/html",
                                1,
                                "panel",
                                "panel-default",
                            ],
                            [1, "panel-heading"],
                            [1, "row", "pad-all"],
                            [1, "title", "margin-left-right"],
                            [1, "row", "pull-right", "margin-left-right"],
                            [1, "btn", "btn-primary", 3, "click"],
                            [1, "btn", "btn-info", 3, "routerLink"],
                            [1, "btn", "btn-danger", 3, "click"],
                            [1, "panel-body"],
                            [1, "pad-left-right"],
                            [1, "row"],
                            [1, "label-value"],
                        ],
                        template: function (t, e) {
                            1 & t &&
                                (Fi(0, "div", 0),
                                Fi(1, "div", 1),
                                Fi(2, "div", 2),
                                Fi(3, "h4", 3),
                                oo(4),
                                Hi(),
                                Fi(5, "div", 4),
                                Fi(6, "a", 5),
                                Wi("click", function () {
                                    return e.onView();
                                }),
                                oo(7, "View"),
                                Hi(),
                                Fi(8, "a", 6),
                                oo(9, "Edit"),
                                Hi(),
                                Fi(10, "a", 7),
                                Wi("click", function () {
                                    return e.onDelete();
                                }),
                                oo(11, "Delete"),
                                Hi(),
                                Hi(),
                                Hi(),
                                Hi(),
                                Fi(12, "div", 8),
                                Fi(13, "div", 9),
                                Fi(14, "div", 10),
                                Fi(15, "label"),
                                oo(16, "Description: "),
                                Hi(),
                                Fi(17, "span", 11),
                                oo(18),
                                Hi(),
                                Hi(),
                                zi(19, "br"),
                                Fi(20, "div", 10),
                                Fi(21, "label"),
                                oo(22, "URL: "),
                                Hi(),
                                Fi(23, "span", 11),
                                oo(24),
                                Hi(),
                                Hi(),
                                Hi(),
                                Hi(),
                                Hi()),
                                2 & t &&
                                    (cs(4),
                                    ao(
                                        null == e.document
                                            ? null
                                            : e.document.name
                                    ),
                                    cs(4),
                                    Ui("routerLink", Aa(4, Hm)),
                                    cs(10),
                                    ao(
                                        null == e.document
                                            ? null
                                            : e.document.description
                                    ),
                                    cs(6),
                                    ao(
                                        null == e.document
                                            ? null
                                            : e.document.url
                                    ));
                        },
                        directives: [Dp],
                        styles: [
                            ".title[_ngcontent-%COMP%]{font-weight:700;padding-left:1rem;padding-right:1rem}.margin-left-right[_ngcontent-%COMP%], .pad-left-right[_ngcontent-%COMP%]{margin-left:1rem;margin-right:1rem}.btn[_ngcontent-%COMP%]{margin:2px}.label-value[_ngcontent-%COMP%]{margin-left:5px}",
                        ],
                    })),
                    t
                );
            })();
            class $m {
                constructor(t, e, n, r, s, i) {
                    (this.id = t),
                        (this._id = e),
                        (this.name = n),
                        (this.description = r),
                        (this.url = s),
                        (this.children = i);
                }
            }
            function qm(t, e) {
                1 & t &&
                    (Fi(0, "div", 18),
                    oo(
                        1,
                        " The Document Title and Document URL are required fields. "
                    ),
                    Hi());
            }
            let Bm = (() => {
                class t {
                    constructor(t, e, n) {
                        (this.documentService = t),
                            (this.router = e),
                            (this.route = n),
                            (this.editMode = !1);
                    }
                    ngOnInit() {
                        this.route.params.subscribe((t) => {
                            (this.id = t.id),
                                this.id
                                    ? this.documentService
                                          .getDocument(this.id)
                                          .subscribe((t) => {
                                              (this.originalDocument =
                                                  t.document),
                                                  this.originalDocument &&
                                                      ((this.editMode = !0),
                                                      (this.document =
                                                          JSON.parse(
                                                              JSON.stringify(
                                                                  this
                                                                      .originalDocument
                                                              )
                                                          )));
                                          })
                                    : (this.editMode = !1);
                        });
                    }
                    onSubmit(t) {
                        const e = t.value,
                            n = new $m(
                                e.id,
                                "",
                                e.title,
                                e.description,
                                e.url,
                                e.children
                            );
                        this.editMode
                            ? this.documentService.updateDocument(
                                  this.originalDocument,
                                  n
                              )
                            : this.documentService.addDocument(n),
                            n.id
                                ? this.router.navigate(["/documents", n.id], {
                                      relativeTo: this.route,
                                  })
                                : this.onCancel();
                    }
                    onCancel() {
                        this.router.navigate(["/documents"]);
                    }
                }
                return (
                    (t.ɵfac = function (e) {
                        return new (e || t)(Ni(Fm), Ni(Op), Ni(id));
                    }),
                    (t.ɵcmp = Nt({
                        type: t,
                        selectors: [["cms-document-edit"]],
                        decls: 28,
                        vars: 5,
                        consts: [
                            [1, "panel", "panel-default"],
                            [1, "panel-body"],
                            ["id", "document-edit", 3, "ngSubmit"],
                            ["f", "ngForm"],
                            [1, "row"],
                            [1, "col-sm-12", "form-group"],
                            ["for", "name"],
                            [
                                "required",
                                "",
                                "type",
                                "text",
                                "id",
                                "name",
                                "name",
                                "title",
                                "size",
                                "120",
                                "max",
                                "120",
                                1,
                                "form-control",
                                3,
                                "ngModel",
                            ],
                            ["name", "ngModel"],
                            ["for", "description"],
                            [
                                "type",
                                "text",
                                "id",
                                "description",
                                "name",
                                "description",
                                "size",
                                "120",
                                "max",
                                "255",
                                1,
                                "form-control",
                                3,
                                "ngModel",
                            ],
                            ["for", "url"],
                            [
                                "required",
                                "",
                                "type",
                                "text",
                                "id",
                                "url",
                                "name",
                                "url",
                                "size",
                                "150",
                                "max",
                                "255",
                                1,
                                "form-control",
                                3,
                                "ngModel",
                            ],
                            ["url", "ngModel"],
                            [
                                "id",
                                "alert",
                                "class",
                                "alert alert-danger",
                                4,
                                "ngIf",
                            ],
                            [1, "col-xs-12", "btn-toolbar"],
                            [
                                "type",
                                "submit",
                                1,
                                "btn",
                                "btn-success",
                                3,
                                "disabled",
                            ],
                            [
                                "type",
                                "button",
                                1,
                                "btn",
                                "btn-primary",
                                3,
                                "click",
                            ],
                            ["id", "alert", 1, "alert", "alert-danger"],
                        ],
                        template: function (t, e) {
                            if (1 & t) {
                                const t = $i();
                                Fi(0, "div", 0),
                                    Fi(1, "div", 1),
                                    Fi(2, "form", 2, 3),
                                    Wi("ngSubmit", function () {
                                        De(t);
                                        const n = Mi(3);
                                        return e.onSubmit(n);
                                    }),
                                    Fi(4, "div", 4),
                                    Fi(5, "div", 5),
                                    Fi(6, "label", 6),
                                    oo(7, "Document Title:"),
                                    Hi(),
                                    zi(8, "input", 7, 8),
                                    Hi(),
                                    Hi(),
                                    Fi(10, "div", 4),
                                    Fi(11, "div", 5),
                                    Fi(12, "label", 9),
                                    oo(13, "Document Description:"),
                                    Hi(),
                                    zi(14, "input", 10),
                                    Hi(),
                                    Hi(),
                                    Fi(15, "div", 4),
                                    Fi(16, "div", 5),
                                    Fi(17, "label", 11),
                                    oo(18, "Document URL:"),
                                    Hi(),
                                    zi(19, "input", 12, 13),
                                    ji(21, qm, 2, 0, "div", 14),
                                    Hi(),
                                    Hi(),
                                    Fi(22, "div", 4),
                                    Fi(23, "div", 15),
                                    Fi(24, "button", 16),
                                    oo(25, "Save"),
                                    Hi(),
                                    Fi(26, "button", 17),
                                    Wi("click", function () {
                                        return e.onCancel();
                                    }),
                                    oo(27, "Cancel"),
                                    Hi(),
                                    Hi(),
                                    Hi(),
                                    Hi(),
                                    Hi(),
                                    Hi();
                            }
                            if (2 & t) {
                                const t = Mi(3),
                                    n = Mi(9),
                                    r = Mi(20);
                                cs(8),
                                    Ui(
                                        "ngModel",
                                        null == e.document
                                            ? null
                                            : e.document.name
                                    ),
                                    cs(6),
                                    Ui(
                                        "ngModel",
                                        null == e.document
                                            ? null
                                            : e.document.description
                                    ),
                                    cs(5),
                                    Ui(
                                        "ngModel",
                                        null == e.document
                                            ? null
                                            : e.document.url
                                    ),
                                    cs(2),
                                    Ui(
                                        "ngIf",
                                        (n.touched && n.invalid) ||
                                            (r.touched && r.invalid)
                                    ),
                                    cs(3),
                                    Ui("disabled", !t.valid);
                            }
                        },
                        directives: [dg, Af, lg, lf, fg, Of, hg, Ec],
                        styles: [
                            "input.ng-invalid.ng-touched[_ngcontent-%COMP%]{border:1px solid red}#alert[_ngcontent-%COMP%]{margin-top:20px}",
                        ],
                    })),
                    t
                );
            })();
            const Wm = function (t) {
                return [t];
            };
            let Zm = (() => {
                class t {
                    constructor(t) {
                        this.documentService = t;
                    }
                    ngOnInit() {
                        this.documentService.documentSelectedEvent.emit(
                            this.document
                        );
                    }
                }
                return (
                    (t.ɵfac = function (e) {
                        return new (e || t)(Ni(Fm));
                    }),
                    (t.ɵcmp = Nt({
                        type: t,
                        selectors: [["cms-document-item"]],
                        inputs: { document: "document" },
                        decls: 6,
                        vars: 4,
                        consts: [
                            [
                                "routerLinkActive",
                                "active",
                                1,
                                "list-group-item",
                                "clearfix",
                                "documentDiv",
                                3,
                                "routerLink",
                            ],
                        ],
                        template: function (t, e) {
                            1 & t &&
                                (Fi(0, "html"),
                                zi(1, "head"),
                                Fi(2, "body"),
                                Fi(3, "a", 0),
                                Fi(4, "p"),
                                oo(5),
                                Hi(),
                                Hi(),
                                Hi(),
                                Hi()),
                                2 & t &&
                                    (cs(3),
                                    Ui(
                                        "routerLink",
                                        Da(
                                            2,
                                            Wm,
                                            null == e.document
                                                ? null
                                                : e.document.id
                                        )
                                    ),
                                    cs(2),
                                    ao(
                                        null == e.document
                                            ? null
                                            : e.document.name
                                    ));
                        },
                        directives: [Dp, Rp],
                        styles: [
                            ".documentDiv[_ngcontent-%COMP%]{width:9rem;height:11rem;margin:2px;font-size:1.3rem;border:thin solid #a9a9a9;float:left;padding:.25rem}",
                        ],
                    })),
                    t
                );
            })();
            function Gm(t, e) {
                1 & t && zi(0, "cms-document-item", 8),
                    2 & t && Ui("document", e.$implicit);
            }
            let Qm = (() => {
                    class t {
                        constructor(t) {
                            (this.documentService = t), (this.documents = []);
                        }
                        ngOnInit() {
                            this.documentService.getDocuments(),
                                (this.subscription =
                                    this.documentService.documentListChangedEvent.subscribe(
                                        (t) => {
                                            this.documents = t;
                                        }
                                    ));
                        }
                        ngOnDestroy() {
                            this.subscription.unsubscribe();
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)(Ni(Fm));
                        }),
                        (t.ɵcmp = Nt({
                            type: t,
                            selectors: [["cms-document-list"]],
                            decls: 10,
                            vars: 1,
                            consts: [
                                [1, "panel", "panel-default"],
                                [1, "panel-heading"],
                                [1, "row", "pad-left-right"],
                                [1, "pull-left", "title"],
                                [
                                    "routerLink",
                                    "new",
                                    1,
                                    "btn",
                                    "btn-success",
                                    "pull-right",
                                ],
                                [1, "panel-body"],
                                [1, "center-panel"],
                                [3, "document", 4, "ngFor", "ngForOf"],
                                [3, "document"],
                            ],
                            template: function (t, e) {
                                1 & t &&
                                    (Fi(0, "div", 0),
                                    Fi(1, "div", 1),
                                    Fi(2, "div", 2),
                                    Fi(3, "span", 3),
                                    oo(4, "Documents"),
                                    Hi(),
                                    Fi(5, "a", 4),
                                    oo(6, "Add Document"),
                                    Hi(),
                                    Hi(),
                                    Hi(),
                                    Fi(7, "div", 5),
                                    Fi(8, "div", 6),
                                    ji(9, Gm, 1, 1, "cms-document-item", 7),
                                    Hi(),
                                    Hi(),
                                    Hi()),
                                    2 & t &&
                                        (cs(9), Ui("ngForOf", e.documents));
                            },
                            directives: [Dp, Sc, Zm],
                            styles: [
                                ".center-panel[_ngcontent-%COMP%]{margin-left:auto;margin-right:auto;width:38rem}.title[_ngcontent-%COMP%]{font-size:2.5rem;font-weight:700}.pad-left-right[_ngcontent-%COMP%]{padding-left:1rem;padding-right:1rem}",
                            ],
                        })),
                        t
                    );
                })(),
                Km = (() => {
                    class t {
                        constructor(t) {
                            this.documentService = t;
                        }
                        ngOnInit() {
                            this.documentService.documentSelectedEvent.subscribe(
                                (t) => {
                                    this.selectedDocument = t;
                                }
                            );
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)(Ni(Fm));
                        }),
                        (t.ɵcmp = Nt({
                            type: t,
                            selectors: [["cms-documents"]],
                            decls: 5,
                            vars: 0,
                            consts: [
                                [1, "row"],
                                [1, "col-md-5"],
                                [2, "cursor", "pointer"],
                            ],
                            template: function (t, e) {
                                1 & t &&
                                    (Fi(0, "div", 0),
                                    Fi(1, "div", 1),
                                    zi(2, "cms-document-list", 2),
                                    Hi(),
                                    Fi(3, "div", 1),
                                    zi(4, "router-outlet"),
                                    Hi(),
                                    Hi());
                            },
                            directives: [Qm, Pp],
                            styles: [""],
                        })),
                        t
                    );
                })(),
                Jm = (() => {
                    class t {
                        constructor(t) {
                            (this.http = t),
                                (this.messageChangedEvent = new Pa()),
                                (this.messages = []),
                                this.getMessages();
                        }
                        getMaxId() {
                            let t = 0;
                            return (
                                this.messages.forEach((e) => {
                                    let n = +e.id;
                                    n > t && (t = n);
                                }),
                                t
                            );
                        }
                        getMessages() {
                            this.http
                                .get("http://localhost:3000/messages")
                                .subscribe(
                                    (t) => {
                                        (this.messages = t.messages),
                                            this.sortAndSend();
                                    },
                                    (t) => {
                                        console.log(t);
                                    }
                                );
                        }
                        getMessage(t) {
                            return this.http.get(
                                "http://localhost:3000/messages/" + t
                            );
                        }
                        addMessage(t) {
                            if (!t) return;
                            t.id = "";
                            const e = new wg({
                                "Content-Type": "application/json",
                            });
                            this.http
                                .post("http://localhost:3000/messages", t, {
                                    headers: e,
                                })
                                .subscribe((t) => {
                                    this.messages.push(t.message),
                                        this.sortAndSend();
                                });
                        }
                        sortAndSend() {
                            this.messages.sort((t, e) =>
                                t.id > e.id ? 1 : e.id > t.id ? -1 : 0
                            ),
                                this.messageChangedEvent.next(
                                    this.messages.slice()
                                );
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)(dr(jg));
                        }),
                        (t.ɵprov = ot({
                            token: t,
                            factory: t.ɵfac,
                            providedIn: "root",
                        })),
                        t
                    );
                })();
            class Ym {
                constructor(t, e, n, r, s) {
                    (this.id = t),
                        (this._id = e),
                        (this.subject = n),
                        (this.msgText = r),
                        (this.sender = s);
                }
            }
            const Xm = ["subject"],
                ty = ["msgText"];
            let ey = (() => {
                    class t {
                        constructor(t, e) {
                            (this.messageService = t),
                                (this.contactService = e);
                        }
                        ngOnInit() {
                            this.contactService
                                .getContact("101")
                                .subscribe((t) => {
                                    this.currentSender = t.contact;
                                });
                        }
                        onSendMessage() {
                            const t = new Ym(
                                "",
                                "",
                                this.subjectInputRef.nativeElement.value,
                                this.msgTextInputRef.nativeElement.value,
                                this.currentSender
                            );
                            this.messageService.addMessage(t),
                                this.onClear(),
                                this.messageService.getMessages();
                        }
                        onClear() {
                            (this.subjectInputRef.nativeElement.value = ""),
                                (this.msgTextInputRef.nativeElement.value = "");
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)(Ni(Jm), Ni(Jg));
                        }),
                        (t.ɵcmp = Nt({
                            type: t,
                            selectors: [["cms-message-edit"]],
                            viewQuery: function (t, e) {
                                if (
                                    (1 & t && (Wa(Xm, !0), Wa(ty, !0)), 2 & t)
                                ) {
                                    let t;
                                    Ba((t = Ga())) &&
                                        (e.subjectInputRef = t.first),
                                        Ba((t = Ga())) &&
                                            (e.msgTextInputRef = t.first);
                                }
                            },
                            decls: 20,
                            vars: 0,
                            consts: [
                                [1, "panel", "panel-default"],
                                [1, "panel-body"],
                                ["id", "document-edit"],
                                [1, "row"],
                                [1, "col-sm-12", "form-group"],
                                ["for", "subject"],
                                [
                                    "type",
                                    "text",
                                    "id",
                                    "subject",
                                    "size",
                                    "120",
                                    "max",
                                    "120",
                                    1,
                                    "form-control",
                                ],
                                ["subject", ""],
                                ["for", "message"],
                                [
                                    "type",
                                    "text",
                                    "id",
                                    "message",
                                    "max",
                                    "255",
                                    "size",
                                    "120",
                                    1,
                                    "form-control",
                                ],
                                ["msgText", ""],
                                [1, "col-xs-12"],
                                [
                                    "type",
                                    "submit",
                                    1,
                                    "btn",
                                    "btn-success",
                                    3,
                                    "click",
                                ],
                                [
                                    "type",
                                    "button",
                                    1,
                                    "btn",
                                    "btn-danger",
                                    3,
                                    "click",
                                ],
                            ],
                            template: function (t, e) {
                                1 & t &&
                                    (Fi(0, "div", 0),
                                    Fi(1, "div", 1),
                                    Fi(2, "form", 2),
                                    Fi(3, "div", 3),
                                    Fi(4, "div", 4),
                                    Fi(5, "label", 5),
                                    oo(6, "Subject"),
                                    Hi(),
                                    zi(7, "input", 6, 7),
                                    Hi(),
                                    Fi(9, "div", 4),
                                    Fi(10, "label", 8),
                                    oo(11, "Message"),
                                    Hi(),
                                    zi(12, "input", 9, 10),
                                    Hi(),
                                    Hi(),
                                    Fi(14, "div", 3),
                                    Fi(15, "div", 11),
                                    Fi(16, "button", 12),
                                    Wi("click", function () {
                                        return e.onSendMessage();
                                    }),
                                    oo(17, "Send"),
                                    Hi(),
                                    Fi(18, "button", 13),
                                    Wi("click", function () {
                                        return e.onClear();
                                    }),
                                    oo(19, "Clear"),
                                    Hi(),
                                    Hi(),
                                    Hi(),
                                    Hi(),
                                    Hi(),
                                    Hi());
                            },
                            directives: [dg, Af, lg],
                            styles: [".btn[_ngcontent-%COMP%]{margin:2px}"],
                        })),
                        t
                    );
                })(),
                ny = (() => {
                    class t {
                        constructor(t) {
                            this.contactService = t;
                        }
                        ngOnInit() {
                            this.contactService
                                .getContact(this.message.sender.id)
                                .subscribe((t) => {
                                    this.messageSender = t.contact.name;
                                });
                        }
                    }
                    return (
                        (t.ɵfac = function (e) {
                            return new (e || t)(Ni(Jg));
                        }),
                        (t.ɵcmp = Nt({
                            type: t,
                            selectors: [["cms-message-item"]],
                            inputs: { message: "message" },
                            decls: 6,
                            vars: 2,
                            consts: [
                                [1, "list-group-item", "clearfix"],
                                [1, "messageHeader"],
                                [1, "messageText"],
                            ],
                            template: function (t, e) {
                                1 & t &&
                                    (Fi(0, "a", 0),
                                    Fi(1, "div"),
                                    Fi(2, "span", 1),
                                    oo(3),
                                    Hi(),
                                    Fi(4, "div", 2),
                                    oo(5),
                                    Hi(),
                                    Hi(),
                                    Hi()),
                                    2 & t &&
                                        (cs(3),
                                        ao(e.messageSender),
                                        cs(2),
                                        ao(
                                            null == e.message
                                                ? null
                                                : e.message.msgText
                                        ));
                            },
                            styles: [
                                ".messageHeader[_ngcontent-%COMP%]{background-color:azure;border:thin solid #000;border-radius:10px;padding:.4rem;font-size:1.5rem}.messageText[_ngcontent-%COMP%]{border-radius:10px;padding:5px;margin-top:.25rem;margin-left:1rem;font-size:1.5rem}",
                            ],
                        })),
                        t
                    );
                })();
            function ry(t, e) {
                if (1 & t) {
                    const t = $i();
                    Fi(0, "cms-message-item", 11),
                        Wi("onLoad", function () {
                            return De(t), Qi().onAddMessage();
                        }),
                        Hi();
                }
                2 & t && Ui("message", e.$implicit);
            }
            const sy = [
                { path: "", redirectTo: "/documents", pathMatch: "full" },
                {
                    path: "documents",
                    component: Km,
                    children: [
                        { path: "new", component: Bm },
                        { path: ":id", component: zm },
                        { path: ":id/edit", component: Bm },
                    ],
                },
                {
                    path: "messages",
                    component: (() => {
                        class t {
                            constructor(t) {
                                (this.messageService = t), (this.messages = []);
                            }
                            ngOnInit() {
                                (this.subscription =
                                    this.messageService.messageChangedEvent.subscribe(
                                        (t) => {
                                            this.messages = t;
                                        }
                                    )),
                                    this.messageService.getMessages();
                            }
                            onAddMessage(t) {
                                this.messages.push(t);
                            }
                            ngOnDestroy() {}
                        }
                        return (
                            (t.ɵfac = function (e) {
                                return new (e || t)(Ni(Jm));
                            }),
                            (t.ɵcmp = Nt({
                                type: t,
                                selectors: [["cms-message-list"]],
                                decls: 13,
                                vars: 1,
                                consts: [
                                    [1, "row"],
                                    [1, "col-md-5"],
                                    [1, "panel", "panel-default"],
                                    [1, "panel-heading"],
                                    [1, "row", "pad-left-right"],
                                    [1, "title", "pull-left"],
                                    [1, "panel-body"],
                                    [1, "col-xs-12"],
                                    [
                                        3,
                                        "message",
                                        "onLoad",
                                        4,
                                        "ngFor",
                                        "ngForOf",
                                    ],
                                    [1, "panel-footer"],
                                    [3, "addMessageEvent"],
                                    [3, "message", "onLoad"],
                                ],
                                template: function (t, e) {
                                    1 & t &&
                                        (Fi(0, "div", 0),
                                        Fi(1, "div", 1),
                                        Fi(2, "div", 2),
                                        Fi(3, "div", 3),
                                        Fi(4, "div", 4),
                                        Fi(5, "span", 5),
                                        oo(6, "Messages"),
                                        Hi(),
                                        Hi(),
                                        Hi(),
                                        Fi(7, "div", 6),
                                        Fi(8, "div", 0),
                                        Fi(9, "div", 7),
                                        ji(10, ry, 1, 1, "cms-message-item", 8),
                                        Hi(),
                                        Hi(),
                                        Hi(),
                                        Fi(11, "div", 9),
                                        Fi(12, "cms-message-edit", 10),
                                        Wi("addMessageEvent", function (t) {
                                            return e.onAddMessage(t);
                                        }),
                                        Hi(),
                                        Hi(),
                                        Hi(),
                                        Hi(),
                                        Hi()),
                                        2 & t &&
                                            (cs(10), Ui("ngForOf", e.messages));
                                },
                                directives: [Sc, ey, ny],
                                styles: [
                                    ".title[_ngcontent-%COMP%]{font-size:2.5rem;font-weight:700}.pad-left-right[_ngcontent-%COMP%]{padding-left:1rem;padding-right:1rem}",
                                ],
                            })),
                            t
                        );
                    })(),
                },
                {
                    path: "contacts",
                    component: Um,
                    children: [
                        { path: "new", component: Im },
                        { path: ":id", component: rm },
                        { path: ":id/edit", component: Im },
                    ],
                },
            ];
            let iy = (() => {
                    class t {}
                    return (
                        (t.ɵmod = Ht({ type: t })),
                        (t.ɵinj = at({
                            factory: function (e) {
                                return new (e || t)();
                            },
                            imports: [[$p.forRoot(sy)], $p],
                        })),
                        t
                    );
                })(),
                oy = (() => {
                    class t {}
                    return (
                        (t.ɵmod = Ht({ type: t, bootstrap: [tf] })),
                        (t.ɵinj = at({
                            factory: function (e) {
                                return new (e || t)();
                            },
                            providers: [Jg, Fm, Jm],
                            imports: [[iu, vg, Kg, iy, bm.forRoot()]],
                        })),
                        t
                    );
                })();
            (function () {
                if (Vl)
                    throw new Error(
                        "Cannot enable prod mode after platform setup."
                    );
                Pl = !1;
            })(),
                ru()
                    .bootstrapModule(oy)
                    .catch((t) => console.error(t));
        },
        zn8P: function (t, e) {
            function n(t) {
                return Promise.resolve().then(function () {
                    var e = new Error("Cannot find module '" + t + "'");
                    throw ((e.code = "MODULE_NOT_FOUND"), e);
                });
            }
            (n.keys = function () {
                return [];
            }),
                (n.resolve = n),
                (t.exports = n),
                (n.id = "zn8P");
        },
    },
    [[0, 0]],
]);
