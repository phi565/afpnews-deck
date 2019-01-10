const { send, text } = require('micro')
const axios = require('axios')

const afpNewsDeckAuthorizationKey = process.env.AFPNEWS_DECK_AUTHORIZATION

if (!afpNewsDeckAuthorizationKey) {
  throw 'The API client key is not available'
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return send(res, 405, { error: 'This auth service allows POST method only' })

  try {
    const formData = await text(req)

    const { data } = await axios({
      url: 'https://api.afp.com/oauth/token',
      method: 'POST',
      headers: {
        'Authorization': `Basic ${afpNewsDeckAuthorizationKey}`,
        'Content-Type': req.headers['content-type'],
        'Content-Length': req.headers['content-length'],
        'Accept': 'application/json'
      },
      data: formData
    })

    return data
  } catch (e) {
    return send(res, 500)
  }
}
