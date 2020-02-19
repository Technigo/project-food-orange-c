import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import './App.css'

/* Zomato API stuff */
const apiKey = process.env.REACT_APP_API_KEY
const baseUrl = 'https://developers.zomato.com/api/v2.1'

/* Query stuff that could go into a query selection form */
const COUNT = 10

const useStyles = makeStyles({
  table: {
    minWidth: 400
  }
})

const populateQuery = params => {
  let query = '?'
  Object.keys(params).forEach((item, index) => {
    switch (item) {
      case 'count':
        query += `count=${params.count}`
        break
      case 'city':
        query += `city=${params.city}`
        break
      default:
        throw new Error(`invalid param:${item}`)
    }
    if (index !== Object.keys(params).length - 1) query += '&'
  })
  return query
}

const App = () => {
  // const [queryString, setQueryString] = useState('')
  const [restaurants, setRestaurants] = useState([])

  const classes = useStyles()

  useEffect(() => {
    const queryString = populateQuery({ count: COUNT })
    const url = `${baseUrl}/search${queryString}`
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
      <h2>Resturant stuff</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Restaurant</TableCell>
              <TableCell align='right'>Address</TableCell>
              <TableCell align='right'>Price range</TableCell>
              <TableCell align='right'>XX</TableCell>
              <TableCell align='right'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurants.map((resto, index) => (
              <TableRow key={index}>
                <TableCell component='th' scope='row'>
                  {resto.photos && <img src={resto.photos[0].photo.thumb_url} alt='Restaurant image' />}
                </TableCell>
                <TableCell component='th' scope='row'>
                  {resto.name}
                </TableCell>
                <TableCell align='right'>{resto.location.address}</TableCell>
                <TableCell align='right'>{resto.price_range}</TableCell>
                <TableCell align='right'>{resto.user_rating.aggregate_rating}</TableCell>
                <TableCell align='right'>{resto.user_rating.rating_text}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default App
