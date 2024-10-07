import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import card_data from '../../assets/cards/Cards_data'
import {Link } from 'react-router-dom'



const TitleCards = ({title , category}) => {

  const cardsRef = useRef()
  const [apiData , setApiData] = useState([])

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzgyMTdiYWI5ZWRjNWI3ZWY5ZmVkOGI5MmQ1YjNiOCIsIm5iZiI6MTcyNjkzODkyOC4wODMwNjMsInN1YiI6IjY2ZWVmZDI1NGE3ZjBiMThiMDI2MGU4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8O-V34AHqp12mO4_pzg5xLk12pe291RBujmy56lr6wg'
    }
  };
  


  const handleWheel = (event) =>{
    event.preventDefault()
    cardsRef.current.scrollLeft += event.deltaY
  }

  useEffect(()=>{
      fetch(`https://api.themoviedb.org/3/movie/${category?category:'now_playing'}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));
    cardsRef.current.addEventListener('wheel',handleWheel)

  },[])


  return (
    <div className='titlecards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card , index)=>{
          return <Link to={`/player/${card.id}`} className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
