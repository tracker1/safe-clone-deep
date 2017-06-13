'use strict';

var Buffer = require('buffer');
var safeDeepClone = require('./safe-deep-clone');

//method to wrap the cloning method
function cloneWrap(obj, circularValue) { 
  circularValue = safeDeepClone(undefined, [], circularValue, Buffer.isBuffer);
  return safeDeepClone(circularValue, [], obj, Buffer.isBuffer); 
}

//value to use when a circular reference is found
cloneWrap.circularValue = undefined;

module.exports = cloneWrap;
