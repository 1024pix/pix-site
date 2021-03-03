import { mutations } from '~/store'

describe('Store', () => {
  let state

  beforeEach(() => (state = {}))

  describe('mutations', () => {
    describe('updateMainNavigations', () => {
      beforeEach(() => (state.mainNavigations = []))

      test('it updates the state when navigations are fetched', () => {
        const navigations = [
          {
            id: 'test-nav-id',
            type: 'main_navigation',
            href: 'http://test-cms-url.com',
          },
        ]

        const expectedState = {
          mainNavigations: [
            {
              id: 'test-nav-id',
              type: 'main_navigation',
              href: 'http://test-cms-url.com',
            },
          ],
        }

        mutations.updateMainNavigations(state, navigations)

        expect(state).toStrictEqual(expectedState)
      })

      test('it does not update the state when navigations are not fetched', () => {
        const navigations = []

        const expectedState = {
          mainNavigations: [],
        }

        mutations.updateMainNavigations(state, navigations)

        expect(state).toStrictEqual(expectedState)
      })
    })

    describe('updateMainFooters', () => {
      beforeEach(() => (state.mainFooters = []))

      test('it updates the state when footers are fetched', () => {
        const footers = [
          {
            id: 'test-footer-id',
            type: 'main_footer',
            href: 'http://test-cms-url.com',
          },
        ]

        const expectedState = {
          mainFooters: [
            {
              id: 'test-footer-id',
              type: 'main_footer',
              href: 'http://test-cms-url.com',
            },
          ],
        }

        mutations.updateMainFooters(state, footers)

        expect(state).toStrictEqual(expectedState)
      })

      test('it does not update the state when footers are not fetched', () => {
        const footers = []

        const expectedState = {
          mainFooters: [],
        }

        mutations.updateMainFooters(state, footers)

        expect(state).toStrictEqual(expectedState)
      })
    })

    describe('updateHotNews', () => {
      beforeEach(() => (state.hotNews = null))

      test('it updates the state with the news description if there is any', () => {
        const hotNews = {
          data: {
            description: 'Some description for the latest news',
          },
        }

        const expectedState = {
          hotNews: 'Some description for the latest news',
        }

        mutations.updateHotNews(state, hotNews)

        expect(state).toStrictEqual(expectedState)
      })

      test('it does not update the state when there is no hot news', () => {
        const hotNews = undefined

        const expectedState = {
          hotNews: null,
        }

        mutations.updateHotNews(state, hotNews)

        expect(state).toStrictEqual(expectedState)
      })
    })
  })
})
