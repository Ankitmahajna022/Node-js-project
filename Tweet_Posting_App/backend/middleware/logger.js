import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Required for __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Correct log file path
const logFile = path.join(__dirname, 'server.log');

const logger = (req, res, next) => {
    const now = new Date();
    const time = now.toLocaleTimeString();

    const log = `${req.method} ${req.originalUrl} ${time}\n`;

    console.log(log.trim());

    fs.appendFile(logFile, log, (err) => {
        if (err) {
            console.error("Error writing log:", err);
        }
    });

    next();
};

export default logger;
