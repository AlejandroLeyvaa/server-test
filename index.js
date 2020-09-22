const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const fetch = require('node-fetch')
const { config } = require('./config/index');
const contentApi = require('./routes/content');

app = express();

app.use(cors());
app.use(express.json());

contentApi(app);

app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());
app.disable('x-powered-by');


global.fetch = fetch;

app.listen(config.port, () => {
  console.log(`Listen on http://localhost:${config.port}`)
});

