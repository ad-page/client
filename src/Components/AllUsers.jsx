import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import Spinner from "./Spinner";

const BASE_URL = "http://localhost:5000/api/users";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        const token = userData?.token;

        if (!token) {
          throw new Error("No token");
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        axios.get(`${BASE_URL}`, config).then((res) => setUsers(res.data));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = userData?.token;

    if (!token) {
      throw new Error("No token");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios.delete(`${BASE_URL}/${id}`, config);
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
  };

  if (isLoading) return <Spinner />;
  return (
    <div>
      <h3>Users that are registered ({users.length}): </h3>
      {users.map((user) => (
        <p key={user._id}>
          {user.email}
          <Button type="delete" onClick={() => handleDelete(user._id)}>
            &times;
          </Button>
        </p>
      ))}
    </div>
  );
};

export default AllUsers;
