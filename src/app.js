import express from 'express'
import morgan from 'morgan';
import cors from 'cors';
import TasksRoutes from './routes/tasksroutes';

const app = express()

//setings
app.set('port', process.env.PORT || 3001)

//middleswares
const corsOptions = {}
app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// routes
app.get("/", (req, res) => {
    res.json({ message: 'wrlcome to my app' })
})

app.use('/api/tasks', TasksRoutes)

export default app;