import React from "react";

class One extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Father />
      </div>
    );
  }
}

class Father extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <p>我是father</p>
        <Son />
      </div>
    );
  }
}

class Son extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div>我是son</div>;
  }
}

export default One;
