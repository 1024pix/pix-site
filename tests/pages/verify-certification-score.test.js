import { getInitialised } from './utils'
import { documentFetcher } from '~/services/document-fetcher'

jest.mock('~/services/document-fetcher')

describe('Verify Certification Score Page', () => {
  let wrapper
  const ERROR_MESSAGE_CODE_INVALID =
    'Votre code de vérification ne correspond pas au format: P-XXXXX'
  const ERROR_MESSAGE_SCORE_INVALID =
    'Le score du candidat doit être composé de 3 chiffres'

  const CORRECT_SCORE = 999
  const CORRECT_CODE = 'P-99999'

  beforeEach(async () => {
    documentFetcher.mockReturnValue({
      getVerifyCertificationForm: () =>
        Promise.resolve({
          data: {
            title: 'title',
            code_de_verification: 'code_de_verification',
            score_declare_du_candidat: 'score_declare_du_candidat',
            button_label: 'button_label',
            id: '',
            meta: '',
          },
        }),
    })
    wrapper = await getInitialised('verify-certification-score', {
      stubs: ['fa'],
    })
  })
  test('mounts properly', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('renders properly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('The display an error if code is invalid', async () => {
    await wrapper.setData({
      code: 'XXX',
      score: CORRECT_SCORE,
    })

    wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$forceUpdate()

    expect(wrapper.html()).toContain(ERROR_MESSAGE_CODE_INVALID)
  })

  test('The display an error if score is invalid', async () => {
    await wrapper.setData({
      code: CORRECT_CODE,
      score: 999999,
    })

    wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$forceUpdate()

    expect(wrapper.html()).toContain(ERROR_MESSAGE_SCORE_INVALID)
  })

  test('There form is commited if score and code are valid ', async () => {
    await wrapper.setData({
      code: CORRECT_CODE,
      score: CORRECT_SCORE,
    })

    wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$forceUpdate()

    expect(wrapper.html()).not.toContain(ERROR_MESSAGE_SCORE_INVALID)
    expect(wrapper.html()).not.toContain(ERROR_MESSAGE_CODE_INVALID)
    expect(wrapper.vm.formSent).toEqual(true)
    expect(wrapper.html()).toContain(
      "Il n'y a pas de certificat Pix correspondant"
    )
  })
})
