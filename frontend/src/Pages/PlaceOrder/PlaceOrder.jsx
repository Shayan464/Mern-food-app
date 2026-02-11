import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url, userId } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const OnchangeHandler = (e) => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    let orderItems = [];

    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({
          ...item,
          quantity: cartItems[item._id],
        });
      }
    });

    
    const totalAmount =
      getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2);

    try {
      const response = await axios.post(
        `${url}/api/orders/place`,
        {
          userId, 
          items: orderItems,
          amount: totalAmount,
          address: data,
        },
        {
          headers: { token },
        }
      );

      console.log("Backend response:", response.data);

      if (response.data.orderID) {
        window.location.href = `/order/${response.data.orderID}`;
      }
    } catch (err) {
      console.error("Error placing order:", err);
    }
  };

  return (
    <form className="palce-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            placeholder="First Name"
            name="firstname"
            onChange={OnchangeHandler}
            value={data.firstname}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastname"
            onChange={OnchangeHandler}
            value={data.lastname}
            required
          />
        </div>
        <input
          type="email"
          placeholder="Email address"
          name="email"
          onChange={OnchangeHandler}
          value={data.email}
          required
        />
        <input
          type="text"
          placeholder="Street"
          name="street"
          onChange={OnchangeHandler}
          value={data.street}
          required
        />
        <div className="multi-fields">
          <input
            type="text"
            placeholder="City"
            name="city"
            onChange={OnchangeHandler}
            value={data.city}
            required
          />
          <input
            type="text"
            placeholder="State"
            name="state"
            onChange={OnchangeHandler}
            value={data.state}
            required
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            placeholder="Zip code"
            name="zipcode"
            onChange={OnchangeHandler}
            value={data.zipcode}
            required
          />
          <input
            type="text"
            placeholder="Country"
            name="country"
            onChange={OnchangeHandler}
            value={data.country}
            required
          />
        </div>
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          onChange={OnchangeHandler}
          value={data.phone}
          required
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>

          <div className="cart-total-details-row">
            <div className="label">Subtotal</div>
            <div className="value">${getTotalCartAmount()}</div>
          </div>

          <div className="divider" />

          <div className="cart-total-details-row">
            <div className="label">Delivery Fee</div>
            <div className="value">{getTotalCartAmount() === 0 ? 0 : 2}</div>
          </div>

          <div className="divider" />

          <div className="cart-total-details-row total-strong">
            <div className="label">
              <b>Total</b>
            </div>
            <div className="value">
              <b>
                ${getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2)}
              </b>
            </div>
          </div>
          <button className="proceed-btn" type="submit">
            PROCEED TO Payment
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
