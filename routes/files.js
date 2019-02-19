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

/*
router.post('/newFile', (req, res) => {
  // Check if blog title was provided
  if (!req.body.title) {
    res.json({ success: false, message: 'file title is required.' }); // Return error message
  } else {
    // Check if blog body was provided
    if (!req.body.body) {
      res.json({ success: false, message: 'file body is required.' }); // Return error message
    } else {
      // Check if blog's creator was provided
      if (!req.body.postedBy) {
        res.json({ success: false, message: 'file creator is required.' }); // Return error
      } else {
        // Create the blog object for insertion into database
        const blog = new File({
          title: req.body.title, // Title field
          body: req.body.body, // Body field
          postedBy: req.body.postedBy // CreatedBy field
        });
        // Save blog into database
        blog.save((err) => {
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
        });
      }
    }
  }
})*/
module.exports= router
/*module.exports = (router) => {

  /* ===============================================================
     CREATE NEW BLOG
  =============================================================== */
  /*

}*/