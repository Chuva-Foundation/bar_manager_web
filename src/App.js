import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./Layout";
import { useState } from "react";
import Login from './Pages/Login'

function App() {

  return (
    <Router>
      <Sidebar/>
    <Layout/>
    </Router>
  );
}

export default App;
