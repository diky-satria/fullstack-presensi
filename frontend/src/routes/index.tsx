import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "../views/layout/Layout";
import Dashboard from "../views/dashboard/Dashboard";
import Login from "../views/Login";
import Jabatan from "../views/master/jabatan/Jabatan";
import Absensi from "../views/absensi/Absensi";
import Riwayat from "../views/riwayat/Riwayat";
import Setting1 from "../views/setting/Setting1";
import Setting2 from "../views/setting/Setting2";
import Register from "../views/Register";
import ForgotPassword from "../views/ForgotPassword";
import Karyawan from "../views/master/karyawan/Karyawan";
import HariLibur from "../views/master/hari_libur/HariLibur";
import AuthRoute from "./routeMiddleware/AuthRoute";
import OnlyAdminRoute from "./routeMiddleware/OnlyAdminRoute";
import OnlyUserRoute from "./routeMiddleware/OnlyUserRoute";
import ResetPassword from "../views/ResetPassword";
import UbahPassword from "../views/ubahPassword/UbahPassword";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/lupa_password" element={<ForgotPassword />} />
      <Route path="/reset_password/:email/:token" element={<ResetPassword />} />
      <Route
        path="/dashboard"
        element={
          <AuthRoute>
            <OnlyAdminRoute>
              <Dashboard />
            </OnlyAdminRoute>
          </AuthRoute>
        }
      />
      <Route
        path="/jabatan"
        element={
          <AuthRoute>
            <OnlyAdminRoute>
              <Jabatan />
            </OnlyAdminRoute>
          </AuthRoute>
        }
      />
      <Route
        path="/karyawan"
        element={
          <AuthRoute>
            <OnlyAdminRoute>
              <Karyawan />
            </OnlyAdminRoute>
          </AuthRoute>
        }
      />
      <Route
        path="/hari_libur"
        element={
          <AuthRoute>
            <OnlyAdminRoute>
              <HariLibur />
            </OnlyAdminRoute>
          </AuthRoute>
        }
      />
      <Route
        path="/absensi"
        element={
          <AuthRoute>
            <OnlyUserRoute>
              <Absensi />
            </OnlyUserRoute>
          </AuthRoute>
        }
      />
      <Route
        path="/riwayat"
        element={
          <AuthRoute>
            <OnlyUserRoute>
              <Riwayat />
            </OnlyUserRoute>
          </AuthRoute>
        }
      />
      <Route
        path="/ubah_password"
        element={
          <AuthRoute>
            <UbahPassword />
          </AuthRoute>
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
