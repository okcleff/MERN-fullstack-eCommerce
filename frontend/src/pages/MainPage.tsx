import React, { useEffect, useState } from "react";

// lib
import axios from "axios";

// components
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";

// types
import { ProductType } from "../types";

const MainPage = () => {
  const [products, setProducts] = useState<ProductType[] | []>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1>Latest Products</h1>

      <Row>
        {products?.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default MainPage;
