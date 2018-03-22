const { invokeCallback } = require('./')
const assert = require('assert')
const sinon = require('sinon')

describe('invokeCallback', () => {
  it('should invoke callback in 1000ms', () => {
    const spy = sinon.spy()
    const greetings = 'hello'

    invokeCallback(greetings, spy).then(() => {
      assert(spy.calledOnceWith(greetings))
    })
  })
})
