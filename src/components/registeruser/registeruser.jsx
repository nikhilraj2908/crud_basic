import { useState } from 'react'
import './registeruser.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
export function Registeruser(){
    const [frmdata,setfrmdata]=useState({username:"",
        password:"",
        email:""})
    function handlechange(e){
        let name=e.target.name;
        let value=e.target.value;
        setfrmdata({...frmdata,[name]:value})
    }
    async function frmsubmit(e){
        e.preventDefault()
        console.log(frmdata); 
        const response=await axios.post("http://127.0.0.1:5000/register",frmdata);
        console.log(response.data); 
        setfrmdata({
            username:"",
            password:"",
            email:""
        })
    }
    return(
        <>
            <div className="dashboard-bg text-light container-fluid d-flex justify-content-center align-items-center bg-secondary">
                <form onSubmit={frmsubmit} className="w-25 p-4">
                    <dl>
                        <dt>Username</dt>
                        <dd><input onChange={handlechange} value={frmdata.username} className="form-control" type="text" name="username" /></dd>
                        <dt>password</dt>
                        <dd><input onChange={handlechange}value={frmdata.password}  className="form-control" type="password" name="password"></input></dd>
                        <dt>mail-id</dt>
                        <dd ><input onChange={handlechange} value={frmdata.email} className="form-control" type="email" name="email" ></input></dd>
                        <button className='btn btn-primary w-100 '>register user</button>
                    </dl>
                    <div>go to <Link to="/dashboard">dashboard</Link></div>
                </form>
                
            </div>
        </>
    )
}