import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { VendingMachine } from "./pages/VendingMachine";
import { AddMoney } from "./components/AddMoney";
import { Balance } from "./components/Balance";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/vending-machine" element={<VendingMachine />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
