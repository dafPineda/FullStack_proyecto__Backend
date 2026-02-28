const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const {router: instructorsRouter} = require('./src/routes/route.instructors')
const {router: usersRouter} = require('./src/routes/route.users')
const { errorHandler } = require('./src/middleware/errorMiddleware')
const allowed = [
  'http://localhost:3000',
  'http://localhost:3001'
  //,ruta de vercel
]

app.use(express.json())

app.get('/', (req, res)=>{
    res.json({ok:true, service:'API OK'})
})
app.get('/health', (req, res) => {
  res.json({ok:true, service:'api'})
})
app.use('/instructors', instructorsRouter)
app.use('/users', usersRouter)
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})