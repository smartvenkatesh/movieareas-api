import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import { toast, ToastContainer } from "react-toastify";
import { encrypt } from "../utils/encrypted";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setEmail, } = useUser();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = "email is required";
    if (!form.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const encrypted = encrypt({form})
        console.log("encrypted",encrypted);
        const res = await fetch("http://localhost:8080/events/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(encrypted),
        });
        const data = await res.json();
        toast.error("Login Error");

        if (!res.ok) {
          setErrors({ form: data.message || "Login Failed" });
          return;
        }
        localStorage.setItem("token", data.token);

        setEmail(form.email);

        navigate("/home");
      } catch (err) {
        toast.error("Login Error", err);
      }
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Login</h2>
        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.username && <span style={styles.error}>{errors.username}</span>}

        <input
          style={styles.input}
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <span style={styles.error}>{errors.password}</span>}
        <Link className="py-3" to="forgot-password">
          forgot password?
        </Link>
        <button type="submit" style={styles.button}>
          Login
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "100px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    padding: "30px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    background: "#fff",
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  },
};

export default Login;
