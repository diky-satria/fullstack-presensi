import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../../views/layout/Layout";

type Props = {
  children: JSX.Element;
};

export default function AuthRoute({ children }: Props) {
  const { user } = useSelector((state: any) => state.auth);

  return user ? <Layout>{children}</Layout> : <Navigate to="/" />;
}
