const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const passport = require("passport")
const router = new express.Router()

router.get(
    "/login/google",
    passport.authenticate("google", {scope:["profile","email" ] })
);
router.get(
    "/auth/login/callback", (req, res, next) => {
    passport.authenticate(
        "google", {
            scope: ["profile", "email"],
        },
        function(err, user, info) {
            console.log(err, user, info);
            if (!user)
                return res.redirect(
                    `${process.env.CLIENT_URL}/error?err=${info?.message}`
                );
            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }
                console.log(req.user);
                return res.redirect(`${process.env.CLIENT_URL}/`);
            });
        }
    )(req, res, next);

});
router.post('/users', async (req,res) =>{
    const user = new User(req.body)

    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    }catch(e){
        res.status(400).send(e)
    }

})

router.post('/users/login', async (req,res) => {
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    }catch (e){
        res.status(400).send()
    }
})

router.get('/users', auth, async (req, res) => {

    try{
        const users = await User.find({})
        res.send(users)
    }catch(e){
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {

    res.send(req.user)
})

module.exports = router