import React, { useState } from 'react'

import './Restaurant.css'

const drawDollarSigns = priceLevel => {
  let dollarSigns = ''
  for (let i = 0; i < priceLevel; i++) {
    dollarSigns += '$'
  }
  return dollarSigns
}

export const renderCuisines = cuisineString => {
  const cuisineList = cuisineString.split(', ')
  let newCuisineString = '\xB7 '
  const stringDivider = ' \xB7 '

  let cuisineAmount = 0
  cuisineList.length < 3 ? (cuisineAmount = cuisineList.length) : (cuisineAmount = 3)
  for (let i = 0; i < cuisineAmount; i++) {
    newCuisineString += cuisineList[i] /* add cuisine item */
    if (!(i === cuisineAmount - 1)) newCuisineString += stringDivider /* do not add divider if at the last index */
  }
  return newCuisineString
}

const starColor = rating => {
  return rating >= 4.5 ? 'star star-yellow' : 'star'
}

export const Restaurant = ({ resto }) => {
  const [visible, setVisible] = useState(false)

  const rating = resto.user_rating.aggregate_rating
  return (
    <article
      onClick={() => {
        setVisible(!visible)
      }}
    >
      <div className='restaurant-short'>
        <img src={resto.featured_image} alt='Restaurant' />
        <div className='top-row'>
          <h3>{resto.name}</h3>
          <div className='tag'>
            <p>{rating}</p>
            <span className={starColor(rating)}>&#9733;</span>
            <p>({resto.user_rating.votes})</p>
          </div>
        </div>
        <div className='dollarSigns'>{drawDollarSigns(resto.price_range)}</div>
        {renderCuisines(resto.cuisines)}
      </div>
      <div className={`restaurant-long ${!visible && 'restaurant-long-hide'}`}>
        <hr />
        <h4>Opening hours</h4>
        <p>{resto.timings}</p>
        <hr />
        <h4>Address</h4>
        <p>{resto.location.address}</p>
      </div>
    </article>
  )
}
