
const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors')
require('dotenv').config();

// Create express server
const app = express();

dbConnection();

app.use(cors());

app.use( express.static('./public'));

app.use( express.json() )

app.use('/api/auth', require('./routes/auth') );
app.use('/api/events', require('./routes/events') );


app.listen( process.env.PORT, () => {
  console.log(`App running on port: ${ process.env.PORT }`);
})