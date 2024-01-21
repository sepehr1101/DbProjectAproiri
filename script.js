const btnCart = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const btnClose = document.querySelector('#cart-close');

btnCart.addEventListener('click', () => {
  cart.classList.add('cart-active');
});

btnClose.addEventListener('click', () => {
  cart.classList.remove('cart-active');
});

document.addEventListener('DOMContentLoaded', loadFood);

function loadFood() {
  loadContent();
}

function loadContent() {
  //Remove Food Items  From Cart
  let btnRemove = document.querySelectorAll('.cart-remove');
  btnRemove.forEach((btn) => {
    btn.addEventListener('click', removeItem);
  });

  //Product Item Change Event
  let qtyElements = document.querySelectorAll('.cart-quantity');
  qtyElements.forEach((input) => {
    input.addEventListener('change', changeQty);
  });

  //Product Cart

  let cartBtns = document.querySelectorAll('.add-cart');
  cartBtns.forEach((btn) => {
    btn.addEventListener('click', addCart);
  });

  updateTotal();
}


//Remove Item
function removeItem() {
  if (confirm('از حذف این مورد اطمینان دارید')) {
    let title = this.parentElement.querySelector('.cart-food-title').innerHTML;
    itemList = itemList.filter(el => el.title != title);
    this.parentElement.remove();
    loadContent();
  }
}

//Change Quantity
function changeQty() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  loadContent();
}

let itemList = [];

//Add Cart
function addCart() {
  let food = this.parentElement;
  let title = food.querySelector('.food-title').innerHTML;
  let price = food.querySelector('.food-price').innerHTML;
  let imgSrc = food.querySelector('.access_imgs').src;
  //console.log(title,price,imgSrc);

  let newProduct = { title, price, imgSrc }

  //Check Product already Exist in Cart
  if (itemList.find((el) => el.title == newProduct.title)) {
    alert("این مورد قبلا به سبد خرید اضافه شده است");
    return;
  } else {
    itemList.push(newProduct);
  }


  let newProductElement = createCartProduct(title, price, imgSrc);
  let element = document.createElement('div');
  element.innerHTML = newProductElement;
  let cartBasket = document.querySelector('.cart-content');
  cartBasket.append(element);
  loadContent();
}


function createCartProduct(title, price, imgSrc) {

  return `
  <div class="cart-box">
  <img src="${imgSrc}" class="cart-img">
  <div class="detail-box">
    <div class="cart-food-title">${title}</div>
    <div class="price-box">
      <div class="cart-price">${price}</div>
       <div class="cart-amt">${price}</div>
   </div>
    <input type="number" value="1" class="cart-quantity">
  </div>
  <ion-icon name="trash" class="cart-remove"></ion-icon>
</div>
  `;
}

function updateTotal() {
  const cartItems = document.querySelectorAll('.cart-box');
  const totalValue = document.querySelector('.total-price');

  let total = 0;

  cartItems.forEach(product => {
    let priceElement = product.querySelector('.cart-price');
    let price = parseFloat(priceElement.innerHTML.replace("تومان", ""));
    let qty = product.querySelector('.cart-quantity').value;
    total += (price * qty);
    product.querySelector('.cart-amt').innerText = "تومان" + (price * qty);

  });

  totalValue.innerHTML = total + 'تومان';


  // Add Product Count in Cart Icon

  const cartCount = document.querySelector('.cart-count');
  let count = itemList.length;
  cartCount.innerHTML = count;

  if (count == 0) {
    cartCount.style.display = 'none';
  } else {
    cartCount.style.display = 'block';
  }


}

