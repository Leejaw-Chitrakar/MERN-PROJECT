import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
         const token = localStorage.getItem("accessToken");
    if (!token) {
      // Redirect to login or show error
      setError("You are not logged in.");
      setLoading(false);
      return;
    }
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.post(
          "http://localhost:5000/api/auth/getuser",
          {},
          {
            headers: {
              "auth-token": token,
            },
          }
        );
        setUser(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Could not load profile.</div>;

  return (
    <div>
      <h2>Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {/* Add more fields if needed */}
    </div>
  );
}

export default Profile;