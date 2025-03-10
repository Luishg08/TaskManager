
import { pool } from '../connections/db.js'

export const getTasks = async (req, res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM tasks where hidden = false')
        res.json(rows)
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
    
}

export const getTask = async (req, res) => {
    try {
        const {id} = req.params;
        const {rows} = await pool.query(`SELECT * FROM tasks WHERE id = ${id}`)

        if (rows.length === 0) {
            return res.status(404).json({message: 'Task not found'})    
        }
        res.json(rows[0])
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
    
}

export const createTask = async (req, res) => {
    try {
        const data = req.body;

    if (!data.title || !data.description) {
        res.status(400).json({message: 'Title and description are required'})
    }
    const { rows } = await pool.query(
        `INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *`,
        [data.title, data.description]
    );
    res.status(201).json(rows[0]);
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
    
}

/**
 * Método que elimina una tarea de base de datos
 * No se utilizará porque tenemos un atributo hidden que nos permite ocultar la tarea
 */
export const deleteTask = async (req, res) => {
    try {
        const {id} = req.params;
        const {rows, rowCount} = await pool.query(`DELETE FROM tasks WHERE id = ${id} RETURNING *`)
    
        if (rowCount === 0) {
            return res.status(404).json({message: 'Task not found'})    
        }
        res.json(rows[0])
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
   
}

/**
 * Método que se utilizará desde el front para "Eliminar" una tarea
 * Se ocultará la tarea
 * No se eliminará de la base de datos  
 */

export const deleteTaskHidden = async (req, res) => {
    try {
        const {id} = req.params;
        const {rows, rowCount} = await pool.query(`UPDATE tasks SET hidden = true WHERE id = ${id} RETURNING *`)
        if (rowCount === 0) {
            return res.status(404).json({message: 'Task not found'})    
        }
        res.json(rows[0])
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
   
}



export const updateTask = async (req, res) => {
    try {
        const {id} = req.params;
    if (req.body.title === undefined && req.body.description === undefined && req.body.hidden === undefined && req.body.do_mark === undefined) {
        return res.status(400).json({message: 'Enter the data to update'})
    }
    let {rows} = await pool.query(`SELECT * FROM tasks WHERE id = ${id}`)
    if (rows.length === 0) {
        return res.status(404).json({message: 'Task not found'})    
    }
    const objectTask = {
        title: req.body.title !== undefined ? req.body.title : rows[0].title,
        description: req.body.description !== undefined ? req.body.description : rows[0].description,
        hidden: req.body.hidden !== undefined ? req.body.hidden : rows[0].hidden,
        do_mark: req.body.do_mark !== undefined ? req.body.do_mark : rows[0].do_mark
    }
    rows = await pool.query(
        `UPDATE tasks SET title = $1, description = $2, hidden = $3, do_mark = $4 WHERE id = ${id} RETURNING *`,
        [objectTask.title, objectTask.description, objectTask.hidden, objectTask.do_mark]
    );
    res.send(rows.rows[0])
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
    
}

