import { shallowMount } from '@vue/test-utils'
import { documentFetcher } from '~/services/document-fetcher'
import Stat from '~/components/slices/Stat'

jest.mock('~/services/document-fetcher')

describe('Stat slice', () => {
  let component
  const get = jest.fn()

  beforeEach(() => {
    documentFetcher.mockReturnValue({
      get,
    })

    get.mockResolvedValueOnce({
      data: {
        id: '',
        meta: '',
        page_title: '',
      },
    })
  })

  describe('Slice: Stat', () => {
    beforeEach(() => {})

    describe('#chartData', () => {
      it('should return char datas', () => {
        // given
        component = shallowMount(Stat, {
          stubs: {
            fa: true,
            'prismic-rich-text': true,
            'chart-section': true,
          },
          propsData: {
            slice: {
              primary: {
                block_data_name: [{ text: 'Data name' }],
                block_graph_color: '#4700ff',
              },
              items: [
                { data_value: 45, data_date: '2020-08-12' },
                { data_value: 100, data_date: '2020-09-12' },
              ],
            },
          },
        })

        // when
        const result = component.vm.chartData

        // then
        expect(result).toEqual({
          datasets: [
            {
              backgroundColor: 'rgba(71,0,255,0.2)',
              borderColor: '#4700ff',
              data: [45, 100],
              label: 'Data name',
              type: 'line',
            },
          ],
          labels: ['2020-08-12', '2020-09-12'],
        })
      })
    })
  })
})
