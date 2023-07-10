import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// lib
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";

// components
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

// APIs
import { postSignup } from "../modules/api";

// types
import { IUserInfo } from "../types";

interface ISignupResponse {
  data: IUserInfo;
}

interface ApiError {
  response: {
    data: {
      message: string;
    };
  };
}

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation<
    ISignupResponse,
    ApiError,
    {
      name: string;
      email: string;
      password: string;
    }
  >(postSignup, {
    onSuccess: (response) => {
      dispatch(setCredentials(response.data));
      navigate(redirect);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

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

  const submitHandler = async (e: any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    mutate({ name, email, password });
  };

  return (
    <FormContainer>
      <h1>회원가입</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>이름</Form.Label>

          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="email">
          <Form.Label>이메일</Form.Label>

          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>비밀번호</Form.Label>

          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>

          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button disabled={isLoading} type="submit" variant="primary">
          가입하기
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>
          이미 계정이 있으신가요?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            로그인
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default SignupPage;
