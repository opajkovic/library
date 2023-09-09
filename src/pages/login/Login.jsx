import React from "react";
import imgSingup from "../../assets/login.png";
import { FaAt, FaLock } from "react-icons/fa";
import "../singup/Singup.css";
import { Link } from "react-router-dom";

export default function Login() {
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
              <input placeholder="Username" id="input1" type="text" />
            </label>
            <label htmlFor="input2" className="input">
              <FaLock className="icon" />
              <input placeholder="Username" id="input2" type="text" />
            </label>
            <button className="registerBtn">Login</button>
            <Link to="/singup" className="diffPage">
              Don't have account? Create one!
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
