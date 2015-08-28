'use strict';

const parentSymbol = Symbol('Symbol used as key for parent scope');


exports.newScope = function newScope(parentScope) {
  let scope = new Map();

  scope.set(parentSymbol, parentScope);
  return scope;
};

exports.getFromScope = function getFromScope(scope, name) {
  if (scope.has(name)) return scope.get(name);

  let parent = scope.get(parentSymbol);

  if (!parent) throw new Error(name + ' not found');
  else return getFromScope(parent, name);
};

exports.setInScope = function setInScope(scope, name, value) {
  let newScope = new Map(scope);

  newScope.set(name, value);
  return newScope;
};
