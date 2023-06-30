import React from "react";
import { Link } from "react-router-dom";

// components
import { Card } from "react-bootstrap";
import Rating from "./Rating";

// types
import { ProductType } from "../types";

interface ProductProps {
  product: ProductType;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const { _id, image, name, price } = product;

  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${_id}`}>
        <Card.Img src={image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${_id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h4">₩{price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
