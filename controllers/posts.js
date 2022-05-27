const { successHandle, errorHandle } = require("../service/responseHandle");
const Post = require("../models/post");

const posts = {
  async getPosts({ req, res }) {
    const allPosts = await Post.find();
    successHandle(res, allPosts);
  },
  async updatePosts({ body, req, res }) {
    try{
      const id = req.url.split("/").pop();
      if (await Post.findById(`${id}`) !== null){
        const data = JSON.parse(body);
        if(data.content || data.name){
          const updatePost = await Post.findByIdAndUpdate(`${id}`, data);
          successHandle(res, updatePost);
        }else{
          errorHandle(res, 400, "請至少填寫姓名或內容");
        }
      }else{
        errorHandle(res, 400, "無此筆資料");
      }
    }catch(err){
      errorHandle(res, 400, err.message);
    }
  }
};

module.exports = posts;