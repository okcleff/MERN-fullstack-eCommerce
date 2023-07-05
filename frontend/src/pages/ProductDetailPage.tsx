import React from "react";
import { useParams, Link } from "react-router-dom";

// lib
import { useQuery } from "@tanstack/react-query";

// components
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";

// functions
import { numberWithCommas } from "../functions/numberWithCommas";

// APIs
import { getProductDetails } from "../modules/api";

// types
import { IProduct } from "../types";

interface ProductData {
  data: IProduct;
}

interface ApiError {
  response: {
    data: {
      message: string;
    };
  };
}

const ProductDetailPage = () => {
  const { productId } = useParams();

  const { data, error, isLoading } = useQuery<ProductData, ApiError>(
    ["productDetail"],
    () => getProductDetails(productId as string)
  );

  if (isLoading) return <Loader />;

  if (error) {
    return <Message variant="danger">{error.response.data.message}</Message>;
  }

  const { image, name, rating, numReviews, price, description, countInStock } =
    data.data;

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      <Row>
        <Col md={5}>
          <Image src={image} alt={name} fluid />
        </Col>

        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating value={rating} text={`${numReviews} reviews`} />
            </ListGroup.Item>

            <ListGroup.Item>Price: ₩{numberWithCommas(price)}</ListGroup.Item>

            <ListGroup.Item>{description}</ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>₩{numberWithCommas(price)}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>{countInStock > 0 ? "In Stock" : "Out Of Stock"}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetailPage;
