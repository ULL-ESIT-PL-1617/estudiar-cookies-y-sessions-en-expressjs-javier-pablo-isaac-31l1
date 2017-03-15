var express = require('express');
var app = express();
var session = require('express-session');

app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

// Middleware de autenticación y autorización

var auth = function(req, res, next) {
  if (req.session && req.session.user === "claudia" && req.session.admin)
    return next();
  else
    return res.sendStatus(401);
};

// Inicio de sesión
app.get('/login', function (req, res) {
  if (!req.query.username || !req.query.password) {
    res.send('Fallo al iniciar sesión.');
  } else if(req.query.username === "claudia" || req.query.password === "claudia1234") {
    req.session.user = "claudia";
    req.session.admin = true;
    res.send("Inicio de sesión satisfactorio.");
  }
});

// Cierre de sesión
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send("La sesión se ha cerrado satisfactoriamente.");
});

// Acceder al contenido
app.get('/content', auth, function (req, res) {
    res.send("Solo puedes ver esto si has iniciado sesión");
});

app.listen(3000);
console.log("App ejecuntándose en http://localhost:3000");
