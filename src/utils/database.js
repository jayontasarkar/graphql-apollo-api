import mongoose from 'mongoose';

export const connect = async () => {
    const options = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    };
    try {
        await mongoose.connect(process.env.MONGODB_URI, options);
        console.log(`Successfully connected to DB`);
    } catch (error) {
        console.error(`Failed connecting to DB with Error: ${error}`);
    }
};