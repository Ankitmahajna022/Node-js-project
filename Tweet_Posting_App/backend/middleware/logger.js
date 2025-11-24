const logger = (req, res, next) => {
    const now = new Date();
    const time = now.toLocaleTimeString();
    console.log(`${req.method} ${req.originalUrl}  ${time}`);
    next();
};

export default logger