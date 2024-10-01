import { productCart } from "/../data/products.js";
import { cart, removeFromCart, saveToStorage, updateDeliveryOption } from "/../data/cart.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions, getDeliveryOption } from "/../data/deliveryOptions.js";
import { test } from "./paymentSummary.js";

export function checkoutHTML() {

  

 cartQuantityUpdate();

 function cartQuantityUpdate (){
  let cartQuantity = 0;
  cart.forEach((items) => {
   cartQuantity += items.quantity;
  })
  document.querySelector('.js-home-link').innerHTML = `${cartQuantity} items`;
}
 
 
  let checkoutPage = '';

  cart.forEach((items) => {
   const productId = items.productId;
   const matchingItem = productCart(productId);
   const deliveryOptionId = items.deliveryId;
   const deliveryOption = getDeliveryOption(deliveryOptionId);
    console.log(items);
  
   const today = dayjs();
   const delivery = today.add(deliveryOption.days, 'days');
   const deliveryDate = delivery.format('dddd, MMMM D');

    checkoutPage += `

<div class="cart-item-container cart-item-${matchingItem.id}" data-product-id="${matchingItem.id}">
<div class="delivery-date">
  Delivery date: ${deliveryDate}
</div>

<div class="cart-item-details-grid">
  <img class="product-image"
    src="${matchingItem.image}">

  <div class="cart-item-details">
    <div class="product-name">
      ${matchingItem.name}
    </div>
    <div class="product-price">
      $${(matchingItem.priceCents / 100).toFixed(2)}
    </div>
    <div class="product-quantity">
      <span>
        Quantity: <span class="quantity-label quantity-label-${matchingItem.id}" data-product-id="${matchingItem.id}">${items.quantity}</span>
      </span>
      <span class="update-quantity-link link-primary" data-product-id="${matchingItem.id}">
        Update
      </span>
      <div class="link-div link-div-${matchingItem.id}">
       <input type="number" class="link-input link-input-${matchingItem.id}" data-product-id="${matchingItem.id}">
       <span class="link-primary link-save link-save-${matchingItem.id}" data-product-id="${matchingItem.id}">Save</span> 
      </div>
      <span class="delete-quantity-link link-primary js-delete" data-product-id="${matchingItem.id}">
        Delete
      </span>
    </div>
  </div>

  <div class="delivery-options">
    <div class="delivery-options-title">
      Choose a delivery option:
    </div>
    ${heyLove(items, matchingItem)}
  </div>
</div>
</div>
    `;
  })

  document.querySelector('.order-summary').innerHTML = checkoutPage;


  function heyLove(items, matchingItem){
    let deliveryOptionPage = '';

    deliveryOptions.forEach((deliveryOption) => {
      
      
      

      const today = dayjs();
      const delivery = today.add(deliveryOption.days, 'days');
      const deliveryDate = delivery.format('dddd, MMMM D');


      const deliveryPrice = deliveryOption.priceCents === 0
      ? 'FREE'
      : `$${(deliveryOption.priceCents / 100).toFixed(2)}`
      const isChecked = deliveryOption.id === items.deliveryId;
      

      deliveryOptionPage += `
      <div class="delivery-option" data-product-id="${matchingItem.id}" data-delivery-id="${deliveryOption.id}">
      <input type="radio" ${isChecked ? 'checked' : ''}
        class="delivery-option-input" name="delivery-${matchingItem.id}"
        >
      <div>
        <div class="delivery-option-date">
          ${deliveryDate}
        </div>
        <div class="delivery-option-price">
          ${deliveryPrice} Shipping
        </div>
      </div>
    </div>
      `;
    })
    test();
    return deliveryOptionPage;
  }

  document.querySelectorAll('.js-delete').
  forEach((deButton) => {
   deButton.addEventListener('click', () => {
    const productId = deButton.dataset.productId;
    
    document.querySelector(`.cart-item-${productId}`).remove();
    removeFromCart(productId);
    cartQuantityUpdate();
    saveToStorage();
    test();
   })
  })


  document.querySelectorAll('.update-quantity-link').
  forEach((update) => {
   update.addEventListener('click', () => {
    const productId = update.dataset.productId;
    
    const divShow = document.querySelector(`.link-div-${productId}`);
     divShow.classList.add('divShow');

     document.body.addEventListener('keydown', (event) => {
      if(event.key === 'Enter'){
        divShow.classList.remove('divShow');
    const inputIn = document.querySelector(`.link-input-${productId}`);
    const innerInput = Number(inputIn.value);
      

      cart.forEach((items) => {
        if(items.productId === productId){
          items.quantity += innerInput;
          document.querySelector(`.quantity-label-${productId}`).innerHTML= items.quantity;
     
        }
      })

    cartQuantityUpdate();
     
      saveToStorage();

      

     inputIn.value =  ''; 
      }

      

     })
     
     saveToCart(divShow);
     test();
   })
   
  })


  function saveToCart (divShow) {
   document.querySelectorAll('.link-save').
   forEach((save) => {
    save.addEventListener('click',() => {
     const productId = save.dataset.productId;
     divShow.classList.remove('divShow');
    const inputIn = document.querySelector(`.link-input-${productId}`);
    const innerInput = Number(inputIn.value);
      

      cart.forEach((items) => {
        if(items.productId === productId){
          items.quantity += innerInput;
          document.querySelector(`.quantity-label-${productId}`).innerHTML= items.quantity;
     
        }
      })

    cartQuantityUpdate();
     
      saveToStorage();

      

      
     cart.forEach((items) => {
      if(items.productId === productId){
        if(items.quantity <= 0){
          document.querySelector(`.cart-item-${productId}`).remove();
          removeFromCart(productId);
          cartQuantityUpdate();
          saveToStorage();
        }
      } 
    })
    inputIn.value =  '';
    test();
    })
   })
  }


  document.querySelectorAll('.delivery-option').
  forEach((deliveryOp) => {
    deliveryOp.addEventListener('click', () => {
      const {productId, deliveryId} = deliveryOp.dataset;
      updateDeliveryOption(productId, deliveryId);
      checkoutHTML();
    })
  })
  
}
