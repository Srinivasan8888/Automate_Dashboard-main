import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/router.js";  
const app = express();

const connect = async () => {
    try {
        await mongoose.connect('mongodb://0.0.0.0:27017/bpcl');
        console.log('Mongodb Connected..');
    } catch (error) {
        console.error('Error:', error.message);
    }
};

app.use(express.json());
app.use(cors());
app.use("/backend", router);

app.listen(4000, async () => {
    console.log('Server Started on port 4000..');
    await connect(); 
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongodb disconnected...');
});
