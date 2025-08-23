import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button, Badge } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addToCart } from '../actions/cartActions'
import Rating from './Rating'

const Product = ({ product }) => {
  const [isAdding, setIsAdding] = useState(false)
  const dispatch = useDispatch()

  const addToCartHandler = (e) => {
    e.preventDefault()
    setIsAdding(true)
    dispatch(addToCart(product._id, 1))
    setTimeout(() => setIsAdding(false), 1000)
  }

  const handleImageError = (e) => {
    console.log('Image failed to load:', e.target.src);
    e.target.style.display = 'none';
    if (e.target.nextSibling) {
      e.target.nextSibling.style.display = 'flex';
    }
  }

  return (
    <Card className='product-card h-100 fade-in'>
      <div className="position-relative">
        <Link to={`/product/${product._id}`}>
          <Card.Img 
            src={product.image} 
            variant='top' 
            className='product-image'
            onError={handleImageError}
            alt={product.name}
          />
          <div className="product-image-placeholder" style={{ 
            display: 'none', 
            height: '200px', 
            backgroundColor: '#f8f9fa', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: '#6c757d'
          }}>
            <i className="fas fa-image fa-3x"></i>
          </div>
        </Link>
        
        {/* Stock Status Badge */}
        {product.countInStock === 0 && (
          <Badge bg="danger" className="position-absolute top-0 end-0 m-2">
            Out of Stock
          </Badge>
        )}
        
        {/* Quick Add to Cart Button */}
        {product.countInStock > 0 && (
          <Button
            variant="primary"
            size="sm"
            className="position-absolute bottom-0 start-0 m-2"
            onClick={addToCartHandler}
            disabled={isAdding}
          >
            {isAdding ? (
              <>
                <i className="fas fa-spinner fa-spin me-1"></i>
                Adding...
              </>
            ) : (
              <>
                <i className="fas fa-cart-plus me-1"></i>
                Quick Add
              </>
            )}
          </Button>
        )}
      </div>

      <Card.Body className='product-info d-flex flex-column'>
        <Link to={`/product/${product._id}`} className="text-decoration-none">
          <Card.Title className='product-title text-dark'>
            {product.name}
          </Card.Title>
        </Link>

        <div className="product-rating mb-2">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </div>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <Card.Text className='product-price mb-0'>
            ${product.price}
          </Card.Text>
          <Badge bg="secondary" className="text-white">
            {product.brand}
          </Badge>
        </div>

        <Card.Text className='text-muted small mb-3 flex-grow-1'>
          {product.description.length > 100 
            ? `${product.description.substring(0, 100)}...` 
            : product.description
          }
        </Card.Text>

        <div className="product-actions mt-auto">
          <Link to={`/product/${product._id}`} className="w-100">
            <Button variant="outline-primary" className="w-100">
              <i className="fas fa-eye me-1"></i>
              View Details
            </Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  )
}

export default Product
