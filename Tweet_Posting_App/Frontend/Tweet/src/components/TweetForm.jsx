import React from 'react';
import "./TweetForm.css"

export default function TweetForm({
  username, setUsername,
  tweet, setTweet,
  onSubmit, editing, maxChars
}) {
  return (
    <form className="tweet-form" onSubmit={onSubmit}>
      <div className="tweet-form-top">
        <img src="" alt="avatar" className="avatar-small" />
        <textarea
          placeholder="What's happening?"
          value={tweet}
          onChange={(e) => setTweet(e.target.value)}
          maxLength={maxChars}
        />
      </div>

      <div className="tweet-form-bottom">
        <input
          className="username-input"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <div className="form-actions">
          <small className={`char-count ${tweet.length > maxChars ? 'limit' : ''}`}>
            {tweet.length}/{maxChars}
          </small>
          <button className="btn-primary" type="submit">
            {editing ? 'Save' : 'Tweet'}
          </button>
        </div>
      </div>
    </form>
  );
}
