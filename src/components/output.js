import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

var opList = ["div", "add", "sub", "mul"];
var ops = product(opList, 3);
var opMap = { add: "+", sub: "-", mul: "x", div: "/" };

var opFunc = {
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
  mul: (a, b) => a * b,
  div: (a, b) => a / b
};

function product(iterables, repeat) {
  var argv = Array.prototype.slice.call(arguments),
    argc = argv.length;
  if (argc === 2 && !isNaN(argv[argc - 1])) {
    var copies = [];
    for (var i = 0; i < argv[argc - 1]; i++) {
      copies.push(argv[0].slice()); // Clone
    }
    argv = copies;
  }
  return argv.reduce(
    function tl(accumulator, value) {
      var tmp = [];
      accumulator.forEach(function(a0) {
        value.forEach(function(a1) {
          tmp.push(a0.concat(a1));
        });
      });
      return tmp;
    },
    [[]]
  );
}

function uniqueList(list) {
  let ans = [];
  for (var l of list) {
    let ls = JSON.stringify(l);
    if (ans.indexOf(ls) < 0) {
      ans.push(ls);
    }
  }
  return ans.map(x => JSON.parse(x));
}

const permutator = inputArr => {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
};

function is24(map) {
  var numList = [];
  var n1, n2, n3, n4;
  var ans = [];
  for (var key in map) {
    numList.push(parseFloat(map[key]));
  }
  var numLists = uniqueList(permutator(numList));
  for (var nums of numLists) {
    [n1, n2, n3, n4] = nums;
    for (var op of ops) {
      var op1, op2, op3, opFunc1, opFunc2, opFunc3;
      var result = 0;
      [op1, op2, op3] = op;
      opFunc1 = opFunc[op1];
      opFunc2 = opFunc[op2];
      opFunc3 = opFunc[op3];

      result = opFunc3(opFunc2(opFunc1(n1, n2), n3), n4);
      if (result === 24) {
        ans.push(
          "((" +
            n1 +
            opMap[op1] +
            n2 +
            ")" +
            opMap[op2] +
            n3 +
            ")" +
            opMap[op3] +
            n4
        );
      }

      result = opFunc1(n1, opFunc2(n2, opFunc3(n3, n4)));
      if (result === 24) {
        ans.push(
          n1 +
            opMap[op1] +
            "(" +
            n2 +
            opMap[op2] +
            "(" +
            n3 +
            opMap[op3] +
            n4 +
            "))"
        );
      }

      result = opFunc2(opFunc1(n1, n2), opFunc3(n3, n4));
      if (result === 24) {
        ans.push(
          "(" +
            n1 +
            opMap[op1] +
            n2 +
            ")" +
            opMap[op2] +
            "(" +
            n3 +
            opMap[op3] +
            n4 +
            ")"
        );
      }
    }
  }

  return ans;
}

const result = props => {
  var output = null;
  var ans = is24(props.num);
  if (props.showState) {
    if (ans.length === 0) {
      output = <h6>Yikes. I can't find a solution!</h6>;
    } else {
      output = (
        <ListGroup variant="flush">
          {is24(props.num).map((x, index) => (
            <ListGroup.Item key={index}>{x}</ListGroup.Item>
          ))}
        </ListGroup>
      );
    }
  }

  return <div>{output}</div>;
};

export default result;
