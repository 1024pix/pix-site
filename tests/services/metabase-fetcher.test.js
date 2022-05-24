import consola from 'consola'
import metabaseFetcher from '~/services/metabase-fetcher'
jest.mock('consola')

function fetchResponse(response) {
  return {
    json: () => response,
  }
}

describe('MetabaseFetcher', () => {
  test('it should get session id', async () => {
    // given
    process.env.METABASE_API_URL = 'https://test.metabase.fr'
    global.fetch = jest
      .fn()
      .mockReturnValue(fetchResponse({ id: 'session-id' }))

    // when
    await metabaseFetcher()

    // then
    const expectedUrl = 'https://test.metabase.fr/api/session'
    const expectedOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: process.env.METABASE_USERNAME,
        password: process.env.METABASE_PASSWORD,
      }),
    }
    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, expectedOptions)
  })

  describe('#getCard', () => {
    test('it should call metabase with sessionId and cardId', async () => {
      // given
      process.env.METABASE_API_URL = 'https://test.metabase.fr'
      global.fetch = jest
        .fn()
        .mockReturnValueOnce(fetchResponse({ id: 'session-id' }))
        .mockReturnValueOnce(fetchResponse([]))
      const cardId = 1234

      // when
      const fetcher = await metabaseFetcher()
      await fetcher.getCard({
        cardId,
        xAxisLabel: 'x_axis',
        yAxisLabel: 'y_axis',
      })

      // then
      const expectedUrl = `https://test.metabase.fr/api/card/${cardId}/query/json`
      const expectedOptions = {
        method: 'POST',
        headers: { 'X-Metabase-Session': 'session-id' },
      }
      expect(global.fetch).nthCalledWith(2, expectedUrl, expectedOptions)
    })

    test('it should return values and labels', async () => {
      // given
      global.fetch = jest
        .fn()
        .mockReturnValueOnce(fetchResponse({ id: 'session-id' }))
        .mockReturnValueOnce(
          fetchResponse([
            { x_axis: 'x_axis_1', y_axis: 'y_axis_1' },
            { x_axis: 'x_axis_2', y_axis: 'y_axis_2' },
          ])
        )

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
        const fetchError = new Error('504')
        global.fetch = jest
          .fn()
          .mockReturnValueOnce(fetchResponse({ id: 'session-id' }))
          .mockRejectedValueOnce(fetchError)
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
          expect(consola.error).toHaveBeenCalledWith(fetchError)
          expect(error.message).toEqual(
            'Data could not be fetched from Metabase'
          )
        }
      })
    })
  })
})
