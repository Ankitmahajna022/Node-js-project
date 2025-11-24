import React from 'react';
import "./RightPanel.css"

function TrendItem({ title, subtitle }) {
  return (
    <div className="trend-item">
      <small className="trend-sub">{subtitle}</small>
      <strong className="trend-title">{title}</strong>
      <small className="trend-count">10,094 people are Tweeting about this</small>
    </div>
  );
}

export default function RightPanel() {
  return (
    <aside className="rightpanel">
      <div className="searchbox">
        <input placeholder="Search Twitter" />
      </div>

      <div className="panel card">
        <h4>Trends for you</h4>
        <TrendItem title="#BreakingNews" subtitle="Trending worldwide" />
        <TrendItem title="#WorldNews" subtitle="Trending worldwide" />
        <TrendItem title="#GreatestOfAllTime" subtitle="Trending worldwide" />
        <a className="show-more">Show more</a>
      </div>

      <div className="panel card">
        <h4>Who to follow</h4>
        <p><strong>@someone</strong> <small>Suggested</small></p>
      </div>
    </aside>
  );
}
