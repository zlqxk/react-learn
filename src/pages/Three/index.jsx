import React from "react";
import ReactDOM from "react-dom";

const Three = () => {
  const renderDom = () => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    ReactDOM.render(<App visible={true} />, div);
    setTimeout(() => {
      ReactDOM.render(<App2 visible={false} />, div);
    }, 1000);
    setTimeout(() => {
      ReactDOM.render(<App visible={false} />, div);
    }, 2000);
  };

  return (
    <div>
      <button onClick={renderDom}>点击</button>
    </div>
  );
};

class App extends React.PureComponent {
  componentDidMount() {
    console.log("didmount");
  }

  componentDidUpdate() {
    console.log('didupdate')
  }

  componentWillUnmount() {
    console.log('willUnmount')
  }

  render() {
    return <div>App</div>;
  }
}

class App2 extends React.PureComponent {
  componentDidMount() {
    console.log("didmount");
  }

  componentDidUpdate() {
    console.log('didupdate')
  }

  render() {
    return <div>App2</div>;
  }
}

export default Three;
