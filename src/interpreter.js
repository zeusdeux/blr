'use strict';

const s = require('./scope');
const params = Symbol('Symbol for internal property that maps to formal paramters to a function in blr lang');

function makeReturnVal(env, val) {
  return { env: env, val: val };
}

function getReturnVal(returnObj) {
  return returnObj.val;
}

function interpret(env, node) {
  switch(node.type) {
  case 'Program':
    return programHandler(env, node.val);
  case 'Atom':
    return atomHandler(env, node.val);
  case 'InvocationExpression':
    return invExprHandler(env, node.val);
  case 'OperatorExpression':
    return opExprHandler(env, node.val);
  case 'AssignmentExpression':
    return assgnExprHandler(env, node.val);
  case 'TernaryExpression':
    return ternaryExprHandler(env, node.val);
  }
}

function blockHandler(env, args, fnBody) {
  let returnObj;
  let newEnv = s.newScope(env);

  // setup params in new env
  if (fnBody[params]) {
    fnBody[params].forEach(
      (param, i) => newEnv = s.setInScope(newEnv, param, args[i])
    );
  }
  fnBody.val.forEach(expr => {
    returnObj = interpret(newEnv, expr);
    newEnv = returnObj.env;
  });
  return returnObj;
}

function ternaryExprHandler(env, node) {
  const predicate = getReturnVal(interpret(env, node[0]));
  const trueBlock = node[1];
  const falseBlock = node[2];

  if ('boolean' !== typeof predicate) throw new Error('Predicate given to ternary operator must be boolean');

  if (predicate) return blockHandler(env, [], trueBlock);
  return blockHandler(env, [], falseBlock);
}

function assgnExprHandler(env, node) {
  switch(node.type) {
  case 'SimpleAssignmentExpression':
    return makeReturnVal(
      s.setInScope(
        env,
        node.val[0],
        getReturnVal(interpret(env, node.val[1]))
      )
    );
  case 'BlockAssignmentExpression':
    const fnName = node.val[0][0];
    const argNames = node.val[0].slice(1);
    let fnBody = node.val[1];

    // set params as part of body
    fnBody[params] = argNames;

    return makeReturnVal(
      s.setInScope(
        env,
        fnName,
        fnBody
      )
    );
  }
}

function programHandler(env, node) {
  let returnObj;

  node.forEach(expr => {
    returnObj = interpret(env, expr);
    env = returnObj.env;
  });

  return returnObj;
}

function atomHandler(env, node) {
  switch(node.type) {
  case 'Number':
  case 'Boolean':
  case 'String':
    return makeReturnVal(env, node.val);
  case 'Identifier':
    return makeReturnVal(env, s.getFromScope(env, node.val));
  }
}

function invExprHandler(env, node) {
  const fnName = node[0];
  const args = node[1].map(n => getReturnVal(interpret(env, n)));
  const fnBody = s.getFromScope(env, fnName);

  if ('Block' === fnBody.type) return blockHandler(env, args, fnBody);

  // exec function body
  if ('function' === typeof fnBody) return makeReturnVal(env, fnBody.apply(null, args));

  // if fnBody not an object, return as is (it might be a primitive)
  if (!(fnBody instanceof Object)) return makeReturnVal(env, fnBody);
}

function opExprHandler(env, node) {
  const op1 = getReturnVal(interpret(env, node[0]));
  const opr = node[1];
  const op2 = getReturnVal(interpret(env, node[2]));

  switch(opr) {
  case '+':
    return makeReturnVal(env, op1 + op2);
  case '-':
    return makeReturnVal(env, op1 - op2);
  case '/':
    return makeReturnVal(env, op1 / op2);
  case '*':
    return makeReturnVal(env, op1 * op2);
  case '<':
    return makeReturnVal(env, op1 < op2);
  case '>':
    return makeReturnVal(env, op1 > op2);
  case '<=':
    return makeReturnVal(env, op1 <= op2);
  case '>=':
    return makeReturnVal(env, op1 >= op2);
  case '==':
    return makeReturnVal(env, op1 === op2);
  case '!=':
    return makeReturnVal(env, op1 !== op2);
  case '&&':
    return makeReturnVal(env, op1 && op2);
  case '||':
    return makeReturnVal(env, op1 || op2);
  }
}

module.exports = interpret;
