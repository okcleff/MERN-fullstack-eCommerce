import { Link } from "react-router-dom";

// lib
import { useQuery } from "@tanstack/react-query";

// components
import { Carousel, Image } from "react-bootstrap";
import Message from "./Message";

// APIs
import { getTopProducts } from "../modules/api";

// types
import { IProduct, ApiError } from "../types";

interface ITopProductResponse {
  data: IProduct[];
}

const ProductCarousel = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery<ITopProductResponse, ApiError>(
    ["getTopProducts"],
    getTopProducts
  );

  if (isLoading) return null;

  if (error)
    return <Message variant="danger">{error.response.data.message}</Message>;

  return (
    <Carousel pause="hover" className="bg-primary mb-4">
      {products.data.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />

            <Carousel.Caption className="carousel-caption">
              <h2 className="text-white text-right">
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
