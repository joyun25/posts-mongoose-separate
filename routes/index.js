const { successHandle, errorHandle } = require("../service/responseHandle");
const Post = require("../models/post");
const httpControllers = require("../controllers/http");
const postsControllers = require("../controllers/posts");

const routes = async(req, res) => {
  const { url, method } = req;
  console.log(method, url);
  let body = "";
  req.on("data", chunk => {
    body += chunk;
  });

  if(url == "/posts" && method == "GET"){
    postsControllers.getPosts({ req, res });
  }else if(url == "/posts" && method == "POST"){
    req.on("end", async () => {
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
    });
  }else if(url == "/posts" && method == "DELETE"){
    await Post.deleteMany({});
    successHandle(res, Post);
  }else if(url.startsWith("/posts") && method == "DELETE"){
    const id = url.split("/").pop();
    if (await Post.findById(`${id}`) !== null){
      await Post.findByIdAndDelete(`${id}`);
      successHandle(res, "刪除成功");
    }else{
      errorHandle(res, 400, "無此筆資料");
    }
  }else if(url.startsWith("/posts") && method == "PATCH"){
    req.on("end", () => postsControllers.createPosts({ body, req, res }));
  }else if(method == "OPTIONS"){
    httpControllers.cors(req, res);
  }else{
    errorHandle(res, 404, "無此網站路由");
  }
};

module.exports = routes;