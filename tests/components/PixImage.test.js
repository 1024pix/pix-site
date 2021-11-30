import { shallowMount } from '@vue/test-utils'
import PixImage from '~/components/PixImage'

describe('Component: PixImage', () => {
  let component

  beforeEach(() => {
    component = shallowMount(PixImage, {
      stubs: { 'nuxt-img': true },
      props: { field: {} },
    })
  })

  describe('Computed Property : Image', () => {
    it('should return the same image object if there is an alt', async () => {
      // Given
      const imageWithAlt = {
        alt: 'Alternative Message',
        copyright: null,
        dimensions: {
          height: 345,
          width: 453,
        },
        url: 'https://url.fr',
      }

      // When
      await component.setProps({ field: imageWithAlt })

      // Then
      expect(component.vm.image).toEqual(imageWithAlt)
    })

    it('should return the image object with empty alt and role when there is not alt', async () => {
      // Given
      const imageWithoutAlt = {
        alt: null,
        copyright: null,
        dimensions: {
          height: 345,
          width: 453,
        },
        url: 'https://url.fr',
      }
      const expectedImage = Object.assign({}, imageWithoutAlt)
      expectedImage.alt = ''
      expectedImage.role = 'presentation'

      // When
      await component.setProps({ field: imageWithoutAlt })

      // Then
      expect(component.vm.image).toEqual(expectedImage)
    })

    it('should return an image without width & height if hasFixedDimensions not set', async () => {
      // Given
      const image = {
        alt: 'Alternative Message',
        copyright: null,
        dimensions: {
          height: 345,
          width: 453,
        },
        url: 'https://url.fr',
      }

      // When
      await component.setProps({ field: image })

      // Then
      expect(component.vm.image).toEqual(image)
      expect(component.vm.computeHeight(image)).toEqual(undefined)
      expect(component.vm.computeWidth(image)).toEqual(undefined)
    })

    it('should return an image with default width & height if small enough', async () => {
      // Given
      const image = {
        alt: 'Alternative Message',
        copyright: null,
        dimensions: {
          height: 345,
          width: 453,
        },
        url: 'https://url.fr',
      }

      // When
      await component.setProps({ hasFixedDimensions: true })
      await component.setProps({ field: image })

      // Then
      expect(component.vm.image).toEqual(image)
      expect(component.vm.computeHeight(image)).toEqual(345)
      expect(component.vm.computeWidth(image)).toEqual(453)
    })

    it('should return an image with recomputed width & height if too large', async () => {
      // Given
      const maxHeight = 300
      const image = {
        alt: 'Alternative Message',
        copyright: null,
        dimensions: {
          height: 345,
          width: 453,
        },
        url: 'https://url.fr',
      }

      // When
      await component.setProps({ field: image })
      await component.setProps({ hasFixedDimensions: true })
      await component.setProps({ maxHeight })

      // Then
      expect(component.vm.image).toEqual(image)
      expect(component.vm.computeHeight(image)).toEqual(maxHeight)

      const computedWidth =
        image.dimensions.width * (maxHeight / image.dimensions.height)
      expect(component.vm.computeWidth(image)).toEqual(
        Math.round(computedWidth)
      )
    })
  })
})
