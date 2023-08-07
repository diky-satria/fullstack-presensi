import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../img/like.png";
import {
  AiFillWindows,
  AiOutlineArrowDown,
  AiFillHdd,
  AiFillPieChart,
  AiFillContacts,
} from "react-icons/ai";
import {
  BsFillKeyFill,
  BsFillPeopleFill,
  BsCalendarDateFill,
  BsFillLayersFill,
} from "react-icons/bs";
import { NavLink } from "react-router-dom";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";

import { logoutApi } from "../redux/auth/action";

interface Props {
  dispatch: any;
  navigate: any;
  user: any;
  logout(): void;
}
export default function Sidebar(props: Props) {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    var url = window.location.href;
    var url_split = url.split("/");

    var key = url_split[3];
    if (key === "jabatan" || key === "karyawan" || key === "hari_libur") {
      var master_data = document.getElementById("component");
      if (master_data) {
        master_data.click();
      }
      var sub_nav = document.getElementById(`${key}`);
      if (sub_nav) {
        sub_nav.click();
      }
    }

    // clock
    const interval = setInterval(() => setValue(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const activeMenu = (e: any) => {
    var navLink = document.getElementsByClassName("nav-item");
    for (var i = 0; i < navLink.length; i++) {
      navLink[i].classList.remove("active");
    }

    e.currentTarget.classList.add("active");
  };

  const logout = () => {
    props.dispatch(logoutApi(props.navigate));
  };

  return (
    <Div>
      <div className="c-sidebar">
        <div className="c-sidebar-logo">
          <img src={logo} alt="logo" />
          <span>Presensi</span>
        </div>
        <div className="c-sidebar-menu">
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Clock value={value} renderNumbers={true} />
            </div>
            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-4 mt-4 mb-1 text-muted">
              <span
                style={{
                  fontSize: "16px",
                  color: "#5356FB",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                Menu
              </span>
            </h6>
            <ul className="nav flex-column mb-2 c-nav">
              {props.user && props.user.role === "admin" ? (
                <>
                  <NavLink
                    to="/dashboard"
                    className="nav-item"
                    onClick={(e) => activeMenu(e)}
                  >
                    <AiFillWindows className="c-icon-nav-link" />
                    Dashboard
                  </NavLink>
                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingOne">
                        <li
                          className="nav-item"
                          // type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          // aria-expanded="true"
                          aria-controls="collapseOne"
                          onClick={(e) => activeMenu(e)}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                          id="component"
                        >
                          <div>
                            <AiFillHdd className="c-icon-nav-link" />
                            Master Data
                          </div>
                          <AiOutlineArrowDown />
                        </li>
                      </h2>
                      <div
                        id="collapseOne"
                        className="collapse"
                        aria-labelledby="headingOne"
                        data-parent="#accordionExample"
                      >
                        <div
                          style={{
                            marginLeft: "10px",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <NavLink
                            to="/jabatan"
                            className="nav-item"
                            onClick={(e) => activeMenu(e)}
                            id="jabatan"
                          >
                            <BsFillLayersFill className="c-icon-nav-link" />
                            Jabatan
                          </NavLink>
                          <NavLink
                            to="/karyawan"
                            className="nav-item"
                            onClick={(e) => activeMenu(e)}
                            id="karyawan"
                          >
                            <BsFillPeopleFill className="c-icon-nav-link" />
                            Karyawan
                          </NavLink>
                          <NavLink
                            to="/hari_libur"
                            className="nav-item"
                            onClick={(e) => activeMenu(e)}
                            id="hari_libur"
                          >
                            <BsCalendarDateFill className="c-icon-nav-link" />
                            Hari Libur
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}

              {props.user && props.user.role === "user" ? (
                <>
                  <NavLink
                    to="/absensi"
                    className="nav-item"
                    onClick={(e) => activeMenu(e)}
                  >
                    <AiFillContacts className="c-icon-nav-link" />
                    Absensi
                  </NavLink>
                  <NavLink
                    to="/riwayat"
                    className="nav-item"
                    onClick={(e) => activeMenu(e)}
                  >
                    <AiFillPieChart className="c-icon-nav-link" />
                    Riwayat
                  </NavLink>
                </>
              ) : (
                ""
              )}
              <NavLink
                to="/ubah_password"
                className="nav-item"
                onClick={(e) => activeMenu(e)}
              >
                <BsFillKeyFill className="c-icon-nav-link" />
                Ubah Password
              </NavLink>
            </ul>
          </div>
        </div>
        <div className="c-sidebar-logout">
          <button className="btn c-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </Div>
  );
}

const Div = styled.div`
  .c-sidebar {
    position: fixed;
    height: 100vh;
    width: 220px;
    transform: translate(-220px, 0);
    transition: all 0.5s;
    z-index: 3 !important;
    background-color: #faf2ff81;
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
  }
  .c-sidebar li {
    cursor: pointer;
  }
  .c-sidebar.c-sidebar-show {
    transform: translate(0, 0);
  }
  .c-sidebar-logo {
    height: 49px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
  }
  .c-sidebar-logo img {
    height: 100%;
  }
  .c-sidebar-logo span {
    font-size: 20px;
    font-weight: 500;
    line-height: 20px;
  }
  .c-sidebar-menu {
    height: calc(100vh - 15vh - 79px);
    width: 100%;
    position: absolute;
    overflow-y: scroll;
  }
  .c-sidebar-menu::-webkit-scrollbar {
    width: 5px;
    background-color: #d0d2ff;
    border-radius: 5px;
  }
  .c-sidebar-menu::-webkit-scrollbar-thumb {
    background-color: #5356fb;
    border-radius: 5px;
  }

  .nav-item {
    padding: 7px 11px;
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 500;
    color: #374456;
    text-decoration: none;
  }
  .nav-item.active,
  .nav-item:hover {
    background-color: #d0d2ff !important;
    border-radius: 10px;
    color: #5356fb;
  }
  .nav-item.active a {
    color: #5356fb;
    font-weight: 600;
  }
  .c-icon-nav-link {
    font-size: 25px;
    background-color: #c8cbff;
    padding: 5px;
    border-radius: 50%;
    margin-right: 7px;
    color: #374456;
  }
  .nav-item.active .c-icon-nav-link {
    background-color: #5356fb;
    color: white;
  }
  .nav-item:hover .c-icon-nav-link {
    background-color: #5356fb;
    color: white;
  }
  .accordion-button {
    padding: 7px 10px !important;
    box-shadow: none !important;
    background-color: transparent !important;
    border: 1px solid transparent !important;
  }
  .accordion-button.nav-item {
    border-radius: 10px !important;
  }
  .accordion-item {
    background-color: transparent !important;
    border: 1px solid transparent !important;
  }
  .c-nav {
    padding: 0 10px !important;
  }
  .c-sidebar-logout {
    position: absolute;
    height: 15vh;
    width: 100%;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* CLOCK */
  .react-clock__face {
    border: 3px solid #5356fb;
  }
  .react-clock__mark__number {
    color: #5356fb;
    font-weight: bold;
  }
  .react-clock__second-hand__body {
    background-color: red;
  }
  /* END CLOCK */

  /* responsive */
  @media (min-width: 768px) {
    .c-sidebar {
      transform: translate(0, 0) !important;
    }
    .c-sidebar.c-sidebar-show {
      transform: translate(-220px, 0) !important;
    }
  }
  /* end responsive */
`;
