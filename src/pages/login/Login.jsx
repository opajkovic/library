import React, { useRef } from "react";
import imgSingup from "../../assets/login.png";
import { FaAt, FaLock } from "react-icons/fa";
import "../singup/Singup.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import apiCalls from "../../api/apiCalls";
import "react-toastify/dist/ReactToastify.css";


export default function Login() {
  let userNameRef = useRef()
  let passwordRef = useRef()

  let logIn = async() => {
    try{
      const response = await apiCalls.post("/login",{
        username: userNameRef.current.value,
        password: passwordRef.current.value
      })
      console.log(response)
    }catch(err){
      console.log(err)
      toast.error(err.response.data.error)
    }
  }
  return (
    <div className="singup">
      <section className="singupSection">
        <div className="image">
          <img src={imgSingup} alt="Sing up image" />
        </div>
        <div className="register">
          <h1>Online Biblioteka</h1>
          <div className="inputs">
            <label htmlFor="input1" className="input">
              <FaAt className="icon" />
              <input ref={userNameRef} placeholder="Username" id="input1" type="text" />
            </label>
            <label htmlFor="input2" className="input">
              <FaLock className="icon" />
              <input ref={passwordRef} placeholder="Username" id="input2" type="password" />
            </label>
            <button onClick={logIn} className="registerBtn">Login</button>
            <Link to="/singup" className="diffPage">
              Don't have account? Create one!
            </Link>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}
