import React from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect className="shadow-sm">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="fw-bold fs-4">
              <i className="fas fa-laptop me-2"></i>
              ProShop
            </Navbar.Brand>
          </LinkContainer>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route render={({ history }) => <SearchBox history={history} />} />
            
            <Nav className="ms-auto align-items-center">
              {/* Quick Actions */}
              <div className="d-none d-lg-flex me-3">
                <LinkContainer to="/search/phone" className="me-2">
                  <Nav.Link className="btn btn-outline-light btn-sm">
                    <i className="fas fa-mobile-alt me-1"></i>
                    Phones
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/search/laptop" className="me-2">
                  <Nav.Link className="btn btn-outline-light btn-sm">
                    <i className="fas fa-laptop me-1"></i>
                    Laptops
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/search/camera">
                  <Nav.Link className="btn btn-outline-light btn-sm">
                    <i className="fas fa-camera me-1"></i>
                    Cameras
                  </Nav.Link>
                </LinkContainer>
              </div>

              {/* Cart with Badge */}
              <LinkContainer to="/cart" className="me-3">
                <Nav.Link className="position-relative">
                  <i className="fas fa-shopping-cart fs-5"></i>
                  {cartItems.length > 0 && (
                    <Badge 
                      bg="danger" 
                      className="position-absolute top-0 start-100 translate-middle rounded-pill"
                      style={{ fontSize: '0.7rem', minWidth: '18px', height: '18px' }}
                    >
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </Badge>
                  )}
                  <span className="ms-1 d-none d-sm-inline">Cart</span>
                </Nav.Link>
              </LinkContainer>

              {/* User Menu */}
              {userInfo ? (
                <NavDropdown 
                  title={
                    <span>
                      <i className="fas fa-user-circle me-1"></i>
                      {userInfo.name}
                    </span>
                  } 
                  id="username"
                  className="me-2"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>
                      <i className="fas fa-user me-2"></i>
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orders">
                    <NavDropdown.Item>
                      <i className="fas fa-list me-2"></i>
                      My Orders
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    <i className="fas fa-sign-out-alt me-2"></i>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login" className="me-2">
                  <Nav.Link>
                    <i className="fas fa-sign-in-alt me-1"></i>
                    <span className="d-none d-sm-inline">Sign In</span>
                  </Nav.Link>
                </LinkContainer>
              )}

              {/* Admin Menu */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown 
                  title={
                    <span>
                      <i className="fas fa-cog me-1"></i>
                      Admin
                    </span>
                  } 
                  id="adminmenu"
                  className="me-2"
                >
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>
                      <i className="fas fa-users me-2"></i>
                      Users
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>
                      <i className="fas fa-box me-2"></i>
                      Products
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>
                      <i className="fas fa-list-alt me-2"></i>
                      Orders
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Mobile Quick Actions */}
      <div className="d-lg-none bg-light py-2 border-bottom">
        <Container>
          <div className="d-flex justify-content-between">
            <LinkContainer to="/search/phone">
              <Nav.Link className="btn btn-outline-primary btn-sm">
                <i className="fas fa-mobile-alt me-1"></i>
                Phones
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/search/laptop">
              <Nav.Link className="btn btn-outline-primary btn-sm">
                <i className="fas fa-laptop me-1"></i>
                Laptops
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/search/camera">
              <Nav.Link className="btn btn-outline-primary btn-sm">
                <i className="fas fa-camera me-1"></i>
                Cameras
              </Nav.Link>
            </LinkContainer>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
