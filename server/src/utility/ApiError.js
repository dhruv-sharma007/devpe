class ApiError extends Error {
    constructor(statusCode, message = "Something went wrong", erros = [], stack = ''){
        
        super(message)
        this.statusCode = statusCode;
        this.message = message;
        this.success = false;
        this.erros = erros;
        this.stack = stack
    }
}

export default ApiError