import Task from "../models/Task";
import {getPagination} from '../libs/getPagination';

export const findAllTasks = async (req, res) =>{
    try {
        console.log(req.query)
        const { size, page, title } = req.query
        const condition = title ? {title: {$regex: new RegExp(title), $options:"i"}}: {}
        const {limit, offset} = getPagination(page, size)
        const data = await Task.paginate(condition, {offset, limit})
        console.log(data)
    res.json({
        totalItems: data.totalDocs,
        tasks: data.docs,
        totalPages: data. totalPages,
        currenPage: data.page - 1
    })
    } catch (error) {
        res.status(500).json({
            message: error.message || "somthing goes wrond retriveving the tasks"
        })
    }
}
export const createTask = async (req, res)=>{
    if(!req.body.title){
        return res.status(400).send({message: 'content cannot be empy'})
    }
    try {
        const newTask = new Task({
            title: req.body.title,
            description: req.body.description, 
            done: req.body.done ? req.body.done : false
            })
        const taskSAve = await newTask.save()
        res.json(taskSAve)
    } catch (error) {
        res.status(500).json({
            message: error.message || "somthing goes wrond create a tasks"
        })
    }
}


export const findOneTask = async (req, res) =>{
    const { id } = req.params
    try {
        

    const taks =await Task.findById(id)
    if(!taks) return res.status(400).json({message:  `Task with id ${id} does not exits` })
    res.json(taks)
    } catch (error) {
        res.status(500).json({
            message: error.message ||  `Error retrieving task with id: ${id}` 
        })
    }
}
export const deleteTask = async (req, res) =>{
    const { id } = req.params
   try {
    await Task.findByIdAndDelete(id)
    res.json({
        message:  'Task were delete successfully',
    })
   } catch (error) {
    res.status(500).json({
        message:  `${id}` 
    })
   }
}

export const findAllDoneTaks = async(req, res) =>{
    try {
        const tasks = await Task.find({done: true})
    res.json(tasks)
    } catch (error) {
        res.status(500).json({
            message:  `esto => ${error}` 
        })
    }
}
export const updateTask = async (req, res)=>{
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body,{
            useFindAndModify: false
        })
        res.json(updatedTask)
    } catch (error) {
        res.status(500).json({
            message:  `Esto => ${error}` 
        })
    }
}