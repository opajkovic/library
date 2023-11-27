import React, { useEffect, useRef } from "react";
import "./Singup.css";
import imgSingup from "../../assets/login.png";
import { FaAt, FaEnvelope, FaUserAlt, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import api, { apiSing } from "../../api/apiCalls";
import "react-toastify/dist/ReactToastify.css";

export default function Singup() {
  let userNameRef = useRef();
  let passwordRef = useRef();
  let nameRef = useRef();
  let surnameRef = useRef();
  let emailRef = useRef();
  let password_confirmationRef = useRef()
  const navigate = useNavigate()

  const patternUsername = /^[A-Za-z0-9_]+$/;
  const patternName = /^[A-Za-zćčžšđĆČŽŠĐ]+$/;
  const patternEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const patternPassword = /^(?=.*[a-zA-Z]).{8,}$/;

  let checkUserName = (e) => {
    if (
      !patternUsername.test(userNameRef.current.value) ||
      !userNameRef.current.value ||
      userNameRef.current.value.length == 0
    ) {
      userNameRef.current.parentElement.classList += " error";
    } else {
      userNameRef.current.parentElement.classList.remove("error");
      return true;
    }
  };
  let checkName = () => {
    if (
      !patternName.test(nameRef.current.value) ||
      !nameRef.current.value ||
      !nameRef.current.value.length
    ) {
      nameRef.current.parentElement.classList += " error";
    } else {
      nameRef.current.parentElement.classList.remove("error");
      return true;
    }
  };

  let checkSurname = () => {
    if (
      !patternName.test(surnameRef.current.value) ||
      !surnameRef.current.value ||
      !surnameRef.current.value.length
    ) {
      surnameRef.current.parentElement.classList += " error";
    } else {
      surnameRef.current.parentElement.classList.remove("error");
      return true;
    }
  };
  let checkEmail = () => {
    if (
      !patternEmail.test(emailRef.current.value) ||
      !emailRef.current.value ||
      !emailRef.current.value.length
    ) {
      emailRef.current.parentElement.classList += " error";
    } else {
      emailRef.current.parentElement.classList.remove("error");
      return true;
    }
  };
  let checkPassword = () => {
    if (
      !patternPassword.test(passwordRef.current.value) ||
      !passwordRef.current.value ||
      !passwordRef.current.value.length
    ) {
      passwordRef.current.parentElement.classList += " error";
    } else {
      passwordRef.current.parentElement.classList.remove("error");
      return true;
    }
  };
  let checkRePassword = () => {
    if (password_confirmationRef.current.value != passwordRef.current.value) {
      password_confirmationRef.current.parentElement.classList += " error";
    } else {
      password_confirmationRef.current.parentElement.classList.remove("error");
      return true;
    }
  };
  let checkRegister = () => {
    checkUserName();
    checkName();
    checkSurname();
    checkEmail();
    checkPassword();
    checkRePassword();
    if (
      checkUserName() &&
      checkName() &&
      checkSurname() &&
      checkEmail() &&
      checkPassword() &&
      checkRePassword()
    ) {
      register();
    } else if (!checkUserName()) {
      toast.error(
        "Username can only contain letters, digits, and underscores (_) or it is too short"
      );
    } else if (!checkName()) {
      toast.error(
        "Enter a name containing at least one character, using only letters and the specified accented characters."
      );
    } else if (!checkSurname()){
      toast.error("Enter a surnname containing at least one character, using only letters and the specified accented characters.")
    } else if (!checkEmail()){
      toast.error("Enter a valid mail") 
    } else if (!checkPassword()){
      toast.error("Password must be at least 8 characters long and contain at least one letter.")
    }else if (!checkRePassword()){
      toast.error("Passwords does not match")
    }
  };

  let register = async () => {
    let user = {
      name: nameRef.current.value,
      surname: surnameRef.current.value,
      username: userNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: password_confirmationRef.current.value,
      device: "DivajsNejm"
      
    }
    try{
      const response = await apiSing.post('/register', user)
      toast.success("Uspjesno napravljen nalog")
      localStorage.setItem("token", response.data.data.token)
      setTimeout(() => {
        navigate("/")
      }, 1000);
    }catch(err){
      toast.error(err.response.data.message)
      console.error(err)
    }
  };

  useEffect(()=>{
    localStorage.clear()
    navigate('/login')
  },[])
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
              <input
                ref={userNameRef}
                onChange={checkUserName}
                placeholder="Username"
                id="input1"
                type="text"
              />
            </label>
            <label htmlFor="input2" className="input">
              <FaUserAlt className="icon" />
              <input
                ref={nameRef}
                onChange={checkName}
                placeholder="First name"
                id="input2"
                type="text"
              />
            </label>
            <label htmlFor="input3" className="input">
              <FaUserAlt className="icon" />
              <input
                ref={surnameRef}
                onChange={checkSurname}
                placeholder="Last name"
                id="input3"
                type="text"
              />
            </label>
            <label htmlFor="input4" className="input">
              <FaEnvelope className="icon" />
              <input
                ref={emailRef}
                onChange={checkEmail}
                placeholder="Email"
                id="input4"
                type="email"
              />
            </label>
            <label htmlFor="input5" className="input">
              <FaLock className="icon" />
              <input
                ref={passwordRef}
                onChange={checkPassword}
                placeholder="Password"
                id="input5"
                type="password"
              />
            </label>
            <label htmlFor="input6" className="input">
              <FaLock className="icon" />
              <input
                ref={password_confirmationRef}
                onChange={checkRePassword}
                placeholder="Password confrimation"
                id="input6"
                type="password"
              />
            </label>
            <button onClick={checkRegister} className="registerBtn">
              Register
            </button>
            <Link to="/login" className="diffPage">
              Arleady have account? Login!
            </Link>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}
