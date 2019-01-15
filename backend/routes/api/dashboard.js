const express = require('express');
const router = express.Router();
const axios = require("axios");
const CONFIGS = require("../../../config/config_dev");

router.get("/", (req,res) => {
  axios.get(`${CONFIGS.FACEBOOK_GRAPH_API}/oauth/access_token?client_id=${CONFIGS.FACEBOOK_APP_ID}&redirect_uri=${CONFIGS.REDIRECT_PATH}&client_secret=${CONFIGS.FACEBOOK_CLIENT_SECRET}&code=${req.query.code}`).then(resp => {
    let user_token = resp.data.access_token;
    let app_token = resp.data.access_token;
    axios.get(`${CONFIGS.FACEBOOK_GRAPH_API}/debug_token?input_token=${user_token}&access_token=${app_token}`).then(data => {
      axios.get(`${CONFIGS.FACEBOOK_GRAPH_API}/${data.data.data.user_id}?fields=email%2Cfirst_name%2Clast_name&access_token=${app_token}`).then(user_data => {
        res.json({
          status: 200,
          user_information: user_data.data
        })
      })
    })
  }).catch(err => {
    console.log(err)
  })
})



module.exports = router