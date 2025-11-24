import React from 'react';
import TweetCard from './TweetCard';
import "./Feed.css"

export default function Feed({ tweets, onEdit, onDelete }) {
  return (
    <main className="feed">
      <header className="feed-header">
        <h3>Home</h3>
      </header>

      <section className="compose">
      </section>

      <div className="tweet-list">
        {tweets.length === 0 ? <p className="no-tweets">No tweets yet.</p> :
          tweets.map(t => <TweetCard key={t.id} t={t} onEdit={onEdit} onDelete={onDelete} />)
        }
      </div>
    </main>
  );
}
