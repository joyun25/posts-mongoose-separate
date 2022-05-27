const { successHandle, errorHandle } = require("../service/responseHandle");
const httpControllers = require("../controllers/http");
const postsControllers = require("../controllers/posts");

const routes = (req, res) => {
  const { url, method } = req;
  console.log(method, url);
  let body = "";
  req.on("data", chunk => {
    body += chunk;
  });

  if(url == "/posts" && method == "GET"){
    postsControllers.getPosts({ req, res });
  }else if(url == "/posts" && method == "POST"){
    req.on("end", () => postsControllers.createPosts({ body, req, res }));
  }else if(url == "/posts" && method == "DELETE"){
    postsControllers.deleteAllPosts({ req, res });
  }else if(url.startsWith("/posts") && method == "DELETE"){
    postsControllers.deleteOnePost({ req, res });
  }else if(url.startsWith("/posts") && method == "PATCH"){
    req.on("end", () => postsControllers.updatePosts({ body, req, res }));
  }else if(method == "OPTIONS"){
    httpControllers.cors(req, res);
  }else{
    errorHandle(res, 404, "無此網站路由");
  }
};

module.exports = routes;