import React from "react";
import styled from "styled-components";
import logo from "../img/success-logo.png";
import { Button } from "antd";
import { NavLink } from "react-router-dom";

export default function Login() {
  return (
    <Div>
      <div className="c-login-container">
        <div className="c-login-header">
          <div className="c-login-logo text-center">
            <img src={logo} alt={logo} width={80} />
          </div>
          <div className="c-login-title my-4">
            <h5>Hi, there</h5>
            <h4>Welcome Back</h4>
          </div>
        </div>
        <div className="c-login-content">
          <form>
            <div className="form-group">
              <input
                className="form-control c-form-control"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="form-group">
              <input
                className="form-control c-form-control"
                type="password"
                placeholder="Password"
              />
            </div>

            <NavLink to="/forgot_password">
              <p
                style={{
                  fontSize: "12px",
                  float: "right",
                  marginTop: "5px",
                }}
              >
                Forgot password?
              </p>
            </NavLink>
          </form>
        </div>
        <div className="c-login-footer">
          <NavLink to="/dashboard">
            <Button
              type="primary"
              size="large"
              className="c-btn-login"
              style={{
                backgroundColor: "#5356FB",
                border: "1px solid #5356FB",
              }}
            >
              Login
            </Button>
          </NavLink>

          <div
            style={{
              fontSize: "12px",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            Don't have an account?
            <NavLink to="/register" style={{ textDecoration: "none" }}>
              <span
                style={{
                  fontSize: "12px",
                  textAlign: "center",
                  marginTop: "20px",
                  marginLeft: "5px",
                }}
              >
                Create new one
              </span>
            </NavLink>
          </div>
        </div>
      </div>
    </Div>
  );
}

const Div = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #faf2ff81;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  .c-login-container {
    width: 300px;
    background-color: #faf2ff81;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    padding: 30px;
    border-radius: 10px;
  }
  .c-form-control {
    margin-bottom: 15px;
    box-shadow: none;
    padding: 9px 20px;
    border-radius: 20px;
    background-color: #faf2ffce;
    backdrop-filter: blur(5px) !important;
    -webkit-backdrop-filter: blur(5px) !important;
    border: 1px solid transparent;
  }
  .c-form-control:focus {
    border: 1px solid #5356fb;
  }
  .c-form-control::placeholder {
    color: #a9a9a9;
  }
  .c-btn-login {
    border-radius: 20px;
    width: 100%;
  }
`;
