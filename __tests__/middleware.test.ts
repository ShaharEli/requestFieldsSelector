import request from 'supertest'
import app from '../example/app'
import { data } from './mocks'

describe('Request fields selector test', () => {
  it('Api should send the entire data is fields not specified', async () => {
    const result = await request(app).get('/')
    expect(result.body).toEqual(data)
    expect(result.status).toEqual(200)
  })

  it('Api should send only page field if its the only field specified', async () => {
    const result = await request(app)
      .get('/')
      .query({
        fields: `
    { 
      page
    }
    `,
      })

    expect(result.body).toEqual(data.map(({ page }) => ({ page })))
    expect(result.status).toEqual(200)
  })
  it('Api should handle non existing fields', async () => {
    const result = await request(app)
      .get('/')
      .query({
        fields: `
    { 
      page { page {hello}  }
    }
    `,
      })

    expect(result.body).toEqual(data.map(({ page }) => ({ page })))
    expect(result.status).toEqual(200)
  })

  it('Api should handle non formatted fields', async () => {
    const result = await request(app).get('/').query({
      fields: `{page}`,
    })
    expect(result.body).toEqual(data.map(({ page }) => ({ page })))
    expect(result.status).toEqual(200)
  })

  it('Api should send only page field and book-id  if they are the only fields specified', async () => {
    const result = await request(app)
      .get('/')
      .query({
        fields: `
    { 
      book { 
        id
      }
      page
    }
    `,
      })

    expect(result.body).toEqual(data.map(({ page, book }) => ({ page, book: { id: book.id } })))
    expect(result.status).toEqual(200)
  })

  it('Api should send only page field and author first name if they are the only fields specified', async () => {
    const result = await request(app)
      .get('/')
      .query({
        fields: `
    { 
      book { 
        author {
          firstName
        }
      }
      page
    }
    `,
      })

    expect(result.body).toEqual(
      data.map(({ page, book: { author } }) => ({ page, book: { author: { firstName: author.firstName } } }))
    )
    expect(result.status).toEqual(200)
  })

  it('Api should send only page field and author first name if they are the only fields specified and if the fields specified in the body of the request', async () => {
    const result = await request(app)
      .post('/')
      .send({
        fields: `
    { 
      book { 
        author {
          firstName
        }
      }
      page
    }
    `,
      })

    expect(result.body).toEqual(
      data.map(({ page, book: { author } }) => ({ page, book: { author: { firstName: author.firstName } } }))
    )
    expect(result.status).toEqual(200)
  })
})
