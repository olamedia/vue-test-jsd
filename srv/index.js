import axios from "axios";

const npmApi = axios.create({
  baseURL: "https://registry.npmjs.org/-/v1"
});

export default (app, http) => {
  app.get("/search", function(req, res, next) {
    npmApi
      .get("/search?text=" + req.query.text)
      .then(axiosResponse => {
        //console.log(res.data);
        return res.json(axiosResponse.data);
      })
      .catch(reason => {
        console.error(reason);
      });
  });
};
