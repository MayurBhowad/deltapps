const router = require('express').Router();


/**
 * Method       POST
 * Route        /store/deltapps/addproduct
 */
router.post('/deltapps/addproduct', (req, res) => {
    const { store_name, product_name, product_price } = req.body;
    const newStore = new Product({ store_name, product: { product_name, product_price } });

    Product.findOne({ store_name }).then(store => {
        if (store) {

            findProduct(store, product_name)
                .then(() => res.status(302).json({ found: true }))
                .catch(() => {
                    let newProduct = { product_name, product_price }
                    Product.updateOne(
                        { "store_name": store_name },
                        {
                            $push: {
                                product: newProduct
                            }
                        }
                    ).then(product => res.status(201).json({ success: true, message: 'Product added successfully!' }))
                        .catch(e => console.log(e));
                })
        } else {
            newStore.save()
                .then(() => res.status(201).json({ success: true, message: 'Store added successfully!' }))
                .catch(e => console.log(e))
        }
    })
        .catch(e => console.log(e));
})

/**
 * Method       POST
 * Route        /store/deltapps/updateproduct
 */
router.post('/deltapps/updateproduct', (req, res) => {
    const { store_name, product_name, product_price } = req.body;

    Product.updateOne(
        { "store_name": store_name, "product.product_name": product_name },
        {
            $set: {
                "product.$.product_price": product_price
            }
        }
    ).then(product => res.status(200).json({ success: true, message: 'Product updated successfully!' }))
        .catch(e => console.log(e));
})

/**
 * Method       POST
 * Route        /store/deltapps/updateproduct
 */
router.post('/deltapps/searchproduct', (req, res) => {
    const { string } = req.body;
    let productArray = [];

    Product.search(string, (err, data) => {
        if (err) console.log(err);

        if (data) {
            data.map(item => {
                if (productArray.some(product => product.product_name === item.product.product_name)) {
                    productArray.map(product => {
                        if (product.product_name === item.product.product_name) {
                            let store = { store_name: item.store_name, product_price: item.product.product_price }
                            let newProductCount = product.productCount + 1;
                            let valProductData = { product_name: item.product.product_name, store: product.store, product_price: item.product.product_price, productCount: newProductCount }
                            valProductData.store.push(store)
                            let index = productArray.indexOf(product)
                            productArray[index] = (valProductData)
                        }
                    })
                } else {
                    let store = { store_name: item.store_name, product_price: item.product.product_price }
                    let valProductData = { product_name: item.product.product_name, store: [], product_price: item.product.product_price, productCount: 1 }
                    valProductData.store.push(store)
                    productArray.push(valProductData)
                }
            })
        }

        let searchData = []
        productArray.map(product => {
            let avgPrice = 0, totalPrice = 0;

            product.store.map(store => {
                totalPrice += +store.product_price;
            })
            avgPrice = totalPrice / product.productCount

            let obj = { product_name: product.product_name, store_count: product.productCount, price: avgPrice }


            searchData.push(obj);
        })

        return res.status(200).json(searchData);
    })
})

module.exports = router;


const findProduct = (store, product_name) => {
    return new Promise((resolve, reject) => {
        store.product.map((item, i) => {
            if (item.product_name === product_name) {
                resolve()
            } else {
                (i + 1 === store.product.length) ? reject() : null;
            }
        })
    })
}