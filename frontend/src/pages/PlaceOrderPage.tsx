import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// lib
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

// components
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import Loader from "../components/Loader";

// redux
import { useDispatch, useSelector } from "react-redux";
import { clearCartItems } from "../slices/cartSlice";

// APIs
import { createOrder } from "../modules/api";

// functions
import { numberWithCommas } from "../utils/numberWithCommas";

// types
import { ICart, IOrder } from "../types";

interface ICreateOrderResponse {
  data: { _id: string };
}

interface ApiError {
  response: {
    data: {
      message: string;
    };
  };
}

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state: { cart: ICart }) => state.cart);
  const {
    cartItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = cart;
  const { address, city, postalCode, country } = shippingAddress;

  const { mutate, isLoading } = useMutation<
    ICreateOrderResponse,
    ApiError,
    IOrder
  >(createOrder, {
    onSuccess: (response) => {
      dispatch(clearCartItems());
      navigate(`/order/${response.data._id}`);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  useEffect(() => {
    if (!address || !city || !postalCode || !country) {
      navigate("/shipping");
    } else if (!paymentMethod) {
      navigate("/payment");
    }
  }, [paymentMethod, navigate, address, city, postalCode, country]);

  const placeOrderHandler = async () => {
    mutate({
      orderItems: cartItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>

              <p>
                <strong>Address:</strong>
                {address + " " + city + ", " + postalCode + ", " + country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>

              <strong>Method: </strong>

              {paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>

              {!cartItems.length ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={5}>
                          {item.qty} x ₩{numberWithCommas(item.price)} = ₩
                          {numberWithCommas(item.qty * item.price)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>₩{numberWithCommas(itemsPrice)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>₩{numberWithCommas(shippingPrice)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>₩{numberWithCommas(totalPrice)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>

                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderPage;
