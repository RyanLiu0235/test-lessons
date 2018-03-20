const assert = require('assert')
const math = require('./')

const factor1 = 1
const factor2 = 2

describe('math', () => {
  describe('add', () => {
    it('should throw when params are not number type', () => {
      assert.throws(() => {
        math.add('a', 1)
      }, TypeError)
    })
    it('should add when two numbers passed', () => {
      assert.equal(math.add(factor1, factor2), 3)

      // make sure math.add doesn't have any side effects
      assert.equal(factor1, 1)
      assert.equal(factor2, 2)
    })
  })

  describe('minus', () => {
    it('should throw when params are not number type', () => {
      assert.throws(() => {
        math.minus('a', 1)
      }, TypeError)
    })
    it('should minus when two numbers passed', () => {
      assert.equal(math.minus(factor1, factor2), -1)
      assert.equal(factor1, 1)
      assert.equal(factor2, 2)
    })
  })

  describe('isNumber', () => {
    it('should return false when NaN is passed', () => {
      assert.equal(math.isNumber(NaN), false)
    })
    it('should return false when other type is passed', () => {
      assert.equal(math.isNumber(''), false)
      assert.equal(math.isNumber({}), false)
      assert.equal(math.isNumber([]), false)
      assert.equal(math.isNumber(undefined), false)
      assert.equal(math.isNumber(null), false)
      assert.equal(math.isNumber(false), false)
    })
    it('should return true when number is passed', () => {
      assert(math.isNumber(9))
    })
  })
})
