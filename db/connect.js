const mongodb = require("mongoose")
mongodb.set('strictQuery',false)
const dbUrl = "mongodb+srv://Ashim:xnKRbZvcSoXcGXhX@cluster0.hpr0cj5.mongodb.net/Cluster0?retryWrites=true&w=majority";
const collectionName = "Credentials";
const connectDB = () =>{
    return mongodb.connect(dbUrl, {
        useNewUrlParser:true,
        useUnifiedTopology: true,
    });
};

const conn = async()=>{
    await connectDB();
    console.log("connected sucessfully to the database");

}

module.exports = connectDB;