export const dataMock = [
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

export const fieldsMock = `
 {
   book {
     author {
       firstName
     }
   }
 }
`
