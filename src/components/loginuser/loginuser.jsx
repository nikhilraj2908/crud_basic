import axios from "axios";
import "./loginuser.css"
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
export function Loginuser() {
    const [user, setuser] = useState({});
    const [cookies, setcookie, removecookie] = useCookies(["username"]);
    const navigate = useNavigate();
    function handlechange(e) {
        const { name, value } = e.target;
        setuser({ ...user, [name]: value })
    }
    async function frmsubmit(e) {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/loginuser', user);
            if (res.status === 200) {
                alert("login succefully");
                setcookie('username',user.username);
                navigate("/todolist")
            }
        }
        catch (err) {
            alert("login failed");
            console.log(err);
        }
    }
    return (
        <div className="dashboard-bg text-light container-fluid d-flex justify-content-center align-items-center">
            <form onSubmit={frmsubmit}>
                <dl>
                    <dt>username</dt>
                    <dd ><input onChange={handlechange} className="form-control" type="text" name="username" /></dd>
                    <dt>password</dt>
                    <dd><input onChange={handlechange} className="form-control" type="password" name="password"></input></dd>
                    <button className="w-100 btn btn-success">login user</button>
                </dl>
                <div>go to <Link to="/dashboard">dashbord</Link></div>
            </form>
        </div>
    )
}