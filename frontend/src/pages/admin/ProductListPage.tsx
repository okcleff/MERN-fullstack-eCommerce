import { useParams } from "react-router-dom";

// lib
import { useQuery, useMutation } from "@tanstack/react-query";
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
import { getProducts, postNewProduct, deleteProduct } from "../../modules/api";

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
  const { keyword, pageNumber } = useParams();

  const { data, error, isLoading, refetch } = useQuery<ProductData, ApiError>(
    ["product", pageNumber, keyword],
    () => getProducts(keyword || "", pageNumber || "1")
  );

  const { mutate: createProductMutation, isLoading: loadingCreate } =
    useMutation(postNewProduct, {
      onSuccess: () => {
        refetch();
      },
      onError: (error: ApiError) => {
        toast.error(error.response.data.message);
      },
    });

  const { mutate: deleteProductMutation, isLoading: loadingDelete } =
    useMutation(deleteProduct, {
      onSuccess: () => refetch(),
      onError: (error: ApiError) => {
        toast.error(error.response.data.message);
      },
    });

  if (isLoading) return <Loader />;

  if (error) {
    return <Message variant="danger">{error.response.data.message}</Message>;
  }

  const createProductHandler = () => {
    if (window.confirm("새로운 제품을 등록하시겠습니까?")) {
      createProductMutation();
    }
  };

  const deleteHandler = (id: string) => {
    if (window.confirm("제품을 삭제하시겠습니까?")) {
      deleteProductMutation(id);
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>제품 목록</h1>
        </Col>

        <Col className="text-end">
          <Button className="my-3" onClick={createProductHandler}>
            <FaPlus /> 새 제품 추가하기
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}

      {loadingDelete && <Loader />}

      <>
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>품명</th>
              <th>가격</th>
              <th>분류</th>
              <th>브랜드</th>
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
                    onClick={() => deleteHandler(product._id)}
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
