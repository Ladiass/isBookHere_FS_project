/* eslint-disable array-callback-return */
import axios from 'axios';
import React ,{useState,useEffect} from 'react';
import {Redirect} from "react-router-dom";
import {Products} from "./HomePage.products";
import Loading from "./Loading";

function UserDetails(props) {
    let id = props.match.params.id;
    const [user , SetUser] = useState(false);
    const [products ,SetProducts] = useState([]);
    const [ownUser , SetIsOwnUser] = useState(false)
    const [userNotFound , SetUserNotFound] = useState(false)

    useEffect(() => {
        // eslint-disable-next-line eqeqeq
        if(sessionStorage.getItem("user_details") !== (undefined || null) && JSON.parse(sessionStorage.getItem("user_details"))._id == id) {
            SetIsOwnUser(true)
            return SetUser(JSON.parse(sessionStorage.getItem("user_details")))
        }
        // axios.get(`/users/${id}`)
        //     .then(res=>{
        //         if (res.data === 0) return SetUser("NotFound")
        //         return SetUser(res.data)
        //     })
        let formData = new FormData();
        formData.append("id",id)
        axios.post("/users/get",formData)
            .then(res=>{
                    if (res.data === 0){ SetUserNotFound(true);return ;}
                    SetUser(res.data)
                    return
                })
    }, [id])
    
    useEffect(() => {
        axios.get(`/books/author/${user.username}`)
            .then(res=>SetProducts(res.data))
    }, [user.username])

    function backToTop(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop=0;
    }

    
    // const [isImage,SetIsImage] = useState(false);
    const [userImage,SetUserImage] = useState()
    
    const FcUserImage = e =>{
        // SetIsImage(false)
        // image check and get image type
        let trgFile = e.target.files[0] || null;
        if(trgFile == null){return}
        let trgType = trgFile.type;
        // check the file is img ?
        let imgType = ["image/jpg","image/jpeg","image/png","image/svg","image/gif"]
        imgType.map(type=>{
            if(trgType === type){
                // SetIsImage(true)
                let formData = new FormData();
                formData.append("file",trgFile)
                // let files = {file:trgFile}
                axios.post("/upload/user",formData,{header:{
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(res=>{SetUserImage(res.data);userImageUpdate(res.data)})
                    .catch(err=>console.log("Error: " + err))
                    userImageUpdate()
                return
            }
        })
    }
    function userImageUpdate(imageurl){
        let formData2 = new FormData();
        // console.log(userImage)
        formData2.append("id",user._id)
        formData2.append("image",imageurl)
        axios.post("/users/update/image",formData2)
            .then(res=>console.log(res))
            .catch(err=>console.log("ERROR: "+err))
    }

    if(user !== ("NotFound" || null || undefined)) {
        return (
        <>
        <header className="h-1/4vh bg-gray-800 w-screen relative mb-12">
                    <div className="rounded-full h-48 w-48 absolute transform translate-y-1/3 md:mx-10 md:right-0 left-1/2 md:translate-x-0 -translate-x-1/2 md:left-auto shadow overflow-hidden right-auto transition-all duration-150">
                        {ownUser ? 
                        <label htmlFor="userimage" className="h-full w-full cursor-pointer relative rounded-full" style={{backgroundImage: `url(${userImage ? userImage : user.image})`}}>
                            <img src={userImage ? userImage : user.image} alt="" className="w-full h-full z-auto relative"/>
                            <div className="w-full h-full z-50 flex justify-center items-center backdrop-filter backdrop-blur bg-gray-700 bg-opacity-25 transition-opacity opacity-0 hover:opacity-100 duration-200 absolute top-0 left-0 "><i className="fas fa-sync text-gray-400 text-opacity-80 text-3xl"></i></div>
                        <input type="file" className="hidden" name="userimage" id="userimage" onChange={FcUserImage}/>
                        </label>
                            :
                        <img src={userImage ? userImage : user.image} alt="" className="h-full w-full z-10" />}

                    </div>
                </header>
                <section className="mt-28 md:mt-12 px-5 md:pr-80 ">
                    <div className="container bg-gray-800 py-2 px-10 rounded-md text-white overflow-visible">
                        <ul className="flex flex-nowrap items-center">
                            <li className="border-0 border-r-2 px-1 border-red-300"><span className="hover:bg-gray-700 w-full h-full px-4 py-2">All</span></li>
                            { ownUser ? <li className="border-0 border-r-2 px-1 border-transparent"><span className="hover:bg-gray-700 w-full h-full px-4 py-2 font-bold cursor-pointer">+</span></li> : ""}
                        </ul>
                    </div>
                </section>

                <section className="container mx-auto flex flex-wrap my-10 gap-y-4 bg-gray-50 pt-5">
                    {products.map(book => {
                        // eslint-disable-next-line eqeqeq
                        if(book.author == user.username) return <Products key={book._id} image={book.image} productName={book.title} author={book.author} links={"/Books/"+ book._id}/>
                    }
                    )}
                    <p className="flex w-full justify-center items-center py-2 px-10 bg-gray-500 cursor-pointer" onClick={backToTop}> No More ... Click here back to top</p>
                </section>
        </>)
    }
    
        return (
            <>
                {userNotFound ? <Redirect to="404"/> : ""}
                <Loading />
            </>
        )
}

export default UserDetails


