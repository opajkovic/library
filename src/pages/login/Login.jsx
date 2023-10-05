import React, { useRef } from "react";
import imgSingup from "../../assets/login.png";
import { FaAt, FaLock } from "react-icons/fa";
import "../singup/Singup.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import apiCalls, { apiSing } from "../../api/apiCalls";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../services/AuthService";


export default function Login() {
  let userNameRef = useRef()
  let passwordRef = useRef()
  let navigate = useNavigate()

  let logIn = async() => {
    try{
      const response = await apiSing.post("/login",{
        username: userNameRef.current.value,
        password: passwordRef.current.value,
        device: "DivajsNejm"
      })
      localStorage.setItem("token", response.data.data.token)
      auth.setJWT(response.data.data.token)
      try{
        const response2 = await apiCalls.post("/users/me", null , {
          'Authorization': `Bearer ${response.data.data.token}`,
        })
        localStorage.setItem("id",response2.data.data.id)
        localStorage.setItem("role",response2.data.data.role)
      }catch(err){
        console.log(err)
      }
      toast.success("Uspjesna prijava")
      setTimeout(() => {
        navigate('/')
      }, 100);
    }catch(err){
      console.log(err)
      if(!err.response.data.data.error){
        toast.error(err.response.data.message)
      }else{
        toast.error(err.response.data.data.error)
      }
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
