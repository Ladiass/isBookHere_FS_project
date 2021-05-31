import React from 'react'
import {Link} from "react-router-dom";

export const Products = ({
    image,
    author,
    productName,
    links
})=>{
    let productBoxClasses = " h-64 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-5 transition-all duration-300"

    return (
        <>
            <Link className={productBoxClasses} to={links} alt={productName}>
                <div className="products  w-full h-full hover:shadow-xl shadow-md cursor-pointer rounded overflow-hidden">
                    <div className="h-4/6 flex justify-center items-center">
                        <img src={image} alt={productName} className="h-full max-w-64"/>
                    </div>
                    <div className="product-details px-4 font-bold flex flex-wrap">
                        <p className="w-4/6 py-3 text-lg truncate group  relative" alt={productName}>{productName}
                        </p>
                        <small className="w-2/6 py-3 flex justify-end items-center space-x-1">
                            <i className="far fa-heart hover:text-red-500 text-sm"></i>
                            <i className="fas fa-shopping-cart hover:text-blue-500"></i>
                        </small>
                        <small className="text-sx text-gray-400 w-1/2">author: <span className="text-gray-500">{author}
                        </span></small>
                    </div>
                </div>
            </Link>
        </>
    )
}
