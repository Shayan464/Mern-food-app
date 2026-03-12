import React from 'react';
import './Orders.css';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { assets } from '../../assets/admin_assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrder = async () => {
    const response = await axios.get(`${url}/api/orders/list`);
    if (response.data.data) {
      setOrders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error('Error');
    }
  };

  useEffect(() => {
    fetchAllOrder();
  }, []);

  const statusHandler = async (e, orderId) => {
    const response = await axios.post(url + '/api/orders/status', {
      orderId,
      status: e.target.value,
    });

    if (response.data.success) {
      await fetchAllOrder();
    }
  };

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, idx) => (
          <div key={idx} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, idx) => {
                  if (idx === item.length - 1) {
                    return item.name + ' x ' + item.quantity;
                  } else {
                    return item.name + ' x ' + item.quantity + ', ';
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstname + ' ' + order.address.lastname}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ', '}</p>
                <p>
                  {order.address.city +
                    ', ' +
                    order.address.state +
                    ', ' +
                    order.address.country +
                    ', ' +
                    order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
