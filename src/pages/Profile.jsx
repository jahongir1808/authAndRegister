import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getData, patchData } from "../server/common";
import "./Profile.scss";
import { FaEyeSlash, FaEye } from "react-icons/fa";
const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [passwordType, setPasswordType] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState(<FaEyeSlash />);
  const [userInfo, setUserInfo] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [password, setPassword] = useState("");
  const showModal = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    getData("auth/user").then((res) => {
      form.setFieldsValue(res.data.data);
      setUserInfo({ email: res.data.data.email, name: res.data.data.name });
    });
  }, []);
  const handleShow = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      setPasswordIcon(FaEye);
    } else {
      setPasswordType("password");
      setPasswordIcon(FaEyeSlash);
    }
  };
  const handleOk = () => {
    form.validateFields().then((values) => {
      const val = { ...values, password };
      patchData("auth/profile", val).then((data) => {
        toast.success("Successfully modified");
        window.location.reload();
        setIsModalOpen(false);
      });
    });
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="profile container">
      <div className="profile-head">
        <h1>Profile</h1>
        <button onClick={showModal}>Edit profile</button>
      </div>
      <div className="profile-info">
        <div className="user">
          <div className="user-info">
            <h2>
              Name: <span>{userInfo.name}</span>
            </h2>
            <div className="email">
              <h2>E-mail:</h2>
              <a href={`mailto: ${userInfo.email}`}>
                <span>{userInfo.email}</span>
              </a>
            </div>
          </div>
        </div>
        <div className="user-modal">
          <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Form
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              form={form}
              name="user"
            >
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="name"
                label="Nickname"
                tooltip="What do you want others to call you?"
                rules={[
                  {
                    required: true,
                    message: "Please input your nickname!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Form>
            <div className="txtField">
              <input
                {...register("password", {
                  required: "Please enter password !",
                })}
                value={password}
                onChange={handlePasswordChange}
                type={passwordType}
                placeholder="New password"
              />
              <p onClick={handleShow}>{passwordIcon}</p>
              <span>
                {typeof errors.password?.message === "string"
                  ? errors.password.message
                  : null}
              </span>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Profile;
