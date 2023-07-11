import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

interface CheckoutStepsProps {
  step1?: boolean;
  step2?: boolean;
  step3?: boolean;
}

const CheckoutSteps: React.FC<CheckoutStepsProps> = ({
  step1,
  step2,
  step3,
}) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>배송정보 입력</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>배송정보 입력</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/payment">
            <Nav.Link>결제정보 입력</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>결제정보 입력</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>주문하기</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>주문하기</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
