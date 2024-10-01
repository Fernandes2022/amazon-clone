import { cart } from "../../data/cart.js";
import { productCart } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";

export function test(){
 let totalQuantityPrice = 0;
 let deliveryOptionPrice = 0;
 let totalQuantity = 0;
  cart.forEach((items) => {
   const productId = items.productId;
   const deliveryOptionId = items.deliveryId;
   totalQuantity += items.quantity;
   const deliveryOption = getDeliveryOption(deliveryOptionId);
   const productCal = productCart(productId);
   totalQuantityPrice += productCal.priceCents * items.quantity;
   deliveryOptionPrice += deliveryOption.priceCents;
   
  })
  const totalBefore = (totalQuantityPrice / 100).toFixed(2);
  const shippingPrice = (deliveryOptionPrice / 100).toFixed(2);
  const estimatedTax = (totalBefore * 0.1).toFixed(2);
  const orderTotal= (((totalQuantityPrice + deliveryOptionPrice)/100) + (totalBefore * 0.1)).toFixed(2);
  
 
  const paymentSummary = `
<div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${totalQuantity}):</div>
      <div class="payment-summary-money">$${totalBefore}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${shippingPrice}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${totalBefore}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${estimatedTax}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${orderTotal}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  
  `;
 document.querySelector('.payment-summary').innerHTML = paymentSummary;

}