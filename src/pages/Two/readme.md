### effect是如何读取到最新的count 状态值的呢？

#### 因为每次渲染的useEffect都是不同的函数，并不是不变的effect拿到一直在变得state，而是每一个effect都能拿到来自他那次渲染的state，概念上可以看做effect是渲染的结果的一部分
```js
const Two = () => {
  const [count, setCount] = useState(0);

  // 第一次
  useEffect(() => {
    console.log(0)
  }, [count])

  // 第二次
  useEffect(() => {
    console.log(1)
  }, [count])

  // 第三次
  useEffect(() => {
    console.log(2)
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
```