const express = require('express');
//const { resolve } = require('path');
let cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

//server-side values
let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2; //2 points per $1

//function
function getCartTotal(newItemPrice, cartTotal) {
  return newItemPrice + cartTotal;
}
//Endpoint 1
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  //let result = newItemPrice + cartTotal;
  res.send(getCartTotal(newItemPrice, cartTotal).toString());
});

//function to apply discount for member
function membershipDiscount(cartTotal, isMember) {
  let finalPrice;
  if (isMember) {
    return finalPrice = cartTotal - (cartTotal * discountPercentage / 100);
  } else {
    return finalPrice = cartTotal;
  }
}

//Endpoint 2
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === "true";

  res.send(membershipDiscount(cartTotal, isMember).toString());
});

//function to return total cart amount after applying the tax
function appliedTax(cartTotal) {
  return cartTotal * (taxRate / 100);
}

//Endpoint 3
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(appliedTax(cartTotal).toString());
});

//function
function estimateDelivery(shippingMethod, distance) {
  let standard;
  let express;
  if (shippingMethod === 'standard') { 
    return (1 * distance) / 50;
  } else if (shippingMethod === 'express') {
    return (1 * distance) / 100;
  } else {
    return 'Enter Valid shipping method';
  }
}

//Endpoint 4
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(estimateDelivery(shippingMethod, distance).toString());
});

//function
function getShippingCost(weight, distance) {
  return finalCost = weight * distance * 0.1;
}

//Endpoint 5
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send(getShippingCost(weight, distance).toString());
});

//function to return loyalty amount after purchase
function getLoyaltyPoints(purchaseAmount) {
  return finalPoints = loyaltyRate * purchaseAmount;
}

//Endpoint 6
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(getLoyaltyPoints(purchaseAmount).toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
