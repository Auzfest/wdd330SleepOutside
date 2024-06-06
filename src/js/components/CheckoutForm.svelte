<script>
import { getLocalStorage } from "../utils.mjs";

// props
// export let key = "so-cart";

// state vars
let list = [];
let itemTotal = 0;
let shipping = 10;
let tax = 0.06;
let orderTotal = 0;

// initial setup
const init = function () {
  list = getLocalStorage("so-cart");
  calculateItemSummary();
};
// calculate order subtotal from the cart items
const calculateItemSummary = function () {
  // calculate the total of all the items in the cart
  list.forEach(function(items) {
    itemTotal += items.FinalPrice;
        if (list.indexOf(items) >= 1) {
            shipping += 2;
        }
    });
    calculateOrdertotal();
  
};
// calculate the shipping, tax, and orderTotal
const calculateOrdertotal = function () {
  orderTotal = itemTotal + shipping + tax;
};

// initial setup
init(); 
</script>

<form action="/account/register" method="post" id="login">
    <div>
        <h2>Shipping</h2>
        <div>
            <label for="firstname">First Name</label><br>
            <input type="text" name="firstname" id="firstname" required />
        </div>
        <div>
            <label for="lastname">Last Name</label><br>
            <input type="text" name="lastname" id="lastname" required  />
        </div>
        <div>
            <label for="street">Street</label><br>
            <input type="text" name="street" required placeholder="Enter a valid street" id="street" />
        </div>
        <div>
            <label for="city">City</label><br>
            <input type="text" name="city" id="city" required/>
        </div>
        <div>
        <label for="city">State</label><br>
        <input type="text" name="state" id="state" required/>
        </div>
        <div>
        <label for="zip">Zip Code</label><br>
        <input type="text" name="zip" id="zip" required/>
        </div>
    </div>
    <div>
        <h2>Payment</h2>
        <div>
            <label for="cardnumber">Card Number</label><br>
            <input type="text" name="cardnumber" id="cardnumber" required/>
        </div>
        <div>
            <label for="expiration">Expiration</label><br>
            <input type="text" name="expiration" id="expiration" required/>
        </div>
        <div>
            <label for="security">Security Code</label><br>
            <input type="text" name="security" id="security" required/>
        </div>
    </div>
    <div>
        <h2>Order Summary</h2>
        <p>Subtotal: {orderTotal}</p>
        <p>Shipping Estimate: {shipping}</p>
        <p>Tax: {tax}</p>
    </div>
    <input type="submit" value="Checkout" id="button"/>
</form>