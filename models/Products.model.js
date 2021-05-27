const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String
    },
    store_count: {
        type: String
    },
    price: {
        type: String
    },
})

productSchema.index({ name: "text" })

productSchema.statics = {
    searchPartial: function (q, callback) {
        return this.find({
            $or: [
                { "name": new RegExp(q, "gi") }
            ]
        }, callback);
    },

    searchFull: function (q, callback) {
        return this.find({
            $text: { $search: q, $caseSensitive: false }
        }, callback)
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