// ---------- expanded card-----------------

var $cell = $('.card');

//open and close card when clicked on card
$cell.find('.js-expander').click(function () {

  var $thisCell = $(this).closest('.card');

  if ($thisCell.hasClass('is-collapsed')) {
    $cell.not($thisCell).removeClass('is-expanded').addClass('is-collapsed');
    //$cell.not($thisCell).removeClass('is-expanded').addClass('is-collapsed').addClass('is-inactive');

    $thisCell.removeClass('is-collapsed').addClass('is-expanded');

    if ($cell.not($thisCell).hasClass('is-inactive')) {
      //do nothing
    } else {
      //$cell.not($thisCell).addClass('is-inactive');
    }

  } else {
    $thisCell.removeClass('is-expanded').addClass('is-collapsed');
    $cell.not($thisCell).removeClass('is-inactive');
  }
});

//close card when click on cross
$cell.find('.js-collapser').click(function () {

  var $thisCell = $(this).closest('.card');

  $thisCell.removeClass('is-expanded').addClass('is-collapsed');
  $cell.not($thisCell).removeClass('is-inactive');

});
// ------------ cards del extended------------------
var templateCart = `
<div class="main-cart">
    <div id="cart-vue">
      <cart :cart="cart" :cart-sub-total="cartSubTotal" :tax="tax" :cart-total="cartTotal"
        :checkout-bool="checkoutBool"></cart>
    </div>
  </div>
`

var template1 = `
<div class="main-wrapper">
    <div id="vue1">
      <products :cart="cart" :cart-sub-total="cartSubTotal" :tax="tax" :cart-total="cartTotal"
        :products-data="productsData"></products>
    </div>
  </div>
`
var template2 = `
<div class="main-wrapper">
    <div id="vue2">
      <products :cart="cart" :cart-sub-total="cartSubTotal" :tax="tax" :cart-total="cartTotal"
        :products-data="productsData"></products>
    </div>
  </div>
`
var template3 = `
<div class="main-wrapper">
    <div id="vue3">
      <products :cart="cart" :cart-sub-total="cartSubTotal" :tax="tax" :cart-total="cartTotal"
        :products-data="productsData"></products>
    </div>
  </div>
`
var template4 = `
<div class="main-wrapper">
    <div id="vue4">
      <products :cart="cart" :cart-sub-total="cartSubTotal" :tax="tax" :cart-total="cartTotal"
        :products-data="productsData"></products>
    </div>
  </div>
`

var template5 = `
<div class="main-wrapper">
    <div id="vue5">
      <products :cart="cart" :cart-sub-total="cartSubTotal" :tax="tax" :cart-total="cartTotal"
        :products-data="productsData"></products>
    </div>
  </div>
`

var template6 = `
<div class="main-wrapper">
    <div id="vue6">
      <products :cart="cart" :cart-sub-total="cartSubTotal" :tax="tax" :cart-total="cartTotal"
        :products-data="productsData"></products>
    </div>
  </div>
`
document.getElementById("cart_wrapper").innerHTML = templateCart;
document.getElementById("container_expander_main_1").innerHTML = template1;
document.getElementById("container_expander_main_2").innerHTML = template2;
document.getElementById("container_expander_main_3").innerHTML = template3;
document.getElementById("container_expander_main_4").innerHTML = template4;
document.getElementById("container_expander_main_5").innerHTML = template5;
document.getElementById("container_expander_main_6").innerHTML = template6;


