import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "antd";
import logo from "../img/like.png";
import { NavLink, useNavigate } from "react-router-dom";
import { TError } from "../type";
import { useSelector } from "react-redux";
import axios from "../interceptor/axios";

export default function ForgotPassword() {
  const { user } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<TError>();
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/absensi");
      }
    }
  }, [user, navigate]);

  const kirimEmail = async () => {
    setLoading(true);
    setSuccessMessage("");
    try {
      let response = await axios.post("/api/v1/lupa_password", {
        email: email,
      });

      setSuccessMessage(response.data.msg);
      setLoading(false);
      setError({ msg: "", value: "", param: "", location: "" });
      setEmail("");
    } catch (e: any) {
      setError(e.response.data.errors);
      setLoading(false);
    }
  };

  return (
    <Div>
      <div className="c-login-container">
        <div className="c-login-header">
          <div className="c-login-logo text-center">
            <img src={logo} alt={logo} width={80} />
          </div>
          <div className="c-login-title my-4">
            <h4>Lupa Password</h4>
          </div>
        </div>
        <div className="c-login-content">
          {successMessage ? (
            <div className="alert alert-success c-alert-success" role="alert">
              {successMessage}
            </div>
          ) : (
            ""
          )}
          <div className="form-group">
            <input
              type="text"
              className="form-control c-form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && error.param === "email" ? (
              <small
                className="form-text"
                style={{ color: "red", marginLeft: "10px" }}
              >
                {error.msg}
              </small>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="c-login-footer">
          <Button
            type="primary"
            size="large"
            className="c-btn-login"
            style={{
              backgroundColor: "#5356FB",
              border: "1px solid #5356FB",
            }}
            onClick={kirimEmail}
            loading={loading}
          >
            Kirim Link
          </Button>

          <div
            style={{
              fontSize: "12px",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            Tidak lupa password?
            <NavLink to="/" style={{ textDecoration: "none" }}>
              <span
                style={{
                  fontSize: "12px",
                  textAlign: "center",
                  marginTop: "20px",
                  marginLeft: "5px",
                }}
              >
                Login sekarang
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
    margin-top: 15px;
    box-shadow: none;
    padding: 9px 20px;
    border-radius: 20px;
    background-color: #dbdbdbce;
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
    margin-top: 15px;
  }
`;
