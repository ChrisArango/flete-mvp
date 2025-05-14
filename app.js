//configura la app de Express (rutas, middlewares, etc.)

// -----------------------
/*
importa Express,para crear:
- El servidor.
- manejar rutas 
- peticiones HTTP 
-middlewares, etc.
*/
const express = require('express');


// -------------------------------------------
/*
Crea una instancia de la aplicación Express.
A partir de aquí, app es el servidor en construcción. 
Con él puedes:
- Definir rutas (app.get(), app.post(), etc.)
- Agregar middlewares (app.use())
- Manejar errores
*/
const app = express();


// ------------------------------------------------
/*
Esto le dice a Express:
Acepta y convierte automáticamente el cuerpo de las peticiones en formato JSON.
Sin esta línea, Express no sabría interpretar ese JSON.
*/
app.use(express.json());


// -------------------------------------------------
/*
Ruta de prueba:(ejemplo temporal)
Dice: 
“Cuando el navegador/cliente visite la ruta raíz "/ ".responde con ¡Hola desde app.js!”.
- req: Es la petición del cliente/navegador.
- res: Es la respuesta del servidor
- res.send(): Envia un texto de vuelta al cliente
*/
app.get('/', (req, res) => {
    res.send('¡Servidor funcionando correctamente!');
});


// -----------------------------------------------
/*
Esto es clave: 
- permite exportar la variable "app" para que server.js pueda importarla y usarla.
- Así separas la lógica de configuración (app.js) de la lógica que arranca el servidor (server.js).
*/
module.exports = app;