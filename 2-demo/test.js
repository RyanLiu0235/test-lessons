const assert = require('assert')
const add = require('./')

describe('add', () => {
  it('should add', () => {
    assert.equal(add(1, 2), 3)
  })
})
