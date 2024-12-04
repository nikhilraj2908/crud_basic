import { useNavigate } from "react-router-dom"
import "./dashboard.css"
export function Dashboard(){
    const navigate=useNavigate();
    function loginbtnclicked(){
        navigate('/loginuser')
    }
    function registerbtnclicked(){
        navigate("/registeruser");
    }
    return(
        <div className="container-fluid dashboard-page d-flex justify-content-center align-items-center ">
            <div>
            <button  onClick={registerbtnclicked} className="btn btn-success me-3">register user</button>
            <button onClick={loginbtnclicked} className="btn btn-warning">login user</button>
        
            </div>
        </div>
    )
}