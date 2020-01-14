import React from 'react'

const Cart = () => {
  let items = [
    {productId: 123, name: 'home1', price: 9979.0, count: 1},
    {productId: 456, name: 'house2', price: 7999.0, count: 2}
  ]
  sessionStorage.setItem('cart', JSON.stringify(items))
  const itemsInCart = JSON.parse(sessionStorage.getItem('cart'))
  let total = 0
  return (
    <div>
      {itemsInCart.map(item => {
        total += item.price
        return (
          <ul key={item.productId}>
            <li>{item.productId}</li>
            <li>{item.name}</li>
            <li>${item.price}</li>
            <li>Quantity:{item.count}</li>
          </ul>
        )
      })}
      <div>subtotal:{total}</div>
    </div>
  )
}

export default Cart
