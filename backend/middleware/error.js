

const ErrorHandler = require('../utils/errorHandler')


module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error"


    // Wrong Mondodb ID error (Cast error )
    if (err.name === "CastError") {
        const message = `Resource not found . Invalid ${err.path}`
        err = new ErrorHandler(message, 400)
    }


    // mongoose duplicatekey error

    if(err.code===11000){
      const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
      err= new ErrorHandler(message,400)
    }

      // Wrong JWT error
      if (err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid, try again`
        err = new ErrorHandler(message, 400)
    }

         // Wrong JWT expire
         if (err.name === "TokenExpiredError") {
            const message = `Json Web Token is expire`
            err = new ErrorHandler(message, 400)
        }
    res.status(err.statusCode).json({
        success: false,
        // error:err,
        message: err.message
    })
}