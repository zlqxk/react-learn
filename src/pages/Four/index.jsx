import React, { useState, useEffect } from "react";

const Four = () => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log(count);
  }, [count]);

  return (
    <div>
      <button
        onClick={() => {
          setCount(1);
          setCount(2);
          setCount(3);
          setCount(4);
        }}
      >
        点击
      </button>
    </div>
  );
};

export default Four;
