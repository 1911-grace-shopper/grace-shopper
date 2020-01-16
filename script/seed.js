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
      name: 'Kubrick',
      price: 12000000,
      length: 24,
      width: 8.5,
      beds: 4,
      description:
        'This 24 foot modern tiny house embraces minimalism and shies away from any excessive ornamentation. The clean lines and ordered flow of the tiny house make it an ideal place to retreat from noise and busyness.',
      style: 'modern',
      quantity: 12
    }),
    Product.create({
      name: 'Lykkee',
      price: 0,
      length: 24,
      width: 8.5,
      beds: 4,
      description:
        'This 24 ft tiny house on wheels features a cozy interior inspired by Danish design and the Hygge movement. The layout is spacious with the storage stairs inset into the loft space for a more open plan. The loft fits a full size bed but it could also fit a queen size bed even with the inset stairs. The gray color on the interior walls has a warm undertone as does the gray glass subway tile kitchen back splash. Cooler tones are contrasted with the custom blue cabinets.',
      style: 'cabin',
      quantity: 5
    }),
    Product.create({
      name: 'Lupine',
      price: 99000000,
      length: 32,
      width: 8.5,
      beds: 5,
      description:
        'The Lupine is a 32 ft tiny house on a gooseneck trailer. The Lupine is going to a home with a great view looking out over a cliff. The front entrance to the house only has one window and the no-light door. But then you walk inside the first thing you notice is the window wall and the great view. You can even enjoy the view from the custom tile shower. In gooseneck tiny homes, the area just beyond the bedroom over the gooseneck of the trailer often has a closed off storage loft. Instead of closing it off we built open shelving to make the house feel more spacious. All of these features were collaborate design with the owners for this custom gooseneck tiny house.',
      style: 'farmhouse',
      quantity: 3
    }),
    Product.create({
      name: 'Noah',
      price: 69000000,
      length: 28,
      width: 8.5,
      beds: 5,
      description: `The Noah is a 28 ft tiny home that has a modern farmhouse feel and boasts a first floor bedroom that fits a queen bed. Natural wood accents give the home an inviting feel including warm cedar exterior siding and natural tung oiled poplar ship lap on the interior.  At 330 square feet, The Noah blends form and function to create a tiny home that is as beautiful and timeless as it is spacious and livable.`,
      style: 'farmhouse',
      quantity: 3
    }),
    Product.create({
      name: 'Noah',
      price: 89500000,
      length: 26,
      width: 8.5,
      beds: 2,
      description: `The Silhouette is a 26' x 8.5' tiny house that balances rustic charm and industrial chic seamlessly. This home was designed with the panoramic views of Vermont in mind. Two massive fixed windows in the living area and an oversized round window in the shower area will make you feel like you're living as close to the great outdoors as possible.`,
      style: 'industrial',
      quantity: 3
    }),
    Product.create({
      name: 'Noah',
      price: 89500000,
      length: 26,
      width: 8.5,
      beds: 2,
      description: `The Silhouette is a 26' x 8.5' tiny house that balances rustic charm and industrial chic seamlessly. This home was designed with the panoramic views of Vermont in mind. Two massive fixed windows in the living area and an oversized round window in the shower area will make you feel like you're living as close to the great outdoors as possible.`,
      style: 'industrial',
      quantity: 3
    }),
    Product.create({
      name: 'Acadia',
      price: 56500000,
      length: 24,
      width: 8.5,
      beds: 2,
      description: `The Acadia takes inspiration from the rugged beauty of the national park in Maine that is it's namesake. This 24' tiny home shares some rustic DNA with our original Wind River Bungalow, but with a modern twist.`,
      style: 'farmhouse',
      quantity: 3
    }),
    Product.create({
      name: 'Big Whimsy',
      price: 56500000,
      length: 30,
      width: 10,
      beds: 6,
      description: `This 30 foot tiny home is features two separate loft bedrooms, an office space with a built in desk, a spacious living room, and a walk in closet on the main level. The inviting interior makes you feel at home the moment you step through the door with its whimsical colors, bright accents, and unique features, including the custom made lily pad spiral stairs that take you up to the loft and a 3,000+ copper penny kitchen countertop.`,
      style: 'modern',
      quantity: 5
    }),
    Product.create({
      name: 'Monocle',
      price: 84500000,
      length: 24,
      width: 10,
      beds: 6,
      description: `This 24' tiny home is built 10' wide to accommodate a bed on the main level while still maintaining a spacious feel. The bathroom was one of the main focuses on this build and features a  floating sink, recessed mirror, composting toilet, and tile wet bath compete with both hand-held and overhead rain shower heads.   The home also features a custom his/hers pull out closet that offers 8 feet of total hanging space with lots of shelving space underneath, all illuminated by LED lights.  The clean lines, mix of white and warm tones, and a few rustic touches make this home truly unique.`,
      style: 'modern',
      quantity: 5
    }),
    Product.create({
      name: `Nomad's nest`,
      price: 86000000,
      length: 30,
      width: 10,
      beds: 5,
      description: `The Nomad's Nest was designed with wanderlust in mind, a rustic exterior and bohemian vibe. This home was built on a 30 foot gooseneck trailer with custom features galore, including an inset horse trough tub with slate tile surround, mixed live-edge and concrete counters with integral concrete sink, raised bed platform with storage, and premium appliances.`,
      style: 'rustic,farmhouse',
      quantity: 5
    }),
    Product.create({
      name: `Wind River Bungalow`,
      price: 86000000,
      length: 30,
      width: 10,
      beds: 5,
      description: `This rustic, cedar cabin in the woods is where it all started. The 18 foot tiny house was built with oak cabinets and storage, a concrete counter with integral sink, and cedar rain screen siding, this home continues to be one of our favorites.`,
      style: 'rustic,cabin',
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
