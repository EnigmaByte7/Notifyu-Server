const mongoose  = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {type:String},
    contact:{type:String}
})

const Clients = mongoose.model('Clients', UserSchema);
module.exports = Clients;