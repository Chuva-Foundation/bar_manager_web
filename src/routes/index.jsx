import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from '../Pages/Login';
import Home from '../Pages/Home';
import Register from '../Pages/Register';
import AdminPanel from '../Pages/AdminPanel';
import Entry from '../Pages/Entry';
import Payment from '../Pages/Payment';
import Users from '../Pages/Users';
import Products from '../Pages/Products';

function index() {


    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path ='/users' element={<Users/>}/>
                <Route path ='/products' element={<Products/>}/>
                <Route path ='/payment' element={<Payment/>}/>
                <Route path ='/entry' element={<Entry/>}/>
                <Route path ='/adminpanel' element={<AdminPanel/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default index;