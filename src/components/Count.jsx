import React, { useState, Fragment } from "react";

export default function Count() {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount((prev)=> (prev+1));
  };

  return (
    <Fragment>
        <div className="count-container">
          <p>Count is: {count}</p>
          <button onClick={increaseCount}>click me</button>
        </div>
    </Fragment>
  );
}
