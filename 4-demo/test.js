const assert = require('assert')
const math = require('./')

describe('math', () => {
  describe('add', () => {
    it('should throw when params are not number type', () => {
      assert.throws(() => {
        math.add('a', 1)
      }, TypeError)
    })
    it('should add when two numbers passed', () => {
      assert.equal(math.add(1, 2), 3)
    })
  })

  describe('minus', () => {
    it('should throw when params are not number type', () => {
      assert.throws(() => {
        math.minus('a', 1)
      }, TypeError)
    })
    it('should minus when two numbers passed', () => {
      assert.equal(math.minus(1, 2), -1)
    })
  })
})
