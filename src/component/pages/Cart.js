import React ,{useState,useEffect}from 'react';
import Loading from "./Loading";
import {Link} from "react-router-dom";
import axios from 'axios';
import {CartItemShow} from "./itemsShow";

function Cart() {
    const [cartSession, SetCartSession]= useState();
    const [cartIsEmpty,SetCartIsEmpty] = useState(false);
    const [cart,SetCart] =useState([]);
    // const [NewCart,SetNewCart] = useState([])
    useEffect(()=>{
        //eslint-disable-next-line
        if(sessionStorage.getItem("cart") == (null || undefined) ) {return SetCartIsEmpty(true)}
        SetCartSession(JSON.parse(sessionStorage.getItem("cart")))
    },[cartIsEmpty])

    useEffect(()=>{
        if(cartSession === (null||undefined)) return ;
        let formData = new FormData();
        formData.append("ids",Object.keys(cartSession))
        axios.post("/books",formData)
            .then(res=>{
                //eslint-disable-next-line
                if(res.data.status == 1){
                    SetCart(res.data.data);
                    // SetNewCart(res.data.data);
                    return;
                }
                SetCartIsEmpty(true)
            })
        //eslint-disable-next-line
    },[cartSession])

    const deleteBtn = e=>{
        e.preventDefault();
        let _id =e.target.children[1]?.value;
        let index = e.target.children[2]?.value;
        delete cartSession[index]
        sessionStorage.setItem("cart",JSON.stringify(cartSession));
        if(Object.values(cartSession).length <= 0) {
            sessionStorage.removeItem("cart");
            SetCartIsEmpty(true)
            SetCart()
            return 
        }
        if(e.target.parentElement.parentElement.nodeName == "TR"){
            e.target.parentElement.parentElement.remove()
        }else{
            e.target.parentElement.parentElement.parentElement.remove()
        }
    }

    // function priceUpdate(){
    //     let priceTotal = document.querySelectorAll([`data-price`]);
    //     console.log(priceTotal)
    // }

    function Payment(){
        if(sessionStorage.getItem("user_details") == (null || undefined)){
            sessionStorage.setItem("status","Waring");
            sessionStorage.setItem("alertContent","Your Must Login!");
            window.location.href = "/Login"
        }
        let formData = new FormData();
        formData.append("item",Object.keys(cartSession));
        formData.append("payer",JSON.parse(sessionStorage.getItem("user_details")).username)
        axios.post("/orders/add",formData)
            .then(res=>{
                if(res.data == 0){
                    sessionStorage.setItem("status","Waring");
                    sessionStorage.setItem("alertContent","Failed to Add the Order! Pls Try again");
                    return
                }
                sessionStorage.setItem("status","Success");
                sessionStorage.setItem("alertContent","Order Added");
                sessionStorage.removeItem("cart");
                window.location.reload();
            }
            )
    }
    if(cartSession !== (null||undefined) && cart !== (null||undefined)){
        return(
        <>  
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen ">
                <table className="container mx-auto shadow">
                    <thead className="text-center text-gray-50 bg-gray-800">
                        <tr>
                            <th className="py-2 max-w-xs w-1/12">Index</th>
                            <th className="py-2 w-6/12">Books</th>
                            
                            <th className="py-2 w-1/12">Price/RM</th>
                            {/* <th className="py-2 w-1/12">Order</th> */}
                            <th className="py-2 w-1/12">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-bold text-center py-4">
                        {cart.map((val,index)=>{
                            return <CartItemShow key={val._id} index={index} _id={val._id} title={val.title} deleteBtn={deleteBtn}
                            quantity-left={val.quantity}
                            price={val.price}
                            />
                        })
                        }
                    </tbody>
                </table>
            </div>
            {/* <div className="absolute bottom-14 left-1/2 -translate-x-1/2 font-bold text-xl">Total: RM{}</div> */}
            <input type="button" value={`Pay`}  className="absolute bottom-10 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-blue-400 hover:bg-opacity-90 cursor-pointer"
                onClick={Payment}
            />
        </>
        )
        
    }
    return (
        <>
            {cartIsEmpty ? <div className="absolute text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold flex flex-wrap">
                <p className="w-full">Your Cart is Empty ...</p>
                <Link to="/" className="text-sm font-normal text-blue-600 hover:underline hover:text-blue-500 text-center w-full">Back to HomePage</Link>
            </div>: <Loading /> }
        </>
    )
    
    
    
}

export default Cart
