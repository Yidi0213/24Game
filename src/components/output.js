import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

/**
 * return a list of permutations, given that repetition is allowed.
 * @param {a list of elements to be grouped} iterables 
 * @param {the size of the products} repeat 
 */
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

var opList = ["div", "add", "sub", "mul"];
var ops = product(opList, 3);
var opMap = { add: "+", sub: "-", mul: "x", div: "/" };

var opFunc = {
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
  mul: (a, b) => a * b,
  div: (a, b) => a / b
};


/**
 * get rid of same elements in the list.
 * @param {a list contains repeated elements} list 
 */
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


/**
 * taken into the consideration of numbers' order
 * @param {a list of operations} inputArr 
 */
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
  var middle2 = [];
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
      var firstNum, secondNum, numStr;
      [op1, op2, op3] = op;   //a list of ops name
      [opFunc1,opFunc2,opFunc3] = op.map(x=>opFunc[x]); //a list of ops function

      // ((n1 op1 n2) op2 n3) op3 n4
      var expression1 = (num1=n1,num2=n2,num3=n3,num4=n4,opr1=op1,opr2=op2,opr3=op3) => `((${num1}${opMap[opr1]}${num2})${opMap[opr2]}${num3})${opMap[opr3]}${num4}`;
      firstNum = opFunc1(n1, n2);
      secondNum = opFunc2(firstNum,n3);
      result = opFunc3(secondNum,n4);
      // result = opFunc3(opFunc2(opFunc1(n1, n2), n3), n4);
      // console.log(firstNum.toString()+"\\"+secondNum.toString());
      numStr = firstNum.toString()+"\\"+secondNum.toString()
      if (result === 24 && middle2.indexOf(numStr)===-1) {
        middle2.push(numStr);
        ans.push(expression1());
      }

      //(n1 op1 (n2 op2 (n3 op3 n4)))
      var expression2 = (num1=n1,num2=n2,num3=n3,num4=n4,opr1=op1,opr2=op2,opr3=op3) =>`${num1}${opMap[opr1]}(${num2}${opMap[opr2]}(${num3}${opMap[opr3]}${num4}))`
      firstNum = opFunc3(n3, n4);
      secondNum = opFunc2(n2,firstNum);
      result = opFunc1(n1, opFunc2(n2, opFunc3(n3, n4)));
      numStr = firstNum.toString()+"\\"+secondNum.toString();
      if (result === 24 && middle2.indexOf(numStr)===-1) {
        middle2.push(numStr);
        ans.push(expression2());
      }

      //(n1 op1 n2) op2 (n3 op3 n4)
      var expression3 = (num1=n1,num2=n2,num3=n3,num4=n4,opr1=op1,opr2=op2,opr3=op3) => `(${num1}${opMap[opr1]}${num2})${opMap[opr2]}(${num3}${opMap[opr3]}${num4})`
      firstNum = opFunc1(n1, n2);
      secondNum = opFunc3(n3,n4);
      result = opFunc2(firstNum,secondNum);
      // result = opFunc2(opFunc1(n1, n2), opFunc3(n3, n4));
      if (result === 24&&middle2.indexOf(numStr)===-1) {
        middle2.push(numStr);
        ans.push(expression3());
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
          {ans.map((x, index) => (
            <ListGroup.Item key={index}>{x}</ListGroup.Item>
          ))}
        </ListGroup>
      );
    }
  }

  return <div>{output}</div>;
};

export default result;
