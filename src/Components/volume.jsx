import { useEffect, useState, useRef } from "react";

function Volume({volume, setVolume}){
    return(
        <input type="range" id="volume-bar" step={0.01} min="0" max="1" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))}/>
    );
}

export default Volume;