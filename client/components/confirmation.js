import React from 'react'

export default class Confirmation extends React.Component {
  componentDidMount() {
    sessionStorage.clear()
  }

  render() {
    return <h3>Thanks for your order!</h3>
  }
}
