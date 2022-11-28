import React from 'react'
import AdminPanel from "./Pages/AdminPanel";
import Users from "./Pages/Users";
import Payment from "./Pages/Payment";
import Entry from "./Pages/Entry";
import Sales from "./Pages/Sales";
import Categories from "./Pages/Categories";
import Products from "./Pages/Products";
import { Route, Routes } from 'react-router';
import Bills from './Pages/Bills';
import Login from './Pages/Login';

function Layout() {
  return (
       <Routes>
        <Route path="Login" element={<Login/>} />
        <Route exact path="AdminPanel" element={<AdminPanel />} />
        <Route path="Bills" element={<Bills/>}/>
        <Route path="Users" element={<Users />} />
        <Route path="Products" element={<Products />} />
        <Route path="Categories" element={<Categories />} />
        <Route exact path="/Payment" element={<Payment />} />
        <Route path="Sales" element={<Sales />} />
        <Route exact path="Entry" element={<Entry />} />
      </Routes>
    
  )
}

export default Layout
