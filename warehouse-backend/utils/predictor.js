function evaluate(item) {
  const quantity = Number(item.quantity);

  if (quantity <= 5) {
    return { type: "Low Stock", message: "Stock almost empty" };
  }

  if (quantity <= 10) {
    return { type: "At Risk", message: "Stock getting low" };
  }

  return { type: "OK", message: "Stock sufficient" };
}

module.exports = { evaluate };
