const PostService = require('../services/postService');

module.exports = class PostController extends PostService
{
    constructor()
    {
        super()
    }

    createPost = (req,res)=>
    {
        return this.newPost(req)
        .then(post=>res.json(post))
        .catch(err=>res.json(err))
    }

    getPosts = (req,res)=>
    {
        return this.getPost(req)
        .then(posts=>res.json(posts))
        .catch(err=>res.json(err))
    }

    updatePost = (req,res)=>
    {
        return this.updatePosts(req)
        .then(post=>res.json(post))
        .catch(err=>res.json(err))
    }

    deletePost = (req,res)=>
    {
        return this.deletePosts(req)
        .then(post=>res.json(post))
        .catch(err=>res.json(err))
    }

}