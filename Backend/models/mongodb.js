const mongoose = require('mongoose');
const mongoDbUrl = "mongodb://localhost:27017/notes"

const connectToMongo = () => {
    mongoose.connect(mongoDbUrl, {    })
        .then(() => {
            console.log("connected to database")
        })
        .catch((err) => {
            console.log("connection failed", err);
        })
}

const pdfSchema = mongoose.Schema({
    title: String,
    pdf: String
})

const collection = mongoose.model('pdfDetails',pdfSchema);

module.exports = {connectToMongo, collection}