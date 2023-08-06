import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

type Props = {
  children: JSX.Element;
};

export default function OnlyAdminRoute({ children }: Props) {
  const { user } = useSelector((state: any) => state.auth);

  return user.role === "admin" ? children : <Navigate to="/absensi" />;
}
