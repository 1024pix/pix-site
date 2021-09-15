import { shallowMount } from '@vue/test-utils'
import FormPage from '~/components/FormPage'

jest.mock('~/services/document-fetcher')

describe('FormPage', () => {
  let component
  const stubs = {
    'pix-image': true,
    'prismic-rich-tex': true,
  }
  const $route = {
    query: { param1: 'param1', param2: 'param2' },
  }
  const $t = () => {}
  const formKeysToMap = {}
  const $config = { formKeysToMap }

  describe('#formUrl', () => {
    beforeEach(() => {
      component = shallowMount(FormPage, {
        mocks: { $route, $t, $config },
        stubs,
        propsData: { content: { title: '' } },
      })
    })

    it('should return the url', async () => {
      // given
      await component.setProps({
        content: {
          title: '',
          body: '',
          formbuilder_url: {
            url: 'https://formbuilder-url.com/1234/',
          },
          image: {
            url: '',
          },
          minimum_height: 0,
        },
      })

      // when
      const result = component.vm.formUrl

      // then
      expect(result).toEqual(
        'https://formbuilder-url.com/1234/?param1=param1&param2=param2'
      )
    })

    it('should map query keys thanks to environment variable', async () => {
      // given
      formKeysToMap.param1 = 'new-param-key'
      await component.setProps({
        content: {
          title: '',
          body: '',
          formbuilder_url: {
            url: 'https://formbuilder-url.com/1234/',
          },
          image: {
            url: '',
          },
          minimum_height: 0,
        },
      })

      // when
      const result = component.vm.formUrl

      // then
      expect(result).toEqual(
        'https://formbuilder-url.com/1234/?new-param-key=param1&param2=param2'
      )
    })
  })
})
