require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const hostname = 'localhost'

const authRouter = require('./routes/Auth_Route')
const postRouter = require('./routes/Post_Route')
const userRouter = require('./routes/Users_Route')
const chiphikhacRouter = require('./routes/Chiphikhac_Route')
const chiphithubaolanhRouter = require('./routes/Chiphithubaolanh_Route')
const mandaykysuRouter = require('./routes/MandayKysu_Route')
const chiPhiVon_Route = require('./routes/ChiPhiVon_Route')
const ChiTietHangHoa_Route = require('./routes/ChiTietHangHoa_Route')
const PhongbanRouter = require('./routes/Phongban_Route')



const connectDB = async() => {
    try {
        await mongoose.connect(
            //`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learnit.j0fcc.mongodb.net/mern-learnit?retryWrites=true&w=majority`,
            //Ket noi Cloud
            //`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@qlhd.8z45v.mongodb.net/?retryWrites=true&w=majority`, {
            //ket noi Mongodb on local   
            `mongodb://localhost:27017/QLHD-HNN`, {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            }
        )

        console.log('MongoDB connected')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

connectDB()

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)
app.use('/api/users', userRouter)
app.use('/api/chiphikhac', chiphikhacRouter)
app.use('/api/chiphithubaolanh', chiphithubaolanhRouter)
app.use('/api/mandaykysu', mandaykysuRouter)
app.use('/api/chiphivon', chiPhiVon_Route)
app.use('/api/chitiethanghoa', ChiTietHangHoa_Route)
app.use('/api/phongban', PhongbanRouter)

const PORT = process.env.PORT// || 5000

app.listen(PORT, () => console.log(`Server started on port http://${hostname} ${PORT}`))