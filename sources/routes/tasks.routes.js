import {Router} from 'express';
import { createTask, deleteTask, deleteTaskHidden, getTask, getTasks, updateTask} from '../controllers/task.controller.js';

const router = Router(); 

router.get('/task', getTasks)

router.get('/task/:id', getTask)

router.post('/task', createTask)

router.delete('/task/:id', deleteTask)

router.delete('/task/hidden/:id', deleteTaskHidden)

router.patch('/task/:id', updateTask)


export default router;