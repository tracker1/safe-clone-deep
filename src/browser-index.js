'use strict';

var safeDeepClone = require('./safe-deep-clone');

//method to wrap the cloning method
function cloneWrap(obj, circularValue) { 
  circularValue = safeDeepClone(undefined, [], circularValue);
  return safeDeepClone(circularValue, [], obj); 
}

//value to use when a circular reference is found
cloneWrap.circularValue = undefined;

module.exports = cloneWrap;
