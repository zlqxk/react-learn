import React, { useState, useCallback } from "react";
class One extends React.Component {
  state = {};
  render() {
    return (
      <div>
        <Father />
      </div>
    );
  }
}

const Father = () => {
  const [count, setCount] = useState(0);
  const add = useCallback(() => {
    setCount(c => c + 1);
  }, [])

  return (
    <div>
      <p>我是father</p>
      <button onClick={add}>点击加一</button>
      <p>father-count: {count}</p>
      <Son add={add}/>
    </div>
  );
};

const Son = React.memo(() => {
  return (
    <div>
      {console.log("子组件被渲染了")}
      <p>我是son</p>
    </div>
  );
});

export default One;
