import { Link, useNavigate } from "react-router-dom";

// components
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";

// redux
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../slices/cartSlice";

// utils
import { numberWithCommas } from "../utils/numberWithCommas";

// assets
import { FaTrash } from "react-icons/fa";

// types
import { ICart, ICartItem } from "../types";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state: { cart: ICart }) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product: ICartItem, qty: number) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: "20px" }}>장바구니</h1>
        {cartItems.length === 0 ? (
          <Message>
            장바구니가 비어있습니다. <Link to="/">계속 쇼핑하기</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => {
              const { _id, image, name, price, qty, countInStock } = item;

              return (
                <ListGroup.Item key={_id}>
                  <Row>
                    <Col md={2}>
                      <Image src={image} alt={name} fluid rounded />
                    </Col>

                    <Col md={3}>
                      <Link to={`/product/${_id}`}>{name}</Link>
                    </Col>

                    <Col md={2}>₩ {numberWithCommas(price)}</Col>

                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) =>
                          addToCartHandler(item, Number(e.target.value))
                        }
                      >
                        {[...Array(countInStock).keys()].map((i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>

                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(_id)}
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>
                총 {cartItems.reduce((acc, item) => acc + item.qty, 0)} 개
              </h3>

              <h6>배송비: ₩ {numberWithCommas(cart.shippingPrice)}</h6>

              <h6>
                예상 결제 금액: ₩{" "}
                {numberWithCommas(
                  cartItems.reduce(
                    (acc, item) => acc + item.qty * item.price,
                    0
                  )
                )}
              </h6>
            </ListGroup.Item>

            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
                style={{ marginRight: 10 }}
              >
                결제하기
              </Button>

              <Button
                type="button"
                className="btn-block"
                variant="light"
                onClick={() => navigate("/")}
              >
                계속 쇼핑하기
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartPage;
