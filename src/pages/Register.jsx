import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { sendData } from "../server/common";
import SignUpImage from "../assets/image/signUp.png";
import "./Register.scss";
import { toast } from "react-toastify";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState(<FaEyeSlash />);
  const [passwordTypeConfirm, setPasswordTypeConfirm] = useState("password");
  const [passwordIconConfirm, setPasswordIconConfirm] = useState(
    <FaEyeSlash />
  );
  const handleShow = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      setPasswordIcon(FaEye);
    } else {
      setPasswordType("password");
      setPasswordIcon(FaEyeSlash);
    }
  };
  const handleShowConfirm = () => {
    if (passwordTypeConfirm === "password") {
      setPasswordTypeConfirm("text");
      setPasswordIconConfirm(FaEye);
    } else {
      setPasswordTypeConfirm("password");
      setPasswordIconConfirm(FaEyeSlash);
    }
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };
  const onSubmit = (value) => {
    if (password === confirmPassword) {
      sendData("auth/register", value)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Authorization succes");
            window.location = "/login";
          } else {
            toast.error("This account already exists");
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            toast.error("Authorization error try again");
          } else {
            toast.error("There is an error in the entered data!");
          }
        });
    } else {
      toast.error("Password and confirmation password do not match");
    }
  };
  return (
    <div className="container">
      <div className="registered">
        <h1>Register</h1>
        <div className="register">
          <div className="register-left">
            <img src={SignUpImage} alt="Sign Up Image" />
          </div>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="textField">
              <input
                {...register("name", {
                  required: "Please enter name !",
                })}
                type="text"
                placeholder="Name"
              />
              <span>
                {typeof errors.name?.message === "string"
                  ? errors.name.message
                  : null}
              </span>
            </div>
            <div className="textField">
              <input
                {...register("email", {
                  required: "Please enter email !",
                })}
                type="text"
                placeholder="E-mail"
              />
              <span>
                {typeof errors.email?.message === "string"
                  ? errors.email.message
                  : null}
              </span>
            </div>
            <div className="txtField">
              <input
                {...register("password", {
                  required: "Please enter password !",
                })}
                value={password}
                onChange={handlePasswordChange}
                type={passwordType}
                placeholder="Password"
              />
              <p onClick={handleShow}>{passwordIcon}</p>
              <span>
                {typeof errors.password?.message === "string"
                  ? errors.password.message
                  : null}
              </span>
            </div>
            <div className="txtField">
              <input
                {...register("password_confirmation", {
                  required: "Please enter password_confirmation !",
                })}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                type={passwordTypeConfirm}
                placeholder="Confirm password"
              />
              <p onClick={handleShowConfirm}>{passwordIconConfirm}</p>
              <span>
                {typeof errors.password_confirmation?.message === "string"
                  ? errors.password_confirmation.message
                  : null}
              </span>
            </div>
            <div className="submit_button">
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
