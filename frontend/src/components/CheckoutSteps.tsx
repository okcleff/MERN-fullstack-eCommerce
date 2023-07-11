import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const STEPS = {
  step1: "배송정보 입력",
  step2: "결제정보 입력",
  step3: "주문하기",
};

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
            <Nav.Link>{STEPS.step1}</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>{STEPS.step1}</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/payment">
            <Nav.Link>{STEPS.step2}</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>{STEPS.step2}</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>{STEPS.step3}</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>{STEPS.step3}</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
