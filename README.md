# Assignment 1 : Apple Store Order Processing and Payment

A node module displaying a list of Apple products for customers to choose from and buy from the Apple Online Store, handlng order creation and payment based on selected products and their respective quantities.

### 5 Useful Node Functions

- 1: Add an Order
- 2: Retrieve Order based on Buyer Name
- 3: Retrieve All Orders
- 4: Calculate and create payment based on orderId
- 5: Get total amount paid for products from a specific buyer (track spending amount)

### Set-up

**Install Node JS (LTS ver)**  
- [Download Node JS application](https://nodejs.org/en/)

To start using the node module, type this in integrated terminal: node/nodemon Cedric_WebAPI.js;

### How to Use?

*Display Welcome message *

```js
console.log("Hello, welcome to Apple Store!.");
```

**Add an order based on Product Catalog**

*Product Catalog:*
```js
const catalog = {
  "iphone 16E" : 799.00,
  "iphone 15" : 1099.00, 
  "iphone 16" : 1299.00,
}
```

**Function 1 Add Order**

*Example Scenario:*
```js
// Add an order
function addOrder({ orderId, orderDate, buyerName, product, quantity }) {
    if (!orderId || !orderDate || !buyerName || !product || typeof quantity !== 'number') {
        throw new Error('Invalid Order Data');
    }

    Orders.push({ orderId, orderDate, buyerName, product, quantity });
}
```

**Function 2 Retrieve Order based on Buyer Name.**

*Example Scenario:*
```js
// Retrieve Order By Buyer Name
function getOrderByName(buyerName) {
    return Orders.find(o => o.buyerName === buyerName) || null;
}
```

**Function 3 Retrieve All Orders.**

*Example Scenario:*
```js
// Retrieves all Orders
function getAllOrders() {
    return [...Orders];
}
// Display all orders
console.log("All Orders:");
const allOrders = getAllOrders();
allOrders.forEach((order, index) => {
    console.log(`\nOrder #${index + 1}`);
    console.log(`Order ID: ${order.orderId}`);
    console.log(`Date: ${order.orderDate}`);
    console.log(`Buyer: ${order.buyerName}`);
    console.log(`Product: ${order.product}`);
    console.log(`Quantity: ${order.quantity}`);
});
```

**Function 4 Calculate and create payment based on orderId.**

*Example Scenario:*
```js
// Calculate and create payment base on orderId
function calcPayment({orderId, paymentMethod}) {

  const order = Orders.find(o => o.orderId === orderId);

  if (!order) {
    console.log("Order Not Found!");
    return null;
  } 
     
  const price = catalog[order.product.toLowerCase()]
  if(typeof price != 'number') {
    console.log("Invalid Product Price");
    return null;
  } 

  if (order.quantity <= 0) {
    console.log("No quantity selected.");
    return null;
  } 

  if (!paymentmethods.includes(paymentMethod)) {
    console.log("Invalid payment method");
    return null;
  }
  
  const totalamt = price * order.quantity;

  const payment = {
    id: `PAYMENT-${Date.now()}`,
    orderId: order.orderId,
    buyerName: order.buyerName,
    product: order.product,
    quantity: order.quantity,
    unitPrice: price,
    totalAmount: totalamt,
    paymentMethod,
    paymentStatus: 'Paid',
    paidAt: new Date(),
  };

  Payments.push(payment);
  return payment;

}
```

**Function 5 Get total amount paid for products from a specific buyer (track spending amount).**

*Example Scenario:*
```js
// Get total amt paid for products from a specific buyer
function getTotalAmtFromBuyerName(buyerName) {
    return Payments
     .filter(p => p.buyerName === buyerName)
     .reduce((sum ,p) => sum + p.totalAmount, 0);
}
```

### References
Provide the references that you have used to support your assignment. 

ChatGPT(2025, May 21). Order Not Found Issue
https://chatgpt.com/c/682db437-3c10-8011-aab3-f1c74b99a68e

Apple Online Store (E-commerce)
https://www.apple.com/sg/store?afid=p240%7Cgo~cmp-221204063~adg-15033774743~ad-738167216061_aud-2379459031142%3Akwd-12522920~dev-c~ext-~prd-~mca-~nt-search&cid=aos-sg-kwgo-brand--