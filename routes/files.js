const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const upload = require('./fileUpload')


const File = require('../models/file')
const config = require('../config/db')
router.post('/newFile', function(req, res) {

  upload(req, res,(error) => {
      if(error){
         res.send(error);
      }else{
        if(req.file == undefined){
          
          res.send("undefined");

        }else{
             
            /**
             * Create new record in mongoDB
             */
            const fullPath = "files/"+req.file.filename;

            const file = new File({
              title: req.body.title, // Title field
              body: fullPath, // Body field
              postedBy: req.body.postedBy // CreatedBy field
            });
  
                    // Save blog into database
            file.save((err) => {
              // Check if error
              if (err) {
                // Check if error is a validation error
                if (err.errors) {
                  // Check if validation error is in the title field
                  if (err.errors.title) {
                    res.json({ success: false, message: err.errors.title.message }); // Return error message
                  } else {
                    // Check if validation error is in the body field
                    if (err.errors.body) {
                      res.json({ success: false, message: err.errors.body.message }); // Return error message
                    } else {
                      res.json({ success: false, message: err }); // Return general error message
                    }
                  }
                } else {
                  res.json({ success: false, message: err }); // Return general error message
                }
              } else {
                res.json({ success: true, message: 'Blog saved!' }); // Return success message
              }
            })
      }
    }
  });    
});

router.get('/allFiles', (req,res)=>{
  File.find({}, (err, files)=>{
    if(err){
      res.json({succes: false, message: err})
    }else{
      if(!files){
        res.json({success: false, message: "no files found"})
      }else{
        res.json({success: true, files: files})
      }
    }
  }).sort({"_id": -1})
})

module.exports= router
