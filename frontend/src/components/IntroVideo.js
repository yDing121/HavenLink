import React from 'react';

function IntroVideo() {
  return (
    <div>
      <h2>Welcome to HavenLink</h2>
      <video controls width="600">
        <source src="path_to_your_intro_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default IntroVideo;
