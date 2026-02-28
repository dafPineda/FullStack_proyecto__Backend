const express = require('express')
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const app = express()
const PORT = process.env.PORT || 3001
const {router: instructorsRouter} = require('./src/routes/route.instructors')
const {router: usersRouter} = require('./src/routes/route.users')
const {router: excersiceRouter} = require('./src/routes/route.excersice')
const { errorHandler } = require('./src/middleware/errorMiddleware')
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, 
  message: 'Too many requests. Try again later.'
});

/* const allowed = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://full-stack-proyecto-front-end.vercel.app'
] */

app.get('/', (req, res)=>{
  res.json({ok:true, service:'API OK'})
})
app.get('/health', (req, res) => {
  res.json({ok:true, service:'api'})
})

app.use(limiter);
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://full-stack-proyecto-front-end.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
};

app.use(cors(corsOptions));
app.use(express.json())
app.use('/instructors', instructorsRouter)
app.use('/users', usersRouter)
app.use('/excersice', excersiceRouter)
app.use(errorHandler)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})
