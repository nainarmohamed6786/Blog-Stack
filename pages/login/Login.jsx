import "./login.css";
import {Link} from 'react-router-dom'
import { useContext, useRef } from "react";
import {Context} from '../../context/Context';
import axios from 'axios'


export default function Login() {

  const userRef = useRef();
  const passwordRef = useRef();
  const {user, dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

console.log(user)
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="loginInput" ref={userRef} type="text" placeholder="Enter your username..." />
        <label>Password</label>
        <input className="loginInput" type="password" ref={passwordRef} placeholder="Enter your password..." />
        <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
      </form>
      <Link to='/register'>
      <button className="loginRegisterButton" >Register</button>
      </Link>
     
    </div>
  );
}
