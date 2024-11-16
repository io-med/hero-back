import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/images');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().valueOf() + '.' + file.originalname.split('.').at(-1));
  },
  limits:{fileSize:'5000000'},
    fileFilter:(req, file, callback)=>{
        const fileType = /jpeg|jpg|png|gif|webp/
        const mimeType = fileType.test(file.mimetype)
        const extname = fileType.test(path.extname(file.originalname))
        if(mimeType && extname){
            return callback(null, true)
        }
        callback('File is not an image or larger than 5mb')
    }
});

export const imageUpload = multer({ storage });
