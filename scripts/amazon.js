import {products} from '../data/products.js';
import { addToCart, cartQuantityUpdate, saveToStorage} from '../data/cart.js';




cartQuantityUpdate();

let amazonPage = '';

products.forEach((product) => {

    // const productId = product.id;
    

   amazonPage += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.stars}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents/100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="select-${product.id}" >
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart added-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
   `;
})

document.querySelector('.products-grid').innerHTML = amazonPage;

document.querySelectorAll('.add-to-cart-button').
forEach((button) => {
 button.addEventListener('click', () => {
  const productId = button.dataset.productId;
  const adds = document.querySelector(`.added-${productId}`);
  
  setTimeout(() => {
   adds.classList.add('added');
  }, 500);

  setTimeout(() => {
   adds.classList.remove('added');
  }, 3000);

  addToCart(productId);
  cartQuantityUpdate();

  saveToStorage();
  
 });
 
});