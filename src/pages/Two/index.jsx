import React, { useState, useCallback, useEffect } from "react";

const Two = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(count, 'count')
  }, [count])

  const add = useCallback(() => {
    setCount(c => c + 1);
  }, [])

  return (
    <div>
      <p>count: {count}</p>
      <button onClick={add}>add</button>
    </div>
  );
};

export default Two;
