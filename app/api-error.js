class ApiError extends Error {
    constructor(message, status) {
        super();
        this.statusCode = status.code;
        this.status = status;
    }
}

module.exports = ApiError;