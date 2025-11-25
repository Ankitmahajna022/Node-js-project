import express from 'express';
import path from 'path';
import tweetRoutes from './routes/routesTweet.js';
import logger from './middleware/logger.js';
import { fileURLToPath } from 'url';
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173'
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());


app.use(logger);

app.use('/api/tweets', tweetRoutes);


const buildPath = path.join(__dirname, '..', 'Frontend', 'build');
app.use(express.static(buildPath));

console.log(buildPath)

app.use((req, res) => {
  if (req.method === 'GET' && req.accepts('html')) {
    const indexFile = path.join(buildPath, 'index.html');
    try {
      return res.sendFile(indexFile);
    } catch (err) {
      return res.send('Mini Twitter API running');
    }
  }
  res.status(404).json({ message: 'Route not found' });
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
