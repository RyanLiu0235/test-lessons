const createScript = src => {
  const script = document.createElement('script')
  script.src = src
  document.body.appendChild(script)
}

const doCallback = cb => {
  setTimeout(cb, 1000)
}

module.exports = { createScript, doCallback }
