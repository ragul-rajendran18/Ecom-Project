import React, { useEffect, useState } from 'react';
import { fetchProducts, checkout } from './api';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); // { productId, quantity, product }
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProducts().then(setProducts).catch(err => console.error(err));
  }, []);

  function addToCart(product) {
    setCart(prev => {
      const found = prev.find(i => i.productId === product._id);
      if (found) return prev.map(i => i.productId === product._id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { productId: product._id, quantity: 1, product }];
    });
  }

  function updateQuantity(productId, qty) {
    setCart(prev => prev.map(i => i.productId === productId ? { ...i, quantity: Math.max(1, qty) } : i));
  }

  function removeFromCart(productId) {
    setCart(prev => prev.filter(i => i.productId !== productId));
  }

  async function handleCheckout() {
    try {
      const items = cart.map(i => ({ productId: i.productId, quantity: i.quantity }));
      const res = await checkout(items);
      setMessage(`Order placed (id: ${res.orderId}) — total ₹${res.total}`);
      setCart([]);
    } catch (err) {
      console.error(err);
      setMessage('Checkout failed');
    }
  }

  return (
    <div className="container">
      <h1 className='head'>E‑commerce 🛒</h1>
      {message && <div className="message">{message}</div>}
      <div className="layout">
        <ProductList products={products} onAdd={addToCart} />
        <Cart items={cart} onUpdate={updateQuantity} onRemove={removeFromCart} onCheckout={handleCheckout} />
      </div>
    </div>
  );
}
