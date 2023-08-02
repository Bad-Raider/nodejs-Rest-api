export const handleSaveError = (error, _, next) => {
    error.status = 400;
    next()
};

export const handleUpdateValidate = function(next){
    this.options.runValidators = true;
    next();
}