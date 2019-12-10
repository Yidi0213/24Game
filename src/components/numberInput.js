import React from "react";

const numberInput = props => {
  const numbers = props.numbers;
  return (
    <div>
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
