import express from "express";
import axios from "axios";

const npmApi = axios.create({
  baseURL: "https://registry.npmjs.org/-/v1"
});

const app = express();

app.get("/search", function(req, res, next) {
  npmApi
    .get("/search?text=" + req.query.query)
    .then(axiosResponse => {
      //console.log(res.data);
      return res.json(axiosResponse.data);
    })
    .catch(reason => {
      console.error(reason);
    });
  // res.json({ msg: 'This is CORS-enabled for only example.com.' })
});

const port = 3000;

app.listen(port, function() {
  console.log("web server listening on http://localhost:" + port + "/");
});
