const isNumber = test => typeof test === 'number'

const add = (a, b) => {
  if (isNumber(a) && isNumber(b)) {
    return a + b
  } else {
    throw new TypeError('`add` accepts only numbers')
  }
}
const minus = (a, b) => {
  if (isNumber(a) && isNumber(b)) {
    return a - b
  } else {
    throw new TypeError('`minus` accepts only numbers')
  }
}

module.exports = { add, minus }
