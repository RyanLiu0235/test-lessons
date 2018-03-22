const math = require('./')

const factor1 = 1
const factor2 = 2

describe('math', () => {
  describe('add', () => {
    test('should throw when params are not number type', () => {
      expect(() => {
        math.add('a', 1)
      }).toThrow(TypeError)
    })
    test('should add when two numbers passed', () => {
      expect(math.add(factor1, factor2)).toBe(3)

      // make sure math.add doesn't have any side effects
      expect(factor1).toBe(1)
      expect(factor2).toBe(2)
    })
  })

  describe('minus', () => {
    test('should throw when params are not number type', () => {
      expect(() => {
        math.minus('a', 1)
      }).toThrow(TypeError)
    })
    test('should minus when two numbers passed', () => {
      expect(math.minus(factor1, factor2)).toBe(-1)
      expect(factor1).toBe(1)
      expect(factor2).toBe(2)
    })
  })

  describe('isNumber', () => {
    test('should return false when NaN is passed', () => {
      expect(math.isNumber(NaN)).toBe(false)
    })
    test('should return false when other type is passed', () => {
      expect(math.isNumber('')).toBe(false)
      expect(math.isNumber({})).toBe(false)
      expect(math.isNumber([])).toBe(false)
      expect(math.isNumber(undefined)).toBe(false)
      expect(math.isNumber(null)).toBe(false)
      expect(math.isNumber(false)).toBe(false)
    })
    test('should return true when number is passed', () => {
      expect(math.isNumber(9)).toBe(true)
    })
  })
})
