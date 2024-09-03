import {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Product {
  product_id: number;
  name: string;
  price: number;
  image_url: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]); 
  const navigate = useNavigate(); 

  // Fetch product function
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/products');
      console.log("Fetched products:", response.data) 
      setProducts(response.data);
    } catch (error)  {
      console.log("Error fetching products:", error);
      setProducts([]);
    }
  }

  // Delete product function 
  const deleteProduct = async (id:number) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/products/${id}`)
      fetchProducts(); 
    } catch (error) {
      console.log(`Error deleting products ${products}`)
    }
  }

  useEffect(() => {
    // Fetch products 
    fetchProducts(); 
  }, [])

  return (
    <div className="product-list">
      <h3>Products</h3>
      <ul>
        {products.map(product => (
          <li key={product.product_id}>
            <img 
              src={`http://127.0.0.1:5000/uploads/${product.image_url}`} 
              alt={product.name} 
              style={{ width: '100px', height: '100px', objectFit: 'cover' }} // Add styling as needed
            />

            <p>{product.name}: ${product.price}</p>
            <button onClick={() => navigate(`/edit-product/${product.product_id}`)}>Edit</button>
            <button onClick={() => deleteProduct(product.product_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )

}

export default ProductList;