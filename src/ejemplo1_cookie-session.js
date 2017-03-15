var cookieSession = require('cookie-session') //Se cargar el módulo cookie-session en la variable "cookieSession".
var express = require('express') //Se carga express en la variable "express".

var app = express()  //Crea una aplicación express.

app.set('trust proxy', 1) // La aplicación express está detrás de un proxy.

//Se crea una nueva función middleware de cookie session.
app.use(cookieSession({
  name: 'session',        //Nombre de la cookie : session.
  keys: ['key1', 'key2'] //Lista de claves para verificar.
}))

//Función que maneja el request al camino raíz.
app.get('/', function (req, res, next) {
  //Se actualiza el número de visitas cada vez que el usuario visita la página.
  req.session.views = (req.session.views || 0) + 1

  //Se escribe la actualización de nuevo en la página.
  res.end(req.session.views + ' views')
})

//Se ejecuta la aplicación en el puerto 3000.
app.listen(3000)