function getProducts() {
  let products = [
    { id: 'cables 1', title: 'کابل 1', price: 50, imageSrc: 'images/1.jpg' },
    { id: 'cables 2', title: 'کابل 2', price: 11, imageSrc: 'images/2.png' },
    { id: 'cables 3', title: 'کابل 3', price: 13, imageSrc: 'images/3.jpg' },
    { id: 'cables 4', title: 'کابل 4', price: 4000, imageSrc: 'images/4.jpg' },
    { id: 'cables 5', title: 'کابل 5', price: 1000, imageSrc: 'images/5.jpg' },
    { id: 'cables 6', title: 'کابل 7', price: 14000, imageSrc: 'images/6.jpg' },
    { id: 'cables 7', title: 'موس 8', price: 8000, imageSrc: 'images/7.jpg' },
    { id: 'cables 8', title: 'موس 9', price: 390, imageSrc: 'images/8.jpg' },
    { id: 'cables 9', title: 'موس 10', price: 1993, imageSrc: 'images/9.jpg' },
    { id: 'cables 10', title: 'موس 11', price: 200, imageSrc: 'images/10.jpg' },
    { id: 'cables 10', title: 'موس 12', price: 699, imageSrc: 'images/11.jpg' },
    { id: 'cables 10', title: 'موس 13', price: 911, imageSrc: 'images/12.jpg' },
    { id: 'cables 10', title: 'موس 14', price: 128, imageSrc: 'images/13.jpg' },
    { id: 'cables 10', title: 'موس 15', price: 9911, imageSrc: 'images/14.jpg' },
    { id: 'cables 10', title: 'موس 16', price: 1291, imageSrc: 'images/15.jpg' },
    { id: 'cables 10', title: 'کابل 11', price: 9812, imageSrc: 'images/16.jpg' },
  ];
  return products;
}

function getProductHtml(id, title, price, imageSrc) {
  return `
      <div class="img_wrapper">
        <div id="${id}" class="pic"><img src="${imageSrc}" class="access_imgs"></div>
        <h2 class="food-title">${title}</h2>
        <span class="food-price">${price} تومان</span>      
        <i class="fa fa-cart-plus add-cart" name="cart" id="cart-icon"></i>
      </div>
    `;
}
function appendProducts() {
  var products = getProducts();
  for (var i = 0; i < products.length; i++) {
    let product = products[i];
    let newProductElement = getProductHtml(product.id, product.title, product.price, product.imageSrc);
    let div = document.getElementById('product-wrapper')
    div.insertAdjacentHTML('beforeend', newProductElement);
  }
}
appendProducts();

////////////////// slider

function getSliderHtml(src, title) {
  return `
    <div class="slide">
        <div class="slide-content" style="background-image: url('${src}'); background-repeat:no-repeat; ">
            <span>${title}</span>
        </div>
    </div>
    `;
}
// uniquness of recommands
function randomIntFromInterval(len, max) {
  var arr = [];
  while (arr.length < len) {
    var r = Math.floor(Math.random() * max) + 1;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
}
function addSliderHtml() {
  var products = getProducts();
  var randomNums = randomIntFromInterval(3, products.length);
  for (var i = 0; i < randomNums.length; i++) {
    let product = products[randomNums[i]];
    let sliderItem = getSliderHtml(product.imageSrc, product.title);
    let div = document.getElementById('slider');
    div.insertAdjacentHTML('beforeend', sliderItem);
  }
}

addSliderHtml();

var sliderImages = document.querySelectorAll('.slide'),
  arrowLeft = document.querySelector('#arrow-left'),
  arrowRight = document.querySelector('#arrow-right'),
  current = 0;

function reset() {
  for (let i = 0; i < sliderImages.length; i++) {
    sliderImages[i].style.display = 'none';
  }
}

function init() {
  reset();
  sliderImages[0].style.display = 'block';
}

function slideLeft() {
  reset();
  sliderImages[current - 1].style.display = 'block';
  current--;
}

arrowLeft.addEventListener('click', function () {
  if (current === 0) {
    current = sliderImages.length;
  }
  slideLeft();
});

function slideRight() {
  reset();
  sliderImages[current + 1].style.display = 'block';
  current++;
}

arrowRight.addEventListener('click', function () {
  if (current === sliderImages.length - 1) {
    current = -1;
  }
  slideRight();
});

init();

