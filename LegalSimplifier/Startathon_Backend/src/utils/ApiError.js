class ApiError extends Error {
    constructor(statusCode, message = "Something went wrong...!") {
        super()
        this.statusCode = statusCode
        this.data = null
        this.message = message
    }
}

export {ApiError}