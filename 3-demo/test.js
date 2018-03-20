const assert = require('assert')
const math = require('./')

describe('math', () => {
  it('should add', () => {
    assert.equal(math.add(1, 2), 3)
  })
  it('should minus', () => {
    assert.equal(math.minus(1, 2), -1)
  })
})
