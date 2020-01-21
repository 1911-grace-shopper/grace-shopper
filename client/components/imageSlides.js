import React from 'react'
import {Carousel} from 'react-responsive-carousel'

const ImageSlides = ({images, imageFilePath}) => (
  // return (
  <Carousel>
    {images.map((fileName, index) => (
      <div key={index}>
        <img src={`/images/${imageFilePath}/${fileName}`} />
      </div>
    ))}
  </Carousel>
  // )
)

export default ImageSlides
