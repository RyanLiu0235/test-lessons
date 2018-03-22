const { createScript } = require('./')
const assert = require('assert')
const jsdom = require('mocha-jsdom')
const sinon = require('sinon')

const url = 'http://someurl.com'

describe('createScript', () => {
  jsdom()

  it('should append a script tag in body with a specified src', () => {
    // add spies
    sinon.spy(document, 'createElement')
    sinon.spy(document.body, 'appendChild')

    createScript(url)
    assert(document.createElement.calledOnceWith('script'))
    assert(document.body.appendChild.calledOnce)
    assert.equal(document.body.innerHTML, `<script src="${url}"></script>`)

    // restore
    document.createElement.restore()
    document.body.appendChild.restore()
  })
})
