const express = require("express")

const bodyParser = require("body-parser")

const upload = require("./multer")

const cloudinary = require("./cloudinary")


const fs = require("fs")

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/',(req, res)=>{
    res.send("hello world")

})
// app.post('/upload_image',(req, res)=>{
//     upload(req, res, function(err){
//         console.log(req.files);
//     })
// })
app.post('/upload_image', upload.array('image'), async(req, res)=>{


    if(req.method === 'POST'){
        const urls = []

        const files = req.files

        for( const file of files){
            
            const {path} = file

            const newPath = await cloudinary.uploader.upload(path)

            urls.push(newPath)

            fs.unlinkSync(path)
        }

        res.status(200).json({
            message: "Image upload successful",
            data: urls
        })
    }else{
        res.status(405).json({
            err: "Error"
        })
    }
})

app.listen(3000,()=>{
    console.log("server is listening on");
})