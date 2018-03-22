const invokeCallback = (greetings, cb) => {
  return new Promise(resolve => {
    setTimeout(() => {
      cb(greetings)
      resolve()
    }, 100)
  })
}

module.exports = { invokeCallback }
