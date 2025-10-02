import React from 'react';
import OrderSummaryItem from '../components/OrderSummaryItem/OrderSummaryItem';
import PaymentForm from '../components/PaymentForm/PaymentForm';
import CourseList from '../components/CourseList/CourseList';
import { cartData, recommendedCourses } from '../data/courses';
import './CheckoutPage.css';

const CheckoutPage = () => {
  return (
    // <Header /> and <Footer /> have been removed
    <main className="checkout-page">
      <div className="checkout-layout container">
        <div className="order-summary">
          <h2>Order summary</h2>
          {cartData.items.map(item => (
            <OrderSummaryItem key={item.id} item={item} />
          ))}
        </div>
        <div className="payment-details">
          <PaymentForm summary={cartData} />
        </div>
      </div>
      <CourseList title="You might also like" courses={recommendedCourses} />
    </main>
  );
};

export default CheckoutPage;