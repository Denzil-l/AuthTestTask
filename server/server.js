import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userRouter from './Routes/Routes.js'


dotenv.config()

const app = express()

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

app.post('/', (req,res) => {
    console.log(req.body)
    console.log(req.params)
    res.status(200).send('Test')
})

app.listen(process.env.PORT, () => console.log(`Server is working in the PORT: ${process.env.PORT}`))

app.use('/auth', userRouter)


