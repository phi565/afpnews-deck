const { send, text } = require('micro')
const axios = require('axios')

const afpNewsDeckAuthorizationKey = process.env.AFPNEWS_DECK_AUTHORIZATION

module.exports = async (req, res) => {
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

    send(res, 200, data)
  } catch (e) {
    console.error(e)
    send(res, 500)
  }
}
