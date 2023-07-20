import { useNavigate } from "react-router-dom";

// components
import { Navbar, Nav, NavDropdown, Container, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SearchBox from "./SearchBox";

// lib
import { useMutation } from "@tanstack/react-query";

// redux
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";

// assets
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";

// APIs
import { postLogout } from "../modules/api";

// types
import { ICart, IUserInfo } from "../types";

const Header = () => {
  const { cartItems } = useSelector((state: { cart: ICart }) => state.cart);
  const { userInfo } = useSelector(
    (state: { auth: { userInfo: IUserInfo } }) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate: mutateLogout } = useMutation(postLogout, {
    onSuccess: () => {
      dispatch(logout());
      navigate("/login");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                src={logo}
                alt="OKmall"
                style={{ width: "30px", height: "30px", marginRight: "5px" }}
              />

              <span>OKmall</span>
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <SearchBox />

              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                      {cartItems.reduce((acc, curr) => acc + curr.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={() => mutateLogout()}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}

              {/* Admin Links */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
