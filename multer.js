const multer = require("multer")


const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './uploads')
    },
    filename: (req, file, cd)=>{
        cd(null,Date.now()+ '-'+ file.originalname)
    }
})

const fileFilter = (req, file, cd)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === "image/png"){
        cd(null, true)
    }else{
        cd({message: "Upload must file png or jpeg"},false)
    }
}

const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024},
    fileFilter: fileFilter
})
// var upload = multer({ storage: storage }).array('imageUrl', 3);

module.exports = upload;