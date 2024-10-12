import React from 'react';

function NoMatch({ onRetry }) {
  return (
    <div>
      <h3>No matching content found. Would you like to try again?</h3>
      <button onClick={onRetry}>Retry</button>
    </div>
  );
}

export default NoMatch;

