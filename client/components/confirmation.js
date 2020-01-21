import React from 'react'
import {connect} from 'react-redux'
import {getConfirmedOrder} from '../store/confirmationReducer'

class Confirmation extends React.Component {
  componentDidMount() {
    // this.props.onLoadConfirmedOrder()
    const {myOrder} = this.props.match.params
    this.props.getConfirmedOrder(myOrder)
  }

  render() {
    console.log('confirmation', this.props.match.params)
    return <h3>Thanks for your order!</h3>
  }
}

const mapDispatchToProps = dispatch => ({
  getConfirmedOrder: order => dispatch(getConfirmedOrder(order))
})

export default connect(null, mapDispatchToProps)(Confirmation)
