// Example: src/pages/Login.jsx
// import { loginUser } from '../api/auth';
// import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Flex } from "antd";
import {GoogleOutlined,AppleFilled } from "@ant-design/icons";
import { useState } from "react";
import axios from 'axios';
import { useNavigate , Link} from "react-router-dom";
// const onFinish = (values) => {
  //   console.log("Success:", values);
  // };
  const Login = (props) => {
    const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const handleSubmit = async () => {
    // e.preventDefault();
    setLoading(true);
    setError("");
    // const result = await loginUser(email, password);
    // if (result.authtoken) {
    //   localStorage.setItem('accessToken', result.authtoken);
    //   // Redirect or update UI
    // } else {
    //   setError(result.error || 'Login failed');
    // }
     try {
      // Step 1: Send login credentials to the backend
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // Step 2: Check for a successful response and get the token
      if (response.data.authtoken) {
        // Step 3: Store the token correctly in localStorage
        localStorage.setItem("accessToken", response.data.authtoken);
        
        // Step 4: Navigate the user to the profile page or home page
        navigate("/profile"); 
      } else {
        // Handle cases where the backend returns an error without a token
        console.error("Login failed:", response.data.error || "Unknown error");
      }
    } catch (error) {
     // Step 5: Extract the specific error message from the Axios error object
        let errorMessage = "An unexpected network or server error occurred.";

        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx (e.g., 401, 404, 500)
            errorMessage = error.response.data.error || error.response.data.message || `Server responded with status ${error.response.status}.`;
        } else if (error.request) {
            // The request was made but no response was received (e.g., network timeout)
            errorMessage = "No response from server. Check your network or server status.";
        } else {
            // Something happened in setting up the request that triggered an Error
            errorMessage = error.message;
        }

        console.error("Login error:", error);
        setError(errorMessage); // Set the string message
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        background: "#ffffffff",
        height: "80vh",
        margin:'20px',
        padding:
          "30px " /* A slightly lighter dark background for the whole page */,
      }}
    >
      <h1
        className="p-3 text-3xl font-bold "
        style={{ textAlign: "center", justifyContent: "center" }}
      >
        {props.title}
      </h1>
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        style={{
          maxWidth: 400,
          //   border: "0.1px solid gray",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
          background: " #2C3E50",
          padding: "20px",
          paddingTop: "20px",
          borderRadius: "10px",
          margin: "auto",
          color: "#BDC3C7",
        }}
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div
          style={{
            alignItems: "center",
            textAlign: "center",
            fontFamily: "sans-serif",
            justifyContent: "center",
          }}
        >
          <div className="flex justify-center">
            <img src="Logo.png" alt="" width={35} className="" />
          </div>
          <div
            style={{ fontSize: "18px", fontStyle: "bold", color: " #BDC3C7" }}
          >
            Vibe Couture
            <div style={{ fontSize: "10px", color: " #BDC3C7" }}>
              Sign In for 
            </div>
          </div>
        </div>
        <Form.Item
          layout="vertical"
          label={<span style={{ color: "#BDC3C7" }}>Email</span>}
          name="Email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input 
            placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)}
          />
          {/* <input type="email" name="email" id="email" style={{border:'1px solid #d9d9d9', outline:'none', padding: '8px 96px', alignItems: 'center', justifyContent: 'center', display:'flex', borderRadius:'5px'}}/> */}
        </Form.Item>

        <Form.Item
          label={<span style={{ color: "#BDC3C7" }}>Password</span>}
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password 
            placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 0, span: 24 }} // Remove offset to align left
          style={{ textAlign: "left", margin: "4px 0" }}
        >
          <Checkbox style={{ color: "#BDC3C7" }}>
            I agree to the terms and conditions
          </Checkbox>
        </Form.Item>
        {/* <Form.Item> */}
        <Flex vertical gap="small" style={{ width: "100%" }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            // onClick={submit ? submit : ""}
          >
            Login
          </Button>
          {/* {error && <div style={{color:'red'}}>{error}</div>} */}
          {error && <div style={{color:'red'}}>{error}</div>}
        </Flex>
        <div className="flex items-center p-2">
          <hr className="flex-grow border-t border-gray-400" />
          <span className="px-3 text-white-600">Or</span>
          <hr className="flex-grow border-t border-gray-400" />
        </div>
        {/* remaining section of login page */}
         <Flex vertical gap="small" style={{ width: "100%" }}>
          <Button
           color="default" variant="outlined"
            htmlType="submit"
            // onClick={submit ? submit : ""} 
            className="border border-blue-500"
          >
            <GoogleOutlined  className="text-red-500 text-xl"/>
            <span className="font-semibold">
                Continue with Google
            </span>
          </Button>
        </Flex>
        <br />
         <Flex vertical gap="small" style={{ width: "100%" }} >
          <Button
            color="default" variant="outlined"
            htmlType="submit"
            // onClick={submit ? submit : ""}
          >
            <AppleFilled className="text-red-500 text-xl"/>
            <span className="font-semibold">
            Continue with Apple
            </span>
          </Button>
        </Flex>
        {/* </Form.Item> */}
        <div className="justify-center flex p-3">
          <p>Don't have account? <Link to="/signup">Signup</Link></p>
        </div>
      </Form>
    </div>
  );
};

export default Login;
