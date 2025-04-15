const mongoose = require('mongoose');

const mongoURL = "mongodb://localhost:27017/ResumeAnalyzer";

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log("database connected");
    } catch (error) {
        console.log("Database connection is failed", error);
    }
}
 
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {   
        type: String,
        required: true,
    }
})

const userModel = mongoose.model('Resume', UserSchema);

module.exports = { userModel, connectDB };