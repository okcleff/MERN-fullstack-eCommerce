import React from "react";

// lib
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

// components
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

// assets
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";

// APIs
import { getAllUsers, deleteUser } from "../../modules/api";

// types
import { IUserInfo, ApiError } from "../../types";

interface IAllUsersResponse {
  data: IUserInfo[];
}

const UserListPage = () => {
  const {
    data: users,
    refetch,
    isLoading,
    error,
  } = useQuery<IAllUsersResponse, ApiError>(["allUsers"], getAllUsers);

  const { mutate: deleteUserMutate } = useMutation(deleteUser, {
    onSuccess: () => refetch(),
    onError: (error: ApiError) => {
      toast.error(error.response.data.message);
    },
  });

  const deleteHandler = async (id: string) => {
    if (window.confirm("삭제하시겠습니까?")) {
      deleteUserMutate(id);
    }
  };

  if (isLoading) return <Loader />;

  if (error) {
    return <Message variant="danger">{error.response.data.message}</Message>;
  }

  return (
    <>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {users.data.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>

              <td>{user.name}</td>

              <td>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </td>

              <td>
                {user.isAdmin ? (
                  <FaCheck style={{ color: "green" }} />
                ) : (
                  <FaTimes style={{ color: "red" }} />
                )}
              </td>

              <td>
                {!user.isAdmin && (
                  <>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <FaEdit />
                      </Button>
                    </LinkContainer>

                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(user._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserListPage;
