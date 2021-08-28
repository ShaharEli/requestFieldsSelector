import { Data } from '../../src/types'
import { buildObj, transform } from '../../src/utils'
import { dataMock, fieldsMock } from '../mocks'
import { createBenchmarkSuite } from '../utils'

jest.setTimeout(300000)
describe('Middleware parser and transformer should be fast 🚀', () => {
  it('buildObj function should be fast', async () => {
    const obj = {}
    const stats = await createBenchmarkSuite<void>(buildObj, fieldsMock, obj)
    expect(stats).toBeLessThan(0.00005)
  })
  it('transform function should be fast', async () => {
    const fields = {}
    buildObj(fieldsMock, fields)
    const stats = await createBenchmarkSuite<Data>(transform, dataMock, fields, '', true)
    expect(stats).toBeLessThan(0.00005)
  })
})
