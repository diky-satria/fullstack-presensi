import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../img/like.png";
import { Button, Checkbox } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loginApi, authSuccessApiLogin } from "../redux/auth/action";
import { authErrorDelete } from "../redux/authError/action";
import { TLoginApi } from "../type";
import axios from "../interceptor/axios";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, isLoading } = useSelector((state: any) => state.authError);
  const { user } = useSelector((state: any) => state.auth);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  useEffect(() => {
    cekRememberMe();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/absensi");
      }
    }
    return () => {
      dispatch(authErrorDelete());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate]);

  const remember = (e: any) => {
    setRememberMe(e.target.checked);
  };

  const login = () => {
    let data: TLoginApi = {
      username: email,
      password: password,
      remember_me: rememberMe,
    };

    dispatch(loginApi(data));
  };

  const cekRememberMe = async () => {
    let response = await axios.get("/api/v1/remember_me");

    if (response.data.status === 200) {
      dispatch(authSuccessApiLogin(response.data));
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
            <h5>Hi,</h5>
            <h4>Silahkan Login</h4>
          </div>
        </div>
        <div className="c-login-content">
          <form>
            <div className="form-group">
              <input
                className="form-control c-form-control"
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              {isError && isError.param === "username" ? (
                <small
                  className="form-text"
                  style={{ color: "red", marginLeft: "10px" }}
                >
                  {isError.msg}
                </small>
              ) : (
                ""
              )}
            </div>
            <div className="form-group">
              <input
                className="form-control c-form-control"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              {isError && isError.param === "password" ? (
                <small
                  className="form-text"
                  style={{ color: "red", marginLeft: "10px" }}
                >
                  {isError.msg}
                </small>
              ) : (
                ""
              )}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "15px",
                marginBottom: "5px",
              }}
            >
              <Checkbox
                onChange={remember}
                style={{
                  fontSize: "12px",
                  marginTop: "-13px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    position: "relative",
                  }}
                >
                  Ingat saya
                </span>
              </Checkbox>
              <NavLink to="/lupa_password">
                <p
                  style={{
                    fontSize: "12px",
                    float: "right",
                  }}
                >
                  Lupa password?
                </p>
              </NavLink>
            </div>
          </form>
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
            onClick={login}
            loading={isLoading}
          >
            Login
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
  }
`;
