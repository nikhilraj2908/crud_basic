import axios from "axios";
import { useEffect, useState } from "react"


export function Todolist() {
    const [listdata, setlistdata] = useState({ title: "", description: "", date: "", time: "" })
    const [task, settask] = useState([])
    const [editmode, seteditmode] = useState(false);
    const[editid,seteditid]=useState("")
    useEffect(() => {
        gettasklist();
    }, [listdata])
    async function gettasklist() {
        const taskdata = await axios.get("http://localhost:5000/gettask")
        settask(taskdata.data)

    }
    async function handlesubmit(e) {
        e.preventDefault();
        try {
            if (editmode) {
                const updatedtask = await axios.patch(`http://localhost:5000/updatelist/${editid}`, listdata)
                if (updatedtask.status == 200) {
                    alert("data saved");
                    setlistdata({ title: "", description: "", date: "", time: "" })
                    seteditmode(false)
                } else {
                    alert("some problem");
                }
            }
            else {
                const response = await axios.post("http://localhost:5000/addtask", listdata);
                if (response.status == 200) {
                    alert("data saved");
                    setlistdata({ title: "", description: "", date: "", time: "" })
                } else {
                    alert("some problem");
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    function handlechange(e) {
        const { title, description, date, time } = e.target;
        setlistdata(listdata => ({ ...listdata, [e.target.name]: e.target.value }))
    }
    async function deleteitem(id) {
        const response = await axios.delete(`http://localhost:5000/deletetask/${id}`)
        if (response.status == 200) {
            alert("item deleted");
            gettasklist();
        } else {
            alert("some error in deleting")
        }
    }
    function addbtnclick() {
        seteditmode(false);
    }
    function editbtnclick(task) {
        setlistdata({
            title: task.title,
            description: task.description,
            date: task.date,
            time: task.time,
        });
        seteditid(task._id);
        seteditmode(true);

    }
    return (
        <>
            <div className="container">
                <button className=" mt-3 btn btn-success bi bi-plus" onClick={addbtnclick} data-bs-toggle="modal" data-bs-target="#modal">&nbsp;Add task</button>
                <div className="modal fade text-dark" id="modal">
                    <div className=" modal-dialog">
                        <div className="modal-content"  >
                            <div className="modal-header">
                                <h3>{editmode ? "Edit task" : "Add new task"}</h3>
                                <button type="button" className="btn btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handlesubmit}>
                                    <dl>
                                        <dt>Task name:</dt>
                                        <dd><input onChange={handlechange} type="text" className="form-control" value={listdata.title} id="taskname" name="title" placeholder="enter title" /></dd>
                                        <dt>task description</dt>
                                        <dd><textarea onChange={handlechange} className="form-control" value={listdata.description} id="taskdescription" name="description" rows={3} placeholder="enter description"></textarea></dd>
                                        <dt>date</dt>
                                        <dd><input onChange={handlechange} className="form-control" value={listdata.date} type="date" name="date"></input></dd>
                                        <dt>time</dt>
                                        <dd><input onChange={handlechange} className="form-control" value={listdata.time} type="time" name="time"></input></dd>
                                        <button className="btn btn-primary w-100" data-bs-dismiss="modal">Save</button>
                                    </dl>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <table className="table table-hover ">
                    <thead>
                        <tr>
                            <th>task title</th>
                            <th>task discription</th>
                            <th>date</th>
                            <th>time</th>
                            <th>edit</th>
                            <th>remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            task.map((task,index) => (
                                <tr key={index}>
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                    <td>{task.date}</td>
                                    <td>{task.time}</td>
                                    <td><button onClick={()=>editbtnclick(task)} data-bs-toggle="modal" data-bs-target="#modal" className="btn btn-warning">Edit</button></td>
                                    <td><button onClick={() => deleteitem(task._id)} className="btn btn-danger">Delete</button></td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
            </div>
        </>
    )
}