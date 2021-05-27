import React from 'react'

function ProductList({ productList = [] }) {

    return (
        <>
            {
                (productList.length > 0) ?
                    <div className="products">
                        <div className="product-list">
                            {productList.map(item => (
                                <>
                                    <div key={item.id} className="item">
                                        <h4>{item.name}</h4><br />
                                        <p>Available in {item.store_count} store nearby at avg cost of ${item.price}</p>
                                    </div><hr />
                                </>
                            ))}
                        </div>
                    </div>
                    :
                    null
            }
        </>
    )
}

export default ProductList