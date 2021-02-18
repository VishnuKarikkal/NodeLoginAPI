const router=require('express').Router();

require('dotenv').config();
//middlewares
const VerifyToken = require('../middlewares/verifyToken');
const JoiValidation = require('../middlewares/joiValidation');
//controllers
const UserController= require( '../controllers/userController');
const PostController= require('../controllers/postController');

const userController = new UserController()
const postController = new PostController();

router.get('/sample',VerifyToken,userController.sampleU)

router.post('/register',userController.createUser);

router.post('/login',userController.loginUser);

router.post('/postData',VerifyToken,postController.createPost)

router.get('/getData',postController.getPosts)

router.put('/update/:id',VerifyToken,postController.updatePost)

router.delete('/delete/:id',VerifyToken,postController.deletePost)

module.exports=router;