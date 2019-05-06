const { send, text } = require('micro')
const axios = require('axios')

const afpNewsDeckAuthorizationKey = process.env.AFPNEWS_DECK_AUTHORIZATION

module.exports = async (req, res) => {
  try {
    switch (req.method) {
      case 'GET':
        const { data: getData } = await axios({
          url: 'https://api.afp.com/oauth/token?grant_type=anonymous',
          method: 'GET'
        })

        send(res, 200, getData)
        break
      case 'POST':
        const formData = await text(req)

        const { data: postData } = await axios({
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

        send(res, 200, postData)
        break
      default:
        throw new Error('Invalid method')
    }
  } catch (e) {
    console.error(e)
    send(res, 500)
  }
}
