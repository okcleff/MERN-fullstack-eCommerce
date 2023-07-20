import { Link, useParams } from "react-router-dom";

// lib
import { useQuery } from "@tanstack/react-query";

// components
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

// APIs
import { getProducts } from "../modules/api";

// types
import { IProduct, ApiError } from "../types";

interface ProductData {
  data: {
    products: IProduct[];
    pages: number;
    page: number;
  };
}

const MainPage = () => {
  const { pageNumber, keyword } = useParams();

  const { data, error, isLoading } = useQuery<ProductData, ApiError>(
    ["product", pageNumber, keyword],
    () => getProducts(keyword || "", pageNumber || "1"),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) return <Loader />;

  if (error) {
    return <Message variant="danger">{error.response.data.message}</Message>;
  }

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      )}

      <h1>Latest Products</h1>

      <Row>
        {data?.data.products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>

      <Paginate
        pages={data.data.pages}
        page={data.data.page}
        keyword={keyword ? keyword : ""}
      />
    </>
  );
};

export default MainPage;
