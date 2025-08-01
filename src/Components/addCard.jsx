import { useState } from "react";

function AddCard({ musicData, setMusicData }){
  const [visible, setVisible] = useState(false);
  const [songName, setSongName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [spotifyLink, setSpotifyLink] = useState("");
  const [songFile, setSongFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

  function addSong(){
    setVisible(!visible);
  }

  function Submit(e){
    
    e.preventDefault();

    const newSong = {
      id: musicData.length,
      songTitle: songName,
      songAuthor: authorName,
      cover: coverFile ? URL.createObjectURL(coverFile) : null,
      audioSource: songFile ? URL.createObjectURL(songFile) : null,
      spotifyLink: spotifyLink
    };

    setMusicData([...musicData, newSong]);
    setVisible(false);
  }


  return (
    <>
      <div className="addCard">
        <button className="addCard-Button" onClick={addSong}>+</button>
      </div>
      {visible && (
        <div className="addCardBox">
          <form onSubmit={Submit}>
            <label>
              <span>Select Cover :</span> 
              <input type="file" onChange={e => setCoverFile(e.target.files[0])} />
            </label>
            <label>
              <span>Select Song :</span>
              <input type="file" onChange={e => setSongFile(e.target.files[0])} />
            </label>
            <label>
              <input type="text" placeholder="Spotify Link" value={spotifyLink} onChange={e => setSpotifyLink(e.target.value)} />
            </label>
            <label>
              <input  type="text"  placeholder="Song Name"  value={songName}  onChange={e => setSongName(e.target.value)}
              />
            </label>
            <label>
              <input  type="text"  placeholder="Author Name"  value={authorName}  onChange={e => setAuthorName(e.target.value)}
              />
            </label>
            <button type="submit">submit</button>
          </form>
        </div>
      )}
    </>
  );
}

export default AddCard;