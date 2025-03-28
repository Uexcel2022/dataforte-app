import express from 'express'
import {studentRouter} from './routes/studentRouter.js'
import {courseRouter} from './routes/couseRouter.js'
import {classRouter} from './routes/classRouter.js'
import {employeeRouter} from './routes/employeeRouter.js'
import globalErrorHandler from './controller/errorController.js'
import helmet from 'helmet'
import hpp from 'hpp'
import mongoSanitize from 'express-mongo-sanitize'
import rateLimit from  'express-rate-limit'
import AppError from './utils/AppError.js'

process.on('uncaughtException',err=>{
    console.log('UNCAUGHT EXCEPTION! shutting down...')
    console.log(err)
    process.exit(1)
})

const app = express();
app.use(express.json({limit: '500kb'}));

app.set('trust proxy',['52.41.36.82','54.191.253.12','44.226.122.3'])

const rateLimiter = rateLimit({
    max: 1000,
    windowMs: 60*60*1000,
    message: 'Too many request from this IP. Please try again in an hour time!'
})
app.use(helmet())
app.use('/api',rateLimiter)
app.use(mongoSanitize())
app.use(hpp({
        whitelist : [
          'name','salary','category','position','price']
    }))


app.use('/api/v1/students',studentRouter);
app.use('/api/v1/courses',courseRouter);
app.use('/api/v1/classes',classRouter);
app.use('/api/v1/employees',employeeRouter);

app.all('/*',(req,resp,next)=>{
    next(new AppError(`The given URL ${req.originalUrl} not found!`,404));
})

app.use(globalErrorHandler)

export default app;