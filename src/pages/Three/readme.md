### 连续两次reactDOM.render()会发生什么

```js
const Three = () => {
  const renderDom = () => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    ReactDOM.render(<App visible={true} />, div);
    setTimeout(() => {
      ReactDOM.render(<App visible={false} />, div);
    }, 1000);
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

  render() {
    return <div>App</div>;
  }
}
```

#### 我们发现，连续两次render相同的组件（prosp不同），并不会将原来的卸载或者直接覆盖掉，而是触发了componentDidUpdate这个生命周期。大体原因应该是diff对比发现是相同的组件，所以只进行了props的更改，那如果render不同的组件呢？

```js
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
```

#### 发现执行了三次didmount和一次willUnmount，说明在渲染不同组件时会卸载原来的组件并且重新render新组件

#### 利用这个特性，我们可以在实现一些组件，例如dialog， toast这类组件的时候使用这个方法，例如toast原本不存在dom里，是手动创建的，然后要手动销毁，在创建和销毁的时候往往要添加一些动画效果，这类动画通常使用动态添加class的方式实现，如果在销毁组件的时候直接使用unrender，那么组件直接就被销毁了，动画效果也会直接消失，而重新render一个visible为false的组件，便可以在内部来实现卸载组件的方法