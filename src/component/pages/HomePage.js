import React ,{useState,useEffect}from 'react'
import "./HomePage.css";
import imgBook from "../../image/book.jpg"
import book2 from "../../image/images.jpg"
import {Products} from "./HomePage.products";
//eslint-disable-next-line
import { Splide, SplideSlide } from '@splidejs/react-splide';
// import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';
import Navbar from "./plugins/Navbar.tag";
import axios from 'axios';

function HomePage() {
    const [products,SetProducts] = useState([]);
    useEffect(()=>{
        axios.get("/books")
            .then(res=>{
                SetProducts(res.data)
            })
            .catch(err=>console.log(err))
    },[])
    
    return (
        <>
            {/* <Navbar /> */}
            {/* <Splide className=" shadow" 
            options={ {
                type         : 'loop',
                gap          : '1rem',
                autoplay     : true,
                pauseOnHover : false,
                resetProgress: false,
                arrows       : 'slider',
            } }
            hasAutoplayProgress
            >
                <SplideSlide className="flex justify-center items-center    ">
                    <img src={imgBook} alt="" className="lg:h-4/5vh  md:h-1/2vh w-full  md:w-auto"/>
                </SplideSlide>
                <SplideSlide className="flex justify-center items-center    ">
                    <img src={book2} alt="" className="lg:h-4/5vh  md:h-1/2vh w-full  md:w-auto"/>
                </SplideSlide>
                
            </Splide> */}
            <header>
                <div className="relative">
                    <img src="/images/header.jpg" className="lg:h-4/5vh md:h-1/2vh w-full filter blur-sm" alt="" />
                    <p className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg flex text-center flex-wrap"><span className="w-full block">Welcome to</span><span className="text-4xl font-bold w-full">IsBookHere?</span></p>
                </div>
            </header>

            <main>
                <section className="w-full h-auto flex flex-wrap px-4 py-10 gap-y-10">
                    {products.map(book => {
                        return <Products key={book._id} image={book.image} productName={book.title} author={book.author} links={"/Books/"+book._id}/>
                    }
                    )}

                </section>
            </main>
        </>
    )
}

export default HomePage
