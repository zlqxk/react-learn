import React from "react";

const list = [
  { label: "1、useCallback和useMemo的使用场景", value: "/one" },
  { label: "2、effect是如何读取到最新的状态值的呢", value: "/two" },
  { label: "3、连续两次reactDOM.render()会发生什么", value: "/three" },
  { label: "4、hook里setState是否有合并", value: "/four" },
];

class One extends React.Component {
  render() {
    return (
      <div className="menu">
        {list.map(item => (
          <p
            onClick={() => {
              this.props.history.push(item.value);
            }}
          >
            {item.label}
          </p>
        ))}
      </div>
    );
  }
}

export default One;
