import { products } from "./products.js";

export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryId: '1'
  },{
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryId: '2'
  }];
}


export function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function cartFun (productId) {
let matchingItem;

 cart.forEach((items) => {
  if(productId === items.productId){
   matchingItem = items;
  }
 })
 return matchingItem;
}




export function addToCart(productId){
 const matchingItem = cartFun(productId);
 const select = document.querySelector(`.select-${productId}`);
 const selection = Number(select.value);
 
  
  if (matchingItem){
   matchingItem.quantity += selection;
  }else{
   cart.push({
    productId: productId,
    quantity: selection,
    deliveryId: '3'
   });
  }
  
  saveToStorage();
}

export function cartQuantityUpdate (){
  let cartQuantity = 0;
  cart.forEach((items) => {
   cartQuantity += items.quantity;
  })
  document.querySelector('.cart-quantity').innerHTML = cartQuantity;
}

export function removeFromCart (productId) {
    
  
 const newCart = [];
   
   cart.forEach((items) => {

    if (items.productId !== productId){
       newCart.push(items);
     }
   })

   return cart = newCart;
   saveToStorage();
  }

 export function updateDeliveryOption (productId, deliveryId){
    let matchingItem;

 cart.forEach((items) => {
  if(productId === items.productId){
   matchingItem = items;
  }
 })

  matchingItem.deliveryId = deliveryId;
  saveToStorage();
  }