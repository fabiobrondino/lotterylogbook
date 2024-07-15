require("dotenv").config();

const express = require("express");
const expressJSDocSwagger = require('express-jsdoc-swagger');
const cors = require("cors");
const webSiteRouter = require("./app/routers");

const options = {
  info: {
    version: '1.0.0',
    title: 'Lottery Logbook API',
    license: {
      name: 'MIT',
    },
  },
  security: {
    BasicAuth: {
      type: 'http',
      scheme: 'basic',
    },
  },
   baseDir: __dirname + '/app/routers',
   filesPattern: './**/*.js',
   swaggerUIPath: '/api-docs',
   exposeSwaggerUI: true,
};

const app = express();

expressJSDocSwagger(app)(options);


const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(webSiteRouter);

const PORT = process.env.PORT ?? 3004;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
