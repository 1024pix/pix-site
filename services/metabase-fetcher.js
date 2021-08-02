import axios from 'axios'
import consola from 'consola'

async function _getMetabaseSessionId(apiUrl, credentials) {
  const sessionUrl = `${apiUrl}/api/session`
  const headers = { 'Content-Type': 'application/json' }
  const response = await axios.post(sessionUrl, credentials, { headers })
  return response.data.id
}

export default async function () {
  const apiUrl = process.env.METABASE_API_URL
  const credentials = {
    password: process.env.METABASE_PASSWORD,
    username: process.env.METABASE_USERNAME,
  }
  if (!apiUrl || !credentials.password || !credentials.username) {
    consola.warn('Metabase environment variables must be provided')
  }

  const sessionId = await _getMetabaseSessionId(apiUrl, credentials)

  return {
    async getCard({ cardId, xAxisLabel, yAxisLabel }) {
      try {
        const headers = {
          'X-Metabase-Session': sessionId,
        }
        const response = await axios.post(
          `${apiUrl}/api/card/${cardId}/query/json`,
          null,
          {
            headers,
          }
        )

        return response.data.reduce(
          (acc, current) => {
            acc.values.push(current[xAxisLabel])
            acc.labels.push(current[yAxisLabel])
            return acc
          },
          { values: [], labels: [] }
        )
      } catch (e) {
        consola.error(e)
        throw new Error('Data could not be fetched from Metabase')
      }
    },
  }
}
