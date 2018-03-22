const request = require('request')
const querystring = require('querystring')
const fs = require('fs')

const dest = 'http://jsfiddle.net/echo/jsonp/'
const ajax = data => {
  return new Promise((resolve, reject) => {
    request(`${dest}?${querystring.stringify(data)}`, (err, res, body) => {
      if (err) {
        reject(err)
      } else {
        resolve(JSON.parse(body))
      }
    })
  })
}

module.exports = { ajax }
