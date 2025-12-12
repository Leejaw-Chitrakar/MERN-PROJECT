// import React, { useState } from "react";
// import { Card, Form, Input, Button, message, Radio } from "antd";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./Pages.css";
// const SignupPage = () => {
//   const [loading, setLoading] = useState(false); // to track api calling process
//   const navigate = useNavigate();
//   const [userType, setUserType] = useState("user"); // Default to 'user'
//   // const onFinish = async (values) => {
//   //   setLoading(true);
//   //   try {
//   //     const res = await axios.post(
//   //       "https://egov-backend.vercel.app/api/users/register",
//   //       values
//   //     );
//   //     const { accessToken } = res.data;
//   //     localStorage.setItem("accessToken", accessToken);

//   //     navigate("/login");

//   //     message.success("login Successful");
//   //   } catch (err) {
//   //     console.error(err);
//   //     message.error("Login unsuceessful");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
  
//   const handleUserTypeChange = (e) => {
//     setUserType(e.target.value);
//   }

//   const onFinish = async (values) => {
//   setLoading(true);
//   try {
//     const res = await axios.post(
//       "http://localhost:5000/api/auth/createuser",
//       {
//         name: values.username, // map username to name
//         email: values.email,
//         password: values.password,
//         userType: values.userType // include userType if needed
//       }
//     );
//     // ...rest of your code
//      const { accessToken } = res.data;
//       localStorage.setItem("accessToken", accessToken);

//       navigate("/");

//       message.success("login Successful");
//   } catch (err) {
//     console.error(err);
//       message.error("Login unsuccessful");
//     // ...error handling
//   } finally {
//     setLoading(false);
//   }
// };
//   return (
//     <div className="signup-page">
//       <div
//         id="SignUpPage"
//         style={{
//           //   backgroundColor: "#f0f2f5",
//           background: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80') no-repeat center center fixed",
//           padding: "0px  0  0 15px ",
//           height: "80vh",
//         }}
//       >
//         <div className="description">
//           <h2  className="login-title"
//             style={{
//               fontWeight: "bold",
//               color: "#f8f8f8ff",
//               textAlign: "center",
//             }}
//           >
//             Welcome to the VibeCourture
//           </h2>
//           <p style={{ textAlign: "center", color: "#d7d7d8ff", fontSize: "14px" }}>
//             Sign up to experience the best in fashion and style.
//           </p>
//         </div>
//         <div id="c1">
//           <Card
//             title="Sign Up"
//             style={{
//               margin: "0 auto",
//               marginTop: "10px",
//               alignItems: "center",
//               textAlign: "center",
//               color: "#1e3a63",
//               backgroundColor: "#44c2b8b7",
//               padding: "20px",
//               borderRadius: "30px",
//               boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
//             }}
//           >
//             {/* this form is a built in form in the name of antd library so we don't need to create a form from scratch */}
//             <Form onFinish={onFinish} style={{}}>
//                 {/* for UserType */}
//               <tr>
//                  {/* <div className="form-group">
//                     <label>User Type</label>
//                     <div className="radio-div">
//                         <label className="radio-label">
//                             <input type="radio" name='userType' value="user"
//                                 checked={userType === "user"}
//                                 // onChange={onChange}
//                             />
//                             User
//                         </label>
//                         <label className="radio-label">
//                             <input type="radio" name='userType' value="admin"
//                                 checked={userType === "admin"}
//                                 // onChange={onChange}
//                             />
//                             Admin
//                         </label>
//                     </div>
//                 </div> */}
//                 <Form.Item
//                 label="User Type"
//                 name="userType" // This name ensures the value is included in 'values' on submit
//                 required
//                 initialValues={{ userType: 'user' }}
//               >
//                 <Radio.Group onChange={handleUserTypeChange} value={userType}>
//                   <Radio value="user">User</Radio>
//                   <Radio value="admin">Admin</Radio>
//                 </Radio.Group>
//               </Form.Item>
//               </tr>
//               {/* for Username */}
//               <tr>
//                 <Form.Item label="Username" name="username" required>
//                   <Input placeholder="username" />
//                 </Form.Item>
//               </tr>
//               {/* for email */}
//               <tr>
//                 <Form.Item
//                   label="Email"
//                   name="email"
//                   required
//                   rules={[
//                     { type: "email", message: "Please enter a valid email!" },
//                   ]}
//                 >
//                   <Input placeholder="email" />
//                 </Form.Item>
//               </tr>
//               {/* for password */}
//               <Form.Item label="Password" name="password" required>
//                 <Input placeholder="password" />
//               </Form.Item>
//               {/* for submit button */}
//               <Form.Item>
//                 <Button type="primary" htmlType="submit" loading={loading}>
//                   Sign Up
//                 </Button>
//               </Form.Item>
//             </Form>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", userType: "user", secrectKey: "" });
    const navigate = useNavigate();
    const handleClick = async (e) => {
        // const {name, email, password} = credentials;
        e.preventDefault();
        if(credentials.userType==="admin" && credentials.secrectKey!=="12345"){
            // props.showAlert("Secrect Key is invalid for admin !!",'danger');
            
            return;
        }
        // const name = e.target.name.value;
        // const email = e.target.email.value;
        // const password = e.target.password.value;
        
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhjM2M4YTA4MDgxNWRiYTU2ZTAyNTk3In0sImlhdCI6MTc1NzY2MTM3MX0.h9-DVVkGq6R-VsD43wn7itudWYV8knuMZ1B3h6hRLjo"
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password , userType: credentials.userType}), // Correctly defined data object
            // body:JSON.stringify({name, email, password}),
        });
        const json = await response.json();
        console.log("signUp registered");
        console.log(json);

        if (json.success) {
            // redirect to login page 
            localStorage.setItem('token', json.authtoken);
            // window.location.href = '/login';
            // alert("User registered successfully");
            setCredentials({ name: "", email: "", password: "" , userType:"user", secrectKey:""});
            navigate('/login');
            props.showAlert("User registered successfully", "success");
        }
        else {
            // alert("Invalid password or user exists..");
            props.showAlert("Invalid password or user exists..", "danger");
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form onSubmit={handleClick}>
                <div className="form-group">
                    <label>User Type</label>
                    <div className="radio-div">
                        <label className="radio-label">
                            <input type="radio" name='userType' value="user"
                                checked={credentials.userType === "user"}
                                onChange={onChange}
                            />
                            User
                        </label>
                        <label className="radio-label">
                            <input type="radio" name='userType' value="admin"
                                checked={credentials.userType === "admin"}
                                onChange={onChange}
                            />
                            Admin
                        </label>
                    </div>
                </div>
                {credentials.userType === "admin" ? (
                    <div className="form-group">
                        <label >Secrect Key (Admin Only)</label>
                        <input type="text" name="secrectKey" placeholder="Enter Secrect Key" value={credentials.secrectKey} onChange={onChange} />
                    </div>
                ) : ""}

                <div className="form-group">
                    <label htmlFor="name">User Name</label>
                    <input type="text" className="form-control" name="name" id="name" placeholder="Enter userName" value={credentials.name} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" name="email" id="email" placeholder="Enter Email" value={credentials.email} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" id="password" placeholder="Password" value={credentials.password} onChange={onChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp
