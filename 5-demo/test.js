const { once } = require('./')
const assert = require('assert')
const sinon = require('sinon')

describe('once', () => {
  it('should call the original function', () => {
    const spy = sinon.spy()
    const proxy = once(spy)

    proxy()
    proxy()
    assert(spy.calledOnce)
  })

  it('should call original function with right this and args', () => {
    const spy = sinon.spy()
    const proxy = once(spy)
    const obj = {}

    proxy.call(obj, 1, 2, 3)

    assert(spy.calledOn(obj))
    assert(spy.calledWith(1, 2, 3))
  })


  it('should return the return value from the original function', () => {
    const callback = sinon.stub().returns(42)
    const proxy = once(callback)

    assert.equal(proxy(), 42)
  })
})
