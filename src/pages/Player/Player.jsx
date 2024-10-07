import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams()
  const navigate = useNavigate()
  const [apiData , setApiData] = useState({
    name:'',
    key:'',
    published_at:'',
    typeof:''
  })
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzgyMTdiYWI5ZWRjNWI3ZWY5ZmVkOGI5MmQ1YjNiOCIsIm5iZiI6MTcyNjk4NDM3MC4zMTA5ODQsInN1YiI6IjY2ZWVmZDI1NGE3ZjBiMThiMDI2MGU4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lcReeWfJN2coLds-nrGE_YdV2OBhDI1rOSJhtf75agw'
    }
  };
  
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results[0 ]))
    .catch(err => console.error(err));
  },[])


  return (
    <div className='player'>
        <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}} />
        <iframe src={`https://www.youtube.com/embed/${apiData.key}`} frameborder="0" width='90%' height='90%' title='trailer' frameborder={0}  allowFullScreen></iframe>
        <div className='player-info'>
          <p>{apiData.published_at.slice(0,10)}</p> 
          <p>{apiData.name}</p> 
          <p>{apiData.type}</p> 
        </div>
    </div>
  )
}


export default Player
