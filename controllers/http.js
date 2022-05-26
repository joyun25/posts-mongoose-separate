const corsHeader = require("../service/corsHeader");
const http = {
  cors(req, res) {
    res.writeHead(200, corsHeader);
    res.end();
  }
};

module.exports = http;