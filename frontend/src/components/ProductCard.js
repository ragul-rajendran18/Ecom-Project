import React from 'react';

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="card">
      <div className="thumb">{product.image ? <img className='pimg' src={product.image} alt="" /> : <div className="placeholder">No Image</div>}</div>
      <h3>{product.name}</h3>
      <p className="desc">{product.description}</p>
      <div className="row">
        <strong>₹{product.price}</strong>
        <button onClick={onAdd}>Add</button>
      </div>
    </div>
  );
}
