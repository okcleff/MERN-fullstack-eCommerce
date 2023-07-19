import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// lib
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

// components
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";

// APIs
import {
  getProductDetails,
  putProduct,
  uploadProductImage,
} from "../../modules/api";

// types
import { IProduct, ApiError } from "../../types";

interface ProductData {
  data: IProduct;
}

interface IUpdateProductResponse {
  data: IProduct;
}

const ProductEditPage = () => {
  const navigate = useNavigate();

  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useQuery<ProductData, ApiError>(["getProductById"], () =>
    getProductDetails(productId as string)
  );

  const { mutate: updateProductMutation, isLoading: loadingUpdate } =
    useMutation<
      IUpdateProductResponse,
      ApiError,
      {
        id: string;
        name: string;
        price: number;
        description: string;
        image: string;
        brand: string;
        category: string;
        countInStock: number;
      }
    >(putProduct, {
      onSuccess: () => {
        toast.success("Product updated");
        refetch();
        navigate("/admin/productlist");
      },
      onError: (error) => {
        toast.error(error.response.data.message);
      },
    });

  const submitHandler = (e: any) => {
    e.preventDefault();

    updateProductMutation({
      id: productId as string,
      name,
      price,
      image,
      brand,
      category,
      description,
      countInStock,
    });
  };

  const { mutate: uploadImage, isLoading: loadingUpload } = useMutation(
    uploadProductImage,
    {
      onSuccess: (res) => {
        toast.success(res.data.message);
        setImage(res.data.image);
      },
      onError: (error: ApiError) => {
        toast.error(error.response.data.message);
      },
    }
  );

  const uploadFileHandler = (e: any) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    uploadImage(formData);
  };

  useEffect(() => {
    if (product) {
      const { name, price, image, brand, category, countInStock, description } =
        product.data;

      setName(name);
      setPrice(price);
      setImage(image);
      setBrand(brand);
      setCategory(category);
      setCountInStock(countInStock);
      setDescription(description);
    }
  }, [product]);

  if (isLoading) return <Loader />;

  if (error)
    return <Message variant="danger">{error.response.data.message}</Message>;

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit Product</h1>

        {loadingUpdate && <Loader />}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
            <Form.Control
              onChange={uploadFileHandler}
              type="file"
            ></Form.Control>
            {loadingUpload && <Loader />}
          </Form.Group>

          <Form.Group controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="countInStock">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter countInStock"
              value={countInStock}
              onChange={(e) => setCountInStock(Number(e.target.value))}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" style={{ marginTop: "1rem" }}>
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProductEditPage;
