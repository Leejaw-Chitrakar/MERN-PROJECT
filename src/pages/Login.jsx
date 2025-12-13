// // Example: src/pages/Login.jsx
// import React, { useState } from 'react';
// import { loginUser } from '../api/auth';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const result = await loginUser(email, password);
//     if (result.authtoken) {
//       localStorage.setItem('accessToken', result.authtoken);
//       // Redirect or update UI
//     } else {
//       setError(result.error || 'Login failed');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
//       <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
//       <button type="submit">Login</button>
//       {error && <div>{error}</div>}
//     </form>
//   );
// }

// export default Login;
// Example: src/pages/Login.jsx
import React, {useState} from 'react'

const Login = () => {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [credentials, setCredentials] = useState({email:"", password:""});

    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log("login");
        // const email = e.target.email.value;
        // const password = e.target.password.value;

         const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST", // It's better to use PUT or PATCH for updates
      headers: {
        "Content-Type": "application/json",
        // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhjM2M4YTA4MDgxNWRiYTU2ZTAyNTk3In0sImlhdCI6MTc1NzY2MTM3MX0.h9-DVVkGq6R-VsD43wn7itudWYV8knuMZ1B3h6hRLjo"
      },
      body: JSON.stringify({ email: credentials.email , password: credentials.password }), // Correctly defined data object;
    });
    const json = await response.json()
    console.log(json);
    if(json.success){
        // redirect to main page and save the auth token
        localStorage.setItem('accessToken', json.authtoken);
        window.location.href = "/";
        // props.showAlert("User logged in successfully", "success");

    }
    else{
        alert("Invalid Credentials");
        // props.showAlert("Invalid Credentials", "danger"); 
    }
}
 const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name] : e.target.value})
    //  setEmail(e.target.value);
    //  setPassword(e.target.value);
    }
  return (
    <div>
    <form  onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" placeholder="Enter email" value={credentials.email} onChange={onChange}/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" id="password" name='password' placeholder="Password" value={credentials.password} onChange={onChange}/> 
  </div>
  <button type="submit" className="btn btn-primary">Login</button>
</form>
    </div>
  )
}

export default Login
