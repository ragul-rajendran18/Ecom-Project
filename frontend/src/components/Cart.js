import React from 'react';

export default function Cart({ items, onUpdate, onRemove, onCheckout }) {
  const total = items.reduce((s, it) => s + it.quantity * (it.product?.price || 0), 0);

  return (
    <div className="cart">
      <h2>Cart</h2>
      {items.length === 0 && <p>Cart is empty</p>}
      <ul>
        {items.map(i => (
          <li key={i.productId} className="cart-item">
            <div>
              <strong>{i.product?.name}</strong>
              <div>₹{i.product?.price} each</div>
            </div>
            <div className="controls">
              <input type="number" value={i.quantity} min={1} onChange={e => onUpdate(i.productId, parseInt(e.target.value || '1'))} />
              <button onClick={() => onRemove(i.productId)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-footer">
        <div>Total: ₹{total}</div>
        <button disabled={items.length === 0} onClick={onCheckout}>Checkout</button>
      </div>
    </div>
  );
}
