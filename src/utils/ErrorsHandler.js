
class RequestError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}


function RequestErrors(err, req, res, next){
	  let statusCode = err.statusCode || 500;
	  let message = err.message;

	  if (err.message == "Cannot read properties of undefined (reading 'hasOwnProperty')") {
	  	message = "Field Is Not Defined"
	  	statusCode = 400
	  }else if(err.message == "Expected a string but received a undefined"){
	  	message = "Data Is Not Defined"
	  	statusCode = 400
	  }

	  res.status(statusCode).json({
	    status: statusCode,
	    message	
	  });
}

export{
	RequestError,
	RequestErrors
}