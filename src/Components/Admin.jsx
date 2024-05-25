import React, { useState } from "react";
import AllUsers from "./AllUsers";

const Admin = () => {
  const [showCategories, setShowCategories] = useState(1);
  const [showUsers, setShowUsers] = useState(0);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  return (
    <div>
      <h3>Welcome Admin</h3>
      <h4>Manage:</h4>
      <button
        onClick={() => (showUsers === 0 ? setShowUsers(1) : setShowUsers(0))}
      >
        Users
      </button>
      <button
        onClick={() =>
          showCategories === 0 ? setShowCategories(1) : setShowCategories(0)
        }
      >
        Categories
      </button>
      {showCategories === 1 ? <div>Categories</div> : null}
      {showUsers === 1 ? <AllUsers /> : ""}
    </div>
  );
};

export default Admin;
