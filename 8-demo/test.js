const { ajax } = require('./')
const querystring = require('querystring')
const data = { foo: 'bar' }

describe('async', () => {
  describe('ajax', () => {
    it('should return input', async function() {
      const res = await ajax(data)
      expect(res).toEqual(data)
    })
  })
})
