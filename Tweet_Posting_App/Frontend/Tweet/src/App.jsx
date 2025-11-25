import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import RightPanel from './components/RightPanel';
import TweetForm from './components/TweetForm';
import './App.css';

const API_URL = "http://localhost:5000/api/tweets";

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
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setTweets(data))
      .catch(err => console.error(err));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (editing) {
      fetch(`${API_URL}/${editing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tweet })
      })
        .then(res => res.json())
        .then(() => {
          setTweet('');
          setEditing(null);
          loadTweets();
        });
      return;
    }

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username || 'anon', tweet })
    })
      .then(res => res.json())
      .then(() => {
        setTweet('');
        loadTweets();
      });
  }

  function handleEdit(t) {
    setEditing(t);
    setTweet(t.tweet);
  }

  function handleDelete(id) {
    if (!window.confirm('Delete this tweet?')) return;
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(res => {
        if (res.status === 204) loadTweets();
      });
  }

  return (
    <div className="app-shell">
      <Sidebar />

      <div className="center-column">
       

        <div className="compose-area card">
          <TweetForm
            username={username}
            setUsername={setUsername}
            tweet={tweet}
            setTweet={setTweet}
            onSubmit={handleSubmit}
            editing={editing}
            maxChars={maxChars}
          />

           <Feed tweets={tweets} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>

      <RightPanel />
    </div>
  );
}
