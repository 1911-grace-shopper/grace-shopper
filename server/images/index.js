const path = require('path')
const fs = require('fs')
const router = require('express').Router()
module.exports = router

// function getImages(dirname) {
//   fs.readdir(path.join(__dirname, '../..', `public/images/${dirname}`), (err, files) => {
//     if (err) {
//       console.log('Unable to scan directory: ' + err)
//       throw err
//     }
//     if (files) {
//       let images = []
//       files.forEach(file => {
//         images.push(file)
//       })
//       console.log(images)
//       return images
//     }
//   })
// }

router.get('/:productName', async (req, res, next) => {
  try {
    // get image file names from file directory

    const productName = req.params.productName

    fs.readdir(
      path.join(__dirname, '../..', `public/images/${productName}`),
      (err, files) => {
        if (err) {
          console.log('Unable to scan directory: ' + err)
          next(err)
        }
        if (files) {
          let images = []
          files.forEach(file => {
            if (file === 'main.jpg') images.unshift(file)
            else images.push(file)
          })
          res.send(images)
        }
      }
    )
  } catch (err) {
    next(err)
  }
})
