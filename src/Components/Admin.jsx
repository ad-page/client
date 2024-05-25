import React, { useState } from "react";
import AllUsers from "./AllUsers";
import Button from "./Button";
import styles from "./Admin.module.css";

const Admin = () => {
  const [showCategories, setShowCategories] = useState(1);
  const [showUsers, setShowUsers] = useState(0);

  return (
    <div>
      <h3>Welcome Admin</h3>
      <h4 className={styles.header}>Manage:</h4>
      <div>
        <Button
          onClick={() => (showUsers === 0 ? setShowUsers(1) : setShowUsers(0))}
          type="show"
        >
          Users
        </Button>
        <Button
          onClick={() =>
            showCategories === 0 ? setShowCategories(1) : setShowCategories(0)
          }
          type="show"
        >
          Categories
        </Button>
      </div>
      {showCategories === 1 ? <div>Categories</div> : null}
      {showUsers === 1 ? <AllUsers /> : ""}
    </div>
  );
};

export default Admin;
