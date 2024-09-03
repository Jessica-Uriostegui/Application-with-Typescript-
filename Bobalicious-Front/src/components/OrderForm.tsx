import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Form } from 'react-bootstrap';

const OrderForm = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // Fetch products from the API
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const addToCart = (product, size, quantity) => {
        setCart([...cart, { ...product, size, quantity }]);
    };

    return (
        <div className="order-form">
            <h1>Order Your Boba</h1>
            <div className="product-list">
                {products.map((product) => (
                    <Card key={product.product_id} style={{ width: '18rem', margin: '1rem' }}>
                        {product.image_url && <Card.Img variant="top" src={product.image_url} />}
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>
                                ${product.price.toFixed(2)}
                            </Card.Text>
                            <Form>
                                <Form.Group controlId="size">
                                    <Form.Label>Select Size</Form.Label>
                                    <Form.Control as="select" defaultValue="medium">
                                        <option value="medium">Medium</option>
                                        <option value="large">Large</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="quantity">
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control type="number" defaultValue="1" min="1" />
                                </Form.Group>
                                <Button
                                    variant="primary"
                                    onClick={() => {
                                        const size = document.querySelector(`#size-${product.product_id}`).value;
                                        const quantity = document.querySelector(`#quantity-${product.product_id}`).value;
                                        addToCart(product, size, quantity);
                                    }}
                                >
                                    Add to Cart
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
};
export default OrderForm;