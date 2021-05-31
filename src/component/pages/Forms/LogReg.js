//eslint-disable-next-line
import axios from 'axios';
import React,{useState,useEffect} from 'react';
import {Link} from "react-router-dom"

function LogReg() {
    // const [inpVal,SetInpVal] = useState("");
    // const [nameValIsEmpty,SetNameValIsEmpty] = useState(true);
    // const [passValIsEmpty,SetPassValIsEmpty] = useState(true);

    // useEffect(()=>{

    //     // eslint-disable-next-line
    //     Object.values(document.querySelectorAll("input")).map(trg=>{
    //         if(!trg.value) inpCheck(trg)
    //     })
    // },[inpVal])

    // function inpCheck(trg){
    //     try{
    //         if(trg.id.toLowerCase() === "username"){
    //             CheckTrgLabel(trg.id).classList.remove("top-0")
    //         }
    //         if(trg.id.toLowerCase() === "password"){
    //             CheckTrgLabel(trg.id).classList.remove("top-0")
    //         }
    //     }catch(err){
    //         console.log(err)
    //     }
        
    //     function CheckTrgLabel(trgID){
    //         let Label = document.querySelectorAll("label");
    //         let trgLabel = Object.values(Label).filter(t=>t.getAttribute("for").toLowerCase()===trgID.toLowerCase())[0]
    //         return trgLabel
    //     }
    // }

    const [btnForm,SetBtnForm] = useState(false);
    
    let labelClasses = "absolute mx-4 left-0 transition-all duration-150 top-4 text-gray-500";
    
    useEffect(()=>{
        document.getElementById("formw").classList.toggle("translate-x-0");
        document.getElementById("formw").classList.toggle("-translate-x-full");
    },[btnForm])

    function isEmptyCheck(trg){
        if(!trg.value) {
            trgLabel(trg).classList.replace("top-0","top-4")
        }
    } 

    function trgLabel(trg){
        return Object.values(trg.parentElement.children).filter(trg=>trg.tagName.toLowerCase() === 'label')[0];
    }

    function btnFormClick(){
        SetBtnForm(!btnForm)
    }

    //login
    const [loginUsername,SetLoginUsername] = useState("");
    const [loginPass,SetLoginPass] = useState("");
    function Login(){

        axios.post("/users/login",{
            "username": loginUsername,
            "password": loginPass
        })
            .then(res=>{
                if(res.data === 0){
                    sessionStorage.setItem("status","Warning");
                    sessionStorage.setItem("alertContent","Username / Password incorrect");
                    return
                }
                sessionStorage.setItem("status","Success");
                sessionStorage.setItem("alertContent","Welcome back !");
                sessionStorage.setItem("user_details",JSON.stringify(res.data));
                window.location.href="/";
            })  
            .catch(err=>console.log(err))
    }
    function pass2Check(trg){
        let p2 = trg.value;
        let p = document.getElementById("rpassword").value;
        let submitBtn = document.querySelector("[value='Register']")
        submitBtn.setAttribute("type","button")

        if(p2 !== p) {
            sessionStorage.setItem("status","Warning")
            sessionStorage.setItem("alertContent","Password and Password 2 not same")
            return 0
        }
        submitBtn.setAttribute("type","submit")
        return 1
    }
    function Register(){
        let username = document.getElementById("rusername").value;
        let password = document.getElementById("rpassword").value;
        let firstname = document.getElementById("fname").value;
        let lastname = document.getElementById("lastname").value;
        let body = {
            username,
            password,
            firstname,
            lastname
        }
        axios.post("/users/register",body)
            .then(res=>{
                if(res.data === 0){
                    sessionStorage.setItem("status","Warning")
                    sessionStorage.setItem("alertContent","unSuccess to Register")
                    return
                }
                sessionStorage.setItem("status","Success")
                sessionStorage.setItem("alertContent","The Account is Crated");
                RegInpClear();
                btnFormClick();
            }).catch(err=>console.log(err));
    }
    function RegInpClear(){
        document.getElementById("rusername").value = "";
        document.getElementById("rpassword").value = "";
        document.getElementById("rpassword2").value = "";
        document.getElementById("fname").value = "";
        document.getElementById("lastname").value = "";
    }
       
    return (
        <>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform py-8 shadow-md bg-gray-50 rounded-md  overflow-hidden w-72">
                <div className="flex transform -translate-x-full transition duration-500" id="formw">

                    <form className="px-10" method="post"
                        onSubmit={e=>{e.preventDefault();Login(e.target);}
                        }
                    >
                        <h1 className="text-4xl font-bold text-center">Login</h1>
                        <div className="relative my-2">
                            <div className="invisible h-3"></div>
                            <label htmlFor="username" className={labelClasses}>Username :</label>
                            <input type="text" id="username" name="username" className="px-4 py-2 focus:shadow-inner shadow outline-none transition-all duration-100 bg-gray-100 rounded-full"
                            // onChange={e=>SetInpVal(e.target.value)}
                            onBlur={e=>{isEmptyCheck(e.target)}}
                            onFocus={e=>{trgLabel(e.target).classList.replace("top-4","top-0")}}
                            onChange={e=>SetLoginUsername(e.target.value)}
                            />

                        </div>
                        <div className="relative my-2">

                            <div className="invisible h-3"></div>
                            <label htmlFor="password" className={labelClasses}>Password :</label>
                            <input type="password" id="password" name="password" className="px-4 py-2 focus:shadow-inner shadow outline-none transition-all duration-100 bg-gray-100 rounded-full " 
                            // onChange={e=>SetInpVal(e.target.value)}
                            onBlur={e=>{isEmptyCheck(e.target)}}
                            onFocus={e=>{trgLabel(e.target).classList.replace("top-4","top-0")}}
                            onChange={e=>SetLoginPass(e.target.value)}
                            />
                        </div>
                        <input type="Submit" value="Login" className="block mx-auto rounded-full px-6 py-2 bg-blue-400 cursor-pointer my-4"
                        />

                        <Link to="/Register" className="text-sm text-blue-400 hover:underline active:outline-none" type="button" onClick={btnFormClick}><span>Register </span><span className="transition-all duration-150 relative animate-dingdong ">→</span></Link>
                    </form>


                    <form action="post" className="px-10  " onSubmit={e=>{
                        e.preventDefault();
                        Register();
                    }}>
                        <h1 className="text-4xl font-bold text-center">Register</h1>
                        <div className="relative my-2">
                            <div className="invisible h-3"></div>
                            <label htmlFor="rusername" className={labelClasses}>Username :</label>
                            <input type="text" id="rusername" name="username" className="px-4 py-2 focus:shadow-inner shadow outline-none transition-all duration-100 bg-gray-100 rounded-full"
                            // onChange={e=>SetInpVal(e.target.value)}
                            onBlur={e=>{isEmptyCheck(e.target)}}
                            onFocus={e=>{trgLabel(e.target).classList.replace("top-4","top-0")}}
                            />

                        </div>
                        <div className="relative my-2">
                            <div className="invisible h-3"></div>
                            <label htmlFor="fname" className={labelClasses}>First Name :</label>
                            <input type="text" id="fname" name="fname" className="px-4 py-2 focus:shadow-inner shadow outline-none transition-all duration-100 bg-gray-100 rounded-full"
                            // onChange={e=>SetInpVal(e.target.value)}
                            onBlur={e=>{isEmptyCheck(e.target)}}
                            onFocus={e=>{trgLabel(e.target).classList.replace("top-4","top-0")}}
                            />

                        </div>
                        <div className="relative my-2">
                            <div className="invisible h-3"></div>
                            <label htmlFor="lastname" className={labelClasses}>Last Name :</label>
                            <input type="text" id="lastname" name="lastname" className="px-4 py-2 focus:shadow-inner shadow outline-none transition-all duration-100 bg-gray-100 rounded-full"
                            // onChange={e=>SetInpVal(e.target.value)}
                            onBlur={e=>{isEmptyCheck(e.target)}}
                            onFocus={e=>{trgLabel(e.target).classList.replace("top-4","top-0")}}
                            />

                        </div>

                        <div className="relative my-2">

                            <div className="invisible h-3"></div>
                            <label htmlFor="rpassword" className={labelClasses}>Password :</label>
                            <input type="password" id="rpassword" name="password" className="px-4 py-2 focus:shadow-inner shadow outline-none transition-all duration-100 bg-gray-100 rounded-full" 
                            // onChange={e=>SetInpVal(e.target.value)}
                            onBlur={e=>{isEmptyCheck(e.target)}}

                            onFocus={e=>{trgLabel(e.target).classList.replace("top-4","top-0")}}
                            />
                        </div>

                        <div className="relative my-2">

                            <div className="invisible h-3"></div>
                            <label htmlFor="rpassword2" className={labelClasses}>Password2 :</label>
                            <input type="password" id="rpassword2" name="password2" className="px-4 py-2 focus:shadow-inner shadow outline-none transition-all duration-100 bg-gray-100 rounded-full" 
                            // onChange={e=>SetInpVal(e.target.value)}
                            onBlur={e=>{isEmptyCheck(e.target);pass2Check(e.target)}}
                            onFocus={e=>{trgLabel(e.target).classList.replace("top-4","top-0")}}
                            />
                        </div>

                        <input type="button" value="Register" className="block mx-auto rounded-full px-6 py-2 bg-blue-400 cursor-pointer my-4"/>
                        <Link to="/Login" className="text-sm text-blue-400 hover:underline active:outline-none" type="button" onClick={btnFormClick}><span className="transition-all duration-150 relative animate-dingdong mx-1">←</span><span>Login </span></Link>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LogReg
