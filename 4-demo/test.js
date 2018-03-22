const { createScript } = require('./')
const assert = require('assert')
const jsdom = require('mocha-jsdom')

const url = 'http://someurl.com'

describe('createScript', () => {
  jsdom()

  it('should append a script tag in body with a specified src', () => {
    createScript(url)
    assert.equal(document.body.innerHTML, `<script src="${url}"></script>`)
  })
})
