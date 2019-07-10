const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const db = require('./config/database');

db.authenticate()
  .then(() => console.log('database connected'))
  .catch(err => console.log(err.message));

const app = express();

//Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'Public')));

app.get('/', (req, res) => res.send('INDEX'));

app.use('/gigs', require('./routes/gigs'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started at port ${PORT}`));
