import React from "react";

class One extends React.Component {
  render() {
    return (
      <div className="menu">
        <p
          onClick={() => {
            this.props.history.push("/one");
          }}
        >
          1、useCallback和useMemo的使用场景
        </p>
        <p
          onClick={() => {
            this.props.history.push("/two");
          }}
        >
          2、effect是如何读取到最新的状态值的呢
        </p>
        <p>
          3、连续两次reactDOM.render()会发生什么
        </p>
      </div>
    );
  }
}

export default One;
