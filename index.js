// Imports.
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routeV1 = require('./src/routes/v1');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1', routeV1);
app.use('/uploads/', express.static('uploads'));

app.listen(process.env.PORT, () => {
  console.log(`Your server is start on port ${process.env.PORT}...`);
});
