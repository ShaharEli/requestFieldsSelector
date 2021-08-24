import cors from 'cors'
import app from './app'

const PORT = 8000

app.use(
  cors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: '*',
    preflightContinue: true,
  })
)

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
})
