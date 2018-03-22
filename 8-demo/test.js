const { ajax, delay } = require('./')
const querystring = require('querystring')

const data = { foo: 'bar' }
describe('async', () => {
  test('ajax', async function() {
    const res = await ajax(data)
    expect(res).toEqual(data)
  })

  test('delay', done => {
    const msg = 'hello'
    delay(msg, res => {
      expect(res).toBe(msg)
      done()
    })
  })
})
