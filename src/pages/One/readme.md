### 本章来看一下 useMemo 和 useCallback 的一些使用场景

#### 首先看class

```js
import React from "react";

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

class Father extends React.Component {
  state = {
    count: 1,
  };

  add = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  render() {
    return (
      <div>
        <p>我是father</p>
        <button onClick={this.add}>点击加一</button>
        <p>father-count: {this.state.count}</p>
        <Son />
      </div>
    );
  }
}

class Son extends React.Component {
  state = {};
  render() {
    {
      console.log("子组件被渲染了");
    }
    return <div>我是son</div>;
  }
}

export default One;
```

#### 当点击 Father 组件中的 button 按钮，发现打印'子组件被渲染了'， 说明当父组件的状态发生改变的时候，子组件也会被渲染，这也正是 react 在没有 fiber 之前，当页面的组件过多时会发生卡顿的原因

#### 当然解决这个问题也很简单，只需要使用 pureComponent 即可

```js
class Son extends React.PureComponent {
  state = {};
  render() {
    console.log("子组件被渲染了");
    return <div>我是son</div>;
  }
}
```

#### 这样我们发现只有第一次会 console，后续当父组件状态改变时候不会重新 render 子组件，pureComponent 的原理是给组件的 props 做一层浅对比，如果 props 没有发生改变，则不会重新 render

#### 那让我们看一下下面这种情况

```js
  render() {
    const foo = () => {
      console.log(13)
    }
    
    return (
      <div>
        <p>我是father</p>
        <button onClick={this.add}>点击加一</button>
        <p>father-count: {this.state.count}</p>
        <Son foo={foo} />
      </div>
    );
  }
```

#### 在render里创建了一个函数，如果通过这种方式传参，由于父组件每次渲染的时候函数都会被重新创建，pureComponent 只进行浅对比，所以子组件还是会重新 render，因此class父子组件尽量保证在render外创建函数来传递
#### 看到这里我们就可以想到，其实functino组件就是class组件的render部分，而我们在函数式组件中都是以这种方式来创建函数, 接下来看下function组件的情况
```js
const Father = () => {
  const [count, setCount] = useState(0);
  const add = () => {
    setCount(c => c + 1);
  };

  return (
    <div>
      <p>我是father</p>
      <button onClick={add}>点击加一</button>
      <p>father-count: {count}</p>
      <Son />
    </div>
  );
};

const Son = () => {
  return (
    <div>
      {console.log("子组件被渲染了")}
      <p>我是son</p>
    </div>
  );
};
```
#### 与class组件一样，父组件渲染会导致子组件重新渲染
#### 通过memo来解决，memo同理pureComponent
```js
const Son = React.memo(() => {
  return (
    <div>
      {console.log("子组件被渲染了")}
      <p>我是son</p>
    </div>
  );
});
```
#### 那我们看下function组件中传递函数的情况
```js
const Father = () => {
  const [count, setCount] = useState(0);
  const add = () => {
    setCount(c => c + 1);
  };

  return (
    <div>
      <p>我是father</p>
      <button onClick={add}>点击加一</button>
      <p>father-count: {count}</p>
      <Son add={add}/>
    </div>
  );
};
```
#### 当父组件状态改变，子组件每次都会被渲染，和class组件在render中声明函数一样，传递的函数每次都会被重新创建，导致引用不同
#### 可以通过一些记忆手段，在函数没有更改的情况下保持引用相同，这时就是useCallback的使用场景了
```js
const add = useCallback(() => {
  setCount(c => c + 1);
}, [])
```
#### 经过useCallback包裹后返回一个记忆函数，当依赖项不发生改变时，返回的引用也不会改变

### 下面看下useMemo
#### 注：以下来自 https://overreacted.io/zh-hans/writing-resilient-components/

#### 当别人使用你的组件时，他们的预期是，不论传递属性如何变化, 组件都将反映这些变化：
```js
<Button color={isOk ? 'blue' : 'red'} />
```
#### 通常，这是 React 默认工作的方式。如果你在 Button 组件中使用 color，你会看到从上层为该渲染提供的值：
```js
function Button({ color, children }) {
  return (
    // ✅ `color` 永远是新的
    <button className={'Button-' + color}>
      {children}
    </button>
  );
}
```
#### 然而，学习 React 时常见的一个错误是，把 props 复制到 state：
```js
class Button extends React.Component {
  state = {
    color: this.props.color
  };
  render() {
    const { color } = this.state; // 🔴 `color` 不更新了！
    return (
      <button className={'Button-' + color}>
        {this.props.children}
      </button>
    );
  }
}
```

#### 计算值是另一个大家可能会将 props 复制到 state 的场景。举例来说，想象一下 按钮文字 的颜色是根据 color 属性通过昂贵计算得来：
```js
class Button extends React.Component {
  state = {
    textColor: slowlyCalculateTextColor(this.props.color)
  };
  render() {
    return (
      <button className={
        'Button-' + this.props.color +
        ' Button-text-' + this.state.textColor // 🔴 `color` 改变的时候就不更新了
      }>
        {this.props.children}
      </button>
    );
  }
}
```
#### 这个组件有 bug，它在 color 属性改变时无法重新计算 this.state.textColor。最简单的修复是把 textColor 的计算放到 render 方法中，然后把组件改为 PureComponent：

```js
class Button extends React.PureComponent {
  render() {
    const textColor = slowlyCalculateTextColor(this.props.color);
    return (
      <button className={
        'Button-' + this.props.color +
        ' Button-text-' + textColor // ✅ 永远是新的
      }>
        {this.props.children}
      </button>
    );
  }
}
```
#### 问题解决了！现在当 props 改变时重新计算 textColor，但是在属性不变时，能避免重复进行昂贵计算。
#### 然而，也许我们还能再优化一下。如果 children 改变了呢？很遗憾 textColor 在这种情况下会重复计算。我们第二次尝试可能是通过在 componentDidUpdate 中调用计算。
```js
class Button extends React.Component {
  state = {
    textColor: slowlyCalculateTextColor(this.props.color)
  };
  componentDidUpdate(prevProps) {
    if (prevProps.color !== this.props.color) {
      // 😔 额外的重复渲染
      this.setState({
        textColor: slowlyCalculateTextColor(this.props.color),
      });
    }
  }
  render() {
    return (
      <button className={
        'Button-' + this.props.color +
        ' Button-text-' + this.state.textColor // ✅ 在最后一次渲染后是新的
      }>
        {this.props.children}
      </button>
    );
  }
}
```
#### 然而，这也意味着我们的组件在每次更新后，都有两次 render 调用。如果我们试图优化它，那也不理想。

#### 你可以使用已不推荐的 componentWillReceiveProps 生命周期函数。然而，大家经常把 side effects 放这。这反过来又往往会给即将到来的并发渲染 特性像 Time Slicing 和 Suspense 带来问题。而更 “安全” 的 getDerivedStateFromProps 又有点难用。

#### 让我们退一步。实际上，我们想要 memoization。我们有一些输入，除非输入发生变化，否则我们不想重新计算输出。

#### 使用类，你可以使用帮助程序完成 memoization。但是，Hooks 更进了一步，提供了一种记忆昂贵计算的内置方法：

```js
function Button({ color, children }) {
  const textColor = useMemo(
    () => slowlyCalculateTextColor(color),
    [color] // ✅ 除非 `color` 改变，不会重新计算
  );
  return (
    <button className={'Button-' + color + ' Button-text-' + textColor}>
      {children}
    </button>
  );
}
```
