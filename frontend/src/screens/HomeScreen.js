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
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    // If a category is selected, use it as a keyword for server-side filtering
    const searchKeyword = selectedCategory !== 'all' ? selectedCategory : keyword;
    dispatch(listProducts(searchKeyword, pageNumber));
  }, [dispatch, keyword, pageNumber, selectedCategory]);

  // Update price range when products load
  useEffect(() => {
    if (products && products.length > 0) {
      const newMinPrice = Math.min(...products.map(p => p.price));
      const newMaxPrice = Math.max(...products.map(p => p.price));
      setPriceRange([newMinPrice, newMaxPrice]);
    }
  }, [products]);

  // Reset category filter if "Electronics" is selected (since this is an electronics shop)
  useEffect(() => {
    if (selectedCategory === 'electronics') {
      setSelectedCategory('all');
    }
  }, [selectedCategory]);

  // Get unique categories, brands, and calculate price range from current products
  const categories = products 
    ? [...new Set(products.map(product => product.category))].filter(category => 
        category.toLowerCase() !== 'electronics'
      )
    : [];
  const brands = products ? [...new Set(products.map(product => product.brand))] : [];
  const maxPrice = products && products.length > 0 ? Math.max(...products.map(p => p.price)) : 1000;
  const minPrice = products && products.length > 0 ? Math.min(...products.map(p => p.price)) : 0;

  // Filter products based on selected criteria
  const filteredProducts = products ? products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || 
      (selectedCategory !== 'electronics' && product.category.toLowerCase().includes(selectedCategory.toLowerCase()));
    const matchesBrand = selectedBrand === 'all' || 
      product.brand.toLowerCase() === selectedBrand.toLowerCase();
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesRating = selectedRating === 'all' || 
      (product.rating >= parseInt(selectedRating) && product.rating < parseInt(selectedRating) + 1);
    
    return matchesCategory && matchesBrand && matchesPrice && matchesRating;
  }) : [];

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  const handleBrandFilter = (brand) => {
    setSelectedBrand(brand);
  };

  const handleRatingFilter = (rating) => {
    setSelectedRating(rating);
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSelectedRating('all');
    setPriceRange([minPrice || 0, maxPrice || 1000]);
  };

  return (
    <>
      <Meta />
      
      {/* Hero Section with Carousel */}
      {!keyword && selectedCategory === 'all' ? (
        <div className="mb-4">
          <div className="hero-section text-center py-5 bg-gradient-primary text-white">
            <Container>
                             <h1 className="display-4 fw-bold mb-3">
                 <i className="fas fa-microchip me-3"></i>
                 Welcome to E-Shop
               </h1>
                             <p className="lead mb-4">
                 Discover the latest in electronics - from smartphones to smart home devices
               </p>
              <div className="hero-stats d-flex justify-content-center gap-4 mb-4">
                <div className="stat-item">
                  <i className="fas fa-shipping-fast fa-2x mb-2"></i>
                  <div className="fw-bold">Free Shipping</div>
                  <small>On orders over $50</small>
                </div>
                <div className="stat-item">
                  <i className="fas fa-shield-alt fa-2x mb-2"></i>
                  <div className="fw-bold">Secure Payment</div>
                  <small>100% protected</small>
                </div>
                <div className="stat-item">
                  <i className="fas fa-undo fa-2x mb-2"></i>
                  <div className="fw-bold">Easy Returns</div>
                  <small>30-day guarantee</small>
                </div>
              </div>
            </Container>
          </div>
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

      {/* Advanced Filters */}
      {!keyword && (
        <Container className="mb-4">
          <div className="filters-section">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">
                <i className="fas fa-filter me-2"></i>
                Filters
              </h5>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <i className={`fas fa-chevron-${showFilters ? 'up' : 'down'} me-1`}></i>
                {showFilters ? 'Hide' : 'Show'} Filters
              </Button>
            </div>
            
            {showFilters && (
              <div className="filters-content">
                <Row>
                  {/* Category Filter */}
                  <Col md={3} className="mb-3">
                    <div className="filter-group">
                      <label className="form-label fw-bold">Category</label>
                      <div className="d-flex flex-column gap-1">
                        <Button
                          variant={selectedCategory === 'all' ? 'primary' : 'outline-primary'}
                          size="sm"
                          onClick={() => handleCategoryFilter('all')}
                          className="text-start"
                        >
                          <i className="fas fa-th-large me-2"></i>
                          All Categories
                        </Button>
                        {categories.map((category) => (
                          <Button
                            key={category}
                            variant={selectedCategory === category.toLowerCase() ? 'primary' : 'outline-primary'}
                            size="sm"
                            onClick={() => handleCategoryFilter(category.toLowerCase())}
                            className="text-start"
                          >
                            <i className="fas fa-tag me-2"></i>
                            {category}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </Col>

                  {/* Brand Filter */}
                  <Col md={3} className="mb-3">
                    <div className="filter-group">
                      <label className="form-label fw-bold">Brand</label>
                      <div className="d-flex flex-column gap-1">
                        <Button
                          variant={selectedBrand === 'all' ? 'primary' : 'outline-primary'}
                          size="sm"
                          onClick={() => handleBrandFilter('all')}
                          className="text-start"
                        >
                          <i className="fas fa-crown me-2"></i>
                          All Brands
                        </Button>
                        {brands.map((brand) => (
                          <Button
                            key={brand}
                            variant={selectedBrand === brand.toLowerCase() ? 'primary' : 'outline-primary'}
                            size="sm"
                            onClick={() => handleBrandFilter(brand.toLowerCase())}
                            className="text-start"
                          >
                            <i className="fas fa-trademark me-2"></i>
                            {brand}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </Col>

                  {/* Price Range Filter */}
                  <Col md={3} className="mb-3">
                    <div className="filter-group">
                      <label className="form-label fw-bold">Price Range</label>
                      <div className="price-range">
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted">${priceRange[0]}</span>
                          <span className="text-muted">${priceRange[1]}</span>
                        </div>
                        <input
                          type="range"
                          className="form-range"
                          min={minPrice}
                          max={maxPrice}
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        />
                        <input
                          type="range"
                          className="form-range"
                          min={minPrice}
                          max={maxPrice}
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        />
                      </div>
                    </div>
                  </Col>

                  {/* Rating Filter */}
                  <Col md={3} className="mb-3">
                    <div className="filter-group">
                      <label className="form-label fw-bold">Rating</label>
                      <div className="d-flex flex-column gap-1">
                        <Button
                          variant={selectedRating === 'all' ? 'primary' : 'outline-primary'}
                          size="sm"
                          onClick={() => handleRatingFilter('all')}
                          className="text-start"
                        >
                          <i className="fas fa-star me-2"></i>
                          All Ratings
                        </Button>
                        {[4, 3, 2, 1].map((rating) => (
                          <Button
                            key={rating}
                            variant={selectedRating === rating.toString() ? 'primary' : 'outline-primary'}
                            size="sm"
                            onClick={() => handleRatingFilter(rating.toString())}
                            className="text-start"
                          >
                            <i className="fas fa-star me-2"></i>
                            {rating}+ Stars
                          </Button>
                        ))}
                      </div>
                    </div>
                  </Col>
                </Row>

                {/* Clear Filters */}
                <div className="text-center mt-3">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={clearFilters}
                  >
                    <i className="fas fa-times me-2"></i>
                    Clear All Filters
                  </Button>
                </div>
              </div>
            )}
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
          <div className="d-flex align-items-center gap-2">
            {filteredProducts && filteredProducts.length > 0 && (
              <Badge bg="info" className="fs-6">
                {filteredProducts.length} of {products.length} products
              </Badge>
            )}
            {products && products.length > 0 && (
              <Badge bg="primary" className="fs-6">
                {products.length} total products
              </Badge>
            )}
          </div>
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
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-5">
            <i className="fas fa-filter fa-3x text-muted mb-3"></i>
            <h3 className="text-muted">No products match your filters</h3>
            <p className="text-muted">
              Try adjusting your filter criteria to see more products
            </p>
            <Button
              variant="primary"
              onClick={clearFilters}
              className="me-2"
            >
              <i className="fas fa-times me-2"></i>
              Clear Filters
            </Button>
            <Link to="/" className="btn btn-outline-primary">
              <i className="fas fa-home me-2"></i>
              Browse All Products
            </Link>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <Row>
              {filteredProducts && filteredProducts.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="mb-4">
                  <Product product={product} />
                </Col>
              ))}
            </Row>

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
      {!keyword && selectedCategory === 'all' && !loading && categories.length > 0 && (
        <Container className="mt-5">
          <h2 className="text-center mb-4">Shop by Category</h2>
          <Row>
            {categories.slice(0, 4).map((category, index) => (
              <Col key={index} xs={6} md={3} className="mb-3">
                <Card className="text-center h-100 category-card">
                  <Card.Body>
                    <i className="fas fa-tag fa-2x text-primary mb-3"></i>
                    <Card.Title className="h6">{category}</Card.Title>
                    <Button 
                      variant="outline-primary"
                      size="sm"
                      className="mt-2"
                      onClick={() => handleCategoryFilter(category.toLowerCase())}
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
