# demo 06

之前我们介绍了很多轮子，包括了：
*	测试框架**Mocha**
*	断言库**assert**
*	覆盖率工具**istanbul**
*	测试工具**sinon**
*	浏览器环境模拟库**jsdom**

其实我们没有介绍到的，还有两个很重要的东西：
* **PhantomJS**/**Puppeteer**
* **Karma**

有没有觉得很眼花缭乱，要知道，这些都是可以组合在一起使用的。反正我自己是半天没有把Karma跟上面的这些工具加在一起跑起来的，我们可能需要一个**Karma工程师**。

所以我就不打算介绍Karma了，因为人生苦短，我们应该直接使用[Jest](https://facebook.github.io/jest/)。

## Jest

你上面看到的东西，Jest都能帮你搞定，你再也不用安装一大列依赖来实现不同的功能，你只需要Jest就能将你的项目测试脚本跑起来。

我们还是用3-demo里的例子，这次，我们使用Jest来跑整个测试。

注意：
*	由于Jest已经帮我们内置了断言库，所以我们采用了内置的`expect`风格的断言。
*	我们直接使用`--coverage`来添加覆盖率。

``` js
describe('add', () => {
  test('should throw when params are not number type', () => {
    expect(() => {
      math.add('a', 1)
    }).toThrow(TypeError)
  })
  test('should add when two numbers passed', () => {
    expect(math.add(factor1, factor2)).toBe(3)

    // make sure math.add doesn't have any side effects
    expect(factor1).toBe(1)
    expect(factor2).toBe(2)
  })
})
```
可以看到的是，我们迁移到Jest几乎是无痛的，因为它的测试脚本也有`describe`测试套件跟`test`测试用例。断言其实跟其他的`expect`也是一致的。同样的，我们也不需要jsdom来提供浏览器接口。我们还是用 demo 04 的栗子来看看。

``` js
describe('createScript', () => {
  test('should append a script tag in body with a specified src', () => {
    createScript(url)
    expect(document.body.innerHTML).toBe(`<script src="${url}"></script>`)
  })
})
```

我们也不需要sinon来做函数监听或代理，但是Jest在API上跟sinon有差别，我们可能要翻文档来查阅。我们用demo 05的栗子来看看。

``` js
it('should call original function with right this and args', () => {
  const mockFn = jest.fn()
  const proxy = once(mockFn)

  proxy(1, 2, 3)

  expect(mockFn).toHaveBeenCalledWith(1, 2, 3)
})

it('should return the return value from the original function', () => {
  const mockFn = jest.fn().mockReturnValue(42)
  const proxy = once(mockFn)

  expect(proxy()).toBe(42)
})
```

Jest能做的事情当然远不止如此，但是大家可以暂时了解这么多，如果有需要，可以去看看文档。
