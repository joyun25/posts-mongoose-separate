const { successHandle, errorHandle } = require("../service/responseHandle");
const Post = require("../models/post");

const posts = {
  async getPosts({ req, res }) {
    const allPosts = await Post.find();
    successHandle(res, allPosts);
  },
  async createPosts({ body, req, res }) {
    try{
      const data = JSON.parse(body);
      const newPost = await Post.create({
        name: data.name,
        content: data.content
      });
      successHandle(res, newPost);
    }catch(err){
      errorHandle(res, 400, err.message);
    }
  },
  async deleteAllPosts({ req, res }) {
    await Post.deleteMany({});
    successHandle(res, Post);
  },
  async deleteOnePost({ req, res }) {
    const id = url.split("/").pop();
    if (await Post.findById(`${id}`) !== null){
      await Post.findByIdAndDelete(`${id}`);
      successHandle(res, "刪除成功");
    }else{
      errorHandle(res, 400, "無此筆資料");
    }
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