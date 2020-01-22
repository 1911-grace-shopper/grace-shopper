import React from 'react'
import {Carousel} from 'react-responsive-carousel'
import {Card, CardMedia} from '@material-ui/core'

const ImageSlides = ({images, imageFilePath}) => (
  <Carousel>
    {images.map((fileName, index) => (
      <div key={index}>
        <img src={`/images/${imageFilePath}/${fileName}`} />
      </div>
    ))}
  </Carousel>
)

export default ImageSlides
