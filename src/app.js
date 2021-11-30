const express = require('express')
const app = express()
const port = 4000

app.use(express.json())

const db = {}
const codeChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

app.post('/', (req, res) => {
  if (!req.body || !req.body.url) {
    return res.status(400)
  }

  // could validate `url` is an actual fully qualified URL

  let code = ''
  while (1) {
    while (code.length < 6) {
      const index = Math.floor(Math.random() * codeChars.length)
      code += codeChars[index]
    }
    if (!db[code]) {
      break
    }
    // once there are a lot of codes stored, this could take a long time.
    // further improvement could be to generate available codes in the background.
  }

  // could check to see if a short code for `url` already exists

  db[code] = req.body.url

  const response = {
    short_url_code: code,
    url: req.body.url,
  }

  res.header('content-type', 'application/json')
  res.send(JSON.stringify(response))
})

app.get('/:code', (req, res) => {
  if (!db[req.params.code]) {
    res.status(404)
    return res.send('Not Found')
  }

  // could validate that `code` is valid format first /[A-Za-z0-9]{6}/

  res.redirect(301, db[req.params.code])
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
