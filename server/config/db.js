import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log('Mongoose is connected');
    });

    mongoose.connection.on('error', (err) => {
        console.log('Mongoose connection error: ', err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose is disconnected');
    });

    await mongoose.connect(`${process.env.MONGO_URI}/quick-job`);

}

export default connectDB