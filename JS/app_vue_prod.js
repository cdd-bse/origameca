//---------
// Vue components
//---------
Vue.component("products", {

  template:
    "<div class='products'>" +
    "<div v-for='product in productsData' track-by='$index' class='product {{ product.product | lowercase }}'>" +
    "<div class='image' v-bind:style='{ backgroundImage: \"url(\" + product.image + \")\" }' style='background-size: cover; background-position: center;'></div>" +
    "<div class='name'>{{ product.product }}</div>" +
    "<div class='description'>{{ product.description }}</div>" +
    "<div class='price'>{{ product.price | currency }}</div>" +
    "<button @click='addToCart(product)'>Añadir al Carrito</button></div>" +
    "</div>",

  props: ["productsData", "cart", "cartSubTotal", "cartTotal"],

  methods: {
    addToCart: function (product) {
      var found = false;

      for (var i = 0; i < cartVue.cart.length; i++) {
        if (cartVue.cart[i].sku === product.sku) {
          var newProduct = cartVue.cart[i];
          newProduct.quantity = newProduct.quantity + 1;
          cartVue.cart.$set(i, newProduct);
          //console.log("DUPLICATE",  vue.cart[i].product + "'s quantity is now: " + vue.cart[i].quantity);
          found = true;
          break;
        }
      }

      if (!found) {
        product.quantity = 1;
        cartVue.cart.push(product);
      }

      cartVue.cartSubTotal = cartVue.cartSubTotal + product.price;
      cartVue.cartTotal = cartVue.cartSubTotal + cartVue.tax * cartVue.cartSubTotal;
      cartVue.checkoutBool = true;
    },
  }
});

Vue.component("cart", {
  template:
    '<div class="cart">' +
    '<div class="icon_cart">' +
    '<span class="cart-size" @click="showCart = !showCart"> {{ cart | cartSize }} </span><i  @click="showCart = !showCart"><img class="fa fa-shopping-cart" src="icon/carro24.png" alt="carrito"></i>' +
    "</div>" +
    '<div class="cart-items" v-show="showCart">' +
    '<table class="cartTable">' +
    "<tbody>" +
    '<tr class="product" v-for="product in cart">' +
    '<td class="align-left"><div class="cartImage" @click="removeProduct(product)" v-bind:style="{ backgroundImage: \'url(\' + product.image + \')\' }" style="background-size: cover; background-position: center;"><i class="close fa fa-times"></i></div></td>' +
    '<td class="align-center"><button @click="quantityChange(product, \'decriment\')"><i class="close fa fa-minus"></i></button></td>' +
    '<td class="align-center">{{ cart[$index].quantity }}</td>' +
    '<td class="align-center"><button @click="quantityChange(product, \'incriment\')"><i class="close fa fa-plus"></i></button></td>' +
    '<td class="align-center">{{ cart[$index] | customPluralize }}</td>' +
    "<td>{{ product.price | currency }}</td>" +
    "</tbody>" +
    "<table>" +
    "</div>" +
    '<h4 class="cartSubTotal" v-show="showCart"> {{ cartSubTotal | currency }} </h4></div>' +
    '<div class="cart_botton">' +
    '<button class="clearCart" v-show="checkoutBool" @click="clearCart()"> Limpiar Carrito </button>' +
    '<button class="checkoutCart" v-show="checkoutBool" @click="propagateCheckout()"> Comprar </button>' +
    "</div>",

  props: [
    "checkoutBool",
    "cart",
    "cartSize",
    "cartSubTotal",
    "tax",
    "cartTotal"
  ],

  data: function () {
    return {
      showCart: false
    };
  },

  filters: {
    customPluralize: function (cart) {
      var newName;

      if (cart.quantity > 1) {
        if (cart.product === "Peach") {
          newName = cart.product + "es";
        } else if (cart.product === "Puppy") {
          newName = cart.product + "ies";
          newName = newName.replace("y", "");
        } else {
          newName = cart.product + "s";
        }

        return newName;
      }

      return cart.product;
    },

    cartSize: function (cart) {
      var cartSize = 0;

      for (var i = 0; i < cart.length; i++) {
        cartSize += cart[i].quantity;
      }

      return cartSize;
    }
  },

  methods: {
    removeProduct: function (product) {
      cartVue.cart.$remove(product);
      cartVue.cartSubTotal = cartVue.cartSubTotal - product.price * product.quantity;
      cartVue.cartTotal = cartVue.cartSubTotal + cartVue.tax * cartVue.cartSubTotal;

      if (cartVue.cart.length <= 0) {
        cartVue.checkoutBool = false;
      }
    },

    clearCart: function () {
      cartVue.cart = [];
      cartVue.cartSubTotal = 0;
      cartVue.cartTotal = 0;
      cartVue.checkoutBool = false;
      this.showCart = false;
    },

    quantityChange: function (product, direction) {
      var qtyChange;

      for (var i = 0; i < cartVue.cart.length; i++) {
        if (cartVue.cart[i].sku === product.sku) {
          var newProduct = cartVue.cart[i];

          if (direction === "incriment") {
            newProduct.quantity = newProduct.quantity + 1;
            cartVue.cart.$set(i, newProduct);
          } else {
            newProduct.quantity = newProduct.quantity - 1;

            if (newProduct.quantity == 0) {
              cartVue.cart.$remove(newProduct);
            } else {
              cartVue.cart.$set(i, newProduct);
            }
          }
        }
      }

      if (direction === "incriment") {
        cartVue.cartSubTotal = cartVue.cartSubTotal + product.price;
      } else {
        cartVue.cartSubTotal = cartVue.cartSubTotal - product.price;
      }

      cartVue.cartTotal = cartVue.cartSubTotal + cartVue.tax * cartVue.cartSubTotal;

      if (cartVue.cart.length <= 0) {
        cartVue.checkoutBool = false;
      }
    },
  }
});

