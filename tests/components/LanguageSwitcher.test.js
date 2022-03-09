import { getAbsoluteUrlIfSwitchWebsite } from '~/components/LanguageSwitcher'

describe('Component: LanguageSwitcher', () => {
  describe('#getAbsoluteUrlIfSwitchWebsite', () => {
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
        const url = getAbsoluteUrlIfSwitchWebsite(
          item.relativeTarget,
          item.isTargetOnPixOrg,
          item.isOnPixOrg
        )
        expect(url).toBe(item.response)
      }
    })
  })
})