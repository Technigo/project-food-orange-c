import React, { useState, useEffect } from 'react'
import './App.css'

const API_KEY = process.env.REACT_APP_API_KEY
const BASE_URL = 'https://developers.zomato.com/api/v2.1'

const populateQuery = async (query, ...rest) => {
  query = '?q='
  return query
}

const App = () => {
  const [queryString, setQueryString] = useState('')
  useEffect(() => {
    populateQuery(queryString)
    fetch(`${BASE_URL}/search`, {
      headers: {
        'user-key': API_KEY
      }
    })
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.log(err))
  }, [])
  return (
    <div className='App'>
      <h2>Resturant stuff</h2>
    </div>
  )
}

export default App
