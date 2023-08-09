const axios = require("axios")

const cors = {
  callApi(req, res, requestType = "get") {
    const options = {}
    if (req.headers.authorization) {
      options.Authorization = req.headers.authorization
    } else if (req.headers.cookie) {
      options.cookie = req.headers.cookie
    }
    axios({
      method: requestType,
      url: `${req.config.marketplacePath}${req.originalUrl}`,
      headers: options,
      data: req.body
    })
      .then(response => {
        res.send(response.data)
      })
      .catch(error => {
        res.sendStatus(error.response.status)
      })
  }
}

module.exports = cors
