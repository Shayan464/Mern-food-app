import React, { useContext, useState, useEffect } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url, token } = useContext(StoreContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Wait for cartItems to load after login
    if (token) {
      setLoading(false);
    }
  }, [cartItems, token]);

  if (loading) {
    return <div className="cart-loading">Loading cart...</div>;
  }

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p className="cross" onClick={() => removeFromCart(item._id)}>
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        {/* LEFT: totals */}
        <div className="cart-total">
          <h2>Cart Totals</h2>

          <div className="cart-total-details-row">
            <div className="label">Subtotal</div>
            <div className="value">${getTotalCartAmount()}</div>
          </div>

          <div className="divider" />

          <div className="cart-total-details-row">
            <div className="label">Delivery Fee</div>
            <div className="value">${getTotalCartAmount() === 0 ? 0 :2}</div>
          </div>
       
          <div className="divider" />

          <div className="cart-total-details-row total-strong">
            <div className="label">
              <b>Total</b>
            </div>
            <div className="value">
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() +2}</b>
            </div>

          </div>
            <button className="proceed-btn" onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>

          <div className="checkout-wrap">
          </div>
        </div>

        {/* RIGHT: promo box (separate) */}
        <aside className="cart-promo">
          <div className="cart-promocode">
            <p>If you have a promo code, enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
