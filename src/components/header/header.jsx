import { useCookies } from "react-cookie"
import "./header.css"
export function Header(){
    const[cookie,setcookie,removecookie]=useCookies();
    function logoutclick(){
        removecookie('username')
    }
    return(
        <>
            <div className=" d-flex justify-content-between align-items-center container-fluid p-2 bg-dark text-light  " >
                <div ><b>LOGO</b></div>
                <nav>
                    <span>home</span>
                    <span>contact</span>
                    <span>shortcut</span>
                    <span>details</span>
                    <span>blog</span>
                </nav>
                <button onClick={logoutclick} className="btn btn-danger">Log-out</button>
            </div>
        </>
    )
} 