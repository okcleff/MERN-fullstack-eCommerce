// lib
import { useQuery } from "@tanstack/react-query";

// components
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";

// APIs
import { getProducts } from "../modules/api";

// types
import { IProduct, ApiError } from "../types";

interface ProductData {
  data: {
    products: IProduct[];
  };
}

const MainPage = () => {
  const { data, error, isLoading } = useQuery<ProductData, ApiError>(
    ["product"],
    getProducts
  );

  if (isLoading) return <Loader />;

  if (error) {
    return <Message variant="danger">{error.response.data.message}</Message>;
  }

  return (
    <>
      <h1>Latest Products</h1>

      <Row>
        {data?.data.products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default MainPage;
