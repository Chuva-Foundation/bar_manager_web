import { useRef, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import styled, {keyframes} from "styled-components";
import axios from "../api/axios";
const NAME_REGEX = /^[A-z][A-z- ]{10,23}$/;
const USERNAME_REGEX = /^[A-z][A-z]{3,23}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/Users";
const ROLES_URL = "/roles";

export const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

`;

const Select = styled.select`
  width: 100%;
  height: 35px;
  background: white;
  color: gray;
  padding-left: 5px;
  font-size: 14px;
  border: none;
  margin-left: 10px;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;
export const jump = keyframes`
  from{
    transform: translateY(0)
  }
  to{
    transform: translateY(-3px)
  }
`;


export const Form1 = styled.form`
  margin: 0 auto;
  width: 100%;
  max-width: 100%;
  padding: 1.3rem;
  display: flex;
  position: relative;
  background: #1D4350;
  float: left;
`;

export const Input = styled.input`
  max-width: 100%;
  background: #f9f9fa;
  color: ##04619F;
  margin-bottom: 0.9rem;
  border-radius: 4px;
  outline: 0;
  border: 1px solid rgba(245, 245, 245, 0.7);
  font-size: 14px;
  transition: all 0.3s ease-out;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
`;

export const Button = styled.button`
  max-width: 100%;
  padding: 11px 13px;
  color: rgb(253, 249, 243);
  font-weight: 600;
  text-transform: uppercase;
  background:#243B55 ;
  border: none;
  border-radius: 3px;
  outline: 0;
  cursor: pointer;
  margin-top: 0.6rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
  :hover {
    background: #04619F;
    animation: ${jump} 0.2s ease-out forwards;
  }
`;

export const Title = styled.h2`
  font-weight: normal;
  color: #2a2a29;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
  axios.get(ROLES_URL).then((res) => {
    const { id, role } = res.data;
    setRoles(res.data);
  });
}, []);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(NAME_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    setValidName(USERNAME_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
    setValidMatch(password === matchPassword);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [username, name, password, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USERNAME_REGEX.test(username);
    const v2 = PASSWORD_REGEX.test(password);
    const v3 = NAME_REGEX.test(name);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(REGISTER_URL, {
        username,
        name,
        password,
        confirm_password: password,
        role,
      });
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      localStorage.setItem('token', response.data.accessToken);
      setSuccess(true);
      setName("");
      setUsername("");
      setPassword("");
      setMatchPassword("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };


  return (
   <>
      <Wrapper>
          {success ? (
            <section>
              <h1>Success!</h1>
              <p>
                <a to="/Login">Sign In</a>
              </p>
            </section>
          ) : (
            <section>
              <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <Title>Register</Title>
              <Form1 onSubmit={handleSubmit}>
                <label htmlFor="username">
                  Username:
                  <div className={validName ? "valid" : "hide"} />
                  <div className={validName || !username ? "hide" : "invalid"} />
                </label>
                <Input
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
                <p
                  className={
                    userFocus && username && !validName
                      ? "instructions"
                      : "offscreen"
                  }
                ></p>
                <label htmlFor="Name">Name</label>
                <p></p>
                <Input
                  type="text"
                  id="name"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
                <p></p>
                <label htmlFor="password">
                  Password:
                  <div className={validPassword ? "valid" : "hide"} />
                  <div
                    className={validPassword || !password ? "hide" : "invalid"}
                  />
                </label>
                <Input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  aria-invalid={validPassword ? "false" : "true"}
                  aria-describedby="passwordnote"
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                />
                <p
                  id="passwordnote"
                  className={
                    passwordFocus && !validPassword ? "instructions" : "offscreen"
                  }
                ></p>
    
                <label htmlFor="confirm_password">
                  Confirm Password:
                  <div className={validMatch && matchPassword ? "valid" : "hide"} />
                  <div
                    className={validMatch || !matchPassword ? "hide" : "invalid"}
                  />
                </label>
    
                <Input
                  type="password"
                  id="confirm_password"
                  onChange={(e) => setMatchPassword(e.target.value)}
                  value={matchPassword}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
                  
                <label htmlFor="roles">Pick a Role</label>
                <br></br>
                
                <Select value={role}  onChange={(e)=> setRole(e.target.value)}>
                  {roles.map(role => <option value={roles.id} key={roles.id}>{role}</option>)}
                </Select>
                <br></br>
                <Button
                  disabled={
                    !validName || !validPassword || !validMatch ? true : false
                  }
                >
                  Sign Up
                </Button>
              </Form1>
            </section>
          )}
          </Wrapper>
    </>
  );
  };

export default Register;
