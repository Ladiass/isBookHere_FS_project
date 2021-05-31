import React from 'react';
import "./ProductShow.css"

function Loading() {
    return (
        <>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                <div className="load-wrapp flex justify-center items-center shadow-2xl">
                    <div className="load-2 flex flex-nowrap justify-center items-center">
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Loading
