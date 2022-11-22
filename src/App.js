import "./App.css";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Sidebar from "./components/Sidebar";
import AdminPanel from './Pages/AdminPanel';
import Products from './Pages/Products';
import Payment from './Pages/Payment';
import Users from './Pages/Users';
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Entry from './Pages/Entry'
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./Pages/Unauthorized";

function App() {
  return (
    <>
    <Router/>
      <Sidebar/>
      <Routes>
      <Route path="/" element={<Layout/>}>
      {/*public routes*/}
      <Route path ="/" element={<Login/>}/>
      <Route path="unauthorized" element={<Unauthorized />} />
      {/* Authorization distribution*/}
      <Route element={<RequireAuth allowedRoles={[1]} />}>
        <Route path="/Register" element={<Register />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/AdminPanel" element={<AdminPanel />} />
      </Route>
      <Route element={<RequireAuth allowedRoles={[1, 3]} />}>
        <Route path="/Payment" element={<Payment />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[1, 2, 3]} />}>
        <Route path="/Products" element={<Products />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[1, 4]} />}>
        <Route path="/Entry" element={<Entry />} />
      </Route>
    </Route>
  </Routes>
  <Router/>
  </>
  );
};

export default App;
