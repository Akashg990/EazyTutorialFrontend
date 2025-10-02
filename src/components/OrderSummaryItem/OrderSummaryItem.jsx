import React from 'react';
import './OrderSummaryItem.css';

const OrderSummaryItem = ({ item }) => {
  return (
    <div className="order-summary-item">
      <img src={item.image} alt={item.title} className="item-image" />
      <div className="item-details">
        <p className="item-title">{item.title}</p>
        <p className="item-author">{item.author}</p>
      </div>
      <p className="item-price">${item.price}</p>
    </div>
  );
};

export default OrderSummaryItem;