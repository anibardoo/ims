import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfilePictureUpload from "../../components/ProfilePictureUpload/ProfilePictureUpload";
import InputField from "../../components/InputField/InputField";
import PasswordToggle from "../../components/PasswordToggle/PasswordToggle";
import styles from "./SignupPage.module.css";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../context/useAuth";
import validator from "validator";
import API from "../../api/API";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    institute: "",
    password: "",
    profilePicture: null,
  });

  const [showPassword, setShowPassword] = useState(false);

  const { login, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          profilePicture: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (validator.isEmpty(formData.username)) {
      toast.error("Username is required");
      isValid = false;
    }

    if (validator.isEmpty(formData.email)) {
      toast.error("Email is required");
      isValid = false;
    } else if (!validator.isEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      isValid = false;
    }

    if (validator.isEmpty(formData.mobile)) {
      toast.error("Mobile number is required");
      isValid = false;
    } else if (!validator.isMobilePhone(formData.mobile, "en-IN")) {
      toast.error("Please enter a valid Indian mobile number");
      isValid = false;
    }

    if (validator.isEmpty(formData.institute)) {
      toast.error("Institute Name is required");
      isValid = false;
    }

    if (validator.isEmpty(formData.password)) {
      toast.error("Password is required");
      isValid = false;
    } else if (
      !validator.isStrongPassword(formData.password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      toast.error(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      try {
        const res = await fetch(API.REGISTER, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (res.ok) {
          toast.success("Signup Successful");
          setFormData({
            username: "",
            email: "",
            mobile: "",
            institute: "",
            password: "",
            profilePicture: null,
          });
          navigate("/");
        } else {
          toast.error(data.message || "Signup Failed");
        }
      } catch (error) {
        toast.error("Signup Failed. Please try again.");
      }
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className={`d-flex justify-content-center align-items-center min-vh-100 ${styles.formContainer}`}
    >
      <ToastContainer position="top-right" autoClose={3000} />
      <form
        onSubmit={handleSubmit}
        className={`bg-light p-4 rounded shadow ${styles.form}`}
      >
        {/* Heading Added Here */}
        <h2 className={styles.heading}>Institute Management Software</h2>

        <ProfilePictureUpload
          profilePicture={formData.profilePicture}
          onImageChange={handleImageChange}
        />
        <InputField
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          icon="user"
          label="Username"
        />
        <InputField
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          icon="email"
          label="Email"
        />
        <InputField
          type="tel"
          id="mobile"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          icon="phone"
          label="Mobile Number"
          helperText="Enter a 10-digit mobile number"
        />
        <InputField
          type="text"
          id="institute"
          name="institute"
          value={formData.institute}
          onChange={handleChange}
          icon="institute"
          label="Institute Name"
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
            Already have an account?{" "}
            <Link to={"/login"} className="text-decoration-none fw-bold">
              Login
            </Link>
          </p>
        </div>
        <button type="submit" className="btn btn-primary w-100 fw-bolder">
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
