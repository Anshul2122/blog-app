const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongo_url);
        console.log(`connected to mongodb database ${mongoose.connection.host}`);
    }
    catch (error) {
        console.log(`mongooes error${error}`)
    }
}
module.exports = connectDB;