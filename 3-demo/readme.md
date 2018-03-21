# demo 03
我们的代码测试是通过了，但是所有代码都有被测到？所有的情况都有测到？

## 覆盖率
关于覆盖率，社区里给我们提供了一个方案，叫**istanbul**，就是那个盛产毛毯的土耳其城市伊斯坦布尔。据说其作者因为觉得毛毯有覆盖的作用，所以起了这个名字，真是项目取名字的日常尴尬。

``` shell
$ yarn add mocha istanbul -D
$ node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha
```

我们在之前的`add`函数之外加上一个`minus`函数

``` js
const minus = (a, b) => a - b
```
这样一来，我们跑覆盖率的时候就会显示我们这一行没有执行到。所以我们继续添加测试脚本。

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
const isNumber = test => typeof test === 'number' && !Number.isNaN(test)

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

单元测试的原则是针对代码的**最小可测试单元**进行检查和验证，在JavaScript里，这个指的就是**函数**。在上面的过程中，我们新添加了一个函数`isNumber`，它内部也有一些逻辑，我们应该对它也写一套测试用例。

``` js
describe('isNumber', () => {
  it('should return false when NaN is passed', () => {
    assert.equal(isNumber(NaN), false)
  })
  it('should return false when other type is passed', () => {
    assert.equal(isNumber(''), false)
    assert.equal(isNumber({}), false)
    assert.equal(isNumber([]), false)
    assert.equal(isNumber(undefined), false)
    assert.equal(isNumber(null), false)
    assert.equal(isNumber(false), false)
  })
  it('should return true when number is passed', () => {
    assert(isNumber(9))
  })
})
```

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

在跑覆盖率的时候，我们更应该让我们的测试用例尽可能触及到程序的各种边际情况，这样的测试用例才是完善的。常见的误区就是覆盖率跑完，结果所有的测试用例通过，覆盖率100%，然后就想当然地认为测试通过了。