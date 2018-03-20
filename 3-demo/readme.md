# demo 03
我们的代码测试是通过了，但是所有代码都有被用到？所有的情况都有用到？

## 覆盖率
关于覆盖率，社区里给我们提供了一个方案，叫**istanbul**，就是那个盛产毛毯的地方。据说其作者因为觉得毛毯有覆盖的作用，所以起了这个名字，真是项目取名字的日常尴尬。

我们在之前的`add`函数之外加上一个`minus`函数

``` js
const minus = (a, b) => a - b
```
这样一来，我们跑覆盖率的时候就会提醒我们这一行没有执行到。所以我们继续添加测试脚本。

``` js
describe('math', () => {
  it('should add', () => {
    assert.equal(add(1, 2), 3)
  })
  it('should minus', () => {
    assert.equal(minus(1, 2), -1)
  })
})
```

另外，我们需要对函数的输入做类型校验。以下只针对`add`函数。

``` js
const isNumber = test => typeof test === 'number'

const add = (a, b) => {
  if (isNumber(a) && isNumber(b)) {
    return a + b
  } else {
    throw new TypeError('`add` accepts only numbers')
  }
}
```
如果输入中有一个不是`number`类型的我们就抛出一个`TypeError`。

对应的脚本，我们需要再更改一些。

``` js
describe('add', () => {
  it('should throw when params are not number type', () => {
    assert.throws(() => {
      add('a', 1)
    }, TypeError)
  })
  it('should add when two numbers passed', () => {
    assert.equal(add(1, 2), 3)
  })
})
```
这样，我们对输入的类型做了校验，同时测试用例覆盖到了抛出类型错误的情况。

还有什么需要考虑的？

我们希望我们的`add`函数是没有任何副作用的，即只根据输入产出输出，在这个过程中不会改变任何其他变量。这在写函数的时候非常重要的，我们希望函数尽量单纯一点，也即[函数式编程](https://www.gitbook.com/book/llh911001/mostly-adequate-guide-chinese/details)里的[纯函数](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/ch3.html#%E5%86%8D%E6%AC%A1%E5%BC%BA%E8%B0%83%E2%80%9C%E7%BA%AF%E2%80%9D)的概念。不过这个是另一个话题了，我们点到即止。

我们来重新改一下测试脚本。

``` js
const factor1 = 1
const factor2 = 2

describe('add', () => {
  it('should throw when params are not number type', () => {
    assert.throws(() => {
      add('a', 1)
    }, TypeError)
  })
  it('should add when two numbers passed', () => {
    assert.equal(add(factor1, factor2), 3)

    // make sure add doesn't have any side effects
    assert.equal(factor1, 1)
    assert.equal(factor2, 2)
  })
})
```
这样一来，我们的脚本就写得差不多了。