import { useRef, useState, useEffect } from 'react';

function Card({volume, audioSource, cover, songTitle, songAuthor, spotifyLink}) {
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const durationSpan = useRef(null);
  const currentTimeSpan = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const StartOrStopSong = () => {
    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }

  const onProgressChange = (e) => {
    audioRef.current.currentTime = e.target.value;
    setProgress(e.target.value);
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    const onLoadedMetadata = () => {
      setDuration(audio.duration);
      if (durationSpan.current) {
        durationSpan.current.textContent = formatTime(audio.duration);
      }
    }
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    const onTimeUpdate = () => {
      setProgress(audio.currentTime);
      if (currentTimeSpan.current) {
        currentTimeSpan.current.textContent = formatTime(audio.currentTime);
      }
    }
    audio.addEventListener('timeupdate', onTimeUpdate);
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    const onLoadedMetadata = () => setDuration(audio.duration);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current;
    const onTimeUpdate = () => setProgress(audio.currentTime);
    audio.addEventListener('timeupdate', onTimeUpdate);
    currentTimeSpan.current
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current;
    const onEnded = () => {
      setIsPlaying(false);
      audio.currentTime = 0;
      setProgress(0);
    }

    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('ended', onEnded);
    }
  }, [])

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  function Forward(){
    audioRef.current.currentTime += 10;
  }
  function Back(){
    audioRef.current.currentTime -= 10;
  }

  return (
    <div className='music-card'>
      <a href={spotifyLink} target='_blank'><button className='music-card-button'><img src={cover} alt="Music Cover" width={300} className='music-card-cover'/></button></a>
      <h2 className='music-card-title'>{songTitle}</h2>
      <h3 className='music-card-author'>{songAuthor}</h3>
      <button id="music-card-back-button" onClick={Back}>{"<"}</button>
      <button id="music-card-play-button" onClick={StartOrStopSong}>{isPlaying ? '⏸' : '▶'}</button>
      <button id="music-card-skip-button" onClick={Forward}>{">"}</button>
      <input type="range" className="music-card-progress-bar" min="0" max={duration} value={progress} onChange={onProgressChange} ref={progressBarRef}/>
      <span id="currentTime" ref={currentTimeSpan}>0:00</span>  
      <span id="duration" ref={durationSpan}>0:00</span>
      <audio id='music-card-audio' src={audioSource} ref={audioRef}></audio>
      
    </div>
  );
}

export default Card;
