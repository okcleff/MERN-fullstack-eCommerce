// lib
import { useQuery } from "@tanstack/react-query";

// components
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";

// APIs
import { getProducts } from "../modules/api";

// types
import { IProduct } from "../types";

interface ProductData {
  data: {
    products: IProduct[];
  };
}

interface ApiError {
  response: {
    data: {
      message: string;
    };
  };
}

const MainPage = () => {
  const { data, error, isLoading } = useQuery<ProductData, ApiError>(
    ["product"],
    getProducts
  );

  if (isLoading) return <h2>Loading...</h2>;

  if (error) {
    return <h2>{error.response.data.message}</h2>;
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
