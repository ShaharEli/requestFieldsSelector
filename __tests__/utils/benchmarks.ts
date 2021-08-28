import Benchmark, { Event } from 'benchmark'

export const createBenchmarkSuite = <T>(func: (...args: any[]) => T, ...args: any[]) =>
  new Promise((res) => {
    const suite = new Benchmark.Suite()
    suite.add(
      func.name,
      () => {
        func(...args)
      },
      {
        onComplete(result: Event) {
          res(result.target.stats?.mean)
        },
      }
    )
    suite.run({ async: true })
  })
