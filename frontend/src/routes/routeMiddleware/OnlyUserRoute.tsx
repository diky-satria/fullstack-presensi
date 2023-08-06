import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

type Props = {
  children: JSX.Element;
};

export default function OnlyUserRoute({ children }: Props) {
  const { user } = useSelector((state: any) => state.auth);

  return user.role === "user" ? children : <Navigate to="/dashboard" />;
}
