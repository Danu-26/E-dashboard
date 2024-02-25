import React, { useState } from 'react';

const AddProduct=()=>{
    const [name,setProductname]=useState("");
    const [ price,setPrice]=useState("");
    const [category,setCategory]=useState("");
    const [company,setCompany]=useState("");
    const [error,setError]=useState(false);
    const addProductdata=async()=>{
        if(!name ||  !price || !category || !company){
             setError(true);
            return false;
        }
       const userId=JSON.parse(localStorage.getItem('user'))._id;
        let result=await fetch("http://localhost:3001/add-product",{
            method:'POST',
            body:JSON.stringify({name, price,category,userId,company}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        result=await result.json();
        console.warn(result);
        if (result._id) {
            alert("Product added successfully!");
            setProductname("");
            setPrice("");
            setCategory("");
            setCompany("");
            setError(false); 
        } else {
            console.log("Failed to add product");
        
        }
    }

    return(
        <div  className="addproduct">
            <h1>Add product</h1>
            <input className="inputBox"  type="text" placeholder="Enter product name " value={name} onChange={(e)=>setProductname(e.target.value)}/>
            {error && !name && <span className='invalid-input'>Enter valid name</span>} 
            <input className="inputBox"  type="text" placeholder="Enter  price " value={price} onChange={(e)=>setPrice(e.target.value)}/>
            {error && !price && <span className='invalid-input'>Enter valid price</span>} 
            <input className="inputBox"  type="text" placeholder="Enter category " value={category} onChange={(e)=>setCategory(e.target.value)}/>
            {error && !category && <span className='invalid-input'>Enter valid category</span>} 
            <input className="inputBox"  type="text" placeholder="Enter company " value={company} onChange={(e)=>setCompany(e.target.value)}/>
            {error && !company && <span className='invalid-input'>Enter valid company</span>} 
            <button onClick={addProductdata} className="appButton" type="button">Add</button>
        </div>
    )
}

export default AddProduct;