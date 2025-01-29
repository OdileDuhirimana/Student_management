const adminMiddleware = (req, res, next) => {
    const userRole = req.user?.role;

    if (userRole !== 'admin') {
        return res.status(403).json({ message: 'You are not authorized to access this resource' });
    }
    next();
};

module.exports = adminMiddleware;
