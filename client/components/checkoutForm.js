import React from 'react'
import {Link} from 'react-router-dom'
import Confirmation from './confirmation'
import displayDollars from './helper'

const Form = props => (
  <form id="checkout_form" onSubmit={props.handleSubmit}>
    <label>
      Recipient Name:
      <input
        type="text"
        name="recipientName"
        onChange={props.handleChange}
        value={props.recipientName}
      />
      {!props.recipientName &&
        props.warningMessage && (
          <span className="warning">{props.warningMessage}</span>
        )}
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
      {!props.shippingAddressLineOne &&
        props.warningMessage && (
          <span className="warning">{props.warningMessage}</span>
        )}
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
      {!props.shippingCity &&
        props.warningMessage && (
          <span className="warning">{props.warningMessage}</span>
        )}
    </label>
    <label>
      State:
      <input
        type="text"
        name="shippingState"
        onChange={props.handleChange}
        value={props.shippingState}
      />
      {!props.shippingState &&
        props.warningMessage && (
          <span className="warning">{props.warningMessage}</span>
        )}
    </label>
    <label>
      Zip:
      <input
        type="number"
        name="shippingAddressZipCode"
        onChange={props.handleChange}
        value={props.shippingAddressZipCode}
      />
      {!props.shippingAddressZipCode &&
        props.warningMessage && (
          <span className="warning">{props.warningMessage}</span>
        )}
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
    <label>Total: {displayDollars(props.total)}</label>
    {!props.isComplete() ? (
      <span>Please Enter Required(*) Fields</span>
    ) : (
      <Link
        type="submit"
        disabled={!props.recipientName}
        to="/confirmation"
        onClick={e => props.handleSubmit(e)}
      >
        Submit Order
      </Link>
    )}
  </form>
)

export default Form
