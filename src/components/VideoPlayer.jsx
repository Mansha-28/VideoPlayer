import React, { useRef, useState, useEffect } from 'react';

const VideoPlayer = ({ src, autoplay }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);

  const playbackSpeed = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]

  useEffect(() => {
    const video = videoRef.current;

    // Set autoplay if specified
    if (autoplay) {
      video.play();
      setIsPlaying(true);
    }

    // Event listeners
    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('ended', handleVideoEnd);
    document.addEventListener('keydown', handleSpaceKeyPress);

    // Cleanup on unmount
    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('ended', handleVideoEnd);
      document.removeEventListener('keydown', handleSpaceKeyPress);
    };
  }, [autoplay, isPlaying]);

  // Update current time and duration
  const updateTime = () => {
    setCurrentTime(videoRef.current.currentTime);
    setDuration(videoRef.current.duration);
  };

  // Handle video end
  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  // Toggle play/pause
  const togglePlay = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen()
          .catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message}`);
          });
      } else {
        document.exitFullscreen();
      }
  }

  // Seek functionality
  const handleSeek = (e) => {
    const video = videoRef.current;
    video.currentTime = e.target.value;
    setCurrentTime(video.currentTime);
  };

  // Speed selector
  const handleSpeedChange = (e) => {
    const video = videoRef.current;
    setSpeed(parseFloat(e.target.value));
    video.playbackRate = parseFloat(e.target.value);
  };

  // Space key code
  const handleSpaceKeyPress = (e) => {
    if (e.keyCode === 32) { 
      togglePlay();
    }
  };

  return (
    <div className={`relative mx-5 border-2 border-black'`}>
      <video ref={videoRef} src={src} className="w-full" onClick={togglePlay} />

      {/* Controls */}
      <div className={`absolute bottom-0 w-full bg-gray-800 bg-opacity-50`}>
        <div className="flex items-center justify-between">
          {/* Play/Pause toggle */}
          <button onClick={togglePlay} className="text-white h-8 w-6 mx-2">
            {isPlaying ? (
                <PauseIcon className="w-2 h-2 text-white" />
                ) : (
                <PlayIcon className="w-2 h-2 text-white" />
            )}
          </button>

          {/* Seek functionality */}
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 mx-2 appearance-none bg-gray-400 h-1 rounded-md"
          />

          {/* Timer displaying current playback time and duration */}
          <span className="text-white">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          {/* Speed selector for playback speed adjustment */}
          <select
            value={speed}
            onChange={handleSpeedChange}
            className="px-2 py-1 mx-2 bg-gray-700 outline-none text-white rounded-md"
          >
            {
                playbackSpeed.map((speed,index) => (
                    <option key={index} value={speed}> {speed}x</option>
                ))
            }
          </select>

          <button onClick={toggleFullScreen} className="text-white h-8 w-6  m-2 rounded">
                <FullScreenIcon className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};


const PlayIcon = () => (
    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.6582 9.28638C18.098 10.1862 18.8178 10.6361 19.0647 11.2122C19.2803 11.7152 19.2803 12.2847 19.0647 12.7878C18.8178 13.3638 18.098 13.8137 16.6582 14.7136L9.896 18.94C8.29805 19.9387 7.49907 20.4381 6.83973 20.385C6.26501 20.3388 5.73818 20.0469 5.3944 19.584C5 19.053 5 18.1108 5 16.2264V7.77357C5 5.88919 5 4.94701 5.3944 4.41598C5.73818 3.9531 6.26501 3.66111 6.83973 3.6149C7.49907 3.5619 8.29805 4.06126 9.896 5.05998L16.6582 9.28638Z" stroke="#fff" stroke-width="2" stroke-linejoin="round"></path> </g></svg>
  );
  
  const PauseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M5 4a1 1 0 0 1 1 1v10a1 1 0 0 1-2 0V5a1 1 0 0 1 1-1zm8 0a1 1 0 0 1 1 1v10a1 1 0 0 1-2 0V5a1 1 0 0 1 1-1z"
        clipRule="evenodd"
      />
    </svg>
  );

  const FullScreenIcon = () => (
    <svg viewBox="0 0 24 24" fill="#FFF" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M23 4C23 2.34315 21.6569 1 20 1H16C15.4477 1 15 1.44772 15 2C15 2.55228 15.4477 3 16 3H20C20.5523 3 21 3.44772 21 4V8C21 8.55228 21.4477 9 22 9C22.5523 9 23 8.55228 23 8V4Z" fill="#fff"></path> <path d="M23 16C23 15.4477 22.5523 15 22 15C21.4477 15 21 15.4477 21 16V20C21 20.5523 20.5523 21 20 21H16C15.4477 21 15 21.4477 15 22C15 22.5523 15.4477 23 16 23H20C21.6569 23 23 21.6569 23 20V16Z" fill="#fff"></path> <path d="M4 21H8C8.55228 21 9 21.4477 9 22C9 22.5523 8.55228 23 8 23H4C2.34315 23 1 21.6569 1 20V16C1 15.4477 1.44772 15 2 15C2.55228 15 3 15.4477 3 16V20C3 20.5523 3.44772 21 4 21Z" fill="#fff"></path> <path d="M1 8C1 8.55228 1.44772 9 2 9C2.55228 9 3 8.55228 3 8L3 4C3 3.44772 3.44772 3 4 3H8C8.55228 3 9 2.55228 9 2C9 1.44772 8.55228 1 8 1H4C2.34315 1 1 2.34315 1 4V8Z" fill="#fff"></path> </g></svg>
  );

  const MinimizeScreen = () => ( 
    <svg viewBox="0 0 24 24" fill="#FFF" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.00001 18.0001L9.00001 17.0001C9.00001 15.8956 8.10458 15.0001 7.00001 15.0001H6.00001M15 18.0001V17.0001C15 15.8956 15.8954 15.0001 17 15.0001L18 15.0001M9 6.00012L9 7.00012C9 8.10469 8.10457 9.00012 7 9.00012L6 9.00012M15 6.00014L15 7.00014C15 8.10471 15.8954 9.00014 17 9.00014L18 9.00014" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
  )

// Utility function to format time
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export default VideoPlayer;

