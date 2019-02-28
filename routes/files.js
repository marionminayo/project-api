const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const upload = require('./fileUpload')
const User = require('../models/user')

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

router.get('/singleFile/:id', (req,res)=>{
  if(!req.params.id){
    res.json({success: false, message: 'No id was provided'})
  }else{
    File.findOne({_id: req.params.id}, (err, file)=>{
      if(err){
        res.json({success: false, message: 'not a valid id'})
      }else{
        if(!file){
          res.json({success: false, message: 'File not found.'})
        }else{
          User.findOne({_id: req.decoded.userId}, (err, user)=>{
            if(err){
              res.json({success: false, message: err})
            }else{
              if(!user){
                res.json({success: false, message: 'Failed to authenticate user.'})
              }else{
                if(user.name !== file.postedBy){
                  res.json({success: false, message: 'You are not authorized to change this file.'})
                }else{
                  res.json({success: true, file: file})
                }
              }
            }
          })
          
        }
      }
    })
  }
})

router.put('/updateFile', (req,res)=>{
  if(!req.body._id){
    res.json({succes: false, message: 'No file id provided'})
  }else{
    File.findOne({id: req.body._id}, (err, file)=>{
      if(err){
        res.json({success: false, message: 'Not a valid id.'})
      }else{
        if(!file){
          res.json({success: false, message: 'File id not found.'})
        }else{
          User.findOne({_id: req.decoded.userId}, (err, user)=>{
            if(err){
              res.json({success: false, message: err})
            }else{
              if(!user){
                res.json({success: false, message: 'Failed to authenticate user.'})
              }else{
                if(user.name !== file.postedBy){
                  res.json({success: false, message: 'You are not authorized to change this file.'})
                }else{
                  file.title = req.body.title
                  file.save((err)=>{
                    if(err){
                      res.json({success: false, message: err})
                    }else{
                      res.json({success: true, message: 'File updated.'})
                    }
                  })
                  
                }
              }
            }
          })
        }
      }
    })
  }
})

router.delete('/deleteBlog/:id', (req,res)=>{
  if(!req.params.id){
    res.json({success: false, message: 'No id was provided.'})
  }else{
    Blog.findOne({_id: req.params.id}, (err, blog)=>{
      if(err){
        res.json({success: false, message: 'Invalid id'})
      }else{
        if(!blog){
          res.json({success: false, message: 'Blog not found.'})
        }else{
          User.findOne({_id: req.decoded.userId}, (err, user)=>{
            if(err){
              res.json({success: false, message: err})
            }else{
              if(!user){
                res.json({succss: false, message: 'Could not identify user.'})
              }else{
                if(name !== file.postedBy){
                  res.json({success: false, message: 'You are not authorised to delete this file.'})
                }else{
                  file.remove((err)=>{
                    if(err){
                      res.json({success: false, message: err})
                    }else{
                      res.json({success: true, message: 'File deleted.'})
                    }
                  })
                }
              }
            }
          })
        }
      }
    })
  }
})

router.post('/comment', (req,res)=>{
  if(!req.body.comment){
    res.json({success: false, message: 'No comment was provided'})
  }else{
    if(!req.body.id){
      res.json({success: false, message: 'No id was provided'})
    }else{
      File.findOne({_id : req.body.id}, (err, file)=>{
        if(err){
          res.json({success: false, message: 'Invalid id was provided.'})
        }else{
          if(!file){
            res.json({success: false, message: 'File not found.'})
          }else{
            User.findOne({_id: req.decoded.userId}, (err, user)=>{
              if(err){
                res.json({success: false, message: err})
              }else{
                if(!user){
                  res.json({success: false, message: 'User not found.'})
                }else{
                  blog.comments.push({
                    comment: req.body.comment,
                    commentBy: user.username
                  })
                  blog.save((err)=>{
                    if(err){
                      res.json({success: false, message: 'Something went wrong.'})
                    }else{
                      res.json({success: true, message: 'Comment saved.'})
                    }
                  })
                }
              }
            })
          }
        }
      })
    }
  }
})

module.exports= router
