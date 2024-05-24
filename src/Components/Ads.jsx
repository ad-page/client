import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Comments from './Comments';

const Ads = ({filterSelectValue, filterInputValue}) => {
    const [ads, setAds] = useState([]);
    const [comments, setComments] = useState({});
    const adsCopy = ads

    const getAds = () => {
        axios.get("http://localhost:5000/api/ads").then((res) => setAds(res.data))
      };
    
      useEffect(() => {
        getAds();
      }, []);

    //   ad.name.includes(filterInputValue)||ad.description.includes(filterInputValue)?

  return (
    <div>
        <h2>{filterSelectValue} Ads</h2>
            {filterSelectValue==="all"?
            <div>
                {ads.map((ad) =>
                filterInputValue===""?
                    <div key={ad._id} className='advert'>
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
                    </div>:null
                )}
            </div>:
                <div>
                    {ads.map((ad) => 
                    filterInputValue===""?
                        ad.category.name===filterSelectValue?
                            <div key={ad._id} className='advert'>
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
                    :null
                    )}
                </div>
            }
    </div>
  )
}

export default Ads