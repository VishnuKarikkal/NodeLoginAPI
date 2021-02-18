const UserService = require('../services/userService');

module.exports = class UserController extends UserService
{
    constructor()
    {
        super()
    }

    createUser=(req,res)=>
                    {
                        return this.registerUser(req)
                        .then(user=>res.status(201).json(user))
                        .catch(err=>res.status(400).json(err))
                    }

    loginUser = (req,res)=>
                    {
                        return this.login(req)
                        .then(user=>res.status(201).json(user))
                        .catch(err=>res.status(400).json(err))
                    }

    sampleU = (req,res)=>
                    {
                        return this.sampleUser(req)
                        .then(sam=>res.json(sam))
                        .catch(er=>res.json(er))
                    }
}