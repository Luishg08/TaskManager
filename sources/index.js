import express from 'express';
import {PORT} from "./config/config.js";
import taskRoutes from "./routes/tasks.routes.js";
import morgan from 'morgan';
import 'dotenv/config';

const app = express(); 

app.use(morgan('dev'));
app.use (express.json()); 
app.use(taskRoutes);

app.listen(PORT)
console.log('Server on port', PORT)



//Instalación de express (para crear el servidor) npm install express
//Instalación Morgan (para ver las peticiones que se hacen al servidor) npm install morgan
//Instalación de nodemon (para que el servidor se reinicie automáticamente) npm install nodemon -D
//Instalación de pg (para conectarse a la base de datos) npm install pg
//Instalación de dotenv (para manejar variables de entorno) npm install dotenv 

//Para ejecutar el servidor se debe ejecutar el comando npm run dev
//Para instalar las dependencias se debe ejecutar el comando npm install

//Crear localmente un archivo .env con las variables de entorno que están en sources/config/config.s
//Crear localmente una bd taskmanager y ejecutar el script que está en db/db.sql