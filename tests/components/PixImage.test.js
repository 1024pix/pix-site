import { shallowMount } from '@vue/test-utils'
import PixImage from '~/components/PixImage'

describe('Component: PixImage', () => {
  let component

  beforeEach(() => {
    component = shallowMount(PixImage, {
      stubs: { 'prismic-image': true },
      props: { field: {} },
    })
  })

  describe('Computed Property : Image', () => {
    it('should return the same image object if there is an alt', () => {
      // Given
      const imageWithAlt = {
        alt: 'Alternative Message',
        copyright: null,
        dimension: {
          height: 345,
          width: 453,
        },
        url: 'https://url.fr',
      }

      // When
      component.setProps({ field: imageWithAlt })

      // Then
      expect(component.vm.image).toEqual(imageWithAlt)
    })

    it('should return the image object with empty alt and role when there is not alt', () => {
      // Given
      const imageWithoutAlt = {
        alt: null,
        copyright: null,
        dimension: {
          height: 345,
          width: 453,
        },
        url: 'https://url.fr',
      }
      const expectedImage = Object.assign({}, imageWithoutAlt)
      expectedImage.alt = ''
      expectedImage.role = 'presentation'

      // When
      component.setProps({ field: imageWithoutAlt })

      // Then
      expect(component.vm.image).toEqual(expectedImage)
    })
  })
})
