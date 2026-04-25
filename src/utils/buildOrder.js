const buildOrderPayload = (users, products) => {
  const product = products[Math.floor(Math.random() * products.length)];
  return {
    userId: users[Math.floor(Math.random() * users.length)]._id,
    status: "paid",
    items: [
      {
        productId: product._id,
        quantity: 1,
        priceAtPurchase: product.price
      }
    ],
    totalAmount: product.price
  };
};

module.exports = { buildOrderPayload };
