var cookie = require('cookie'); //Se carga el módulo cookie
var escapeHtml = require('escape-html'); // Se carga el módulo escapeHtml
var http = require('http'); //Se carga el módulo http
var url = require('url'); //Se carga el módulo url
function onRequest(req, res) {
  /* Se parsea la cadena de consulta. Se pasa como parámetro una URL en forma de cadena y retorna un objeto URL. A continuación
  * se accede a la propiedad query (objeto) del objeto URL devuelto por el método parse() para obtener la cadena de consulta.
  */
  var query = url.parse(req.url, true, true).query;
  //Si el query no está vacío y la cadena de consulta tiene un nombre, entonces se entra.
  if (query && query.name) {
    /* En esta sentencia se establece en la respuesta una cabecera de tipo "Set-Cookie" (utilizada para
    * enviar una cookie desde el servidor al cliente). El valor de esta cabecera se establece con el metodo cookie.serialize() , especificando el nombre
    * de la cookie como "nuombre", y el valor de esa cookie es el nombre que se le pasa a la cadena de consulta. 
    */
    res.setHeader('Set-Cookie', cookie.serialize('nombre', String(query.name), {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7 // 1 week
    }));

    // Redirect back after setting cookie
    res.statusCode = 302;
    res.setHeader('Location', req.headers.referer || '/');
    res.end();
    return;
  }

  // Parse the cookies on the request
  var cookies = cookie.parse(req.headers.cookie || '');

  // Get the visitor name set in the cookie
  var name = cookies.name;

  res.setHeader('Content-Type', 'text/html; charset=UTF-8');

  if (name) {
    res.write('<p>Welcome back, <b>' + escapeHtml(name) + '</b>!</p>');
  } else {
    res.write('<p>Hello, new visitor!</p>');
  }

  res.write('<form method="GET">');
  res.write('<input placeholder="enter your name" name="name"> <input type="submit" value="Set Name">');
  res.end('</form');
}

http.createServer(onRequest).listen(3000);
