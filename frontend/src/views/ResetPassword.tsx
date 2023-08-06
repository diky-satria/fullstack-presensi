import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "antd";
import logo from "../img/like.png";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { TError } from "../type";
import { useSelector } from "react-redux";
import axios from "../interceptor/axios";
import { toast } from "react-hot-toast";

export default function ResetPassword() {
  const { user } = useSelector((state: any) => state.auth);

  const { email, token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState<string>("");
  const [konfirmasiPassword, setKonfirmasiPassword] = useState<string>("");
  const [error, setError] = useState<TError>();
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

  const resetPassword = async () => {
    setLoading(true);
    try {
      let response = await axios.patch(
        `/api/v1/reset_password/${email}/${token}`,
        {
          password: password,
          konfirmasi_password: konfirmasiPassword,
        }
      );
      setLoading(false);
      navigate("/");
      toast.success(response.data.msg, {
        position: "top-right",
        duration: 6000,
        iconTheme: {
          primary: "#1bff1f",
          secondary: "#000000",
        },
        style: {
          borderRadius: "10px",
          background: "#1bff23",
          color: "#000000",
        },
      });
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
            <h4>Reset Password</h4>
          </div>
        </div>
        <div className="c-login-content">
          {(error && error.param === "email") ||
          (error && error.param === "token") ? (
            <div className="alert alert-danger c-alert-danger" role="alert">
              {error.msg}
            </div>
          ) : (
            ""
          )}
          <div className="form-group">
            <input
              type="password"
              className="form-control c-form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && error.param === "password" ? (
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
          <div className="form-group">
            <input
              type="password"
              className="form-control c-form-control"
              placeholder="Konfirmasi Password"
              value={konfirmasiPassword}
              onChange={(e) => setKonfirmasiPassword(e.target.value)}
            />
            {error && error.param === "konfirmasi_password" ? (
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
            onClick={resetPassword}
            loading={loading}
          >
            Reset Password
          </Button>

          <div
            style={{
              fontSize: "12px",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            @Copyright 2023 presensi <br />
            dibuat oleh{" "}
            <a
              href="https://dikysatria.net"
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: "12px",
                textDecoration: "none",
              }}
            >
              Diky satria
            </a>
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
