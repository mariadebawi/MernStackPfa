const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ItemSchema = mongoose.Schema({
  name: String,
  desc: String,
  price: Number,
  image: String,
  quantity: Number,
  quote: String,
  /*user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },*/
  is_delete: {
    type: Boolean,
    default: false
},
}, {
  timestamps: true
});

ItemSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Item', ItemSchema);