import { Button, Card, Form, Input} from "antd";
//  import {message, notification} from "antd";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../api/auth";
import useNa
const LoginPage = () => {
  const [loading, setLoading] = useState(false); // to track api calling process
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // const onFinish = async (values) => {
  //   setLoading(true)

  //   try {
  //     const res = await axios.post(
  //       'https://egov-backend.vercel.app/api/users/login',
  //       values,
  //     )

  //     const { accessToken } = res.data
  //     localStorage.setItem('accessToken', accessToken)

  //     navigate('/')

  //     message.success('Login Successful')
  //     notification.success('Login successful')
  //   } catch (err) {
  //     console.error(err)
  //     message.error('Login unsuccessful')
  //     notification.error('Login unsuccessful')
  //   } finally {
  //     setLoading(false)
  //   }
  // }
const handleSubmit = async () => {
    // e.preventDefault();
    setLoading(true);
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
      // Log the full error to see what's wrong with the request
      console.error("Login error:", error.response ? error.response.data : error.message);
    }
    setLoading(false);
  };
  return (
    <Card title="Login Page">
      <Form onFinish={handleSubmit}>
        {/* email  */}
        <Form.Item label="Email" name="email" required>
          <Input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        {/* password */}
        <Form.Item label="Password" name="password" required>
          <Input
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        {/* submit button  */}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Login
          </Button>
           {error && <div>{error}</div>}
        </Form.Item>
      </Form>

      <h4>
        Do you want to signup? <Link to="/signup">Signup</Link>
      </h4>
    </Card>
  );
};

export default LoginPage;
