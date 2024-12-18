import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [userCaptcha, setUserCaptcha] = useState("");
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;

  // Generate random Captcha
  function generateCaptcha() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  // Handle input changes
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userCaptcha !== captcha) {
      alert("Invalid Captcha. Please try again.");
      setCaptcha(generateCaptcha());
      return;
    }

    try {
      const { data } = await axios.post(
        "https://zerodha-pq9f.onrender.com/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        setSuccessMessage(message);
        setTimeout(() => {
          window.location.href = "https://dashboard.d3bnl1cz0kxf11.amplifyapp.com";
        }, 1000);
      } else {
        alert(message);
      }
    } catch (error) {
      console.log(error);
    }

    setInputValue({ email: "", password: "" });
    setCaptcha(generateCaptcha());
    setUserCaptcha("");
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .form_container {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            animation: fadeIn 1s ease-in-out;
            width: 100%;
            max-width: 400px;
          }

          h2 {
            text-align: center;
            color: #333;
            margin-bottom: 1.5rem;
          }

          label {
            display: block;
            margin: 0.5rem 0 0.25rem;
          }

          input {
            width: 100%;
            padding: 0.5rem;
            margin-bottom: 1rem;
            border: 1px solid #ccc;
            border-radius: 5px;
          }

          .captcha {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
          }

          .captcha-code {
            background-color: #f4f4f4;
            padding: 0.5rem 1rem;
            font-weight: bold;
            letter-spacing: 2px;
            font-size: 1.2rem;
            border: 1px solid #ccc;
            border-radius: 5px;
          }

          button {
            width: 100%;
            background-color: #4caf50;
            color: white;
            padding: 0.75rem;
            border: none;
            border-radius: 5px;
            font-size: 1rem;
            cursor: pointer;
          }

          button:hover {
            background-color: #45a049;
          }

          span {
            display: block;
            text-align: center;
            margin-top: 1rem;
          }

          @media (max-width: 768px) {
            .form_container {
              padding: 1.5rem;
              width: 90%;
            }
          }
        `}
      </style>

      <div className="sig p-5" style={{ height: "700px" }}>
        <div style={{ marginLeft: "550px" }} className="form_container mt-5">
          <h2>Login Account</h2>
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={handleOnChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={handleOnChange}
                required
              />
            </div>

            {/* Captcha Section */}
            <div className="captcha">
              <span className="captcha-code">{captcha}</span>
              <button
                type="button"
                onClick={() => setCaptcha(generateCaptcha())}
                style={{
                  backgroundColor: "#007bff",
                  marginLeft: "10px",
                  fontSize: "0.9rem",
                }}
              >
                Refresh Captcha
              </button>
            </div>
            <div>
              <label htmlFor="captcha">Enter Captcha</label>
              <input
                type="text"
                name="captcha"
                value={userCaptcha}
                placeholder="Enter the captcha"
                onChange={(e) => setUserCaptcha(e.target.value)}
                required
              />
            </div>

            <button type="submit">Submit</button>
            <span>
              Don't have an account? <Link to={"/signUp"}>Signup</Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
