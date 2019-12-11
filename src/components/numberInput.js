import React from "react";

const numberInput = props => {
  const numbers = props.numbers;
  return (
    <div>
      <p>Rule: Given 4 numbers, find an arrangement of these four numbers and the arithmetic operations (× + − ÷) to make the value 24</p>
      {[1, 2, 3, 4].map(index => (
        <input
            key = {index}
          type="number"
          value={numbers[index]}
          onChange={props.changed(index)}
        />
      ))}
    
    </div>
  );
};

export default numberInput;
