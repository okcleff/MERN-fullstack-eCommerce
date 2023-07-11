import { useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

// redux
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../slices/cartSlice";

// types
import { ICart } from "../types";

const ShippingPage = () => {
  const cart = useSelector((state: { cart: ICart }) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e: any) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 />

      <h1>배송 정보</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="address">
          <Form.Label>주소</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="city">
          <Form.Label>도시</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="postalCode">
          <Form.Label>우편번호</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="country">
          <Form.Label>국가</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          결제하기
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
