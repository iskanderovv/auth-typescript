import React, { useState } from "react";
import { message, Steps, theme } from "antd";
import Signup from "./Signup";
import OTP from "./Otp";
import Login from "./Login";

const Auth: React.FC = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => prev + 1);
  };

  const steps = [
    {
      title: "Signup",
      content: <Signup onNext={next} />,
    },
    {
      title: "Verify Email",
      content: <OTP onSubmit={next} isLoading={false} onNext={next} />,
    },
    {
      title: "Login",
      content: (
        <Login onSubmit={() => message.success("Processing complete!")} />
      ),
    },
  ];
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <div className="p-14">
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
    </div>
  );
};

export default Auth;
