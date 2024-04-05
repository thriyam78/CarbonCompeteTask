import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { baseURL } from '../services/baseUrl';
import Container from '../components/Container';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';

const AdminEdit = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [materialsUsed, setMaterialsUsed] = useState('');
  const [approximateCO2Release, setApproximateCO2Release] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {token}=useParams()



  const fetchProducts = async () => {
    try {
        setIsLoading(true)
        const { data } = await axios.get(`${baseURL}/product/allProducts`)
        if (data && data?.product) {
            setProducts(data?.product);
        }
        setIsLoading(false)
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
    }
}

useEffect(() => {
    fetchProducts()
}, [])

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
        setIsLoading(true)
      await axios.post(`${baseURL}/product/addProduct`, {
        productName,
        productDescription,
        materialsUsed: materialsUsed.split(',').map(material => material.trim()),
        approximateCO2Release
      },{headers:{Authorization:`Bearer ${token}`}});
      setIsLoading(false)
      toast.success("Product added successfully")
      fetchProducts();
      setProductName('');
      setProductDescription('');
      setMaterialsUsed('');
      setApproximateCO2Release('');
    } catch (error) {
      toast.error('Error adding product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
        setIsLoading(true)
      await axios.delete(`${baseURL}/product/deleteProduct/${productId}`,{headers:{Authorization:`Bearer ${token}`}});
      toast.success("Product deleted successfully")
      fetchProducts();
      setIsLoading(false)
    } catch (error) {
      toast.error('Error deleting product:', error);
    }
  };

  return (
    <Container>
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Admin Panel</h1>
      
      <h2 className="text-xl font-bold mt-8 mb-4">Add Product</h2>
      {isLoading ? (
          <Loading isLoading={isLoading} className={"my-20"} />
        ) : (
      <form onSubmit={handleAddProduct} className="mb-8">
        <div className="mb-4">
          <label htmlFor="productName" className="block mb-2">Product Name</label>
          <input type="text" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} className="border rounded px-4 py-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="productDescription" className="block mb-2">Product Description</label>
          <textarea id="productDescription" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} className="border rounded px-4 py-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="materialsUsed" className="block mb-2">Materials Used (comma separated)</label>
          <input type="text" id="materialsUsed" value={materialsUsed} onChange={(e) => setMaterialsUsed(e.target.value)} className="border rounded px-4 py-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="approximateCO2Release" className="block mb-2">Approximate CO2 Release</label>
          <input type="number" id="approximateCO2Release" value={approximateCO2Release} onChange={(e) => setApproximateCO2Release(e.target.value)} className="border rounded px-4 py-2 w-full" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">Add Product</button>
      </form>
        )}
      <h2 className="text-xl font-bold mt-8 mb-4">Products</h2>
      {isLoading ? (
          <Loading isLoading={isLoading} className={"my-20"} />
        ) : (
<table className="border-collapse w-full mb-10">
  <thead>
    <tr className="bg-gray-200">
      <th className="border border-gray-400 px-4 py-2">Product Name</th>
      <th className="border border-gray-400 px-4 py-2">Product Description</th>
      <th className="border border-gray-400 px-4 py-2">Materials Used</th>
      <th className="border border-gray-400 px-4 py-2">Approximate CO2 Release</th>
      <th className="border border-gray-400 px-4 py-2">Actions</th>
    </tr>
  </thead>
  <tbody>
    {products.map(product => (
      <tr key={product._id} className="bg-white">
        <td className="border border-gray-400 px-4 py-2">{product.productName}</td>
        <td className="border border-gray-400 px-4 py-2">{product.productDescription}</td>
        <td className="border border-gray-400 px-4 py-2">{product.materialsUsed.join(', ')}</td>
        <td className="border border-gray-400 px-4 py-2">{product.approximateCO2Release} kg</td>
        <td className="border border-gray-400 px-4 py-2">
          <button onClick={() => handleDeleteProduct(product._id)} className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600">Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
        )}
    </div>
    </Container>
  );
};

export default AdminEdit;
