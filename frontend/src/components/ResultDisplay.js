import React from 'react';

function ResultDisplay({ results }) {
  return (
    <div>
      <h3>Recommended resources</h3>
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result.name} - {result.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default ResultDisplay;
