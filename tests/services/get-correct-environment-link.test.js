import { getCorrectEnvironmentLink } from '~/services/get-correct-environment-link'

describe('#getCorrectEnvironmentLink', () => {
  beforeEach(() => {
    process.env.DOMAIN_FR = 'fake-pix.site'
    process.env.DOMAIN_ORG = 'fake-pix.company'
  })

  it('should not transform external links', () => {
    expect(getCorrectEnvironmentLink('http://google.com')).toEqual(
      'http://google.com'
    )
  })

  it('should not transform external links that contains pix.fr', () => {
    expect(
      getCorrectEnvironmentLink('http://www.google.com/search?q=pix.fr')
    ).toEqual('http://www.google.com/search?q=pix.fr')
  })

  it('should use DOMAIN_FR env variable if domain is pix.fr', () => {
    expect(getCorrectEnvironmentLink('http://app.pix.fr/connexion')).toEqual(
      `http://app.${process.env.DOMAIN_FR}/connexion`
    )
  })

  it('should use DOMAIN_ORG env variable if domain is pix.org', () => {
    expect(getCorrectEnvironmentLink('http://app.pix.org/connexion')).toEqual(
      `http://app.${process.env.DOMAIN_ORG}/connexion`
    )
  })

  it('should keep query params while using correct DOMAIN_ORG env var', () => {
    expect(
      getCorrectEnvironmentLink('http://app.pix.org/connexion?lang=en')
    ).toEqual(`http://app.${process.env.DOMAIN_ORG}/connexion?lang=en`)
  })
})
