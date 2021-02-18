const bcrypt=require('bcryptjs');  //for hashing passwords
const jwt=require('jsonwebtoken');  //JWT Token
const joi=require('joi');  //for validations - incase of absent frontend validations

const User = require('../models/user');

 module.exports= class UserService {

    registerUser = (req)=>
                        {
                           return new Promise(async(resolve,reject)=>
                                                {
                                                 //check if Email exists in the database (if user already exists)
                                                    const userExist= await User.findOne({email:req.body.email});
                                                    if(userExist) return reject({'msg':"user exists"});

                                                    //hash passwords
                                                    const salt=await bcrypt.genSalt(10);
                                                    const hashPassword = await bcrypt.hash(req.body.password,salt); //hashing


                                                    const user=new User(
                                                            {
                                                        name:req.body.name,
                                                        password:hashPassword,
                                                        email:req.body.email
                                                            });

                                                            try
                                                            {
                                                                const savedUser = await user.save()
                                                                    //saving data of valid user
                                                                return resolve({"msg":"saved","data":savedUser});
                                                            }
                                                            catch(err)
                                                            {
                                                                console.log(err);   //if error
                                                                return reject({"msg":"error","err":err});
                                                            }
       
                                                }) 
                        }

    login = (req)=>{
        return new Promise(async (resolve,reject)=>
        {
            //check if Email exists in the database (if user already exists)
            const userExist= await User.findOne({email:req.body.email});
            if(!userExist) return reject({'msg':"user doen't exists"});
        
            //checking whether user entered valid password - by using the COMPARE function offered by bcryptjs (coz passwords are hashed)
            const validPass= await bcrypt.compare(req.body.password,userExist.password);
            //if passwords do not match
            if(!validPass) return reject({"msg":"invalid password"});
            //if OK
                //creating a TOKEN
                const token=jwt.sign({_id:userExist._id},process.env.secret_Key);
                return resolve({"msg":"LoggedIn","token":token});      
        })
    }

    sampleUser = (req)=>
                    {
                        return new Promise((resolve,reject)=>
                                            {
                                                resolve("yay!")
                                            })
                    }
}