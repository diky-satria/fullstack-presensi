import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "../views/layout/Layout";
import Dashboard from "../views/dashboard/Dashboard";
import Login from "../views/Login";
import Component1 from "../views/component/Component1";
import Component2 from "../views/component/Component2";
import Contact from "../views/contact/Contact";
import Chart from "../views/chart/Chart";
import Wallet from "../views/wallet/Wallet";
import Setting1 from "../views/setting/Setting1";
import Setting2 from "../views/setting/Setting2";
import Register from "../views/Register";
import ForgotPassword from "../views/ForgotPassword";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot_password" element={<ForgotPassword />} />
      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
      <Route
        path="/component1"
        element={
          <Layout>
            <Component1 />
          </Layout>
        }
      />
      <Route
        path="/component2"
        element={
          <Layout>
            <Component2 />
          </Layout>
        }
      />
      <Route
        path="/contact"
        element={
          <Layout>
            <Contact />
          </Layout>
        }
      />
      <Route
        path="/chart"
        element={
          <Layout>
            <Chart />
          </Layout>
        }
      />
      <Route
        path="/wallet"
        element={
          <Layout>
            <Wallet />
          </Layout>
        }
      />
      <Route
        path="/setting1"
        element={
          <Layout>
            <Setting1 />
          </Layout>
        }
      />
      <Route
        path="/setting2"
        element={
          <Layout>
            <Setting2 />
          </Layout>
        }
      />
    </Routes>
  );
}
