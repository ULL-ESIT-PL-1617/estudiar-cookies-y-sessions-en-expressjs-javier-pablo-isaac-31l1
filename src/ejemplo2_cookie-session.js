var cookieSession = require('cookie-session') //Se cargar el módulo cookie-session en la variable "cookieSession".
var express = require('express') //Se carga express en la variable "express".

var app = express() //Crea una aplicación express.

app.set('trust proxy', 1) // La aplicación express está detrás de un proxy.

//Se crea una nueva función middleware de cookie session.
app.use(cookieSession({
  name: 'session',     //Nombre de la cookie : session.
  keys: ['key1', 'key2'] //Lista de claves para verificar.
}))

// This allows you to set req.session.maxAge to let certain sessions
// have a different value than the default.
/*Esta función middleware permite establecer el tiempo máximo de la sesión a otro
 * valor diferente al de por defecto.
 */
app.use(function (req, res, next) {
  req.sessionOptions.maxAge = req.session.maxAge || req.sessionOptions.maxAge //S
  next() //Se llama a la siguiente función middleware.
})
