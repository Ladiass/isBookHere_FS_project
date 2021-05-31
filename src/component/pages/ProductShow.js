import axios from 'axios'
import React ,{useState,useEffect}from 'react';
import {Redirect,Link } from "react-router-dom";
import Loading from "./Loading";

function ProductDetails(props) {
    const [id] = useState(props.match.params.id);
    const [book ,SetBook] = useState();
    const [bookNotFound , SetBookNotFound] = useState(false);
    const [orderCount , SetOrderCount] = useState(1);
    const [theOwnerId,SetOwnerId] =useState();

    useEffect(()=>{
        axios.get(`/books/${id}`)
        .then(res=>(res.data?.status !== 0) ? SetBook(res.data) : SetBookNotFound(true));
    },[id])
    useEffect(()=>{
        if(book === (null||undefined)) return;
        axios.get(`/users/username/${book.author}`)
            .then(res=>{if(res.data !== 0 )SetOwnerId(res.data)})
    },[book])
    
    function CountNegative(){
        if(orderCount > 1) SetOrderCount(orderCount-1)
    }
    function CountPositive(){
        if(orderCount < 10) SetOrderCount(orderCount+1)
    }

    const [cart,SetCart]= useState({});
    function addToCart(){
        if(sessionStorage.getItem("cart") !== (null||undefined)){
            SetCart({...JSON.parse(sessionStorage.getItem("cart")),[id]:+orderCount});
            return
        }
        SetCart({[id]:+orderCount})
        return
    }
    
    //eslint-disable-next-line
    useEffect(()=>{
        if(Object.values(cart).length <= 0) return ;
        sessionStorage.setItem("cart",JSON.stringify(cart))
    },[cart])
    console.log()
    if(book !== (null||undefined)){
        return (
            <>
                <div className="container mx-auto pt-14 bg-gray-50">
                    <div className="flex flex-wrap">
                        <div className="image lg:w-1/4 px-5 w-full lg:h-auto h-56 flex justify-center items-center"><img src={book.image} alt="" className="h-full"/></div>
                        <div className="w-3/4 px-14 py-10">
                            <p className="text-2xl font-bold h-1/5">{book.title}</p>
                            <div className="h-1/2 px-2 py-4">
                            <p className=" text-gray-600 line-clamp-4">{book.description}</p>
                            </div>
                            <p className="text-sm text-gray-500 flex flex-nowrap items-center gap-x-2">
                                <span className="border-r px-2">RM <span className="text-red-500 text-xl">{book.price}</span></span>
                                <span className="text-sm">Author <span className="text-base"><Link to={`/users/${theOwnerId?._id}`}>{book.author}</Link></span></span>
                            </p>
                            {/* <div className="relative py-2 flex md:block ">
                                <input type="text" className="invisible" />
                                <div className="absolute border overflow-hidden rounded top-0">
                                    <input type="button" className="active:bg-gray-200 hover:bg-gray-100 px-2 focus:bg-gray-200 cursor-pointer font-bold"
                                    onClick={CountNegative} value="-" />
                                    
                                    <input type="number" min="1" max="10" className="w-12 outline-none text-center" 
                                    value={orderCount}
                                    onChange={e=>SetOrderCount(e.target.value)}/> 
                                    <input type="button" className="active:bg-gray-200 hover:bg-gray-100 px-2 focus:bg-gray-200 cursor-pointer font-bold"
                                    onClick={CountPositive} value="+"/>
                                </div>
                            </div> */}
                            <div className="flex flex-nowrap ">
                                <input type="button"  value="Add to Cart" className="py-2 px-4 rounded-md bg-yellow-300 hover:shadow active:bg-yellow-400 hover:bg-yellow-200 cursor-pointer "
                                onClick={addToCart}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
    return (
        <>
            {bookNotFound ? <Redirect to="/404"/> : ""}
            <Loading />
        </>
    )
}

export default ProductDetails
