import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Container, Button, Badge, Card } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import { listProducts } from "../actions/productActions";
import Meta from "../components/Meta";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const [selectedCategory, setSelectedCategory] = useState('all');

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    // If a category is selected, use it as a keyword for server-side filtering
    const searchKeyword = selectedCategory !== 'all' ? selectedCategory : keyword;
    dispatch(listProducts(searchKeyword, pageNumber));
  }, [dispatch, keyword, pageNumber, selectedCategory]);

  // Quick action categories - these will trigger server-side searches
  const quickCategories = [
    { name: 'Phones', icon: 'fas fa-mobile-alt', searchTerm: 'phone' },
    { name: 'Laptops', icon: 'fas fa-laptop', searchTerm: 'laptop' },
    { name: 'Cameras', icon: 'fas fa-camera', searchTerm: 'camera' },
    { name: 'Gaming', icon: 'fas fa-gamepad', searchTerm: 'gaming' },
    { name: 'Audio', icon: 'fas fa-headphones', searchTerm: 'headphones' },
    { name: 'Smart Home', icon: 'fas fa-home', searchTerm: 'smart' }
  ];

  // Get unique categories from current products for filtering
  const categories = products ? [...new Set(products.map(product => product.category))] : [];

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <Meta />
      
      {/* Hero Section with Carousel */}
      {!keyword && selectedCategory === 'all' ? (
        <div className="mb-4">
          <ProductCarousel />
        </div>
      ) : (
        <div className="mb-4">
          <Link to="/" className="btn btn-outline-primary">
            <i className="fas fa-arrow-left me-2"></i>
            Back to Home
          </Link>
          <h2 className="mt-3">
            {keyword ? `Search Results for "${keyword}"` : 
             selectedCategory !== 'all' ? `${selectedCategory} Products` : 'All Products'}
          </h2>
        </div>
      )}

      {/* Quick Actions */}
      {!keyword && selectedCategory === 'all' && (
        <Container className="mb-4">
          <div className="quick-actions">
            {quickCategories.map((cat, index) => (
              <Button 
                key={index}
                variant="outline-primary"
                size="sm"
                onClick={() => handleCategoryFilter(cat.searchTerm)}
                className="quick-action-btn"
              >
                <i className={cat.icon}></i>
                {cat.name}
              </Button>
            ))}
          </div>
        </Container>
      )}

      {/* Category Filter */}
      {!keyword && categories.length > 0 && (
        <Container className="mb-4">
          <div className="d-flex flex-wrap gap-2 align-items-center">
            <span className="text-muted me-2">Filter by:</span>
            <Button
              variant={selectedCategory === 'all' ? 'primary' : 'outline-primary'}
              size="sm"
              onClick={() => handleCategoryFilter('all')}
            >
              All Products
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category.toLowerCase() ? 'primary' : 'outline-primary'}
                size="sm"
                onClick={() => handleCategoryFilter(category.toLowerCase())}
              >
                {category}
              </Button>
            ))}
          </div>
        </Container>
      )}

      {/* Products Section */}
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">
            {keyword ? `Search Results` : 
             selectedCategory !== 'all' ? `${selectedCategory} Products` : 'Latest Products'}
          </h1>
          {products && products.length > 0 && (
            <Badge bg="primary" className="fs-6">
              {products.length} products
            </Badge>
          )}
        </div>

        {loading ? (
          <div className="text-center">
            <Loader />
          </div>
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : !products || products.length === 0 ? (
          <div className="text-center py-5">
            <i className="fas fa-search fa-3x text-muted mb-3"></i>
            <h3 className="text-muted">No products found</h3>
            <p className="text-muted">
              {keyword 
                ? `No products match your search for "${keyword}"`
                : selectedCategory !== 'all'
                ? `No products available in ${selectedCategory} category`
                : 'No products available'
              }
            </p>
            <Link to="/" className="btn btn-primary">
              <i className="fas fa-home me-2"></i>
              Browse All Products
            </Link>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="product-grid">
              {products && products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-5">
              <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ""}
              />
            </div>
          </>
        )}
      </Container>

      {/* Featured Categories */}
      {!keyword && selectedCategory === 'all' && !loading && (
        <Container className="mt-5">
          <h2 className="text-center mb-4">Shop by Category</h2>
          <Row>
            {quickCategories.slice(0, 4).map((cat, index) => (
              <Col key={index} xs={6} md={3} className="mb-3">
                <Card className="text-center h-100 category-card">
                  <Card.Body>
                    <i className={`${cat.icon} fa-2x text-primary mb-3`}></i>
                    <Card.Title className="h6">{cat.name}</Card.Title>
                    <Button 
                      variant="outline-primary"
                      size="sm"
                      className="mt-2"
                      onClick={() => handleCategoryFilter(cat.searchTerm)}
                    >
                      Browse
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default HomeScreen;
