const mongoose = require("mongoose");
const user = process.env.USER;
const database = process.env.DB;
const password = process.env.PASSWORD;

const connectDB = () => {
    try {
        const connection = mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.klhde.mongodb.net/${database}?retryWrites=true&w=majority`, { useUnifiedTopology: true, useNewUrlParser: true })
        if(connection) {
            console.log(`Database connected succesfully`);
        }

    } catch (error) {
        console.error(error);
    }
}

exports = module.exports = {connectDB};