import { getAbsoluteUrlIfSwitchWebsite } from '~/services/get-absolute-url-if-switch-website'

describe('#getAbsoluteUrlIfSwitchWebsite', () => {
  it('should return relative url if target is in domain', () => {
    const testCases = [
      {
        relativeTarget: '/',
        targetDomain: 'example.net',
        currentLocation: 'https://example.net/foo',
        expectedResult: '/',
      },
      {
        relativeTarget: '/bar',
        targetDomain: 'example.net',
        currentLocation: 'https://foo.net/foo',
        expectedResult: 'https://example.net/bar',
      },
    ]
    for (const {
      relativeTarget,
      targetDomain,
      currentLocation,
      expectedResult,
    } of testCases) {
      // when
      const url = getAbsoluteUrlIfSwitchWebsite({
        relativeTarget,
        targetDomain,
        currentLocation,
      })

      // then
      expect(url).toBe(expectedResult)
    }
  })
})
