const express = require('express')
const multer = require('multer')
const Problem = require('../models/problem')
const auth = require('../middleware/auth')
const User = require('../models/user')
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

function deg2rad(deg) {
    return deg * (Math.PI/180)
  }

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  router.get('/MyTickets',auth, async (req, res) => {
    try{
        const problems = await Problem.find({creatorId:req.user.id == undefined ? req.user._id : req.user.id})
        //console.log(problems);
        //console.log(req.user);
        res.send(problems)
    }catch(e){
        res.status(400).send()
    }
})  

router.get('/noOfUpAndDownVotes/:problemId', async (req, res) => {
    try{
    const {problemId} = req.params
    const problem = await Problem.findOne({_id:problemId})
    res.status(200).send([problem.upvotes,problem.downvotes])
    }catch(e){
        res.status(400).send()
    }
})  


router.get('/fetchProblems/:lat/:lng/', async (req, res) => {
    //console.log(req.user);
    const lat = req.params.lat
    const lng = req.params.lng
    // const filter = req.params.filter
    console.log(lat,lng)
    

    try{
        let filteredProblems = []
        const problems = await Problem.find({})

        for(let i = 0; i < problems.length; i++){

            console.log(getDistanceFromLatLonInKm(lat,lng,problems[i].latitude,problems[i].longitude))

            if(getDistanceFromLatLonInKm(lat,lng,problems[i].latitude,problems[i].longitude) < 100){
                filteredProblems.push(problems[i])
            }
        }
        
        res.send(filteredProblems)
    }catch(e){
        res.status(400).send()
    }
})


router.post('/upvotesUpdate', auth, async (req,res) =>{


    const user = await User.findOne({_id:req.user.id == undefined ? req.user._id : req.user.id})

    const upvoteProblemsList = user.upvoteProblemsList
    const downvoteProblemsList = user.downvoteProblemsList
    const problemId = req.body.problemId

    const upvoteProblemsListIndex = upvoteProblemsList.indexOf(problemId)
    const downvoteProblemsListIndex = downvoteProblemsList.indexOf(problemId)
  

    try{
    //if upvote doesnt exit already for the particular problem
    if(upvoteProblemsListIndex === -1){
        
            const problem = await Problem.findOne({_id:problemId})
            const user = await User.findOne({_id:req.user.id == undefined ? req.user._id : req.user.id})
            

            user.upvoteProblemsList.push(problemId)
            await user.save()
            problem.upvotes = problem.upvotes + 1
            await problem.save()
            
    
        
    }else{
        //if upvote exits already for the particular problem
        
            const user = await User.findOne({_id:req.user.id == undefined ? req.user._id : req.user.id})
            user.upvoteProblemsList.splice(upvoteProblemsListIndex,1)
            await user.save()

            const problem = await Problem.findOne({_id:problemId})
            if(problem.upvotes-1 >=0)
            {
                problem.upvotes = problem.upvotes - 1
            }
           
            await problem.save()
            
        
    }
    


    if(downvoteProblemsList !== undefined){
        //to check if a downvote exist by the user for the particular problems
        if(downvoteProblemsListIndex !== -1){
            
                const user = await User.findOne({_id:req.user.id == undefined ? req.user._id : req.user.id})
                user.downvoteProblemsList.splice(downvoteProblemsListIndex,1)

                await user.save()
    
                const problem = await Problem.findOne({_id:problemId}) 
                if(problem.downvotes-1 >=0)
                 {
                    problem.downvotes = problem.downvotes - 1
                }   
                await problem.save()
            
            
        }
    }
    res.status(200).send("Upvote successfull")

}catch(e){
    console.log(e)
    res.status(400).send(e)
}
 
})

router.post('/downvotesUpdate', auth, async (req,res) =>{


    const user = await User.findOne({_id:req.user.id == undefined ? req.user._id : req.user.id})

    const upvoteProblemsList = user.upvoteProblemsList
    const downvoteProblemsList = user.downvoteProblemsList
    const problemId = req.body.problemId

    const upvoteProblemsListIndex = upvoteProblemsList.indexOf(problemId)
    const downvoteProblemsListIndex = downvoteProblemsList.indexOf(problemId)  

    try{
    //if upvote doesnt exit already for the particular problem
    if(downvoteProblemsListIndex === -1){
        
            const problem = await Problem.findOne({_id:problemId})
            const user = await User.findOne({_id:req.user.id == undefined ? req.user._id : req.user.id})
            

            user.downvoteProblemsList.push(problemId)
            await user.save()
            problem.downvotes = problem.downvotes + 1
            await problem.save()
            
    
        
    }else{
        //if upvote exits already for the particular problem
        
            const user = await User.findOne({_id:req.user.id == undefined ? req.user._id : req.user.id})
            user.downvoteProblemsList.splice(downvoteProblemsListIndex,1)
            await user.save()

            const problem = await Problem.findOne({_id:problemId})
            if(problem.downvotes-1 >=0)
            {
               problem.downvotes = problem.downvotes - 1
            }   
            await problem.save()
                
    }

    if(upvoteProblemsList !== undefined){
        //to check if a downvote exist by the user for the particular problems
        if(upvoteProblemsListIndex !== -1){
            
                const user = await User.findOne({_id:req.user.id == undefined ? req.user._id : req.user.id})
                user.upvoteProblemsList.splice(upvoteProblemsListIndex,1)

                await user.save()
    
                const problem = await Problem.findOne({_id:problemId}) 
                if(problem.upvotes-1 >=0)
                {
                problem.upvotes = problem.upvotes - 1
                }
                await problem.save()
            
            
        }
    }
    res.status(200).send("Upvote successfull")

}catch(e){
    console.log(e)
    res.status(400).send(e)
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