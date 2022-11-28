import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled, {GlobalStyle, Wrapper, Form1, Title, Input, Button} from "../components/Styled.Components"
const LOGIN_URL = "/sessions";




const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/AdminPanel";

  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL, { username, password });
      console.log(JSON.stringify(response?.data));
      const accessToken = response.data.token;
      localStorage.setItem("token", accessToken);
      setUsername("");
      setPassword("");
      alert("Sucessfully Logged in");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Form1 onSubmit={handleSubmit}>
        <Title>SIGN IN</Title>
        <label htmlFor="username">Username:</label>
            <Input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
            <label htmlFor="password">Password:</label>
            <Input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          <Button>Login</Button>
        </Form1>
      </Wrapper>
    </>
  );
}


export default Login;
