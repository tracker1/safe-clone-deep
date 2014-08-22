# safe-clone-deep module for JavaScript

This module exposes a single function that accepts an object and clones it without circular references.

## Installation

```
npm install safe-clone-deep
```

## Usage

```javascript
var clone = require('safe-clone-deep');

var a = {};
a.a = a;
a.b = {};
a.b.a = a;
a.b.b = a.b;
a.c = {};
a.c.b = a.b;
a.c.c = a.c;
a.x = 1;
a.b.x = 2;
a.c.x = 3;
a.d = [0,a,1,a.b,2,a.c,3];

console.log(util.inspect(clone(a), {showHidden:false,depth:4}))
clone(a)
```

result...

```
{ a: undefined,
  b: { a: undefined, b: undefined, x: 2 },
  c: { b: { a: undefined, b: undefined, x: 2 }, c: undefined, x: 3 },
  x: 1,
  d:
   [ 0,
     undefined,
     1,
     { a: undefined, b: undefined, x: 2 },
     2,
     { b: { a: undefined, b: undefined, x: 2 }, c: undefined, x: 3 },
     3 ] }
```

### Specify circularValue

You can also pass a default value to use for circular references.

```javascript
clone(a,'[Circular]');
```

result...

```
{ a: '[Circular]',
  b: { a: '[Circular]', b: '[Circular]', x: 2 },
  c:
   { b: { a: '[Circular]', b: '[Circular]', x: 2 },
     c: '[Circular]',
     x: 3 },
  x: 1,
  d:
   [ 0,
     '[Circular]',
     1,
     { a: '[Circular]', b: '[Circular]', x: 2 },
     2,
     { b: { a: '[Circular]', b: '[Circular]', x: 2 },
       c: '[Circular]',
       x: 3 },
     3 ] }
```

With the `undefined` default value, JSON.stringify will not keep the keys, which is likely the desired result.

```
JSON.stringify(clone(a));
```

result

```
{"b":{"x":2},"c":{"b":{"x":2},"x":3},"x":1,"d":[0,null,1,{"x":2},2,{"b":{"x":2},"x":3},3]}
```
