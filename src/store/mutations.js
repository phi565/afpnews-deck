import afpNews from '@/plugins/api'

export default {
  addColumn (state, payload) {
    const defaultColumn = {
      params: Object.assign({}, afpNews.defaultSearchParams, { size: 20 }),
      documentsIds: [],
      processing: false,
      error: false,
      paramsOpen: true,
      lastTimeLoading: 0
    }

    const newColumn = Object.assign({}, defaultColumn, payload)

    state.columns.push(newColumn)
  },
  moveColumn (state, { indexCol, dir }) {
    const to = dir === 'left' ? indexCol - 1 : indexCol + 1
    const element = state.columns[indexCol]
    state.columns.splice(indexCol, 1)
    state.columns.splice(to, 0, element)
  },
  closeColumn (state, { indexCol }) {
    state.columns.splice(indexCol, 1)
  },
  resetColumn (state, { indexCol }) {
    state.columns[indexCol].documentsIds = []
  },
  updateColumnParams (state, { indexCol, params }) {
    state.columns[indexCol].params = params
  },
  updateClientId (state, value) {
    state.credentials.clientId = value
    afpNews.apiKey = state.credentials
  },
  updateClientSecret (state, value) {
    state.credentials.clientSecret = value
    afpNews.apiKey = state.credentials
  },
  setClientCredentials (state, { clientId, clientSecret }) {
    state.credentials.clientId = clientId
    state.credentials.clientSecret = clientSecret
    afpNews.apiKey = state.credentials
  },
  resetClientCredentials (state) {
    state.credentials.clientId = null
    state.credentials.clientSecret = null
  },
  setAuthType (state, value) {
    state.authType = value
  },
  setProcessing (state, { indexCol, value }) {
    if (!state.columns[indexCol]) return false
    state.columns[indexCol].processing = value
    if (value === false) {
      state.columns[indexCol].lastTimeLoading = Date.now()
    }
  },
  setError (state, { indexCol, value }) {
    if (!state.columns[indexCol]) return false
    state.columns[indexCol].error = value
  },
  setParamsOpen (state, { indexCol, value }) {
    state.columns[indexCol].paramsOpen = value
  },
  addDocuments (state, documents) {
    const documentsKeyedById = documents.reduce((acc, cur) => {
      acc[cur.uno] = cur
      return acc
    }, {})
    state.documents = Object.assign({}, documentsKeyedById, state.documents)
  },
  cleanDocuments (state) {
    const displayedIds = [...new Set([].concat.apply([], state.columns.map(column => column.documentsIds)))]
    for (const docId in state.documents) {
      if (displayedIds.indexOf(docId) === -1) {
        delete state.documents[docId]
      }
    }
  },
  clearDocuments (state) {
    state.documents = {}
  },
  clearColumnDocumentsIds (state, { indexCol }) {
    state.columns[indexCol].documentsIds = []
  },
  prependDocumentsToCol (state, { indexCol, documents }) {
    if (!state.columns[indexCol]) return false
    const existingDocumentsIds = state.columns[indexCol].documentsIds
    state.columns[indexCol].documentsIds = [...new Set(documents.map(doc => doc.uno).concat(existingDocumentsIds))]
  },
  appendDocumentsToCol (state, { indexCol, documents }) {
    if (!state.columns[indexCol]) return false
    const existingDocumentsIds = state.columns[indexCol].documentsIds
    state.columns[indexCol].documentsIds = [...new Set(existingDocumentsIds.concat(documents.map(doc => doc.uno)))]
  },
  setDocumentViewed (state, docId) {
    state.documents[docId].viewed = true
  },
  setConnectivityStatus (state, { isConnected }) {
    state.connectivity.isConnected = isConnected
  }
}
