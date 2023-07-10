import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// lib
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

// components
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";

// APIs
import { postLogin } from "../modules/api";

// types
import { IUserInfo } from "../types";

interface ILoginResponse {
  data: IUserInfo;
}

interface ApiError {
  response: {
    data: {
      message: string;
    };
  };
}

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector(
    (state: { auth: { userInfo: IUserInfo } }) => state.auth
  );

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const { mutate: mutateLogin, isLoading } = useMutation<
    ILoginResponse,
    ApiError,
    { email: string; password: string }
  >(postLogin, {
    onSuccess: (response) => {
      dispatch(setCredentials(response.data));
      navigate(redirect);
    },
    onError: (error) => {
      toast.error(error?.response.data.message);
    },
  });

  const submitHandler = async (e: any) => {
    e.preventDefault();

    mutateLogin({ email, password });
  };

  return (
    <FormContainer>
      <h1>로그인하기</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button disabled={isLoading} type="submit" variant="primary">
          로그인
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>
          처음 방문하셨나요?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            회원가입
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginPage;
