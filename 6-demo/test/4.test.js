const { createScript } = require('../src/4.js')

const url = 'http://someurl.com'

describe('createScript', () => {
  test('should append a script tag in body with a specified src', () => {
    createScript(url)
    expect(document.body.innerHTML).toBe(`<script src="${url}"></script>`)
  })
})
