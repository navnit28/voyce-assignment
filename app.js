require('dotenv').config();
require('module-alias/register');
require('./config/database');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require('cors');

const app = express();
const http = require('http');
const useragent = require('express-useragent');

const morgan = require('morgan');
app.set('trust proxy', true);

app.use(compression());
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API Documentation",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./api/**/*.js"],
};
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200 // For legacy browser support
}));

app.use(useragent.express());

app.get('/Ping', async (req, res) => {
  res.status(200).send('ok');
});

app.use(
  morgan('dev', {
    skip(req, res) {
      // eslint-disable-next-line no-empty
      if (res) {}
      if (req.originalUrl.indexOf('path') >= 0) {
        return true;
      }
      return false;
    },
  }),
);

app.get('/', async (req, res) => {
  res.redirect('/console');
});

const server = http.createServer(app);

const router = express.Router();

router.use(
  express.urlencoded({
    limit: '100mb',
    extended: true,
  }),
);
router.use(
  express.json({
    limit: '100mb',
    extended: false,
  }),
);

const api = express.Router();

api.use(
  express.urlencoded({
    limit: '100mb',
    extended: true,
  }),
);
api.use(
  express.json({
    limit: '100mb',
    extended: true,
  }),
);


const logger = require('./middleware/logger');
const universalParams = require('./middleware/universalParams');

api.use(logger);
api.use(universalParams);
app.use('/api', api);

const apiParams = {
  api
};
require('./api/api')(apiParams);

app.use('/', router);

router.all('/*', (req, res) => {
  res.status(404).send('Not Found');
});
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
// require('@grpc-server/grpc_server');