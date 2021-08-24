import express, { Request, Response } from 'express'
import requestFieldsSelectorMiddleware from '../src/index'

const app = express()

app.use(express.json())
app.use(requestFieldsSelectorMiddleware)
const data = [
  {
    book: {
      id: 1,
      author: {
        id: 1,
        firstName: 'John',
        lastName: 'hi',
      },
    },
    page: 1,
  },
  {
    book: {
      id: 2,
      author: {
        id: 2,
        firstName: 'hello',
        lastName: 'de',
      },
    },
    page: 2,
  },
  {
    book: {
      id: 3,
      author: {
        id: 3,
        firstName: 'deded',
        lastName: 'ddee',
      },
    },
    page: 3,
  },
]

app.get('/', (req: Request, res: Response) => {
  // use this to get rid of typescript err:  https://stackoverflow.com/a/44384082
  // @ts-ignore
  res.json(req.transform(data))
})

app.post('/', (req: Request, res: Response) => {
  // @ts-ignore
  res.json(req.transform(data))
})

export default app
