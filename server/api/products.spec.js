const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const productName = 'Biggest Tiny House'

    beforeEach(() => {
      return Product.create({
        name: productName
      })
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products/')
        .expect(200)

      expect(res.body[0].name).to.be.equal(productName)
    })
  })

  describe('/api/products/:productId', () => {
    const productId = 1
    const productName = 'Biggest Tiny House'

    beforeEach(() => {
      return Product.create({
        id: productId,
        name: productName
      })
    })

    it('GET /api/products/:productId', async () => {
      const res = await request(app)
        .get('/api/products/' + productId)
        .expect(200)
    })
  })
}) // end describe('User routes')
