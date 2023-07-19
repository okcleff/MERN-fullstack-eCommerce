import { useEffect, useState } from "react";
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
import { getUserById, updateUser } from "../../modules/api";

// types
import { IUserInfo, ApiError } from "../../types";

interface IAllUsersResponse {
  data: IUserInfo;
}

const UserEditPage = () => {
  const navigate = useNavigate();

  const { id: userId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery<IAllUsersResponse, ApiError>(["getUserById"], () =>
    getUserById(userId as string)
  );

  const { mutate: updateUserMutate, isLoading: loadingUpdate } = useMutation(
    updateUser,
    {
      onSuccess: () => {
        toast.success("user updated successfully");
        refetch();
        navigate("/admin/userlist");
      },
      onError: (error: ApiError) => {
        toast.error(error.response.data.message);
      },
    }
  );

  const submitHandler = async (e: any) => {
    e.preventDefault();

    updateUserMutate({ id: userId as string, name, email, isAdmin });
  };

  useEffect(() => {
    if (user) {
      setName(user.data.name);
      setEmail(user.data.email);
      setIsAdmin(user.data.isAdmin);
    }
  }, [user]);

  if (isLoading) return <Loader />;

  if (error) {
    return <Message variant="danger">{error.response.data.message}</Message>;
  }

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>

        {loadingUpdate && <Loader />}

        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="isadmin">
            <Form.Check
              type="checkbox"
              label="Is Admin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default UserEditPage;
