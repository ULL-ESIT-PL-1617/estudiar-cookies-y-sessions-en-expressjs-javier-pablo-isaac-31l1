# Cookie Session
Es una función middleware de sesión simple basado en cookies. El hecho de que las cookies pueden guardar datos en el navegador del usuario, una API de sesión puede implementarse utilizando cookies.

## Instalación y uso
Para instalar este módulo es necesario tener instalado [npm](https://docs.npmjs.com/), ya que es un módulo **Node.js** disponible a través del repositorio **npm**. El comando para instalar el módulo es el siguiente: `npm install cookie-session`

## API del módulo
Este módulo dispone de una serie de métodos que se decriben a continuación.

### `cookieSession(opciones)`
Este método crea una nueva función middleware de sesión con cookies con las opciones establecidas. Esta función middleware enlazará la propiedad `session` a `req`, que provee un objeto representando la sesión cargada. Esta sesión es una nueva sesión si no se ha aportado ninguna sesión valida en la petición, o una sesión cargada desde la petición.

La función middleware añadirá automáticamente una cabecera `Set-Cookie` a las respuesta si el contenido de `req.session` fue alterado. Hay que tener en cuenta que ninguna cabecera `Set-Cookie` estará en la cabecera de respuesta (y de este modo no se creará ninguna sesión para un usuario específico), a menos que haya contenido en la sesión. De esta forma hay que asegurarse de añadir algo al campo `req.session` tan pronto como se identifique información para guardar para la sesión.

#### Opciones

##### name
El nombre de la cookie a establecer. Por defecto el nombre es `session`.

##### keys
La lista de claves utilizada para firmar y verificar los valores de las cookies. Las cookies establecidas siempre están marcadas con `key[0]`, mientras que las otras claves son válidas para verificar, permitiendo la rotación de claves.

##### secret
Una cadena que será utilizada como única clave si el campo `keys` no se provee.

##### Cookie options
Se pueden pasar otras opciones al método `cookies.get()` y `cookies.set()` para permitir el control de la seguridad, el dominio, el path y otro tipo de configuraciones.

El campo de opciones también pueden contener cualquiera de las siguientes opciones:
* `maxAge` : Es un número que representa los milisegundos a partir de la fecha proveida por la  función `Date.now()` para que se expire la cookie de sesión.
* `expires` : Es un objeto `Date` que indica la fecha de expiración de la cookie (por defecto expira al final de la sesión).
* `path` : Es una cadena que indica el path de la cookie (por defecto es `/`).
* `domain`: Una cadena que indica el dominio de la cookie (no se establece por defecto).
* `sameSite` : Es un booleano o una cadena que indica si la cookie es una cookie del "mismo sitio" ( el valor es falso por defecto). Se puede establecer a `strict`, `lax` o verdadero (que es mapeado a `strict`).
* `secure` : Es un booleano que indica si la cookie sólo se puede enviar por **HTTPS** (por defecto el valor es falso para **HTTP** y verdadero para **HTTPS**).
* `httpOnly` : Es un booleano que indica si la cookie sólo se puede enviar sobre **HTTP(S)** y que no esté disponible para el cliente Javascript (el valor es verdadero por defecto).
* `signed` : Es un booleano que indica si la cookie debe ser firmada (el valor es verdadero por defecto). Si es verdadero, otra cookie con el mismo nombre con el sufijo `.sig` concatenado puede también ser enviado con un valor `27-byte url-safe base64 SHA1`, representando el hash de __nombre-cookie=valor-cookie__ contra la primera clave **Keygrip**. Esta clave de firma es utilizada para detectar alteraciones la proxima vez que se reciba una cookie.

* `overwrite` : Es un booleano que indica si se sobrescribe cookies previamente establecidas del mismo nombre (el valor es verdadero por defecto). Si el valor es verdadero, todas las cookies establecidas durante la misma petición con el mismo nombre (sin tener en cuenta el path o el dominio) son ignoradas de la cabecera `Set-Cookie` cuando se configure la cookie.
http://expressjs-book.com/index.html%3Fp=128.html

### `req.session)`
Representa la sesión para una petición determinada.

#### Campos

###### .isChanged
Es verdadero si la sesión ha cambiado durante la petición.

###### .isNew
Es verdadero si la sesión es nueva.

###### .isPopulated
Determina si se le ha añadido datos a la sesión o está vacía

### `req.session)`