//---------
// Vue init
//---------
Vue.config.debug = false;

var cartVue = new Vue({
  el: "#cart-vue",

  data: {
    checkoutBool: false,
    cart: [],
    cartSubTotal: 0,
    tax: 0.065,
    cartTotal: 0
  }
});
//---------
// Vue app 1
//---------

var vue1 = new Vue({
  el: "#vue1",

  data: {
    productsData: [
      {
        sku: 1,
        product: "Felicidad Market",
        image:
          "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/612/products/little-india-01_0003-bis11-0b3a0544d754812d5716820024070548-640-0.jpg",
        description: "Little India - Varanasi - 10x10",
        price: 528
      },

      {
        sku: 2,
        product: "ATO M&C",
        image:
          "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/612/products/20x20surtido1-1393e7f0db19ce78af16771568257358-640-0.jpg",
        description: "Geometric Paterns - 20x20 - Surtido",
        price: 3460
      },

      {
        sku: 3,
        product: "ATO M&C",
        image: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/612/products/pliego-02-marmolado-rojo1-6ffee7c5f6dabdf64b16765556898730-640-0.jpg",
        description: "Amarmolado - Coral Marino",
        price: 450
      },

      {
        sku: 4,
        product: "Felicidad Market",
        image: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/612/products/winter-flowers-021-1a1c9a44aa47a52c5b16820019280487-640-0.jpg",
        description: "Winter Blossom - 15x15",
        price: 5
      },

    ],

  },

});

//---------
// Vue app 2
//---------

var vue2 = new Vue({
  el: "#vue2",

  data: {
    productsData: [
      {
        sku: 5,
        product: "Cortapliegues Cutie Cut",
        image:
          "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/612/products/cutie-cut-negro-0111-515438c0d63546eed416175796342984-640-0.webp",
        description: "Negro",
        price: 2890
      },

      {
        sku: 6,
        product: "Scoring Board M24-10",
        image:
          "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/612/products/tabla-24-011-fdcfefa871b1c0a7e316251678521318-640-0.webp",
        description: "Tabla De Pliegues - 20x29.5 Cm",
        price: 4590
      },

      {
        sku: 7,
        product: "Tijera Grulla Oro",
        image: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/612/products/tijera-grulla-oro1-271c4783a92c9a89d915228648237803-640-0.webp",
        description: "Original",
        price: 4560
      },

      {
        sku: 8,
        product: "Cutter Deli - Inspire",
        image: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/612/products/deli-grande-02-effcc37f6c648b508216652615900394-640-0.webp",
        description: "18 Mm - Grande - Azul",
        price: 2680
      },

    ],
  },

});

//---------
// Vue app 3
//---------

