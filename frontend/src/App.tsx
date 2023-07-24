import React, { FC } from "react";
import Router from "./routes";
import { Toaster } from "react-hot-toast";

const App: FC = () => {
  return (
    <div className="App">
      <Router />
      <Toaster />
    </div>
  );
};

export default App;
