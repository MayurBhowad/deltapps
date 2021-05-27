import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductList from './search/ProductList';
import SearchBar from './search/SearchBar'
import '../styles/Search.css';


const Search = (props) => {
    const [input, setInput] = useState('');
    const [productList, setProductList] = useState();

    const data = {
        string: input
    }

    const fetchData = async () => {
        await axios.post('/deltapps/searchproduct', data)
            .then(ress => {
                setProductList(ress.data)
            })
    }


    const updateInput = async (input) => {
        setInput(input);
    }

    useEffect(() => {
        if (input.length > 0) {
            fetchData();
        }
    }, [input])

    return (
        <>
            <div className="links">
                <Link className="link" to="/addproduct">Add products</Link>
            </div>
            <SearchBar
                keyword={input}
                setKeyword={updateInput}
            />
            {input.length > 0 ?
                <ProductList productList={productList} /> :
                null
            }
        </>
    )
}

export default Search
