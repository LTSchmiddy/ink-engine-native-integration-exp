(function(t, e) {
  if (typeof exports == 'object' && typeof module != 'undefined') {
    e(exports);
  } else if (typeof define == 'function' && define.amd) {
    define(['exports'], e);
  } else {
    e(
      ((t =
        typeof globalThis != 'undefined' ? globalThis : t || self).inkjs = {})
    );
  }
})(this, function(t) {
  'use strict';
  function s(t, e) {
    if (t instanceof e) {
      return c(t);
    } else {
      return null;
    }
  }
  function l(t, e) {
    if (t instanceof e) {
      return c(t);
    }
    throw new Error(`${t} is not of type ${e}`);
  }
  function o(t) {
    if (t.hasValidName && t.name) {
      return t;
    } else {
      return null;
    }
  }
  function u(t) {
    if (t === void 0) {
      return null;
    } else {
      return t;
    }
  }
  function h(t) {
    return typeof t == 'object' && typeof t.Equals == 'function';
  }
  function c(t, e) {
    return t;
  }
  function p(t) {
    throw new d(t + ' is null or undefined');
  }
  function C(t, e, n) {
    if (t === null) {
      return { result: n, exists: false };
    }
    let i = t.get(e);
    if (i === void 0) {
      return { result: n, exists: false };
    } else {
      return { result: i, exists: true };
    }
  }
  class e {
    constructor() {
      this._components = [];
      this._componentsString = null;
      this._isRelative = false;
      if (typeof arguments[0] == 'string') {
        let t = arguments[0];
        this.componentsString = t;
      } else if (
        arguments[0] instanceof e.Component &&
        arguments[1] instanceof e
      ) {
        let t = arguments[0];
        let e = arguments[1];
        this._components.push(t);
        this._components = this._components.concat(e._components);
      } else if (arguments[0] instanceof Array) {
        let t = arguments[0];
        let e = !!arguments[1];
        this._components = this._components.concat(t);
        this._isRelative = e;
      }
    }
    get isRelative() {
      return this._isRelative;
    }
    get componentCount() {
      return this._components.length;
    }
    get head() {
      if (this._components.length > 0) {
        return this._components[0];
      } else {
        return null;
      }
    }
    get tail() {
      if (this._components.length >= 2) {
        let t = this._components.slice(1, this._components.length);
        return new e(t);
      }
      return e.self;
    }
    get length() {
      return this._components.length;
    }
    get lastComponent() {
      let t = this._components.length - 1;
      if (t >= 0) {
        return this._components[t];
      } else {
        return null;
      }
    }
    get containsNamedComponent() {
      let t = 0;
      for (let e = this._components.length; t < e; t++) {
        if (!this._components[t].isIndex) {
          return true;
        }
      }
      return false;
    }
    static get self() {
      let t = new e();
      t._isRelative = true;
      return t;
    }
    GetComponent(t) {
      return this._components[t];
    }
    PathByAppendingPath(t) {
      let n = new e();
      let i = 0;
      for (
        let e = 0;
        e < t._components.length && t._components[e].isParent;
        ++e
      ) {
        i++;
      }
      for (let t = 0; t < this._components.length - i; ++t) {
        n._components.push(this._components[t]);
      }
      for (let e = i; e < t._components.length; ++e) {
        n._components.push(t._components[e]);
      }
      return n;
    }
    get componentsString() {
      if (this._componentsString == null) {
        this._componentsString = this._components.join('.');
        if (this.isRelative) {
          this._componentsString = '.' + this._componentsString;
        }
      }
      return this._componentsString;
    }
    set componentsString(t) {
      this._components.length = 0;
      this._componentsString = t;
      if (this._componentsString == null || this._componentsString == '') {
        return;
      }
      if (this._componentsString[0] == '.') {
        this._isRelative = true;
        this._componentsString = this._componentsString.substring(1);
      }
      let n = this._componentsString.split('.');
      for (let t of n) {
        if (/^(\-|\+)?([0-9]+|Infinity)$/.test(t)) {
          this._components.push(new e.Component(parseInt(t)));
        } else {
          this._components.push(new e.Component(t));
        }
      }
    }
    toString() {
      return this.componentsString;
    }
    Equals(t) {
      if (t == null) {
        return false;
      }
      if (t._components.length != this._components.length) {
        return false;
      }
      if (t.isRelative != this.isRelative) {
        return false;
      }
      let e = 0;
      for (let n = t._components.length; e < n; e++) {
        if (!t._components[e].Equals(this._components[e])) {
          return false;
        }
      }
      return true;
    }
    PathByAppendingComponent(t) {
      let n = new e();
      n._components.push(...this._components);
      n._components.push(t);
      return n;
    }
  }
  var n;
  var i;
  var r;
  var a;
  e.parentId = '^';
  (function(t) {
    class e {
      constructor(t) {
        this.index = -1;
        this.name = null;
        if (typeof t == 'string') {
          this.name = t;
        } else {
          this.index = t;
        }
      }
      get isIndex() {
        return this.index >= 0;
      }
      get isParent() {
        return this.name == t.parentId;
      }
      static ToParent() {
        return new e(t.parentId);
      }
      toString() {
        if (this.isIndex) {
          return this.index.toString();
        } else {
          return this.name;
        }
      }
      Equals(t) {
        return (
          t != null &&
          t.isIndex == this.isIndex &&
          (this.isIndex ? this.index == t.index : this.name == t.name)
        );
      }
    }
    t.Component = e;
  })(e || (e = {}));
  (function() {
    function e(t, e) {
      if (!t) {
        if (e !== void 0) {
          console.warn(e);
        }
        if (console.trace) {
          console.trace();
        }
        throw new Error('');
      }
    }
    var t = n || (n = {});
    t.AssertType = function(t, n, i) {
      e(t instanceof n, i);
    };
    t.Assert = e;
  })();
  class d extends Error {}
  class m {
    constructor() {
      this.parent = null;
      this._debugMetadata = null;
      this._path = null;
    }
    get debugMetadata() {
      if (this._debugMetadata === null && this.parent) {
        return this.parent.debugMetadata;
      } else {
        return this._debugMetadata;
      }
    }
    set debugMetadata(t) {
      this._debugMetadata = t;
    }
    get ownDebugMetadata() {
      return this._debugMetadata;
    }
    DebugLineNumberOfPath(t) {
      if (t === null) {
        return null;
      }
      let e = this.rootContentContainer;
      if (e) {
        let n = e.ContentAtPath(t).obj;
        if (n) {
          let t = n.debugMetadata;
          if (t !== null) {
            return t.startLineNumber;
          }
        }
      }
      return null;
    }
    get path() {
      if (this._path == null) {
        if (this.parent == null) {
          this._path = new e();
        } else {
          let t = [];
          let n = this;
          let i = s(n.parent, x);
          while (i !== null) {
            let r = o(n);
            if (r != null && r.hasValidName) {
              t.unshift(new e.Component(r.name));
            } else {
              t.unshift(new e.Component(i.content.indexOf(n)));
            }
            n = i;
            i = s(i.parent, x);
          }
          this._path = new e(t);
        }
      }
      return this._path;
    }
    ResolvePath(t) {
      if (t === null) {
        return p('path');
      }
      if (t.isRelative) {
        let e = s(this, x);
        if (e === null) {
          n.Assert(
            this.parent !== null,
            "Can't resolve relative path because we don't have a parent"
          );
          e = s(this.parent, x);
          n.Assert(e !== null, 'Expected parent to be a container');
          n.Assert(t.GetComponent(0).isParent);
          t = t.tail;
        }
        if (e === null) {
          return p('nearestContainer');
        } else {
          return e.ContentAtPath(t);
        }
      }
      {
        let e = this.rootContentContainer;
        if (e === null) {
          return p('contentContainer');
        } else {
          return e.ContentAtPath(t);
        }
      }
    }
    ConvertPathToRelative(t) {
      let n = this.path;
      let i = Math.min(t.length, n.length);
      let r = -1;
      for (let e = 0; e < i; ++e) {
        let i = n.GetComponent(e);
        let a = t.GetComponent(e);
        if (!i.Equals(a)) {
          break;
        }
        r = e;
      }
      if (r == -1) {
        return t;
      }
      let a = n.componentCount - 1 - r;
      let s = [];
      for (let t = 0; t < a; ++t) {
        s.push(e.Component.ToParent());
      }
      for (let e = r + 1; e < t.componentCount; ++e) {
        s.push(t.GetComponent(e));
      }
      return new e(s, true);
    }
    CompactPathString(t) {
      let e = null;
      let n = null;
      if (t.isRelative) {
        n = t.componentsString;
        e = this.path.PathByAppendingPath(t).componentsString;
      } else {
        n = this.ConvertPathToRelative(t).componentsString;
        e = t.componentsString;
      }
      if (n.length < e.length) {
        return n;
      } else {
        return e;
      }
    }
    get rootContentContainer() {
      let t = this;
      while (t.parent) {
        t = t.parent;
      }
      return s(t, x);
    }
    Copy() {
      throw Error("Not Implemented: Doesn't support copying");
    }
    SetChild(t, e, n) {
      if (t[e]) {
        t[e] = null;
      }
      t[e] = n;
      if (t[e]) {
        t[e].parent = this;
      }
    }
  }
  class f {
    constructor(t) {
      t = t !== void 0 ? t.toString() : '';
      this.string = t;
    }
    get Length() {
      return this.string.length;
    }
    Append(t) {
      if (t !== null) {
        this.string += t;
      }
    }
    AppendLine(t) {
      if (t !== void 0) {
        this.Append(t);
      }
      this.string += '\n';
    }
    AppendFormat(t, ...e) {
      this.string += t.replace(
        /{(\d+)}/g,
        (t, n) => (e[n] !== void 0 ? e[n] : t)
      );
    }
    toString() {
      return this.string;
    }
  }
  class g {
    constructor() {
      this.originName = null;
      this.itemName = null;
      if (arguments[1] === void 0) {
        if (arguments[0]) {
          let t = arguments[0].toString().split('.');
          this.originName = t[0];
          this.itemName = t[1];
        }
      } else {
        let t = arguments[0];
        let e = arguments[1];
        this.originName = t;
        this.itemName = e;
      }
    }
    static get Null() {
      return new g(null, null);
    }
    get isNull() {
      return this.originName == null && this.itemName == null;
    }
    get fullName() {
      return (
        (this.originName !== null ? this.originName : '?') + '.' + this.itemName
      );
    }
    toString() {
      return this.fullName;
    }
    Equals(t) {
      if (t instanceof g) {
        let e = t;
        return e.itemName == this.itemName && e.originName == this.originName;
      }
      return false;
    }
    copy() {
      return new g(this.originName, this.itemName);
    }
    serialized() {
      return JSON.stringify({
        originName: this.originName,
        itemName: this.itemName,
      });
    }
    static fromSerializedKey(t) {
      let e = JSON.parse(t);
      if (!g.isLikeInkListItem(e)) {
        return g.Null;
      }
      let n = e;
      return new g(n.originName, n.itemName);
    }
    static isLikeInkListItem(t) {
      return (
        typeof t == 'object' &&
        (!!t.hasOwnProperty('originName') &&
          !!t.hasOwnProperty('itemName') &&
          ((typeof t.originName == 'string' || typeof t.originName === null) &&
            (typeof t.itemName == 'string' || typeof t.itemName === null)))
      );
    }
  }
  class S extends Map {
    constructor() {
      super(arguments[0] instanceof S ? arguments[0] : []);
      this.origins = null;
      this._originNames = [];
      if (arguments[0] instanceof S) {
        let t = arguments[0];
        this._originNames = t.originNames;
        if (t.origins !== null) {
          this.origins = t.origins.slice();
        }
      } else if (typeof arguments[0] == 'string') {
        let t = arguments[0];
        let e = arguments[1];
        this.SetInitialOriginName(t);
        if (e.listDefinitions === null) {
          return p('originStory.listDefinitions');
        }
        let n = e.listDefinitions.TryListGetDefinition(t, null);
        if (!n.exists) {
          throw new Error(
            'InkList origin could not be found in story when constructing new list: ' +
              t
          );
        }
        if (n.result === null) {
          return p('def.result');
        }
        this.origins = [n.result];
      } else if (
        typeof arguments[0] == 'object' &&
        arguments[0].hasOwnProperty('Key') &&
        arguments[0].hasOwnProperty('Value')
      ) {
        let t = arguments[0];
        this.Add(t.Key, t.Value);
      }
    }
    static FromString(t, e) {
      var n;
      let i =
        (n = e.listDefinitions) === null || n === void 0
          ? void 0
          : n.FindSingleItemListWithName(t);
      if (i) {
        if (i.value === null) {
          return p('listValue.value');
        } else {
          return new S(i.value);
        }
      }
      throw new Error(
        "Could not find the InkListItem from the string '" +
          t +
          "' to create an InkList because it doesn't exist in the original list definition in ink."
      );
    }
    AddItem(t) {
      if (t instanceof g) {
        let e = t;
        if (e.originName == null) {
          this.AddItem(e.itemName);
          return;
        }
        if (this.origins === null) {
          return p('this.origins');
        }
        for (let t of this.origins) {
          if (t.name == e.originName) {
            let n = t.TryGetValueForItem(e, 0);
            if (n.exists) {
              this.Add(e, n.result);
              return;
            }
            throw new Error(
              'Could not add the item ' +
                e +
                " to this list because it doesn't exist in the original list definition in ink."
            );
          }
        }
        throw new Error(
          "Failed to add item to list because the item was from a new list definition that wasn't previously known to this list. Only items from previously known lists can be used, so that the int value can be found."
        );
      }
      {
        let e = t;
        let n = null;
        if (this.origins === null) {
          return p('this.origins');
        }
        for (let t of this.origins) {
          if (e === null) {
            return p('itemName');
          }
          if (t.ContainsItemWithName(e)) {
            if (n != null) {
              throw new Error(
                'Could not add the item ' +
                  e +
                  ' to this list because it could come from either ' +
                  t.name +
                  ' or ' +
                  n.name
              );
            }
            n = t;
          }
        }
        if (n == null) {
          throw new Error(
            'Could not add the item ' +
              e +
              " to this list because it isn't known to any list definitions previously associated with this list."
          );
        }
        let i = new g(n.name, e);
        let r = n.ValueForItem(i);
        this.Add(i, r);
      }
    }
    ContainsItemNamed(t) {
      for (let [e] of this) {
        if (g.fromSerializedKey(e).itemName == t) {
          return true;
        }
      }
      return false;
    }
    ContainsKey(t) {
      return this.has(t.serialized());
    }
    Add(t, e) {
      let n = t.serialized();
      if (this.has(n)) {
        throw new Error('The Map already contains an entry for ' + t);
      }
      this.set(n, e);
    }
    Remove(t) {
      return this.delete(t.serialized());
    }
    get Count() {
      return this.size;
    }
    get originOfMaxItem() {
      if (this.origins == null) {
        return null;
      }
      let t = this.maxItem.Key.originName;
      let e = null;
      this.origins.every(n => n.name != t || ((e = n), false));
      return e;
    }
    get originNames() {
      if (this.Count > 0) {
        if (this._originNames == null && this.Count > 0) {
          this._originNames = [];
        } else {
          if (!this._originNames) {
            this._originNames = [];
          }
          this._originNames.length = 0;
        }
        for (let [t] of this) {
          let e = g.fromSerializedKey(t);
          if (e.originName === null) {
            return p('item.originName');
          }
          this._originNames.push(e.originName);
        }
      }
      return this._originNames;
    }
    SetInitialOriginName(t) {
      this._originNames = [t];
    }
    SetInitialOriginNames(t) {
      this._originNames = t == null ? null : t.slice();
    }
    get maxItem() {
      let t = { Key: g.Null, Value: 0 };
      for (let [e, n] of this) {
        let i = g.fromSerializedKey(e);
        if (t.Key.isNull || n > t.Value) {
          t = { Key: i, Value: n };
        }
      }
      return t;
    }
    get minItem() {
      let t = { Key: g.Null, Value: 0 };
      for (let [e, n] of this) {
        let i = g.fromSerializedKey(e);
        if (t.Key.isNull || n < t.Value) {
          t = { Key: i, Value: n };
        }
      }
      return t;
    }
    get inverse() {
      let t = new S();
      if (this.origins != null) {
        for (let e of this.origins) {
          for (let [n, i] of e.items) {
            let e = g.fromSerializedKey(n);
            if (!this.ContainsKey(e)) {
              t.Add(e, i);
            }
          }
        }
      }
      return t;
    }
    get all() {
      let t = new S();
      if (this.origins != null) {
        for (let e of this.origins) {
          for (let [n, i] of e.items) {
            let e = g.fromSerializedKey(n);
            t.set(e.serialized(), i);
          }
        }
      }
      return t;
    }
    Union(t) {
      let e = new S(this);
      for (let [n, i] of t) {
        e.set(n, i);
      }
      return e;
    }
    Intersect(t) {
      let e = new S();
      for (let [n, i] of this) {
        if (t.has(n)) {
          e.set(n, i);
        }
      }
      return e;
    }
    Without(t) {
      let e = new S(this);
      for (let [n] of t) {
        e.delete(n);
      }
      return e;
    }
    Contains(t) {
      for (let [e] of t) {
        if (!this.has(e)) {
          return false;
        }
      }
      return true;
    }
    GreaterThan(t) {
      return (
        this.Count != 0 &&
        (t.Count == 0 || this.minItem.Value > t.maxItem.Value)
      );
    }
    GreaterThanOrEquals(t) {
      return (
        this.Count != 0 &&
        (t.Count == 0 ||
          (this.minItem.Value >= t.minItem.Value &&
            this.maxItem.Value >= t.maxItem.Value))
      );
    }
    LessThan(t) {
      return (
        t.Count != 0 &&
        (this.Count == 0 || this.maxItem.Value < t.minItem.Value)
      );
    }
    LessThanOrEquals(t) {
      return (
        t.Count != 0 &&
        (this.Count == 0 ||
          (this.maxItem.Value <= t.maxItem.Value &&
            this.minItem.Value <= t.minItem.Value))
      );
    }
    MaxAsList() {
      if (this.Count > 0) {
        return new S(this.maxItem);
      } else {
        return new S();
      }
    }
    MinAsList() {
      if (this.Count > 0) {
        return new S(this.minItem);
      } else {
        return new S();
      }
    }
    ListWithSubRange(t, e) {
      if (this.Count == 0) {
        return new S();
      }
      let n = this.orderedItems;
      let i = 0;
      let r = Number.MAX_SAFE_INTEGER;
      if (Number.isInteger(t)) {
        i = t;
      } else if (t instanceof S && t.Count > 0) {
        i = t.minItem.Value;
      }
      if (Number.isInteger(e)) {
        r = e;
      } else if (t instanceof S && t.Count > 0) {
        r = e.maxItem.Value;
      }
      let a = new S();
      a.SetInitialOriginNames(this.originNames);
      for (let t of n) {
        if (t.Value >= i && t.Value <= r) {
          a.Add(t.Key, t.Value);
        }
      }
      return a;
    }
    Equals(t) {
      if (t instanceof S == false) {
        return false;
      }
      if (t.Count != this.Count) {
        return false;
      }
      for (let [e] of this) {
        if (!t.has(e)) {
          return false;
        }
      }
      return true;
    }
    get orderedItems() {
      let t = new Array();
      for (let [e, n] of this) {
        let i = g.fromSerializedKey(e);
        t.push({ Key: i, Value: n });
      }
      t.sort(
        (t, e) =>
          t.Key.originName === null
            ? p('x.Key.originName')
            : e.Key.originName === null
              ? p('y.Key.originName')
              : t.Value == e.Value
                ? t.Key.originName.localeCompare(e.Key.originName)
                : t.Value < e.Value ? -1 : t.Value > e.Value ? 1 : 0
      );
      return t;
    }
    toString() {
      let t = this.orderedItems;
      let e = new f();
      for (let n = 0; n < t.length; n++) {
        if (n > 0) {
          e.Append(', ');
        }
        let i = t[n].Key;
        if (i.itemName === null) {
          return p('item.itemName');
        }
        e.Append(i.itemName);
      }
      return e.toString();
    }
    valueOf() {
      return NaN;
    }
  }
  class y extends Error {
    constructor(t) {
      super(t);
      this.useEndLineNumber = false;
      this.message = t;
      this.name = 'StoryException';
    }
  }
  class v extends m {
    static Create(t, n) {
      if (n) {
        if (n === i.Int && Number.isInteger(Number(t))) {
          return new w(Number(t));
        }
        if (n === i.Float && !isNaN(t)) {
          return new T(Number(t));
        }
      }
      if (typeof t == 'boolean') {
        return new _(Boolean(t));
      } else if (typeof t == 'string') {
        return new E(String(t));
      } else if (Number.isInteger(Number(t))) {
        return new w(Number(t));
      } else if (isNaN(t)) {
        if (t instanceof e) {
          return new P(l(t, e));
        } else if (t instanceof S) {
          return new N(l(t, S));
        } else {
          return null;
        }
      } else {
        return new T(Number(t));
      }
    }
    Copy() {
      return l(v.Create(this), m);
    }
    BadCastException(t) {
      return new y(
        "Can't cast " +
          this.valueObject +
          ' from ' +
          this.valueType +
          ' to ' +
          t
      );
    }
  }
  class b extends v {
    constructor(t) {
      super();
      this.value = t;
    }
    get valueObject() {
      return this.value;
    }
    toString() {
      if (this.value === null) {
        return p('Value.value');
      } else {
        return this.value.toString();
      }
    }
  }
  class _ extends b {
    constructor(t) {
      super(t || false);
    }
    get isTruthy() {
      return Boolean(this.value);
    }
    get valueType() {
      return i.Bool;
    }
    Cast(t) {
      if (this.value === null) {
        return p('Value.value');
      }
      if (t == this.valueType) {
        return this;
      }
      if (t == i.Int) {
        return new w(this.value ? 1 : 0);
      }
      if (t == i.Float) {
        return new T(this.value ? 1 : 0);
      }
      if (t == i.String) {
        return new E(this.value ? 'true' : 'false');
      }
      throw this.BadCastException(t);
    }
    toString() {
      if (this.value) {
        return 'true';
      } else {
        return 'false';
      }
    }
  }
  class w extends b {
    constructor(t) {
      super(t || 0);
    }
    get isTruthy() {
      return this.value != 0;
    }
    get valueType() {
      return i.Int;
    }
    Cast(t) {
      if (this.value === null) {
        return p('Value.value');
      }
      if (t == this.valueType) {
        return this;
      }
      if (t == i.Bool) {
        return new _(this.value !== 0);
      }
      if (t == i.Float) {
        return new T(this.value);
      }
      if (t == i.String) {
        return new E('' + this.value);
      }
      throw this.BadCastException(t);
    }
  }
  class T extends b {
    constructor(t) {
      super(t || 0);
    }
    get isTruthy() {
      return this.value != 0;
    }
    get valueType() {
      return i.Float;
    }
    Cast(t) {
      if (this.value === null) {
        return p('Value.value');
      }
      if (t == this.valueType) {
        return this;
      }
      if (t == i.Bool) {
        return new _(this.value !== 0);
      }
      if (t == i.Int) {
        return new w(this.value);
      }
      if (t == i.String) {
        return new E('' + this.value);
      }
      throw this.BadCastException(t);
    }
  }
  class E extends b {
    constructor(t) {
      super(t || '');
      this._isNewline = this.value == '\n';
      this._isInlineWhitespace = true;
      if (this.value === null) {
        return p('Value.value');
      }
      if (this.value.length > 0) {
        this.value
          .split('')
          .every(
            t =>
              t == ' ' ||
              t == '\x09' ||
              ((this._isInlineWhitespace = false), false)
          );
      }
    }
    get valueType() {
      return i.String;
    }
    get isTruthy() {
      if (this.value === null) {
        return p('Value.value');
      } else {
        return this.value.length > 0;
      }
    }
    get isNewline() {
      return this._isNewline;
    }
    get isInlineWhitespace() {
      return this._isInlineWhitespace;
    }
    get isNonWhitespace() {
      return !this.isNewline && !this.isInlineWhitespace;
    }
    Cast(t) {
      if (t == this.valueType) {
        return this;
      }
      if (t == i.Int) {
        let e = (function(t, e = 0) {
          let n = parseInt(t);
          if (Number.isNaN(n)) {
            return { result: e, exists: false };
          } else {
            return { result: n, exists: true };
          }
        })(this.value);
        if (e.exists) {
          return new w(e.result);
        }
        throw this.BadCastException(t);
      }
      if (t == i.Float) {
        let e = (function(t, e = 0) {
          let n = parseFloat(t);
          if (Number.isNaN(n)) {
            return { result: e, exists: false };
          } else {
            return { result: n, exists: true };
          }
        })(this.value);
        if (e.exists) {
          return new T(e.result);
        }
        throw this.BadCastException(t);
      }
      throw this.BadCastException(t);
    }
  }
  class P extends b {
    constructor(t) {
      super(t);
    }
    get valueType() {
      return i.DivertTarget;
    }
    get targetPath() {
      if (this.value === null) {
        return p('Value.value');
      } else {
        return this.value;
      }
    }
    set targetPath(t) {
      this.value = t;
    }
    get isTruthy() {
      throw new Error(
        "Shouldn't be checking the truthiness of a divert target"
      );
    }
    Cast(t) {
      if (t == this.valueType) {
        return this;
      }
      throw this.BadCastException(t);
    }
    toString() {
      return 'DivertTargetValue(' + this.targetPath + ')';
    }
  }
  class O extends b {
    constructor(t, e = -1) {
      super(t);
      this._contextIndex = e;
    }
    get contextIndex() {
      return this._contextIndex;
    }
    set contextIndex(t) {
      this._contextIndex = t;
    }
    get variableName() {
      if (this.value === null) {
        return p('Value.value');
      } else {
        return this.value;
      }
    }
    set variableName(t) {
      this.value = t;
    }
    get valueType() {
      return i.VariablePointer;
    }
    get isTruthy() {
      throw new Error(
        "Shouldn't be checking the truthiness of a variable pointer"
      );
    }
    Cast(t) {
      if (t == this.valueType) {
        return this;
      }
      throw this.BadCastException(t);
    }
    toString() {
      return 'VariablePointerValue(' + this.variableName + ')';
    }
    Copy() {
      return new O(this.variableName, this.contextIndex);
    }
  }
  class N extends b {
    get isTruthy() {
      if (this.value === null) {
        return p('this.value');
      } else {
        return this.value.Count > 0;
      }
    }
    get valueType() {
      return i.List;
    }
    Cast(t) {
      if (this.value === null) {
        return p('Value.value');
      }
      if (t == i.Int) {
        let t = this.value.maxItem;
        if (t.Key.isNull) {
          return new w(0);
        } else {
          return new w(t.Value);
        }
      }
      if (t == i.Float) {
        let t = this.value.maxItem;
        if (t.Key.isNull) {
          return new T(0);
        } else {
          return new T(t.Value);
        }
      }
      if (t == i.String) {
        let t = this.value.maxItem;
        if (t.Key.isNull) {
          return new E('');
        } else {
          return new E(t.Key.toString());
        }
      }
      if (t == this.valueType) {
        return this;
      }
      throw this.BadCastException(t);
    }
    constructor(t, e) {
      super(null);
      if (t || e) {
        if (t instanceof S) {
          this.value = new S(t);
        } else if (t instanceof g && typeof e == 'number') {
          this.value = new S({ Key: t, Value: e });
        }
      } else {
        this.value = new S();
      }
    }
    static RetainListOriginsForAssignment(t, e) {
      let n = s(t, N);
      let i = s(e, N);
      if (i && i.value === null) {
        return p('newList.value');
      } else if (n && n.value === null) {
        return p('oldList.value');
      } else {
        if (n && i && i.value.Count == 0) {
          i.value.SetInitialOriginNames(n.value.originNames);
        }
        return;
      }
    }
  }
  (function() {
    var t = i || (i = {});
    t[(t.Bool = -1)] = 'Bool';
    t[(t.Int = 0)] = 'Int';
    t[(t.Float = 1)] = 'Float';
    t[(t.List = 2)] = 'List';
    t[(t.String = 3)] = 'String';
    t[(t.DivertTarget = 4)] = 'DivertTarget';
    t[(t.VariablePointer = 5)] = 'VariablePointer';
  })();
  class A {
    constructor() {
      this.obj = null;
      this.approximate = false;
    }
    get correctObj() {
      if (this.approximate) {
        return null;
      } else {
        return this.obj;
      }
    }
    get container() {
      if (this.obj instanceof x) {
        return this.obj;
      } else {
        return null;
      }
    }
    copy() {
      let t = new A();
      t.obj = this.obj;
      t.approximate = this.approximate;
      return t;
    }
  }
  class x extends m {
    constructor() {
      super(...arguments);
      this.name = '';
      this._content = [];
      this.namedContent = new Map();
      this.visitsShouldBeCounted = false;
      this.turnIndexShouldBeCounted = false;
      this.countingAtStartOnly = false;
      this._pathToFirstLeafContent = null;
    }
    get hasValidName() {
      return this.name != null && this.name.length > 0;
    }
    get content() {
      return this._content;
    }
    set content(t) {
      this.AddContent(t);
    }
    get namedOnlyContent() {
      let t = new Map();
      for (let [e, n] of this.namedContent) {
        let i = l(n, m);
        t.set(e, i);
      }
      for (let e of this.content) {
        let n = o(e);
        if (n != null && n.hasValidName) {
          t.delete(n.name);
        }
      }
      if (t.size == 0) {
        t = null;
      }
      return t;
    }
    set namedOnlyContent(t) {
      let e = this.namedOnlyContent;
      if (e != null) {
        for (let [t] of e) {
          this.namedContent.delete(t);
        }
      }
      if (t != null) {
        for (let [, e] of t) {
          let t = o(e);
          if (t != null) {
            this.AddToNamedContentOnly(t);
          }
        }
      }
    }
    get countFlags() {
      let t = 0;
      if (this.visitsShouldBeCounted) {
        t |= x.CountFlags.Visits;
      }
      if (this.turnIndexShouldBeCounted) {
        t |= x.CountFlags.Turns;
      }
      if (this.countingAtStartOnly) {
        t |= x.CountFlags.CountStartOnly;
      }
      if (t == x.CountFlags.CountStartOnly) {
        t = 0;
      }
      return t;
    }
    set countFlags(t) {
      let e = t;
      if ((e & x.CountFlags.Visits) > 0) {
        this.visitsShouldBeCounted = true;
      }
      if ((e & x.CountFlags.Turns) > 0) {
        this.turnIndexShouldBeCounted = true;
      }
      if ((e & x.CountFlags.CountStartOnly) > 0) {
        this.countingAtStartOnly = true;
      }
    }
    get pathToFirstLeafContent() {
      if (this._pathToFirstLeafContent == null) {
        this._pathToFirstLeafContent = this.path.PathByAppendingPath(
          this.internalPathToFirstLeafContent
        );
      }
      return this._pathToFirstLeafContent;
    }
    get internalPathToFirstLeafContent() {
      let t = [];
      let n = this;
      while (n instanceof x) {
        if (n.content.length > 0) {
          t.push(new e.Component(0));
          n = n.content[0];
        }
      }
      return new e(t);
    }
    AddContent(t) {
      if (t instanceof Array) {
        let e = t;
        for (let t of e) {
          this.AddContent(t);
        }
      } else {
        let e = t;
        this._content.push(e);
        if (e.parent) {
          throw new Error('content is already in ' + e.parent);
        }
        e.parent = this;
        this.TryAddNamedContent(e);
      }
    }
    TryAddNamedContent(t) {
      let e = o(t);
      if (e != null && e.hasValidName) {
        this.AddToNamedContentOnly(e);
      }
    }
    AddToNamedContentOnly(t) {
      n.AssertType(t, m, 'Can only add Runtime.Objects to a Runtime.Container');
      l(t, m).parent = this;
      this.namedContent.set(t.name, t);
    }
    ContentAtPath(t, e = 0, n = -1) {
      if (n == -1) {
        n = t.length;
      }
      let i = new A();
      i.approximate = false;
      let r = this;
      let a = this;
      for (let l = e; l < n; ++l) {
        let e = t.GetComponent(l);
        if (r == null) {
          i.approximate = true;
          break;
        }
        let n = r.ContentWithPathComponent(e);
        if (n == null) {
          i.approximate = true;
          break;
        }
        a = n;
        r = s(n, x);
      }
      i.obj = a;
      return i;
    }
    InsertContent(t, e) {
      this.content[e] = t;
      if (t.parent) {
        throw new Error('content is already in ' + t.parent);
      }
      t.parent = this;
      this.TryAddNamedContent(t);
    }
    AddContentsOfContainer(t) {
      this.content = this.content.concat(t.content);
      for (let e of t.content) {
        e.parent = this;
        this.TryAddNamedContent(e);
      }
    }
    ContentWithPathComponent(t) {
      if (t.isIndex) {
        if (t.index >= 0 && t.index < this.content.length) {
          return this.content[t.index];
        } else {
          return null;
        }
      }
      if (t.isParent) {
        return this.parent;
      }
      {
        if (t.name === null) {
          return p('component.name');
        }
        let e = C(this.namedContent, t.name, null);
        if (e.exists) {
          return l(e.result, m);
        } else {
          return null;
        }
      }
    }
    BuildStringOfHierarchy() {
      function r() {
        for (let n = 0; n < 4 * e; ++n) {
          t.Append(' ');
        }
      }
      let t;
      if (arguments.length == 0) {
        t = new f();
        this.BuildStringOfHierarchy(t, 0, null);
        return t.toString();
      }
      t = arguments[0];
      let e = arguments[1];
      let i = arguments[2];
      r();
      t.Append('[');
      if (this.hasValidName) {
        t.AppendFormat(' ({0})', this.name);
      }
      if (this == i) {
        t.Append('  <---');
      }
      t.AppendLine();
      e++;
      for (let n = 0; n < this.content.length; ++n) {
        let a = this.content[n];
        if (a instanceof x) {
          a.BuildStringOfHierarchy(t, e, i);
        } else {
          r();
          if (a instanceof E) {
            t.Append('"');
            t.Append(a.toString().replace('\n', '\\n'));
            t.Append('"');
          } else {
            t.Append(a.toString());
          }
        }
        if (n != this.content.length - 1) {
          t.Append(',');
        }
        if (!(a instanceof x) && a == i) {
          t.Append('  <---');
        }
        t.AppendLine();
      }
      let a = new Map();
      for (let [t, e] of this.namedContent) {
        if (!(this.content.indexOf(l(e, m)) >= 0)) {
          a.set(t, e);
        }
      }
      if (a.size > 0) {
        r();
        t.AppendLine('-- named: --');
        for (let [, r] of a) {
          n.AssertType(r, x, 'Can only print out named Containers');
          r.BuildStringOfHierarchy(t, e, i);
          t.AppendLine();
        }
      }
      e--;
      r();
      t.Append(']');
    }
  }
  (function() {
    var t = x || (x = {});
    var e;
    (e = t.CountFlags || (t.CountFlags = {}))[(e.Visits = 1)] = 'Visits';
    e[(e.Turns = 2)] = 'Turns';
    e[(e.CountStartOnly = 4)] = 'CountStartOnly';
  })();
  class I extends m {
    toString() {
      return 'Glue';
    }
  }
  class k extends m {
    constructor(t = k.CommandType.NotSet) {
      super();
      this._commandType = t;
    }
    get commandType() {
      return this._commandType;
    }
    Copy() {
      return new k(this.commandType);
    }
    static EvalStart() {
      return new k(k.CommandType.EvalStart);
    }
    static EvalOutput() {
      return new k(k.CommandType.EvalOutput);
    }
    static EvalEnd() {
      return new k(k.CommandType.EvalEnd);
    }
    static Duplicate() {
      return new k(k.CommandType.Duplicate);
    }
    static PopEvaluatedValue() {
      return new k(k.CommandType.PopEvaluatedValue);
    }
    static PopFunction() {
      return new k(k.CommandType.PopFunction);
    }
    static PopTunnel() {
      return new k(k.CommandType.PopTunnel);
    }
    static BeginString() {
      return new k(k.CommandType.BeginString);
    }
    static EndString() {
      return new k(k.CommandType.EndString);
    }
    static NoOp() {
      return new k(k.CommandType.NoOp);
    }
    static ChoiceCount() {
      return new k(k.CommandType.ChoiceCount);
    }
    static Turns() {
      return new k(k.CommandType.Turns);
    }
    static TurnsSince() {
      return new k(k.CommandType.TurnsSince);
    }
    static ReadCount() {
      return new k(k.CommandType.ReadCount);
    }
    static Random() {
      return new k(k.CommandType.Random);
    }
    static SeedRandom() {
      return new k(k.CommandType.SeedRandom);
    }
    static VisitIndex() {
      return new k(k.CommandType.VisitIndex);
    }
    static SequenceShuffleIndex() {
      return new k(k.CommandType.SequenceShuffleIndex);
    }
    static StartThread() {
      return new k(k.CommandType.StartThread);
    }
    static Done() {
      return new k(k.CommandType.Done);
    }
    static End() {
      return new k(k.CommandType.End);
    }
    static ListFromInt() {
      return new k(k.CommandType.ListFromInt);
    }
    static ListRange() {
      return new k(k.CommandType.ListRange);
    }
    static ListRandom() {
      return new k(k.CommandType.ListRandom);
    }
    toString() {
      return this.commandType.toString();
    }
  }
  (function() {
    var t = k || (k = {});
    var e;
    (e = t.CommandType || (t.CommandType = {}))[(e.NotSet = -1)] = 'NotSet';
    e[(e.EvalStart = 0)] = 'EvalStart';
    e[(e.EvalOutput = 1)] = 'EvalOutput';
    e[(e.EvalEnd = 2)] = 'EvalEnd';
    e[(e.Duplicate = 3)] = 'Duplicate';
    e[(e.PopEvaluatedValue = 4)] = 'PopEvaluatedValue';
    e[(e.PopFunction = 5)] = 'PopFunction';
    e[(e.PopTunnel = 6)] = 'PopTunnel';
    e[(e.BeginString = 7)] = 'BeginString';
    e[(e.EndString = 8)] = 'EndString';
    e[(e.NoOp = 9)] = 'NoOp';
    e[(e.ChoiceCount = 10)] = 'ChoiceCount';
    e[(e.Turns = 11)] = 'Turns';
    e[(e.TurnsSince = 12)] = 'TurnsSince';
    e[(e.Random = 13)] = 'Random';
    e[(e.SeedRandom = 14)] = 'SeedRandom';
    e[(e.VisitIndex = 15)] = 'VisitIndex';
    e[(e.SequenceShuffleIndex = 16)] = 'SequenceShuffleIndex';
    e[(e.StartThread = 17)] = 'StartThread';
    e[(e.Done = 18)] = 'Done';
    e[(e.End = 19)] = 'End';
    e[(e.ListFromInt = 20)] = 'ListFromInt';
    e[(e.ListRange = 21)] = 'ListRange';
    e[(e.ListRandom = 22)] = 'ListRandom';
    e[(e.ReadCount = 23)] = 'ReadCount';
    e[(e.TOTAL_VALUES = 24)] = 'TOTAL_VALUES';
  })();
  (function() {
    var t = r || (r = {});
    t[(t.Tunnel = 0)] = 'Tunnel';
    t[(t.Function = 1)] = 'Function';
    t[(t.FunctionEvaluationFromGame = 2)] = 'FunctionEvaluationFromGame';
  })();
  class F {
    constructor() {
      this.container = null;
      this.index = -1;
      if (arguments.length === 2) {
        this.container = arguments[0];
        this.index = arguments[1];
      }
    }
    Resolve() {
      if (this.index < 0) {
        return this.container;
      } else if (this.container == null) {
        return null;
      } else if (this.container.content.length == 0) {
        return this.container;
      } else if (this.index >= this.container.content.length) {
        return null;
      } else {
        return this.container.content[this.index];
      }
    }
    get isNull() {
      return this.container == null;
    }
    get path() {
      if (this.isNull) {
        return null;
      } else if (this.index >= 0) {
        return this.container.path.PathByAppendingComponent(
          new e.Component(this.index)
        );
      } else {
        return this.container.path;
      }
    }
    toString() {
      if (this.container) {
        return (
          'Ink Pointer -> ' +
          this.container.path.toString() +
          ' -- index ' +
          this.index
        );
      } else {
        return 'Ink Pointer (null)';
      }
    }
    copy() {
      return new F(this.container, this.index);
    }
    static StartOf(t) {
      return new F(t, 0);
    }
    static get Null() {
      return new F(null, -1);
    }
  }
  class W extends m {
    constructor(t) {
      super();
      this._targetPath = null;
      this._targetPointer = F.Null;
      this.variableDivertName = null;
      this.pushesToStack = false;
      this.stackPushType = 0;
      this.isExternal = false;
      this.externalArgs = 0;
      this.isConditional = false;
      this.pushesToStack = false;
      if (t !== void 0) {
        this.pushesToStack = true;
        this.stackPushType = t;
      }
    }
    get targetPath() {
      if (this._targetPath != null && this._targetPath.isRelative) {
        let t = this.targetPointer.Resolve();
        if (t) {
          this._targetPath = t.path;
        }
      }
      return this._targetPath;
    }
    set targetPath(t) {
      this._targetPath = t;
      this._targetPointer = F.Null;
    }
    get targetPointer() {
      if (this._targetPointer.isNull) {
        let t = this.ResolvePath(this._targetPath).obj;
        if (this._targetPath === null) {
          return p('this._targetPath');
        }
        if (this._targetPath.lastComponent === null) {
          return p('this._targetPath.lastComponent');
        }
        if (this._targetPath.lastComponent.isIndex) {
          if (t === null) {
            return p('targetObj');
          }
          this._targetPointer.container =
            t.parent instanceof x ? t.parent : null;
          this._targetPointer.index = this._targetPath.lastComponent.index;
        } else {
          this._targetPointer = F.StartOf(t instanceof x ? t : null);
        }
      }
      return this._targetPointer.copy();
    }
    get targetPathString() {
      if (this.targetPath == null) {
        return null;
      } else {
        return this.CompactPathString(this.targetPath);
      }
    }
    set targetPathString(t) {
      this.targetPath = t == null ? null : new e(t);
    }
    get hasVariableTarget() {
      return this.variableDivertName != null;
    }
    Equals(t) {
      let e = t;
      return (
        e instanceof W &&
        this.hasVariableTarget == e.hasVariableTarget &&
        (this.hasVariableTarget
          ? this.variableDivertName == e.variableDivertName
          : this.targetPath === null
            ? p('this.targetPath')
            : this.targetPath.Equals(e.targetPath))
      );
    }
    toString() {
      if (this.hasVariableTarget) {
        return 'Divert(variable: ' + this.variableDivertName + ')';
      }
      if (this.targetPath == null) {
        return 'Divert(null)';
      }
      {
        let t = new f();
        let e = this.targetPath.toString();
        t.Append('Divert');
        if (this.isConditional) {
          t.Append('?');
        }
        if (this.pushesToStack) {
          if (this.stackPushType == r.Function) {
            t.Append(' function');
          } else {
            t.Append(' tunnel');
          }
        }
        t.Append(' -> ');
        t.Append(this.targetPathString);
        t.Append(' (');
        t.Append(e);
        t.Append(')');
        return t.toString();
      }
    }
  }
  class V extends m {
    constructor(t = true) {
      super();
      this._pathOnChoice = null;
      this.hasCondition = false;
      this.hasStartContent = false;
      this.hasChoiceOnlyContent = false;
      this.isInvisibleDefault = false;
      this.onceOnly = true;
      this.onceOnly = t;
    }
    get pathOnChoice() {
      if (this._pathOnChoice != null && this._pathOnChoice.isRelative) {
        let t = this.choiceTarget;
        if (t) {
          this._pathOnChoice = t.path;
        }
      }
      return this._pathOnChoice;
    }
    set pathOnChoice(t) {
      this._pathOnChoice = t;
    }
    get choiceTarget() {
      if (this._pathOnChoice === null) {
        return p('ChoicePoint._pathOnChoice');
      } else {
        return this.ResolvePath(this._pathOnChoice).container;
      }
    }
    get pathStringOnChoice() {
      if (this.pathOnChoice === null) {
        return p('ChoicePoint.pathOnChoice');
      } else {
        return this.CompactPathString(this.pathOnChoice);
      }
    }
    set pathStringOnChoice(t) {
      this.pathOnChoice = new e(t);
    }
    get flags() {
      let t = 0;
      if (this.hasCondition) {
        t |= 1;
      }
      if (this.hasStartContent) {
        t |= 2;
      }
      if (this.hasChoiceOnlyContent) {
        t |= 4;
      }
      if (this.isInvisibleDefault) {
        t |= 8;
      }
      if (this.onceOnly) {
        t |= 16;
      }
      return t;
    }
    set flags(t) {
      this.hasCondition = (1 & t) > 0;
      this.hasStartContent = (2 & t) > 0;
      this.hasChoiceOnlyContent = (4 & t) > 0;
      this.isInvisibleDefault = (8 & t) > 0;
      this.onceOnly = (16 & t) > 0;
    }
    toString() {
      if (this.pathOnChoice === null) {
        return p('ChoicePoint.pathOnChoice');
      }
      return 'Choice: -> ' + this.pathOnChoice.toString();
    }
  }
  class L extends m {
    constructor(t = null) {
      super();
      this.pathForCount = null;
      this.name = t;
    }
    get containerForCount() {
      if (this.pathForCount === null) {
        return null;
      } else {
        return this.ResolvePath(this.pathForCount).container;
      }
    }
    get pathStringForCount() {
      if (this.pathForCount === null) {
        return null;
      } else {
        return this.CompactPathString(this.pathForCount);
      }
    }
    set pathStringForCount(t) {
      this.pathForCount = t === null ? null : new e(t);
    }
    toString() {
      if (this.name != null) {
        return 'var(' + this.name + ')';
      }
      return 'read_count(' + this.pathStringForCount + ')';
    }
  }
  class R extends m {
    constructor(t, e) {
      super();
      this.variableName = t || null;
      this.isNewDeclaration = !!e;
      this.isGlobal = false;
    }
    toString() {
      return 'VarAssign to ' + this.variableName;
    }
  }
  class j extends m {}
  class D extends m {
    constructor() {
      super();
      this._name = null;
      this._numberOfParameters = 0;
      this._prototype = null;
      this._isPrototype = false;
      this._operationFuncs = null;
      if (arguments.length === 0) {
        D.GenerateNativeFunctionsIfNecessary();
      } else if (arguments.length === 1) {
        let t = arguments[0];
        D.GenerateNativeFunctionsIfNecessary();
        this.name = t;
      } else if (arguments.length === 2) {
        let t = arguments[0];
        let e = arguments[1];
        this._isPrototype = true;
        this.name = t;
        this.numberOfParameters = e;
      }
    }
    static CallWithName(t) {
      return new D(t);
    }
    static CallExistsWithName(t) {
      this.GenerateNativeFunctionsIfNecessary();
      return this._nativeFunctions.get(t);
    }
    get name() {
      if (this._name === null) {
        return p('NativeFunctionCall._name');
      } else {
        return this._name;
      }
    }
    set name(t) {
      this._name = t;
      if (!this._isPrototype) {
        if (D._nativeFunctions === null) {
          p('NativeFunctionCall._nativeFunctions');
        } else {
          this._prototype = D._nativeFunctions.get(this._name) || null;
        }
      }
    }
    get numberOfParameters() {
      if (this._prototype) {
        return this._prototype.numberOfParameters;
      } else {
        return this._numberOfParameters;
      }
    }
    set numberOfParameters(t) {
      this._numberOfParameters = t;
    }
    Call(t) {
      if (this._prototype) {
        return this._prototype.Call(t);
      }
      if (this.numberOfParameters != t.length) {
        throw new Error('Unexpected number of parameters');
      }
      let e = false;
      for (let n of t) {
        if (n instanceof j) {
          throw new y(
            'Attempting to perform operation on a void value. Did you forget to "return" a value from a function you called here?'
          );
        }
        if (n instanceof N) {
          e = true;
        }
      }
      if (t.length == 2 && e) {
        return this.CallBinaryListOperation(t);
      }
      let n = this.CoerceValuesToSingleType(t);
      let r = n[0].valueType;
      if (
        r == i.Int ||
        r == i.Float ||
        r == i.String ||
        r == i.DivertTarget ||
        r == i.List
      ) {
        return this.CallType(n);
      } else {
        return null;
      }
    }
    CallType(t) {
      let e = l(t[0], b);
      let n = e.valueType;
      let r = e;
      let a = t.length;
      if (a == 2 || a == 1) {
        if (this._operationFuncs === null) {
          return p('NativeFunctionCall._operationFuncs');
        }
        let s = this._operationFuncs.get(n);
        if (!s) {
          const t = i[n];
          throw new y('Cannot perform operation ' + this.name + ' on ' + t);
        }
        if (a == 2) {
          let e = l(t[1], b);
          let n = s;
          if (r.value === null || e.value === null) {
            return p('NativeFunctionCall.Call BinaryOp values');
          }
          let i = n(r.value, e.value);
          return b.Create(i);
        }
        {
          let t = s;
          if (r.value === null) {
            return p('NativeFunctionCall.Call UnaryOp value');
          }
          let n = t(r.value);
          if (this.name === D.Int) {
            return b.Create(n, i.Int);
          } else if (this.name === D.Float) {
            return b.Create(n, i.Float);
          } else {
            return b.Create(n, e.valueType);
          }
        }
      }
      throw new Error(
        'Unexpected number of parameters to NativeFunctionCall: ' + t.length
      );
    }
    CallBinaryListOperation(t) {
      if (
        (this.name == '+' || this.name == '-') &&
        t[0] instanceof N &&
        t[1] instanceof w
      ) {
        return this.CallListIncrementOperation(t);
      }
      let e = l(t[0], b);
      let n = l(t[1], b);
      if (
        (this.name == '&&' || this.name == '||') &&
        (e.valueType != i.List || n.valueType != i.List)
      ) {
        if (this._operationFuncs === null) {
          return p('NativeFunctionCall._operationFuncs');
        }
        let t = this._operationFuncs.get(i.Int);
        if (t === null) {
          return p('NativeFunctionCall.CallBinaryListOperation op');
        }
        let r = (function(t) {
          if (typeof t == 'boolean') {
            return t;
          }
          throw new Error(t + ' is not a boolean');
        })(t(e.isTruthy ? 1 : 0, n.isTruthy ? 1 : 0));
        return new _(r);
      }
      if (e.valueType == i.List && n.valueType == i.List) {
        return this.CallType([e, n]);
      }
      throw new y(
        'Can not call use ' +
          this.name +
          ' operation on ' +
          i[e.valueType] +
          ' and ' +
          i[n.valueType]
      );
    }
    CallListIncrementOperation(t) {
      let e = l(t[0], N);
      let n = l(t[1], w);
      let r = new S();
      if (e.value === null) {
        return p('NativeFunctionCall.CallListIncrementOperation listVal.value');
      }
      for (let [t, a] of e.value) {
        let s = g.fromSerializedKey(t);
        if (this._operationFuncs === null) {
          return p('NativeFunctionCall._operationFuncs');
        }
        let l = this._operationFuncs.get(i.Int);
        if (n.value === null) {
          return p(
            'NativeFunctionCall.CallListIncrementOperation intVal.value'
          );
        }
        let o = l(a, n.value);
        let u = null;
        if (e.value.origins === null) {
          return p(
            'NativeFunctionCall.CallListIncrementOperation listVal.value.origins'
          );
        }
        for (let t of e.value.origins) {
          if (t.name == s.originName) {
            u = t;
            break;
          }
        }
        if (u != null) {
          let t = u.TryGetItemWithValue(o, g.Null);
          if (t.exists) {
            r.Add(t.result, o);
          }
        }
      }
      return new N(r);
    }
    CoerceValuesToSingleType(t) {
      let e = i.Int;
      let n = null;
      for (let r of t) {
        let t = l(r, b);
        if (t.valueType > e) {
          e = t.valueType;
        }
        if (t.valueType == i.List) {
          n = s(t, N);
        }
      }
      let r = [];
      if (i[e] == i[i.List]) {
        for (let e of t) {
          let t = l(e, b);
          if (t.valueType == i.List) {
            r.push(t);
          } else {
            if (t.valueType != i.Int) {
              const e = i[t.valueType];
              throw new y(
                'Cannot mix Lists and ' + e + ' values in this operation'
              );
            }
            {
              let e = parseInt(t.valueObject);
              n = l(n, N);
              if (n.value === null) {
                return p(
                  'NativeFunctionCall.CoerceValuesToSingleType specialCaseList.value'
                );
              }
              let i = n.value.originOfMaxItem;
              if (i === null) {
                return p('NativeFunctionCall.CoerceValuesToSingleType list');
              }
              let a = i.TryGetItemWithValue(e, g.Null);
              if (!a.exists) {
                throw new y(
                  'Could not find List item with the value ' +
                    e +
                    ' in ' +
                    i.name
                );
              }
              {
                let t = new N(a.result, e);
                r.push(t);
              }
            }
          }
        }
      } else {
        for (let n of t) {
          let t = l(n, b).Cast(e);
          r.push(t);
        }
      }
      return r;
    }
    static Identity(t) {
      return t;
    }
    static GenerateNativeFunctionsIfNecessary() {
      if (this._nativeFunctions == null) {
        this._nativeFunctions = new Map();
        this.AddIntBinaryOp(this.Add, (t, e) => t + e);
        this.AddIntBinaryOp(this.Subtract, (t, e) => t - e);
        this.AddIntBinaryOp(this.Multiply, (t, e) => t * e);
        this.AddIntBinaryOp(this.Divide, (t, e) => Math.floor(t / e));
        this.AddIntBinaryOp(this.Mod, (t, e) => t % e);
        this.AddIntUnaryOp(this.Negate, t => -t);
        this.AddIntBinaryOp(this.Equal, (t, e) => t == e);
        this.AddIntBinaryOp(this.Greater, (t, e) => t > e);
        this.AddIntBinaryOp(this.Less, (t, e) => t < e);
        this.AddIntBinaryOp(this.GreaterThanOrEquals, (t, e) => t >= e);
        this.AddIntBinaryOp(this.LessThanOrEquals, (t, e) => t <= e);
        this.AddIntBinaryOp(this.NotEquals, (t, e) => t != e);
        this.AddIntUnaryOp(this.Not, t => t == 0);
        this.AddIntBinaryOp(this.And, (t, e) => t != 0 && e != 0);
        this.AddIntBinaryOp(this.Or, (t, e) => t != 0 || e != 0);
        this.AddIntBinaryOp(this.Max, (t, e) => Math.max(t, e));
        this.AddIntBinaryOp(this.Min, (t, e) => Math.min(t, e));
        this.AddIntBinaryOp(this.Pow, (t, e) => Math.pow(t, e));
        this.AddIntUnaryOp(this.Floor, D.Identity);
        this.AddIntUnaryOp(this.Ceiling, D.Identity);
        this.AddIntUnaryOp(this.Int, D.Identity);
        this.AddIntUnaryOp(this.Float, t => t);
        this.AddFloatBinaryOp(this.Add, (t, e) => t + e);
        this.AddFloatBinaryOp(this.Subtract, (t, e) => t - e);
        this.AddFloatBinaryOp(this.Multiply, (t, e) => t * e);
        this.AddFloatBinaryOp(this.Divide, (t, e) => t / e);
        this.AddFloatBinaryOp(this.Mod, (t, e) => t % e);
        this.AddFloatUnaryOp(this.Negate, t => -t);
        this.AddFloatBinaryOp(this.Equal, (t, e) => t == e);
        this.AddFloatBinaryOp(this.Greater, (t, e) => t > e);
        this.AddFloatBinaryOp(this.Less, (t, e) => t < e);
        this.AddFloatBinaryOp(this.GreaterThanOrEquals, (t, e) => t >= e);
        this.AddFloatBinaryOp(this.LessThanOrEquals, (t, e) => t <= e);
        this.AddFloatBinaryOp(this.NotEquals, (t, e) => t != e);
        this.AddFloatUnaryOp(this.Not, t => t == 0);
        this.AddFloatBinaryOp(this.And, (t, e) => t != 0 && e != 0);
        this.AddFloatBinaryOp(this.Or, (t, e) => t != 0 || e != 0);
        this.AddFloatBinaryOp(this.Max, (t, e) => Math.max(t, e));
        this.AddFloatBinaryOp(this.Min, (t, e) => Math.min(t, e));
        this.AddFloatBinaryOp(this.Pow, (t, e) => Math.pow(t, e));
        this.AddFloatUnaryOp(this.Floor, t => Math.floor(t));
        this.AddFloatUnaryOp(this.Ceiling, t => Math.ceil(t));
        this.AddFloatUnaryOp(this.Int, t => Math.floor(t));
        this.AddFloatUnaryOp(this.Float, D.Identity);
        this.AddStringBinaryOp(this.Add, (t, e) => t + e);
        this.AddStringBinaryOp(this.Equal, (t, e) => t === e);
        this.AddStringBinaryOp(this.NotEquals, (t, e) => t !== e);
        this.AddStringBinaryOp(this.Has, (t, e) => t.includes(e));
        this.AddStringBinaryOp(this.Hasnt, (t, e) => !t.includes(e));
        this.AddListBinaryOp(this.Add, (t, e) => t.Union(e));
        this.AddListBinaryOp(this.Subtract, (t, e) => t.Without(e));
        this.AddListBinaryOp(this.Has, (t, e) => t.Contains(e));
        this.AddListBinaryOp(this.Hasnt, (t, e) => !t.Contains(e));
        this.AddListBinaryOp(this.Intersect, (t, e) => t.Intersect(e));
        this.AddListBinaryOp(this.Equal, (t, e) => t.Equals(e));
        this.AddListBinaryOp(this.Greater, (t, e) => t.GreaterThan(e));
        this.AddListBinaryOp(this.Less, (t, e) => t.LessThan(e));
        this.AddListBinaryOp(this.GreaterThanOrEquals, (t, e) =>
          t.GreaterThanOrEquals(e)
        );
        this.AddListBinaryOp(this.LessThanOrEquals, (t, e) =>
          t.LessThanOrEquals(e)
        );
        this.AddListBinaryOp(this.NotEquals, (t, e) => !t.Equals(e));
        this.AddListBinaryOp(this.And, (t, e) => t.Count > 0 && e.Count > 0);
        this.AddListBinaryOp(this.Or, (t, e) => t.Count > 0 || e.Count > 0);
        this.AddListUnaryOp(this.Not, t => (t.Count == 0 ? 1 : 0));
        this.AddListUnaryOp(this.Invert, t => t.inverse);
        this.AddListUnaryOp(this.All, t => t.all);
        this.AddListUnaryOp(this.ListMin, t => t.MinAsList());
        this.AddListUnaryOp(this.ListMax, t => t.MaxAsList());
        this.AddListUnaryOp(this.Count, t => t.Count);
        this.AddListUnaryOp(this.ValueOfList, t => t.maxItem.Value);
        let t = (t, e) => t.Equals(e);
        let e = (t, e) => !t.Equals(e);
        this.AddOpToNativeFunc(this.Equal, 2, i.DivertTarget, t);
        this.AddOpToNativeFunc(this.NotEquals, 2, i.DivertTarget, e);
      }
    }
    AddOpFuncForType(t, e) {
      if (this._operationFuncs == null) {
        this._operationFuncs = new Map();
      }
      this._operationFuncs.set(t, e);
    }
    static AddOpToNativeFunc(t, e, n, i) {
      if (this._nativeFunctions === null) {
        return p('NativeFunctionCall._nativeFunctions');
      }
      let r = this._nativeFunctions.get(t);
      if (!r) {
        r = new D(t, e);
        this._nativeFunctions.set(t, r);
      }
      r.AddOpFuncForType(n, i);
    }
    static AddIntBinaryOp(t, e) {
      this.AddOpToNativeFunc(t, 2, i.Int, e);
    }
    static AddIntUnaryOp(t, e) {
      this.AddOpToNativeFunc(t, 1, i.Int, e);
    }
    static AddFloatBinaryOp(t, e) {
      this.AddOpToNativeFunc(t, 2, i.Float, e);
    }
    static AddFloatUnaryOp(t, e) {
      this.AddOpToNativeFunc(t, 1, i.Float, e);
    }
    static AddStringBinaryOp(t, e) {
      this.AddOpToNativeFunc(t, 2, i.String, e);
    }
    static AddListBinaryOp(t, e) {
      this.AddOpToNativeFunc(t, 2, i.List, e);
    }
    static AddListUnaryOp(t, e) {
      this.AddOpToNativeFunc(t, 1, i.List, e);
    }
    toString() {
      return 'Native "' + this.name + '"';
    }
  }
  D.Add = '+';
  D.Subtract = '-';
  D.Divide = '/';
  D.Multiply = '*';
  D.Mod = '%';
  D.Negate = '_';
  D.Equal = '==';
  D.Greater = '>';
  D.Less = '<';
  D.GreaterThanOrEquals = '>=';
  D.LessThanOrEquals = '<=';
  D.NotEquals = '!=';
  D.Not = '!';
  D.And = '&&';
  D.Or = '||';
  D.Min = 'MIN';
  D.Max = 'MAX';
  D.Pow = 'POW';
  D.Floor = 'FLOOR';
  D.Ceiling = 'CEILING';
  D.Int = 'INT';
  D.Float = 'FLOAT';
  D.Has = '?';
  D.Hasnt = '!?';
  D.Intersect = '^';
  D.ListMin = 'LIST_MIN';
  D.ListMax = 'LIST_MAX';
  D.All = 'LIST_ALL';
  D.Count = 'LIST_COUNT';
  D.ValueOfList = 'LIST_VALUE';
  D.Invert = 'LIST_INVERT';
  D._nativeFunctions = null;
  class B extends m {
    constructor(t) {
      super();
      this.text = t.toString() || '';
    }
    toString() {
      return '# ' + this.text;
    }
  }
  class G extends m {
    constructor() {
      super(...arguments);
      this.text = '';
      this.index = 0;
      this.threadAtGeneration = null;
      this.sourcePath = '';
      this.targetPath = null;
      this.isInvisibleDefault = false;
      this.originalThreadIndex = 0;
    }
    get pathStringOnChoice() {
      if (this.targetPath === null) {
        return p('Choice.targetPath');
      } else {
        return this.targetPath.toString();
      }
    }
    set pathStringOnChoice(t) {
      this.targetPath = new e(t);
    }
  }
  class M {
    constructor(t, e) {
      this._name = t || '';
      this._items = null;
      this._itemNameToValues = e || new Map();
    }
    get name() {
      return this._name;
    }
    get items() {
      if (this._items == null) {
        this._items = new Map();
        for (let [t, e] of this._itemNameToValues) {
          let n = new g(this.name, t);
          this._items.set(n.serialized(), e);
        }
      }
      return this._items;
    }
    ValueForItem(t) {
      if (!t.itemName) {
        return 0;
      }
      let e = this._itemNameToValues.get(t.itemName);
      if (e === void 0) {
        return 0;
      } else {
        return e;
      }
    }
    ContainsItem(t) {
      return (
        !!t.itemName &&
        (t.originName == this.name && this._itemNameToValues.has(t.itemName))
      );
    }
    ContainsItemWithName(t) {
      return this._itemNameToValues.has(t);
    }
    TryGetItemWithValue(t, e) {
      for (let [e, n] of this._itemNameToValues) {
        if (n == t) {
          return { result: new g(this.name, e), exists: true };
        }
      }
      return { result: g.Null, exists: false };
    }
    TryGetValueForItem(t, e) {
      if (!t.itemName) {
        return { result: 0, exists: false };
      }
      let n = this._itemNameToValues.get(t.itemName);
      if (n) {
        return { result: n, exists: true };
      } else {
        return { result: 0, exists: false };
      }
    }
  }
  class J {
    constructor(t) {
      this._lists = new Map();
      this._allUnambiguousListValueCache = new Map();
      for (let e of t) {
        this._lists.set(e.name, e);
        for (let [t, n] of e.items) {
          let e = g.fromSerializedKey(t);
          let i = new N(e, n);
          if (!e.itemName) {
            throw new Error('item.itemName is null or undefined.');
          }
          this._allUnambiguousListValueCache.set(e.itemName, i);
          this._allUnambiguousListValueCache.set(e.fullName, i);
        }
      }
    }
    get lists() {
      let t = [];
      for (let [, e] of this._lists) {
        t.push(e);
      }
      return t;
    }
    TryListGetDefinition(t, e) {
      if (t === null) {
        return { result: e, exists: false };
      }
      let n = this._lists.get(t);
      if (n) {
        return { result: n, exists: true };
      } else {
        return { result: e, exists: false };
      }
    }
    FindSingleItemListWithName(t) {
      if (t === null) {
        return p('name');
      }
      let e = this._allUnambiguousListValueCache.get(t);
      if (e === void 0) {
        return null;
      } else {
        return e;
      }
    }
  }
  class q {
    static JArrayToRuntimeObjList(t, e = false) {
      let n = t.length;
      if (e) {
        n--;
      }
      let i = [];
      for (let e = 0; e < n; e++) {
        let n = t[e];
        let r = this.JTokenToRuntimeObject(n);
        if (r === null) {
          return p('runtimeObj');
        }
        i.push(r);
      }
      return i;
    }
    static WriteDictionaryRuntimeObjs(t, e) {
      t.WriteObjectStart();
      for (let [n, i] of e) {
        t.WritePropertyStart(n);
        this.WriteRuntimeObject(t, i);
        t.WritePropertyEnd();
      }
      t.WriteObjectEnd();
    }
    static WriteListRuntimeObjs(t, e) {
      t.WriteArrayStart();
      for (let n of e) {
        this.WriteRuntimeObject(t, n);
      }
      t.WriteArrayEnd();
    }
    static WriteIntDictionary(t, e) {
      t.WriteObjectStart();
      for (let [n, i] of e) {
        t.WriteIntProperty(n, i);
      }
      t.WriteObjectEnd();
    }
    static WriteRuntimeObject(t, e) {
      let n = s(e, x);
      if (n) {
        this.WriteRuntimeContainer(t, n);
        return;
      }
      let i = s(e, W);
      if (i) {
        let e;
        let n = '->';
        if (i.isExternal) {
          n = 'x()';
        } else if (i.pushesToStack) {
          if (i.stackPushType == r.Function) {
            n = 'f()';
          } else if (i.stackPushType == r.Tunnel) {
            n = '->t->';
          }
        }
        e = i.hasVariableTarget ? i.variableDivertName : i.targetPathString;
        t.WriteObjectStart();
        t.WriteProperty(n, e);
        if (i.hasVariableTarget) {
          t.WriteProperty('var', true);
        }
        if (i.isConditional) {
          t.WriteProperty('c', true);
        }
        if (i.externalArgs > 0) {
          t.WriteIntProperty('exArgs', i.externalArgs);
        }
        t.WriteObjectEnd();
        return;
      }
      let a = s(e, V);
      if (a) {
        t.WriteObjectStart();
        t.WriteProperty('*', a.pathStringOnChoice);
        t.WriteIntProperty('flg', a.flags);
        t.WriteObjectEnd();
        return;
      }
      let l = s(e, _);
      if (l) {
        t.WriteBool(l.value);
        return;
      }
      let o = s(e, w);
      if (o) {
        t.WriteInt(o.value);
        return;
      }
      let u = s(e, T);
      if (u) {
        t.WriteFloat(u.value);
        return;
      }
      let h = s(e, E);
      if (h) {
        if (h.isNewline) {
          t.Write('\n', false);
        } else {
          t.WriteStringStart();
          t.WriteStringInner('^');
          t.WriteStringInner(h.value);
          t.WriteStringEnd();
        }
        return;
      }
      let c = s(e, N);
      if (c) {
        this.WriteInkList(t, c);
        return;
      }
      let d = s(e, P);
      if (d) {
        t.WriteObjectStart();
        if (d.value === null) {
          return p('divTargetVal.value');
        } else {
          t.WriteProperty('^->', d.value.componentsString);
          t.WriteObjectEnd();
          return;
        }
      }
      let m = s(e, O);
      if (m) {
        t.WriteObjectStart();
        t.WriteProperty('^var', m.value);
        t.WriteIntProperty('ci', m.contextIndex);
        t.WriteObjectEnd();
        return;
      }
      if (s(e, I)) {
        t.Write('<>');
        return;
      }
      let f = s(e, k);
      if (f) {
        t.Write(q._controlCommandNames[f.commandType]);
        return;
      }
      let g = s(e, D);
      if (g) {
        let e = g.name;
        if (e == '^') {
          e = 'L^';
        }
        t.Write(e);
        return;
      }
      let S = s(e, L);
      if (S) {
        t.WriteObjectStart();
        let e = S.pathStringForCount;
        if (e == null) {
          t.WriteProperty('VAR?', S.name);
        } else {
          t.WriteProperty('CNT?', e);
        }
        t.WriteObjectEnd();
        return;
      }
      let y = s(e, R);
      if (y) {
        t.WriteObjectStart();
        let e = y.isGlobal ? 'VAR=' : 'temp=';
        t.WriteProperty(e, y.variableName);
        if (!y.isNewDeclaration) {
          t.WriteProperty('re', true);
        }
        t.WriteObjectEnd();
        return;
      }
      if (s(e, j)) {
        t.Write('void');
        return;
      }
      let C = s(e, B);
      if (C) {
        t.WriteObjectStart();
        t.WriteProperty('#', C.text);
        t.WriteObjectEnd();
        return;
      }
      let v = s(e, G);
      if (!v) {
        throw new Error('Failed to convert runtime object to Json token: ' + e);
      }
      this.WriteChoice(t, v);
    }
    static JObjectToDictionaryRuntimeObjs(t) {
      let e = new Map();
      for (let n in t) {
        if (t.hasOwnProperty(n)) {
          let i = this.JTokenToRuntimeObject(t[n]);
          if (i === null) {
            return p('inkObject');
          }
          e.set(n, i);
        }
      }
      return e;
    }
    static JObjectToIntDictionary(t) {
      let e = new Map();
      for (let n in t) {
        if (t.hasOwnProperty(n)) {
          e.set(n, parseInt(t[n]));
        }
      }
      return e;
    }
    static JTokenToRuntimeObject(t) {
      if ((typeof t == 'number' && !isNaN(t)) || typeof t == 'boolean') {
        return b.Create(t);
      }
      if (typeof t == 'string') {
        let e = t.toString();
        let n = e[0];
        if (n == '^') {
          return new E(e.substring(1));
        }
        if (n == '\n' && e.length == 1) {
          return new E('\n');
        }
        if (e == '<>') {
          return new I();
        }
        for (let t = 0; t < q._controlCommandNames.length; ++t) {
          if (e == q._controlCommandNames[t]) {
            return new k(t);
          }
        }
        if (e == 'L^') {
          e = '^';
        }
        if (D.CallExistsWithName(e)) {
          return D.CallWithName(e);
        }
        if (e == '->->') {
          return k.PopTunnel();
        }
        if (e == '~ret') {
          return k.PopFunction();
        }
        if (e == 'void') {
          return new j();
        }
      }
      if (typeof t == 'object' && !Array.isArray(t)) {
        let n;
        let i = t;
        if (i['^->']) {
          n = i['^->'];
          return new P(new e(n.toString()));
        }
        if (i['^var']) {
          n = i['^var'];
          let t = new O(n.toString());
          if ('ci' in i) {
            n = i.ci;
            t.contextIndex = parseInt(n);
          }
          return t;
        }
        let a = false;
        let s = false;
        let l = r.Function;
        let o = false;
        if ((n = i['->'])) {
          a = true;
        } else if ((n = i['f()'])) {
          a = true;
          s = true;
          l = r.Function;
        } else if ((n = i['->t->'])) {
          a = true;
          s = true;
          l = r.Tunnel;
        } else if ((n = i['x()'])) {
          a = true;
          o = true;
          s = false;
          l = r.Function;
        }
        if (a) {
          let t = new W();
          t.pushesToStack = s;
          t.stackPushType = l;
          t.isExternal = o;
          let e = n.toString();
          if ((n = i.var)) {
            t.variableDivertName = e;
          } else {
            t.targetPathString = e;
          }
          t.isConditional = !!i.c;
          if (o && (n = i.exArgs)) {
            t.externalArgs = parseInt(n);
          }
          return t;
        }
        if ((n = i['*'])) {
          let t = new V();
          t.pathStringOnChoice = n.toString();
          if ((n = i.flg)) {
            t.flags = parseInt(n);
          }
          return t;
        }
        if ((n = i['VAR?'])) {
          return new L(n.toString());
        }
        if ((n = i['CNT?'])) {
          let t = new L();
          t.pathStringForCount = n.toString();
          return t;
        }
        let u = false;
        let h = false;
        if ((n = i['VAR='])) {
          u = true;
          h = true;
        } else if ((n = i['temp='])) {
          u = true;
          h = false;
        }
        if (u) {
          let t = n.toString();
          let e = !i.re;
          let r = new R(t, e);
          r.isGlobal = h;
          return r;
        }
        if (i['#'] !== void 0) {
          n = i['#'];
          return new B(n.toString());
        }
        if ((n = i.list)) {
          let t = n;
          let e = new S();
          if ((n = i.origins)) {
            let t = n;
            e.SetInitialOriginNames(t);
          }
          for (let n in t) {
            if (t.hasOwnProperty(n)) {
              let i = t[n];
              let r = new g(n);
              let a = parseInt(i);
              e.Add(r, a);
            }
          }
          return new N(e);
        }
        if (i.originalChoicePath != null) {
          return this.JObjectToChoice(i);
        }
      }
      if (Array.isArray(t)) {
        return this.JArrayToContainer(t);
      }
      if (t == null) {
        return null;
      }
      throw new Error(
        'Failed to convert token to runtime object: ' + JSON.stringify(t)
      );
    }
    static WriteRuntimeContainer(t, e, n = false) {
      t.WriteArrayStart();
      if (e === null) {
        return p('container');
      }
      for (let n of e.content) {
        this.WriteRuntimeObject(t, n);
      }
      let i = e.namedOnlyContent;
      let r = e.countFlags;
      let a = e.name != null && !n;
      let l = i != null || r > 0 || a;
      if (l) {
        t.WriteObjectStart();
      }
      if (i != null) {
        for (let [e, n] of i) {
          let i = e;
          let r = s(n, x);
          t.WritePropertyStart(i);
          this.WriteRuntimeContainer(t, r, true);
          t.WritePropertyEnd();
        }
      }
      if (a) {
        t.WriteProperty('#n', e.name);
      }
      if (l) {
        t.WriteObjectEnd();
      } else {
        t.WriteNull();
      }
      t.WriteArrayEnd();
    }
    static JArrayToContainer(t) {
      let e = new x();
      e.content = this.JArrayToRuntimeObjList(t, true);
      let n = t[t.length - 1];
      if (n != null) {
        let t = new Map();
        for (let i in n) {
          if (i == '#f') {
            e.countFlags = parseInt(n[i]);
          } else if (i == '#n') {
            e.name = n[i].toString();
          } else {
            let e = this.JTokenToRuntimeObject(n[i]);
            let r = s(e, x);
            if (r) {
              r.name = i;
            }
            t.set(i, e);
          }
        }
        e.namedOnlyContent = t;
      }
      return e;
    }
    static JObjectToChoice(t) {
      let e = new G();
      e.text = t.text.toString();
      e.index = parseInt(t.index);
      e.sourcePath = t.originalChoicePath.toString();
      e.originalThreadIndex = parseInt(t.originalThreadIndex);
      e.pathStringOnChoice = t.targetPath.toString();
      return e;
    }
    static WriteChoice(t, e) {
      t.WriteObjectStart();
      t.WriteProperty('text', e.text);
      t.WriteIntProperty('index', e.index);
      t.WriteProperty('originalChoicePath', e.sourcePath);
      t.WriteIntProperty('originalThreadIndex', e.originalThreadIndex);
      t.WriteProperty('targetPath', e.pathStringOnChoice);
      t.WriteObjectEnd();
    }
    static WriteInkList(t, e) {
      let n = e.value;
      if (n === null) {
        return p('rawList');
      }
      t.WriteObjectStart();
      t.WritePropertyStart('list');
      t.WriteObjectStart();
      for (let [e, i] of n) {
        let n = g.fromSerializedKey(e);
        let r = i;
        if (n.itemName === null) {
          return p('item.itemName');
        }
        t.WritePropertyNameStart();
        t.WritePropertyNameInner(n.originName ? n.originName : '?');
        t.WritePropertyNameInner('.');
        t.WritePropertyNameInner(n.itemName);
        t.WritePropertyNameEnd();
        t.Write(r);
        t.WritePropertyEnd();
      }
      t.WriteObjectEnd();
      t.WritePropertyEnd();
      if (n.Count == 0 && n.originNames != null && n.originNames.length > 0) {
        t.WritePropertyStart('origins');
        t.WriteArrayStart();
        for (let e of n.originNames) {
          t.Write(e);
        }
        t.WriteArrayEnd();
        t.WritePropertyEnd();
      }
      t.WriteObjectEnd();
    }
    static ListDefinitionsToJToken(t) {
      let e = {};
      for (let n of t.lists) {
        let t = {};
        for (let [e, i] of n.items) {
          let n = g.fromSerializedKey(e);
          if (n.itemName === null) {
            return p('item.itemName');
          }
          t[n.itemName] = i;
        }
        e[n.name] = t;
      }
      return e;
    }
    static JTokenToListDefinitions(t) {
      let e = t;
      let n = [];
      for (let t in e) {
        if (e.hasOwnProperty(t)) {
          let i = t.toString();
          let r = e[t];
          let a = new Map();
          for (let n in r) {
            if (e.hasOwnProperty(t)) {
              let t = r[n];
              a.set(n, parseInt(t));
            }
          }
          let s = new M(i, a);
          n.push(s);
        }
      }
      return new J(n);
    }
  }
  q._controlCommandNames = (() => {
    let t = [];
    t[k.CommandType.EvalStart] = 'ev';
    t[k.CommandType.EvalOutput] = 'out';
    t[k.CommandType.EvalEnd] = '/ev';
    t[k.CommandType.Duplicate] = 'du';
    t[k.CommandType.PopEvaluatedValue] = 'pop';
    t[k.CommandType.PopFunction] = '~ret';
    t[k.CommandType.PopTunnel] = '->->';
    t[k.CommandType.BeginString] = 'str';
    t[k.CommandType.EndString] = '/str';
    t[k.CommandType.NoOp] = 'nop';
    t[k.CommandType.ChoiceCount] = 'choiceCnt';
    t[k.CommandType.Turns] = 'turn';
    t[k.CommandType.TurnsSince] = 'turns';
    t[k.CommandType.ReadCount] = 'readc';
    t[k.CommandType.Random] = 'rnd';
    t[k.CommandType.SeedRandom] = 'srnd';
    t[k.CommandType.VisitIndex] = 'visit';
    t[k.CommandType.SequenceShuffleIndex] = 'seq';
    t[k.CommandType.StartThread] = 'thread';
    t[k.CommandType.Done] = 'done';
    t[k.CommandType.End] = 'end';
    t[k.CommandType.ListFromInt] = 'listInt';
    t[k.CommandType.ListRange] = 'range';
    t[k.CommandType.ListRandom] = 'lrnd';
    for (let e = 0; e < k.CommandType.TOTAL_VALUES; ++e) {
      if (t[e] == null) {
        throw new Error('Control command not accounted for in serialisation');
      }
    }
    return t;
  })();
  class U {
    constructor() {
      this._threadCounter = 0;
      this._startOfRoot = F.Null;
      if (arguments[0] instanceof Z) {
        let t = arguments[0];
        this._startOfRoot = F.StartOf(t.rootContentContainer);
        this.Reset();
      } else {
        let t = arguments[0];
        this._threads = [];
        for (let e of t._threads) {
          this._threads.push(e.Copy());
        }
        this._threadCounter = t._threadCounter;
        this._startOfRoot = t._startOfRoot.copy();
      }
    }
    get elements() {
      return this.callStack;
    }
    get depth() {
      return this.elements.length;
    }
    get currentElement() {
      let t = this._threads[this._threads.length - 1].callstack;
      return t[t.length - 1];
    }
    get currentElementIndex() {
      return this.callStack.length - 1;
    }
    get currentThread() {
      return this._threads[this._threads.length - 1];
    }
    set currentThread(t) {
      n.Assert(
        this._threads.length == 1,
        "Shouldn't be directly setting the current thread when we have a stack of them"
      );
      this._threads.length = 0;
      this._threads.push(t);
    }
    get canPop() {
      return this.callStack.length > 1;
    }
    Reset() {
      this._threads = [];
      this._threads.push(new U.Thread());
      this._threads[0].callstack.push(
        new U.Element(r.Tunnel, this._startOfRoot)
      );
    }
    SetJsonToken(t, e) {
      this._threads.length = 0;
      let n = t.threads;
      for (let t of n) {
        let n = t;
        let i = new U.Thread(n, e);
        this._threads.push(i);
      }
      this._threadCounter = parseInt(t.threadCounter);
      this._startOfRoot = F.StartOf(e.rootContentContainer);
    }
    WriteJson(t) {
      t.WriteObject(t => {
        t.WritePropertyStart('threads');
        t.WriteArrayStart();
        for (let e of this._threads) {
          e.WriteJson(t);
        }
        t.WriteArrayEnd();
        t.WritePropertyEnd();
        t.WritePropertyStart('threadCounter');
        t.WriteInt(this._threadCounter);
        t.WritePropertyEnd();
      });
    }
    PushThread() {
      let t = this.currentThread.Copy();
      this._threadCounter++;
      t.threadIndex = this._threadCounter;
      this._threads.push(t);
    }
    ForkThread() {
      let t = this.currentThread.Copy();
      this._threadCounter++;
      t.threadIndex = this._threadCounter;
      return t;
    }
    PopThread() {
      if (!this.canPopThread) {
        throw new Error("Can't pop thread");
      }
      this._threads.splice(this._threads.indexOf(this.currentThread), 1);
    }
    get canPopThread() {
      return this._threads.length > 1 && !this.elementIsEvaluateFromGame;
    }
    get elementIsEvaluateFromGame() {
      return this.currentElement.type == r.FunctionEvaluationFromGame;
    }
    Push(t, e = 0, n = 0) {
      let i = new U.Element(t, this.currentElement.currentPointer, false);
      i.evaluationStackHeightWhenPushed = e;
      i.functionStartInOutputStream = n;
      this.callStack.push(i);
    }
    CanPop(t = null) {
      return !!this.canPop && (t == null || this.currentElement.type == t);
    }
    Pop(t = null) {
      if (!this.CanPop(t)) {
        throw new Error('Mismatched push/pop in Callstack');
      }
      this.callStack.pop();
    }
    GetTemporaryVariableWithName(t, e = -1) {
      if (e == -1) {
        e = this.currentElementIndex + 1;
      }
      let n = C(this.callStack[e - 1].temporaryVariables, t, null);
      if (n.exists) {
        return n.result;
      } else {
        return null;
      }
    }
    SetTemporaryVariable(t, e, n, i = -1) {
      if (i == -1) {
        i = this.currentElementIndex + 1;
      }
      let r = this.callStack[i - 1];
      if (!n && !r.temporaryVariables.get(t)) {
        throw new Error('Could not find temporary variable to set: ' + t);
      }
      let a = C(r.temporaryVariables, t, null);
      if (a.exists) {
        N.RetainListOriginsForAssignment(a.result, e);
      }
      r.temporaryVariables.set(t, e);
    }
    ContextForVariableNamed(t) {
      if (this.currentElement.temporaryVariables.get(t)) {
        return this.currentElementIndex + 1;
      } else {
        return 0;
      }
    }
    ThreadWithIndex(t) {
      let e = this._threads.filter(e => {
        if (e.threadIndex == t) {
          return e;
        }
      });
      if (e.length > 0) {
        return e[0];
      } else {
        return null;
      }
    }
    get callStack() {
      return this.currentThread.callstack;
    }
    get callStackTrace() {
      let t = new f();
      for (let e = 0; e < this._threads.length; e++) {
        let n = this._threads[e];
        let i = e == this._threads.length - 1;
        t.AppendFormat(
          '=== THREAD {0}/{1} {2}===\n',
          e + 1,
          this._threads.length,
          i ? '(current) ' : ''
        );
        for (let e = 0; e < n.callstack.length; e++) {
          if (n.callstack[e].type == r.Function) {
            t.Append('  [FUNCTION] ');
          } else {
            t.Append('  [TUNNEL] ');
          }
          let i = n.callstack[e].currentPointer;
          if (!i.isNull) {
            t.Append('<SOMEWHERE IN ');
            if (i.container === null) {
              return p('pointer.container');
            }
            t.Append(i.container.path.toString());
            t.AppendLine('>');
          }
        }
      }
      return t.toString();
    }
  }
  (function(t) {
    class n {
      constructor(t, e, n = false) {
        this.evaluationStackHeightWhenPushed = 0;
        this.functionStartInOutputStream = 0;
        this.currentPointer = e.copy();
        this.inExpressionEvaluation = n;
        this.temporaryVariables = new Map();
        this.type = t;
      }
      Copy() {
        let t = new n(
          this.type,
          this.currentPointer,
          this.inExpressionEvaluation
        );
        t.temporaryVariables = new Map(this.temporaryVariables);
        t.evaluationStackHeightWhenPushed = this.evaluationStackHeightWhenPushed;
        t.functionStartInOutputStream = this.functionStartInOutputStream;
        return t;
      }
    }
    t.Element = n;
    class i {
      constructor() {
        this.threadIndex = 0;
        this.previousPointer = F.Null;
        this.callstack = [];
        if (arguments[0] && arguments[1]) {
          let t = arguments[0];
          let i = arguments[1];
          this.threadIndex = parseInt(t.threadIndex);
          let r = t.callstack;
          for (let t of r) {
            let r;
            let a = t;
            let s = parseInt(a.type);
            let l = F.Null;
            let o = a.cPath;
            if (o !== void 0) {
              r = o.toString();
              let t = i.ContentAtPath(new e(r));
              l.container = t.container;
              l.index = parseInt(a.idx);
              if (t.obj == null) {
                throw new Error(
                  "When loading state, internal story location couldn't be found: " +
                    r +
                    '. Has the story changed since this save data was created?'
                );
              }
              if (t.approximate) {
                if (l.container === null) {
                  return p('pointer.container');
                }
                i.Warning(
                  "When loading state, exact internal story location couldn't be found: '" +
                    r +
                    "', so it was approximated to '" +
                    l.container.path.toString() +
                    "' to recover. Has the story changed since this save data was created?"
                );
              }
            }
            let u = !!a.exp;
            let h = new n(s, l, u);
            let c = a.temp;
            if (c === void 0) {
              h.temporaryVariables.clear();
            } else {
              h.temporaryVariables = q.JObjectToDictionaryRuntimeObjs(c);
            }
            this.callstack.push(h);
          }
          let a = t.previousContentObject;
          if (a !== void 0) {
            let t = new e(a.toString());
            this.previousPointer = i.PointerAtPath(t);
          }
        }
      }
      Copy() {
        let t = new i();
        t.threadIndex = this.threadIndex;
        for (let e of this.callstack) {
          t.callstack.push(e.Copy());
        }
        t.previousPointer = this.previousPointer.copy();
        return t;
      }
      WriteJson(t) {
        t.WriteObjectStart();
        t.WritePropertyStart('callstack');
        t.WriteArrayStart();
        for (let e of this.callstack) {
          t.WriteObjectStart();
          if (!e.currentPointer.isNull) {
            if (e.currentPointer.container === null) {
              return p('el.currentPointer.container');
            }
            t.WriteProperty(
              'cPath',
              e.currentPointer.container.path.componentsString
            );
            t.WriteIntProperty('idx', e.currentPointer.index);
          }
          t.WriteProperty('exp', e.inExpressionEvaluation);
          t.WriteIntProperty('type', e.type);
          if (e.temporaryVariables.size > 0) {
            t.WritePropertyStart('temp');
            q.WriteDictionaryRuntimeObjs(t, e.temporaryVariables);
            t.WritePropertyEnd();
          }
          t.WriteObjectEnd();
        }
        t.WriteArrayEnd();
        t.WritePropertyEnd();
        t.WriteIntProperty('threadIndex', this.threadIndex);
        if (!this.previousPointer.isNull) {
          let e = this.previousPointer.Resolve();
          if (e === null) {
            return p('this.previousPointer.Resolve()');
          }
          t.WriteProperty('previousContentObject', e.path.toString());
        }
        t.WriteObjectEnd();
      }
    }
    t.Thread = i;
  })(U || (U = {}));
  class K {
    constructor(t, e) {
      this.variableChangedEventCallbacks = [];
      this.patch = null;
      this._batchObservingVariableChanges = false;
      this._defaultGlobalVariables = new Map();
      this._changedVariablesForBatchObs = new Set();
      this._globalVariables = new Map();
      this._callStack = t;
      this._listDefsOrigin = e;
      try {
        return new Proxy(this, {
          get: (t, e) => (e in t ? t[e] : t.$(e)),
          set: (t, e, n) => (e in t ? (t[e] = n) : t.$(e, n), true),
        });
      } catch (t) {}
    }
    variableChangedEvent(t, e) {
      for (let n of this.variableChangedEventCallbacks) {
        n(t, e);
      }
    }
    get batchObservingVariableChanges() {
      return this._batchObservingVariableChanges;
    }
    set batchObservingVariableChanges(t) {
      this._batchObservingVariableChanges = t;
      if (t) {
        this._changedVariablesForBatchObs = new Set();
      } else if (this._changedVariablesForBatchObs != null) {
        for (let t of this._changedVariablesForBatchObs) {
          let e = this._globalVariables.get(t);
          if (e) {
            this.variableChangedEvent(t, e);
          } else {
            p('currentValue');
          }
        }
        this._changedVariablesForBatchObs = null;
      }
    }
    get callStack() {
      return this._callStack;
    }
    set callStack(t) {
      this._callStack = t;
    }
    $(t, e) {
      if (e === void 0) {
        let e = null;
        if (
          this.patch !== null &&
          ((e = this.patch.TryGetGlobal(t, null)), e.exists)
        ) {
          return e.result.valueObject;
        } else {
          e = this._globalVariables.get(t);
          if (e === void 0) {
            e = this._defaultGlobalVariables.get(t);
          }
          if (e === void 0) {
            return null;
          } else {
            return e.valueObject;
          }
        }
      }
      {
        if (this._defaultGlobalVariables.get(t) === void 0) {
          throw new y(
            'Cannot assign to a variable (' +
              t +
              ") that hasn't been declared in the story"
          );
        }
        let n = b.Create(e);
        if (n == null) {
          throw e == null
            ? new Error('Cannot pass null to VariableState')
            : new Error(
                'Invalid value passed to VariableState: ' + e.toString()
              );
        }
        this.SetGlobal(t, n);
      }
    }
    ApplyPatch() {
      if (this.patch === null) {
        return p('this.patch');
      }
      for (let [t, e] of this.patch.globals) {
        this._globalVariables.set(t, e);
      }
      if (this._changedVariablesForBatchObs !== null) {
        for (let t of this.patch.changedVariables) {
          this._changedVariablesForBatchObs.add(t);
        }
      }
      this.patch = null;
    }
    SetJsonToken(t) {
      this._globalVariables.clear();
      for (let [e, n] of this._defaultGlobalVariables) {
        let i = t[e];
        if (i === void 0) {
          this._globalVariables.set(e, n);
        } else {
          let t = q.JTokenToRuntimeObject(i);
          if (t === null) {
            return p('tokenInkObject');
          }
          this._globalVariables.set(e, t);
        }
      }
    }
    WriteJson(t) {
      t.WriteObjectStart();
      for (let [e, n] of this._globalVariables) {
        let i = e;
        let r = n;
        if (K.dontSaveDefaultValues && this._defaultGlobalVariables.has(i)) {
          let t = this._defaultGlobalVariables.get(i);
          if (this.RuntimeObjectsEqual(r, t)) {
            continue;
          }
        }
        t.WritePropertyStart(i);
        q.WriteRuntimeObject(t, r);
        t.WritePropertyEnd();
      }
      t.WriteObjectEnd();
    }
    RuntimeObjectsEqual(t, e) {
      if (t === null) {
        return p('obj1');
      }
      if (e === null) {
        return p('obj2');
      }
      if (t.constructor !== e.constructor) {
        return false;
      }
      let n = s(t, _);
      if (n !== null) {
        return n.value === l(e, _).value;
      }
      let i = s(t, w);
      if (i !== null) {
        return i.value === l(e, w).value;
      }
      let r = s(t, T);
      if (r !== null) {
        return r.value === l(e, T).value;
      }
      let a = s(t, b);
      let o = s(e, b);
      if (a !== null && o !== null) {
        if (h(a.valueObject) && h(o.valueObject)) {
          return a.valueObject.Equals(o.valueObject);
        } else {
          return a.valueObject === o.valueObject;
        }
      }
      throw new Error(
        'FastRoughDefinitelyEquals: Unsupported runtime object type: ' +
          t.constructor.name
      );
    }
    GetVariableWithName(t, e = -1) {
      let n = this.GetRawVariableWithName(t, e);
      let i = s(n, O);
      if (i !== null) {
        n = this.ValueAtVariablePointer(i);
      }
      return n;
    }
    TryGetDefaultVariableValue(t) {
      let e = C(this._defaultGlobalVariables, t, null);
      if (e.exists) {
        return e.result;
      } else {
        return null;
      }
    }
    GlobalVariableExistsWithName(t) {
      return (
        this._globalVariables.has(t) ||
        (this._defaultGlobalVariables !== null &&
          this._defaultGlobalVariables.has(t))
      );
    }
    GetRawVariableWithName(t, e) {
      let n = null;
      if (e == 0 || e == -1) {
        let e = null;
        if (
          this.patch !== null &&
          ((e = this.patch.TryGetGlobal(t, null)), e.exists)
        ) {
          return e.result;
        }
        e = C(this._globalVariables, t, null);
        if (e.exists) {
          return e.result;
        }
        if (
          this._defaultGlobalVariables !== null &&
          ((e = C(this._defaultGlobalVariables, t, null)), e.exists)
        ) {
          return e.result;
        }
        if (this._listDefsOrigin === null) {
          return p('VariablesState._listDefsOrigin');
        }
        let n = this._listDefsOrigin.FindSingleItemListWithName(t);
        if (n) {
          return n;
        }
      }
      n = this._callStack.GetTemporaryVariableWithName(t, e);
      return n;
    }
    ValueAtVariablePointer(t) {
      return this.GetVariableWithName(t.variableName, t.contextIndex);
    }
    Assign(t, e) {
      let n = t.variableName;
      if (n === null) {
        return p('name');
      }
      let i = -1;
      let r = false;
      r = t.isNewDeclaration
        ? t.isGlobal
        : this.GlobalVariableExistsWithName(n);
      if (t.isNewDeclaration) {
        let t = s(e, O);
        if (t !== null) {
          e = this.ResolveVariablePointer(t);
        }
      } else {
        let t = null;
        do {
          t = s(this.GetRawVariableWithName(n, i), O);
          if (t != null) {
            n = t.variableName;
            i = t.contextIndex;
            r = i == 0;
          }
        } while (t != null);
      }
      if (r) {
        this.SetGlobal(n, e);
      } else {
        this._callStack.SetTemporaryVariable(n, e, t.isNewDeclaration, i);
      }
    }
    SnapshotDefaultGlobals() {
      this._defaultGlobalVariables = new Map(this._globalVariables);
    }
    RetainListOriginsForAssignment(t, e) {
      let n = l(t, N);
      let i = l(e, N);
      if (n.value && i.value && i.value.Count == 0) {
        i.value.SetInitialOriginNames(n.value.originNames);
      }
    }
    SetGlobal(t, e) {
      let n = null;
      if (this.patch === null) {
        n = C(this._globalVariables, t, null);
      }
      if (this.patch !== null) {
        n = this.patch.TryGetGlobal(t, null);
        if (!n.exists) {
          n = C(this._globalVariables, t, null);
        }
      }
      N.RetainListOriginsForAssignment(n.result, e);
      if (t === null) {
        return p('variableName');
      }
      if (this.patch === null) {
        this._globalVariables.set(t, e);
      } else {
        this.patch.SetGlobal(t, e);
      }
      if (this.variableChangedEvent !== null && n !== null && e !== n.result) {
        if (this.batchObservingVariableChanges) {
          if (this._changedVariablesForBatchObs === null) {
            return p('this._changedVariablesForBatchObs');
          }
          if (this.patch === null) {
            if (this._changedVariablesForBatchObs !== null) {
              this._changedVariablesForBatchObs.add(t);
            }
          } else {
            this.patch.AddChangedVariable(t);
          }
        } else {
          this.variableChangedEvent(t, e);
        }
      }
    }
    ResolveVariablePointer(t) {
      let e = t.contextIndex;
      if (e == -1) {
        e = this.GetContextIndexOfVariableNamed(t.variableName);
      }
      let n = s(this.GetRawVariableWithName(t.variableName, e), O);
      if (n == null) {
        return new O(t.variableName, e);
      } else {
        return n;
      }
    }
    GetContextIndexOfVariableNamed(t) {
      if (this.GlobalVariableExistsWithName(t)) {
        return 0;
      } else {
        return this._callStack.currentElementIndex;
      }
    }
    ObserveVariableChange(t) {
      this.variableChangedEventCallbacks.push(t);
    }
  }
  K.dontSaveDefaultValues = true;
  class z {
    constructor(t) {
      this.seed = t % 2147483647;
      if (this.seed <= 0) {
        this.seed += 2147483646;
      }
    }
    next() {
      return (this.seed = (16807 * this.seed) % 2147483647);
    }
    nextFloat() {
      return (this.next() - 1) / 2147483646;
    }
  }
  class H {
    constructor() {
      this._changedVariables = new Set();
      this._visitCounts = new Map();
      this._turnIndices = new Map();
      if (arguments.length === 1 && arguments[0] !== null) {
        let t = arguments[0];
        this._globals = new Map(t._globals);
        this._changedVariables = new Set(t._changedVariables);
        this._visitCounts = new Map(t._visitCounts);
        this._turnIndices = new Map(t._turnIndices);
      } else {
        this._globals = new Map();
        this._changedVariables = new Set();
        this._visitCounts = new Map();
        this._turnIndices = new Map();
      }
    }
    get globals() {
      return this._globals;
    }
    get changedVariables() {
      return this._changedVariables;
    }
    get visitCounts() {
      return this._visitCounts;
    }
    get turnIndices() {
      return this._turnIndices;
    }
    TryGetGlobal(t, e) {
      if (t !== null && this._globals.has(t)) {
        return { result: this._globals.get(t), exists: true };
      } else {
        return { result: e, exists: false };
      }
    }
    SetGlobal(t, e) {
      this._globals.set(t, e);
    }
    AddChangedVariable(t) {
      return this._changedVariables.add(t);
    }
    TryGetVisitCount(t, e) {
      if (this._visitCounts.has(t)) {
        return { result: this._visitCounts.get(t), exists: true };
      } else {
        return { result: e, exists: false };
      }
    }
    SetVisitCount(t, e) {
      this._visitCounts.set(t, e);
    }
    SetTurnIndex(t, e) {
      this._turnIndices.set(t, e);
    }
    TryGetTurnIndex(t, e) {
      if (this._turnIndices.has(t)) {
        return { result: this._turnIndices.get(t), exists: true };
      } else {
        return { result: e, exists: false };
      }
    }
  }
  class X {
    static TextToDictionary(t) {
      return new X.Reader(t).ToDictionary();
    }
    static TextToArray(t) {
      return new X.Reader(t).ToArray();
    }
  }
  (function(t) {
    t.Reader = class {
      constructor(t) {
        this._rootObject = JSON.parse(t);
      }
      ToDictionary() {
        return this._rootObject;
      }
      ToArray() {
        return this._rootObject;
      }
    };
    class e {
      constructor() {
        this._currentPropertyName = null;
        this._currentString = null;
        this._stateStack = [];
        this._collectionStack = [];
        this._propertyNameStack = [];
        this._jsonObject = null;
      }
      WriteObject(t) {
        this.WriteObjectStart();
        t(this);
        this.WriteObjectEnd();
      }
      WriteObjectStart() {
        this.StartNewObject(true);
        let e = {};
        if (this.state === t.Writer.State.Property) {
          this.Assert(this.currentCollection !== null);
          this.Assert(this.currentPropertyName !== null);
          let t = this._propertyNameStack.pop();
          this.currentCollection[t] = e;
          this._collectionStack.push(e);
        } else if (this.state === t.Writer.State.Array) {
          this.Assert(this.currentCollection !== null);
          this.currentCollection.push(e);
          this._collectionStack.push(e);
        } else {
          this.Assert(this.state === t.Writer.State.None);
          this._jsonObject = e;
          this._collectionStack.push(e);
        }
        this._stateStack.push(new t.Writer.StateElement(t.Writer.State.Object));
      }
      WriteObjectEnd() {
        this.Assert(this.state === t.Writer.State.Object);
        this._collectionStack.pop();
        this._stateStack.pop();
      }
      WriteProperty(t, e) {
        this.WritePropertyStart(t);
        if (arguments[1] instanceof Function) {
          arguments[1](this);
        } else {
          let t = arguments[1];
          this.Write(t);
        }
        this.WritePropertyEnd();
      }
      WriteIntProperty(t, e) {
        this.WritePropertyStart(t);
        this.WriteInt(e);
        this.WritePropertyEnd();
      }
      WriteFloatProperty(t, e) {
        this.WritePropertyStart(t);
        this.WriteFloat(e);
        this.WritePropertyEnd();
      }
      WritePropertyStart(e) {
        this.Assert(this.state === t.Writer.State.Object);
        this._propertyNameStack.push(e);
        this.IncrementChildCount();
        this._stateStack.push(
          new t.Writer.StateElement(t.Writer.State.Property)
        );
      }
      WritePropertyEnd() {
        this.Assert(this.state === t.Writer.State.Property);
        this.Assert(this.childCount === 1);
        this._stateStack.pop();
      }
      WritePropertyNameStart() {
        this.Assert(this.state === t.Writer.State.Object);
        this.IncrementChildCount();
        this._currentPropertyName = '';
        this._stateStack.push(
          new t.Writer.StateElement(t.Writer.State.Property)
        );
        this._stateStack.push(
          new t.Writer.StateElement(t.Writer.State.PropertyName)
        );
      }
      WritePropertyNameEnd() {
        this.Assert(this.state === t.Writer.State.PropertyName);
        this.Assert(this._currentPropertyName !== null);
        this._propertyNameStack.push(this._currentPropertyName);
        this._currentPropertyName = null;
        this._stateStack.pop();
      }
      WritePropertyNameInner(e) {
        this.Assert(this.state === t.Writer.State.PropertyName);
        this.Assert(this._currentPropertyName !== null);
        this._currentPropertyName += e;
      }
      WriteArrayStart() {
        this.StartNewObject(true);
        let e = [];
        if (this.state === t.Writer.State.Property) {
          this.Assert(this.currentCollection !== null);
          this.Assert(this.currentPropertyName !== null);
          let t = this._propertyNameStack.pop();
          this.currentCollection[t] = e;
          this._collectionStack.push(e);
        } else if (this.state === t.Writer.State.Array) {
          this.Assert(this.currentCollection !== null);
          this.currentCollection.push(e);
          this._collectionStack.push(e);
        } else {
          this.Assert(this.state === t.Writer.State.None);
          this._jsonObject = e;
          this._collectionStack.push(e);
        }
        this._stateStack.push(new t.Writer.StateElement(t.Writer.State.Array));
      }
      WriteArrayEnd() {
        this.Assert(this.state === t.Writer.State.Array);
        this._collectionStack.pop();
        this._stateStack.pop();
      }
      Write(t, e = true) {
        if (t === null) {
          console.error('Warning: trying to write a null string');
        } else {
          this.StartNewObject(false);
          this._addToCurrentObject(t);
        }
      }
      WriteBool(t) {
        if (t !== null) {
          this.StartNewObject(false);
          this._addToCurrentObject(t);
        }
      }
      WriteInt(t) {
        if (t !== null) {
          this.StartNewObject(false);
          this._addToCurrentObject(Math.floor(t));
        }
      }
      WriteFloat(t) {
        if (t !== null) {
          this.StartNewObject(false);
          if (t == Number.POSITIVE_INFINITY) {
            this._addToCurrentObject(3.4e38);
          } else if (t == Number.NEGATIVE_INFINITY) {
            this._addToCurrentObject(-3.4e38);
          } else if (isNaN(t)) {
            this._addToCurrentObject(0);
          } else {
            this._addToCurrentObject(t);
          }
        }
      }
      WriteNull() {
        this.StartNewObject(false);
        this._addToCurrentObject(null);
      }
      WriteStringStart() {
        this.StartNewObject(false);
        this._currentString = '';
        this._stateStack.push(new t.Writer.StateElement(t.Writer.State.String));
      }
      WriteStringEnd() {
        this.Assert(this.state == t.Writer.State.String);
        this._stateStack.pop();
        this._addToCurrentObject(this._currentString);
        this._currentString = null;
      }
      WriteStringInner(e, n = true) {
        this.Assert(this.state === t.Writer.State.String);
        if (e === null) {
          console.error('Warning: trying to write a null string');
        } else {
          this._currentString += e;
        }
      }
      ToString() {
        if (this._jsonObject === null) {
          return '';
        } else {
          return JSON.stringify(this._jsonObject);
        }
      }
      StartNewObject(e) {
        if (e) {
          this.Assert(
            this.state === t.Writer.State.None ||
              this.state === t.Writer.State.Property ||
              this.state === t.Writer.State.Array
          );
        } else {
          this.Assert(
            this.state === t.Writer.State.Property ||
              this.state === t.Writer.State.Array
          );
        }
        if (this.state === t.Writer.State.Property) {
          this.Assert(this.childCount === 0);
        }
        if (
          this.state === t.Writer.State.Array ||
          this.state === t.Writer.State.Property
        ) {
          this.IncrementChildCount();
        }
      }
      get state() {
        if (this._stateStack.length > 0) {
          return this._stateStack[this._stateStack.length - 1].type;
        } else {
          return t.Writer.State.None;
        }
      }
      get childCount() {
        if (this._stateStack.length > 0) {
          return this._stateStack[this._stateStack.length - 1].childCount;
        } else {
          return 0;
        }
      }
      get currentCollection() {
        if (this._collectionStack.length > 0) {
          return this._collectionStack[this._collectionStack.length - 1];
        } else {
          return null;
        }
      }
      get currentPropertyName() {
        if (this._propertyNameStack.length > 0) {
          return this._propertyNameStack[this._propertyNameStack.length - 1];
        } else {
          return null;
        }
      }
      IncrementChildCount() {
        this.Assert(this._stateStack.length > 0);
        let t = this._stateStack.pop();
        t.childCount++;
        this._stateStack.push(t);
      }
      Assert(t) {
        if (!t) {
          throw Error('Assert failed while writing JSON');
        }
      }
      _addToCurrentObject(e) {
        this.Assert(this.currentCollection !== null);
        if (this.state === t.Writer.State.Array) {
          this.Assert(Array.isArray(this.currentCollection));
          this.currentCollection.push(e);
        } else if (this.state === t.Writer.State.Property) {
          this.Assert(!Array.isArray(this.currentCollection));
          this.Assert(this.currentPropertyName !== null);
          this.currentCollection[this.currentPropertyName] = e;
          this._propertyNameStack.pop();
        }
      }
    }
    t.Writer = e;
    (function(e) {
      var n;
      (n = e.State || (e.State = {}))[(n.None = 0)] = 'None';
      n[(n.Object = 1)] = 'Object';
      n[(n.Array = 2)] = 'Array';
      n[(n.Property = 3)] = 'Property';
      n[(n.PropertyName = 4)] = 'PropertyName';
      n[(n.String = 5)] = 'String';
      e.StateElement = class {
        constructor(e) {
          this.type = t.Writer.State.None;
          this.childCount = 0;
          this.type = e;
        }
      };
    })((e = t.Writer || (t.Writer = {})));
  })(X || (X = {}));
  class $ {
    constructor() {
      let t = arguments[0];
      let e = arguments[1];
      this.name = t;
      this.callStack = new U(e);
      if (arguments[2]) {
        let t = arguments[2];
        this.callStack.SetJsonToken(t.callstack, e);
        this.outputStream = q.JArrayToRuntimeObjList(t.outputStream);
        this.currentChoices = q.JArrayToRuntimeObjList(t.currentChoices);
        let n = t.choiceThreads;
        if (n !== void 0) {
          this.LoadFlowChoiceThreads(n, e);
        }
      } else {
        this.outputStream = [];
        this.currentChoices = [];
      }
    }
    WriteJson(t) {
      t.WriteObjectStart();
      t.WriteProperty('callstack', t => this.callStack.WriteJson(t));
      t.WriteProperty('outputStream', t =>
        q.WriteListRuntimeObjs(t, this.outputStream)
      );
      let e = false;
      for (let n of this.currentChoices) {
        if (n.threadAtGeneration === null) {
          return p('c.threadAtGeneration');
        }
        n.originalThreadIndex = n.threadAtGeneration.threadIndex;
        if (this.callStack.ThreadWithIndex(n.originalThreadIndex) === null) {
          if (!e) {
            e = true;
            t.WritePropertyStart('choiceThreads');
            t.WriteObjectStart();
          }
          t.WritePropertyStart(n.originalThreadIndex);
          n.threadAtGeneration.WriteJson(t);
          t.WritePropertyEnd();
        }
      }
      if (e) {
        t.WriteObjectEnd();
        t.WritePropertyEnd();
      }
      t.WriteProperty('currentChoices', t => {
        t.WriteArrayStart();
        for (let e of this.currentChoices) {
          q.WriteChoice(t, e);
        }
        t.WriteArrayEnd();
      });
      t.WriteObjectEnd();
    }
    LoadFlowChoiceThreads(t, e) {
      for (let n of this.currentChoices) {
        let i = this.callStack.ThreadWithIndex(n.originalThreadIndex);
        if (i === null) {
          let i = t['' + n.originalThreadIndex];
          n.threadAtGeneration = new U.Thread(i, e);
        } else {
          n.threadAtGeneration = i.Copy();
        }
      }
    }
  }
  class Y {
    constructor(t) {
      this.kInkSaveStateVersion = 9;
      this.kMinCompatibleLoadVersion = 8;
      this.onDidLoadState = null;
      this._currentErrors = null;
      this._currentWarnings = null;
      this.divertedPointer = F.Null;
      this._currentTurnIndex = 0;
      this.storySeed = 0;
      this.previousRandom = 0;
      this.didSafeExit = false;
      this._currentText = null;
      this._currentTags = null;
      this._outputStreamTextDirty = true;
      this._outputStreamTagsDirty = true;
      this._patch = null;
      this._namedFlows = null;
      this.kDefaultFlowName = 'DEFAULT_FLOW';
      this.story = t;
      this._currentFlow = new $(this.kDefaultFlowName, t);
      this.OutputStreamDirty();
      this._evaluationStack = [];
      this._variablesState = new K(this.callStack, t.listDefinitions);
      this._visitCounts = new Map();
      this._turnIndices = new Map();
      this.currentTurnIndex = -1;
      let e = new Date().getTime();
      this.storySeed = new z(e).next() % 100;
      this.previousRandom = 0;
      this.GoToStart();
    }
    ToJson(t = false) {
      let e = new X.Writer();
      this.WriteJson(e);
      return e.ToString();
    }
    toJson(t = false) {
      return this.ToJson(t);
    }
    LoadJson(t) {
      let e = X.TextToDictionary(t);
      this.LoadJsonObj(e);
      if (this.onDidLoadState !== null) {
        this.onDidLoadState();
      }
    }
    VisitCountAtPathString(t) {
      let n;
      if (this._patch !== null) {
        let i = this.story.ContentAtPath(new e(t)).container;
        if (i === null) {
          throw new Error('Content at path not found: ' + t);
        }
        n = this._patch.TryGetVisitCount(i, 0);
        if (n.exists) {
          return n.result;
        }
      }
      n = C(this._visitCounts, t, null);
      if (n.exists) {
        return n.result;
      } else {
        return 0;
      }
    }
    VisitCountForContainer(t) {
      if (t === null) {
        return p('container');
      }
      if (!t.visitsShouldBeCounted) {
        this.story.Error(
          'Read count for target (' +
            t.name +
            ' - on ' +
            t.debugMetadata +
            ') unknown. The story may need to be compiled with countAllVisits flag (-c).'
        );
        return 0;
      }
      if (this._patch !== null) {
        let e = this._patch.TryGetVisitCount(t, 0);
        if (e.exists) {
          return e.result;
        }
      }
      let e = t.path.toString();
      let n = C(this._visitCounts, e, null);
      if (n.exists) {
        return n.result;
      } else {
        return 0;
      }
    }
    IncrementVisitCountForContainer(t) {
      if (this._patch !== null) {
        let e = this.VisitCountForContainer(t);
        e++;
        this._patch.SetVisitCount(t, e);
        return;
      }
      let e = t.path.toString();
      let n = C(this._visitCounts, e, null);
      if (n.exists) {
        this._visitCounts.set(e, n.result + 1);
      } else {
        this._visitCounts.set(e, 1);
      }
    }
    RecordTurnIndexVisitToContainer(t) {
      if (this._patch !== null) {
        this._patch.SetTurnIndex(t, this.currentTurnIndex);
        return;
      }
      let e = t.path.toString();
      this._turnIndices.set(e, this.currentTurnIndex);
    }
    TurnsSinceForContainer(t) {
      if (!t.turnIndexShouldBeCounted) {
        this.story.Error(
          'TURNS_SINCE() for target (' +
            t.name +
            ' - on ' +
            t.debugMetadata +
            ') unknown. The story may need to be compiled with countAllVisits flag (-c).'
        );
      }
      if (this._patch !== null) {
        let e = this._patch.TryGetTurnIndex(t, 0);
        if (e.exists) {
          return this.currentTurnIndex - e.result;
        }
      }
      let e = t.path.toString();
      let n = C(this._turnIndices, e, 0);
      if (n.exists) {
        return this.currentTurnIndex - n.result;
      } else {
        return -1;
      }
    }
    get callstackDepth() {
      return this.callStack.depth;
    }
    get outputStream() {
      return this._currentFlow.outputStream;
    }
    get currentChoices() {
      if (this.canContinue) {
        return [];
      } else {
        return this._currentFlow.currentChoices;
      }
    }
    get generatedChoices() {
      return this._currentFlow.currentChoices;
    }
    get currentErrors() {
      return this._currentErrors;
    }
    get currentWarnings() {
      return this._currentWarnings;
    }
    get variablesState() {
      return this._variablesState;
    }
    set variablesState(t) {
      this._variablesState = t;
    }
    get callStack() {
      return this._currentFlow.callStack;
    }
    get evaluationStack() {
      return this._evaluationStack;
    }
    get currentTurnIndex() {
      return this._currentTurnIndex;
    }
    set currentTurnIndex(t) {
      this._currentTurnIndex = t;
    }
    get currentPathString() {
      let t = this.currentPointer;
      if (t.isNull) {
        return null;
      } else if (t.path === null) {
        return p('pointer.path');
      } else {
        return t.path.toString();
      }
    }
    get currentPointer() {
      return this.callStack.currentElement.currentPointer.copy();
    }
    set currentPointer(t) {
      this.callStack.currentElement.currentPointer = t.copy();
    }
    get previousPointer() {
      return this.callStack.currentThread.previousPointer.copy();
    }
    set previousPointer(t) {
      this.callStack.currentThread.previousPointer = t.copy();
    }
    get canContinue() {
      return !this.currentPointer.isNull && !this.hasError;
    }
    get hasError() {
      return this.currentErrors != null && this.currentErrors.length > 0;
    }
    get hasWarning() {
      return this.currentWarnings != null && this.currentWarnings.length > 0;
    }
    get currentText() {
      if (this._outputStreamTextDirty) {
        let t = new f();
        for (let e of this.outputStream) {
          let n = s(e, E);
          if (n !== null) {
            t.Append(n.value);
          }
        }
        this._currentText = this.CleanOutputWhitespace(t.toString());
        this._outputStreamTextDirty = false;
      }
      return this._currentText;
    }
    CleanOutputWhitespace(t) {
      let e = new f();
      let n = -1;
      let i = 0;
      for (let r = 0; r < t.length; r++) {
        let a = t.charAt(r);
        let s = a == ' ' || a == '\x09';
        if (s && n == -1) {
          n = r;
        }
        if (!s) {
          if (a != '\n' && n > 0 && n != i) {
            e.Append(' ');
          }
          n = -1;
        }
        if (a == '\n') {
          i = r + 1;
        }
        if (!s) {
          e.Append(a);
        }
      }
      return e.toString();
    }
    get currentTags() {
      if (this._outputStreamTagsDirty) {
        this._currentTags = [];
        for (let t of this.outputStream) {
          let e = s(t, B);
          if (e !== null) {
            this._currentTags.push(e.text);
          }
        }
        this._outputStreamTagsDirty = false;
      }
      return this._currentTags;
    }
    get currentFlowName() {
      return this._currentFlow.name;
    }
    get inExpressionEvaluation() {
      return this.callStack.currentElement.inExpressionEvaluation;
    }
    set inExpressionEvaluation(t) {
      this.callStack.currentElement.inExpressionEvaluation = t;
    }
    GoToStart() {
      this.callStack.currentElement.currentPointer = F.StartOf(
        this.story.mainContentContainer
      );
    }
    SwitchFlow_Internal(t) {
      if (t === null) {
        throw new Error('Must pass a non-null string to Story.SwitchFlow');
      }
      if (this._namedFlows === null) {
        this._namedFlows = new Map();
        this._namedFlows.set(this.kDefaultFlowName, this._currentFlow);
      }
      if (t === this._currentFlow.name) {
        return;
      }
      let e;
      let n = C(this._namedFlows, t, null);
      if (n.exists) {
        e = n.result;
      } else {
        e = new $(t, this.story);
        this._namedFlows.set(t, e);
      }
      this._currentFlow = e;
      this.variablesState.callStack = this._currentFlow.callStack;
      this.OutputStreamDirty();
    }
    SwitchToDefaultFlow_Internal() {
      if (this._namedFlows !== null) {
        this.SwitchFlow_Internal(this.kDefaultFlowName);
      }
    }
    RemoveFlow_Internal(t) {
      if (t === null) {
        throw new Error('Must pass a non-null string to Story.DestroyFlow');
      }
      if (t === this.kDefaultFlowName) {
        throw new Error('Cannot destroy default flow');
      }
      if (this._currentFlow.name === t) {
        this.SwitchToDefaultFlow_Internal();
      }
      if (this._namedFlows === null) {
        return p('this._namedFlows');
      }
      this._namedFlows.delete(t);
    }
    CopyAndStartPatching() {
      let t = new Y(this.story);
      t._patch = new H(this._patch);
      t._currentFlow.name = this._currentFlow.name;
      t._currentFlow.callStack = new U(this._currentFlow.callStack);
      t._currentFlow.currentChoices.push(...this._currentFlow.currentChoices);
      t._currentFlow.outputStream.push(...this._currentFlow.outputStream);
      t.OutputStreamDirty();
      if (this._namedFlows !== null) {
        t._namedFlows = new Map();
        for (let [e, n] of this._namedFlows) {
          t._namedFlows.set(e, n);
        }
        t._namedFlows.set(this._currentFlow.name, t._currentFlow);
      }
      if (this.hasError) {
        t._currentErrors = [];
        t._currentErrors.push(...(this.currentErrors || []));
      }
      if (this.hasWarning) {
        t._currentWarnings = [];
        t._currentWarnings.push(...(this.currentWarnings || []));
      }
      t.variablesState = this.variablesState;
      t.variablesState.callStack = t.callStack;
      t.variablesState.patch = t._patch;
      t.evaluationStack.push(...this.evaluationStack);
      if (!this.divertedPointer.isNull) {
        t.divertedPointer = this.divertedPointer.copy();
      }
      t.previousPointer = this.previousPointer.copy();
      t._visitCounts = this._visitCounts;
      t._turnIndices = this._turnIndices;
      t.currentTurnIndex = this.currentTurnIndex;
      t.storySeed = this.storySeed;
      t.previousRandom = this.previousRandom;
      t.didSafeExit = this.didSafeExit;
      return t;
    }
    RestoreAfterPatch() {
      this.variablesState.callStack = this.callStack;
      this.variablesState.patch = this._patch;
    }
    ApplyAnyPatch() {
      if (this._patch !== null) {
        this.variablesState.ApplyPatch();
        for (let [t, e] of this._patch.visitCounts) {
          this.ApplyCountChanges(t, e, true);
        }
        for (let [t, e] of this._patch.turnIndices) {
          this.ApplyCountChanges(t, e, false);
        }
        this._patch = null;
      }
    }
    ApplyCountChanges(t, e, n) {
      (n ? this._visitCounts : this._turnIndices).set(t.path.toString(), e);
    }
    WriteJson(t) {
      t.WriteObjectStart();
      t.WritePropertyStart('flows');
      t.WriteObjectStart();
      if (this._namedFlows === null) {
        t.WriteProperty(this._currentFlow.name, t =>
          this._currentFlow.WriteJson(t)
        );
      } else {
        for (let [e, n] of this._namedFlows) {
          t.WriteProperty(e, t => n.WriteJson(t));
        }
      }
      t.WriteObjectEnd();
      t.WritePropertyEnd();
      t.WriteProperty('currentFlowName', this._currentFlow.name);
      t.WriteProperty('variablesState', t => this.variablesState.WriteJson(t));
      t.WriteProperty('evalStack', t =>
        q.WriteListRuntimeObjs(t, this.evaluationStack)
      );
      if (!this.divertedPointer.isNull) {
        if (this.divertedPointer.path === null) {
          return p('divertedPointer');
        }
        t.WriteProperty(
          'currentDivertTarget',
          this.divertedPointer.path.componentsString
        );
      }
      t.WriteProperty('visitCounts', t =>
        q.WriteIntDictionary(t, this._visitCounts)
      );
      t.WriteProperty('turnIndices', t =>
        q.WriteIntDictionary(t, this._turnIndices)
      );
      t.WriteIntProperty('turnIdx', this.currentTurnIndex);
      t.WriteIntProperty('storySeed', this.storySeed);
      t.WriteIntProperty('previousRandom', this.previousRandom);
      t.WriteIntProperty('inkSaveVersion', this.kInkSaveStateVersion);
      t.WriteIntProperty('inkFormatVersion', Z.inkVersionCurrent);
      t.WriteObjectEnd();
    }
    LoadJsonObj(t) {
      let n = t;
      let i = n.inkSaveVersion;
      if (i == null) {
        throw new Error("ink save format incorrect, can't load.");
      }
      if (parseInt(i) < this.kMinCompatibleLoadVersion) {
        throw new Error(
          "Ink save format isn't compatible with the current version (saw '" +
            i +
            "', but minimum is " +
            this.kMinCompatibleLoadVersion +
            "), so can't load."
        );
      }
      let r = n.flows;
      if (r == null) {
        this._namedFlows = null;
        this._currentFlow.name = this.kDefaultFlowName;
        this._currentFlow.callStack.SetJsonToken(
          n.callstackThreads,
          this.story
        );
        this._currentFlow.outputStream = q.JArrayToRuntimeObjList(
          n.outputStream
        );
        this._currentFlow.currentChoices = q.JArrayToRuntimeObjList(
          n.currentChoices
        );
        let t = n.choiceThreads;
        this._currentFlow.LoadFlowChoiceThreads(t, this.story);
      } else {
        let t = r;
        if (Object.keys(t).length === 1) {
          this._namedFlows = null;
        } else if (this._namedFlows === null) {
          this._namedFlows = new Map();
        } else {
          this._namedFlows.clear();
        }
        let e = Object.entries(t);
        for (let [n, i] of e) {
          let e = n;
          let r = i;
          let a = new $(e, this.story, r);
          if (Object.keys(t).length === 1) {
            this._currentFlow = new $(e, this.story, r);
          } else {
            if (this._namedFlows === null) {
              return p('this._namedFlows');
            }
            this._namedFlows.set(e, a);
          }
        }
        if (this._namedFlows != null && this._namedFlows.size > 1) {
          let t = n.currentFlowName;
          this._currentFlow = this._namedFlows.get(t);
        }
      }
      this.OutputStreamDirty();
      this.variablesState.SetJsonToken(n.variablesState);
      this.variablesState.callStack = this._currentFlow.callStack;
      this._evaluationStack = q.JArrayToRuntimeObjList(n.evalStack);
      let a = n.currentDivertTarget;
      if (a != null) {
        let t = new e(a.toString());
        this.divertedPointer = this.story.PointerAtPath(t);
      }
      this._visitCounts = q.JObjectToIntDictionary(n.visitCounts);
      this._turnIndices = q.JObjectToIntDictionary(n.turnIndices);
      this.currentTurnIndex = parseInt(n.turnIdx);
      this.storySeed = parseInt(n.storySeed);
      this.previousRandom = parseInt(n.previousRandom);
    }
    ResetErrors() {
      this._currentErrors = null;
      this._currentWarnings = null;
    }
    ResetOutput(t = null) {
      this.outputStream.length = 0;
      if (t !== null) {
        this.outputStream.push(...t);
      }
      this.OutputStreamDirty();
    }
    PushToOutputStream(t) {
      let e = s(t, E);
      if (e !== null) {
        let t = this.TrySplittingHeadTailWhitespace(e);
        if (t !== null) {
          for (let e of t) {
            this.PushToOutputStreamIndividual(e);
          }
          this.OutputStreamDirty();
          return;
        }
      }
      this.PushToOutputStreamIndividual(t);
      this.OutputStreamDirty();
    }
    PopFromOutputStream(t) {
      this.outputStream.splice(this.outputStream.length - t, t);
      this.OutputStreamDirty();
    }
    TrySplittingHeadTailWhitespace(t) {
      let e = t.value;
      if (e === null) {
        return p('single.value');
      }
      let n = -1;
      let i = -1;
      for (let t = 0; t < e.length; t++) {
        let r = e[t];
        if (r != '\n') {
          if (r == ' ' || r == '\x09') {
            continue;
          }
          break;
        }
        if (n == -1) {
          n = t;
        }
        i = t;
      }
      let r = -1;
      let a = -1;
      for (let t = e.length - 1; t >= 0; t--) {
        let n = e[t];
        if (n != '\n') {
          if (n == ' ' || n == '\x09') {
            continue;
          }
          break;
        }
        if (r == -1) {
          r = t;
        }
        a = t;
      }
      if (n == -1 && r == -1) {
        return null;
      }
      let s = [];
      let l = 0;
      let o = e.length;
      if (n != -1) {
        if (n > 0) {
          let t = new E(e.substring(0, n));
          s.push(t);
        }
        s.push(new E('\n'));
        l = i + 1;
      }
      if (r != -1) {
        o = a;
      }
      if (o > l) {
        let t = e.substring(l, o - l);
        s.push(new E(t));
      }
      if (r != -1 && a > i && (s.push(new E('\n')), r < e.length - 1)) {
        let t = e.length - r - 1;
        let n = new E(e.substring(r + 1, t));
        s.push(n);
      }
      return s;
    }
    PushToOutputStreamIndividual(t) {
      let e = s(t, I);
      let n = s(t, E);
      let i = true;
      if (e) {
        this.TrimNewlinesFromOutputStream();
        i = true;
      } else if (n) {
        let t = -1;
        let e = this.callStack.currentElement;
        if (e.type == r.Function) {
          t = e.functionStartInOutputStream;
        }
        let a = -1;
        for (let e = this.outputStream.length - 1; e >= 0; e--) {
          let n = this.outputStream[e];
          let i = n instanceof k ? n : null;
          if ((n instanceof I ? n : null) != null) {
            a = e;
            break;
          }
          if (i != null && i.commandType == k.CommandType.BeginString) {
            if (e >= t) {
              t = -1;
            }
            break;
          }
        }
        let s = -1;
        s = a != -1 && t != -1 ? Math.min(t, a) : a != -1 ? a : t;
        if (s == -1) {
          if (n.isNewline) {
            if (
              !!this.outputStreamEndsInNewline ||
              !this.outputStreamContainsContent
            ) {
              i = false;
            }
          }
        } else if (n.isNewline) {
          i = false;
        } else if (
          n.isNonWhitespace &&
          (a > -1 && this.RemoveExistingGlue(), t > -1)
        ) {
          let t = this.callStack.elements;
          for (let e = t.length - 1; e >= 0; e--) {
            let n = t[e];
            if (n.type != r.Function) {
              break;
            }
            n.functionStartInOutputStream = -1;
          }
        }
      }
      if (i) {
        if (t === null) {
          return p('obj');
        }
        this.outputStream.push(t);
        this.OutputStreamDirty();
      }
    }
    TrimNewlinesFromOutputStream() {
      let t = -1;
      let e = this.outputStream.length - 1;
      while (e >= 0) {
        let n = this.outputStream[e];
        let i = s(n, k);
        let r = s(n, E);
        if (i != null || (r != null && r.isNonWhitespace)) {
          break;
        }
        if (r != null && r.isNewline) {
          t = e;
        }
        e--;
      }
      if (t >= 0) {
        for (e = t; e < this.outputStream.length; ) {
          if (s(this.outputStream[e], E)) {
            this.outputStream.splice(e, 1);
          } else {
            e++;
          }
        }
      }
      this.OutputStreamDirty();
    }
    RemoveExistingGlue() {
      for (let t = this.outputStream.length - 1; t >= 0; t--) {
        let e = this.outputStream[t];
        if (e instanceof I) {
          this.outputStream.splice(t, 1);
        } else if (e instanceof k) {
          break;
        }
      }
      this.OutputStreamDirty();
    }
    get outputStreamEndsInNewline() {
      if (this.outputStream.length > 0) {
        for (let t = this.outputStream.length - 1; t >= 0; t--) {
          if (this.outputStream[t] instanceof k) {
            break;
          }
          let e = this.outputStream[t];
          if (e instanceof E) {
            if (e.isNewline) {
              return true;
            }
            if (e.isNonWhitespace) {
              break;
            }
          }
        }
      }
      return false;
    }
    get outputStreamContainsContent() {
      for (let t of this.outputStream) {
        if (t instanceof E) {
          return true;
        }
      }
      return false;
    }
    get inStringEvaluation() {
      for (let t = this.outputStream.length - 1; t >= 0; t--) {
        let e = s(this.outputStream[t], k);
        if (e instanceof k && e.commandType == k.CommandType.BeginString) {
          return true;
        }
      }
      return false;
    }
    PushEvaluationStack(t) {
      let e = s(t, N);
      if (e) {
        let t = e.value;
        if (t === null) {
          return p('rawList');
        }
        if (t.originNames != null) {
          if (!t.origins) {
            t.origins = [];
          }
          t.origins.length = 0;
          for (let e of t.originNames) {
            if (this.story.listDefinitions === null) {
              return p('StoryState.story.listDefinitions');
            }
            let n = this.story.listDefinitions.TryListGetDefinition(e, null);
            if (n.result === null) {
              return p('StoryState def.result');
            }
            if (t.origins.indexOf(n.result) < 0) {
              t.origins.push(n.result);
            }
          }
        }
      }
      if (t === null) {
        return p('obj');
      }
      this.evaluationStack.push(t);
    }
    PopEvaluationStack(t) {
      if (t === void 0) {
        return u(this.evaluationStack.pop());
      }
      if (t > this.evaluationStack.length) {
        throw new Error('trying to pop too many objects');
      }
      return u(this.evaluationStack.splice(this.evaluationStack.length - t, t));
    }
    PeekEvaluationStack() {
      return this.evaluationStack[this.evaluationStack.length - 1];
    }
    ForceEnd() {
      this.callStack.Reset();
      this._currentFlow.currentChoices.length = 0;
      this.currentPointer = F.Null;
      this.previousPointer = F.Null;
      this.didSafeExit = true;
    }
    TrimWhitespaceFromFunctionEnd() {
      n.Assert(this.callStack.currentElement.type == r.Function);
      let t = this.callStack.currentElement.functionStartInOutputStream;
      if (t == -1) {
        t = 0;
      }
      for (let e = this.outputStream.length - 1; e >= t; e--) {
        let t = this.outputStream[e];
        let n = s(t, E);
        let i = s(t, k);
        if (n != null) {
          if (i) {
            break;
          }
          if (!n.isNewline && !n.isInlineWhitespace) {
            break;
          }
          this.outputStream.splice(e, 1);
          this.OutputStreamDirty();
        }
      }
    }
    PopCallStack(t = null) {
      if (this.callStack.currentElement.type == r.Function) {
        this.TrimWhitespaceFromFunctionEnd();
      }
      this.callStack.Pop(t);
    }
    SetChosenPath(t, e) {
      this._currentFlow.currentChoices.length = 0;
      let n = this.story.PointerAtPath(t);
      if (!n.isNull && n.index == -1) {
        n.index = 0;
      }
      this.currentPointer = n;
      if (e) {
        this.currentTurnIndex++;
      }
    }
    StartFunctionEvaluationFromGame(t, e) {
      this.callStack.Push(
        r.FunctionEvaluationFromGame,
        this.evaluationStack.length
      );
      this.callStack.currentElement.currentPointer = F.StartOf(t);
      this.PassArgumentsToEvaluationStack(e);
    }
    PassArgumentsToEvaluationStack(t) {
      if (t !== null) {
        for (let e = 0; e < t.length; e++) {
          if (
            (typeof t[e] != 'number' && typeof t[e] != 'string') ||
            t[e] instanceof S
          ) {
            throw new Error((u(arguments[e]), 'null'));
          }
          this.PushEvaluationStack(b.Create(t[e]));
        }
      }
    }
    TryExitFunctionEvaluationFromGame() {
      return (
        this.callStack.currentElement.type == r.FunctionEvaluationFromGame &&
        ((this.currentPointer = F.Null), (this.didSafeExit = true), true)
      );
    }
    CompleteFunctionEvaluationFromGame() {
      if (this.callStack.currentElement.type != r.FunctionEvaluationFromGame) {
        throw new Error(
          'Expected external function evaluation to be complete. Stack trace: ' +
            this.callStack.callStackTrace
        );
      }
      let t = this.callStack.currentElement.evaluationStackHeightWhenPushed;
      let e = null;
      while (this.evaluationStack.length > t) {
        let t = this.PopEvaluationStack();
        if (e === null) {
          e = t;
        }
      }
      this.PopCallStack(r.FunctionEvaluationFromGame);
      if (e) {
        if (e instanceof j) {
          return null;
        }
        let t = l(e, b);
        if (t.valueType == i.DivertTarget) {
          return t.valueObject.toString();
        } else {
          return t.valueObject;
        }
      }
      return null;
    }
    AddError(t, e) {
      if (e) {
        if (this._currentWarnings == null) {
          this._currentWarnings = [];
        }
        this._currentWarnings.push(t);
      } else {
        if (this._currentErrors == null) {
          this._currentErrors = [];
        }
        this._currentErrors.push(t);
      }
    }
    OutputStreamDirty() {
      this._outputStreamTextDirty = true;
      this._outputStreamTagsDirty = true;
    }
  }
  class Q {
    constructor() {
      this.startTime = void 0;
    }
    get ElapsedMilliseconds() {
      if (this.startTime === void 0) {
        return 0;
      } else {
        return new Date().getTime() - this.startTime;
      }
    }
    Start() {
      this.startTime = new Date().getTime();
    }
    Stop() {
      this.startTime = void 0;
    }
  }
  (function() {
    var t = a || (a = {});
    t[(t.Author = 0)] = 'Author';
    t[(t.Warning = 1)] = 'Warning';
    t[(t.Error = 2)] = 'Error';
  })();
  if (!Number.isInteger) {
    Number.isInteger = function(t) {
      return (
        typeof t == 'number' &&
        isFinite(t) &&
        t > -0x20000000000000 &&
        t < 0x20000000000000 &&
        Math.floor(t) === t
      );
    };
  }
  class Z extends m {
    constructor() {
      let t;
      super();
      this.inkVersionMinimumCompatible = 18;
      this.onError = null;
      this.onDidContinue = null;
      this.onMakeChoice = null;
      this.onEvaluateFunction = null;
      this.onCompleteEvaluateFunction = null;
      this.onChoosePathString = null;
      this._prevContainers = [];
      this.allowExternalFunctionFallbacks = false;
      this._listDefinitions = null;
      this._variableObservers = null;
      this._hasValidatedExternals = false;
      this._temporaryEvaluationContainer = null;
      this._asyncContinueActive = false;
      this._stateSnapshotAtLastNewline = null;
      this._sawLookaheadUnsafeFunctionAfterNewline = false;
      this._recursiveContinueCount = 0;
      this._asyncSaving = false;
      this._profiler = null;
      let e = null;
      let n = null;
      if (arguments[0] instanceof x) {
        t = arguments[0];
        if (arguments[1] !== void 0) {
          e = arguments[1];
        }
        this._mainContentContainer = t;
      } else if (typeof arguments[0] == 'string') {
        let t = arguments[0];
        n = X.TextToDictionary(t);
      } else {
        n = arguments[0];
      }
      if (e != null) {
        this._listDefinitions = new J(e);
      }
      this._externals = new Map();
      if (n !== null) {
        let t = n;
        let e = t.inkVersion;
        if (e == null) {
          throw new Error(
            "ink version number not found. Are you sure it's a valid .ink.json file?"
          );
        }
        let i = parseInt(e);
        if (i > Z.inkVersionCurrent) {
          throw new Error(
            'Version of ink used to build story was newer than the current version of the engine'
          );
        }
        if (i < this.inkVersionMinimumCompatible) {
          throw new Error(
            'Version of ink used to build story is too old to be loaded by this version of the engine'
          );
        }
        if (i != Z.inkVersionCurrent) {
          console.warn(
            "WARNING: Version of ink used to build story doesn't match current version of engine. Non-critical, but recommend synchronising."
          );
        }
        let r;
        let a = t.root;
        if (a == null) {
          throw new Error(
            "Root node for ink not found. Are you sure it's a valid .ink.json file?"
          );
        }
        if ((r = t.listDefs)) {
          this._listDefinitions = q.JTokenToListDefinitions(r);
        }
        this._mainContentContainer = l(q.JTokenToRuntimeObject(a), x);
        this.ResetState();
      }
    }
    get currentChoices() {
      let t = [];
      if (this._state === null) {
        return p('this._state');
      }
      for (let e of this._state.currentChoices) {
        if (!e.isInvisibleDefault) {
          e.index = t.length;
          t.push(e);
        }
      }
      return t;
    }
    get currentText() {
      this.IfAsyncWeCant("call currentText since it's a work in progress");
      return this.state.currentText;
    }
    get currentTags() {
      this.IfAsyncWeCant("call currentTags since it's a work in progress");
      return this.state.currentTags;
    }
    get currentErrors() {
      return this.state.currentErrors;
    }
    get currentWarnings() {
      return this.state.currentWarnings;
    }
    get currentFlowName() {
      return this.state.currentFlowName;
    }
    get hasError() {
      return this.state.hasError;
    }
    get hasWarning() {
      return this.state.hasWarning;
    }
    get variablesState() {
      return this.state.variablesState;
    }
    get listDefinitions() {
      return this._listDefinitions;
    }
    get state() {
      return this._state;
    }
    StartProfiling() {}
    EndProfiling() {}
    ToJson(t) {
      let e = false;
      if (!t) {
        e = true;
        t = new X.Writer();
      }
      t.WriteObjectStart();
      t.WriteIntProperty('inkVersion', Z.inkVersionCurrent);
      t.WriteProperty('root', t =>
        q.WriteRuntimeContainer(t, this._mainContentContainer)
      );
      if (this._listDefinitions != null) {
        t.WritePropertyStart('listDefs');
        t.WriteObjectStart();
        for (let e of this._listDefinitions.lists) {
          t.WritePropertyStart(e.name);
          t.WriteObjectStart();
          for (let [n, i] of e.items) {
            let e = g.fromSerializedKey(n);
            let r = i;
            t.WriteIntProperty(e.itemName, r);
          }
          t.WriteObjectEnd();
          t.WritePropertyEnd();
        }
        t.WriteObjectEnd();
        t.WritePropertyEnd();
      }
      t.WriteObjectEnd();
      if (e) {
        return t.ToString();
      }
    }
    ResetState() {
      this.IfAsyncWeCant('ResetState');
      this._state = new Y(this);
      this._state.variablesState.ObserveVariableChange(
        this.VariableStateDidChangeEvent.bind(this)
      );
      this.ResetGlobals();
    }
    ResetErrors() {
      if (this._state === null) {
        return p('this._state');
      }
      this._state.ResetErrors();
    }
    ResetCallstack() {
      this.IfAsyncWeCant('ResetCallstack');
      if (this._state === null) {
        return p('this._state');
      }
      this._state.ForceEnd();
    }
    ResetGlobals() {
      if (this._mainContentContainer.namedContent.get('global decl')) {
        let t = this.state.currentPointer.copy();
        this.ChoosePath(new e('global decl'), false);
        this.ContinueInternal();
        this.state.currentPointer = t;
      }
      this.state.variablesState.SnapshotDefaultGlobals();
    }
    SwitchFlow(t) {
      this.IfAsyncWeCant('switch flow');
      if (this._asyncSaving) {
        throw new Error(
          "Story is already in background saving mode, can't switch flow to " +
            t
        );
      }
      this.state.SwitchFlow_Internal(t);
    }
    RemoveFlow(t) {
      this.state.RemoveFlow_Internal(t);
    }
    SwitchToDefaultFlow() {
      this.state.SwitchToDefaultFlow_Internal();
    }
    Continue() {
      this.ContinueAsync(0);
      return this.currentText;
    }
    get canContinue() {
      return this.state.canContinue;
    }
    get asyncContinueComplete() {
      return !this._asyncContinueActive;
    }
    ContinueAsync(t) {
      if (!this._hasValidatedExternals) {
        this.ValidateExternalBindings();
      }
      this.ContinueInternal(t);
    }
    ContinueInternal(t = 0) {
      if (this._profiler != null) {
        this._profiler.PreContinue();
      }
      let e = t > 0;
      this._recursiveContinueCount++;
      if (!this._asyncContinueActive) {
        this._asyncContinueActive = e;
        if (!this.canContinue) {
          throw new Error(
            "Can't continue - should check canContinue before calling Continue"
          );
        }
        this._state.didSafeExit = false;
        this._state.ResetOutput();
        if (this._recursiveContinueCount == 1) {
          this._state.variablesState.batchObservingVariableChanges = true;
        }
      }
      let n = new Q();
      n.Start();
      let i = false;
      this._sawLookaheadUnsafeFunctionAfterNewline = false;
      do {
        try {
          i = this.ContinueSingleStep();
        } catch (t) {
          if (!(t instanceof y)) {
            throw t;
          }
          this.AddError(t.message, void 0, t.useEndLineNumber);
          break;
        }
        if (i) {
          break;
        }
        if (this._asyncContinueActive && n.ElapsedMilliseconds > t) {
          break;
        }
      } while (this.canContinue);
      n.Stop();
      if (!!i || !this.canContinue) {
        if (this._stateSnapshotAtLastNewline !== null) {
          this.RestoreStateSnapshot();
        }
        if (!this.canContinue) {
          if (this.state.callStack.canPopThread) {
            this.AddError(
              'Thread available to pop, threads should always be flat by the end of evaluation?'
            );
          }
          if (
            this.state.generatedChoices.length == 0 &&
            !this.state.didSafeExit &&
            this._temporaryEvaluationContainer == null
          ) {
            if (this.state.callStack.CanPop(r.Tunnel)) {
              this.AddError(
                "unexpectedly reached end of content. Do you need a '->->' to return from a tunnel?"
              );
            } else if (this.state.callStack.CanPop(r.Function)) {
              this.AddError(
                "unexpectedly reached end of content. Do you need a '~ return'?"
              );
            } else if (this.state.callStack.canPop) {
              this.AddError(
                'unexpectedly reached end of content for unknown reason. Please debug compiler!'
              );
            } else {
              this.AddError(
                "ran out of content. Do you need a '-> DONE' or '-> END'?"
              );
            }
          }
        }
        this.state.didSafeExit = false;
        this._sawLookaheadUnsafeFunctionAfterNewline = false;
        if (this._recursiveContinueCount == 1) {
          this._state.variablesState.batchObservingVariableChanges = false;
        }
        this._asyncContinueActive = false;
        if (this.onDidContinue !== null) {
          this.onDidContinue();
        }
      }
      this._recursiveContinueCount--;
      if (this._profiler != null) {
        this._profiler.PostContinue();
      }
      if (this.state.hasError || this.state.hasWarning) {
        if (this.onError === null) {
          let t = new f();
          t.Append('Ink had ');
          if (this.state.hasError) {
            t.Append('' + this.state.currentErrors.length);
            t.Append(
              this.state.currentErrors.length == 1 ? ' error' : 'errors'
            );
            if (this.state.hasWarning) {
              t.Append(' and ');
            }
          }
          if (this.state.hasWarning) {
            t.Append('' + this.state.currentWarnings.length);
            t.Append(
              this.state.currentWarnings.length == 1 ? ' warning' : 'warnings'
            );
            if (this.state.hasWarning) {
              t.Append(' and ');
            }
          }
          t.Append(
            '. It is strongly suggested that you assign an error handler to story.onError. The first issue was: '
          );
          t.Append(
            this.state.hasError
              ? this.state.currentErrors[0]
              : this.state.currentWarnings[0]
          );
          throw new y(t.toString());
        }
        if (this.state.hasError) {
          for (let t of this.state.currentErrors) {
            this.onError(t, a.Error);
          }
        }
        if (this.state.hasWarning) {
          for (let t of this.state.currentWarnings) {
            this.onError(t, a.Warning);
          }
        }
        this.ResetErrors();
      }
    }
    ContinueSingleStep() {
      if (this._profiler != null) {
        this._profiler.PreStep();
      }
      this.Step();
      if (this._profiler != null) {
        this._profiler.PostStep();
      }
      if (
        !this.canContinue &&
        !this.state.callStack.elementIsEvaluateFromGame
      ) {
        this.TryFollowDefaultInvisibleChoice();
      }
      if (this._profiler != null) {
        this._profiler.PreSnapshot();
      }
      if (!this.state.inStringEvaluation) {
        if (this._stateSnapshotAtLastNewline !== null) {
          if (this._stateSnapshotAtLastNewline.currentTags === null) {
            return p('this._stateAtLastNewline.currentTags');
          }
          if (this.state.currentTags === null) {
            return p('this.state.currentTags');
          }
          let t = this.CalculateNewlineOutputStateChange(
            this._stateSnapshotAtLastNewline.currentText,
            this.state.currentText,
            this._stateSnapshotAtLastNewline.currentTags.length,
            this.state.currentTags.length
          );
          if (
            t == Z.OutputStateChange.ExtendedBeyondNewline ||
            this._sawLookaheadUnsafeFunctionAfterNewline
          ) {
            this.RestoreStateSnapshot();
            return true;
          }
          if (t == Z.OutputStateChange.NewlineRemoved) {
            this.DiscardSnapshot();
          }
        }
        if (this.state.outputStreamEndsInNewline) {
          if (this.canContinue) {
            if (this._stateSnapshotAtLastNewline == null) {
              this.StateSnapshot();
            }
          } else {
            this.DiscardSnapshot();
          }
        }
      }
      if (this._profiler != null) {
        this._profiler.PostSnapshot();
      }
      return false;
    }
    CalculateNewlineOutputStateChange(t, e, n, i) {
      if (t === null) {
        return p('prevText');
      }
      if (e === null) {
        return p('currText');
      }
      let r = e.length >= t.length && e.charAt(t.length - 1) == '\n';
      if (n == i && t.length == e.length && r) {
        return Z.OutputStateChange.NoChange;
      }
      if (!r) {
        return Z.OutputStateChange.NewlineRemoved;
      }
      if (i > n) {
        return Z.OutputStateChange.ExtendedBeyondNewline;
      }
      for (let n = t.length; n < e.length; n++) {
        let t = e.charAt(n);
        if (t != ' ' && t != '\x09') {
          return Z.OutputStateChange.ExtendedBeyondNewline;
        }
      }
      return Z.OutputStateChange.NoChange;
    }
    ContinueMaximally() {
      this.IfAsyncWeCant('ContinueMaximally');
      let t = new f();
      while (this.canContinue) {
        t.Append(this.Continue());
      }
      return t.toString();
    }
    ContentAtPath(t) {
      return this.mainContentContainer.ContentAtPath(t);
    }
    KnotContainerWithName(t) {
      let e = this.mainContentContainer.namedContent.get(t);
      if (e instanceof x) {
        return e;
      } else {
        return null;
      }
    }
    PointerAtPath(t) {
      if (t.length == 0) {
        return F.Null;
      }
      let e = new F();
      let n = t.length;
      let i = null;
      if (t.lastComponent === null) {
        return p('path.lastComponent');
      } else {
        if (t.lastComponent.isIndex) {
          n = t.length - 1;
          i = this.mainContentContainer.ContentAtPath(t, void 0, n);
          e.container = i.container;
          e.index = t.lastComponent.index;
        } else {
          i = this.mainContentContainer.ContentAtPath(t);
          e.container = i.container;
          e.index = -1;
        }
        if (i.obj == null || (i.obj == this.mainContentContainer && n > 0)) {
          this.Error(
            "Failed to find content at path '" +
              t +
              "', and no approximation of it was possible."
          );
        } else if (i.approximate) {
          this.Warning(
            "Failed to find content at path '" +
              t +
              "', so it was approximated to: '" +
              i.obj.path +
              "'."
          );
        }
        return e;
      }
    }
    StateSnapshot() {
      this._stateSnapshotAtLastNewline = this._state;
      this._state = this._state.CopyAndStartPatching();
    }
    RestoreStateSnapshot() {
      if (this._stateSnapshotAtLastNewline === null) {
        p('_stateSnapshotAtLastNewline');
      }
      this._stateSnapshotAtLastNewline.RestoreAfterPatch();
      this._state = this._stateSnapshotAtLastNewline;
      this._stateSnapshotAtLastNewline = null;
      if (!this._asyncSaving) {
        this._state.ApplyAnyPatch();
      }
    }
    DiscardSnapshot() {
      if (!this._asyncSaving) {
        this._state.ApplyAnyPatch();
      }
      this._stateSnapshotAtLastNewline = null;
    }
    CopyStateForBackgroundThreadSave() {
      this.IfAsyncWeCant('start saving on a background thread');
      if (this._asyncSaving) {
        throw new Error(
          "Story is already in background saving mode, can't call CopyStateForBackgroundThreadSave again!"
        );
      }
      let t = this._state;
      this._state = this._state.CopyAndStartPatching();
      this._asyncSaving = true;
      return t;
    }
    BackgroundSaveComplete() {
      if (this._stateSnapshotAtLastNewline === null) {
        this._state.ApplyAnyPatch();
      }
      this._asyncSaving = false;
    }
    Step() {
      let t = true;
      let e = this.state.currentPointer.copy();
      if (e.isNull) {
        return;
      }
      let n = s(e.Resolve(), x);
      while (n && (this.VisitContainer(n, true), n.content.length != 0)) {
        e = F.StartOf(n);
        n = s(e.Resolve(), x);
      }
      this.state.currentPointer = e.copy();
      if (this._profiler != null) {
        this._profiler.Step(this.state.callStack);
      }
      let i = e.Resolve();
      let r = this.PerformLogicAndFlowControl(i);
      if (this.state.currentPointer.isNull) {
        return;
      }
      if (r) {
        t = false;
      }
      let a = s(i, V);
      if (a) {
        let e = this.ProcessChoice(a);
        if (e) {
          this.state.generatedChoices.push(e);
        }
        i = null;
        t = false;
      }
      if (i instanceof x) {
        t = false;
      }
      if (t) {
        let t = s(i, O);
        if (t && t.contextIndex == -1) {
          let e = this.state.callStack.ContextForVariableNamed(t.variableName);
          i = new O(t.variableName, e);
        }
        if (this.state.inExpressionEvaluation) {
          this.state.PushEvaluationStack(i);
        } else {
          this.state.PushToOutputStream(i);
        }
      }
      this.NextContent();
      let l = s(i, k);
      if (l && l.commandType == k.CommandType.StartThread) {
        this.state.callStack.PushThread();
      }
    }
    VisitContainer(t, e) {
      if (!t.countingAtStartOnly || !!e) {
        if (t.visitsShouldBeCounted) {
          this.state.IncrementVisitCountForContainer(t);
        }
        if (t.turnIndexShouldBeCounted) {
          this.state.RecordTurnIndexVisitToContainer(t);
        }
      }
    }
    VisitChangedContainersDueToDivert() {
      let t = this.state.previousPointer.copy();
      let e = this.state.currentPointer.copy();
      if (e.isNull || e.index == -1) {
        return;
      }
      this._prevContainers.length = 0;
      if (!t.isNull) {
        let e = s(t.Resolve(), x) || s(t.container, x);
        while (e) {
          this._prevContainers.push(e);
          e = s(e.parent, x);
        }
      }
      let n = e.Resolve();
      if (n == null) {
        return;
      }
      let i = s(n.parent, x);
      let r = true;
      while (
        i &&
        (this._prevContainers.indexOf(i) < 0 || i.countingAtStartOnly)
      ) {
        let t = i.content.length > 0 && n == i.content[0] && r;
        if (!t) {
          r = false;
        }
        this.VisitContainer(i, t);
        n = i;
        i = s(i.parent, x);
      }
    }
    ProcessChoice(t) {
      let e = true;
      if (t.hasCondition) {
        let t = this.state.PopEvaluationStack();
        if (!this.IsTruthy(t)) {
          e = false;
        }
      }
      let n = '';
      let i = '';
      if (t.hasChoiceOnlyContent) {
        i = l(this.state.PopEvaluationStack(), E).value || '';
      }
      if (t.hasStartContent) {
        n = l(this.state.PopEvaluationStack(), E).value || '';
      }
      if (t.onceOnly) {
        if (this.state.VisitCountForContainer(t.choiceTarget) > 0) {
          e = false;
        }
      }
      if (!e) {
        return null;
      }
      let r = new G();
      r.targetPath = t.pathOnChoice;
      r.sourcePath = t.path.toString();
      r.isInvisibleDefault = t.isInvisibleDefault;
      r.threadAtGeneration = this.state.callStack.ForkThread();
      r.text = (n + i).replace(/^[ \t]+|[ \t]+$/g, '');
      return r;
    }
    IsTruthy(t) {
      if (t instanceof b) {
        let e = t;
        if (e instanceof P) {
          let t = e;
          this.Error(
            "Shouldn't use a divert target (to " +
              t.targetPath +
              ") as a conditional value. Did you intend a function call 'likeThis()' or a read count check 'likeThis'? (no arrows)"
          );
          return false;
        }
        return e.isTruthy;
      }
      return false;
    }
    PerformLogicAndFlowControl(t) {
      if (t == null) {
        return false;
      }
      if (t instanceof W) {
        let e = t;
        if (e.isConditional) {
          let t = this.state.PopEvaluationStack();
          if (!this.IsTruthy(t)) {
            return true;
          }
        }
        if (e.hasVariableTarget) {
          let t = e.variableDivertName;
          let n = this.state.variablesState.GetVariableWithName(t);
          if (n == null) {
            this.Error(
              'Tried to divert using a target from a variable that could not be found (' +
                t +
                ')'
            );
          } else if (!(n instanceof P)) {
            let e = s(n, w);
            let i =
              'Tried to divert to a target from a variable, but the variable (' +
              t +
              ") didn't contain a divert target, it ";
            if (e instanceof w && e.value == 0) {
              i += 'was empty/null (the value 0).';
            } else {
              i += "contained '" + n + "'.";
            }
            this.Error(i);
          }
          let i = l(n, P);
          this.state.divertedPointer = this.PointerAtPath(i.targetPath);
        } else {
          if (e.isExternal) {
            this.CallExternalFunction(e.targetPathString, e.externalArgs);
            return true;
          }
          this.state.divertedPointer = e.targetPointer.copy();
        }
        if (e.pushesToStack) {
          this.state.callStack.Push(
            e.stackPushType,
            void 0,
            this.state.outputStream.length
          );
        }
        if (this.state.divertedPointer.isNull && !e.isExternal) {
          if (e && e.debugMetadata && e.debugMetadata.sourceName != null) {
            this.Error(
              "Divert target doesn't exist: " + e.debugMetadata.sourceName
            );
          } else {
            this.Error('Divert resolution failed: ' + e);
          }
        }
        return true;
      }
      if (t instanceof k) {
        let e = t;
        switch (e.commandType) {
          case k.CommandType.EvalStart:
            this.Assert(
              this.state.inExpressionEvaluation === false,
              'Already in expression evaluation?'
            );
            this.state.inExpressionEvaluation = true;
            break;
          case k.CommandType.EvalEnd:
            this.Assert(
              this.state.inExpressionEvaluation === true,
              'Not in expression evaluation mode'
            );
            this.state.inExpressionEvaluation = false;
            break;
          case k.CommandType.EvalOutput:
            if (this.state.evaluationStack.length > 0) {
              let t = this.state.PopEvaluationStack();
              if (!(t instanceof j)) {
                let e = new E(t.toString());
                this.state.PushToOutputStream(e);
              }
            }
            break;
          case k.CommandType.NoOp:
            break;
          case k.CommandType.Duplicate:
            this.state.PushEvaluationStack(this.state.PeekEvaluationStack());
            break;
          case k.CommandType.PopEvaluatedValue:
            this.state.PopEvaluationStack();
            break;
          case k.CommandType.PopFunction:
          case k.CommandType.PopTunnel:
            let t =
              e.commandType == k.CommandType.PopFunction
                ? r.Function
                : r.Tunnel;
            let n = null;
            if (t == r.Tunnel) {
              let t = this.state.PopEvaluationStack();
              n = s(t, P);
              if (n === null) {
                this.Assert(
                  t instanceof j,
                  "Expected void if ->-> doesn't override target"
                );
              }
            }
            if (this.state.TryExitFunctionEvaluationFromGame()) {
              break;
            }
            if (
              this.state.callStack.currentElement.type == t &&
              this.state.callStack.canPop
            ) {
              this.state.PopCallStack();
              if (n) {
                this.state.divertedPointer = this.PointerAtPath(n.targetPath);
              }
            } else {
              let e = new Map();
              e.set(r.Function, 'function return statement (~ return)');
              e.set(r.Tunnel, 'tunnel onwards statement (->->)');
              let n = e.get(this.state.callStack.currentElement.type);
              if (!this.state.callStack.canPop) {
                n = 'end of flow (-> END or choice)';
              }
              let i = 'Found ' + e.get(t) + ', when expected ' + n;
              this.Error(i);
            }
            break;
          case k.CommandType.BeginString:
            this.state.PushToOutputStream(e);
            this.Assert(
              this.state.inExpressionEvaluation === true,
              'Expected to be in an expression when evaluating a string'
            );
            this.state.inExpressionEvaluation = false;
            break;
          case k.CommandType.EndString:
            let i = [];
            let a = 0;
            for (let t = this.state.outputStream.length - 1; t >= 0; --t) {
              let e = this.state.outputStream[t];
              a++;
              let n = s(e, k);
              if (n && n.commandType == k.CommandType.BeginString) {
                break;
              }
              if (e instanceof E) {
                i.push(e);
              }
            }
            this.state.PopFromOutputStream(a);
            i = i.reverse();
            let o = new f();
            for (let t of i) {
              o.Append(t.toString());
            }
            this.state.inExpressionEvaluation = true;
            this.state.PushEvaluationStack(new E(o.toString()));
            break;
          case k.CommandType.ChoiceCount:
            let u = this.state.generatedChoices.length;
            this.state.PushEvaluationStack(new w(u));
            break;
          case k.CommandType.Turns:
            this.state.PushEvaluationStack(
              new w(this.state.currentTurnIndex + 1)
            );
            break;
          case k.CommandType.TurnsSince:
          case k.CommandType.ReadCount:
            let h = this.state.PopEvaluationStack();
            if (!(h instanceof P)) {
              let t = '';
              if (h instanceof w) {
                t =
                  ". Did you accidentally pass a read count ('knot_name') instead of a target ('-> knot_name')?";
              }
              this.Error(
                'TURNS_SINCE / READ_COUNT expected a divert target (knot, stitch, label name), but saw ' +
                  h +
                  t
              );
              break;
            }
            let c;
            let d = l(h, P);
            let m = s(this.ContentAtPath(d.targetPath).correctObj, x);
            if (m == null) {
              c = e.commandType == k.CommandType.TurnsSince ? -1 : 0;
              this.Warning(
                'Failed to find container for ' +
                  e.toString() +
                  ' lookup at ' +
                  d.targetPath.toString()
              );
            } else {
              c =
                e.commandType == k.CommandType.TurnsSince
                  ? this.state.TurnsSinceForContainer(m)
                  : this.state.VisitCountForContainer(m);
            }
            this.state.PushEvaluationStack(new w(c));
            break;
          case k.CommandType.Random: {
            let t = s(this.state.PopEvaluationStack(), w);
            let e = s(this.state.PopEvaluationStack(), w);
            if (e == null || e instanceof w == false) {
              return this.Error(
                'Invalid value for minimum parameter of RANDOM(min, max)'
              );
            }
            if (t == null || e instanceof w == false) {
              return this.Error(
                'Invalid value for maximum parameter of RANDOM(min, max)'
              );
            }
            if (t.value === null) {
              return p('maxInt.value');
            }
            if (e.value === null) {
              return p('minInt.value');
            }
            let n = t.value - e.value + 1;
            if (!isFinite(n) || n > Number.MAX_SAFE_INTEGER) {
              n = Number.MAX_SAFE_INTEGER;
              this.Error(
                'RANDOM was called with a range that exceeds the size that ink numbers can use.'
              );
            }
            if (n <= 0) {
              this.Error(
                'RANDOM was called with minimum as ' +
                  e.value +
                  ' and maximum as ' +
                  t.value +
                  '. The maximum must be larger'
              );
            }
            let i = this.state.storySeed + this.state.previousRandom;
            let r = new z(i).next();
            let a = r % n + e.value;
            this.state.PushEvaluationStack(new w(a));
            this.state.previousRandom = r;
            break;
          }
          case k.CommandType.SeedRandom:
            let C = s(this.state.PopEvaluationStack(), w);
            if (C == null || C instanceof w == false) {
              return this.Error('Invalid value passed to SEED_RANDOM');
            }
            if (C.value === null) {
              return p('minInt.value');
            }
            this.state.storySeed = C.value;
            this.state.previousRandom = 0;
            this.state.PushEvaluationStack(new j());
            break;
          case k.CommandType.VisitIndex:
            let v =
              this.state.VisitCountForContainer(
                this.state.currentPointer.container
              ) - 1;
            this.state.PushEvaluationStack(new w(v));
            break;
          case k.CommandType.SequenceShuffleIndex:
            let _ = this.NextSequenceShuffleIndex();
            this.state.PushEvaluationStack(new w(_));
            break;
          case k.CommandType.StartThread:
            break;
          case k.CommandType.Done:
            if (this.state.callStack.canPopThread) {
              this.state.callStack.PopThread();
            } else {
              this.state.didSafeExit = true;
              this.state.currentPointer = F.Null;
            }
            break;
          case k.CommandType.End:
            this.state.ForceEnd();
            break;
          case k.CommandType.ListFromInt:
            let T = s(this.state.PopEvaluationStack(), w);
            let O = l(this.state.PopEvaluationStack(), E);
            if (T === null) {
              throw new y(
                'Passed non-integer when creating a list element from a numerical value.'
              );
            }
            let A = null;
            if (this.listDefinitions === null) {
              return p('this.listDefinitions');
            }
            let I = this.listDefinitions.TryListGetDefinition(O.value, null);
            if (!I.exists) {
              throw new y('Failed to find LIST called ' + O.value);
            }
            {
              if (T.value === null) {
                return p('minInt.value');
              }
              let t = I.result.TryGetItemWithValue(T.value, g.Null);
              if (t.exists) {
                A = new N(t.result, T.value);
              }
            }
            if (A == null) {
              A = new N();
            }
            this.state.PushEvaluationStack(A);
            break;
          case k.CommandType.ListRange:
            let W = s(this.state.PopEvaluationStack(), b);
            let V = s(this.state.PopEvaluationStack(), b);
            let L = s(this.state.PopEvaluationStack(), N);
            if (L === null || V === null || W === null) {
              throw new y('Expected list, minimum and maximum for LIST_RANGE');
            }
            if (L.value === null) {
              return p('targetList.value');
            }
            let R = L.value.ListWithSubRange(V.valueObject, W.valueObject);
            this.state.PushEvaluationStack(new N(R));
            break;
          case k.CommandType.ListRandom: {
            let t = this.state.PopEvaluationStack();
            if (t === null) {
              throw new y('Expected list for LIST_RANDOM');
            }
            let e = t.value;
            let n = null;
            if (e === null) {
              throw p('list');
            }
            if (e.Count == 0) {
              n = new S();
            } else {
              let t = this.state.storySeed + this.state.previousRandom;
              let i = new z(t).next();
              let r = i % e.Count;
              let a = e.entries();
              for (let t = 0; t <= r - 1; t++) {
                a.next();
              }
              let s = a.next().value;
              let l = { Key: g.fromSerializedKey(s[0]), Value: s[1] };
              if (l.Key.originName === null) {
                return p('randomItem.Key.originName');
              }
              n = new S(l.Key.originName, this);
              n.Add(l.Key, l.Value);
              this.state.previousRandom = i;
            }
            this.state.PushEvaluationStack(new N(n));
            break;
          }
          default:
            this.Error('unhandled ControlCommand: ' + e);
        }
        return true;
      }
      if (t instanceof R) {
        let e = t;
        let n = this.state.PopEvaluationStack();
        this.state.variablesState.Assign(e, n);
        return true;
      }
      if (t instanceof L) {
        let e = t;
        let n = null;
        if (e.pathForCount == null) {
          n = this.state.variablesState.GetVariableWithName(e.name);
          if (n == null) {
            this.Warning(
              "Variable not found: '" +
                e.name +
                "'. Using default value of 0 (false). This can happen with temporary variables if the declaration hasn't yet been hit. Globals are always given a default value on load if a value doesn't exist in the save state."
            );
            n = new w(0);
          }
        } else {
          let t = e.containerForCount;
          let i = this.state.VisitCountForContainer(t);
          n = new w(i);
        }
        this.state.PushEvaluationStack(n);
        return true;
      }
      if (t instanceof D) {
        let e = t;
        let n = this.state.PopEvaluationStack(e.numberOfParameters);
        let i = e.Call(n);
        this.state.PushEvaluationStack(i);
        return true;
      }
      return false;
    }
    ChoosePathString(t, n = true, i = []) {
      this.IfAsyncWeCant('call ChoosePathString right now');
      if (this.onChoosePathString !== null) {
        this.onChoosePathString(t, i);
      }
      if (n) {
        this.ResetCallstack();
      } else if (this.state.callStack.currentElement.type == r.Function) {
        let e = '';
        let n = this.state.callStack.currentElement.currentPointer.container;
        if (n != null) {
          e = '(' + n.path.toString() + ') ';
        }
        throw new Error(
          'Story was running a function ' +
            e +
            'when you called ChoosePathString(' +
            t +
            ') - this is almost certainly not not what you want! Full stack trace: \n' +
            this.state.callStack.callStackTrace
        );
      }
      this.state.PassArgumentsToEvaluationStack(i);
      this.ChoosePath(new e(t));
    }
    IfAsyncWeCant(t) {
      if (this._asyncContinueActive) {
        throw new Error(
          "Can't " +
            t +
            '. Story is in the middle of a ContinueAsync(). Make more ContinueAsync() calls or a single Continue() call beforehand.'
        );
      }
    }
    ChoosePath(t, e = true) {
      this.state.SetChosenPath(t, e);
      this.VisitChangedContainersDueToDivert();
    }
    ChooseChoiceIndex(t) {
      t = t;
      let e = this.currentChoices;
      this.Assert(t >= 0 && t < e.length, 'choice out of range');
      let n = e[t];
      if (this.onMakeChoice !== null) {
        this.onMakeChoice(n);
      }
      if (n.threadAtGeneration === null) {
        return p('choiceToChoose.threadAtGeneration');
      } else if (n.targetPath === null) {
        return p('choiceToChoose.targetPath');
      } else {
        this.state.callStack.currentThread = n.threadAtGeneration;
        this.ChoosePath(n.targetPath);
        return;
      }
    }
    HasFunction(t) {
      try {
        return this.KnotContainerWithName(t) != null;
      } catch (t) {
        return false;
      }
    }
    EvaluateFunction(t, e = [], n = false) {
      if (this.onEvaluateFunction !== null) {
        this.onEvaluateFunction(t, e);
      }
      this.IfAsyncWeCant('evaluate a function');
      if (t == null) {
        throw new Error('Function is null');
      }
      if (t == '' || t.trim() == '') {
        throw new Error('Function is empty or white space.');
      }
      let i = this.KnotContainerWithName(t);
      if (i == null) {
        throw new Error("Function doesn't exist: '" + t + "'");
      }
      let r = [];
      r.push(...this.state.outputStream);
      this._state.ResetOutput();
      this.state.StartFunctionEvaluationFromGame(i, e);
      let a = new f();
      while (this.canContinue) {
        a.Append(this.Continue());
      }
      let s = a.toString();
      this._state.ResetOutput(r);
      let l = this.state.CompleteFunctionEvaluationFromGame();
      if (this.onCompleteEvaluateFunction != null) {
        this.onCompleteEvaluateFunction(t, e, s, l);
      }
      if (n) {
        return { returned: l, output: s };
      } else {
        return l;
      }
    }
    EvaluateExpression(t) {
      let e = this.state.callStack.elements.length;
      this.state.callStack.Push(r.Tunnel);
      this._temporaryEvaluationContainer = t;
      this.state.GoToStart();
      let n = this.state.evaluationStack.length;
      this.Continue();
      this._temporaryEvaluationContainer = null;
      if (this.state.callStack.elements.length > e) {
        this.state.PopCallStack();
      }
      if (this.state.evaluationStack.length > n) {
        return this.state.PopEvaluationStack();
      } else {
        return null;
      }
    }
    CallExternalFunction(t, e) {
      if (t === null) {
        return p('funcName');
      }
      let n = this._externals.get(t);
      let i = null;
      let a = n !== void 0;
      if (a && !n.lookAheadSafe && this._stateSnapshotAtLastNewline !== null) {
        this._sawLookaheadUnsafeFunctionAfterNewline = true;
        return;
      }
      if (!a) {
        if (this.allowExternalFunctionFallbacks) {
          i = this.KnotContainerWithName(t);
          this.Assert(
            i !== null,
            "Trying to call EXTERNAL function '" +
              t +
              "' which has not been bound, and fallback ink function could not be found."
          );
          this.state.callStack.Push(
            r.Function,
            void 0,
            this.state.outputStream.length
          );
          this.state.divertedPointer = F.StartOf(i);
          return;
        }
        this.Assert(
          false,
          "Trying to call EXTERNAL function '" +
            t +
            "' which has not been bound (and ink fallbacks disabled)."
        );
      }
      let s = [];
      for (let t = 0; t < e; ++t) {
        let t = l(this.state.PopEvaluationStack(), b).valueObject;
        s.push(t);
      }
      s.reverse();
      let o = n.function(s);
      let u = null;
      if (o == null) {
        u = new j();
      } else {
        u = b.Create(o);
        this.Assert(
          u !== null,
          'Could not create ink value from returned object of type ' + typeof o
        );
      }
      this.state.PushEvaluationStack(u);
    }
    BindExternalFunctionGeneral(t, e, n) {
      this.IfAsyncWeCant('bind an external function');
      this.Assert(
        !this._externals.has(t),
        "Function '" + t + "' has already been bound."
      );
      this._externals.set(t, { function: e, lookAheadSafe: n });
    }
    TryCoerce(t) {
      return t;
    }
    BindExternalFunction(t, e, n) {
      this.Assert(e != null, "Can't bind a null function");
      this.BindExternalFunctionGeneral(
        t,
        t => {
          this.Assert(
            t.length >= e.length,
            'External function expected ' + e.length + ' arguments'
          );
          let n = [];
          let e = 0;
          for (let i = t.length; e < i; e++) {
            n[e] = this.TryCoerce(t[e]);
          }
          return e.apply(null, n);
        },
        n
      );
    }
    UnbindExternalFunction(t) {
      this.IfAsyncWeCant('unbind an external a function');
      this.Assert(
        this._externals.has(t),
        "Function '" + t + "' has not been bound."
      );
      this._externals.delete(t);
    }
    ValidateExternalBindings() {
      let t = null;
      let e = null;
      let n = arguments[1] || new Set();
      if (arguments[0] instanceof x) {
        t = arguments[0];
      }
      if (arguments[0] instanceof m) {
        e = arguments[0];
      }
      if (t === null && e === null) {
        this.ValidateExternalBindings(this._mainContentContainer, n);
        this._hasValidatedExternals = true;
        if (n.size == 0) {
          this._hasValidatedExternals = true;
        } else {
          let t = 'Error: Missing function binding for external';
          t += n.size > 1 ? 's' : '';
          t += ": '";
          t += Array.from(n).join("', '");
          t += "' ";
          t += this.allowExternalFunctionFallbacks
            ? ', and no fallback ink function found.'
            : ' (ink fallbacks disabled)';
          this.Error(t);
        }
      } else if (t == null) {
        if (e != null) {
          let t = s(e, W);
          if (t && t.isExternal) {
            let e = t.targetPathString;
            if (e === null) {
              return p('name');
            }
            if (!this._externals.has(e)) {
              if (this.allowExternalFunctionFallbacks) {
                if (!this.mainContentContainer.namedContent.has(e)) {
                  n.add(e);
                }
              } else {
                n.add(e);
              }
            }
          }
        }
      } else {
        for (let e of t.content) {
          let t = e;
          if (t == null || !t.hasValidName) {
            this.ValidateExternalBindings(e, n);
          }
        }
        for (let [, e] of t.namedContent) {
          this.ValidateExternalBindings(s(e, m), n);
        }
      }
    }
    ObserveVariable(t, e) {
      this.IfAsyncWeCant('observe a new variable');
      if (this._variableObservers === null) {
        this._variableObservers = new Map();
      }
      if (!this.state.variablesState.GlobalVariableExistsWithName(t)) {
        throw new Error(
          "Cannot observe variable '" +
            t +
            "' because it wasn't declared in the ink story."
        );
      }
      if (this._variableObservers.has(t)) {
        this._variableObservers.get(t).push(e);
      } else {
        this._variableObservers.set(t, [e]);
      }
    }
    ObserveVariables(t, e) {
      let n = 0;
      for (let i = t.length; n < i; n++) {
        this.ObserveVariable(t[n], e[n]);
      }
    }
    RemoveVariableObserver(t, e) {
      this.IfAsyncWeCant('remove a variable observer');
      if (this._variableObservers !== null) {
        if (e == null) {
          if (t != null) {
            let e = this._variableObservers.keys();
            for (let n of e) {
              let e = this._variableObservers.get(n);
              if (e != null) {
                e.splice(e.indexOf(t), 1);
                if (e.length === 0) {
                  this._variableObservers.delete(n);
                }
              }
            }
          }
        } else if (this._variableObservers.has(e)) {
          if (t == null) {
            this._variableObservers.delete(e);
          } else {
            let n = this._variableObservers.get(e);
            if (n != null) {
              n.splice(n.indexOf(t), 1);
              if (n.length === 0) {
                this._variableObservers.delete(e);
              }
            }
          }
        }
      }
    }
    VariableStateDidChangeEvent(t, e) {
      if (this._variableObservers === null) {
        return;
      }
      let n = this._variableObservers.get(t);
      if (n !== void 0) {
        if (!(e instanceof b)) {
          throw new Error(
            "Tried to get the value of a variable that isn't a standard type"
          );
        }
        let i = l(e, b);
        for (let e of n) {
          e(t, i.valueObject);
        }
      }
    }
    get globalTags() {
      return this.TagsAtStartOfFlowContainerWithPathString('');
    }
    TagsForContentAtPath(t) {
      return this.TagsAtStartOfFlowContainerWithPathString(t);
    }
    TagsAtStartOfFlowContainerWithPathString(t) {
      let n = new e(t);
      let i = this.ContentAtPath(n).container;
      if (i === null) {
        return p('flowContainer');
      }
      let r = null;
      for (let t of i.content) {
        let e = s(t, B);
        if (!e) {
          break;
        }
        if (r == null) {
          r = [];
        }
        r.push(e.text);
      }
      return r;
    }
    BuildStringOfHierarchy() {
      let t = new f();
      this.mainContentContainer.BuildStringOfHierarchy(
        t,
        0,
        this.state.currentPointer.Resolve()
      );
      return t.toString();
    }
    BuildStringOfContainer(t) {
      let e = new f();
      t.BuildStringOfHierarchy(e, 0, this.state.currentPointer.Resolve());
      return e.toString();
    }
    NextContent() {
      this.state.previousPointer = this.state.currentPointer.copy();
      if (
        !this.state.divertedPointer.isNull &&
        ((this.state.currentPointer = this.state.divertedPointer.copy()),
        (this.state.divertedPointer = F.Null),
        this.VisitChangedContainersDueToDivert(),
        !this.state.currentPointer.isNull)
      ) {
        return;
      }
      if (!this.IncrementContentPointer()) {
        let t = false;
        if (this.state.callStack.CanPop(r.Function)) {
          this.state.PopCallStack(r.Function);
          if (this.state.inExpressionEvaluation) {
            this.state.PushEvaluationStack(new j());
          }
          t = true;
        } else if (this.state.callStack.canPopThread) {
          this.state.callStack.PopThread();
          t = true;
        } else {
          this.state.TryExitFunctionEvaluationFromGame();
        }
        if (t && !this.state.currentPointer.isNull) {
          this.NextContent();
        }
      }
    }
    IncrementContentPointer() {
      let t = true;
      let e = this.state.callStack.currentElement.currentPointer.copy();
      e.index++;
      if (e.container === null) {
        return p('pointer.container');
      }
      while (e.index >= e.container.content.length) {
        t = false;
        let n = s(e.container.parent, x);
        if (n instanceof x == false) {
          break;
        }
        let i = n.content.indexOf(e.container);
        if (i == -1) {
          break;
        }
        e = new F(n, i);
        e.index++;
        t = true;
        if (e.container === null) {
          return p('pointer.container');
        }
      }
      if (!t) {
        e = F.Null;
      }
      this.state.callStack.currentElement.currentPointer = e.copy();
      return t;
    }
    TryFollowDefaultInvisibleChoice() {
      let t = this._state.currentChoices;
      let e = t.filter(t => t.isInvisibleDefault);
      if (e.length == 0 || t.length > e.length) {
        return false;
      }
      let n = e[0];
      if (n.targetPath === null) {
        return p('choice.targetPath');
      } else if (n.threadAtGeneration === null) {
        return p('choice.threadAtGeneration');
      } else {
        this.state.callStack.currentThread = n.threadAtGeneration;
        if (this._stateSnapshotAtLastNewline !== null) {
          this.state.callStack.currentThread = this.state.callStack.ForkThread();
        }
        this.ChoosePath(n.targetPath, false);
        return true;
      }
    }
    NextSequenceShuffleIndex() {
      let t = s(this.state.PopEvaluationStack(), w);
      if (!(t instanceof w)) {
        this.Error('expected number of elements in sequence for shuffle index');
        return 0;
      }
      let e = this.state.currentPointer.container;
      if (e === null) {
        return p('seqContainer');
      }
      if (t.value === null) {
        return p('numElementsIntVal.value');
      }
      let n = t.value;
      let i = l(this.state.PopEvaluationStack(), w).value;
      if (i === null) {
        return p('seqCount');
      }
      let r = i / n;
      let a = i % n;
      let o = e.path.toString();
      let u = 0;
      let t = 0;
      for (let e = o.length; t < e; t++) {
        u += o.charCodeAt(t) || 0;
      }
      let h = u + r + this.state.storySeed;
      let c = new z(Math.floor(h));
      let d = [];
      for (let t = 0; t < n; ++t) {
        d.push(t);
      }
      for (let t = 0; t <= a; ++t) {
        let e = c.next() % d.length;
        let n = d[e];
        d.splice(e, 1);
        if (t == a) {
          return n;
        }
      }
      throw new Error('Should never reach here');
    }
    Error(t, e = false) {
      let n = new y(t);
      n.useEndLineNumber = e;
      throw n;
    }
    Warning(t) {
      this.AddError(t, true);
    }
    AddError(t, e = false, n = false) {
      let i = this.currentDebugMetadata;
      let r = e ? 'WARNING' : 'ERROR';
      if (i == null) {
        t = this.state.currentPointer.isNull
          ? 'RUNTIME ' + r + ': ' + t
          : 'RUNTIME ' + r + ': (' + this.state.currentPointer + '): ' + t;
      } else {
        let e = n ? i.endLineNumber : i.startLineNumber;
        t = 'RUNTIME ' + r + ": '" + i.fileName + "' line " + e + ': ' + t;
      }
      this.state.AddError(t, e);
      if (!e) {
        this.state.ForceEnd();
      }
    }
    Assert(t, e = null) {
      if (t == 0) {
        if (e == null) {
          e = 'Story assert';
        }
        throw new Error(e + ' ' + this.currentDebugMetadata);
      }
    }
    get currentDebugMetadata() {
      let t;
      let e = this.state.currentPointer;
      if (
        !e.isNull &&
        e.Resolve() !== null &&
        ((t = e.Resolve().debugMetadata), t !== null)
      ) {
        return t;
      }
      for (let n = this.state.callStack.elements.length - 1; n >= 0; --n) {
        e = this.state.callStack.elements[n].currentPointer;
        if (
          !e.isNull &&
          e.Resolve() !== null &&
          ((t = e.Resolve().debugMetadata), t !== null)
        ) {
          return t;
        }
      }
      for (let e = this.state.outputStream.length - 1; e >= 0; --e) {
        t = this.state.outputStream[e].debugMetadata;
        if (t !== null) {
          return t;
        }
      }
      return null;
    }
    get mainContentContainer() {
      if (this._temporaryEvaluationContainer) {
        return this._temporaryEvaluationContainer;
      } else {
        return this._mainContentContainer;
      }
    }
  }
  Z.inkVersionCurrent = 20;
  (function() {
    var t = Z || (Z = {});
    var e;
    (e = t.OutputStateChange || (t.OutputStateChange = {}))[(e.NoChange = 0)] =
      'NoChange';
    e[(e.ExtendedBeyondNewline = 1)] = 'ExtendedBeyondNewline';
    e[(e.NewlineRemoved = 2)] = 'NewlineRemoved';
  })();
  t.InkList = S;
  t.Story = Z;
  Object.defineProperty(t, '__esModule', { value: true });
});
