import React, { useState } from "react";
import { Button, Input, message } from "antd";
import { Link } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import axios from "../../api/index";

interface SignupProps {
  onNext: () => void;
}

const Signup: React.FC<SignupProps> = ({ onNext }) =>  {
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form, setForm] = useState({
    first_name: "",
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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePassword(form.password)) {
      messageApi.error(
        "Password must be at least 8 characters long and include one uppercase letter and one number."
      );
      return;
    }

    setIsLoading(true);

    const values = {
      first_name: form.first_name,
      email: form.email,
      password: form.password,
    };

    try {
      await axios.post("/auth/sign-up", values);
      messageApi.info("Signup successful");
      onNext();
    } catch (error: any) {
      console.error(error);
      messageApi.error("Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen">
      {contextHolder}
      <h2 className="text-3xl mb-5">Signup</h2>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-6 w-full max-w-[400px]"
      >
        <Input
          type="text"
          size="large"
          name="first_name"
          placeholder="Firstname"
          value={form.first_name}
          onChange={handleInputChange}
        />
        <Input
          type="email"
          name="email"
          value={form.email}
          placeholder="Email"
          size="large"
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
      <Link to={"/auth/login"}>Already have an account?</Link>
    </div>
  );
};

export default Signup;
