import axios from 'axios';
import React ,{useState,useEffect} from 'react'

function EditBook(props) {
    // style
    let inputStyle = "px-4 py-2 focus:shadow-inner shadow outline-none transition-all duration-100 bg-gray-100 rounded-full group-focus:top-0 w-full";
    let textareaStyle = "px-4 py-2 focus:shadow-inner shadow outline-none transition-all duration-100 bg-gray-100 rounded-md group-focus:top-0 w-full"

    // Function
    function isEmptyCheck(trg){
        if(!trg.value) {
            trgLabel(trg).classList.replace("-top-3","top-2")
        }
    }

    function trgLabel(trg){
        return Object.values(trg.parentElement.children).filter(trg=>trg.tagName.toLowerCase() === 'label')[0];
    }

    function formSubmit(e){
        // let formData = new FormData(e)
        axios.put(`/books/${id}`,book)
        .then(res=>{
            if(res.data) {
                sessionStorage.setItem("status","Success");
                sessionStorage.setItem("alertContent","Product is Edited");
                window.location.href="/"
                return
            }
            sessionStorage.setItem("status","Failed to Add");
            
        }).catch(err => console.log("ERROR: "+err))
    }

    // const [imageUrl , SetImageUrl] = useState();
    const productImgUpload= e =>{
        e.preventDefault();
        // image check and get image type
        let trgFile = e.target.files[0] || null;
        if(trgFile == null){return}
        let trgType = trgFile.type;
        // check the file is img ?
        let imgType = ["image/jpg","image/jpeg","image/png","image/svg","image/gif"]

        //eslint-disable-next-line
        imgType.map(type => {
            if(trgType === type){
                // SetIsImage(true)
                let formData = new FormData();
                formData.append("file",trgFile)
                // let files = {file:trgFile}
                axios.post("/upload/products",formData,{header:{
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(res=>{SetBook({...book,image:res.data})})
                    .catch(err=>console.log("Error: " + err))
            }
        })
    }


    const [id] = useState(props.match.params.id);
    const [book,SetBook] = useState();
    useEffect(()=>{
        async function getData(){
            await axios.get(`/books/${id}`)
            .then(res=>(res.data.status !== 0) ? SetBook(res.data) : window.location.href="/404")
            .catch(err=>console.log(err))
        }
        getData();
    },[id])
    console.log(book)
    return (
        <>
            <div className="transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2  absolute ">
                <form method="post" className="px-6 py-8 shadow-md bg-gray-50 rounded-md  overflow-hidden" 
                onSubmit={e=>{
                    e.preventDefault();
                    formSubmit(e.target)
                }}>
                    <h1 className="text-lg font-bold text-center">Edit Books</h1>
                    <div className="relative my-6 group">
                        <label htmlFor="title" className="absolute mx-4 left-0 transition-all duration-150 -top-3 text-gray-500" >Title :</label>
                        <input type="text" id="title" name="title" className={inputStyle} 
                            value={book?.title}
                            onBlur={e=>{isEmptyCheck(e.target)}}
                            onFocus={e=>{trgLabel(e.target).classList.replace("top-2","-top-3")}}
                            onChange={e=>{SetBook({...book,title:e.target.value})}}
                        />
                    </div>
                    <div className="relative my-6 group">
                        <label htmlFor="desc" className="absolute mx-4 left-0 transition-all duration-150 -top-3 text-gray-500" >Description :</label>
                        <textarea type="text" id="desc" name="desc" className={textareaStyle}
                            onChange={e=>{SetBook({...book,description:e.target.value})}}
                            value={book?.description}
                            onBlur={e=>{isEmptyCheck(e.target)}}
                            onFocus={e=>{trgLabel(e.target).classList.replace("top-2","-top-3")}}
                        />
                    </div>
                    <div className="relative my-6 group">
                        <label htmlFor="price" className="absolute mx-4 left-0 transition-all duration-150 -top-3 text-gray-500" >Price :</label>
                        <input type="number" id="price" name="price" className={inputStyle}
                            value={book?.price}
                            onBlur={e=>{isEmptyCheck(e.target)}}
                            onFocus={e=>{trgLabel(e.target).classList.replace("top-2","-top-3")}}
                            onChange={e=>{SetBook({...book,price:e.target.value})}}
                        />
                    </div>
                    <div className="relative my-6 group">
                        <label htmlFor="quantity" className="absolute mx-4 left-0 transition-all duration-150 -top-3 text-gray-500" >Quantity :</label>
                        <input type="number" min="10" minLength="2" id="quantity" name="quantity" className={inputStyle}
                            value={book?.quantity}
                            onBlur={e=>{isEmptyCheck(e.target)}}
                            onFocus={e=>{trgLabel(e.target).classList.replace("top-2","-top-3")}}
                            onChange={e=>{SetBook({...book,quantity:e.target.value})}}

                        />
                    </div>
                    <div className="flex flex-wrap">
                        <label htmlFor="image" className="w-full">Image :</label>
                        <input type="file" min="0.5" id="image" name="image" className="inputStyle"
                            onChange={productImgUpload}
                        />
                        <input type="hidden" name="imageurl" value={book?.image} 
                            
                        />
                        
                    </div>
                    <input type="Submit" value="Edit" className="block mx-auto rounded-full px-10 text-white font-bold py-2 bg-blue-500 mt-6 active:bg-blue-400 cursor-pointer" />
                </form>
            </div>
        </>
    )
}

export default EditBook

