import React, { useState, useEffect } from 'react'
import './App.css'

import { RestaurantList } from './components/RestaurantList.js'
import { Selection } from './components/Selection.js'

/* Zomato API stuff */
const apiKey = process.env.REACT_APP_API_KEY
const baseUrl = 'https://developers.zomato.com/api/v2.1'

const App = () => {
  const [restaurants, setRestaurants] = useState([])

  const [priceLevel, setPriceLevel] = useState(3)
  const [rating, setRating] = useState([1, 5])

  useEffect(() => {
    const url = `${baseUrl}/search`
    console.log(url)
    fetch(url, {
      headers: {
        'user-key': apiKey
      }
    })
      .then(res => res.json())
      .then(json => {
        console.log(json.restaurants)
        const restaurants = json.restaurants.map(item => item.restaurant)
        setRestaurants(restaurants)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className='App'>
      <h2>Restaurant stuff</h2>
      <Selection priceLevel={priceLevel} setPriceLevel={setPriceLevel} rating={rating} setRating={setRating} />
      <RestaurantList restaurants={restaurants} priceLevel={priceLevel} rating={rating} />
    </div>
  )
}

export default App
