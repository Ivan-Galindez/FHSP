require('./database/connection');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose');
var cookieSession = require('cookie-session')
const passport = require('passport');
const { sessionSecret } = require('./utils/config');
require('./utils/passport')(passport);
const { mongoURI } = require('./utils/config');
const app = express();

// EJS MIDDLEWARES
app.use(expressLayouts);
app.set('view engine', 'ejs');

/// BODYPARSER
app.use(express.urlencoded({ extended: false }));
// For parsing application/json
app.use(express.json());

app.use(express.static(__dirname + "/public"));

app.use(express.static(__dirname + '/node_modules/bootstrap'));

app.use(express.static(__dirname + '/node_modules/jquery'));

app.use(express.static(__dirname + '/node_modules/socket.io'));

app.use(express.static(__dirname + '/node_modules/axios'));

app.use(express.static(__dirname + '/node_modules/sweetalert2'));

app.use(express.static(__dirname + '/node_modules/exceljs'));

mongoose
    .connect(
        mongoURI,
        {useNewUrlParser: true, useUnifiedTopology: true}
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


app.set('trust proxy', 1) // trust first proxy

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

// PASSPORT MIDDLEWARES
app.use(passport.initialize());
app.use(passport.session());

// CONNECT FLASH MIDDLEWARE
app.use(flash());

// GLOBAL VARIABLES
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

// ROUTES
app.use('/', require('./routes/indexRouters'));
app.use('/auth', require('./routes/authRouters/authRoutersApi'));
app.use('/user', require('./routes/usersRouters/userRouters'));

// ADMIN ROUTES


// CONNECTION PARAMETERES
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("server is running and listening on port:", PORT));
