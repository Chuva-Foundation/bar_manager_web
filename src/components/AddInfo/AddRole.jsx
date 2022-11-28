import React, { useState } from 'react'
import axios from "../../api/axios";
import { Button } from '../Styled.Components';
const ADDROLE_URL = "/roles"
const AddRole = () => {
    const [roleName, setRoleName] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const handleSubmit = async() => {

        try {
            const response = await axios.post(ADDROLE_URL, {
                roleName,
            });
            console.log(response?.data);
            console.log(JSON.stringify(response));
        } catch(err) {
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 400) {
                setErrMsg("Missing role ID or role name");
            } else if (err.response?.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Failed to add a new role")
            }
        }
    }
  return (
    <div>
        <h3>Create a new Role</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Insert new role name</label>
          <br></br>
          <input
            required
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
          ></input>
        </div>
        <br></br>
        <Button>Add category</Button>
      </form>
    </div>
  )
}

export default AddRole
