import multer from "multer";

// uploadfile on our local server using multer -> then upload file on cloudinary sdk through local server -> then unlink the saved file or delete.

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  export const upload = multer({ storage: storage })