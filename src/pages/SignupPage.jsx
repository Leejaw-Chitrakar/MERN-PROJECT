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
            localStorage.setItem('accessToken', json.authtoken);
            // window.location.href = '/login';
            // alert("User registered successfully");
            setCredentials({ name: "", email: "", password: "" , userType:"user", secrectKey:""});
            navigate('/login');
            // props.showAlert("User registered successfully", "success");
        }
        else {
            // alert("Invalid password or user exists..");
            // props.showAlert("Invalid password or user exists..", "danger");
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
