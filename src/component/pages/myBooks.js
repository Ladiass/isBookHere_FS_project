import axios from 'axios'
import React ,{useState,useEffect}from 'react'
import {TbItemShow} from "./itemsShow";
import {Link} from "react-router-dom"

function MyBooks() {
    const [myBooks,SetMyBooks] = useState([]);
    const [onChanger,SetonChanger] = useState(false);
    let user = JSON.parse(sessionStorage.getItem("user_details"))
    useEffect(() => {
        SetonChanger(false)
        axios.get(`/books/author/${user.username}`)
        .then(res=>SetMyBooks(res.data))
        .catch(err=>console.log(err))
    //eslint-disable-next-line
    }, [onChanger])

    const Bookdelete = e=>{
        let _id = e.target.getAttribute("data-id");
        axios.delete(`/books/${_id}`)
            .then(res=>SetonChanger(true))
            .catch(err=>console.log(err))
    }
    return (
        <>

            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen ">
                {
                    (myBooks.length > 0) ?
                    <table className="container mx-auto shadow">
                    <thead className="text-center text-gray-50 bg-gray-800">
                        <tr>
                            <th className="py-2 max-w-xs w-1/12">Index</th>
                            <th className="py-2 w-6/12">Books</th>
                            <th className="py-2">Create At</th>
                            <th className="py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-bold text-center py-4">
                        {myBooks.map((val,index)=>{
                            let date = val.CreateAt.slice(0,10)
                            return <TbItemShow index={index+=1} Book={val.title} Time={date} key={val._id} id={val._id} deleteBtn={Bookdelete}/>
                        })}
                        
                    </tbody>
                </table>:
                    <div className=" w-full text-center">
                        <div className="font-bold text-4xl">Your Store is Empty</div>
                        <Link to="/books/add" className="underline text-blue-700 hover:text-blue-600">Click here to Add some</Link>
                    </div>
                }
            </div>
        </>
    )
}

export default MyBooks
