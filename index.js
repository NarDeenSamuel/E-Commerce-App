process.on('uncaughtException',()=>{
    console.log('error in code')
})
import express from 'express'
import { dbConnection } from './dbConnection/dbConnection.js'
import {bootstrap} from './src/moduls/bootstrap.js'
import { appError } from './src/utils/appError.js'
import { globalError } from './src/middleware/globalError.js'
import cors from 'cors'
const app = express()


const port = process.env.PORT || 3000
app.use(cors())
app.use(express.json())

app.use('/uploads',express.static('uploads'))

bootstrap(app)

app.use('*',(req,res,next)=>{
    next(new appError(`route not found ${req.originalUrl}`,404))
})
app.use(globalError)

process.on('unhandledRejection',(err)=>{
    console.log(err)
})
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))