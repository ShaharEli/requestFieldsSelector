import { buildObj, transform } from '../../src/utils'
import { dataMock, fieldsMock } from '../mocks'

jest.setTimeout(10000)

const onlyAuthorsFirstNames = dataMock.map(
  ({
    book: {
      author: { firstName },
    },
  }) => ({ book: { author: { firstName } } })
)

describe('Middleware parser and transformer should be work well 🤖', () => {
  it('buildObj function should work well', async () => {
    const obj = {}
    buildObj(fieldsMock, obj)
    expect(obj).toEqual({ book: { author: { firstName: true } } })
  })
  it('transform function should work well without nestedData field', async () => {
    const fields = {}
    buildObj(fieldsMock, fields)
    const transformed = transform(dataMock, fields, '', true)
    expect(transformed).toEqual(onlyAuthorsFirstNames)
  })

  it('transform function should work well with nestedData field', async () => {
    const fields = {}
    buildObj(fieldsMock, fields)
    const transformed = transform({ data: dataMock, status: 'ok' }, fields, 'data', true)
    expect(transformed).toEqual({ data: onlyAuthorsFirstNames, status: 'ok' })
  })
})
