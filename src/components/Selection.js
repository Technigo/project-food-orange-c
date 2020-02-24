import React from 'react'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
// import Button from '@material-ui/core/Button'
import './Selection.css'

export const Selection = ({ priceLevel, setPriceLevel, rating, setRating }) => {
  return (
    <div className='selection'>
      <Typography className='price-level' gutterBottom>
        Price level
      </Typography>
      <Slider
        aria-labelledby='range-slider'
        step={1}
        marks
        min={1}
        max={4}
        value={priceLevel}
        valueLabelDisplay='on'
        onChange={(event, value) => setPriceLevel(value)}
      />
      <Typography className='price-level' gutterBottom>
        Rating
      </Typography>
      <Slider
        aria-labelledby='range-slider'
        step={0.1}
        min={1}
        max={5}
        value={rating}
        valueLabelDisplay='on'
        onChange={(event, value) => setRating(value)}
      />
    </div>
  )
}
