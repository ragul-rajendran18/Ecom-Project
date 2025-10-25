import React from 'react';
import ProductCard from './ProductCard';

export default function ProductList({ products, onAdd }) {
  return (
    <div className="product-list">
      <h2>Products</h2>
      <div className="grid">
        {products.map(p => (
          <ProductCard key={p._id} product={p} onAdd={() => onAdd(p)} />
        ))}
      </div>
    </div>
  );
}
