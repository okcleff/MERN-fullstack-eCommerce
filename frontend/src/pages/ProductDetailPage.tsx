import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

// lib
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

// components
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";

// redux
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";

// functions
import { numberWithCommas } from "../utils/numberWithCommas";

// APIs
import { getProductDetails, postNewProductReview } from "../modules/api";

// types
import { IUserInfo, IProduct, ApiError } from "../types";

interface ProductData {
  data: IProduct;
}
const ProductDetailPage = () => {
  const { productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector(
    (state: { auth: { userInfo: IUserInfo } }) => state.auth
  );

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    error,
    isLoading,
    refetch,
  } = useQuery<ProductData, ApiError>(["productDetail"], () =>
    getProductDetails(productId as string)
  );

  const { mutate: newProductReviewMutate, isLoading: loadingProductReview } =
    useMutation(postNewProductReview, {
      onSuccess: () => {
        toast.success("Review created successfully");
        refetch();
      },
      onError: (error: ApiError) => {
        toast.error(error.response.data.message);
      },
    });

  if (isLoading) return <Loader />;

  if (error) {
    return <Message variant="danger">{error.response.data.message}</Message>;
  }

  const {
    image,
    name,
    rating: productRating,
    reviews,
    numReviews,
    price,
    description,
    countInStock,
  } = product.data;

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product.data, qty }));
    navigate("/cart");
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();

    newProductReviewMutate({
      id: productId as string,
      rating,
      comment,
    });
    refetch();
  };

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
              <Rating value={productRating} text={`${numReviews} reviews`} />
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

              {countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                      >
                        {[...Array(countInStock).keys()].map((i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={countInStock === 0}
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>

      <Row className="review">
        <Col md={6}>
          <h2>Reviews</h2>

          {reviews.length === 0 && <Message>No Reviews</Message>}

          <ListGroup variant="flush">
            {reviews.map((review) => (
              <ListGroup.Item key={review._id}>
                <strong>{review.name}</strong>

                <Rating value={review.rating} />

                <p>{review.createdAt.substring(0, 10)}</p>

                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}

            <ListGroup.Item>
              <h2>Write a Customer Review</h2>

              {loadingProductReview && <Loader />}

              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group className="my-2" controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as="select"
                      required
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                    >
                      <option value="">Select...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group className="my-2" controlId="comment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Button
                    disabled={loadingProductReview}
                    type="submit"
                    variant="primary"
                  >
                    Submit
                  </Button>
                </Form>
              ) : (
                <Message>
                  Please <Link to="/login">sign in</Link> to write a review
                </Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetailPage;
