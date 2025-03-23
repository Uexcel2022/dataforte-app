import AppError from "../utils/AppError.js";

function errorHandler(error,req,resp,next){
    error.statusCode = error.statusCode||500
    error.status = error.status||'error'


    if(`${error.name}`.match(/^ValidationError$/)){
      const msg =  Object.values(error.errors).map(el=>el.message).join(', ')
      error = new AppError(`Invalid data: ${msg}`,400)
    }

    if(`${error.name}`.match(/^MongooseError$/)){
      error = new AppError(error.message,400)
    }

    if(`${error.name}`.match(/^CastError$/)){
      const message = `Invalid ${error.path}: ${error.value}.`
      error = new AppError(message,400)
    }

    if(`${error.name}`.match(/^JsonWebTokenError$/)){
      error = new AppError('The token is invalid. Please login again',401)
    }

    if(`${error.name}`.match (/^TokenExpiredError$/)){
      error = new AppError('The token has expire. Please login again',401)
    }


    if(process.env.NODE_ENV==='development'){
      if(error.isOperational){
        resp.status(error.statusCode).json({
            status : error.status,
            message: error.message,
            error,
            stack : error.stack
        })
    }else{
      resp.status(500).json({
        status : 'error',
        message: 'Some went wrong',
        error,
        stack : error.stack
      })
    }
  }else{
    if(process.env.NODE_ENV==='production'){
      if(error.isOperational){
        resp.status(error.statusCode).json({
            status : error.status,
            message: error.message,
        })
    }else{
        console.log(error)
        resp.status(500).json({
          status : 'error',
          message: 'Some went wrong!'
        })
      }
    }
  }
}

export default errorHandler;