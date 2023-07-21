
const HttpError = (status, message) => {
    const error = new Error(message);
    error.message = status;
    return error;
};


export default HttpError;
