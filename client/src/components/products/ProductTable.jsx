import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductTable = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (productId) => {
    setSelectedProduct(productId === selectedProduct ? null : productId);
  };

  return (
    <table className="border-collapse w-full my-10">
      <thead>
        <tr>
          <th className="border py-2 px-4">Product Name</th>
          <th className="border py-2 px-4">Product Description</th>
          <th className="border py-2 px-4">Materials Used</th>
          <th className="border py-2 px-4">Calculation</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <React.Fragment key={product._id}>
            <tr onClick={() => handleProductClick(product._id)} className={`cursor-pointer ${selectedProduct === product._id ? 'bg-indigo-100' : ''}`}>
              <td className="border py-2 px-4">{product.productName}</td>
              <td className="border py-2 px-4">{product.productDescription}</td>
              <td className="border py-2 px-4">{product.materialsUsed.join(', ')}</td>
              <td className="border py-2 px-4">
                <Link to={`/calculation/${product.approximateCO2Release}/${product.productName}`} className="bg-indigo-500 text-white py-1 px-3 rounded-md hover:bg-indigo-600">CO2</Link>
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
