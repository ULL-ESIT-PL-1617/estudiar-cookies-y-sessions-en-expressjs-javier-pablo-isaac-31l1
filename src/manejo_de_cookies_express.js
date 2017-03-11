var express = require('express')
var cookieParser = require('cookie-parser')

var app = express()
app.use(cookieParser())

// Muestra las cookies recibidas
app.get('/', function(req, res, next){
  console.log("Cookies: ", req.cookies);
  res.send('Para establecer la cookie visitar /cookie, para borrarla /borrarcookie')
});

// Establece una nueva cookie
app.get('/cookie', function(req,res){
  res.cookie('nombreDeLaCookie', 'Has visitado la web').send('Hola, cookie generada');
});

// Borra la cookie
app.get('/borrarcookie', function(req,res){
  res.clearCookie('nombreDeLaCookie');
  res.send('Cookie eliminada');
});

app.listen(3000, function(){
  console.log("Server en marcha en el puerto 3000");
})
