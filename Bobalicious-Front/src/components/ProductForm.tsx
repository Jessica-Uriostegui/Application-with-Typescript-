import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { useParams, useNavigate } from "react-router-dom";

// Define an interface for the props
interface ProductFormProps {
  onProductAdded?: (product: any) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onProductAdded }) => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); 
  const [error, setError] = useState<string>('');
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate(); 

  useEffect(() => {
    if (id) {
      const fetchProductDetails = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:5000/products/${id}`);
          setName(response.data.name); 
          setPrice(response.data.price);
          setImage(null); 
        } catch (error: unknown) {  // Explicitly typing the error as 'unknown'
          if (error instanceof Error) {
            console.error(`Error fetching product details: ${error.message}`);
            setError(error.message);
          } else {
            console.error(`Error fetching product details: ${String(error)}`);
            setError(String(error));
          }
        }
      };
      fetchProductDetails(); 
    }
  }, [id]);

  const validateForm = () => {
    const errors: { [key: string]: string } = {}; 

    if (!name) {
      errors.name = 'Product name is required';
    } 
    
    if (!price || parseFloat(price) <= 0){
      errors.price = 'Price must be a positive number'; 
    }

    if (!image && !id) {  
      errors.image = 'Product image is required';
    }
      
    return errors;
  };
 
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); 

    const validationErrors = validateForm();
    setErrors(validationErrors); 

    if (Object.keys(validationErrors).length === 0) {
        setIsSubmitting(true);
        setError('');

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        
        if (image) {
          console.log('uploading image', image);
          formData.append('image', image);  
        }

      try {
        let response;
        if (id) {
          response = await axios.put(`http://127.0.0.1:5000/products/${id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        } else {
          response = await axios.post('http://127.0.0.1:5000/products', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }); 
        }

        console.log('Server response:', response.data);
         
        setName('');
        setPrice('');
        setImage(null);  
        setIsSubmitting(false);
        
        if (onProductAdded) {
          onProductAdded(response.data);
        }

        navigate('/products');

      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error submitting the product:", error.message);
          setError(error.message);
        } else {
          console.error("Error submitting the product:", String(error));
          setError(String(error));
        }
        setIsSubmitting(false); 
      }
    } 
  };
    
   return (
      <Container>
        <form onSubmit={handleSubmit}>
          <h3>{id ? `Edit` : `Add`} Products</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group controlId="formProductName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}>
            </Form.Control>
            {errors.name && <div style={{color: 'red'}}>{errors.name}</div>}
          </Form.Group>

          <Form.Group controlId="formProductPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control 
              type="number" 
              value={price} 
              onChange={(e) => setPrice(e.target.value !== '' ? e.target.value : '')}>
            </Form.Control>
            {errors.price && <div style={{color: 'red'}}>{errors.price}</div>}
          </Form.Group>
          
          <Form.Group controlId="formProductImage">
            <Form.Label>Product Image</Form.Label>
            <Form.Control 
              type="file" 
              accept="image/*"
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                if (target && target.files && target.files[0]) {
                  setImage(target.files[0]);
                } else {
                  setImage(null);
                }
              }}
            />
            {errors.image && <div style={{color: 'red'}}>{errors.image}</div>}
          </Form.Group>

          <br />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </Container>
    );
}

// PropTypes is optional if you are using TypeScript
ProductForm.propTypes = {
  onProductAdded: PropTypes.func
};

export default ProductForm;