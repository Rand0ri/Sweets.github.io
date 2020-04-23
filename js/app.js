// Remove items 
var removeCartItemButtons = document.getElementsByClassName('cart-item-remove');
console.log(removeCartItemButtons);
// Add event list through looping all the items inside our cart
for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]; // whatever loop we are having
    button.addEventListener('click', function(event) { // Event list always returns object event inside the funct that it calls
        console.log('clicked'); // To check buttons
        var buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove(); // Selecting twice to remove whole row div
          updateCartTotal();
        
    })
}

// To update cart total
function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  // Var for total price
  var total = 0;
  // Looping through cart rows
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
//    var quantityElement = cartRow.getElementsByClassName(
//      "cart-quantity-input"
//    )[0];
    console.log(priceElement, quantityElement);
    // Get information from elements
    var price = parseFloat(priceElement.innerText.replace("$", "")); // Parse for return into number from string and replace dollar with empty
//    var quantity = quantityElement.value;
    total = total + price;
  }
  document.getElementById("cart-total")[0].innerText =
    "$" + total;
}

// IIFe dealing with cart
(function() {
  const cartInfo = document.getElementById("cart-info");
  const cart = document.getElementById("cart");
  cartInfo.addEventListener("click", function() {
    // Add even list because cartInfo is an object. Then execute callback function on click
    cart.classList.toggle("show-cart");
  });
})(); // Invoke

// Add items to the cart

(function() {
  // Targeting all of spans with class store item
  const cartBtn = document.querySelectorAll(".store-item-icon");
  // Add evenlist for each buttons
  cartBtn.forEach(function(btn) {
    // We are looping through this btn parametr
    // We want to figure out what we are clicking on
    btn.addEventListener("click", function(event) {
      // Targeting each button. Function will start when we click at any of cart icons

      // We want to only click at icon, not span element too. So we select parent element
      if (event.target.parentElement.classList.contains("store-item-icon")) {
        // Make var for full path of icon
        let fullPath = event.target.parentElement.previousElementSibling.src;
        // New var to select small images in img-cart folder
        let pos = fullPath.indexOf("img") + 3; // this img 3 characters long so we add 3. Otherwise it would be img before our icon path
        // We need to take out text after and before image and we need to switch folder
        let partPath = fullPath.slice(pos);
        // Create object to hold cart name and price
        const item = {};
        // Add properties to object
        item.img = `img-cart${partPath}`; // $ because of template literal
        // Var to target individual items name
        let name =
          event.target.parentElement.parentElement.nextElementSibling
            .children[0].children[0].textContent; // We dont need arrays so we are selecting only first childrens
        item.name = name;
        // Var to target price
        let price =
          event.target.parentElement.parentElement.nextElementSibling
            .children[0].children[1].textContent;
        // Var to fix price without sign and space
        let finalPrice = price.slice(1, 4).trim(); //Trim to remove white space and slice to remove rubl sign
        item.price = finalPrice;

        // Create a new div for cart
        const cartItem = document.createElement("div");
        cartItem.classList.add( // Add clasess 
          "cart-item",
          "d-flex",
          "justify-content-between",
          "text-capitalize",
          "my-3"
        );

        cartItem.innerHTML = ` 
          <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="iamge">
        <div class="item-text">
          <p id="cart-item-title" class="font-weight-bold mb-0">
            ${item.name}
          </p>
            
            <span id="cart-itemprice" class="cart-item-price mb-0">${item.price}</span>
            <span class="rubble">&#x20bd;</span>
        </div>
        <a href="#" id="cart-item-remove" class="cart-item-remove ">
          <i class="fas fa-trash"></i>
        </a>
        
        `;
        // Select cart
        const cart = document.getElementById('cart');
        const total = document.querySelector('.cart-total-container');
        // Method of insert . (what item and before where to insert)
        cart.insertBefore(cartItem, total);
        alert('item added to the cart');
        // Call function to add total
        showTotals();
      }
    });
  });
  // Show totals function
  function showTotals() {
      // Create an array for storing prices
       const total = [];
       const items = document.querySelectorAll('.cart-item-price'); // to get all the prices

      //  Loop through items
      items.forEach(function(item) {
        total.push(parseFloat(item.textContent)); // To change into numbers
        
      });
      
      // Total money
      const totalMoney = total.reduce(function(total, item) {  // Will be returning total and looping thourgh each item. With reduce we need initail value (0 in our case)
        total += item;
        return total;
      }, 0);
      // To get rid of long number after ,
      const finalMoney = totalMoney.toFixed(2);

      // To show total in cart
      document.getElementById('cart-total').textContent = finalMoney;
      document.querySelector('.item-total').textContent = finalMoney;
      document.getElementById('item-count').textContent = total.length;
  }
})();



