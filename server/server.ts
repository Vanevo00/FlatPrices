import express, { Request, Response } from 'express'
const connectDB = require('../config/db')

const cors = require('cors')
const app = express()
const port = 4000

// connect database
connectDB()

// middleware
// @ts-ignore
app.use(express.json({ extended: false })) // to accept body data

app.use(cors()) // enable CORS

// define routes
// app.use('/api/auth', require('./routes/auth'))
// app.use('/api/users', require('./routes/users'))
// app.use('/api/clubs', require('./routes/clubs'))
// app.use('/api/players', require('./routes/players'))

app.get('/', (req: Request, res: Response) => res.send('Welcome to flat prices API'))

app.listen(port, () => console.log(`API listening on port ${port}`))
