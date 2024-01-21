const btnCart=document.querySelector('#cart-icon');
const cart=document.querySelector('.cart');
const btnClose=document.querySelector('#cart-close');

btnCart.addEventListener('click',()=>{
  cart.classList.add('cart-active');
});

btnClose.addEventListener('click',()=>{
  cart.classList.remove('cart-active');
});

document.addEventListener('DOMContentLoaded',loadFood);

function loadFood(){
  loadContent();
}

function loadContent(){
  //Remove Food Items  From Cart
  let btnRemove=document.querySelectorAll('.cart-remove');
  btnRemove.forEach((btn)=>{
    btn.addEventListener('click',removeItem);
  });

  //Product Item Change Event
  let qtyElements=document.querySelectorAll('.cart-quantity');
  qtyElements.forEach((input)=>{
    input.addEventListener('change',changeQty);
  });

  //Product Cart
  
  let cartBtns=document.querySelectorAll('.add-cart');
  cartBtns.forEach((btn)=>{
    btn.addEventListener('click',addCart);
  });

  updateTotal();
}


//Remove Item
function removeItem(){
  if(confirm('از حذف این کتاب اطمینان دارید')){
    let title=this.parentElement.querySelector('.cart-food-title').innerHTML;
    itemList=itemList.filter(el=>el.title!=title);
    this.parentElement.remove();
    loadContent();
  }
}

//Change Quantity
function changeQty(){
  if(isNaN(this.value) || this.value<1){
    this.value=1;
  }
  loadContent();
}

let itemList=[];

//Add Cart
function addCart(){
 let food=this.parentElement;
 let title=food.querySelector('.food-title').innerHTML;
 let price=food.querySelector('.food-price').innerHTML;
 let imgSrc=food.querySelector('.food-img').src;
 //console.log(title,price,imgSrc);
 
 let newProduct={title,price,imgSrc}

 //Check Product already Exist in Cart
 if(itemList.find((el)=>el.title==newProduct.title)){
  alert("این کتاب قبلا به سبد خرید اضافه شده است");
  return;
 }else{
  itemList.push(newProduct);
 }


let newProductElement= createCartProduct(title,price,imgSrc);
let element=document.createElement('div');
element.innerHTML=newProductElement;
let cartBasket=document.querySelector('.cart-content');
cartBasket.append(element);
loadContent();
}


function createCartProduct(title,price,imgSrc){

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

function updateTotal()
{
  const cartItems=document.querySelectorAll('.cart-box');
  const totalValue=document.querySelector('.total-price');

  let total=0;

  cartItems.forEach(product=>{
    let priceElement=product.querySelector('.cart-price');
    let price=parseFloat(priceElement.innerHTML.replace("تومان",""));
    let qty=product.querySelector('.cart-quantity').value;
    total+=(price*qty);
    product.querySelector('.cart-amt').innerText="تومان"+(price*qty);

  });

  totalValue.innerHTML='تومان'+total;


  // Add Product Count in Cart Icon

  const cartCount=document.querySelector('.cart-count');
  let count=itemList.length;
  cartCount.innerHTML=count;

  if(count==0){
    cartCount.style.display='none';
  }else{
    cartCount.style.display='block';
  }


}

function getProducts() {
    let products = [
        { id:'book 1', title:'کتاب 1', price:50, imageSrc:'images/1.jpg' },
        { id:'book 2', title:'کتاب 2', price:50, imageSrc:'images/2.jpg' },
        { id:'book 3', title:'کتاب 3', price:50, imageSrc:'images/3.jpg' },
        { id:'book 4', title:'کتاب 4', price:50, imageSrc:'images/4.jpg' },
        { id:'book 5', title:'کتاب 5', price:50, imageSrc:'images/5.jpg' },
        { id:'book 6', title:'کتاب 6', price:50, imageSrc:'images/6.jpg' }
    ];
    return products;
}

function getProductHtml(id, title, price, imageSrc) {
    return `
      <div class="food-box">
        <div id="${id}" class="pic"><img src="${imageSrc}" class="food-img"></div>
        <h2 class="food-title">${title}</h2>
        <span class="food-price">${price} تومان</span>
        <ion-icon name="cart" class="add-cart"></ion-icon>
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

function addSliderHtml() {
    var randomNums = randomIntFromInterval(3, 5);
    console.log(randomNums);
    var products = getProducts();
    for (var i = 0; i < randomNums.length; i++) {      
        let product = products[randomNums[i]];
        let sliderItem = getSliderHtml(product.imageSrc, product.title);
        let div = document.getElementById('slider');
        div.insertAdjacentHTML('beforeend', sliderItem);
    }
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

