import React from 'react'

export default class Confirmation extends React.Component {
  render() {
    console.log('confirmation', this.props)
    return <h3>Thanks for your order!</h3>
  }
}
