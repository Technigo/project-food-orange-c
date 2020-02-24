import React, { useEffect, useState } from 'react'
import { Restaurant } from './Restaurant.js'
import './RestaurantList.css'

export const RestaurantList = ({ restaurants, priceLevel, rating }) => {
  const [relevantRestos, setRelevantRestos] = useState(restaurants)

  useEffect(() => {
    const restos = restaurants.filter(resto => {
      if (resto.price_range !== priceLevel) return undefined
      else if (resto.user_rating.aggregate_rating < rating[0] || resto.user_rating.aggregate_rating > rating[1])
        return undefined
      return resto
    })
    setRelevantRestos(restos)
  }, [priceLevel, rating, restaurants])

  return (
    <section>
      {relevantRestos.map((resto, index) => {
        return <Restaurant resto={resto} key={index} />
      })}
    </section>
  )
}
