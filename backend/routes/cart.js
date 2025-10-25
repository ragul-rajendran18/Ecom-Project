const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/Order');

// POST /api/cart/checkout
// Body: { items: [{ productId, quantity }] }
router.post('/checkout', async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const populated = await Promise.all(items.map(async it => {
      const product = await Product.findById(it.productId);
      if (!product) throw new Error('Product not found: ' + it.productId);
      return {
        product: product._id,
        quantity: it.quantity,
        priceAtPurchase: product.price
      };
    }));

    const total = populated.reduce((s, it) => s + it.quantity * it.priceAtPurchase, 0);

    const order = new Order({ items: populated, total });
    await order.save();

    res.json({ message: 'Order placed', orderId: order._id, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
