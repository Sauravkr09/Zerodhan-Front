import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [captchaQuestion, setCaptchaQuestion] = useState({});
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  const { email, password, username } = inputValue;

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptchaQuestion({ num1, num2, answer: num1 + num2 });
    setCaptchaError(""); // Clear error message when captcha changes
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseInt(captchaInput) !== captchaQuestion.answer) {
      setCaptchaError("CAPTCHA is incorrect. Please try again.");
      generateCaptcha(); // Regenerate CAPTCHA on failure
      return;
    }

    try {
      const { data } = await axios.post(
        "https://zerodha-pq9f.onrender.com/signup",
        { ...inputValue },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        setTimeout(() => {
          window.location.href = "https://dashboard.d3bnl1cz0kxf11.amplifyapp.com";
        }, 1000);
      } else {
        alert(message);
      }
    } catch (error) {
      console.log(error);
    }

    setInputValue({ email: "", password: "", username: "" });
    setCaptchaInput("");
    generateCaptcha();
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

          .signup-container {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            height: 100vh;
            padding: 1rem;
            background-color: #f4f4f9;
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

          .captcha-section {
            margin-top: 1rem;
          }

          .captcha-error {
            color: red;
            text-align: center;
            margin-top: 0.5rem;
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

      <div className="signup-container">
        <div className="form_container">
          <h2>Signup Account</h2>
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
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={username}
                placeholder="Enter your username"
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

            {/* CAPTCHA Section */}
            <div className="captcha-section">
              <label>
                Solve the CAPTCHA: {captchaQuestion.num1} + {captchaQuestion.num2} = ?
              </label>
              <input
                type="number"
                placeholder="Enter your answer"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                required
              />
              {captchaError && <div className="captcha-error">{captchaError}</div>}
            </div>

            <button type="submit">Submit</button>
            <span>
              Already have an account? <Link to={"/login"}>Login</Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
