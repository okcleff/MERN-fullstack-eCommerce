// lib
import { useQuery } from "@tanstack/react-query";

// components
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

// APIs
import { getAllOrders } from "../../modules/api";

// functions
import { numberWithCommas } from "../../utils/numberWithCommas";

// assets
import { FaTimes } from "react-icons/fa";

// types
import { ICartItem, ApiError } from "../../types";

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
    createdAt: string;
  }[];
}

const OrderListPage = () => {
  // const { data: orders, isLoading, error } = useGetOrdersQuery();

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery<IOrderResponse, ApiError>(["allOrders"], getAllOrders);

  if (isLoading) return <Loader />;

  if (error)
    return <Message variant="danger">{error.response.data.message}</Message>;

  return (
    <>
      <h1>Orders</h1>

      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>USER</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.data.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user && order.user.name}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>₩ {numberWithCommas(order.totalPrice)}</td>
              <td>
                {order.isPaid ? (
                  order.paidAt.substring(0, 10)
                ) : (
                  <FaTimes style={{ color: "red" }} />
                )}
              </td>
              <td>
                {order.isDelivered ? (
                  order.deliveredAt.substring(0, 10)
                ) : (
                  <FaTimes style={{ color: "red" }} />
                )}
              </td>
              <td>
                <LinkContainer to={`/order/${order._id}`}>
                  <Button variant="light" className="btn-sm">
                    Details
                  </Button>
                </LinkContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default OrderListPage;
