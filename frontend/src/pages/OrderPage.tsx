import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// lib
import { useQuery, useMutation } from "@tanstack/react-query";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";

// redux
import { useSelector } from "react-redux";

// components
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";

// functions
import { numberWithCommas } from "../utils/numberWithCommas";

// APIs
import {
  getOrderDetails,
  putOrderToPaid,
  putOrderDelivery,
  getPaypalClientId,
} from "../modules/api";

// types
import { IUserInfo, ICartItem, ApiError } from "../types";

interface IOrderResponse {
  data: {
    _id: string;
    orderItems: ICartItem[];
    shippingAddress: {
      address: string;
      city: string;
      postalCode: string;
      country: string;
    };
    paymentMethod: string;
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
    isPaid: boolean;
    isDelivered: boolean;
    user: {
      _id: string;
      name: string;
      email: string;
    };
    paidAt: string;
    deliveredAt: string;
  };
}

interface IPaidOrderResponse {
  data: {
    isPaid: boolean;
  };
}

const OrderPage = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useQuery<IOrderResponse, ApiError>(["order"], () =>
    getOrderDetails(orderId as string)
  );

  const { mutate: payOrder, isLoading: loadingPay } = useMutation<
    IPaidOrderResponse,
    ApiError,
    { id: string; details: any }
  >(putOrderToPaid, {
    onSuccess: () => {
      refetch();
      toast.success("Order is paid");
    },
    onError: (error: { response: { data: { message: string } } }) => {
      toast.error(error.response.data.message);
    },
  });

  const { mutate: deliverOrder, isLoading: loadingDeliver } = useMutation(
    putOrderDelivery,
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const {
    data: paypal,
    isLoading: loadingPaypal,
    error: errorPaypal,
  } = useQuery<{ data: { clientId: string } }>(["paypal"], getPaypalClientId);

  const { userInfo } = useSelector(
    (state: { auth: { userInfo: IUserInfo } }) => state.auth
  );

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  useEffect(() => {
    if (!errorPaypal && !loadingPaypal && paypal?.data.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            clientId: paypal.data.clientId,
            currency: "USD",
          },
        });
      };

      if (order && !order.data.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [
    errorPaypal,
    loadingPaypal,
    order,
    paypal?.data.clientId,
    paypalDispatch,
  ]);

  function onApprove(data: any, actions: any) {
    return actions.order.capture().then(async function (details: any) {
      payOrder({ id: orderId as string, details });
    });
  }

  function onError(err: any) {
    toast.error(err.message);
  }

  function createOrder(data: any, actions: any) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order?.data.totalPrice },
          },
        ],
      })
      .then((orderID: string) => {
        return orderID;
      });
  }

  const deliverHandler = async () => {
    deliverOrder(orderId as string);
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error.response.data.message}</Message>
  ) : (
    <>
      <h1>Order {order.data._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.data.user.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order.data.user.email}`}>
                  {order.data.user.email}
                </a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.data.shippingAddress.address},{" "}
                {order.data.shippingAddress.city}{" "}
                {order.data.shippingAddress.postalCode},{" "}
                {order.data.shippingAddress.country}
              </p>
              {order.data.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.data.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.data.paymentMethod}
              </p>
              {order.data.isPaid ? (
                <Message variant="success">Paid on {order.data.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.data.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.data.orderItems.map((item, index) => (
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

                        <Col md={4}>
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
                  <Col>₩{numberWithCommas(order.data.itemsPrice)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>₩{numberWithCommas(order.data.shippingPrice)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>₩{numberWithCommas(order.data.taxPrice)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>₩{numberWithCommas(order.data.totalPrice)}</Col>
                </Row>
              </ListGroup.Item>

              {!order.data.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}

                  {isPending ? (
                    <Loader />
                  ) : (
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    />
                  )}
                </ListGroup.Item>
              )}

              {loadingDeliver && <Loader />}

              {userInfo &&
                userInfo.isAdmin &&
                order.data.isPaid &&
                !order.data.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderPage;
