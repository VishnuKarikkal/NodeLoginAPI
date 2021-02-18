const Post = require('../models/post');

module.exports = class PostService
{
    getPost = (req)=>
    {
        return new Promise((resolve,reject)=>
        {
            Post.find()
            .then((data)=>
            {
                if(data.length==0)
                {
                    return reject({'msg':"NO DATA"});
                }
                else
                {
                    return resolve({'data':data , 'msg':"GOT IT"});
                }
            })
            .catch(err=>
                {
                    return reject({'msg':"NO DATA"})
                });
        })
    }

    newPost = (req)=>{
        return new Promise((resolve,reject)=>
        {
            let postData=new Post(req.body);
            postData.save()
            .then((response)=>
            {
                return resolve({'msg':"saved"})
            })
            .catch((err)=>
            {
                return reject({'msg':"err"})
            })
        })
    }

    updatePosts = (req)=>{
        return new Promise((resolve,reject)=>
        {
            const id=req.params.id;
            Post.updateOne({_id:id},{type:req.body.type})
            .then(data=>
                {
                    if(data.n ==0)
                    {
                        return reject({"msg":"nothing",'data':data})
                    }
                    else
                    {
                        return resolve({"msg":"updated",'data':data})
                    }
                })
            .catch(err=>
                {
                    return reject({'msg':"err",'err':err})
                })
        })
    }
    deletePosts = (req)=>{
        return new Promise((resolve,reject)=>{
            const id=req.params.id;
            Post.findById(id)
            .then(data=>
                {
                    if(!data) 
                    {
                        return reject({'msg':"nothing to delete",'data':data})
                    }
                    else
                    {
                        data.deleteOne(()=>
                        {
                            return resolve({'msg':"deleted one",'data':data})
                        })
                    }
                })
            .catch(err=>
                {
                    return reject({'msg':'err','err':err});
                })
        })
    }
}