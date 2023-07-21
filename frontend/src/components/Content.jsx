import React from "react";
import styled from "styled-components";
import { AiOutlineAlignLeft, AiOutlineAlignRight } from "react-icons/ai";

export default function Content() {
  const clickHumbergerMenu = () => {
    var humbergurIcon = document.querySelector(".c-sidebar");
    var dashboard = document.querySelector(".c-right-content");
    var overlay = document.querySelector(".c-overlay");

    if (humbergurIcon.classList.contains("c-sidebar-show")) {
      humbergurIcon.classList.remove("c-sidebar-show");
      dashboard.classList.remove("c-right-content-show");
      overlay.classList.remove("c-overlay-show");
    } else {
      humbergurIcon.classList.add("c-sidebar-show");
      dashboard.classList.add("c-right-content-show");
      overlay.classList.add("c-overlay-show");
    }
  };

  return (
    <Div>
      <div className="c-right-content">
        <div className="c-navbar">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <span
                className="navbar-brand"
                onClick={() => clickHumbergerMenu()}
              >
                <AiOutlineAlignLeft
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                />
              </span>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                style={{
                  border: "1px solid transparent",
                  color: "#374456",
                }}
              >
                <AiOutlineAlignRight
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                />
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
                style={{
                  justifyContent: "space-between",
                }}
              >
                <div></div>
                <form className="d-flex">
                  <input
                    className="form-control c-form-control"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                </form>
                <ul className="navbar-nav c-navbar-nav mb-2 mb-lg-0">
                  <li className="nav-item dropdown">
                    <span
                      className="nav-link dropdown-toggle"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Administrator
                    </span>
                    <ul
                      className="dropdown-menu c-dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <span className="dropdown-item">Change Password</span>
                      </li>
                      <li>
                        <span className="dropdown-item">Edit Profil</span>
                      </li>
                      <li>
                        <span className="dropdown-item">Logout</span>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div className="c-content">
          <div className="c-content-header">
            <h4>Dashboard</h4>
            <p>Overview</p>
          </div>
          <div className="row">
            <div className="col-md-3 mb-3">
              <div className="card">
                <div className="card-body">Card 1</div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card">
                <div className="card-body">Card 2</div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card">
                <div className="card-body">Card 3</div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card">
                <div className="card-body">Card 4</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">Card 5</div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">Card 6</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8 mb-3">
              <div className="card">
                <div className="card-body">Card 7</div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">Card 8</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md mb-3">
              <div className="card">
                <div className="card-body" style={{ textAlign: "justify" }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laboriosam error vero dolores nesciunt fugiat voluptatibus,
                  animi dignissimos exercitationem commodi non velit corporis
                  mollitia corrupti perspiciatis doloremque totam temporibus
                  aspernatur distinctio! Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Laboriosam error vero dolores nesciunt
                  fugiat voluptatibus, animi dignissimos exercitationem commodi
                  non velit corporis mollitia corrupti perspiciatis doloremque
                  totam temporibus aspernatur distinctio! Lorem ipsum dolor sit
                  amet consectetur adipisicing elit. Laboriosam error vero
                  dolores nesciunt fugiat voluptatibus, animi dignissimos
                  exercitationem commodi non velit corporis mollitia corrupti
                  perspiciatis doloremque totam temporibus aspernatur
                  distinctio! Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Laboriosam error vero dolores nesciunt fugiat
                  voluptatibus, animi dignissimos exercitationem commodi non
                  velit corporis mollitia corrupti perspiciatis doloremque totam
                  temporibus aspernatur distinctio! Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Laboriosam error vero dolores
                  nesciunt fugiat voluptatibus, animi dignissimos exercitationem
                  commodi non velit corporis mollitia corrupti perspiciatis
                  doloremque totam temporibus aspernatur distinctio! Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Laboriosam error
                  vero dolores nesciunt fugiat voluptatibus, animi dignissimos
                  exercitationem commodi non velit corporis mollitia corrupti
                  perspiciatis doloremque totam temporibus aspernatur
                  distinctio! Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Laboriosam error vero dolores nesciunt fugiat
                  voluptatibus, animi dignissimos exercitationem commodi non
                  velit corporis mollitia corrupti perspiciatis doloremque totam
                  temporibus aspernatur distinctio! Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Laboriosam error vero dolores
                  nesciunt fugiat voluptatibus, animi dignissimos exercitationem
                  commodi non velit corporis mollitia corrupti perspiciatis
                  doloremque totam temporibus aspernatur distinctio! Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Laboriosam error
                  vero dolores nesciunt fugiat voluptatibus, animi dignissimos
                  exercitationem commodi non velit corporis mollitia corrupti
                  perspiciatis doloremque totam temporibus aspernatur
                  distinctio! Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Laboriosam error vero dolores nesciunt fugiat
                  voluptatibus, animi dignissimos exercitationem commodi non
                  velit corporis mollitia corrupti perspiciatis doloremque totam
                  temporibus aspernatur distinctio! Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Laboriosam error vero dolores
                  nesciunt fugiat voluptatibus, animi dignissimos exercitationem
                  commodi non velit corporis mollitia corrupti perspiciatis
                  doloremque totam temporibus aspernatur distinctio! Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Laboriosam error
                  vero dolores nesciunt fugiat voluptatibus, animi dignissimos
                  exercitationem commodi non velit corporis mollitia corrupti
                  perspiciatis doloremque totam temporibus aspernatur
                  distinctio! Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Laboriosam error vero dolores nesciunt fugiat
                  voluptatibus, animi dignissimos exercitationem commodi non
                  velit corporis mollitia corrupti perspiciatis doloremque totam
                  temporibus aspernatur distinctio! Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Laboriosam error vero dolores
                  nesciunt fugiat voluptatibus, animi dignissimos exercitationem
                  commodi non velit corporis mollitia corrupti perspiciatis
                  doloremque totam temporibus aspernatur distinctio! Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Laboriosam error
                  vero dolores nesciunt fugiat voluptatibus, animi dignissimos
                  exercitationem commodi non velit corporis mollitia corrupti
                  perspiciatis doloremque totam temporibus aspernatur
                  distinctio! Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Laboriosam error vero dolores nesciunt fugiat
                  voluptatibus, animi dignissimos exercitationem commodi non
                  velit corporis mollitia corrupti perspiciatis doloremque totam
                  temporibus aspernatur distinctio! Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Laboriosam error vero dolores
                  nesciunt fugiat voluptatibus, animi dignissimos exercitationem
                  commodi non velit corporis mollitia corrupti perspiciatis
                  doloremque totam temporibus aspernatur distinctio! Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Laboriosam error
                  vero dolores nesciunt fugiat voluptatibus, animi dignissimos
                  exercitationem commodi non velit corporis mollitia corrupti
                  perspiciatis doloremque totam temporibus aspernatur
                  distinctio! Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Laboriosam error vero dolores nesciunt fugiat
                  voluptatibus, animi dignissimos exercitationem commodi non
                  velit corporis mollitia corrupti perspiciatis doloremque totam
                  temporibus aspernatur distinctio! Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Laboriosam error vero dolores
                  nesciunt fugiat voluptatibus, animi dignissimos exercitationem
                  commodi non velit corporis mollitia corrupti perspiciatis
                  doloremque totam temporibus aspernatur distinctio! Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Laboriosam error
                  vero dolores nesciunt fugiat voluptatibus, animi dignissimos
                  exercitationem commodi non velit corporis mollitia corrupti
                  perspiciatis doloremque totam temporibus aspernatur
                  distinctio! Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Laboriosam error vero dolores nesciunt fugiat
                  voluptatibus, animi dignissimos exercitationem commodi non
                  velit corporis mollitia corrupti perspiciatis doloremque totam
                  temporibus aspernatur distinctio! Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Laboriosam error vero dolores
                  nesciunt fugiat voluptatibus, animi dignissimos exercitationem
                  commodi non velit corporis mollitia corrupti perspiciatis
                  doloremque totam temporibus aspernatur distinctio! Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Laboriosam error
                  vero dolores nesciunt fugiat voluptatibus, animi dignissimos
                  exercitationem commodi non velit corporis mollitia corrupti
                  perspiciatis doloremque totam temporibus aspernatur
                  distinctio! Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Laboriosam error vero dolores nesciunt fugiat
                  voluptatibus, animi dignissimos exercitationem commodi non
                  velit corporis mollitia corrupti perspiciatis doloremque totam
                  temporibus aspernatur distinctio! Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Laboriosam error vero dolores
                  nesciunt fugiat voluptatibus, animi dignissimos exercitationem
                  commodi non velit corporis mollitia corrupti perspiciatis
                  doloremque totam temporibus aspernatur distinctio! Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Laboriosam error
                  vero dolores nesciunt fugiat voluptatibus, animi dignissimos
                  exercitationem commodi non velit corporis mollitia corrupti
                  perspiciatis doloremque totam temporibus aspernatur
                  distinctio! Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Laboriosam error vero dolores nesciunt fugiat
                  voluptatibus, animi dignissimos exercitationem commodi non
                  velit corporis mollitia corrupti perspiciatis doloremque totam
                  temporibus aspernatur distinctio!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Div>
  );
}

const Div = styled.div`
  .c-right-content {
    position: relative;
    left: 0;
    width: 100vw;
    transition: all 0.5s;
    z-index: 2 !important;
    min-height: 100vh;
    padding-right: 2px;
  }
  .c-right-content.c-right-content-show {
    left: 0;
    width: 100vw;
  }
  .c-right-content.c-right-content-show .navbar {
    width: 100vw !important;
  }

  .c-navbar {
    transition: all 0.5s;
  }
  .navbar {
    position: fixed !important;
    background-color: transparent !important;
    transition: all 0.5s;
    top: 0 !important;
    width: 100vw;
    backdrop-filter: blur(5px) !important;
    -webkit-backdrop-filter: blur(5px) !important;
    z-index: 3;
    height: 49px !important;
  }
  .navbar-toggler:focus {
    box-shadow: none !important;
  }
  .c-form-control {
    background-color: transparent !important;
    border: 2px solid #5356fb;
    border-radius: 15px;
    box-shadow: none !important;
  }
  .navbar-collapse {
    background-color: #ffffff !important;
    padding: 20px !important;
    border-radius: 20px;
    box-shadow: 1px 1px 15px #909090;
  }
  .navbar-collapse.show {
    z-index: 5 !important;
    transition: all 0.5s;
    backdrop-filter: blur(5px) !important;
    -webkit-backdrop-filter: blur(5px) !important;
  }
  .c-navbar-nav {
    margin-top: 10px;
  }
  .c-dropdown-menu li:hover .dropdown-item {
    color: #5356fb !important;
    font-weight: 500 !important;
    background-color: #c8cbff !important;
  }
  .c-navbar-nav:hover li a.nav-link {
    color: #5356fb !important;
  }
  .c-navbar-nav .dropdown-menu {
    border: 1px solid transparent !important;
    backdrop-filter: blur(5px) !important;
    -webkit-backdrop-filter: blur(5px) !important;
  }
  .c-dropdown-menu li {
    cursor: pointer;
  }
  .nav-item {
    padding: 7px 11px;
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 500;
    color: #374456;
  }
  .nav-item.dropdown {
    padding: 7px 11px;
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 500;
    color: #374456;
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
  .c-content {
    padding: 13px;
    padding-top: 70px;
  }

  /* responsive */
  @media (min-width: 768px) {
    .c-right-content {
      left: 220px !important;
      width: calc(100vw - 220px) !important;
    }
    .c-right-content.c-right-content-show {
      left: 0 !important;
      width: 100vw !important;
    }
    .c-navbar {
      width: calc(100vw - 220px) !important;
    }
    .navbar {
      position: fixed !important;
      top: 0 !important;
      width: calc(100vw - 220px) !important;
    }
    .c-right-content.c-right-content-show .c-navbar {
      width: 100vw !important;
    }
  }

  @media (min-width: 992px) {
    .navbar-collapse {
      background-color: transparent !important;
      box-shadow: none !important;
    }
    .navbar-collapse.show {
      background-color: transparent !important;
    }
    .c-navbar-nav {
      margin-top: 0;
    }
    .nav-item.dropdown {
      height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  /* end responsive */
`;
