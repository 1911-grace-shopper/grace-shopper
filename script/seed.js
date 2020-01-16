'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Product} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const products = await Promise.all([
    Product.create({
      name: 'house1',
      price: 100000,
      length: 17,
      width: 4.5,
      beds: 1,
      bathrooms: 1,
      description: 'the farm tiny house...',
      style: 'farmhouse',
      quantity: 3
    }),
    Product.create({
      name: 'house2',
      price: 103400,
      length: 15,
      width: 4.5,
      beds: 1,
      bathrooms: 1,
      description: 'the modern tiny house...',
      style: 'modern',
      quantity: 12
    }),
    Product.create({
      name: 'house3',
      price: 940075,
      length: 23,
      width: 4.5,
      beds: 2,
      bathrooms: 1,
      description: 'the victorian tiny house...',
      style: 'victorian',
      quantity: 5
    })
  ])

  console.log(`ed ${users.length} users`)
  console.log(`ed ${products.length} products`)
  console.log(`ed successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
