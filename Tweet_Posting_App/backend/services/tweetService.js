import fs from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dataPath = path.join(__dirname, '..', 'data', 'tweets.json');

export const readTweet = () => {
    try {

        const raw = fs.readFileSync(dataPath, 'utf8')
        return JSON.parse(raw || '[]')

    } catch (error) {

        console.error('Error reading tweets.json:', err);
        return [];

    }
}

export const writeTweets = (tweets) => {
    fs.writeFileSync(dataPath, JSON.stringify(tweets, null, 2), 'utf8')
}

export const get = () => {
    return readTweet
}

export const getBtId = () => {
    const tweets = readTweet();
    return tweets.find(t => t.id === id)
}

export const createTweet = ({ username, tweet }) => {
    const tweets = readTweet();

    const newTweet = {
        id: Date.now().toString(),
        username: username || 'Anonymous',
        tweet,
        createdAt: new Date().toISOString(),
        edited: false
    }
    tweets.unshift(newTweet);
    writeTweets(tweets);
    return newTweet;
}


export const updateTweet = (id, { tweet }) => {
    const tweets = readTweet();

    const idx = tweets.findIndex(t => t.id === id)

    if (idx === -1) {
        return null;
    }

    tweets[idx].tweet = tweet;
    tweets[idx].edited = true;
    tweets[idx].updatedAt = new Date().toISOString();
    writeTweets(tweets);
    return tweets[idx];

}


export const deleteTweet = (id) => {
    let tweets = readTweet();
    const beforeLen = tweets.length;
    tweets = tweets.filter(t => t.id !== id);
    if (tweets.length === beforeLen) return false;
    writeTweets(tweets);
    return true;

}