import { Router } from "express"; 
import  * as taskCtrl1 from '../controllers/task.controller';



const router = Router()
router.post('/', taskCtrl1.createTask)

router.get('/', taskCtrl1.findAllTasks)
router.get('/done', taskCtrl1.findAllDoneTaks)

router.get('/:id', taskCtrl1.findOneTask)

router.delete('/:id', taskCtrl1.deleteTask)

router.put('/:id', taskCtrl1.updateTask)


export default router