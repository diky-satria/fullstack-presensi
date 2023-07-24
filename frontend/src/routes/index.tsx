import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "../views/layout/Layout";
import Dashboard from "../views/dashboard/Dashboard";
import Login from "../views/Login";
import Jabatan from "../views/master/jabatan/Jabatan";
import Contact from "../views/contact/Contact";
import Chart from "../views/chart/Chart";
import Wallet from "../views/wallet/Wallet";
import Setting1 from "../views/setting/Setting1";
import Setting2 from "../views/setting/Setting2";
import Register from "../views/Register";
import ForgotPassword from "../views/ForgotPassword";
import Karyawan from "../views/master/karyawan/Karyawan";
import HariLibur from "../views/master/hari_libur/HariLibur";

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
        path="/jabatan"
        element={
          <Layout>
            <Jabatan />
          </Layout>
        }
      />
      <Route
        path="/karyawan"
        element={
          <Layout>
            <Karyawan />
          </Layout>
        }
      />
      <Route
        path="/hari_libur"
        element={
          <Layout>
            <HariLibur />
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
