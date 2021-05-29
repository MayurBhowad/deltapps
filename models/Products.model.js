const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    store_name: {
        type: String
    },
    product: [{
        product_name: {
            type: String
        },
        product_price: {
            type: String
        }
    }],
})

productSchema.index({ "product.product_name": "text" })

productSchema.statics = {
    // searchPartial: function (q, callback) {
    //     return this.find({
    //         $or: [
    //             { "product.product_name": new RegExp(q, "gi") }
    //         ]
    //     }, callback);
    // },
    searchPartial: function (q, callback) {
        return this.aggregate([
            { $unwind: "$product" },
            { $match: { "product.product_name": new RegExp(q, "gi") } }]
            , callback);
    },

    // searchFull: function (q, callback) {
    //     return this.find({
    //         $text: { $search: q, $caseSensitive: false }
    //     }, callback)
    // },
    searchFull: function (q, callback) {
        return this.aggregate([
            { $unwind: "$product" },
            { $match: { "product.product_name": new RegExp(q, "gi") } }]
            , callback);
    },

    search: function (q, callback) {
        this.searchFull(q, (err, data) => {
            if (err) return callback(err, data);
            if (!err && data.length) return callback(err, data);
            if (!err && data.length === 0) return this.searchPartial(q, callback);
        });
    },
}

module.exports = Product = mongoose.model('products', productSchema);