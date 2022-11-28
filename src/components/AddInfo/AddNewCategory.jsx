import React, { useState } from "react";
import axios from "../../api/axios";
import { Button } from "../Styled.Components";
const ADDCATEGORIES_URL = "/categories";



const AddNewCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e) => {
      e.preventDefault()
    try {
      const response = await axios.post(ADDCATEGORIES_URL, {
        categoryName
      });
      console.log(response?.data);
      console.log(JSON.stringify(response));
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Name");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Failed to add a new product category");
      }
    }
  };

  return (
    <div>
      <h3>Create a new product category</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Insert new name</label>
          <br></br>
          <input
            required
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          ></input>
        </div>
        <br></br>
        <Button>Add category</Button>
      </form>
    </div>
  );
};

export default AddNewCategory;
