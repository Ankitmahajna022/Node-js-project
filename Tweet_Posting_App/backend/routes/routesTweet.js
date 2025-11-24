import { Router } from 'express';
import { createTweet, getAllTweets, updateTweet, deleteTweet } from "../services/tweetService.js";
import validateTweet from '../middleware/validateTweet.js';

const router = Router();

router.get('/', (req, res) => {
  const tweets = getAllTweets();   
  res.json(tweets);
});

router.post('/', validateTweet, (req, res) => {
  const { username, tweet } = req.body;
  const created = createTweet({ username, tweet }); 
  res.status(201).json(created);
});

router.put('/:id', validateTweet, (req, res) => {
  const { id } = req.params;
  const updated = updateTweet(id, { tweet: req.body.tweet });
  if (!updated) return res.status(404).json({ error: 'Tweet not found' });
  res.json(updated);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const ok = deleteTweet(id);  // ← FIXED
  if (!ok) return res.status(404).json({ error: 'Tweet not found' });
  res.status(204).send();
});

export default router;
