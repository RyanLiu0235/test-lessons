# demo 08

我们之前好像漏掉了一点事情，也就是异步脚本的测试。

## done

其实各个测试框架都支持异步脚本的测试，大多数是在单元测试的时候传递一个`done`回调函数，在异步执行完成的时候手动调用`done`。

``` js
const delay = (msg, fn) => {
  setTimeout(() => {
    fn(msg)
  }, 1000)
}
```
上面的栗子里，我们在1000ms之后执行一个回调函数，并且给回调函数传入`msg`作为参数。很明显，这是一个异步的脚本。

``` js
test('delay', done => {
  const msg = 'hello'
  delay(msg, res => {
    expect(res).toBe(msg)
    done()
  })
})
```
在上面的脚本里，每个单元测试函数里，都会提供一个`done`函数，当异步脚本执行完了之后，调用`done`函数，Jest就会知道异步脚本已经执行完成。

## async await

``` js
const dest = 'http://jsfiddle.net/echo/jsonp/'
const ajax = data => {
  return new Promise((resolve, reject) => {
    request(`${dest}?${querystring.stringify(data)}`, (err, res, body) => {
      if (err) {
        reject(err)
      } else {
        resolve(JSON.parse(body))
      }
    })
  })
}
```
在上面的ajax函数里，我们发送了一个请求到jsfiddle的免费API上，这个接口返回一个跟queries完全一样的结果。但是不太方便的是这个接口经常超时。

``` js
const data = { foo: 'bar' }
describe('ajax', () => {
  it('should return input', async function() {
    const res = await ajax(data)
    expect(res).toEqual(data)
  })
})
```
因为ajax函数返回了一个Promise，所以在测试脚本里，我们使用`async await`来执行异步的代码。