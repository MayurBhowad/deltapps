import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../styles/Form.css';

function NewProduct() {
    const [edit, setEdit] = useState(false);
    const [success, setSuccess] = useState(false);

    const [storeName, setStoreName] = useState('');
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');

    const resetInput = () => {
        setStoreName('')
        setProductName('');
        setPrice('');
    }

    const AddProduct = async e => {
        e.preventDefault();
        const newProduct = { store_name: storeName, product_name: productName, product_price: price };
        // console.log(newProduct);
        await axios.post('/store/deltapps/addproduct', newProduct)
            .then(ress => {
                // console.log(ress);
                if (ress.data) {
                    resetInput();
                    setSuccess(true)
                }
            })
            .catch(e => {
                if (e.response.data.found) {
                    setEdit(true)
                }
                // console.log(e.response.data);
            })
    }

    const updateProduct = async e => {
        e.preventDefault();
        const productDetails = { store_name: storeName, product_name: productName, product_price: price };
        await axios.post('/store/deltapps/updateproduct', productDetails)
            .then(ress => {
                if (ress.data.success) {
                    setEdit(false);
                    resetInput();
                    setSuccess(true)
                }
            })
            .catch(e => console.log(e.response.data))
    }

    return (
        <div className="product-oparation">
            <>
                <h3>Add New Product</h3>

                <form onSubmit={AddProduct} className="product-form" >
                    <div className="form-control">
                        <label htmlFor="name">Store Name: </label>
                        <input
                            type="text"
                            id="store_name"
                            value={storeName}
                            placeholder="Store name"
                            className="form-input"
                            onChange={e => setStoreName(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="store">Product Name</label>
                        <input
                            type="text"
                            id="product_name"
                            value={productName}
                            placeholder="Product Name"
                            className="form-input"
                            onChange={e => setProductName(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="price">Price: </label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            placeholder="Price"
                            className="form-input"
                            onChange={e => setPrice(e.target.value)}
                        />
                    </div>
                    <button type="submit" >Add Product</button>
                </form>
            </>
            <div className="links">
                <Link className="link" to="/">Go To Seach</Link>
            </div>
            {edit ? (
                <div className="editConfirmation">
                    <p>Product already exist! Do you want to update its Price?</p>
                    <div className="btns">
                        <form onSubmit={updateProduct}>
                            <button className="btn btn-yes">Yes</button>
                        </form>
                        <button className="btn btn-no" onClick={e => { setEdit(false); }}>No</button>
                    </div>
                </div>
            ) : null}
            {success ? (
                <p style={{ textAlign: 'center', color: 'green' }}>Successfull!</p>
            ) : null}
        </div>
    )
}

export default NewProduct
