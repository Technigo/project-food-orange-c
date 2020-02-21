import React, { useEffect, useState } from 'react'

import './RestaurantList.css'

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
    // <TableContainer component={Paper}>
    //   <Table className={classes.table} aria-label='simple table'>
    //     <TableHead>
    //       <TableRow>
    //         <TableCell></TableCell>
    //         <TableCell>Restaurant</TableCell>
    //         <TableCell align='right'>Address</TableCell>
    //         <TableCell align='right'>Price range</TableCell>
    //         <TableCell align='right'>XX</TableCell>
    //         <TableCell align='right'></TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {relevantRestos.map((resto, index) => (
    //         <TableRow key={index}>
    //           <TableCell component='th' scope='row'>
    //             {resto.photos && <img src={resto.photos[0].photo.thumb_url} alt='Restaurant' />}
    //           </TableCell>
    //           <TableCell component='th' scope='row'>
    //             {resto.name}
    //           </TableCell>
    //           <TableCell align='right'>{resto.location.address}</TableCell>
    //           <TableCell align='right'>{resto.price_range}</TableCell>
    //           <TableCell align='right'>{resto.user_rating.aggregate_rating}</TableCell>
    //           <TableCell align='right'>{resto.user_rating.rating_text}</TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
    <section>
      {relevantRestos.map((resto, index) => {
        return (
          <article key={index}>
            <img src={resto.photos[0].photo.url} alt='Restaurant' />
            <div className='top-row'>
              <h3>{resto.name}</h3>
              <div className='tag'>
                <p>{resto.user_rating.aggregate_rating}</p>
                <span className='star'>&#9733;</span>
                <p>({resto.user_rating.votes})</p>
              </div>
            </div>
            <div className='dollarSigns'>{drawDollarSigns(resto.price_range)}</div>
            {renderCuisines(resto.cuisines)}
          </article>
        )
      })}
    </section>
  )
}
