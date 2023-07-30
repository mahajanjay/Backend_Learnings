const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstname: {type: String, require: true},
    lastname: String,
    email: {
        type: String,
        unique: true,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v);
            },
        message: (props) => `${props.value} is not valid email.`
        },
        require: true
    },
    password: {type: String, minLength: 6, require: true},
    token: String
});

exports.User = mongoose.model('User', userSchema);