
// Empty Order and Payment Array
const Orders = [];
const Payments = [];

// Accepted Payment Methods
const paymentmethods = [
  "DBS Visa",
  "OCBC",
  "UOB",
  "MasterCard"
]

// Product Catalog
const catalog = {
  "iphone 16E" : 799.00,
  "iphone 15" : 1099.00, 
  "iphone 16" : 1299.00,
}

// Add an order
function addOrder({ orderId, orderDate, buyerName, product, quantity }) {
    if (!orderId || !orderDate || !buyerName || !product || typeof quantity !== 'number') {
        throw new Error('Invalid Order Data');
    }

    Orders.push({ orderId, orderDate, buyerName, product, quantity });
}

// Retrieve Order By Name
function getOrderByName(buyerName) {
    return Orders.find(o => o.buyerName === buyerName) || null;
}

// Retrieves all Orders
function getAllOrders() {
    return [...Orders];
}

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

// Get total amt paid for products from a specific buyer
function getTotalAmtFromBuyerName(buyerName) {
    return Payments
     .filter(p => p.buyerName === buyerName)
     .reduce((sum ,p) => sum + p.totalAmount, 0);
}

// Example Scenario

//Welcome Message 
console.log("Hello, welcome to Apple Store!.");

//Show product catalog for buyer to make an order
console.log("Please make an order based on our product catalog.");

for(const [product, price] of Object.entries(catalog)) {
  console.log(`- ${product}: $${price.toFixed(2)}`);
}

// Add an order
addOrder({
    orderId: "ORDER-01",
    orderDate: "2025-05-11",
    buyerName: "Cedric",
    product: "iphone 15",
    quantity: 2,
});

// Get order from buyer Name
const order = getOrderByName("Cedric");

//Confirm Order Creation
console.log("Ordered By:", order);

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

// Calculate payment
const payment = calcPayment({
    orderId: order.orderId,
    paymentMethod: 'OCBC'
});

// Record Payment Details
console.log("Payment Details:", payment);

//Retrieve total amount paid for products from a buyer Name
const buyerName = order.buyerName;
const totalPaid = getTotalAmtFromBuyerName(buyerName);
console.log(`Total amount paid by ${buyerName}: $${totalPaid}`);


