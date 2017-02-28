var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inventorySchema = new Schema({
    location: String,
    upc: String,
    qty: { type: Number, default: 1 }
});

module.exports = mongoose.model('inventory', inventorySchema);
