const express = require('express');
module.exports = function (apiParams) {
  const {
    api,
  } = apiParams;


  const AppendParams = async (req, res, next) => {
    try {
      req.modules = apiParams;
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'An Error occured',
      });
    }
  };

  api.use(AppendParams);

  api.get('/', async (req, res) => {
    res.send('OK');
  });


  const user_router = express.Router();
  api.use('/user',user_router);
  require('./user')(user_router)

};