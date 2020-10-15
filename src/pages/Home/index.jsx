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
          1
        </p>
        <p>1</p>
        <p>1</p>
      </div>
    );
  }
}

export default One;
