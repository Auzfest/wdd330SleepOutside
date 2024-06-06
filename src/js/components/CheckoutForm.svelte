<script>
import { getLocalStorage, formDataToJSON } from "../utils.mjs";
import { checkout } from "../externalServices.mjs";
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

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(list) {
// convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
    const items = list.map(function(item) {
        return {
            id: item.Id,
            name: item.Name,
            price: item.FinalPrice,
            quantity: 1
        }
    })
}

async function handleSubmit(e) {
  // build the data object from the calculated fields, the items in the cart, and the information entered into the form
  // remember that the form that was submitted can be found two ways...this or e.target 
  // call the checkout method in our externalServices module and send it our data object.
  const json = formDataToJSON(this);
    // add totals, and item details
    json.orderDate = new Date();
    json.orderTotal = orderTotal;
    json.tax = tax;
    json.shipping = shipping;
    json.items = packageItems(list);
    console.log(json);
    try {
      const res = await checkout(json);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

// initial setup
init(); 
</script>

<form name="checkout" on:submit|preventDefault={handleSubmit}>
    <div>
        <h2>Shipping</h2>
        <div>
            <label for="fname">First Name</label><br>
            <input type="text" name="fname" id="fname" required />
        </div>
        <div>
            <label for="lname">Last Name</label><br>
            <input type="text" name="lname" id="lname" required  />
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
            <input type="text" name="cardNumber" id="cardNumber" required/>
        </div>
        <div>
            <label for="expiration">Expiration</label><br>
            <input type="text" name="expiration" id="expiration" required/>
        </div>
        <div>
            <label for="code">Security Code</label><br>
            <input type="text" name="code" id="code" required/>
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