var vue3 = new Vue({
  el: "#vue3",

  data: {
    productsData: [
      {
        sku: 9,
        product: "Gira Y Tesela",
        image:
          "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/612/products/img_212311-31816ecefda8735eb416116861416671-640-0.webp",
        description: "Miguel Gañán",
        price: 9420
      },

      {
        sku: 10,
        product: "El Arte Del Plegado",
        image:
          "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/612/products/2022-05-28-16-43-381-507514c6d7dbd9966816537737567931-640-0.webp",
        description: "Formas Creativas En Diseño Y Arquitectura",
        price: 17790
      },

      {
        sku: 11,
        product: "El Gran Libro Del Plegado",
        image: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/612/products/img_17891-aabcaa20fdf3190ea216052272333543-640-0.webp",
        description: "Paul Jackson",
        price: 23790
      },

      {
        sku: 12,
        product: "Giro Sobre Giro",
        image: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/612/products/giro-sobre-giro-021-8af21d9b7cb4a7168b16639625823475-640-0.webp",
        description: "Miguel Gañán",
        price: 9420
      },

    ],
  },

});

//---------
// Vue app 4
//---------

var vue4 = new Vue({
  el: "#vue4",

  data: {
    productsData: [
      {
        sku: 13,
        product: "Midori - Block",
        image:
          "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/612/products/midori-block-fiesta11-ef9e6aa4c0fb2ede7415618315879559-640-0.webp",
        description: "Fiesta",
        price: 5050
      },

      {
        sku: 14,
        product: "Pack Inicial",
        image:
          "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/612/products/pack-inicial-multiformato1-79a1501f38b15d411416161075690315-480-0.webp",
        description: "Multiformato",
        price: 5160
      },

      {
        sku: 15,
        product: "Origami Box",
        image: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/612/products/origami-box-kit011-5aa4731702fdfb120f16315624394791-640-0.webp",
        description: "Kit",
        price: 11460
      },

      {
        sku: 16,
        product: "Furoshiki",
        image: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/612/products/furoshiki-hexagonal-031-8b73e77ee04541837516591356045790-640-0.webp",
        description: "Hexágonos De Colores",
        price: 4140
      },

      {
        sku: 17,
        product: "producto de prueba",
        image: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/612/products/furoshiki-hexagonal-031-8b73e77ee04541837516591356045790-640-0.webp",
        description: "descripcion",
        price: 1234
      },

    ],
  },

});

// app5

var vue5 = new Vue({
  el: "#vue5",

  data: {
    productsData: [
      {
        sku: 18,
        product: "Midori - Block",
        image:
          "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/612/products/midori-block-fiesta11-ef9e6aa4c0fb2ede7415618315879559-640-0.webp",
        description: "Fiesta",
        price: 5050
      },

      {
        sku: 19,
        product: "Pack Inicial",
        image:
          "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/612/products/pack-inicial-multiformato1-79a1501f38b15d411416161075690315-480-0.webp",
        description: "Multiformato",
        price: 5160
      },

      {
        sku: 20,
        product: "Origami Box",
        image: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/612/products/origami-box-kit011-5aa4731702fdfb120f16315624394791-640-0.webp",
        description: "Kit",
        price: 11460
      },

      {
        sku: 21,
        product: "Furoshiki",
        image: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/612/products/furoshiki-hexagonal-031-8b73e77ee04541837516591356045790-640-0.webp",
        description: "Hexágonos De Colores",
        price: 4140
      },

      {
        sku: 22,
        product: "producto de prueba",
        image: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/612/products/furoshiki-hexagonal-031-8b73e77ee04541837516591356045790-640-0.webp",
        description: "descripcion",
        price: 1234
      },

    ],
  },

});

// app6

var vue6 = new Vue({
  el: "#vue6",

  data: {
    productsData: [
      {
        sku: 23,
        product: "Midori - Block",
        image:
          "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/612/products/midori-block-fiesta11-ef9e6aa4c0fb2ede7415618315879559-640-0.webp",
        description: "Fiesta",
        price: 5050
      },

      {
        sku: 24,
        product: "Pack Inicial",
        image:
          "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/612/products/pack-inicial-multiformato1-79a1501f38b15d411416161075690315-480-0.webp",
        description: "Multiformato",
        price: 5160
      },

      {
        sku: 25,
        product: "Origami Box",
        image: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/612/products/origami-box-kit011-5aa4731702fdfb120f16315624394791-640-0.webp",
        description: "Kit",
        price: 11460
      },

      {
        sku: 26,
        product: "Furoshiki",
        image: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/612/products/furoshiki-hexagonal-031-8b73e77ee04541837516591356045790-640-0.webp",
        description: "Hexágonos De Colores",
        price: 4140
      },

      {
        sku: 27,
        product: "producto de prueba",
        image: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/612/products/furoshiki-hexagonal-031-8b73e77ee04541837516591356045790-640-0.webp",
        description: "descripcion",
        price: 1234
      },

    ],
  },

});
