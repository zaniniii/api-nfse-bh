require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const Client = require('./config/soap')
const cors = require('./config/cors')
const consign = require('consign')


Client.setClient();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/src/public'));
app.set('view engine', 'ejs')
app.use(cors);

consign({
  verbose: false,
  cwd: 'src',
  loggingType: 'info',
  locale: 'pt-br'
}).include().then('routes').into(app)

app.listen(port, () => console.log(`API ${process.env.API_NAME} v[${process.env.API_VERSION}] - Started on port: ${port}`));