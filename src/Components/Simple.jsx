import React, { useState } from 'react'

const Simple = () => {
    const name = JSON.parse(localStorage.getItem("userData")).username
    const [showCreateAd, setShowCreateAd] = useState(0)
    const [showMyAds, setShowMyAds] = useState(0)
    const [showFavorites, setShowFavorites] = useState(0)
  return (
    <div>
        <h3>Welcome {name}</h3>
        <button onClick={()=>showCreateAd===0?setShowCreateAd(1):setShowCreateAd(0)}>create ad</button>
        <button onClick={()=>showMyAds===0?setShowMyAds(1):setShowMyAds(0)}>my ads</button>
        <button onClick={()=>showFavorites===0?setShowFavorites(1):setShowFavorites(0)}>favorites</button>
        {showCreateAd===1?<div>here goes create app component</div>:null}
        {showMyAds===1?<div>here goes my ads component</div>:null}
        {showFavorites===1?<div>here goes favorites component</div>:null}

    </div>
  )
}

export default Simple