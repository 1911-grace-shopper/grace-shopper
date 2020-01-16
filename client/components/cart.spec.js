import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import {expect} from 'chai'
import {spy} from 'sinon'
import Adapter from 'enzyme-adapter-react-16'
import {Cart} from './cart'

Enzyme.configure({adapter: new Adapter()})

describe('Cart Unit Test:', () => {
  let component, itemsInCart, cartSpy, store, cartInstance

  beforeEach(() => {
    itemsInCart = [
      {
        productId: 12345,
        name: 'tiny house 1',
        description: 'tiny house 1 description...',
        price: 55000050
      },
      {
        productId: 56789,
        name: 'tiny house 2',
        description: 'tiny house 2 description...',
        price: 755000025
      }
    ]

    let mockGetCurrentCart = () => {}

    cartSpy = spy()
    component = shallow(
      <Cart currentCart={itemsInCart} getCurrentCart={mockGetCurrentCart} />
    )
  })

  it('both user and guest can add items into the cart', () => {
    expect(component.find('ul.cartItem')).to.have.lengthOf(2)
    expect(component.find('ul.cartItem li:first-child').text()).to.be.equal(
      '12345'
    )
  })

  it('both user and guest can delete the items in the cart', () => {
    component.find('ul:first-child button').simulate('click')
    expect(component.find('ul.cartItem')).to.have.lengthOf(1)
    expect(component.find('ul.cartItem li:first-child').text()).to.be.equal(
      '56789'
    )
  })
})
