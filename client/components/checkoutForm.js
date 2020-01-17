import React from 'react'
import {Link} from 'react-router-dom'

const Form = props => (
  <form id="checkout_form" onSubmit={props.handleSubmit}>
    <label>
      Recipient Name:
      {!props.recipientName &&
        props.warningMessage && (
          <span className="warning">{props.warningMessage}</span>
        )}
      <input
        type="text"
        name="recipientName"
        onChange={props.handleChange}
        value={props.recipientName}
      />
    </label>
    <h3>Shipping Address</h3>
    <label>
      Line 1:
      <input
        type="text"
        name="shippingAddressLineOne"
        onChange={props.handleChange}
        value={props.shippingAddressLineOne}
      />
    </label>
    <label>
      Line 2:
      <input
        type="text"
        name="shippingAddressLineTwo"
        onChange={props.handleChange}
        value={props.shippingAddressLineTwo}
      />
    </label>
    <label>
      City:
      <input
        type="text"
        name="shippingCity"
        onChange={props.handleChange}
        value={props.shippingCity}
      />
    </label>
    <label>
      State:
      <input
        type="text"
        name="shippingState"
        onChange={props.handleChange}
        value={props.shippingState}
      />
    </label>
    <label>
      Zip:
      <input
        type="number"
        name="shippingAddressZipCode"
        onChange={props.handleChange}
        value={props.shippingAddressZipCode}
      />
    </label>
    <label>
      Delivery Method:
      <select
        name="deliveryMethod"
        value={props.deliveryMethod}
        onChange={props.handleChange}
      >
        <option>Please Select</option>
        <option value="Delivery">Delivery</option>
        <option value="Pick-Up">Pick-Up</option>
      </select>
    </label>
    <label>Total: {props.total}</label>
    {!props.isComplete() ? (
      <span>Please Enter Required Fields</span>
    ) : (
      <Link
        type="submit"
        disabled={!props.recipientName}
        to={{pathname: '/confirmation'}}
        onClick={e => props.handleSubmit(e)}
      >
        Submit Order
      </Link>
    )}
  </form>
)

export default Form
