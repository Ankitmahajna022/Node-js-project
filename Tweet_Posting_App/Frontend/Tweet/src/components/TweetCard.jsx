import React from 'react';

export default function TweetCard({ t, onEdit, onDelete }) {
  return (
    <article className="tweet-card">
      <div className="tweet-left">
        <div className="avatar-circle">{t.username?.charAt(0)?.toUpperCase()}</div>
      </div>

      <div className="tweet-main">
        <div className="tweet-header">
          <strong>@{t.username}</strong>
          <span className="dot">•</span>
          <small>{new Date(t.createdAt).toLocaleTimeString()}</small>
        </div>

        <p className="tweet-text">{t.tweet}</p>

        <div className="tweet-actions">
          {t.edited && <span className="edited-badge">Edited</span>}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
            <button className="link-btn" onClick={() => onEdit(t)}>Edit</button>
            <button className="link-btn" onClick={() => onDelete(t.id)}>Delete</button>
          </div>
        </div>
      </div>
    </article>
  );
}
