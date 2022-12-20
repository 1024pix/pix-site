import {
  useGetAbsoluteUrlIfSwitchWebsite,
  getAbsoluteUrlIfSwitchWebsite,
} from '~/services/use-get-absolute-url-if-switch-website'

describe('#useGetAbsoluteUrlIfSwitchWebsite', () => {
  beforeEach(() => {
    process.env.DOMAIN_FR = 'pix.fr'
    process.env.DOMAIN_ORG = 'pix.org'
  })

  it('Should return relative url if target is in domain', () => {
    const switchMenu = [
      {
        relativeTarget: '/',
        isTargetOnPixOrg: false,
        isOnPixOrg: false,
        response: '/',
      },
      {
        relativeTarget: '/fr-be',
        isTargetOnPixOrg: true,
        isOnPixOrg: false,
        response: 'http://pix.org/fr-be',
      },
      {
        relativeTarget: '/en-gb',
        isTargetOnPixOrg: true,
        isOnPixOrg: true,
        response: '/en-gb',
      },
      {
        relativeTarget: '/',
        isTargetOnPixOrg: false,
        isOnPixOrg: true,
        response: 'http://pix.fr/',
      },
    ]
    for (const item of switchMenu) {
      const url = useGetAbsoluteUrlIfSwitchWebsite(
        item.relativeTarget,
        item.isTargetOnPixOrg,
        item
      )
      expect(url).toBe(item.response)
    }
  })
})

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
