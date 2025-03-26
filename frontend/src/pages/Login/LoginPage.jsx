import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "../../components/InputField/InputField";
import PasswordToggle from "../../components/PasswordToggle/PasswordToggle";
import styles from "./LoginPage.module.css";
import { FaLock } from "react-icons/fa";
import useAuth from "../../context/useAuth";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import API from "../../api/API";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  // Handle form data change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Form validation function

  const validateForm = () => {
    let isValid = true;

    if (validator.isEmpty(formData.email)) {
      toast.error("Email is required");
      isValid = false;
    } else if (!validator.isEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      isValid = false;
    }

    if (validator.isEmpty(formData.password)) {
      toast.error("Password is required");
      isValid = false;
    }

    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      try {
        const res = await fetch(API.LOGIN, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (res.ok) {
          login(data); // ya token set karna yaha
          toast.success("Logged in successfully!");
          setFormData({
            email: "",
            password: "",
          });
          navigate("/");
        } else {
          toast.error(data.message || "Login Failed");
        }
      } catch (error) {
        toast.error("Something went wrong! Try again.");
      }
    }
  };

  // Toggle password visibility
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className={`d-flex justify-content-center align-items-center min-vh-100 ${styles.formContainer}`}
    >
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
      />
      <form
        onSubmit={handleSubmit}
        className={`bg-light p-4 rounded shadow ${styles.form}`}
      >
        {/* Heading Added Here */}
        <h2 className={styles.heading}>Institute Management Software</h2>

        <InputField
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          icon="email"
          label="Email"
        />
        <div className="mb-3 position-relative">
          <label
            htmlFor="password"
            className="form-label d-flex align-items-center fw-bold"
          >
            <FaLock className="me-2" />
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
          />
          <PasswordToggle
            showPassword={showPassword}
            togglePassword={togglePassword}
          />
        </div>
        <div className="mb-3 text-center">
          <p>
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-decoration-none fw-bold">
              Sign up
            </Link>
          </p>
        </div>
        <button type="submit" className="btn btn-primary w-100 fw-bolder">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
