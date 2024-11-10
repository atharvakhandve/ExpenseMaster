const mongoose = require("mongoose");

const userFriendSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // references the user
    friend: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // references the friend
});

module.exports = mongoose.model("Friends", userFriendSchema);
