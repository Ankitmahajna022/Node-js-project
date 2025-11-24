import express from 'express';
import path from 'path';
import tweetRoutes from './routes/routesTweet.js';
import logger from './middleware/logger.js';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());


app.use(logger);

app.use('/api/tweets', tweetRoutes);


const buildPath = path.join(__dirname, '..', 'frontend', 'build');
app.use(express.static(buildPath));

app.get('*', (req, res) => {
  if (req.method === 'GET' && req.accepts('html')) {
    const indexFile = path.join(buildPath, 'index.html');
    try {
      return res.sendFile(indexFile);
    } catch (err) {
      return res.send('Mini Twitter API running');
    }
  }
  res.end();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
