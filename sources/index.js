import express from 'express';
import {PORT} from "./config.js";

const app = express(); 

app.listen(PORT)
console.log('Server on port', PORT)


//Instalación de express (para crear el servidor)
//Instalación Morgan (para ver las peticiones que se hacen al servidor)
//Instalación de nodemon (para que el servidor se reinicie automáticamente)
//Instalación de pg (para conectarse a la base de datos)