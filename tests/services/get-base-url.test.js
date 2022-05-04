const { getBaseUrl } = require('~/services/get-base-url')

describe('#getBaseUrl', () => {
  it('should return a complete base URL when passing a domain', () => {
    expect(getBaseUrl('pix.fr').href).toBe('http://pix.fr/')
  })
})
