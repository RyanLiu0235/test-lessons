const add = require('./')

function test(rst, rules) {
  if (rules(rst)) {
    console.log('test passed!')
  } else {
    console.log('test failed!')
  }
}

test(add(1, 2), rst => rst === 3)
