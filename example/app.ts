import express, { Request, Response } from 'express'
import requestFieldsSelectorMiddleware from '../src/index'

const app = express()

app.use(express.json())
// app.use((...args) => requestFieldsSelectorMiddleware(...args, { silent: true })) // for silent on error
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
  res.json(req.transform(data))
})

app.post('/', (req: Request, res: Response) => {
  res.json(req.transform(data))
})

export default app
