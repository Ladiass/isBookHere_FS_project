// eslint-disable-next-line
import React, { useState, useEffect } from 'react';

// eslint-disable-next-line
import {Link} from "react-router-dom";

// function Navbar() {
//     const [buttonCheck, setButtonCheck] = useState(true);

//     let menuItemsStyles = "w-full md:w-auto hover:bg-gray-700 transition-colors duration-150 py-4 hover:shadow-md cursor-pointer md:py-0 md:h-full flex items-center justify-center md:px-5 md:static relative btnmenu-items";
//     function buttonClicked() {
//         setButtonCheck(!buttonCheck)
//     }

//     // document.querySelectorAll(".btnmenu-items")[0].onClick=()=>{
//     //     console.log("t")
//     // }

//     useEffect(() => {
//             document.querySelector(".btnmenu").classList.toggle("hidden");
//     }, [buttonCheck])

//     return (
//         <>
//             <nav className="w-full h-16 bg-gray-800">
//                 <div className="container h-full flex items-center xl:px-20 px-5 mx-auto">
//                     <Link className="w-1/2 text-gray-100 font-bold text-2xl" to="/">
//                         <i className="fab fa-pushed mr-2"></i>
//                         E-comm
//                     </Link>

//                     <div className="text-gray-100 text-md flex w-1/2 justify-end h-full items-center">

//                         {/* <i className="fas fa-bars md:z-auto z-50 md:hidden cursor-pointer py-4 px-6 hover:bg-gray-700 transition-colors duration-150 rounded-md" onClick={buttonClicked}></i> */}
//                         <i className="fas fa-bars md:z-auto z-50 md:hidden cursor-pointer py-4 px-6 hover:bg-gray-700 transition-colors duration-150 rounded-md" onClick={buttonClicked}></i>
                        
//                         <div className="btnmenu md:flex flex-wrap md:flex-nowrap absolute md:static items-center bg-gray-800 h-screen md:h-full md:w-auto w-screen left-0 top-0 py-56 text-center md:py-0">

//                             <Link className={menuItemsStyles} to="/" style={{"--i":1}}  onClick={buttonClicked}>Home</Link>
//                             <Link className={menuItemsStyles} to="/products" style={{"--i":1.5}} onClick={buttonClicked}>Books</Link>
//                             <Link className={menuItemsStyles} to="/about" style={{"--i":2}} onClick={buttonClicked}>About</Link>
//                             <div className="flex w-full justify-center items-center my-2 md:my-0 md:static md:w-auto md:text-sm lg:text-md relative btnmenu-items mx-2 md:mx-0" style={{"--i":2.5}}>
//                                 <Link to="/signup"  onClick={buttonClicked} className="md:static outline-none  py-2 px-4 hover:bg-gray-600 border-2 border-gray-600 hover:shadow-md transition-colors duration-150 md:my-0 rounded-md ">
//                                     Login / SignUp
//                                 </Link>
//                             </div>
//                             <Link className={menuItemsStyles} to="/search" style={{"--i":2.8}} onClick={buttonClicked}>Search</Link>

//                             <div className="my-2">
//                             <i className="fas fa-times md:hidden mx-auto cursor-pointer py-3 px-6 hover:bg-gray-700 rounded-md text-lg transition-colors duration-150 " onClick={buttonClicked}></i>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </nav>
//         </>
//     )
// }

function Navbar(){
    // eslint-disable-next-line
    const [BtnShow , SetBtnShow] = useState(false);
    // eslint-disable-next-line
    const [isLogin , SetIsLogin] = useState(false);
    const [OBtn , SetOBtn] = useState(false)

    useEffect(()=>{
        isLogin && document.getElementById("oBtnMenu").classList.toggle("rotate-180");
    },[isLogin,OBtn])

    // Function
    function BtnLogout(){
        sessionStorage.clear()
        SetIsLogin(false)
        OBtnClick()
    }
    function OBtnClick(){
        SetOBtn(!OBtn)
    }

    function ListMenuFc(target){
        // console.log(attrGetTarget(target,"data-menulist"))
        let tgVal = target.getAttribute("data-menulist")
        let tgElem = document.querySelector(`[data-listtarget=${tgVal}]`);
        try{
            tgElem.classList.toggle("hidden")
        }catch(err){}
    }
    
    // style
        const menuListStyle = "py-2 px-4 hover:bg-gray-200 cursor-pointer";
        function addStyle(mainStyle,addStyle){
            return mainStyle+" "+addStyle
        }


    // login
    let user_details = false
    let user = JSON.parse(sessionStorage.getItem("user_details"))

    if(sessionStorage.getItem("user_details") !== null) user_details = true;
    useState(()=>{
        SetIsLogin(user_details);
    },[user_details])

    return (
        <>
            <div className="bg-gray-800 text-white sticky top-0 w-full z-50">
                <div className="container flex text-xs mx-auto justify-end items-center font-bold relative hover:text-gray-50 gap-x-2">
                    <Link to="/" className="mx-1 hover:bg-gray-700 px-2">Home</Link>
                    <Link to="/cart" className=" mx-1 hover:bg-gray-700 px-2">My Cart</Link>

                    {isLogin ? user.username : <Link to="/Login" className="hover:underline">
                        Login / Register
                    </Link>}
                    
                    {isLogin && <button className="transform rotate-180 transition-all duration-150 active:outline-none focus:outline-none" id="oBtnMenu" 
                    onClick={OBtnClick} 
                    >▼</button>}

                    {OBtn && <div className="bg-gray-100 absolute text-black right-0 top-4 shadow">

                        <ul className=" text-center">

                            <Link to={`/users/${user._id}`}><li className={menuListStyle} onClick={OBtnClick} >User Details</li></Link>

                            {/* {user.isAdmin ?  */}
                            <li className={addStyle(menuListStyle,"relative group")} onClick={e=>ListMenuFc(e.target)} data-menulist="myBooks" data-menulist2="myBooks"
                            >
                                <span className="relative group-hover:right-1 right-0 mr-0 transition-all duration-100"><i className="fas fa-angle-left "></i></span> Your Books
                                <div 
                                    className={addStyle("","absolute transform -translate-x-full left-0 top-0 hidden")}
                                    data-listtarget="myBooks"
                                >
                                    <ul className="bg-gray-100 absolute text-black right-0 top-4 shadow-inner">
                                    <Link to="/books/add">
                                            <li className={addStyle(menuListStyle,"")} 
                                            onClick={OBtnClick}
                                            >addBooks</li>
                                        </Link>
                                        <Link to="/books/mybooks">
                                            <li className={addStyle(menuListStyle,"")} 
                                            onClick={OBtnClick}
                                            >My Books</li>
                                        </Link>
                                    </ul>
                                </div>
                            </li>  
                    {/* {: "" } */}
                            <Link to="/myorder"><li className={menuListStyle}>My Order</li></Link>
                            {/* <Link to="/"> */}
                                <li className={menuListStyle} onClick={()=>{
                                    OBtnClick();
                                    BtnLogout();
                                }}>Logout</li>
                            {/* </Link> */}
                        </ul>
                    </div>}
                </div>
                
            </div>
            
            
        </>
    )
}

export default Navbar
