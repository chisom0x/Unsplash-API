const fs = require('fs')
const path = require('path');
const multer = require('multer')

const folderPath = './uploads';


const multerStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

const fileFilter = function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('THIS FILE IS NOT A PICTURE'), false);
    }
  };

const upload = multer({
    storage: multerStorage,
    fileFilter: fileFilter
})

exports.getAllImages = async (req, res) => {
     fs.readdir(folderPath, (err, files)=>{
          if (err){
            res.status(400).json({
                message:"Error getting images"
            })
          }
          else {
            res.send(files)
          }
     })
}

exports.getImage = (req, res) => {
    const filename = req.params.filename
    const filepath = path.join(folderPath, filename)

    fs.readFile(filepath, (err, data)=>{
        if(err){
            console.log('error getting image', err)
            res.send('Error getting image')
        }
        else if (!filepath){
            res.send('the image you searched for does not exist', 200)
        }
        res.writeHead(200, {'Content-type': 'image/png' || 'image/jpg'})
        res.end(data)
    })

}

exports.deleteImage = (req, res)=>{
    const filename = req.params.filename
    const filepath = path.join(folderPath, filename)
   
    fs.unlink(filepath, (err)=>{
        if(err) {
            console.log('could not delete:', err)
        res.send(`could not delete ${filepath}`)
        }
      res.send(`successfully deleted ${filename}`)

    })
}


exports.uploadImagemsg = (req, res) => {
    res.status(200).json({
        message: "picture uploaded successfully"
    })
    
}

exports.uploadImage = upload.single('image')