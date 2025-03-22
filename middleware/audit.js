const createdAt = (req, res, next) => {
    req.body.createdAt = Date.now();
    req.body.createdBy = req.admin? req.admin.email:'anonymous';
    next();
}

const updatedAt = (req, res, next) => {
    req.body.updatedAt = Date.now();
    req.body.updatedBy = req.admin? req.admin.email:'anonymous';
    next();
}

export { createdAt, updatedAt}