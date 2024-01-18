// YoutubeVideo.js
import React from "react";
import YouTube from "react-youtube";

const YoutubeVideo = ({ videoId }) => {
  const opts = {
    height: "480",
    width: "640",
    playerVars: {
      autoplay: 1,
      mute: 1,
      controls: 0,
      disablekb: 1,
      modestbranding: 1,
      showinfo: 0,
      fs: 0,
      cc_load_policy: 0,
      iv_load_policy: 3,
    },
  };

  const onEnd = (event) => {
    // Reproduce el video nuevamente al finalizar
    event.target.playVideo();
  };

  return (
    <div style={{ position: "relative", width: "640px", height: "480px" }}>
      <YouTube videoId={videoId} opts={opts} onEnd={onEnd} />
      {/* Div superpuesto para bloquear eventos del mouse */}
      <div
        style={{
          width: "640px",
          height: "480px",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      ></div>
    </div>
  );
};

export default YoutubeVideo;
