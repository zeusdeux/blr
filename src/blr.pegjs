{
  function node(type, val) {
    return { type: type, val: val };
  }
}

start
  = exprs:Expressions* { return node("Program", exprs.filter(function(e) { return !!e; })) }

Expressions "Expressions"
  = expr:Expression? _ ExpressionTerminator _ { return expr }

ExpressionTerminator "ExpressionTerminator"
  = Newline
  / Semicolon

Expression "Expression"
  = AssignmentExpression
  / TernaryExpression
  / OperatorExpression
  / InvocationExpression
  / Atom
  / "(" _n* expr:Expression _n* ")" { return expr }

Whitespace "Whitespace"
  = [ \t]
_
  = Whitespace*
__
  = Whitespace+

Newline "Newline"
  = "\n"
  / "\r\n"

_n "WhitespaceOrNewline"
  = Whitespace
  / Newline

Semicolon "Semicolon"
  = ";"

Atom "Atom"
  = number:Number { return node("Atom", node("Number", number)) }
  / bool:Boolean { return node("Atom", node("Boolean", bool)) }
  / string:String { return node("Atom", node("String", string)) }
  / id:Identifier { return node("Atom", node("Identifier", id)) }

Digit "Digit"
  = [0-9]

Digits "Digits"
  = digits:Digit+ { return digits.join("") }

Number "Number"
  = Float
  / Integer

Integer "Integer"
  = num:("-"Digits) { return parseInt(num.join(""), 10) }
  / num:Digits { return parseInt(num, 10) }

Float "Float"
  = num:("-"Digits"."Digits) { return parseFloat(num.join(""), 10) }
  / num:(Digits"."Digits) { return parseFloat(num.join(""), 10) }

Boolean "Boolean"
  = "true" { return true }
  / "false" { return false }

Alphabet "Alphabet"
  = [a-zA-Z]

Symbol
  = [%]

Char "Char"
  = Alphabet
  / Digit
  / Symbol
  / Whitespace

String "String"
  = "\"" chars:Char* "\"" { return chars.join("") }

Identifier "Identifier"
  = !(Keyword / Boolean) first:("_" / Alphabet)rest:(Alphabet / Digit)* { return first + rest.join("")}

Keyword "Keyword"
  = "let"

Identifiers "Identifiers"
  = id:Identifier __ { return id }

AssignmentExpression "AssignmentExpression"
  = "let" __ ids:Identifiers+ "=" _ block:Block { return node("AssignmentExpression", node("BlockAssignmentExpression", [ids, block])) }
  / "let" __ id:Identifier __ "=" _ expr:Expression { return node("AssignmentExpression", node("SimpleAssignmentExpression", [id, expr])) }

Block "Block"
  = "{" _n* exprs:Expressions* _n* "}" { return node("Block", exprs) }

OperatorExpression "OperatorExpression"
  = operand1:Operand _ operator:BinaryOperator _ operand2:Operand { return node("OperatorExpression", [operand1, operator, operand2]) }

Operand "Operand"
  = InvocationExpression
  / Atom

BinaryOperator "BinaryOperator"
  = ArithmeticOp
  / LogicalOp

ArithmeticOp "ArithmeticOp"
  = "+" / "-" / "*" / "/"

LogicalOp "LogicalOp"
  = "<=" / ">=" / "<" / ">" / "==" / "!=" / "&&" / "||"

InvocationExpression "InvocationExpression"
  = fnName:Identifier args:Arguments* { return node("InvocationExpression", [fnName, args])}

Arguments "Arguments"
  = __ arg:Expression { return arg }

TernaryExpression "TernaryExpression"
  = predicate:Predicate  _ "?" _ trueBlock:(Block / Expression) _ ":" _ falseBlock:(Block / Expression) { return node("TernaryExpression", [predicate, trueBlock, falseBlock]) }

Predicate "Predicate"
  = OperatorExpression
  / InvocationExpression
  / Atom
  / "(" _ predicate:Predicate _ ")" { return predicate }
