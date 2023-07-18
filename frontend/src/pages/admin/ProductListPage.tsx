import { useParams } from "react-router-dom";

// lib
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

// components
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Paginate from "../../components/Paginate";

// functions
import { numberWithCommas } from "../../utils/numberWithCommas";

// assets
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

// APIs
import { getProducts } from "../../modules/api";

// types
import { IProduct, ApiError } from "../../types";

interface ProductData {
  data: {
    products: IProduct[];
    pages: number;
    page: number;
  };
}

const ProductListPage = () => {
  const { pageNumber } = useParams();

  const { data, error, isLoading, refetch } = useQuery<ProductData, ApiError>(
    ["product"],
    getProducts
  );

  if (isLoading) return <Loader />;

  if (error) {
    return <Message variant="danger">{error.response.data.message}</Message>;
  }

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button
            className="my-3"
            //  onClick={createProductHandler}
          >
            <FaPlus /> Create Product
          </Button>
        </Col>
      </Row>

      <>
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {data.data.products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>₩ {numberWithCommas(product.price)}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm mx-2">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    // onClick={() => deleteHandler(product._id)}
                  >
                    <FaTrash style={{ color: "white" }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Paginate pages={data.data.pages} page={data.data.page} isAdmin />
      </>
    </>
  );
};

export default ProductListPage;
