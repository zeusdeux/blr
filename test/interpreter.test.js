'use strict';

const fixtures = [
  /* simple program */
  'print "test"\n', 'print (2 + 2)\n',
  'print true\nprint "dude"\n',

  /* assignment */
  'let a = 10\nprint "omg a is %d" a\n', 'let add x y = { x + y; }\nprint (add 10 20);',
];

fixtures.push(require('fs').readFileSync(require('path').resolve(__dirname, './fib.blr'), 'utf8'));

module.exports = fixtures;


/*


    "type": "Program",
    "val": [
        {
            "type": "AssignmentExpression",
            "val": {
                "type": "BlockAssignmentExpression",
                "val": [
                    [
                        "fib",
                        "n"
                    ],
                    {
                        "type": "Block",
                        "val": [
                            {
                                "type": "TernaryExpression",
                                "val": [
                                    {
                                        "type": "OperatorExpression",
                                        "val": [
                                            {
                                                "type": "InvocationExpression",
                                                "val": [
                                                    "n",
                                                    []
                                                ]
                                            },
                                            "<=",
                                            {
                                                "type": "Atom",
                                                "val": {
                                                    "type": "Number",
                                                    "val": 1
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        "type": "Block",
                                        "val": [
                                            {
                                                "type": "Atom",
                                                "val": {
                                                    "type": "Number",
                                                    "val": 1
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        "type": "Block",
                                        "val": [
                                            {
                                                "type": "OperatorExpression",
                                                "val": [
                                                    {
                                                        "type": "InvocationExpression",
                                                        "val": [
                                                            "fib",
                                                            [
                                                                {
                                                                    "type": "OperatorExpression",
                                                                    "val": [
                                                                        {
                                                                            "type": "InvocationExpression",
                                                                            "val": [
                                                                                "n",
                                                                                []
                                                                            ]
                                                                        },
                                                                        "-",
                                                                        {
                                                                            "type": "Atom",
                                                                            "val": {
                                                                                "type": "Number",
                                                                                "val": 1
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        ]
                                                    },
                                                    "+",
                                                    {
                                                        "type": "InvocationExpression",
                                                        "val": [
                                                            "fib",
                                                            [
                                                                {
                                                                    "type": "OperatorExpression",
                                                                    "val": [
                                                                        {
                                                                            "type": "InvocationExpression",
                                                                            "val": [
                                                                                "n",
                                                                                []
                                                                            ]
                                                                        },
                                                                        "-",
                                                                        {
                                                                            "type": "Atom",
                                                                            "val": {
                                                                                "type": "Number",
                                                                                "val": 2
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        {
            "type": "InvocationExpression",
            "val": [
                "print",
                [
                    {
                        "type": "InvocationExpression",
                        "val": [
                            "fib",
                            [
                                {
                                    "type": "Atom",
                                    "val": {
                                        "type": "Number",
                                        "val": 10
                                    }
                                }
                            ]
                        ]
                    }
                ]
            ]
        }
    ]
}

{
    "type": "Program",
    "val": [
        {
            "type": "AssignmentExpression",
            "val": {
                "type": "BlockAssignmentExpression",
                "val": [
                    [
                        "add",
                        "x",
                        "y"
                    ],
                    {
                        "type": "Block",
                        "val": [
                            {
                                "type": "OperatorExpression",
                                "val": [
                                    {
                                        "type": "InvocationExpression",
                                        "val": [
                                            "x",
                                            []
                                        ]
                                    },
                                    "+",
                                    {
                                        "type": "InvocationExpression",
                                        "val": [
                                            "y",
                                            []
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        {
            "type": "InvocationExpression",
            "val": [
                "print",
                [
                    {
                        "type": "InvocationExpression",
                        "val": [
                            "add",
                            [
                                {
                                    "type": "Atom",
                                    "val": {
                                        "type": "Number",
                                        "val": 10
                                    }
                                },
                                {
                                    "type": "Atom",
                                    "val": {
                                        "type": "Number",
                                        "val": 20
                                    }
                                }
                            ]
                        ]
                    }
                ]
            ]
        }
    ]
}

{
    "type": "Program",
    "val": [
        {
            "type": "AssignmentExpression",
            "val": {
                "type": "SimpleAssignmentExpression",
                "val": [
                    "a",
                    {
                        "type": "Atom",
                        "val": {
                            "type": "Number",
                            "val": 10
                        }
                    }
                ]
            }
        },
        {
            "type": "InvocationExpression",
            "val": [
                "print",
                [
                    {
                        "type": "Atom",
                        "val": {
                            "type": "String",
                            "val": "omg a is %d"
                        }
                    },
                    {
                        "type": "InvocationExpression",
                        "val": [
                            "a",
                            []
                        ]
                    }
                ]
            ]
        }
    ]
}

{
    "type": "Program",
    "val": [
        {
            "type": "AssignmentExpression",
            "val": {
                "type": "SimpleAssignmentExpression",
                "val": [
                    "a",
                    {
                        "type": "Atom",
                        "val": {
                            "type": "Number",
                            "val": 10
                        }
                    }
                ]
            }
        }
    ]
}

{
    "type": "Program",
    "val": [
        {
            "type": "InvocationExpression",
            "val": [
                "print",
                [
                    {
                        "type": "OperatorExpression",
                        "val": [
                            {
                                "type": "Number",
                                "val": 1
                            },
                            "+",
                            {
                                "type": "Number",
                                "val": 1
                            }
                        ]
                    }
                ]
            ]
        }
    ]
}

{
    "type": "Program",
    "val": [
        {
            "type": "InvocationExpression",
            "val": [
                "print",
                [
                    {
                        "type": "Atom",
                        "val": {
                            "type": "String",
                            "val": "test"
                        }
                    }
                ]
            ]
        }
    ]
}

*/
