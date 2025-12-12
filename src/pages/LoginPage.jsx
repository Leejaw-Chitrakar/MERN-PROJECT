import { Button, Card, Form, Input, message, notification } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const [loading, setLoading] = useState(false); // to track api calling process
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://egov-backend.vercel.app/api/users/login",
        values
      );
      const { accessToken } = res.data;
      localStorage.setItem("accessToken", accessToken);
      navigate("/");
      message.success("Login Successful");
      notification.success("Login successful");
      console.log("Hello world");
    } catch (err) {
      console.error(err);
      message.error("Login unsuccessful");
      notification.error("Login unsuccessful");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div
        id="LoginPage"
        style={{
          background:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80') no-repeat center center fixed",
          padding: "0px  0  0 15px ",
          height: "80vh",
          position: "relative",
        }}
      >
        <div
          className="description"
          style={{ position: "absolute", left: "5%" }}
        >
          <h1
            className="login-title"
            style={{
              fontWeight: "bold",
              color: "#f8f8f8ff",
              textAlign: "center",
              fontSize: "32px",
            }}
          >
            Welcome Back to VibeCourture
          </h1>
          <p
            style={{
              textAlign: "center",
              color: "#d7d7d8ff",
              fontSize: "24px",
            }}
          >
            Login to access your account and explore the best in fashion.
          </p>
        </div>
        <div id="c1">
          <Card
            title="Login"
            style={{
              margin: "0 auto",
              marginTop: "10px",
              alignItems: "center",
              textAlign: "center",
              color: "#1e3a63",
              backgroundColor: "#44c2b8b7",
              padding: "20px",
              borderRadius: "30px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
              position: "absolute",
              top: "6%",
              left: "64%",
              height: "420px",
              width: "350px",
            }}
          >
            <Form onFinish={onFinish} layout="vertical">
              <Form.Item label="Email" name="email" required>
                <Input placeholder="email" />
              </Form.Item>
              <Form.Item label="Password" name="password" required>
                <Input placeholder="password" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Login
                </Button>
              </Form.Item>
            </Form>
            <h4 style={{ marginTop: 16 }}>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </h4>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
