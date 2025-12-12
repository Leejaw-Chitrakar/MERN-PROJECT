// Example: src/api/auth.js

export async function loginUser(email, password) {
  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();
  return data; // { authtoken: "..." } or error
}

export async function registerUser(name, email, password) {
  const response = await fetch('http://localhost:5000/api/auth/createuser', {
    method:"POST",
    headers:
  )