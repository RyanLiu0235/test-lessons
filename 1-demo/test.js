const add = require('./')

function test() {
  const rst = add(1, 2)
  if (rst === 3) {
    console.log('test passed!')
  } else {
    console.log('test failed!')
  }
}

test()
