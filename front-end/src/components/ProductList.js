import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch('http://localhost:3001/products');
        result = await result.json();
        setProducts(result);
    }


    const deleteProduct = async (id) => {
        console.warn(id);
        let result = await fetch(`http://localhost:3001/product/${id}`, {
            method: "DELETE"
        });
        result = await result.json();
        if (result) {
            alert("Product deleted");
            getProducts();
        }

    }

    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:3001/search/${key}`);
            result = await result.json()
            if (result) {
                setProducts(result);
            }
        }else{
            getProducts();
        }


    }



    return (
        <div className="product-list">
            <h1>Products</h1>
            <input className="search" type="" placeholder='Search Product' onChange={searchHandle} />
            <ul >
                <li className="bold-text">Pno  </li>
                <li className="bold-text">Product Name </li>
                <li className="bold-text">Price </li>
                <li className="bold-text">Category </li>
                <li className="bold-text">Operation</li>
            </ul>
            {
                products.length>0?
                products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1} </li>
                        <li> {item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>
                            <button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <Link to={"/update/" + item._id}>Update</Link>
                        </li>
                    </ul>
                )
                :
                <h1>No products found</h1>
            }




        </div>
    );
}


export default ProductList;