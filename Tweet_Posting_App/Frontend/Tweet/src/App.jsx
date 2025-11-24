import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import RightPanel from './components/RightPanel';
import TweetForm from './components/TweetForm';
import './App.css';

export default function App() {
  const [username, setUsername] = useState('');
  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState([]);
  const [editing, setEditing] = useState(null);
  const maxChars = 280;

  useEffect(() => {
    loadTweets();
  }, []);

  function loadTweets() {
    fetch('/api/tweets')
      .then(res => res.json())
      .then(data => setTweets(data))
      .catch(err => console.error(err));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (editing) {
      fetch(`/api/tweets/${editing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tweet })
      })
        .then(res => {
          if (!res.ok) return res.json().then(j => Promise.reject(j));
          return res.json();
        })
        .then(() => {
          setTweet('');
          setEditing(null);
          loadTweets();
        })
        .catch(err => alert(err.error || 'Error'));
      return;
    }

    fetch('/api/tweets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username || 'anon', tweet })
    })
      .then(res => {
        if (!res.ok) return res.json().then(j => Promise.reject(j));
        return res.json();
      })
      .then(() => {
        setTweet('');
        loadTweets();
      })
      .catch(err => alert(err.error || 'Error'));
  }

  function handleEdit(t) {
    setEditing(t);
    setTweet(t.tweet);
  }

  function handleDelete(id) {
    if (!window.confirm('Delete this tweet?')) return;
    fetch(`/api/tweets/${id}`, { method: 'DELETE' })
      .then(res => {
        if (res.status === 204) loadTweets();
        else return res.json().then(j => Promise.reject(j));
      })
      .catch(err => alert(err.error || 'Error'));
  }

  return (
    <div className="app-shell">
      <Sidebar />

      <div className="center-column">
        <Feed tweets={tweets} onEdit={handleEdit} onDelete={handleDelete} />

        {/* Compose area */}
        <div className="compose-area card">
          <TweetForm
            username={username} setUsername={setUsername}
            tweet={tweet} setTweet={setTweet}
            onSubmit={handleSubmit}
            editing={editing}
            maxChars={maxChars}
          />
        </div>

      </div>

      <RightPanel />
    </div>
  );
}
