const express = require('express')
const User = require('../models/user')

const userRouter = express.Router()
userRouter.route('/')
    .get((req,res) => {
        User.find({}, (error, users) => {
            res.json(users)
        })
    })
    .post((req, res) => {
        let user = new User(req.body)
        user.save()
        res.status(201).send(user)
    })

userRouter.use('/:userId', (req,res, next) => {
    User.findById(req.params.userId, (error, user) => {
        if (error) {
            res.status(500).send(error)
        } else {
            req.user = user
            next()
        }
    })
})




userRouter.route('/:userId')
    .get((req, res) => {
        res.json(req.user)
    })
    .put((req, res) => {
        req.user.name = req.body.name;
        req.user.email = req.body.email;
        req.user.phone = req.body.phone;
        req.user.save();
        res.json(req.user)
    })
    .patch((req,res)=>{
        if(req.body._id){
            delete req.body._id;
        }
        for( let p in req.body ){
            req.user[p] = req.body[p]
        }
        req.user.save()
        res.json(req.user)
    })
    .delete((req,res)=>{
        req.user.remove(err => {
            if(err){
                res.status(500).send(err)
            }
            else{
                res.status(204).send('removed')
            }
        })
    })

    module.exports = userRouter;