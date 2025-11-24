const validateTweet = (req, res, next) => {

    const { tweet } = req.body;

    if (tweet === undefined || tweet === null) {
        return res.status(400).json({ error: '`tweet` field is required' });
    }
    if (typeof tweet !== 'string' || tweet.trim().length === 0) {
        return res.status(400).json({ error: '`tweet` cannot be empty' });
    }

    if (tweet.trim().length < 5) {
        return res.status(400).json({ error: 'Minimum tweet length is 5 characters' });
    }


    req.body.tweet = tweet.trim();
    next();
};

export default validateTweet