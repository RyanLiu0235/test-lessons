# demo 04

前面的练习中，我们习惯了纯函数的测试流程，即依据某个规则，输入产生输出，非常理想化。但是在做业务的过程中，我们更多地会遇到操作DOM的情况。这样的情况下，我们该怎样去测试我们的脚本呢？

比如我们有以下的脚本。

``` js
const createScript = src => {
  const script = document.createElement('script')
  script.src = src
  document.body.appendChild(script)
}
```
这个函数根据传入的地址创建了一个`script`标签，并且添加在页面上。

首先，测试脚本是跑在Node.js环境下的，但是这个环境下没有window对象，所以我们需要一些工具来帮助我们实现这个属性。简单点，我们使用**jsdom**。

``` shell
$ yarn add mocha-jsdom -D
```
jsdom是一个JavaScript的实现，这样一来我们就有了Node.js环境下的`window`对象。

按照以前的经验，`createScript`函数最终的结果是向页面上添加了一个`script`标签，那么我们来写一下测试脚本。

``` js
describe('createScript', () => {
  jsdom()

  it('should append a script tag in body with a specified src', () => {
    createScript(url)
    assert.equal(document.body.innerHTML, `<script src="${url}"></script>`)
  })
})
```
