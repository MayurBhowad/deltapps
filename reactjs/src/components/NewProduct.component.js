import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../styles/Form.css';

function NewProduct() {
    const [edit, setEdit] = useState(false);
    const [success, setSuccess] = useState(false);

    const [name, setName] = useState('');
    const [store_count, setStore_count] = useState('');
    const [price, setPrice] = useState('');

    const resetInput = () => {
        setName('')
        setStore_count('');
        setPrice('');
    }

    const AddProduct = async e => {
        e.preventDefault();
        const newProduct = { name, store_count, price };
        await axios.post('/deltapps/addproduct', newProduct)
            .then(ress => {
                console.log(ress);
                if (ress.data) {
                    resetInput();
                    setSuccess(true)
                }
            })
            .catch(e => {
                if (e.response.data.exist) {
                    setEdit(true)
                }
                console.log(e);
            })
    }

    const updateProduct = async e => {
        e.preventDefault();
        const productDetails = { name, store_count, price };
        await axios.post('/deltapps/updateproduct', productDetails)
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
                        <label htmlFor="name">Name: </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            placeholder="Product name"
                            className="form-input"
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="store">Available Store Counts: </label>
                        <input
                            type="number"
                            id="store"
                            value={store_count}
                            placeholder="Available Count"
                            className="form-input"
                            onChange={e => setStore_count(e.target.value)}
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
                    <p>Product already exist! Do you want to update?</p>
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
