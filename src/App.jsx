import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import boysdontcryImg from './assets/Images/Boys-Dont-Cry.jpg'
import hellojulietImg from './assets/Images/HelloJuliet.jpg'
import boysdontcryAudio from './assets/Songs/Boys Dont Cry.mp3'
import hellojulietAudio from './assets/Songs/Hello Juliet.mp3'
import Card from "./Components/card"
import Volume from './Components/volume.jsx';
import AddCard from './Components/addCard.jsx';

function App() {

  const [volume, setVolume] = useState(0.5);

  const [musicData, setMusicData] = useState(() => {
    const saved = localStorage.getItem("musicData");
    return saved ? JSON.parse(saved) : [
    { id: 0, audioSource: boysdontcryAudio, cover: boysdontcryImg, songTitle: "Boys Don't Cry", songAuthor: "The Cure", spotifyLink: "https://open.spotify.com/intl-de/track/1QFh8OH1e78dGd3VyJZCAC?si=c27d54a5c3374f16"},
    { id: 1, audioSource: hellojulietAudio, cover: hellojulietImg, songTitle: "Hello Juliet", songAuthor: "Clarion", spotifyLink: "https://open.spotify.com/intl-de/track/6DBP4fIvKFRIshJrZ0wSje?si=8ec37bf8735e4cda"},
    //{ id: 2, audioSource: null, cover: null, songTitle: "", songAuthor: "", spotifyLink: "" }
    ]
  })

  useEffect(() => {
    localStorage.setItem("musicData", JSON.stringify(musicData));
  }, [musicData])

  function handleDelete(idToDelete) {
    if (idToDelete === 0 || idToDelete === 1) {
      return;
    }
    setMusicData(prev => prev.filter(song => song.id !== idToDelete));
  }

  useEffect(() => {
    const defaults = [
      { id: 0, audioSource: boysdontcryAudio, cover: boysdontcryImg, songTitle: "Boys Don't Cry", songAuthor: "The Cure", spotifyLink: "https://open.spotify.com/intl-de/track/1QFh8OH1e78dGd3VyJZCAC?si=c27d54a5c3374f16"},
      { id: 1, audioSource: hellojulietAudio, cover: hellojulietImg, songTitle: "Hello Juliet", songAuthor: "Clarion", spotifyLink: "https://open.spotify.com/intl-de/track/6DBP4fIvKFRIshJrZ0wSje?si=8ec37bf8735e4cda"},
    ];

    const has0 = musicData.some(song => song.id === 0);
    const has1 = musicData.some(song => song.id === 1);

    let fixed = [...musicData];
    if (!has0) fixed.unshift(defaults[0]);
    if (!has1) fixed.unshift(defaults[1]);

    if (fixed.length !== musicData.length) {
      setMusicData(fixed);
    }

    localStorage.setItem("musicData", JSON.stringify(musicData));
  }, [musicData]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    centerMode: true,
    centerPadding: "0px",
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />
  };

  function CustomNextArrow({ onClick }) {
    return (
      <button className="custom-next" onClick={onClick}>
        {">"}
      </button>
    );
  }

  function CustomPrevArrow({ onClick }) {
    return (
      <button className="custom-prev" onClick={onClick}>
        {"<"}
      </button>
    );
  }

  return (
    <>
      <div className='Container'>
        <Slider {...settings}>
          {musicData.map((song) => (
            <Card 
              key={song.id}
              id={song.id}
              volume={volume} 
              audioSource={song.audioSource}
              cover={song.cover}
              songTitle={song.songTitle}
              songAuthor={song.songAuthor}
              spotifyLink={song.spotifyLink}
              onDelete={handleDelete}
            />
          ))}             
        <AddCard musicData={musicData} setMusicData={setMusicData}/>
        </Slider>  
      </div>
      <Volume volume={volume} setVolume={setVolume}/>
    </>
  )
}



export default App
