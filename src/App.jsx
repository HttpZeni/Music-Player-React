import React, { useState } from 'react';
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

  const [musicData, setMusicData] = useState([
    { id: 0, audioSource: boysdontcryAudio, cover: boysdontcryImg, songTitle: "Boys Don't Cry", songAuthor: "The Cure", spotifyLink: "https://open.spotify.com/intl-de/track/1QFh8OH1e78dGd3VyJZCAC?si=c27d54a5c3374f16"},
    { id: 1, audioSource: hellojulietAudio, cover: hellojulietImg, songTitle: "Hello Juliet", songAuthor: "Clarion", spotifyLink: "https://open.spotify.com/intl-de/track/6DBP4fIvKFRIshJrZ0wSje?si=8ec37bf8735e4cda"},
    //{ id: 2, audioSource: null, cover: null, songTitle: "Coming soon", songAuthor: "?", spotifyLink: "" }
  ])

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    centerMode: true, 
    centerPadding: "0px",
  };

  return (
    <>
      <div className='Container'>
        <Slider {...settings}>
          {musicData.map((song) => (
            <Card 
              key={song.id}
              volume={volume} 
              audioSource={song.audioSource}
              cover={song.cover}
              songTitle={song.songTitle}
              songAuthor={song.songAuthor}
              spotifyLink={song.spotifyLink}
            />    
          ))}
          
        </Slider>
      </div>
      <AddCard musicData={musicData} setMusicData={setMusicData}/>
      <Volume volume={volume} setVolume={setVolume}/>
    </>
  )
}



export default App
