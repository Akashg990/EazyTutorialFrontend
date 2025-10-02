import React from 'react';
import './PaymentForm.css';

const PaymentForm = ({ summary }) => {
  return (
    <div className="payment-form">
      <div className="payment-card">
        <h4>Payment method</h4>
        <div className="payment-method-box">
          <span>Mastercard **** 5987</span>
          <a href="#">Change</a>
        </div>
      </div>

      <div className="payment-card">
        <h4>Voucher</h4>
        <div className="voucher-input-group">
          <input type="text" placeholder="$15 OFF" />
          <button>Apply</button>
        </div>
      </div>

      <div className="payment-card summary-card">
        <h4>Summary</h4>
        <div className="summary-row">
          <span>Subtotal</span>
          <span>${summary.subtotal}</span>
        </div>
        <div className="summary-row">
          <span>Discount</span>
          <span>-${summary.discount}</span>
        </div>
        <div className="summary-row">
          <span>Fee</span>
          <span>${summary.fee}</span>
        </div>
        <hr />
        <div className="summary-row total-row">
          <span>Total</span>
          <span>${summary.total}</span>
        </div>
        <button className="btn-proceed">Proceed to payment</button>
      </div>
    </div>
  );
};

export default PaymentForm;