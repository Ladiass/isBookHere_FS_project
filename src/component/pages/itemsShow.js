import React ,{useState} from 'react';
import { Link } from 'react-router-dom';
// import axios from "axios";

export const ItemsShow1 = ({
    Links,
    imgUrl,
    productsName,
    details,
    place,
    author,
    buyerCount,
    commentCount
    
})=>{
    let Cbuyer = buyerCount || 0;
    let Ccomments = commentCount ||0;
    return (
        <>
            <Link to={Links} className="px-24 block my-2">
                <div className="w-full h-48 flex shadow hover:shadow-lg rounded overflow-hidden">
                    <div className="w-3/12 h-full overflow-hidden">
                        <img src={imgUrl} alt="" className="w-full min-h-full"/>
                    </div>
                    <div className=" bg-gray-50 w-9/12 h-full px-10 py-4 ">
                        <p className="text-xl font-bold mt-2 my-3 w-full ">{productsName}</p>
                        <p className="text-gray-400 font-base h-24 px-2">{details}</p>
                        <hr />
                        <div className="flex justify-between items-center font-bold">
                            <p className="text-sm text-gray-300">
                                From: <span className="text-gray-400 mx-1">{place}</span></p>
                            <p className="text-sm text-gray-300">Author:  
                            <span className="text-gray-400 mx-1">{author}</span></p>
                            <p className="text-xs text-gray-300">
                            <span className="text-gray-400 mx-1">{Cbuyer}</span> buyer</p>

                            <p className="text-xs text-gray-300">
                            <span className="text-gray-400 mx-1">{Ccomments}</span> comments</p>
                            
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}

export const TbItemShow = ({
    id,
    index,
    Book,
    Time,
    deleteBtn
})=>{
    
    
    return(
        <>
                <tr className="py-2 hover:bg-gray-100 transition-colors duration-150 hover:shadow">
                    <td className="py-2 ">{index}</td>
                    <td className="py-2 ">{Book}</td>
                    <td className="py-2 ">{Time}</td>
                    <td className="py-2 flex no-wrap justify-center items-center gap-x-2">
                        <Link to={`/books/edt/${id}`} type="button"  className="py-1 px-4 rounded-md bg-yellow-400 text-black hover:bg-yellow-300 font-bold cursor-pointer active:bg-yellow-500" >Edit</Link>
                        <input type="button" value="Delete" id="delBtn" className="py-1 px-4 rounded-md bg-red-600 hover:bg-red-500 font-bold cursor-pointer active:bg-red-700" data-id={id}
                            onClick={deleteBtn}
                        />
                        <Link to={`/book/${id}`} className="py-1 px-4 rounded-md bg-blue-600 hover:bg-blue-500 font-bold cursor-pointer active:bg-red-700">View</Link>

                        {/* /books/edt/ */}
                    </td>
                </tr>
        </>
    )
}
export const CartItemShow = ({
    index,
    _id,
    price,
    title,
    deleteBtn,
    onChanger
})=>{
    const [orderCount,SetOrderCount] = useState(1)
    function add(){
        if(orderCount < 10) return SetOrderCount(orderCount+1)
    }
    function negative(){
        if(orderCount > 1) return SetOrderCount(orderCount-1)
    }
    return(
        <tr className="py-2 hover:bg-gray-100 transition-colors duration-150 hover:shadow" data-id={_id}>
            <td className="py-2 ">{index+1}</td>
            <td className="py-2 ">{title}</td>
            <td className="py-2" name="price">{price}</td>
            {/* <td>
                <div className="flex justify-center items-center">
                    <button className="outline-none active:outline-none focus:outline-none py-2 px-4 hover:bg-gray-200" onClick={negative}
                    >-</button>
                    <input type="text" className="block w-8 bg-white text-center shadow-inner" disabled 
                        value={orderCount}
                        data-price={price}
                    />
                    <button className="outline-none active:outline-none focus:outline-none py-2 px-4 hover:bg-gray-200" onClick={add}
                    >+</button>
                </div>
            </td> */}
            <td className="flex no-wrap justify-center items-center">
                <Link to={`/books/${_id}`} className="text-center px-1 w-1/2 hover:bg-opacity-90 h-full py-2 text-gray-400 text-opacity-50 hover:text-opacity-100 bg-blue-500"><i className="far fa-eye"></i></Link>
                <button className="rounded-none focus:outline-none active:outline-none text-center px-1 w-1/2 hover:bg-opacity-90 h-full py-2 text-gray-400 text-opacity-50 hover:text-opacity-100 bg-red-500"
                onClick={deleteBtn}
                >
                    <i className="fas fa-times"></i>
                    <input type="hidden" value={index} name="index" />
                    <input type="hidden" name="_id" value={_id}/>
                </button>
            </td>
        </tr>
    )
}