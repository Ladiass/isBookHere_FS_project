import React ,{useState , useEffect}from 'react'
import axios from "axios";

function Users() {
    const [isData , SetData] =useState([]);
    useEffect(()=>{
        axios.get("/users").then(res=>SetData(res.data))
    },[])
    return (
        <>
            <div>
                {isData.map(user => <div>{user.username}</div>)}
            </div>
        </>
    )
}

export default Users
