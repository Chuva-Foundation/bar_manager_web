import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import Register from './Register';

const USERS_URL="/users";

const Users = () => {
const [getUsers, setGetUsers] =useState([]);
const [user_id, setUser_id] = useState("");
const [errMsg, setErrMsg] = useState("");

useEffect(() => {
  axios.get(USERS_URL).then((res)=>{
    setGetUsers(res.data);
  });
}, []);

const DeleteSubmit = async(e) =>{
  try {const response = await axios.delete(USERS_URL + '/' + e.target.value)
    console.log(response.data)
    console.log(user_id)
  }catch(err){
    if (!err?.response) {
      setErrMsg("No Server Response");
    } else if (err.response?.status === 400) {
      setErrMsg("Bad Request");
    } else {
      setErrMsg("Action Failed");
};
};

const updateSubmit = async(e) => {
  e.preventDefault()
  try { const response = axios.put(USERS_URL,)
      console.log(response.data)
  } catch (err) {
    if (!err?.response) {
      setErrMsg("No Server Response");
    } else if (err.response?.status === 400) {
      setErrMsg("Bad Request");
    } else {
      setErrMsg("Action Failed");
  }
}
};

}
  return (
    <>
<Register/>
  List of Users
  <br></br>
  {getUsers.map((user)=>
<div  key={user.id}>
  <div>
  <h2>{user.name}</h2>
  <h3>{user.role}</h3>
  </div>
  <button value={user.id} onClick={DeleteSubmit}>delete</button>
  <button >edit</button>
</div>)}
</> 
  )
    
}

export default Users
