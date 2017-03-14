var cookie = require('cookie');
var escapeHtml = require('escape-html');
var http = require('http');
var url = require('url');

function onRequest(req, res) {
  /* Se parsea la cadena de consulta. Se pasa como parámetro una URL en forma de cadena y retorna un objeto URL. A continuación
  * se accede a la propiedad query (objeto) del objeto URL devuelto por el método parse() para obtener la cadena de consulta.
  */
  var query = url.parse(req.url, true, true).query;
//Si el query no está vacío y la cadena de consulta tiene un nombre, entonces se entra
  if (query && query.name) {
    /* En esta sentencia se establece en la respuesta una cabecera de tipo "Set-Cookie" (utilizada para
    * enviar una cookie desde el servidor al cliente). El valor de esta cabecera se establece con el metodo cookie.serialize() , especificando el nombre
    * de la cookie como "nuombre", y el valor de esa cookie es el nombre que se le pasa a la cadena de consulta. Además se le pasa como opciones las propiedades
    * httpOnly (el script del cliente Javascript no puede acceder a la cookie) y maxAge (tiempo en segundos que persiste la cookie)
    */
    res.setHeader('Set-Cookie', cookie.serialize('name', String(query.name), {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7 // 1 week
    }));

      // Se redirige de vuelta tras establecer la cookie
    res.statusCode = 302;
    res.setHeader('Location', req.headers.referer || '/');  //Se establece el campo de cabecera "Location" a la misma URI desde la que se obtuvo la petición. Si no existe se pone "/".
    /*Este método avisa al servidor de que todas las cabeceras y el cuerpo de la respuesta se han enviado ; el servidor debe considerar que el mensaje
     *ha sido completado. Este método se debe llamar en cada respuesta.
     */
    res.end();
    return;
  }

  // Parsea las cookies en la petición.
  var cookies = cookie.parse(req.headers.cookie || '');

  //Coge el nombre del visitor establecido en la cookie.
  var name = cookies.name;

  res.setHeader('Content-Type', 'text/html; charset=UTF-8'); //Establece una cabecera de tipo "Content-Type" indicando el tipo de documento dentro de la página.
   //Si existe el nombre, se escribe un mensaje dándole la bienvenida de vuelta. Si no existe esta propiedad es que el visitor es nuevo.
  if (name) {
    res.write('<p>Welcome back, <b>' + escapeHtml(name) + '</b>!</p>');
  } else {
    res.write('<p>Hello, new visitor!</p>');
  }

   //Se escribe más HTML en la respuesta
  res.write('<form method="GET">');
  res.write('<input placeholder="enter your name" name="name"> <input type="submit" value="Set Name">');
  res.end('</form');
}
/*Se crea un servidor http y se añade automáticamente la función "onRequest" al evento de petición, de tal forma que, cada vez que haya una petición,
 *esta función se ejecutará
 */
http.createServer(onRequest).listen(3000);
