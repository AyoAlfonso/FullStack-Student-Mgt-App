const bodyParser = require('body-parser');
const routes = require('../routes/index');
const apiRoutes = require('../routes/api');
const adminRoutes = require('../routes/admin');
const cookieParser = require('cookie-parser');
const errorHandlers = require('../../controller/errorHandlers');
const express = require('express');
const logger = require('morgan');
const middleware = require('../../middleware');
const session = require('express-session');
require('dotenv').config();

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** Extended this so that we can use this extensively in the route folders
 * 
*/
app.use(cookieParser());

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

/*Confirms Redirect http to https when we are in PRODUCTION*/
app.use('*', function(req,res,next) {
  let status = 302;
if(req.headers['x-forwarded-proto'] != 'https' && process.env.NODE_ENV === 'production') {
  res.redirect(status, 'https://' + req.hostname + req.originalUrl);
  return
}
else
  next()
});

app.use(express.static('public'))

app.use(session({
  secret: 'nodejs-re-master-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false, // key
    maxAge: 24 * 60 * 60 * 1000, //Admin is only allowed to be able to log in at most for a day
  },
}))

/* Added a security measure */
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.use('/', middleware);
app.use('/api', apiRoutes);
app.use('/admin', adminRoutes);
app.use('/', routes);


app.set('port', (process.env.PORT || 4500));

app.use(function (err, req, res, next) {
  next(err);
});

app.use(errorHandlers.notFound);

if (app.get('env') === 'development') {
  app.use(errorHandlers.developmentErrors);
}

app.use(errorHandlers.productionErrors);


const server = app.listen(app.get('port'), () => {
  console.log(`Our app is running -→ PORT ${app.get('port')}`)
});

/*Handle port errors server.on arrow function, on the callback of the server.on() method*/
server.on('error', (error)=>{
 let port =  app.get('port')
    if (error.syscall !== 'listen') {
      throw error;
    }
    const bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port
    // handle specific listen errors with friendly messages
    /* eslint-disable */
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  })
/**
 * Event listener for HTTP server "error" event.
 */

/* Also dont know why we need to export the app where */
module.exports = app;
