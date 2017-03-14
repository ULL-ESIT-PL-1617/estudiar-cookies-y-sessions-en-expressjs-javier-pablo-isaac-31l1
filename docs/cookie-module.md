# Cookie Module
El módulo **Cookie** define clases para abstraer el concepto de cookies, un mecanismo de administración de estado HTTP. Es compatible con las  cookies simples de sólo cadena y proporciona una abstracción para tener cualquier tipo de datos serializable como valor de cookie. Es un analizador de cookies y serializador HTTP básico para servidores HTTP.

## Instalación y uso
* Para **instalar** este módulo, es necesario ejecutar el siguiente comando: `npm install cookie`.

* Para poder utilizar este módulo en nuestro código, es necesario requerir el módulo guardándolo en un objeto Javascript.
```javascript
var cookie = require('cookie');
```

## Métodos del módulo `Cookie`
A continuación se exponen los métodos de los que dispone el módulo.

### `cookie.parse(str, opciones)`
Este método analiza una cabecera HTTP `Cookie` y retorna un objeto con todas los pares clave-valor de la cookie. El argumento `str` es la cadena que representa el valor de la cabecera `Cookie` y el argumento `options` es un objeto opcional que contiene opciones adicionales a la hora de parsear.

Un ejemplo de uso de este método sería el siguiente:
```javascript
var cookies = cookie.parse('nombre=Carlos; apellido=Gonzalez');
// { nombre: 'Carlos', apellido: 'Gonzalez' }
```
En este ejemplo se le pasa una cadena que representa una cabecera HTTP y lo que devuelve es un objeto Javascript con cada uno de los pares clave-valor.

#### Opciones del método
##### ``decode``
 Esta propiedad especifica una función que será usada para decodificar el valor de una cookie. Puesto que el valor de la cookie tiene un conjunto de caracteres limitados (y debe ser una cadena simple), esta función puede ser usada para decodificar el valor de una cookie previamente codificada a una cadena Javascript u otro objeto.

La función por defecto es la función global `decodeURIComponent`, que decodificará cualquier secuencia URL codificada a su representación en bytes.

**Nota:** Si se lanza un error desde esta función, el valor del cookie original sin decodificar será retornado como el valor de la cookie.
### `cookie.serialize(nombre, valor, opciones)`
Este método serializa una cookie con un par clave-valor en una cabecera `Set-Cookie` representada en forma de cadena. El argumento `nombre` es el nombre para la cookie; el argumento `valor` es el valor que se establece a la cookie y el argumente `opciones` es un objeto opcional que contiene opciones adicionales de serialización.
Un ejemplo de este método es el siguiente:
```javascript
var setCookie = cookie.serialize('comida', 'macarrones');
// foo=bar
```
En este caso, la cookie tiene nombre `comida` y como valor `macarrones` y, aplicando el método, se convierte en una cabecera representada en forma de cadena.

#### Opciones del método
##### ``domain``
##### ``encode``

```javascript
cookie.serialize('name', String(query.name), {
     httpOnly: true,
     maxAge: 60 * 60 * 24 * 7 // 1 week
}));
```
