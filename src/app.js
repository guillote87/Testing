

const createError = require('http-errors');
const express = require('express');
const logger = require("morgan");
const path = require('path');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const session = require("express-session")
const userLoggedMiddleware =require("./middlewares/userLoggedMiddleware")

// ************ express() - (don't touch) ************
const app = express();

// ************ Middlewares - (don't touch) ************

app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false }));
app.use(session({
 secret: "Its a secret",
resave: false,
saveUninitialized: false
}))
app.use(userLoggedMiddleware)
app.use(logger('dev'));
app.use(express.json());
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

// ************ Template Engine - (don't touch) ************
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas

// ************ WRITE YOUR CODE FROM HERE ************
// ************ Route System require and use() ************

const productRoute = require ("./routes/product")
const mainRoute = require ("./routes/index")
const userRoute = require ("./routes/usersRoute")




app.use("/", mainRoute)
app.use ("/products",productRoute)
app.use("/users", userRoute)




// ************ DON'T TOUCH FROM HERE ************
// ************ catch 404 and forward to error handler ************
app.use((req, res, next) => next(createError(404)));

// ************ error handler ************
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// ************ exports app - dont'touch ************
module.exports = app;

