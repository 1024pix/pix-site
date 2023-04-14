import { config } from '~/config/environment'
import { shouldShowOutOfFranceBanner } from '~/services/should-show-out-of-france-banner'

function fetchResponse(response) {
  return {
    json: () => response,
  }
}

const baseUrl = 'http://localhost:7000'

jest.mock('~/config/environment', () => ({
  config: {
    isFrenchDomain: true,
    isPixSite: true,
  },
}))

describe('shouldShowOutOfFranceBanner', () => {
  afterEach(() => {
    config.isFrenchDomain = true
    config.isPixSite = true
  })
  describe('When website is pix.org', () => {
    it('returns false', async () => {
      // given
      config.isFrenchDomain = false

      // when
      const result = await shouldShowOutOfFranceBanner(baseUrl)

      // then
      expect(result).toBe(false)
    })
  })
  describe('When in pix-pro', () => {
    it('returns false', async () => {
      // given
      config.isPixSite = false

      // when
      const result = await shouldShowOutOfFranceBanner(baseUrl)

      // then
      expect(result).toBe(false)
    })
  })

  describe("When user's location is in Belgium", () => {
    it('returns true', async () => {
      // given
      global.fetch = jest
        .fn()
        .mockResolvedValue(fetchResponse({ country: 'BE' }))

      // when
      const result = await shouldShowOutOfFranceBanner(baseUrl)

      // then
      expect(global.fetch).toHaveBeenCalled()
      expect(result).toBe(true)
    })
  })

  describe("When user's location is in France", () => {
    it('returns false', async () => {
      // given
      global.fetch = jest
        .fn()
        .mockResolvedValue(fetchResponse({ country: 'FR' }))

      // when
      const result = await shouldShowOutOfFranceBanner(baseUrl)

      // then
      expect(global.fetch).toHaveBeenCalled()
      expect(result).toBe(false)
    })
  })

  describe("When user's location is in a DOM-TOM", () => {
    it('returns false', async () => {
      // given
      global.fetch = jest
        .fn()
        .mockResolvedValue(fetchResponse({ country: 'GA' }))

      // when
      const result = await shouldShowOutOfFranceBanner(baseUrl)

      // then
      expect(global.fetch).toHaveBeenCalled()
      expect(result).toBe(false)
    })
  })

  describe("When user's location is not provided", () => {
    it('returns false', async () => {
      // given

      global.fetch = jest.fn().mockResolvedValue(fetchResponse({}))

      // when
      const result = await shouldShowOutOfFranceBanner(baseUrl)

      // then
      expect(global.fetch).toHaveBeenCalled()
      expect(result).toBe(false)
    })
  })

  describe('When geolocate API is down', () => {
    it('throws an error', () => {
      // given
      const error = new Error('TEST ERROR')
      global.fetch = jest.fn().mockRejectedValue(error)

      // then
      expect(shouldShowOutOfFranceBanner(baseUrl)).rejects.toThrow(error)
    })
  })
})
