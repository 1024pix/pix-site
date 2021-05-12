import axios from 'axios'
import consola from 'consola'
import metabaseFetcher from '~/services/metabase-fetcher'
jest.mock('axios')
jest.mock('consola')

describe('MetabaseFetcher', () => {
  test('it should get session id', async () => {
    // given
    axios.post = jest.fn().mockReturnValue({
      data: { id: 'session-id' },
    })
    process.env.METABASE_API_URL = 'https://test.metabase.fr'
    process.env.METABASE_USERNAME = 'username'
    process.env.METABASE_PASSWORD = 'password'

    // when
    await metabaseFetcher()

    // then
    const expectedUrl = 'https://test.metabase.fr/api/session'
    const expectedBody = {
      username: process.env.METABASE_USERNAME,
      password: process.env.METABASE_PASSWORD,
    }
    const expectedHeaders = { headers: { 'Content-Type': 'application/json' } }
    expect(axios.post).toHaveBeenCalledWith(
      expectedUrl,
      expectedBody,
      expectedHeaders
    )
  })

  describe('#getCard', () => {
    test('it should call metabase with sessionId and cardId', async () => {
      // given
      axios.post = jest
        .fn()
        .mockReturnValueOnce({ data: { id: 'session-id' } })
        .mockReturnValueOnce({ data: [] })
      const cardId = 1234
      process.env.METABASE_API_URL = 'https://test.metabase.fr'

      // when
      const fetcher = await metabaseFetcher()
      await fetcher.getCard({
        cardId,
        xAxisLabel: 'x_axis',
        yAxisLabel: 'y_axis',
      })

      // then
      const expectedUrl = `https://test.metabase.fr/api/card/${cardId}/query/json`
      const expectedHeaders = {
        headers: { 'X-Metabase-Session': 'session-id' },
      }
      expect(axios.post).nthCalledWith(2, expectedUrl, null, expectedHeaders)
    })

    test('it should return values and labels', async () => {
      // given
      axios.post = jest
        .fn()
        .mockReturnValueOnce({ data: { id: 'session-id' } })
        .mockReturnValueOnce({
          data: [
            { x_axis: 'x_axis_1', y_axis: 'y_axis_1' },
            { x_axis: 'x_axis_2', y_axis: 'y_axis_2' },
          ],
        })

      const cardId = 1234

      // when
      const fetcher = await metabaseFetcher()
      const data = await fetcher.getCard({
        cardId,
        xAxisLabel: 'x_axis',
        yAxisLabel: 'y_axis',
      })

      // then
      expect(data).toEqual({
        values: ['x_axis_1', 'x_axis_2'],
        labels: ['y_axis_1', 'y_axis_2'],
      })
    })

    describe('When Metabase not respond', () => {
      it('should throw a Metabase error', async () => {
        // given
        const axiosError = new Error('504')
        axios.post = jest
          .fn()
          .mockReturnValueOnce({ data: { id: 'session-id' } })
          .mockRejectedValueOnce(axiosError)
        consola.error = jest.fn()

        const cardId = 1234

        // when
        const fetcher = await metabaseFetcher()
        try {
          await fetcher.getCard({
            cardId,
            xAxisLabel: 'x_axis',
            yAxisLabel: 'y_axis',
          })
        } catch (error) {
          // then
          expect(consola.error).toHaveBeenCalledWith(axiosError)
          expect(error.message).toEqual(
            'Data could not be fetched from Metabase'
          )
        }
      })
    })
  })
})
