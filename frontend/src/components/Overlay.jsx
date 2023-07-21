import React from "react";
import styled from "styled-components";

export default function Overlay() {
  const clickOverlay = () => {
    var humbergurIcon = document.querySelector(".c-sidebar");
    humbergurIcon.classList.remove("c-sidebar-show");

    var overlay = document.querySelector(".c-overlay");
    overlay.classList.remove("c-overlay-show");

    var dashboard = document.querySelector(".c-right-content");
    dashboard.classList.remove("c-right-content-show");
  };

  return (
    <Div>
      <div className="c-overlay" onClick={() => clickOverlay()}></div>
    </Div>
  );
}

const Div = styled.div`
  .c-overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    width: 100vw;
    z-index: 1 !important;
  }
  .c-overlay.c-overlay-show {
    background-color: #979aff7a !important;
    z-index: 2 !important;
  }

  /* responsive */
  @media (min-width: 768px) {
    .c-overlay {
      display: none;
    }
  }
  /* end responsive */
`;
