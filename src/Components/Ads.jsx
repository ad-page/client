import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Comments from './Comments';

const Ads = ({filterSelectValue, filterInputValue, adsShowOrder}) => {
    const [ads, setAds] = useState([]);
    const [comments, setComments] = useState({});
    const userData = JSON.parse(localStorage.getItem("userData"))
    let adsCopy = ads

    const getAds = () => {
        axios.get("http://localhost:5000/api/ads").then((res) => setAds(res.data))
      };
    
      useEffect(() => {
        getAds();
      }, []);

    // sorting
    adsShowOrder==="low"?adsCopy.sort((a, b) => a.price - b.price):null
    adsShowOrder==="high"?adsCopy.sort((a, b) => b.price - a.price):null

    const handleAdDelete = (id)=>{

    }
    const handleAdUpdate = (id)=>{

    }

  return (
    <div>
        <h2>{filterSelectValue} Ads</h2>
            {filterSelectValue==="all"?
            <div>
                {adsCopy.map((ad) =>
                filterInputValue===""?
                    <div key={ad._id} className='advert'>
                        {userData?._id===ad.user._id?<button onClick={()=>handleAdUpdate}>Update</button>:null}
                        {userData?._id===ad.user._id||userData?.role==="admin"?<button onClick={()=>handleAdDelete}>Delete</button>:null}
                        <div className='advert_images'>
                        {ad.images.map((image)=><img key={image} src={image} style={{width:"100px"}}/>)}
                        </div>
                        <h2>{ad.name}</h2>
                        <h3>{ad.price}$</h3>
                        <h4>{ad.description}</h4>
                        <h5>{ad.category.name}</h5>
                        <h6>added by {ad.user.username}</h6>
                        <hr />
                        <Comments
                            adId={ad._id}
                            comments={comments[ad._id]}
                            setComments={setComments}
                        />
                    </div>
                :ad.name.toLowerCase().includes(filterInputValue.toLowerCase())||ad.description.toLowerCase().includes(filterInputValue.toLowerCase())?
                    <div key={ad._id} className='advert'>
                        {userData?._id===ad.user._id?<button onClick={()=>handleAdUpdate}>Update</button>:null}
                        {userData?._id===ad.user._id||userData?.role==="admin"?<button onClick={()=>handleAdDelete}>Delete</button>:null}
                        <div className='advert_images'>
                        {ad.images.map((image)=><img key={image} src={image} style={{width:"100px"}}/>)}
                        </div>
                        {console.log(<span>{filterInputValue}</span>)}
                        <h2>{ad.name.replace(filterInputValue, filterInputValue.toUpperCase())}</h2>
                        <h3>{ad.price}$</h3>
                        <h4>{ad.description.replace(filterInputValue, filterInputValue.toUpperCase())}</h4>
                        <h5>{ad.category.name}</h5>
                        <h6>added by {ad.user.username}</h6>
                        <hr />
                        <Comments
                            adId={ad._id}
                            comments={comments[ad._id]}
                            setComments={setComments}
                        />
                    </div>:null
                )}
            </div>:
                <div>
                    {adsCopy.map((ad) => 
                    filterInputValue===""?
                        ad.category.name===filterSelectValue?
                            <div key={ad._id} className='advert'>
                                {userData?._id===ad.user._id?<button onClick={()=>handleAdUpdate}>Update</button>:null}
                                {userData?._id===ad.user._id||userData?.role==="admin"?<button onClick={()=>handleAdDelete}>Delete</button>:null}
                                <div className='advert_images'>
                                {ad.images.map((image)=><img key={image} src={image} style={{width:"100px"}}/>)}
                                </div>
                                <h2>{ad.name}</h2>
                                <h3>{ad.price}$</h3>
                                <h4>{ad.description}</h4>
                                <h5>{ad.category.name}</h5>
                                <h6>added by {ad.user.username}</h6>
                                <hr />
                                <Comments
                                    adId={ad._id}
                                    comments={comments[ad._id]}
                                    setComments={setComments}
                                />
                            </div>
                        :null
                    :ad.name.toLowerCase().includes(filterInputValue.toLowerCase())||ad.description.toLowerCase().includes(filterInputValue.toLowerCase())?
                        ad.category.name===filterSelectValue?
                            <div key={ad._id} className='advert'>
                                {userData?._id===ad.user._id?<button onClick={()=>handleAdUpdate}>Update</button>:null}
                                {userData?._id===ad.user._id||userData?.role==="admin"?<button onClick={()=>handleAdDelete}>Delete</button>:null}
                                <div className='advert_images'>
                                {ad.images.map((image)=><img key={image} src={image} style={{width:"100px"}}/>)}
                                </div>
                                <h2>{ad.name.replace(filterInputValue, filterInputValue.toUpperCase())}</h2>
                                <h3>{ad.price}$</h3>
                                <h4>{ad.description.replace(filterInputValue, filterInputValue.toUpperCase())}</h4>
                                <h5>{ad.category.name}</h5>
                                <h6>added by {ad.user.username}</h6>
                                <hr />
                                <Comments
                                    adId={ad._id}
                                    comments={comments[ad._id]}
                                    setComments={setComments}
                                />
                            </div>
                        :null
                    :null
                    )}
                </div>
            }
    </div>
  )
}

export default Ads