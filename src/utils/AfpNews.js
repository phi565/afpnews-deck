import { get, post } from 'axios'
import { resolve } from 'url'
import FormData from 'form-data'

export default class AfpNews {
  constructor ({ apiKey }) {
    this.apiKey = apiKey
    this.accessToken = null
    this.accessTokenExpires = null
    this.refreshToken = null
    this.baseUrl = 'https://api.afpforum.com'
    this.tokenPath = '/oauth/token'
  }

  get isAccessTokenValid () {
    return this.accessToken !== null && this.refreshToken !== null && this.accessTokenExpires !== null && this.accessTokenExpires > +new Date()
  }

  async authenticate (credentials) {
    if (credentials && this.apiKey) {
      return this.requestAuthenticatedToken(credentials)
    }

    if (!credentials && !this.apiKey) {
      return this.requestAnonymousToken()
    }

    if (this.isAccessTokenValid === false) {
      return this.requestRefreshToken()
    }

    return Promise.resolve()
  }

  async requestAnonymousToken () {
    try {
      const token = await get(resolve(this.baseUrl, this.tokenPath), {
        params: {
          grant_type: 'anonymous'
        }
      })

      return this.storeToken(token)
    } catch (e) {
      return Promise.reject(e)
    }
  }

  async requestAuthenticatedToken ({ username, password }) {
    const form = new FormData()
    form.append('username', username)
    form.append('password', password)
    form.append('grant_type', 'password')

    try {
      const token = await post(resolve(this.baseUrl, this.tokenPath), form, {
        headers: {
          'Authorization': `Basic ${this.apiKey}`
        }
      })

      return this.storeToken(token)
    } catch (e) {
      return Promise.reject(e)
    }
  }

  async requestRefreshToken () {
    const form = new FormData()
    form.append('grant_type', 'refresh_token')
    form.append('refresh_token', this.refreshToken)

    try {
      const token = await post(resolve(this.baseUrl, this.tokenPath), form, {
        headers: {
          'Authorization': `Basic ${this.apiKey}`
        }
      })

      return this.storeToken(token)
    } catch (e) {
      return Promise.reject(e)
    }
  }

  storeToken ({ data }) {
    const { access_token: accessToken, refresh_token: refreshToken, expires_in: accessTokenExpires } = data

    this.accessToken = accessToken
    this.refreshToken = refreshToken
    this.accessTokenExpires = +new Date() + accessTokenExpires * 1000
    return Promise.resolve()
  }

  async search ({ size, dateFrom, dateTo, urgency, searchTerms, lang, startat }) {
    await this.authenticate()

    const filters = ['product:news']
    let query = []

    if (urgency) {
      filters.push(`urgency:${urgency}`)
    }

    if (typeof searchTerms === 'string') {
      if (searchTerms === '') searchTerms = null
      else {
        const regex = /(["']([^"']+)["'])|([^\s]+)/gu
        searchTerms = searchTerms.match(regex)
      }
    }

    if (Array.isArray(searchTerms)) {
      query = searchTerms.map(s => {
        const searchExpression = s.split(':')
        if (!searchExpression[1]) {
          return `*:${s}`
        }
        return s
      })
    }

    const params = {
      startat,
      lang,
      size: size || 10,
      sort: 'published desc',
      from: dateFrom || 'now-1M',
      to: dateTo || 'now',
      fq: filters.join(','),
      q: query.join(',')
    }

    try {
      const response = await get(resolve(this.baseUrl, '/v1/api/search'), {
        params,
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        }
      })

      const { docs, numFound } = response.data.response

      return Promise.resolve({
        documents: docs || [],
        count: numFound
      })
    } catch (e) {
      return Promise.reject(e)
    }
  }
}
