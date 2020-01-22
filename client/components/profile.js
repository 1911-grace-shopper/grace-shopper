import React from 'react'
import {connect} from 'react-redux'
import displayDollars from './helper'
import {getPastOrdersFromServer} from '../store/orderHistory'

class Profile extends React.Component {
  componentDidMount() {
    this.props.getPastOrders(this.props.user.id)
  }

  render() {
    return (
      <div>
        <h2>Welcome, {this.props.user.email}</h2>

        <h3>Your Order History</h3>
        {this.props.orders.map(order => {
          return (
            <ul key={order.id} className="order">
              <li>Order Number: {order.id}</li>
              <li>Items:</li>
              {order.products.map(prod => {
                return (
                  <ul key={prod.id}>
                    <img src={`/images/${prod.imageUrl}`} />
                    <li>Product Name: {prod.name}</li>
                    <li>
                      Price:{displayDollars(prod.orderDetails.priceAtPurchase)}
                    </li>
                    <li>Quantity:{prod.orderDetails.count}</li>
                  </ul>
                )
              })}
              <li>Total: {displayDollars(order.total)}</li>
            </ul>
          )
        })}
        <ul />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orders: state.orders.orders,
  user: state.user
})

const mapDispatchToProps = dispatch => {
  return {
    getPastOrders: userId => dispatch(getPastOrdersFromServer(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
