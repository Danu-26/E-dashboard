import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';



const UpdateProduct = () => {
    const [name, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const navigate = useNavigate();

    const params = useParams();

    useEffect(() => {
        getProductDetails();
    }, [])

    const getProductDetails = async () => {
        let result = await fetch(`http://localhost:3001/product/${params.id}`);
        result = await result.json();
        setProductName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }
    const updateProductData = async () => {
        console.warn(name, price, category, company);
        let response = await fetch(`http://localhost:3001/product/${params.id}`, {
            method: "PUT",
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();
        if (response) {
            navigate('/')
        }

    };

    return (
        <div className="addproduct">
            <h1>Update product</h1>
            <input type="text" className="inputBox" placeholder="Enter name" value={name} onChange={(e) => setProductName(e.target.value)} />
            <input type="text" className="inputBox" placeholder="Enter price " value={price} onChange={(e) => setPrice(e.target.value)} />
            <input type="text" className="inputBox" placeholder="Enter category " value={category} onChange={(e) => setCategory(e.target.value)} />
            <input type="text" className="inputBox" placeholder="Enter company" value={company} onChange={(e) => setCompany(e.target.value)} />
            <button onClick={updateProductData} className="appButton" type="button">Update</button>
        </div>
    );
};

export default UpdateProduct;
