import React from "react";
import "./Singup.css";
import imgSingup from "../../assets/login.png";
import { FaAt, FaEnvelope, FaUserAlt, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Singup() {
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
              <FaUserAlt className="icon" />
              <input placeholder="First name" id="input2" type="text" />
            </label>
            <label htmlFor="input3" className="input">
              <FaUserAlt className="icon" />
              <input placeholder="Last name" id="input3" type="text" />
            </label>
            <label htmlFor="input4" className="input">
              <FaEnvelope className="icon" />
              <input placeholder="Email" id="input4" type="email" />
            </label>
            <label htmlFor="input5" className="input">
              <FaLock className="icon" />
              <input placeholder="Password" id="input5" type="text" />
            </label>
            <label htmlFor="input6" className="input">
              <FaLock className="icon" />
              <input
                placeholder="Password confrimation"
                id="input6"
                type="text"
              />
            </label>
            <button className="registerBtn">Register</button>
            <Link to="/login" className="diffPage">
              Arleady have account? Login!
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
