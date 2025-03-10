import {Router} from 'express';
import { createTask, deleteTask, deleteTaskHidden, getTask, getTasks, updateTask} from '../controllers/task.controller.js';

const router = Router(); 

//Obtener todas las tareas
router.get('/task', getTasks)

//Obtener una tarea
router.get('/task/:id', getTask)

//Crear una tarea
router.post('/task', createTask)

//Eliminar una tarea (NO USAR)
router.delete('/task/:id', deleteTask)

//Eliminar una tarea (ocultar)
router.delete('/task/hidden/:id', deleteTaskHidden)

//Actualizar una tarea
router.patch('/task/:id', updateTask)


export default router;