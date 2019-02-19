const multer = require('multer');
const path   = require('path');

const storageEngine = multer.diskStorage({
    destination: './public/files',
    filename: function(req, file, fn){
      fn(null,  new Date().getTime().toString()+'-'+file.fieldname+path.extname(file.originalname));
    }
  })
   
  

  const uploadFile =  multer({
    storage: storageEngine,
    limits: { fileSize:200000 },
    fileFilter: function(req, file, callback){
      validateFile(file, callback);
    }
  }).single('file');
  
  
  const validateFile = function(file, cb ){
    allowedFileTypes = /pdf|docx|odt|txt/;
    const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType  = allowedFileTypes.test(file.mimetype);
    if(extension && mimeType){
      return cb(null, true);
    }else{
      cb("Invalid file type. Only pdf, txt and docx files are allowed.")
    }
  }
  module.exports = uploadFile;