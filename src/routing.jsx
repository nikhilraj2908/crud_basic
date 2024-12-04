import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/header/header";
import { Dashboard } from "./components/dashboard/dashboard";
import { Registeruser } from "./components/registeruser/registeruser";
import { Loginuser } from "./components/loginuser/loginuser";
import { useCookies } from "react-cookie";
import { Todolist } from "./components/todolist/todolist";

export function Routing(){
    const[cookie,setcookie,removecookie]=useCookies();
    return(
        <>
            <BrowserRouter>
                <Header></Header>
               <Routes>
                    <Route path="/" element={<Dashboard/>}></Route>
                    <Route path="/dashboard" element={<Dashboard/>}></Route>
                    <Route path="/registeruser" element={<Registeruser/>}></Route>
                    <Route path="/loginuser" element={<Loginuser/>}></Route>
                    <Route path="/todolist" element={cookie.username?<Todolist/>:<Loginuser/>}></Route>
               </Routes>
            </BrowserRouter>
        </>
    )
}