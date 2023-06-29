import React, { useState } from "react";
import { sendData } from "../server/common";
import { TOKEN } from "../const";
import { useForm } from "react-hook-form";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import LoginImg from "../assets/image/signUp.png";
import "./Login.scss";
import { toast } from "react-toastify";

const Login = () => {
  const [disable, setDisable] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState(<FaEyeSlash />);
  const handleShow = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      setPasswordIcon(FaEye);
    } else {
      setPasswordType("password");
      setPasswordIcon(FaEyeSlash);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (value) => {
    sendData("auth/login", value)
      .then((res) => {
        setDisable(true);
        localStorage.setItem(TOKEN, res.data.token);
        toast.success("You are logged into your profile");
        window.location = "/home";
      })
      .catch((err) => {});
  };
  return (
    <div className="container loginP">
      <h1>Login</h1>
      <div className="login">
        <div className="login-left">
          <img src={LoginImg} alt="Login page image" />
        </div>
        <div className="forms">
          <form className="form">
            <div className="txtField">
              <input
                {...register("email", { required: "Please enter email !" })}
                type="text"
                placeholder="email"
              />
              <span>{errors.email?.message}</span>
            </div>
            <div className="txtField">
              <input
                {...register("password", {
                  required: "Please enter password !",
                })}
                type={passwordType}
                placeholder="Password"
              />
              <p onClick={handleShow}>{passwordIcon}</p>
              <span>{errors.password?.message}</span>
            </div>
            <button
              onClick={handleSubmit(onSubmit)}
              className={disable ? "disabledTrue" : "disabledFalse"}
              disabled={disable}
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
