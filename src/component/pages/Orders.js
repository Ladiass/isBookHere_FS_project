import axios from 'axios'
import React ,{useState,useEffect}from 'react'
import Loading from "./Loading";
import {TbItemShow} from "./itemsShow";
import {Link, Redirect} from "react-router-dom"

function MyBooks() {
    const [orders ,SetOrders] = useState();
    const [IsOrderEmpty,SetIsOrderEmpty] = useState(false);

    useEffect(()=>{
        axios.get(`/orders/${JSON.parse(sessionStorage.getItem("user_details")).username}`)
            .then(res=>{
                if(res.data.status == 0) return SetIsOrderEmpty(true);
                SetOrders(res.data.data)
            })
    },[])
    if(orders !== (null || undefined)){
        return(
            <>
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen ">
                <table className="container mx-auto shadow">
                    <thead className="text-center text-gray-50 bg-gray-800">
                        <tr>
                            <th className="py-2 max-w-xs w-1/12">Index</th>
                            <th className="py-2 w-6/12">Order Id</th>
                            <th className="py-2 w-1/12">Create At</th>
                        </tr>
                    </thead>
                    <tbody className="text-bold text-center py-4">
                        {orders.map((order,index)=>{
                            let date = order.createAt.slice(0,10)
                            return  <tr className="hover:bg-gray-200 transition-colors duration-150">
                                        <td className="py-2">{index+1}</td>
                                        <td className="py-2">{order._id}</td>
                                        <td className="py-2">{date}</td>
                                    </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </>
        )
    }

    return (
        <>
            {IsOrderEmpty ? <Redirect to="/404"  /> : <Loading /> }
        </>
    )
}

export default MyBooks
