# demo 05

我们之前习惯了纯函数的测试流程，即依据某个规则，输入产生输出，非常理想化。但是目前有种情况，比如说这个函数并没有产生什么特殊的输出，或者中间有很多代码细节并没有暴露出来。这种情况下，我们可能需要去做一些很`tricky`的事情来努力让代码展示出各种情况，比如如何让一个函数抛出错误，或者让一个函数返回一个特定值等等。

这时候，我们需要一个工具来帮助我们，这就是**sinon**。

我们先摘取[sinon官网](http://sinonjs.org/)上的一个例子。

## spy

``` js
const once = fn => {
  let returnValue, called = false
  return function proxy() {
    if (!called) {
      called = true
      returnValue = fn.apply(this, arguments)
    }
    return returnValue
  }
}
```
在这个例子里，传入函数`fn`作为参数，返回一个函数`proxy`，但是受`called`变量的控制，`fn`只会在`proxy`被第一次调用的时候执行。所以，我们写如下测试脚本。

``` js
describe('invokeCallback', () => {
  it('should call the original function', () => {
    const spy = sinon.spy()
    const proxy = once(spy)

    proxy()
    proxy()
    assert(spy.calledOnce)
  })
})
```
这里，`spy`作为回调函数，仅仅在`proxy`第一次调用的时候执行了。

同时，我们注意到，`proxy`函数是一个闭包，所以`proxy`函数里面的`this`，`arguments`变量是在执行的时候确定的，我们也要对这个地方写测试。

``` js
it('should call original function with right this and args', () => {
  const spy = sinon.spy()
  const proxy = once(spy)
  const obj = {}

  proxy.call(obj, 1, 2, 3)

  assert(spy.calledOn(obj))
  assert(spy.calledWith(1, 2, 3))
})
```

写到这里，大家应该对**sinon**都有了一定了解，他的`spy`方法返回一个函数，并且能记录这个函数被执行时候的信息，比如被执行了几次，以什么参数执行等等。所以，我们能用`sinon.spy()`代理很多方法，获取这个方法被执行的信息。就像它的名字一样，是个间谍。

## stub

**sinon**还有一个方法，`stub`，它在`spy`方法的基础上又多了一些功能，比如说，他能规定函数的执行结果。

比如说上面的`once`函数，在执行了`proxy`方法之后，他应该返回`fn`的执行结果。我们写如下测试脚本。

``` js
it('should return the return value from the original function', () => {
  const stub = sinon.stub().returns(42)
  const proxy = once(stub)

  assert.equal(proxy(), 42)
})
```
`sinon.stub().returns(42)`返回一个函数，无论你怎么调用这个函数，它始终返回一个值`42`。这方便了我们创建很多比较难实现的场景。

**sinon**能实现的功能远不止如此，但是大家可以先了解到这里，知道测试的过程中可以有这样的操作。
