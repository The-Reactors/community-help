const express = require('express')
const multer = require('multer')
const Problem = require('../models/problem')
const auth = require('../middleware/auth')
const envConfig = {
    path: process.env.NODE_ENV === "production" ? "prod.env" : ".env",
  };
require("dotenv").config(envConfig);

const router = new express.Router()

const problemImage = multer({
    limits:{
        fileSize:3000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|png|JPG|PNG|JPEG|jpeg)$/))
            return cb(new Error('This is not a correct format of the file'))

        cb(undefined,true)
    }
})

router.get('/fetchProblems', async (req, res) => {
    //console.log(req.user);
    try{
        const problems = await Problem.find({})
        res.send(problems)
    }catch(e){
        res.status(400).send()
    }
})


router.post('/problems', auth, problemImage.array('problemImage',3), async (req,res) =>{
    
    const imagesArray = []
    
    if(req.files === undefined)
    {
        console.log(req.user.name)
        const problem = new Problem({

            title:req.body.title,
            description:req.body.description,
            priority:req.body.priority,
            status:req.body.status,
            category:req.body.category,
            location:req.body.location,
            latitude:req.body.latitude,
            longitude:req.body.longitude,
            kind:req.body.kind,
            creatorId:req.user.id == undefined ? req.user._id : req.user.id
        })
            try{
                await problem.save()
                res.status(201).send(problem)
            }catch(e){
                res.status(400).send(e)
            }
    }
    else
    {
        req.files.forEach(element => imagesArray.push(element.buffer))
        const problem = new Problem({
            title:req.body.title,
            description:req.body.description,
            priority:req.body.priority,
            status:req.body.status,
            category:req.body.category,
            location:req.body.location,
            latitude:req.body.latitude,
            longitude:req.body.longitude,
            kind:req.body.kind,
            creatorId:req.user.id == undefined ? req.user._id : req.user.id,
            images:imagesArray
        })
        try{
            await problem.save()
            res.status(201).send(problem)
        }catch(e){
            res.status(400).send(e)
        }
    }
}, (err,req,res,next) => res.status(405).send({error:err}))

  
module.exports = router