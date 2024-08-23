import React, { useState } from "react";
import { Button, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import axios from "../../api/index";

interface LoginProps {
  onSubmit: () => void;
}

const Login: React.FC<LoginProps> = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const validatePassword = (password: string) => {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordPattern.test(password);
  };

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePassword(form.password)) {
      messageApi.error(
        "Password must be at least 8 characters long and include one uppercase letter and one number."
      );
      return;
    }

    setIsLoading(true);

    const values = {
      email: form.email,
      password: form.password,
    };

    try {
      const response = await axios.post("/auth/sign-in", values);
      messageApi.info("Login successful");
      console.log("Login successful:", response.data);
      navigate("/dashboard/create");
      onSubmit();
    } catch (error: any) {
      console.error("Login failed:", error);
      messageApi.error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen">
      {contextHolder}
      <h2 className="text-3xl mb-5">Login</h2>
      <form
        onSubmit={onSubmitForm}
        className="flex flex-col gap-6 w-full max-w-[400px]"
      >
        <Input
          type="email"
          size="large"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleInputChange}
        />
        <Input.Password
          size="large"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleInputChange}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          loading={isLoading}
        >
          Submit
        </Button>
      </form>
      <Link to={"/auth/signup"}>Don't have an account?</Link>
    </div>
  );
};

export default Login;
