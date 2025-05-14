/*  
Solo se encarga de iniciar el servidor y leer variables de entorno.
Esto es importante porque así no tienes que escribir valores sensibles directamente en el código. 
Esto es una buena práctica en cualquier proyecto profesional o de portafolio.
*/

// ---------------------------------
/*
require('dotenv'): Esto importa el paquete dotenv,Trae las funciones de esta librería a mi archivo.
.config(): Llama al método config() de dotenv, que lo que hace es:
- Leer el archivo .env
- Cargar las variables que contiene en process.env

útil porque separa las configuraciones del código. 
Así puedes cambiar el puerto, credenciales, claves API, etc., sin tocar el código fuente.
*/
require('dotenv').config();


// ----------------------------------------
/*
Importa la instancia de Express que se creo en (app.js).
Así puedes usar el metodo app.listen() para iniciar el servidor.
'./app' hace referencia al archivo (app.js) que ya se configuro.
*/
const app = require('./app');


// ------------------------------------------
/*
Define el puerto en el que se ejecutará tu servidor.
Si tienes una variable PORT en el archivo (.env), usará ese valor.
Si no, por defecto usará el puerto 3000.

Es una buena práctica dejar un puerto por defecto en caso de que no haya configuración.
*/
const PORT = process.env.PORT || 3000;


// --------------------------------------
/*
Inicia el servidor Express para que empiece a escuchar conexiones en el puerto definido.
- PORT: el puerto donde se escucharán las solicitudes (ejemplo: http://localhost:3000)
- (()=>{...}): Función como segundo argumento que se ejecuta una vez que el servidor arranca correctamente.
- Imprime un mensaje en la consola para que sepas que el servidor ya está funcionando, y en qué puerto
*/
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});