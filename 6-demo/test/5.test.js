const { once } = require('../src/5.js')

describe('once', () => {
  it('should call the original function', () => {
    const mockFn = jest.fn()
    const proxy = once(mockFn)

    proxy()
    proxy()
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('should call original function with right this and args', () => {
    const mockFn = jest.fn()
    const proxy = once(mockFn)

    proxy(1, 2, 3)

    expect(mockFn).toHaveBeenCalledWith(1, 2, 3)
  })

  it('should return the return value from the original function', () => {
    const mockFn = jest.fn().mockReturnValue(42)
    const proxy = once(mockFn)

    expect(proxy()).toBe(42)
  })
})
